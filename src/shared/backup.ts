/**
 * Import planning. Everything that arrives from outside (a backup file, a single-outfit manifest, a pasted share link)
 * passes through here first: it's classified, validated field by field, capped, and turned into library entries plus
 * a report the UI shows before anything is written. Pure, so the same code runs in tests, the UI and the worker.
 */
import type { AssetRec, BodyColors, BodyScale, LibraryEntry, OutfitDetails, Snapshot } from './types.ts';
import { outfitKey } from './types.ts';
import { ASSET_TYPES, typeName } from './assetTypes.ts';
import { decodeShare, payloadFrom, THUMB_HOST, type SharedOutfit } from './share.ts';

export const BACKUP_APP = 'rofit-inspector';
export const BACKUP_SCHEMA = 2;

export type ImportKind = 'backup' | 'manifest' | 'share' | 'unknown';
export interface ImportReport {
  kind: ImportKind;
  /** Outfits found in the input. */
  found: number;
  /** New to this library. */
  add: number;
  /** Already in the library: skipped, or replaced when asked. */
  existing: number;
  replace: boolean;
  /** Dropped because they failed validation. */
  invalid: number;
  assets: number;
  snapshots: number;
  problems: string[];
}
export interface ImportPlan { report: ImportReport; entries: LibraryEntry[]; assets: AssetRec[]; snapshots: Snapshot[] }

