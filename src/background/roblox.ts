/**
 * Everything RoFit knows about Roblox's web APIs lives in this file.
 * Callers get normalized shapes plus typed errors; endpoint paths, pagination quirks and
 * response drift are contained here. Every call is GET except the catalog batch POST,
 * which only reads (it needs a CSRF token because Roblox demands one for any POST).
 */
import type { BodyColors, BodyScale, Capability, CapState, OutfitDetails, RpcError } from '../shared/types.ts';

const H = {
  avatar: 'https://avatar.roblox.com',
  thumbs: 'https://thumbnails.roblox.com',
  catalog: 'https://catalog.roblox.com',
  economy: 'https://economy.roblox.com',
  inventory: 'https://inventory.roblox.com',
  users: 'https://users.roblox.com',
};

export class RobloxError extends Error implements RpcError {
  kind: RpcError['kind'];
  status?: number;
  retryAfter?: number;
  detail?: string;
  code?: number;
  viewer?: RpcError['viewer'];
  access?: RpcError['access'];
  constructor(kind: RpcError['kind'], message: string, status?: number, retryAfter?: number) {
    super(message);
    this.kind = kind; this.status = status; this.retryAfter = retryAfter;
  }
  toJSON(): RpcError { return { kind: this.kind, message: this.message, status: this.status, retryAfter: this.retryAfter, detail: this.detail, code: this.code, viewer: this.viewer, access: this.access }; }
}

const sleep = (ms: number, signal?: AbortSignal) => new Promise<void>((res, rej) => {
  const t = setTimeout(res, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); rej(new RobloxError('aborted', 'Cancelled')); }, { once: true });
});

/** Caps concurrent requests and honours a shared cooldown after any 429. */
class Limiter {
  private active = 0;
  private queue: (() => void)[] = [];
  cooldownUntil = 0;
  max: number;
  constructor(max: number) { this.max = max; }
  async run<T>(fn: () => Promise<T>): Promise<T> {
    if (this.active >= this.max) await new Promise<void>((r) => this.queue.push(r));
    this.active++;
    try {
      const wait = this.cooldownUntil - Date.now();
      if (wait > 0) await sleep(wait);
      return await fn();
    } finally {
      this.active--;
      this.queue.shift()?.();
    }
  }
}
export const limiter = new Limiter(4);

// --- capability tracking (feeds the diagnostics panel) ---------------------------------------
type CapListener = (cap: Capability, st: CapState) => void;
let capListener: CapListener = () => {};
export const onCapability = (fn: CapListener) => { capListener = fn; };
async function track<T>(cap: Capability, fn: () => Promise<T>): Promise<T> {
  try {
    const r = await fn();
    capListener(cap, { ok: true, at: Date.now() });
    return r;
  } catch (e) {
    // A missing user/outfit says nothing about whether the capability itself works.
    const k = (e as RobloxError).kind;
    if ((e as RobloxError).status === 400 && cap === 'economy') throw e;
    if (k !== 'not-found' && k !== 'forbidden' && k !== 'unauthenticated' && k !== 'aborted') {
      capListener(cap, { ok: false, at: Date.now(), error: (e as Error).message });
    }
    throw e;
  }
}

let csrf = '';

// --- transport ---------------------------------------------------------------------------------
// A service worker's fetch() does not carry SameSite=Lax cookies (verified: only SameSite=None ones), so Roblox sees it
// as signed out. That hides friends-only content and breaks ownership checks. A content script on www.roblox.com is
// same-site with the API hosts, so we run requests there when a Roblox tab is open and fall back to the worker otherwise.
let proxyTabs: number[] | null = null;
const hasChrome = () => typeof chrome !== 'undefined' && !!chrome.tabs?.sendMessage && !!chrome.storage?.session;
async function tabs(): Promise<number[]> {
  if (proxyTabs) return proxyTabs;
  try { proxyTabs = ((await chrome.storage.session.get('ptabs')).ptabs as number[]) ?? []; } catch { proxyTabs = []; }
  return proxyTabs;
}
async function saveTabs() { try { await chrome.storage.session.set({ ptabs: proxyTabs }); } catch { /* optional */ } }
export async function registerTab(id: number) { const t = await tabs(); proxyTabs = [...t.filter((x) => x !== id), id]; await saveTabs(); }
export async function unregisterTab(id: number) { const t = await tabs(); if (t.includes(id)) { proxyTabs = t.filter((x) => x !== id); await saveTabs(); } }
/** Where the last request actually went; shown in diagnostics. */
export const transportInfo = { via: 'worker' as 'tab' | 'worker', at: 0 };

