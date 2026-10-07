/**
 * Tiny promise wrapper over IndexedDB. All RoFit data lives here, owned by the service worker,
 * so it is never reachable from the roblox.com page context.
 *
 * Schema version history:
 *  1 — users, outfits, details, assets, snapshots, library, thumbs
 */
const DB_NAME = 'rofit';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

export function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      const mk = (name: string, opts: IDBObjectStoreParameters, idx: [string, string][] = []) => {
        if (db.objectStoreNames.contains(name)) return;
        const s = db.createObjectStore(name, opts);
        for (const [n, p] of idx) s.createIndex(n, p);
      };
      mk('users', { keyPath: 'id' });
      mk('outfits', { keyPath: 'key' }, [['userId', 'userId']]);
      mk('details', { keyPath: 'key' }, [['userId', 'userId']]);
      mk('assets', { keyPath: 'id' });
      mk('snapshots', { keyPath: 'id', autoIncrement: true }, [['outfitKey', 'outfitKey']]);
      mk('library', { keyPath: 'key' });
      mk('thumbs', { keyPath: 'key' });
    };
    req.onsuccess = () => {
      const db = req.result;
      db.onversionchange = () => { db.close(); dbPromise = null; };
      resolve(db);
    };
    req.onerror = () => { dbPromise = null; reject(req.error); };
  });
  return dbPromise;
}

export type StoreName = 'users' | 'outfits' | 'details' | 'assets' | 'snapshots' | 'library' | 'thumbs';

const wrap = <T>(r: IDBRequest<T>) => new Promise<T>((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
const done = (tx: IDBTransaction) => new Promise<void>((res, rej) => { tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); tx.onabort = () => rej(tx.error); });

export async function get<T>(store: StoreName, key: IDBValidKey): Promise<T | undefined> {
  const db = await openDb();
  return wrap(db.transaction(store).objectStore(store).get(key)) as Promise<T | undefined>;
}
export async function getMany<T>(store: StoreName, keys: IDBValidKey[]): Promise<(T | undefined)[]> {
  const db = await openDb();
  const s = db.transaction(store).objectStore(store);
  return Promise.all(keys.map((k) => wrap(s.get(k)) as Promise<T | undefined>));
}
export async function getAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDb();
  return wrap(db.transaction(store).objectStore(store).getAll()) as Promise<T[]>;
}
export async function getAllByIndex<T>(store: StoreName, index: string, value: IDBValidKey): Promise<T[]> {
  const db = await openDb();
  return wrap(db.transaction(store).objectStore(store).index(index).getAll(value)) as Promise<T[]>;
}
export async function putMany(store: StoreName, values: unknown[]): Promise<void> {
  if (!values.length) return;
  const db = await openDb();
  const tx = db.transaction(store, 'readwrite');
  const s = tx.objectStore(store);
  for (const v of values) s.put(v);
  await done(tx);
}
export const put = (store: StoreName, value: unknown) => putMany(store, [value]);

export async function del(store: StoreName, keys: IDBValidKey[]): Promise<void> {
  if (!keys.length) return;
  const db = await openDb();
  const tx = db.transaction(store, 'readwrite');
  const s = tx.objectStore(store);
  for (const k of keys) s.delete(k);
  await done(tx);
}
export async function clear(store: StoreName): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, 'readwrite');
  tx.objectStore(store).clear();
  await done(tx);
}
export async function count(store: StoreName): Promise<number> {
  const db = await openDb();
  return wrap(db.transaction(store).objectStore(store).count());
}
export async function keysByIndex(store: StoreName, index: string, value: IDBValidKey): Promise<IDBValidKey[]> {
  const db = await openDb();
  return wrap(db.transaction(store).objectStore(store).index(index).getAllKeys(value));
}
