/**
 * A pretend Roblox API that answers the exact endpoints RoFit's real adapter (src/background/roblox.ts) calls, in the
 * response shapes that adapter parses. Data comes from fixtures.ts. Behaviours worth seeing are reproduced on purpose:
 * the catalog's CSRF handshake on POST, the catalog omitting items it can't show, economy as a fallback that answers
 * 400/404 for gone items, outfit privacy as a 403, presets mixed into the list, token pagination.
 *
 * Error wording: where the real adapter's tests pin Roblox's text ("The specified user does not exist.",
 * "Insufficient permissions") the same text is used; nothing else claims to quote Roblox.
 */
import { ITEM, ITEMS, USER, USERS, VIEWER, type SampleItem, type SampleOutfit } from './fixtures.ts';
import { renderFigure, renderItem, svgUrl } from './art.ts';

export interface SimRequest { method: string; url: URL; headers: Record<string, string>; body?: string }
export interface SimResponse { status: number; json?: unknown; headers?: Record<string, string> }

const ROBLOX_TYPE: Record<number, string> = {
  2: 'TShirt', 8: 'Hat', 11: 'Shirt', 12: 'Pants', 17: 'Head', 18: 'Face', 27: 'Torso', 28: 'RightArm', 29: 'LeftArm',
  30: 'LeftLeg', 31: 'RightLeg', 41: 'HairAccessory', 42: 'FaceAccessory', 43: 'NeckAccessory', 44: 'ShoulderAccessory',
  46: 'BackAccessory', 47: 'WaistAccessory', 51: 'IdleAnimation', 53: 'RunAnimation', 55: 'WalkAnimation', 65: 'ShirtAccessory',
  66: 'PantsAccessory', 67: 'JacketAccessory', 68: 'SweaterAccessory', 69: 'ShortsAccessory', 70: 'LeftShoeAccessory',
  71: 'RightShoeAccessory', 72: 'DressSkirtAccessory',
};

// ---- mutable world (events in the demo change it) -------------------------------------------------------
interface World { outfits: Map<number, SampleOutfit[]>; items: Map<number, SampleItem>; gone: Set<number>; signedIn: boolean }
let world: World;
export function resetWorld() {
  world = {
    outfits: new Map(USERS.map((u) => [u.id, u.outfits.map((o) => ({ ...o, items: [...o.items], scale: o.scale && { ...o.scale } }))])),
    items: new Map(ITEMS.map((i) => [i.id, { ...i }])),
    gone: new Set(),
    signedIn: false,
  };
}
resetWorld();

export const setSignedIn = (v: boolean) => { world.signedIn = v; };
export const isSignedIn = () => world.signedIn;

export function outfitsOf(userId: number) { return world.outfits.get(userId) ?? []; }
export function findOutfit(id: number): SampleOutfit | undefined {
  for (const list of world.outfits.values()) { const o = list.find((x) => x.id === id); if (o) return o; }
  return undefined;
}
export const itemOf = (id: number) => world.items.get(id);

/** Owner-side changes the visitor can trigger, so RoFit's change detection and provenance have something real to notice. */
export const EVENTS = {
  rename: { label: 'The owner renames “Rainy day”', run: () => { const o = findOutfit(800000000000101); if (o) o.name = o.name === 'Rainy day' ? 'Rainy day (original)' : 'Rainy day'; } },
  swap: { label: 'The owner swaps the hat in “Rainy day, scarf”', run: () => { const o = findOutfit(800000000000102); if (!o) return; const i = o.items.indexOf(910000000000020); if (i >= 0) o.items[i] = 910000000000022; else { const j = o.items.indexOf(910000000000022); if (j >= 0) o.items[j] = 910000000000020; } } },
  price: { label: 'A creator drops the raincoat’s price', run: () => { const it = world.items.get(910000000000060); if (it) it.price = it.price === 110 ? 95 : 110; } },
  delist: { label: 'Roblox stops returning the backpack', run: () => { world.gone.has(910000000000050) ? world.gone.delete(910000000000050) : world.gone.add(910000000000050); } },
  remove: { label: 'The owner deletes “Untitled”', run: () => { const list = world.outfits.get(900000000000001)!; const i = list.findIndex((o) => o.id === 800000000000112); if (i >= 0) list.splice(i, 1); else list.push({ ...USER.get(900000000000001)!.outfits.find((o) => o.id === 800000000000112)!, items: [...USER.get(900000000000001)!.outfits.find((o) => o.id === 800000000000112)!.items] }); } },
} as const;
export type EventKey = keyof typeof EVENTS;