/** A request that takes longer than this is treated as failed: Roblox normally answers in well under a second. */
export const REQUEST_TIMEOUT = 20_000;
const timeoutAfter = <T>(p: Promise<T>, ms: number): Promise<T> => new Promise((res, rej) => {
  const t = setTimeout(() => rej(Object.assign(new Error('timeout'), { name: 'TimeoutError' })), ms);
  p.then((v) => { clearTimeout(t); res(v); }, (e) => { clearTimeout(t); rej(e); });
});

async function send(url: string, init: { method: string; body?: string; signal?: AbortSignal; csrf: string }): Promise<Response> {
  if (hasChrome()) {
    for (const id of [...(await tabs())].reverse()) {
      try {
        // A frozen or discarded tab never answers; don't let it hang the request, try the next transport instead.
        const r = await timeoutAfter(chrome.tabs.sendMessage(id, { __rofit: 'fetch', url, method: init.method, body: init.body, csrf: init.csrf }), REQUEST_TIMEOUT);
        if (r?.ok) {
          transportInfo.via = 'tab'; transportInfo.at = Date.now();
          return new Response(r.text, { status: r.status, headers: { ...(r.csrf ? { 'x-csrf-token': r.csrf } : {}), ...(r.retryAfter ? { 'retry-after': r.retryAfter } : {}) } });
        }
        if (r?.error === 'blocked') break;
      } catch (e) { if ((e as Error).name !== 'TimeoutError') await unregisterTab(id); }
    }
  }
  transportInfo.via = 'worker'; transportInfo.at = Date.now();
  const headers: Record<string, string> = {};
  if (init.method === 'POST') { headers['content-type'] = 'application/json'; if (init.csrf) headers['x-csrf-token'] = init.csrf; }
  const signal = init.signal ? AbortSignal.any([init.signal, AbortSignal.timeout(REQUEST_TIMEOUT)]) : AbortSignal.timeout(REQUEST_TIMEOUT);
  return fetch(url, { method: init.method, credentials: 'include', signal, headers, body: init.body });
}

interface HttpOpts { method?: 'GET' | 'POST'; body?: unknown; signal?: AbortSignal; retries?: number }

