/** Request handlers for the service worker. Pure orchestration: network via roblox.ts, persistence via db.ts. */
import * as db from './db.ts';
import * as rbx from './roblox.ts';
import { loadSettings } from '../shared/settings.ts';
import { configHash, describeChange } from '../shared/analysis.ts';
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
async function cachedOutfits(userId: number) {
  const [outfits, user] = await Promise.all([
    db.getAllByIndex<OutfitRec & { key: string }>('outfits', 'userId', userId),
    db.get<UserRec>('users', userId),
  ]);
  return { outfits: outfits.filter((o) => !o.missingSince).sort((a, b) => a.order - b.order), user };
}

async function syncOutfits(userId: number, userName: string | undefined, force: boolean): Promise<Rpc['outfits.sync']['res']> {
  const settings = await loadSettings();
  const user = await db.get<UserRec>('users', userId);
  const prev = await db.getAllByIndex<OutfitRec & { key: string }>('outfits', 'userId', userId);
  // An empty (or presets-only) answer is never trusted as fresh: privacy and sign-in state can change between visits.
  const hadReal = prev.some((o) => o.isEditable && !o.missingSince);
  const fresh = user?.lastSyncAt && Date.now() - user.lastSyncAt < settings.cacheMinutes * 60_000 && hadReal;
  if (fresh && !force) {
    return { outfits: prev.filter((o) => !o.missingSince).sort((a, b) => a.order - b.order), source: 'cached', fetchedAt: user!.lastSyncAt!, via: 'cache', removed: [], added: [], renamed: [] };
  }
  let listed: Awaited<ReturnType<typeof rbx.listOutfits>>;
  try { listed = await rbx.listOutfits(userId); } catch (e) {
    // Why Roblox said no often depends on who is asking, so say whether it saw a signed-in viewer.
    const k = (e as { kind?: string }).kind;
    if (k === 'forbidden' || k === 'unauthenticated' || k === 'not-found') (e as { viewer?: string }).viewer = await viewerState();
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
  await db.put('users', {
    id: userId, name: userName ?? user?.name ?? '', displayName: user?.displayName ?? '', lastSeen: now,
    outfitCount: next.filter((o) => o.isEditable).length, lastSyncAt: now,
  } satisfies UserRec);
  const viewer = next.some((o) => o.isEditable) ? undefined : await viewerState();
  return { outfits: next, source: 'live', fetchedAt: now, via, removed: gone.map((o) => o.id), added: prev.length ? added : [], renamed, viewer };
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
    // 'Pending' thumbnails are re-asked soon; completed URLs are content-addressed and stable for days.
    const ttl = h?.state === 'Completed' ? 6 * 3600_000 : 20_000;
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

async function resolveAssets(ids: number[], refs: Rpc['assets.resolve']['req']['refs'], force: boolean, allowStale = false): Promise<Record<number, AssetView>> {
  const uniq = [...new Set(ids)];
  const refById = new Map(refs.map((r) => [r.id, r]));
  const recs = await db.getMany<AssetRec>('assets', uniq);
  const out: Record<number, AssetView> = {};
  const stale: number[] = [];
  uniq.forEach((id, i) => {
    const r = recs[i];
    if (r && !force && (allowStale || Date.now() - r.observedAt < ASSET_TTL)) out[id] = { id, provenance: 'cached', rec: r, ref: refById.get(id) };
    else if (allowStale) out[id] = { id, provenance: 'unknown', ref: refById.get(id) };
    else stale.push(id);
  });
  if (stale.length) {
    const resolved = new Map<number, AssetRec>();
    const oldById = new Map(uniq.map((id, i) => [id, recs[i]]));
    let catalogOk = true;
    try {
      const items = await once(`catalog:${stale.join(',')}`, () => rbx.catalogDetails(stale));
      for (const c of items) resolved.set(c.id, fromCatalog(c, oldById.get(c.id)));
    } catch { catalogOk = false; }
    // The catalog omits things it can't show (deleted, moderated, some non-catalog assets); economy may still know them.
    const leftovers = stale.filter((id) => !resolved.has(id)).slice(0, 24);
    await Promise.all(leftovers.map(async (id) => {
      try {
        const e = await rbx.economyDetails(id);
        if (e) resolved.set(id, fromEconomy(e, oldById.get(id)));
      } catch { /* leave unresolved */ }
    }));
    // Thumbnails for anything resolved without one.
    const needThumb = stale.filter((id) => !resolved.get(id)?.thumb && (resolved.has(id) || oldById.get(id)));
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
    savedAt: existing?.savedAt ?? Date.now(), tags: existing?.tags ?? [], note: existing?.note ?? '', collection: existing?.collection ?? '',
    thumb: thumbs[p.outfitId]?.url ?? existing?.thumb ?? undefined, details, assets,
  };
  await db.put('library', entry);
  return entry;
}


async function exportAll() {
  const [library, snapshots, assets, users, outfits] = await Promise.all([
    db.getAll('library'), db.getAll('snapshots'), db.getAll('assets'), db.getAll('users'), db.getAll('outfits'),
  ]);
  return { app: 'rofit-inspector', schema: 1, exportedAt: new Date().toISOString(), library, snapshots, assets, users, outfits };
}

async function importAll(data: any): Promise<{ added: number; skipped: number }> {
  if (!data || data.app !== 'rofit-inspector' || data.schema !== 1) throw { kind: 'bad-response', message: 'This file isn’t a RoFit export.' };
  const have = new Set((await db.getAll<LibraryEntry>('library')).map((l) => l.key));
  const lib = (Array.isArray(data.library) ? data.library : []).filter((l: any) => l && typeof l.key === 'string' && l.details?.assets);
  const fresh = lib.filter((l: LibraryEntry) => !have.has(l.key));
  await db.putMany('library', fresh);
  const haveAssets = new Set((await db.getAll<AssetRec>('assets')).map((a) => a.id));
  await db.putMany('assets', (Array.isArray(data.assets) ? data.assets : []).filter((a: AssetRec) => a && typeof a.id === 'number' && !haveAssets.has(a.id)));
  const snaps = (Array.isArray(data.snapshots) ? data.snapshots : []).map((s: Snapshot) => { const { id, ...rest } = s; return rest; });
  const existingSnaps = new Set((await db.getAll<Snapshot>('snapshots')).map((s) => s.outfitKey + s.hash));
  await db.putMany('snapshots', snaps.filter((s: Snapshot) => s.outfitKey && !existingSnaps.has(s.outfitKey + s.hash)));
  return { added: fresh.length, skipped: lib.length - fresh.length };
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
    'outfits.allDetails': async (r) => (await db.getAllByIndex<OutfitDetails>('details', 'userId', r.userId)),
    'assets.resolve': (r) => resolveAssets(r.ids, r.refs, !!r.force, !!r.allowStale),
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
    'data.export': () => exportAll(),
    'data.import': (r) => importAll(r.data),
    'data.clear': async (r) => {
      if (r.what === 'cache' || r.what === 'all') for (const s of ['users', 'outfits', 'details', 'assets', 'thumbs'] as const) await db.clear(s);
      if (r.what === 'history' || r.what === 'all') await db.clear('snapshots');
      if (r.what === 'library' || r.what === 'all') await db.clear('library');
      ownedCache.clear();
      return null;
    },
    'diag.get': () => extra.diag(),
    'page.openUrls': async (r) => { await extra.openUrls(r.urls); return null; },
    'users.recent': async () => (await db.getAll<UserRec>('users')).filter((u) => u.name).sort((a, b) => b.lastSeen - a.lastSeen).slice(0, 6),
    'page.open': async (r) => { await extra.openPage(r.route); return null; },
  };
}