// ---- rendering (cached per configuration) ---------------------------------------------------------------
const thumbCache = new Map<string, string>();
export function outfitImage(o: Pick<SampleOutfit, 'skin' | 'avatarType' | 'scale' | 'items'>): string {
  const key = [o.skin, o.avatarType, JSON.stringify(o.scale ?? {}), o.items.join(',')].join('|');
  let u = thumbCache.get(key);
  if (!u) {
    u = svgUrl(renderFigure({ skin: o.skin, avatarType: o.avatarType, scale: o.scale, items: o.items.map((id) => ({ id, art: (world.items.get(id) ?? ITEM.get(id))!.art })) }));
    thumbCache.set(key, u);
  }
  return u;
}
export function itemImage(id: number): string | null {
  const it = world.items.get(id);
  if (!it) return null;
  const k = `i:${id}`;
  let u = thumbCache.get(k);
  if (!u) { u = svgUrl(renderItem(it.art)); thumbCache.set(k, u); }
  return u;
}

// ---- endpoint handlers ----------------------------------------------------------------------------------
const CSRF = 'sample-csrf-token';
const err = (status: number, message: string, code = 0, headers?: Record<string, string>): SimResponse => ({ status, json: { errors: [{ code, message }] }, headers });
const hex = (h: string) => h.toUpperCase();
const ids = (s: string | null) => (s ?? '').split(',').map(Number).filter((n) => Number.isFinite(n) && n > 0);

function details(o: SampleOutfit) {
  const c = hex(o.skin);
  return {
    id: o.id, name: o.name, isEditable: o.editable, outfitType: 'Avatar', playerAvatarType: o.avatarType,
    bodyColor3s: { headColor3: c, torsoColor3: c, rightArmColor3: c, leftArmColor3: c, rightLegColor3: c, leftLegColor3: c },
    scale: { height: o.scale?.height ?? 1, width: o.scale?.width ?? 1, head: o.scale?.head ?? 1, depth: o.scale?.depth ?? 1, proportion: o.scale?.proportion ?? 0, bodyType: o.scale?.bodyType ?? 0 },
    assets: o.items.map((id) => { const it = world.items.get(id)!; return { id, name: it.name, assetType: { id: it.type, name: ROBLOX_TYPE[it.type] ?? 'Asset' }, currentVersionId: id * 10 }; }),
  };
}

function catalogRow(it: SampleItem) {
  const free = !!it.free;
  return {
    id: it.id, itemType: 'Asset', assetType: it.type, name: it.name, creatorName: it.creator ?? 'Sample Studio', creatorTargetId: 1, creatorType: 'Group',
    creatorHasVerifiedBadge: false, price: it.offsale ? undefined : it.price ?? undefined, lowestResalePrice: it.resale,
    priceStatus: free ? 'Free' : it.offsale ? 'Off Sale' : undefined, isOffSale: !!it.offsale,
    itemRestrictions: it.restriction === 'limited' ? ['Limited'] : it.restriction === 'collectible' ? ['Collectible'] : [],
    itemStatus: [],
  };
}

