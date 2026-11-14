/** Request handlers for the service worker. Pure orchestration: network via roblox.ts, persistence via db.ts. */
import * as db from './db.ts';
import * as rbx from './roblox.ts';
import { loadSettings } from '../shared/settings.ts';
import { configHash, describeChange } from '../shared/analysis.ts';
import { deriveAccess, type AccessInfo } from '../shared/access.ts';
import { BACKUP_APP, BACKUP_SCHEMA, planImport } from '../shared/backup.ts';
import {
  outfitKey, type AssetRec, type AssetView, type LibraryEntry, type OutfitDetails, type OutfitRec, type Snapshot, type UserRec,
} from '../shared/types.ts';
import type { Rpc, RpcType } from '../shared/rpc.ts';

const ASSET_TTL = 30 * 60_000;
const OWNED_TTL = 10 * 60_000;

// One in-flight request per key, so ten UI components asking for the same thing cost one fetch.
const inflight = new Map<string, Promise<any>>();
function once<T>(key: string, fn: () => Promise<T>): Promise<T> {
  let p = inflight.get(key);
  if (!p) { p = fn().finally(() => inflight.delete(key)); inflight.set(key, p); }
  return p;
}

const ownedCache = new Map<number, { v: boolean; at: number }>();

// ---- outfits ---------------------------------------------------------------------------------
const ACCESS_TTL = 30 * 60_000;
/** Roblox said this viewer may not see the list: copies cached on earlier visits stay hidden (docs/research/outfit-access.md). */
const hidden = (u?: UserRec) => u?.access?.state === 'restricted';

async function cachedOutfits(userId: number) {
  const [outfits, user] = await Promise.all([
    db.getAllByIndex<OutfitRec & { key: string }>('outfits', 'userId', userId),
    db.get<UserRec>('users', userId),
  ]);
  if (hidden(user)) return { outfits: [], user };
  return { outfits: outfits.filter((o) => !o.missingSince).sort((a, b) => a.order - b.order), user };
}

/**
 * Works out why this viewer can see a list. One anonymous request at most per profile per half hour; skipped entirely
 * when it can't add anything (signed out, own profile, nothing visible) or when the user turned the check off.
 */
async function determineAccess(userId: number, visible: number, prev: AccessInfo | undefined, force: boolean, check: boolean): Promise<AccessInfo> {
  let meId: number | null | undefined;
  try { meId = (await rbx.authenticatedUser())?.id ?? null; } catch { meId = undefined; }
  let anon: AccessInfo['anon'] = 'skipped';
  if (check && visible > 0 && meId !== null && meId !== userId) {
    if (!force && prev && (prev.anon === 'visible' || prev.anon === 'hidden') && Date.now() - prev.at < ACCESS_TTL) anon = prev.anon;
    else {
      try { const n = await rbx.anonymousOutfitCount(userId); anon = n === 'hidden' || n === 0 ? 'hidden' : 'visible'; }
      catch { anon = 'error'; }
    }
  }
  return { state: deriveAccess({ userId, visible, meId, anon }), at: Date.now(), meId, anon };
}

