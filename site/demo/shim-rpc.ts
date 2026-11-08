/**
 * Stands in for src/shared/rpc.ts in the website demo (swapped in at build time by scripts/build-demo.mjs).
 * Same request/response shapes as the extension's service worker, answered from the dated real-profile snapshot
 * (demo/real.ts). The real UI components can't tell the difference, which is the point: the demo IS the extension UI.
 * The one invented profile is "quiet": a private account with no avatar at all, there to show the privacy screen.
 */
import type { AssetView, LibraryEntry, RpcError } from '../../src/shared/types.ts';
import { loadReal, realUser, realOutfit, realOutfitRec, realDetails, realAssetRec, capturedAt } from './real.ts';

export const PRIVATE_ID = 9003;
const capturedMs = () => { const c = capturedAt(); return c ? Date.parse(c) : Date.now(); };
const wait = (ms = 110 + Math.random() * 170) => new Promise((r) => setTimeout(r, ms));
const lib = new Map<string, LibraryEntry>();

const forbidden = (): RpcError => ({
  kind: 'forbidden', status: 403, message: 'Roblox refused this request.', detail: 'Insufficient permissions to view this user’s outfits.', viewer: 'in',
});
const notFound = (): RpcError => ({ kind: 'not-found', message: 'Roblox has no record of this.', status: 404 });

type Handler = (req: any) => Promise<unknown> | unknown;

const H: Record<string, Handler> = {
  'outfits.cached': () => ({ outfits: [] }),
  'outfits.sync': async ({ userId }: { userId: number }) => {
    await wait(260 + Math.random() * 260);
    await loadReal();
    if (userId === PRIVATE_ID) throw forbidden();
    const u = realUser(userId);
    if (!u) throw notFound();
    return { outfits: u.outfits.map((o, i) => realOutfitRec(u, o, i)), source: 'cached', fetchedAt: capturedMs(), access: { state: 'public', at: capturedMs() }, via: 'v2', removed: [], added: [], renamed: [] };
  },
  'outfits.thumbs': ({ ids }: { ids: number[] }) => {
    const out: Record<number, { state: string; url: string | null }> = {};
    for (const id of ids) { const r = realOutfit(id); out[id] = { state: r ? 'Completed' : 'Error', url: r ? r.o.thumb : null }; }
    return out;
  },
  'outfits.details': async ({ id }: { id: number }) => {
    await wait();
    const r = realOutfit(id);
    if (!r) throw notFound();
    return { details: realDetails(r.o), source: 'cached' };
  },
  'outfits.allDetails': () => [],
  'assets.resolve': async ({ ids, refs }: { ids: number[]; refs: { id: number }[] }) => {
    await wait(140 + Math.random() * 200);
    const out: Record<number, AssetView> = {};
    for (const id of ids) {
      const ref = refs.find((r) => r.id === id) as any; const rec = realAssetRec(id);
      out[id] = rec ? { id, provenance: 'cached', rec, ref } : { id, provenance: 'unknown', ref };
    }
    return out;
  },
  'assets.resale': () => ({ recentAveragePrice: null, sales: null, originalPrice: null, points: [] }),
  'assets.owned': async () => { await wait(200); return { me: null, owned: {} }; },
  'me.avatar': async () => ({ me: null, avatar: null }),
  'user.worn': () => { throw { kind: 'bad-response', message: 'Not in the demo: in the extension this shows what the player is wearing right now.' } as RpcError; },
  'history.list': () => [],
  'library.list': () => [...lib.values()].sort((a, b) => b.savedAt - a.savedAt),
  'library.keys': () => [...lib.keys()],
  'library.save': async ({ userId, userName, outfitId, name }: any) => {
    await wait(120);
    const ro = realOutfit(outfitId);
    if (!ro) throw notFound();
    const d = realDetails(ro.o);
    const assets: LibraryEntry['assets'] = {};
    for (const a of d.assets) { const r = realAssetRec(a.id); if (r) assets[a.id] = r; }
    const key = `${userId}:${outfitId}`;
    const prev = lib.get(key);
    const e: LibraryEntry = { key, userId, userName, outfitId, name, savedAt: prev?.savedAt ?? Date.now(), tags: prev?.tags ?? [], note: prev?.note ?? '', collection: prev?.collection ?? '', thumb: ro.o.thumb, details: d, assets };
    lib.set(key, e);
    return e;
  },
  'library.update': ({ key, patch }: any) => { const e = { ...lib.get(key)!, ...patch }; lib.set(key, e); return e; },
  'library.remove': ({ keys }: { keys: string[] }) => { keys.forEach((k) => lib.delete(k)); return null; },
  'data.export': () => ({ app: 'rofit-inspector', schema: 1, library: [...lib.values()] }),
  'data.import': () => ({ added: 0, skipped: 0 }),
  'data.clear': () => null,
  'users.recent': () => [],
  'page.open': () => null,
  'page.openUrls': () => null,
  'diag.get': () => ({ version: 'demo', capabilities: {}, counts: { library: lib.size }, recentErrors: [], limiter: { cooldownMs: 0 }, transport: { via: 'tab', at: 0 } }),
};

export async function rpc(type: string, req: any): Promise<any> {
  const h = H[type];
  if (!h) throw { kind: 'bad-response', message: `Demo has no "${type}".` } as RpcError;
  return h(req ?? {});
}
