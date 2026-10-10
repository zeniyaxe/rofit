/**
 * In-memory stand-in for src/background/db.ts with the same API. The website keeps nothing on the visitor's device:
 * the demo's library, cache and history live in this tab and vanish on reload. Values are cloned on the way in and
 * out, like IndexedDB, so the real service code can't accidentally share objects.
 */
export type StoreName = 'users' | 'outfits' | 'details' | 'assets' | 'snapshots' | 'library' | 'thumbs';

const KEYS: Record<StoreName, string> = { users: 'id', outfits: 'key', details: 'key', assets: 'id', snapshots: 'id', library: 'key', thumbs: 'key' };
const stores = new Map<StoreName, Map<IDBValidKey, any>>();
let auto = 0;
const s = (n: StoreName) => { let m = stores.get(n); if (!m) { m = new Map(); stores.set(n, m); } return m; };
const clone = <T>(v: T): T => (v === undefined ? v : structuredClone(v));
const k = (key: IDBValidKey) => (typeof key === 'object' ? JSON.stringify(key) : key);

export async function openDb() { return null as unknown as IDBDatabase; }
export async function get<T>(store: StoreName, key: IDBValidKey): Promise<T | undefined> { return clone(s(store).get(k(key))); }
export async function getMany<T>(store: StoreName, keys: IDBValidKey[]): Promise<(T | undefined)[]> { return keys.map((key) => clone(s(store).get(k(key)))); }
export async function getAll<T>(store: StoreName): Promise<T[]> { return [...s(store).values()].map(clone); }
export async function getAllByIndex<T>(store: StoreName, index: string, value: IDBValidKey): Promise<T[]> { return [...s(store).values()].filter((v) => v[index] === value).map(clone); }
export async function putMany(store: StoreName, values: unknown[]): Promise<void> {
  for (const v of values as any[]) {
    const c = clone(v);
    if (store === 'snapshots' && c.id === undefined) c.id = ++auto;
    s(store).set(k(c[KEYS[store]]), c);
  }
}
export const put = (store: StoreName, value: unknown) => putMany(store, [value]);
export async function del(store: StoreName, keys: IDBValidKey[]): Promise<void> { for (const key of keys) s(store).delete(k(key)); }
export async function clear(store: StoreName): Promise<void> { s(store).clear(); }
export async function count(store: StoreName): Promise<number> { return s(store).size; }
export async function keysByIndex(store: StoreName, index: string, value: IDBValidKey): Promise<IDBValidKey[]> {
  return [...s(store).values()].filter((v) => v[index] === value).map((v) => v[KEYS[store]]);
}

/** Demo-only: pretend time has passed so cached data is due for a re-check (how RoFit notices changes in real life). */
export function age(ms: number) {
  for (const v of s('details').values()) v.fetchedAt -= ms;
  for (const v of s('users').values()) if (v.lastSyncAt) v.lastSyncAt -= ms;
  for (const v of s('assets').values()) v.observedAt -= ms;
  s('thumbs').clear(); // thumbnail URLs are content-addressed on Roblox; the demo simply re-asks
  for (const v of s('snapshots').values()) v.at -= ms;
  for (const v of s('library').values()) v.savedAt -= ms;
}
export function resetAll() { stores.clear(); }