async function syncOutfits(userId: number, userName: string | undefined, force: boolean): Promise<Rpc['outfits.sync']['res']> {
  const settings = await loadSettings();
  const user = await db.get<UserRec>('users', userId);
  const prev = await db.getAllByIndex<OutfitRec & { key: string }>('outfits', 'userId', userId);
  // An empty (or presets-only) answer is never trusted as fresh: privacy and sign-in state can change between visits.
  const hadReal = prev.some((o) => o.isEditable && !o.missingSince);
  const fresh = user?.lastSyncAt && Date.now() - user.lastSyncAt < settings.cacheMinutes * 60_000 && hadReal && !hidden(user);
  if (fresh && !force) {
    return { outfits: prev.filter((o) => !o.missingSince).sort((a, b) => a.order - b.order), source: 'cached', fetchedAt: user!.lastSyncAt!, via: 'cache', removed: [], added: [], renamed: [], access: user!.access };
  }
  let listed: Awaited<ReturnType<typeof rbx.listOutfits>>;
  try { listed = await rbx.listOutfits(userId); } catch (e) {
    // Why Roblox said no often depends on who is asking, so say whether it saw a signed-in viewer.
    const err = e as { kind?: string; viewer?: string; access?: AccessInfo };
    const k = err.kind;
    if (k === 'forbidden' || k === 'unauthenticated' || k === 'not-found') err.viewer = await viewerState();
    const cached = prev.filter((o) => o.isEditable && !o.missingSince).length;
    err.access = { state: deriveAccess({ userId, visible: 0, error: k as any, cached }), at: Date.now() };
    // Remember a refusal so cached copies stay hidden until Roblox shows the list again. A transient failure (rate limit,
    // timeout, outage) says nothing about visibility, so it keeps what was known; either way the visit counts as recent.
    const refused = err.access.state === 'restricted' || err.access.state === 'unavailable';
    await db.put('users', { id: userId, name: userName ?? user?.name ?? '', displayName: user?.displayName ?? '', lastSeen: Date.now(), outfitCount: user?.outfitCount, lastSyncAt: user?.lastSyncAt, access: refused ? err.access : user?.access } satisfies UserRec);
    throw e;
  }
  const { outfits: raw, via } = listed;
  const now = Date.now();
  const prevById = new Map(prev.map((o) => [o.id, o]));
  const added: number[] = [], renamed: { id: number; from: string; to: string }[] = [];
  const next: (OutfitRec & { key: string })[] = raw.map((o, i) => {
    const old = prevById.get(o.id);
    if (!old) added.push(o.id);
    let prevNames = old?.prevNames;
    if (old && old.name !== o.name) {
      renamed.push({ id: o.id, from: old.name, to: o.name });
      prevNames = [...(prevNames ?? []), { name: old.name, at: now }];
    }
    return {
      key: outfitKey(userId, o.id), userId, id: o.id, name: o.name, isEditable: !!o.isEditable, outfitType: o.outfitType || 'Avatar',
      order: i, firstSeen: old?.firstSeen ?? now, lastSeen: now, prevNames,
    };
  });
  const seen = new Set(raw.map((o) => o.id));
  const gone = prev.filter((o) => !seen.has(o.id) && !o.missingSince).map((o) => ({ ...o, missingSince: now }));
  await db.putMany('outfits', [...next, ...gone]);
  const visible = next.filter((o) => o.isEditable).length;
  const access = await determineAccess(userId, visible, user?.access, force, settings.checkAccess);
  await db.put('users', {
    id: userId, name: userName ?? user?.name ?? '', displayName: user?.displayName ?? '', lastSeen: now,
    outfitCount: visible, lastSyncAt: now, access,
  } satisfies UserRec);
  const viewer = visible ? undefined : await viewerState();
  // A list that was hidden before and visible now has no meaningful "since last visit" diff.
  const wasHidden = hidden(user);
  return { outfits: next, source: 'live', fetchedAt: now, via, removed: wasHidden ? [] : gone.map((o) => o.id), added: prev.length && !wasHidden ? added : [], renamed, viewer, access };
}

async function viewerState(): Promise<'in' | 'out' | 'unknown'> {
  try { return (await rbx.authenticatedUser()) ? 'in' : 'out'; } catch { return 'unknown'; }
}