export async function http<T>(url: string, o: HttpOpts = {}): Promise<T> {
  const retries = o.retries ?? 3;
  for (let attempt = 0; ; attempt++) {
    const res = await limiter.run(async () => {
      try {
        return await send(url, { method: o.method ?? 'GET', signal: o.signal, csrf, body: o.body === undefined ? undefined : JSON.stringify(o.body) });
      } catch (e) {
        if ((e as Error).name === 'TimeoutError') return 'timeout' as const;
        if ((e as Error).name === 'AbortError') throw new RobloxError('aborted', 'Cancelled');
        throw new RobloxError('network', 'Could not reach Roblox. Check your connection.');
      }
    });
    if (res === 'timeout') {
      if (attempt < Math.min(1, retries)) continue;
      throw new RobloxError('timeout', 'Roblox took too long to answer. Try again in a moment.');
    }

    if (res.status === 403 && o.method === 'POST') {
      const tok = res.headers.get('x-csrf-token');
      if (tok && tok !== csrf && attempt < retries) { csrf = tok; continue; }
    }
    if (res.status === 429) {
      const ra = Number(res.headers.get('retry-after')) || 0;
      const wait = Math.max(ra * 1000, 1500 * 2 ** attempt);
      limiter.cooldownUntil = Math.max(limiter.cooldownUntil, Date.now() + wait);
      if (attempt >= retries) throw new RobloxError('rate-limited', 'Roblox is rate limiting requests. Try again in a moment.', 429, Math.ceil(wait / 1000));
      await sleep(wait, o.signal);
      continue;
    }
    if (res.status >= 500 && attempt < retries) { await sleep(800 * 2 ** attempt, o.signal); continue; }
    if (res.status >= 400) {
      // Keep Roblox's own explanation: it's what lets the UI say *why* (private, no such user, …) instead of "failed".
      let code: number | undefined, text = '';
      try { const e = (await res.json())?.errors?.[0]; code = e?.code; text = String(e?.message ?? ''); } catch { /* not json */ }
      const err = new RobloxError(
        res.status === 401 ? 'unauthenticated' : res.status === 403 ? 'forbidden' : res.status === 404 ? 'not-found' : res.status >= 500 ? 'server' : 'bad-response',
        res.status === 401 ? 'Not signed in to Roblox.' : res.status === 403 ? 'Roblox refused this request.' : res.status === 404 ? 'Roblox has no record of this.' : `Roblox returned ${res.status}.`, res.status);
      err.detail = text || undefined; err.code = code;
      // "The specified user does not exist" arrives as 400: it is a not-found, not a malformed request.
      if (res.status === 400 && /user.*(does not exist|not found)|invalid user/i.test(text)) err.kind = 'not-found';
      throw err;
    }
    try { return (await res.json()) as T; } catch { throw new RobloxError('bad-response', 'Roblox sent something unreadable.', res.status); }
  }
}

// --- outfits ---------------------------------------------------------------------------------
export interface RawOutfit { id: number; name: string; isEditable: boolean; outfitType: string }

/**
 * Lists a user's outfits. v2 is token-paginated; v1 (deprecated) is page-based and is only used if v2 fails.
 * `outfitType=Avatar` excludes DynamicHead/Shoes sets, which are not full avatar outfits.
 */
export function listOutfits(userId: number, signal?: AbortSignal, onPage?: (n: number) => void): Promise<{ outfits: RawOutfit[]; via: 'v2' | 'v1' }> {
  return track('list', async () => {
    try {
      const all: RawOutfit[] = [];
      let token = '';
      for (let i = 0; i < 40; i++) {
        const j = await http<{ data?: RawOutfit[]; paginationToken?: string }>(
          `${H.avatar}/v2/avatar/users/${userId}/outfits?itemsPerPage=50&outfitType=Avatar&paginationToken=${encodeURIComponent(token)}`, { signal });
        if (!Array.isArray(j.data)) throw new RobloxError('bad-response', 'Unexpected outfit list shape.');
        all.push(...j.data.filter((o) => o && typeof o.id === 'number'));
        onPage?.(all.length);
        token = j.paginationToken || '';
        if (!token) break;
      }
      return { outfits: all, via: 'v2' as const };
    } catch (e) {
      const k = (e as RobloxError).kind;
      if (k === 'rate-limited' || k === 'aborted' || k === 'network') throw e;
      if (k === 'not-found' || k === 'forbidden') throw e;
      // v2 misbehaving: fall back to the deprecated page-based route.
      const all: RawOutfit[] = [];
      for (let p = 1; p <= 40; p++) {
        const j = await http<{ data?: RawOutfit[] }>(`${H.avatar}/v1/users/${userId}/outfits?itemsPerPage=50&page=${p}`, { signal });
        if (!Array.isArray(j.data)) throw new RobloxError('bad-response', 'Unexpected outfit list shape.');
        all.push(...j.data.map((o) => ({ ...o, outfitType: o.outfitType || 'Avatar' })));
        onPage?.(all.length);
        if (j.data.length < 50) break;
      }
      return { outfits: all, via: 'v1' as const };
    }
  });
}