const PARTS: (keyof BodyColors)[] = ['head', 'torso', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg'];
const SCALES: (keyof BodyScale)[] = ['height', 'width', 'head', 'depth', 'proportion', 'bodyType'];
const isId = (v: unknown): v is number => typeof v === 'number' && Number.isSafeInteger(v) && v > 0;
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const str = (v: unknown, max: number): string | null => (typeof v === 'string' ? (v.length > max ? v.slice(0, max) : v) : null);
const obj = (v: unknown): Record<string, any> | null => (v && typeof v === 'object' && !Array.isArray(v) ? v as Record<string, any> : null);
const cdn = (v: unknown): string | undefined => (typeof v === 'string' && v.startsWith(THUMB_HOST) && v.length < 400 && /^[\x21-\x7e]+$/.test(v) ? v : undefined);

function colors(v: unknown): BodyColors | null {
  const o = obj(v);
  if (!o) return null;
  const out = {} as BodyColors;
  for (const k of PARTS) { if (typeof o[k] !== 'string' || !/^[0-9A-Fa-f]{6}$/.test(o[k])) return null; out[k] = o[k].toUpperCase(); }
  return out;
}
function scale(v: unknown): BodyScale | null {
  const o = obj(v);
  if (!o) return null;
  const out = {} as BodyScale;
  for (const k of SCALES) { if (!isNum(o[k]) || o[k] < -1 || o[k] > 5) return null; out[k] = o[k]; }
  return out;
}

export function validDetails(v: unknown): OutfitDetails | string {
  const d = obj(v);
  if (!d) return 'missing outfit contents';
  if (!isId(d.id)) return 'bad outfit ID';
  if (!Array.isArray(d.assets) || d.assets.length > 120) return 'bad item list';
  const assets = [];
  for (const a of d.assets) {
    const o = obj(a);
    if (!o || !isId(o.id) || !Number.isInteger(o.assetTypeId) || o.assetTypeId < 0) return 'bad item in list';
    assets.push({ id: o.id, name: str(o.name, 200) ?? '', assetTypeId: o.assetTypeId, assetTypeName: str(o.assetTypeName, 60) ?? typeName(o.assetTypeId) });
  }
  const bc = colors(d.bodyColors), sc = scale(d.scale);
  if (!bc) return 'bad body colors';
  if (!sc) return 'bad body scale';
  return {
    id: d.id, name: str(d.name, 200) ?? '', assets, bodyColors: bc, scale: sc,
    avatarType: d.avatarType === 'R6' ? 'R6' : 'R15', outfitType: str(d.outfitType, 40) ?? 'Avatar', fetchedAt: isNum(d.fetchedAt) ? d.fetchedAt : 0,
  };
}

export function validAsset(v: unknown): AssetRec | null {
  const a = obj(v);
  if (!a || !isId(a.id) || !Number.isInteger(a.assetTypeId)) return null;
  const c = obj(a.creator);
  return {
    id: a.id, name: str(a.name, 200) ?? '', assetTypeId: a.assetTypeId,
    creator: c && isNum(c.id) ? { id: c.id, name: str(c.name, 60) ?? '', type: str(c.type, 20) ?? 'User', verified: c.verified === true } : undefined,
    price: isNum(a.price) && a.price >= 0 ? a.price : null, isFree: a.isFree === true, isOffSale: a.isOffSale === true,
    restriction: a.restriction === 'limited' || a.restriction === 'collectible' ? a.restriction : 'none',
    lowestResale: isNum(a.lowestResale) && a.lowestResale > 0 ? a.lowestResale : null,
    status: Array.isArray(a.status) ? a.status.filter((x: unknown) => typeof x === 'string').slice(0, 8) : [],
    thumb: cdn(a.thumb), observedAt: isNum(a.observedAt) ? a.observedAt : 0,
    ...(isNum(a.prevObservedAt) ? { prevObservedAt: a.prevObservedAt, prevPrice: isNum(a.prevPrice) ? a.prevPrice : null } : {}),
  };
}

export function validEntry(v: unknown): LibraryEntry | string {
  const l = obj(v);
  if (!l) return 'not an object';
  if (!isId(l.userId) || !isId(l.outfitId)) return 'bad user or outfit ID';
  if (l.key !== outfitKey(l.userId, l.outfitId)) return 'key doesn’t match its IDs';
  const details = validDetails(l.details);
  if (typeof details === 'string') return details;
  const assets: Record<number, AssetRec> = {};
  for (const a of Object.values(obj(l.assets) ?? {})) { const r = validAsset(a); if (r) assets[r.id] = r; }
  const tags = Array.isArray(l.tags) ? [...new Set(l.tags.filter((t: unknown) => typeof t === 'string').map((t: string) => t.trim().slice(0, 40)).filter(Boolean))].slice(0, 30) as string[] : [];
  return {
    key: l.key, userId: l.userId, userName: str(l.userName, 60) ?? '', outfitId: l.outfitId, name: str(l.name, 200) ?? details.name,
    savedAt: isNum(l.savedAt) ? l.savedAt : Date.now(), tags, note: str(l.note, 4000) ?? '', collection: (str(l.collection, 80) ?? '').trim(),
    thumb: cdn(l.thumb), details, assets,
    ...(l.favorite === true ? { favorite: true } : {}),
    ...(l.source === 'share' || l.source === 'import' ? { source: l.source } : {}),
  };
}

function validSnapshot(v: unknown): Snapshot | null {
  const s = obj(v);
  if (!s || typeof s.outfitKey !== 'string' || !/^\d+:\d+$/.test(s.outfitKey) || !isNum(s.at) || typeof s.hash !== 'string') return null;
  if (!Array.isArray(s.assetIds) || !s.assetIds.every(isId)) return null;
  const bc = colors(s.bodyColors), sc = scale(s.scale);
  if (!bc || !sc) return null;
  const names: Record<number, string> = {};
  for (const [k, n] of Object.entries(obj(s.assetNames) ?? {})) if (typeof n === 'string') names[Number(k)] = n.slice(0, 200);
  return { outfitKey: s.outfitKey, at: s.at, hash: s.hash.slice(0, 64), name: str(s.name, 200) ?? '', assetIds: s.assetIds, assetNames: names, bodyColors: bc, scale: sc, avatarType: s.avatarType === 'R6' ? 'R6' : 'R15' };
}

const TYPE_BY_NAME = new Map(Object.entries(ASSET_TYPES).map(([id, t]) => [t.name.toLowerCase(), Number(id)]));

/** Library entry from a snapshot someone shared. Prices aren't in links, so none are invented: assets carry names and images only. */
export function entryFromShare(s: SharedOutfit, now = Date.now()): LibraryEntry {
  const assets: Record<number, AssetRec> = {};
  for (const it of s.items) {
    assets[it.id] = { id: it.id, name: it.name, assetTypeId: it.typeId, price: null, isFree: false, isOffSale: false, restriction: 'none', lowestResale: null, status: [], thumb: it.thumb, observedAt: s.at };
  }
  return {
    key: outfitKey(s.user.id, s.outfit.id), userId: s.user.id, userName: s.user.name, outfitId: s.outfit.id, name: s.outfit.name,
    savedAt: now, tags: [], note: '', collection: '', thumb: s.thumb, source: 'share', assets,
    details: {
      id: s.outfit.id, name: s.outfit.name, avatarType: s.avatarType, outfitType: 'Avatar', fetchedAt: s.at,
      assets: s.items.map((it) => ({ id: it.id, name: it.name, assetTypeId: it.typeId, assetTypeName: typeName(it.typeId) })),
      bodyColors: s.bodyColors, scale: s.scale,
    },
  };
}

/** Library entry from an Inspector manifest (RoFit 1.x manifests carry type names; 2.0 adds typeId). */
function entryFromManifest(m: Record<string, any>, now: number): LibraryEntry | string {
  const o = obj(m.outfit);
  const u = obj(o?.user);
  if (!o || !u || !isId(o.id) || !isId(u.id)) return 'manifest is missing the outfit or its owner';
  if (!Array.isArray(m.items) || m.items.length > 120) return 'manifest item list is malformed';
  const bc = colors(o.bodyColors), sc = scale(o.scale);
  if (!bc || !sc) return 'manifest body settings are malformed';
  const assets = [];
  for (const it of m.items) {
    const x = obj(it);
    if (!x || !isId(x.id)) return 'manifest has a malformed item';
    const typeId = Number.isInteger(x.typeId) ? x.typeId : TYPE_BY_NAME.get(String(x.type ?? '').toLowerCase()) ?? 0;
    assets.push({ id: x.id, name: str(x.name, 200) ?? '', assetTypeId: typeId, assetTypeName: typeName(typeId, str(x.type, 60) ?? 'Item') });
  }
  const at = typeof m.exportedAt === 'string' && !Number.isNaN(Date.parse(m.exportedAt)) ? Date.parse(m.exportedAt) : now;
  return {
    key: outfitKey(u.id, o.id), userId: u.id, userName: str(u.name, 60) ?? '', outfitId: o.id, name: str(o.name, 200) ?? '',
    savedAt: now, tags: [], note: '', collection: '', source: 'import', assets: {},
    details: { id: o.id, name: str(o.name, 200) ?? '', assets, bodyColors: bc, scale: sc, avatarType: o.avatarType === 'R6' ? 'R6' : 'R15', outfitType: 'Avatar', fetchedAt: at },
  };
}

/** Works out what an import would do. `have` = keys already in the library. Nothing is written here. */
export async function planImport(input: unknown, have: Set<string>, replace = false, now = Date.now()): Promise<ImportPlan> {
  const report: ImportReport = { kind: 'unknown', found: 0, add: 0, existing: 0, replace, invalid: 0, assets: 0, snapshots: 0, problems: [] };
  const plan: ImportPlan = { report, entries: [], assets: [], snapshots: [] };
  const problem = (s: string) => { if (report.problems.length < 8) report.problems.push(s); };
  let data = input;

  if (typeof data === 'string') {
    const text = data.trim();
    const payload = payloadFrom(text);
    if (payload) {
      report.kind = 'share'; report.found = 1;
      try { plan.entries.push(entryFromShare(await decodeShare(payload), now)); }
      catch (e) { report.invalid = 1; problem((e as Error).message); }
    } else {
      try { data = JSON.parse(text); } catch { problem('That isn’t a RoFit share link or a RoFit file.'); return finish(plan, have); }
    }
  }

  const o = obj(data);
  if (report.kind === 'unknown' && o) {
    if (o.app === BACKUP_APP && (o.schema === 1 || o.schema === 2) && Array.isArray(o.library)) {
      report.kind = 'backup';
      report.found = o.library.length;
      const seen = new Set<string>();
      o.library.forEach((raw: unknown, i: number) => {
        const r = validEntry(raw);
        if (typeof r === 'string') { report.invalid++; problem(`Outfit ${i + 1}: ${r}`); return; }
        if (seen.has(r.key)) { report.invalid++; problem(`Outfit ${i + 1}: duplicate of an earlier one`); return; }
        seen.add(r.key);
        plan.entries.push(r);
      });
      for (const a of Array.isArray(o.assets) ? o.assets.slice(0, 50_000) : []) { const r = validAsset(a); if (r) plan.assets.push(r); }
      for (const s of Array.isArray(o.snapshots) ? o.snapshots.slice(0, 50_000) : []) { const r = validSnapshot(s); if (r) plan.snapshots.push(r); }
    } else if (obj(o.outfit) && Array.isArray(o.items)) {
      report.kind = 'manifest'; report.found = 1;
      const r = entryFromManifest(o, now);
      if (typeof r === 'string') { report.invalid = 1; problem(r); } else plan.entries.push(r);
    } else if (o.app === BACKUP_APP && typeof o.schema === 'number' && o.schema > BACKUP_SCHEMA) {
      problem('This backup was made by a newer RoFit. Update RoFit, then import it.');
    } else {
      problem('That file isn’t a RoFit backup, outfit manifest or share link.');
    }
  } else if (report.kind === 'unknown' && typeof input !== 'string') {
    problem('That file isn’t a RoFit backup, outfit manifest or share link.');
  }
  return finish(plan, have);
}

function finish(plan: ImportPlan, have: Set<string>): ImportPlan {
  const r = plan.report;
  r.existing = plan.entries.filter((e) => have.has(e.key)).length;
  r.add = plan.entries.length - r.existing;
  if (!r.replace) plan.entries = plan.entries.filter((e) => !have.has(e.key));
  r.assets = plan.assets.length;
  r.snapshots = plan.snapshots.length;
  return plan;
}