// ---- thumbnails ------------------------------------------------------------------------------
async function outfitThumbs(ids: number[], size: '150x150' | '420x420') {
  const keys = ids.map((id) => `o:${id}:${size}`);
  const have = await db.getMany<{ key: string; state: string; url: string | null; at: number }>('thumbs', keys);
  const out: Record<number, { state: string; url: string | null }> = {};
  const need: number[] = [];
  have.forEach((h, i) => {
    // Completed URLs are content-addressed and stable for days. 'Pending' is only shared by requests in the same moment:
    // the UI re-asks pending renders on a backoff (ui/data.ts THUMB_RETRY_MS, ≥ 2.5 s apart), and each retry must reach Roblox.
    const ttl = h?.state === 'Completed' ? 6 * 3600_000 : h?.state === 'Pending' ? 2_000 : 20_000;
    if (h && Date.now() - h.at < ttl) out[ids[i]] = { state: h.state, url: h.url };
    else need.push(ids[i]);
  });
  if (need.length) {
    const t = await once(`thumbs:${size}:${need.join(',')}`, () => rbx.outfitThumbs(need, size));
    const rows = need.map((id) => ({ key: `o:${id}:${size}`, state: t[id]?.state ?? 'Error', url: t[id]?.url ?? null, at: Date.now() }));
    await db.putMany('thumbs', rows);
    for (const r of rows) out[Number(r.key.split(':')[1])] = { state: r.state, url: r.url };
  }
  return out;
}

// ---- details + history -----------------------------------------------------------------------
async function outfitDetails(userId: number, id: number, force: boolean, allowStale = false): Promise<Rpc['outfits.details']['res']> {
  const key = outfitKey(userId, id);
  const settings = await loadSettings();
  const cached = await db.get<OutfitDetails & { key: string }>('details', key);
  const fresh = !!cached && Date.now() - cached.fetchedAt < settings.cacheMinutes * 60_000;
  if (cached && !force && (fresh || allowStale)) return { details: cached, source: 'cached', stale: !fresh };
  return once(`details:${key}`, async () => {
    const details = await rbx.outfitDetails(id);
    await db.put('details', { ...details, key, userId });
    let change, previousAt;
    if (settings.keepHistory) {
      const snaps = (await db.getAllByIndex<Snapshot>('snapshots', 'outfitKey', key)).sort((a, b) => a.at - b.at);
      const last = snaps[snaps.length - 1];
      const hash = configHash(details);
      if (!last || last.hash !== hash) {
        const snap: Snapshot = {
          outfitKey: key, at: Date.now(), hash, name: details.name,
          assetIds: details.assets.map((a) => a.id),
          assetNames: Object.fromEntries(details.assets.map((a) => [a.id, a.name])),
          bodyColors: details.bodyColors, scale: details.scale, avatarType: details.avatarType,
        };
        await db.put('snapshots', snap);
        if (last) { change = describeChange(last, snap); previousAt = last.at; }
        const over = snaps.length + 1 - settings.historyLimit;
        if (over > 0) await db.del('snapshots', snaps.slice(0, over).map((s) => s.id!));
      }
    }
    return { details, source: 'live' as const, change, previousAt };
  });
}