export type ThumbState = 'Completed' | 'Pending' | 'InReview' | 'Blocked' | 'Error' | string;
export interface Thumb { state: ThumbState; url: string | null }

async function thumbBatch(path: string, param: string, ids: number[], size: string, cap: Capability, extra = ''): Promise<Record<number, Thumb>> {
  return track(cap, async () => {
    const out: Record<number, Thumb> = {};
    for (let i = 0; i < ids.length; i += 50) {
      const chunk = ids.slice(i, i + 50);
      const j = await http<{ data: { targetId: number; state: ThumbState; imageUrl: string | null }[] }>(
        `${H.thumbs}${path}?${param}=${chunk.join(',')}&size=${size}&format=Webp&isCircular=false${extra}`);
      for (const t of j.data ?? []) out[t.targetId] = { state: t.state, url: t.state === 'Completed' ? t.imageUrl : null };
    }
    return out;
  });
}
export const outfitThumbs = (ids: number[], size = '150x150') => thumbBatch('/v1/users/outfits', 'userOutfitIds', ids, size, 'thumbs');
export const assetThumbs = (ids: number[], size = '150x150') => thumbBatch('/v1/assets', 'assetIds', ids, size, 'thumbs');

const hex = (v: unknown, fallback = 'A3A2A5') => (typeof v === 'string' && /^[0-9a-f]{6}$/i.test(v) ? v.toUpperCase() : fallback);

/**
 * Normalizes v3 (`bodyColor3s.headColor3`, top-level fields) and v4 (`outfitModel`, `bodyColors.headColor`) details.
 * Exported for tests: both shapes were captured from the live API (docs/research/outfit-access.md, S11).
 */
export function parseDetails(raw: any, id: number): OutfitDetails {
  const j = raw?.outfitModel ?? raw;
  if (!j || !Array.isArray(j.assets)) throw new RobloxError('bad-response', 'Unexpected outfit details shape.');
  const c3 = j.bodyColor3s, c4 = j.bodyColors ?? {};
  const col = (k: string) => hex(c3 ? c3[k + 'Color3'] : c4[k + 'Color']);
  const s = j.scale ?? {};
  const bodyColors: BodyColors = {
    head: col('head'), torso: col('torso'), rightArm: col('rightArm'), leftArm: col('leftArm'), rightLeg: col('rightLeg'), leftLeg: col('leftLeg'),
  };
  const n = (v: unknown, d: number) => (typeof v === 'number' ? v : d);
  const scale: BodyScale = {
    height: n(s.height, 1), width: n(s.width, 1), head: n(s.head, 1), depth: n(s.depth, 1),
    proportion: n(s.proportion, 0), bodyType: n(s.bodyType, 0),
  };
  const idNum = Number(j.id);
  return {
    id: Number.isSafeInteger(idNum) && idNum > 0 ? idNum : id, name: String(j.name ?? ''),
    assets: j.assets.filter((a: any) => a && typeof a.id === 'number').map((a: any) => ({ id: a.id, name: String(a.name ?? ''), assetTypeId: a.assetType?.id ?? 0, assetTypeName: a.assetType?.name ?? '' })),
    bodyColors, scale, avatarType: j.playerAvatarType ?? 'R15', outfitType: j.outfitType ?? 'Avatar', fetchedAt: Date.now(),
  };
}

/** v3 first (proven in 1.x), v4 when v3 misbehaves: Roblox documents v3 as deprecated in favour of v4. */
export function outfitDetails(id: number, signal?: AbortSignal): Promise<OutfitDetails> {
  return track('details', async () => {
    try {
      return parseDetails(await http<any>(`${H.avatar}/v3/outfits/${id}/details`, { signal }), id);
    } catch (e) {
      const k = (e as RobloxError).kind;
      if (k !== 'server' && k !== 'bad-response' && k !== 'not-found') throw e;
      try { return parseDetails(await http<any>(`${H.avatar}/v4/outfits/${id}/details`, { signal, retries: 1 }), id); }
      catch { throw e; }
    }
  });
}