export function handle(req: SimRequest): SimResponse {
  const { method, url } = req;
  const host = url.hostname.split('.')[0];
  const path = url.pathname;
  let m: RegExpMatchArray | null;

  if (host === 'avatar') {
    if ((m = path.match(/^\/v2\/avatar\/users\/(\d+)\/outfits$/)) || (m = path.match(/^\/v1\/users\/(\d+)\/outfits$/))) {
      const u = USER.get(Number(m[1]));
      if (!u) return err(400, 'The specified user does not exist.', 1);
      if (u.mode === 'private') return err(403, 'Insufficient permissions', 4);
      const all = outfitsOf(u.id).map((o) => ({ id: o.id, name: o.name, isEditable: o.editable, outfitType: 'Avatar' }));
      const per = Number(url.searchParams.get('itemsPerPage')) || 50;
      if (path.startsWith('/v1/')) { const page = Number(url.searchParams.get('page')) || 1; return { status: 200, json: { data: all.slice((page - 1) * per, page * per), total: 500 } }; }
      const start = Number(url.searchParams.get('paginationToken') || 0) || 0;
      const next = start + per < all.length ? String(start + per) : '';
      return { status: 200, json: { data: all.slice(start, start + per), paginationToken: next } };
    }
    if ((m = path.match(/^\/v3\/outfits\/(\d+)\/details$/))) {
      const o = findOutfit(Number(m[1]));
      if (!o) return err(404, 'Outfit not found', 0);
      return { status: 200, json: details(o) };
    }
    if (path === '/v1/avatar') {
      if (!world.signedIn) return err(401, 'Authorization has been denied for this request.', 0);
      const d = details({ ...VIEWER.avatar, editable: true });
      return { status: 200, json: { ...d, scales: d.scale } };
    }
  }

  if (host === 'thumbnails') {
    const size = url.searchParams.get('size') ?? '150x150';
    if (path === '/v1/users/outfits') {
      return { status: 200, json: { data: ids(url.searchParams.get('userOutfitIds')).map((id) => { const o = findOutfit(id); return o ? { targetId: id, state: 'Completed', imageUrl: outfitImage(o), version: size } : { targetId: id, state: 'Error', imageUrl: null }; }) } };
    }
    if (path === '/v1/assets') {
      return { status: 200, json: { data: ids(url.searchParams.get('assetIds')).map((id) => { const img = world.gone.has(id) ? null : itemImage(id); return img ? { targetId: id, state: 'Completed', imageUrl: img } : { targetId: id, state: 'Blocked', imageUrl: null }; }) } };
    }
  }

  if (host === 'catalog' && path === '/v1/catalog/items/details' && method === 'POST') {
    // Roblox wants a CSRF token on every POST, reads included: the first try is refused with a token to retry with.
    if (req.headers['x-csrf-token'] !== CSRF) return err(403, 'Token Validation Failed', 0, { 'x-csrf-token': CSRF });
    let wanted: number[] = [];
    try { wanted = (JSON.parse(req.body ?? '{}').items ?? []).map((x: { id: number }) => x.id); } catch { return err(400, 'Invalid request', 0); }
    const data = wanted.map((id) => world.items.get(id)).filter((it): it is SampleItem => !!it && (it.source ?? 'catalog') === 'catalog' && !world.gone.has(it.id)).map(catalogRow);
    return { status: 200, json: { data } };
  }

  if (host === 'economy') {
    if ((m = path.match(/^\/v2\/assets\/(\d+)\/details$/))) {
      const it = world.items.get(Number(m[1]));
      if (!it || it.source === 'none' || world.gone.has(it.id)) return err(400, 'Asset is invalid or does not exist', 0);
      return { status: 200, json: { AssetId: it.id, Name: it.name, AssetTypeId: it.type, Creator: { Id: 1, Name: it.creator ?? 'Sample Studio', CreatorType: 'Group', HasVerifiedBadge: false }, PriceInRobux: it.offsale ? null : it.price ?? null, IsForSale: !it.offsale, IsLimited: it.restriction === 'limited', IsLimitedUnique: false, CollectibleItemId: it.restriction === 'collectible' ? 'sample' : null } };
    }
    if ((m = path.match(/^\/v1\/assets\/(\d+)\/resale-data$/))) {
      // No invented price history: the sample world has no past.
      return { status: 200, json: { assetStock: null, sales: null, numberRemaining: null, recentAveragePrice: null, originalPrice: null, priceDataPoints: [], volumeDataPoints: [] } };
    }
  }

  if (host === 'users' && path === '/v1/users/authenticated') {
    if (!world.signedIn) return err(401, 'Authorization has been denied for this request.', 0);
    return { status: 200, json: { id: VIEWER.id, name: VIEWER.name, displayName: VIEWER.name } };
  }

  if (host === 'inventory' && (m = path.match(/^\/v1\/users\/(\d+)\/items\/Asset\/(\d+)\/is-owned$/))) {
    if (!world.signedIn || Number(m[1]) !== VIEWER.id) return err(401, 'Authorization has been denied for this request.', 0);
    return { status: 200, json: VIEWER.owns.has(Number(m[2])) };
  }

  return err(404, 'Not found', 0);
}