// ---- assets ----------------------------------------------------------------------------------
function fromCatalog(c: rbx.RawCatalogItem, old?: AssetRec): AssetRec {
  const restriction: AssetRec['restriction'] = c.itemRestrictions?.includes('Collectible') ? 'collectible'
    : c.itemRestrictions?.includes('Limited') || c.itemRestrictions?.includes('LimitedUnique') ? 'limited' : 'none';
  const price = typeof c.price === 'number' ? c.price : null;
  const rec: AssetRec = {
    id: c.id, name: c.name, assetTypeId: c.assetType,
    creator: c.creatorName ? { id: c.creatorTargetId ?? 0, name: c.creatorName, type: c.creatorType ?? 'User', verified: !!c.creatorHasVerifiedBadge } : undefined,
    price, isFree: c.priceStatus === 'Free' || price === 0,
    isOffSale: !!c.isOffSale || (c.priceStatus === 'Off Sale'),
    restriction, lowestResale: typeof c.lowestResalePrice === 'number' && c.lowestResalePrice > 0 ? c.lowestResalePrice : null,
    status: c.itemStatus ?? [], thumb: old?.thumb, observedAt: Date.now(),
  };
  if (old && (old.price !== rec.price || old.isOffSale !== rec.isOffSale)) { rec.prevPrice = old.isOffSale ? null : old.price; rec.prevObservedAt = old.observedAt; }
  else if (old?.prevObservedAt) { rec.prevPrice = old.prevPrice; rec.prevObservedAt = old.prevObservedAt; }
  return rec;
}
function fromEconomy(e: rbx.RawEconomy, old?: AssetRec): AssetRec {
  const rec: AssetRec = {
    id: e.AssetId, name: e.Name, assetTypeId: e.AssetTypeId,
    creator: e.Creator ? { id: e.Creator.Id, name: e.Creator.Name, type: e.Creator.CreatorType, verified: !!e.Creator.HasVerifiedBadge } : undefined,
    price: e.PriceInRobux, isFree: e.IsForSale && e.PriceInRobux === 0, isOffSale: !e.IsForSale,
    restriction: e.IsLimited || e.IsLimitedUnique ? 'limited' : e.CollectibleItemId ? 'collectible' : 'none',
    lowestResale: null, status: [], thumb: old?.thumb, observedAt: Date.now(),
  };
  if (old && (old.price !== rec.price || old.isOffSale !== rec.isOffSale)) { rec.prevPrice = old.isOffSale ? null : old.price; rec.prevObservedAt = old.observedAt; }
  return rec;
}

/** `lite` (price indexing across a whole profile): catalog only, no per-item economy fallback and no thumbnails. */
async function resolveAssets(ids: number[], refs: Rpc['assets.resolve']['req']['refs'], force: boolean, allowStale = false, lite = false): Promise<Record<number, AssetView>> {
  const uniq = [...new Set(ids)];
  const refById = new Map(refs.map((r) => [r.id, r]));
  const recs = await db.getMany<AssetRec>('assets', uniq);
  const out: Record<number, AssetView> = {};
  const stale: number[] = [];
  // Fresh records written by a lite (price-only) pass have no picture yet; fetch just the pictures for those.
  const thumbless: number[] = [];
  uniq.forEach((id, i) => {
    const r = recs[i];
    if (r && !force && (allowStale || Date.now() - r.observedAt < ASSET_TTL)) {
      out[id] = { id, provenance: 'cached', rec: r, ref: refById.get(id) };
      if (!r.thumb && !lite && !allowStale) thumbless.push(id);
    } else if (allowStale) out[id] = { id, provenance: 'unknown', ref: refById.get(id) };
    else stale.push(id);
  });
  if (thumbless.length) {
    try {
      const t = await rbx.assetThumbs(thumbless);
      const upd: AssetRec[] = [];
      for (const id of thumbless) {
        const url = t[id]?.url;
        if (url && out[id]?.rec) { const rec = { ...out[id].rec!, thumb: url }; out[id] = { ...out[id], rec }; upd.push(rec); }
      }
      if (upd.length) await db.putMany('assets', upd);
    } catch { /* thumbnails are optional */ }
  }
  if (stale.length) {
    const resolved = new Map<number, AssetRec>();
    const oldById = new Map(uniq.map((id, i) => [id, recs[i]]));
    let catalogOk = true;
    try {
      const items = await once(`catalog:${stale.join(',')}`, () => rbx.catalogDetails(stale));
      for (const c of items) resolved.set(c.id, fromCatalog(c, oldById.get(c.id)));
    } catch { catalogOk = false; }
    // The catalog omits things it can't show (deleted, moderated, some non-catalog assets); economy may still know them.
    const leftovers = lite ? [] : stale.filter((id) => !resolved.has(id)).slice(0, 24);
    await Promise.all(leftovers.map(async (id) => {
      try {
        const e = await rbx.economyDetails(id);
        if (e) resolved.set(id, fromEconomy(e, oldById.get(id)));
      } catch { /* leave unresolved */ }
    }));
    // Thumbnails for anything resolved without one.
    const needThumb = lite ? [] : stale.filter((id) => !resolved.get(id)?.thumb && (resolved.has(id) || oldById.get(id)));
    if (needThumb.length) {
      try {
        const t = await rbx.assetThumbs(needThumb);
        for (const id of needThumb) {
          const r = resolved.get(id);
          if (r && t[id]?.url) r.thumb = t[id].url!;
        }
      } catch { /* thumbnails are optional */ }
    }
    await db.putMany('assets', [...resolved.values()]);
    for (const id of stale) {
      const r = resolved.get(id);
      const old = oldById.get(id);
      if (r) out[id] = { id, provenance: 'live', rec: r, ref: refById.get(id) };
      else if (old) out[id] = { id, provenance: catalogOk ? 'last-known' : 'cached', rec: old, ref: refById.get(id) };
      else out[id] = { id, provenance: 'unknown', ref: refById.get(id) };
    }
  }
  return out;
}