// --- catalog / economy -----------------------------------------------------------------------
export interface RawCatalogItem {
  id: number; name: string; assetType: number; creatorName?: string; creatorTargetId?: number; creatorType?: string;
  creatorHasVerifiedBadge?: boolean; price?: number; lowestPrice?: number; lowestResalePrice?: number; priceStatus?: string;
  isOffSale?: boolean; itemRestrictions?: string[]; itemStatus?: string[]; offSaleDeadline?: string | null;
}

/** Batch lookup. Roblox simply omits assets it can't resolve, so callers must diff the result. */
export function catalogDetails(ids: number[], signal?: AbortSignal): Promise<RawCatalogItem[]> {
  return track('catalog', async () => {
    const out: RawCatalogItem[] = [];
    for (let i = 0; i < ids.length; i += 100) {
      const j = await http<{ data?: RawCatalogItem[] }>(`${H.catalog}/v1/catalog/items/details`,
        { method: 'POST', body: { items: ids.slice(i, i + 100).map((id) => ({ itemType: 'Asset', id })) }, signal });
      out.push(...(j.data ?? []));
    }
    return out;
  });
}

export interface RawEconomy {
  AssetId: number; Name: string; AssetTypeId: number; Creator?: { Id: number; Name: string; CreatorType: string; HasVerifiedBadge?: boolean };
  PriceInRobux: number | null; IsForSale: boolean; IsLimited: boolean; IsLimitedUnique: boolean; CollectibleItemId?: string | null;
}
export function economyDetails(id: number, signal?: AbortSignal): Promise<RawEconomy | null> {
  return track('economy', async () => {
    try { return await http<RawEconomy>(`${H.economy}/v2/assets/${id}/details`, { signal, retries: 1 }); }
    catch (e) {
      // 400/404 both mean “no such product”: deleted, moderated or never sold. That is an answer, not a failure.
      const x = e as RobloxError;
      if (x.kind === 'not-found' || x.status === 400) return null;
      throw e;
    }
  });
}

export interface ResaleData { recentAveragePrice: number | null; sales: number | null; originalPrice: number | null; points: { value: number; date: string }[] }
export function resaleData(id: number): Promise<ResaleData> {
  return track('resale', async () => {
    const j = await http<any>(`${H.economy}/v1/assets/${id}/resale-data`, { retries: 1 });
    return { recentAveragePrice: j.recentAveragePrice ?? null, sales: j.sales ?? null, originalPrice: j.originalPrice ?? null, points: j.priceDataPoints ?? [] };
  });
}

// --- the signed-in viewer (read-only; used for ownership and “vs. my avatar”) ---------------------
let meCache: { at: number; me: { id: number; name: string } | null } | null = null;
export async function authenticatedUser(): Promise<{ id: number; name: string } | null> {
  if (meCache && Date.now() - meCache.at < 5 * 60_000) return meCache.me;
  try {
    const j = await track('ownership', () => http<{ id: number; name: string }>(`${H.users}/v1/users/authenticated`, { retries: 0 }));
    meCache = { at: Date.now(), me: { id: j.id, name: j.name } };
  } catch (e) {
    if ((e as RobloxError).kind !== 'unauthenticated') throw e;
    meCache = { at: Date.now(), me: null };
  }
  return meCache.me;
}

export function isOwned(userId: number, assetId: number): Promise<boolean> {
  return track('ownership', async () => {
    const j = await http<boolean>(`${H.inventory}/v1/users/${userId}/items/Asset/${assetId}/is-owned`, { retries: 1 });
    return j === true;
  });
}