// ---- library ---------------------------------------------------------------------------------
async function saveToLibrary(p: Rpc['library.save']['req']): Promise<LibraryEntry> {
  const key = outfitKey(p.userId, p.outfitId);
  const existing = await db.get<LibraryEntry>('library', key);
  const { details } = await outfitDetails(p.userId, p.outfitId, false);
  const views = await resolveAssets(details.assets.map((a) => a.id), details.assets, false);
  const assets: Record<number, AssetRec> = {};
  for (const v of Object.values(views)) if (v.rec) assets[v.id] = v.rec;
  const thumbs = await outfitThumbs([p.outfitId], '420x420');
  const entry: LibraryEntry = {
    key, userId: p.userId, userName: p.userName, outfitId: p.outfitId, name: p.name || details.name,
    savedAt: existing?.savedAt ?? Date.now(),
    tags: [...new Set([...(existing?.tags ?? []), ...(p.tags ?? [])])], note: existing?.note ?? '',
    collection: p.collection ?? existing?.collection ?? '',
    thumb: thumbs[p.outfitId]?.url ?? existing?.thumb ?? undefined, details, assets,
    ...(existing?.favorite || p.favorite ? { favorite: true } : {}),
  };
  await db.put('library', entry);
  return entry;
}

const cleanTag = (t: string) => t.trim().slice(0, 40);
async function bulk(r: Rpc['library.bulk']['req']): Promise<{ changed: number }> {
  const keys = new Set(r.keys);
  const all = (await db.getAll<LibraryEntry>('library')).filter((e) => keys.has(e.key));
  const v = (r.value ?? '').trim();
  const next = all.map((e) => {
    switch (r.op) {
      case 'move': return { ...e, collection: v.slice(0, 80) };
      case 'tag': return v ? { ...e, tags: [...new Set([...e.tags, cleanTag(v)])] } : e;
      case 'untag': return { ...e, tags: e.tags.filter((t) => t !== v) };
      case 'favorite': return { ...e, favorite: true };
      case 'unfavorite': { const { favorite: _, ...rest } = e; return rest; }
    }
  });
  await db.putMany('library', next);
  return { changed: next.length };
}

async function collectionOp(r: Rpc['library.collection']['req']): Promise<{ changed: number }> {
  const all = (await db.getAll<LibraryEntry>('library')).filter((e) => e.collection === r.name);
  if (r.op === 'rename') {
    const to = (r.to ?? '').trim().slice(0, 80);
    if (!to) throw { kind: 'bad-response', message: 'A collection needs a name.' };
    await db.putMany('library', all.map((e) => ({ ...e, collection: to })));
  } else if (r.removeEntries) {
    await db.del('library', all.map((e) => e.key));
  } else {
    await db.putMany('library', all.map((e) => ({ ...e, collection: '' })));
  }
  return { changed: all.length };
}

async function lookupUser(query: string): Promise<rbx.UserInfo | null> {
  const q = query.trim();
  const url = /roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i.exec(q);
  const id = url ? Number(url[1]) : /^#?\d{1,19}$/.test(q) ? Number(q.replace('#', '')) : 0;
  if (id) return rbx.userById(id);
  const name = q.replace(/^@/, '');
  if (!/^[A-Za-z0-9_]{3,20}$/.test(name)) return null;
  return rbx.userByName(name);
}


/** Schema 2 = schema 1 plus optional favorite/source on entries. `keys` exports just those outfits (no caches). */
async function exportAll(keys?: string[]) {
  const meta = { app: BACKUP_APP, schema: BACKUP_SCHEMA, exportedAt: new Date().toISOString() };
  if (keys) {
    const want = new Set(keys);
    const library = (await db.getAll<LibraryEntry>('library')).filter((e) => want.has(e.key));
    const snapshots = (await db.getAll<Snapshot>('snapshots')).filter((s) => want.has(s.outfitKey));
    const ids = new Set(library.flatMap((e) => e.details.assets.map((a) => a.id)));
    const assets = (await db.getAll<AssetRec>('assets')).filter((a) => ids.has(a.id));
    return { ...meta, library, snapshots, assets };
  }
  const [library, snapshots, assets, users, outfits] = await Promise.all([
    db.getAll('library'), db.getAll('snapshots'), db.getAll('assets'), db.getAll('users'), db.getAll('outfits'),
  ]);
  return { ...meta, library, snapshots, assets, users, outfits };
}

/** Validates first (shared/backup.ts), reports, and only writes when not a dry run. Never overwrites fresher item data. */
async function importAll(r: Rpc['data.import']['req']) {
  const existing = await db.getAll<LibraryEntry>('library');
  const byKey = new Map(existing.map((e) => [e.key, e]));
  const plan = await planImport(r.data, new Set(byKey.keys()), !!r.replace);
  if (r.dryRun) return plan.report;
  if (plan.report.kind === 'unknown') throw { kind: 'bad-response', message: plan.report.problems[0] ?? 'That isn’t something RoFit can import.' };
  // Replacing refreshes contents but keeps what the user wrote.
  const entries = plan.entries.map((e) => {
    const old = byKey.get(e.key);
    if (!old) return e;
    return { ...e, savedAt: old.savedAt, note: e.note || old.note, collection: e.collection || old.collection, tags: [...new Set([...old.tags, ...e.tags])], ...(old.favorite || e.favorite ? { favorite: true } : {}) };
  });
  await db.putMany('library', entries);
  if (plan.assets.length) {
    const have = new Map((await db.getMany<AssetRec>('assets', plan.assets.map((a) => a.id))).filter((a): a is AssetRec => !!a).map((a) => [a.id, a]));
    await db.putMany('assets', plan.assets.filter((a) => (have.get(a.id)?.observedAt ?? -1) < a.observedAt));
  }
  if (plan.snapshots.length) {
    const existingSnaps = new Set((await db.getAll<Snapshot>('snapshots')).map((s) => s.outfitKey + s.hash));
    await db.putMany('snapshots', plan.snapshots.filter((s) => !existingSnaps.has(s.outfitKey + s.hash)));
  }
  return plan.report;
}

// ---- dispatcher ------------------------------------------------------------------------------
type Handler<K extends RpcType> = (req: Rpc[K]['req']) => Promise<Rpc[K]['res']>;
type Handlers = { [K in RpcType]?: Handler<K> };