export function myAvatar(): Promise<OutfitDetails> {
  return track('myAvatar', async () => {
    const j = await http<any>(`${H.avatar}/v1/avatar`, { retries: 1 });
    const c = j.bodyColor3s;
    if (!c) throw new RobloxError('bad-response', 'Roblox did not return body colors for your avatar.');
    const s = j.scales ?? {};
    return {
      id: 0, name: 'What I’m wearing',
      assets: (j.assets ?? []).map((a: any) => ({ id: a.id, name: String(a.name ?? ''), assetTypeId: a.assetType?.id ?? 0, assetTypeName: a.assetType?.name ?? '' })),
      bodyColors: { head: hex(c.headColor3), torso: hex(c.torsoColor3), rightArm: hex(c.rightArmColor3), leftArm: hex(c.leftArmColor3), rightLeg: hex(c.rightLegColor3), leftLeg: hex(c.leftLegColor3) },
      scale: { height: s.height ?? 1, width: s.width ?? 1, head: s.head ?? 1, depth: s.depth ?? 1, proportion: s.proportion ?? 0, bodyType: s.bodyType ?? 0 },
      avatarType: j.playerAvatarType ?? 'R15', outfitType: 'Avatar', fetchedAt: Date.now(),
    };
  });
}

// --- who can see a list: one anonymous request (docs/research/outfit-access.md) -------------------------
/**
 * Asks for the first page of a user's outfits with no cookies at all, straight from the worker. If Roblox shows outfits
 * to an anonymous caller they're public; if it shows them only to the signed-in viewer, they're visible because of the
 * viewer's account. Never retried and never paginated: it's one request per profile refresh.
 */
export function anonymousOutfitCount(userId: number): Promise<number | 'hidden'> {
  return track('access', () => limiter.run(async () => {
    let res: Response;
    try {
      res = await fetch(`${H.avatar}/v2/avatar/users/${userId}/outfits?itemsPerPage=50&outfitType=Avatar&paginationToken=`, { credentials: 'omit', signal: AbortSignal.timeout(10_000) });
    } catch (e) {
      throw new RobloxError((e as Error).name === 'TimeoutError' ? 'timeout' : 'network', 'The visibility check couldn’t reach Roblox.');
    }
    if (res.status === 401 || res.status === 403) return 'hidden' as const;
    if (res.status === 429) throw new RobloxError('rate-limited', 'Rate limited.', 429);
    if (!res.ok) throw new RobloxError(res.status >= 500 ? 'server' : 'bad-response', `Roblox returned ${res.status}.`, res.status);
    const j = await res.json().catch(() => null) as { data?: RawOutfit[] } | null;
    if (!j || !Array.isArray(j.data)) throw new RobloxError('bad-response', 'Unexpected outfit list shape.');
    return j.data.filter((o) => o && o.isEditable).length;
  }));
}

export interface UserInfo { id: number; name: string; displayName: string; isBanned?: boolean }
/** Exact username → user. Roblox's lookup endpoint, not its (heavily rate-limited) fuzzy search. */
export function userByName(name: string): Promise<UserInfo | null> {
  return track('users', async () => {
    const j = await http<{ data?: { id: number; name: string; displayName: string }[] }>(`${H.users}/v1/usernames/users`, { method: 'POST', body: { usernames: [name], excludeBannedUsers: false }, retries: 1 });
    const u = j.data?.[0];
    return u && typeof u.id === 'number' ? { id: u.id, name: u.name, displayName: u.displayName } : null;
  });
}
export function userById(id: number): Promise<UserInfo | null> {
  return track('users', async () => {
    try {
      const u = await http<{ id: number; name: string; displayName: string; isBanned: boolean }>(`${H.users}/v1/users/${id}`, { retries: 1 });
      return { id: u.id, name: u.name, displayName: u.displayName, isBanned: u.isBanned };
    } catch (e) {
      if ((e as RobloxError).kind === 'not-found') return null;
      throw e;
    }
  });
}