export function makeHandlers(extra: { diag: () => Promise<Rpc['diag.get']['res']>; openPage: (route: string) => Promise<void>; openUrls: (urls: string[]) => Promise<void> }): Handlers {
  return {
    'outfits.cached': (r) => cachedOutfits(r.userId),
    'outfits.sync': (r) => once(`sync:${r.userId}`, () => syncOutfits(r.userId, r.userName, !!r.force)),
    'outfits.thumbs': (r) => outfitThumbs(r.ids, r.size ?? '150x150'),
    'outfits.details': (r) => outfitDetails(r.userId, r.id, !!r.force, !!r.allowStale),
    'outfits.allDetails': async (r) => (hidden(await db.get<UserRec>('users', r.userId)) ? [] : db.getAllByIndex<OutfitDetails>('details', 'userId', r.userId)),
    'assets.resolve': (r) => resolveAssets(r.ids, r.refs, !!r.force, !!r.allowStale, !!r.lite),
    'assets.known': async (r) => (await db.getMany<AssetRec>('assets', [...new Set(r.ids)])).filter((a): a is AssetRec => !!a),
    'assets.resale': (r) => rbx.resaleData(r.id),
    'assets.owned': async (r) => {
      const me = await rbx.authenticatedUser();
      if (!me) return { me: null, owned: {} };
      const owned: Record<number, boolean> = {};
      await Promise.all([...new Set(r.ids)].map(async (id) => {
        const c = ownedCache.get(id);
        if (c && Date.now() - c.at < OWNED_TTL) { owned[id] = c.v; return; }
        try { const v = await rbx.isOwned(me.id, id); ownedCache.set(id, { v, at: Date.now() }); owned[id] = v; } catch { /* unknown stays absent */ }
      }));
      return { me, owned };
    },
    'me.avatar': async () => {
      const me = await rbx.authenticatedUser();
      if (!me) return { me: null, avatar: null };
      return { me, avatar: await rbx.myAvatar() };
    },
    'user.worn': async (r) => {
      const w = await rbx.wornNow(r.userId);
      const t = (await rbx.userAvatarThumb(r.userId).catch(() => ({} as Record<number, { state: string; url: string | null }>)))[r.userId];
      return { ...w, thumb: t ?? null };
    },
    'history.list': async (r) => (await db.getAllByIndex<Snapshot>('snapshots', 'outfitKey', outfitKey(r.userId, r.id))).sort((a, b) => b.at - a.at),
    'library.list': () => db.getAll<LibraryEntry>('library').then((l) => l.sort((a, b) => b.savedAt - a.savedAt)),
    'library.keys': async () => (await db.getAll<LibraryEntry>('library')).map((l) => l.key),
    'library.save': (r) => saveToLibrary(r),
    'library.update': async (r) => {
      const e = await db.get<LibraryEntry>('library', r.key);
      if (!e) throw { kind: 'not-found', message: 'That outfit is no longer in your library.' };
      const next = { ...e, ...r.patch };
      await db.put('library', next);
      return next;
    },
    'library.remove': async (r) => { await db.del('library', r.keys); return null; },
    'library.bulk': (r) => bulk(r),
    'library.collection': (r) => collectionOp(r),
    'data.export': (r) => exportAll(r?.keys),
    'data.import': (r) => importAll(r),
    'data.clear': async (r) => {
      if (r.what === 'cache' || r.what === 'all') for (const s of ['users', 'outfits', 'details', 'assets', 'thumbs'] as const) await db.clear(s);
      if (r.what === 'history' || r.what === 'all') await db.clear('snapshots');
      if (r.what === 'library' || r.what === 'all') await db.clear('library');
      ownedCache.clear();
      return null;
    },
    'diag.get': () => extra.diag(),
    'page.openUrls': async (r) => { await extra.openUrls(r.urls); return null; },
    'users.recent': async (r) => (await db.getAll<UserRec>('users')).filter((u) => u.name).sort((a, b) => b.lastSeen - a.lastSeen).slice(0, r?.limit ?? 6),
    'users.lookup': (r) => lookupUser(r.query),
    'page.open': async (r) => { await extra.openPage(r.route); return null; },
  };
}

