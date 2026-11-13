import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import { rpc } from '../shared/rpc.ts';
import type { ThumbInfo } from '../shared/rpc.ts';
import type { AssetRec, AssetView, OutfitDetails, OutfitRec, RpcError } from '../shared/types.ts';
import { loadSettings, onSettings, DEFAULTS, type Settings } from '../shared/settings.ts';
import type { ChangeSummary } from '../shared/analysis.ts';
import type { AccessInfo } from '../shared/access.ts';
import { motionLevel, type MotionLevel } from '../shared/motion.ts';

// ---- settings --------------------------------------------------------------------------------
export function useSettings(): Settings {
  const [s, set] = useState<Settings>(DEFAULTS);
  useEffect(() => { loadSettings().then(set); return onSettings(set); }, []);
  return s;
}

// ---- outfit thumbnails: coalesced into batches, cached for the session ---------------------------
type Listener = () => void;
type ThumbSize = '150x150' | '420x420';
/**
 * Roblox renders outfit thumbnails on demand and answers `Pending` until the render exists. Pending ones are asked again
 * with a growing gap (still batched with everything else due), a bounded number of times; after that the thumbnail is
 * `Stalled` (a client-only state: "not ready yet", no spinner) until something asks for it again. The worker caches a
 * Pending answer for only 2 s (service.ts#outfitThumbs), so every retry here really reaches Roblox.
 */
export const THUMB_RETRY_MS = [2500, 4000, 6000, 9000, 13000, 18000];
const RATE_RETRY_MS = [8000, 20000];
class ThumbStore {
  private map = new Map<string, ThumbInfo>();
  private queue = new Map<string, { id: number; size: ThumbSize; tries: number; due: number }>();
  private listeners = new Set<Listener>();
  private timer = 0;
  private timerAt = 0;
  get(id: number, size: ThumbSize = '150x150') { return this.map.get(`${id}:${size}`); }
  subscribe(fn: Listener) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  request(id: number, size: ThumbSize = '150x150') {
    const k = `${id}:${size}`;
    const have = this.map.get(k);
    if (have?.url || this.queue.has(k)) return;
    this.queue.set(k, { id, size, tries: 0, due: 0 });
    this.schedule(50);
  }
  private schedule(ms: number) {
    const at = Date.now() + ms;
    if (this.timer && this.timerAt <= at) return;
    clearTimeout(this.timer);
    this.timerAt = at;
    this.timer = window.setTimeout(() => this.flush(), Math.max(0, ms));
  }
  private retry(id: number, size: ThumbSize, tries: number, plan: number[]): boolean {
    if (tries >= plan.length) return false;
    this.queue.set(`${id}:${size}`, { id, size, tries: tries + 1, due: Date.now() + plan[tries] });
    return true;
  }
  private emit() { this.listeners.forEach((l) => l()); }
  private async flush() {
    this.timer = 0;
    const now = Date.now() + 25;
    const items = [...this.queue.values()].filter((i) => i.due <= now);
    for (const i of items) this.queue.delete(`${i.id}:${i.size}`);
    for (const size of ['150x150', '420x420'] as const) {
      const mine = items.filter((i) => i.size === size);
      for (let i = 0; i < mine.length; i += 50) {
        const chunk = mine.slice(i, i + 50);
        try {
          const res = await rpc('outfits.thumbs', { ids: chunk.map((x) => x.id), size });
          for (const it of chunk) {
            const t = res[it.id] ?? { state: 'Error', url: null };
            const again = t.state === 'Pending' && this.retry(it.id, size, it.tries, THUMB_RETRY_MS);
            this.map.set(`${it.id}:${size}`, t.state === 'Pending' && !again ? { state: 'Stalled', url: null } : t);
          }
        } catch (e) {
          const limited = (e as RpcError).kind === 'rate-limited';
          for (const it of chunk) {
            if (limited) this.retry(it.id, size, it.tries, RATE_RETRY_MS);
            this.map.set(`${it.id}:${size}`, { state: limited ? 'RateLimited' : 'Error', url: null });
          }
        }
        this.emit();
      }
    }
    if (this.queue.size) this.schedule(Math.min(...[...this.queue.values()].map((q) => q.due)) - Date.now());
  }
}
export const thumbStore = new ThumbStore();

export function useThumb(id: number, size: '150x150' | '420x420' = '150x150', enabled = true): ThumbInfo | undefined {
  const [, force] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    thumbStore.request(id, size);
    return thumbStore.subscribe(() => force((n) => n + 1));
  }, [id, size, enabled]);
  return thumbStore.get(id, size);
}

// ---- generic async state ---------------------------------------------------------------------
export interface Async<T> { data?: T; error?: RpcError; loading: boolean }

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): Async<T> & { reload: () => void } {
  const [st, set] = useState<Async<T>>({ loading: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    let dead = false;
    set((s) => ({ data: s.data, loading: true }));
    fn().then((data) => !dead && set({ data, loading: false }), (error) => !dead && set({ error, loading: false }));
    return () => { dead = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, n]);
  return { ...st, reload: () => setN((x) => x + 1) };
}

// ---- outfit list: cached-first, then revalidate -----------------------------------------------
export interface OutfitList {
  outfits: OutfitRec[];
  phase: 'cache' | 'syncing' | 'ready' | 'error';
  error?: RpcError;
  fetchedAt?: number;
  via?: string;
  changes?: { added: number; removed: number; renamed: number };
  viewer?: 'in' | 'out' | 'unknown';
  /** Last thing RoFit observed about who can see this list. */
  access?: AccessInfo;
  refresh: () => void;
}

export function useOutfits(userId: number, userName?: string): OutfitList {
  const [st, set] = useState<Omit<OutfitList, 'refresh'>>({ outfits: [], phase: 'cache' });
  const [n, setN] = useState(0);
  useEffect(() => {
    let dead = false;
    if (userId <= 0) return;
    (async () => {
      try {
        if (n === 0) {
          const c = await rpc('outfits.cached', { userId });
          if (dead) return;
          if (c.outfits.length) set({ outfits: c.outfits, phase: 'syncing', fetchedAt: c.user?.lastSyncAt, access: c.user?.access });
          else set((s) => ({ ...s, phase: 'syncing', access: c.user?.access }));
        } else set((s) => ({ ...s, phase: 'syncing' }));
        const r = await rpc('outfits.sync', { userId, userName, force: n > 0 });
        if (dead) return;
        set({
          outfits: r.outfits, phase: 'ready', fetchedAt: r.fetchedAt, via: r.via,
          changes: { added: r.added.length, removed: r.removed.length, renamed: r.renamed.length }, viewer: r.viewer, access: r.access,
        });
      } catch (e) {
        if (dead) return;
        const err = e as RpcError;
        // Private or gone: drop whatever an earlier visit cached. Anything else (offline, rate limit): keep it, labelled.
        const refused = err.access?.state === 'restricted' || err.access?.state === 'unavailable';
        set((s) => ({ ...s, outfits: refused ? [] : s.outfits, phase: 'error', error: err, access: err.access ?? (s.outfits.length ? { state: 'cached', at: Date.now() } : s.access) }));
      }
    })();
    return () => { dead = true; };
  }, [userId, n]);
  return { ...st, refresh: () => setN((x) => x + 1) };
}

// ---- outfit details + asset resolution ----------------------------------------------------------
export interface DetailBundle {
  details: OutfitDetails;
  source: 'live' | 'cached';
  change?: ChangeSummary;
  previousAt?: number;
  views: Record<number, AssetView>;
}

export function useOutfitBundle(userId: number, id: number, fallback?: { details: OutfitDetails; views: Record<number, AssetView> }, enabled = true) {
  const [st, set] = useState<{ bundle?: DetailBundle; error?: RpcError; phase: 'details' | 'assets' | 'done'; usingFallback?: boolean; refreshing?: boolean }>({ phase: 'details' });
  const [n, setN] = useState(0);
  useEffect(() => {
    let dead = false;
    if (!enabled) return;
    set((s) => ({ ...s, phase: 'details', error: undefined }));
    (async () => {
      try {
        // Stale-while-revalidate: anything we already know is on screen immediately; Roblox is asked in the background.
        const d = await rpc('outfits.details', { userId, id, force: n > 0, allowStale: n === 0 });
        if (dead) return;
        const refs = d.details.assets;
        const bare: Record<number, AssetView> = {};
        for (const a of refs) bare[a.id] = { id: a.id, provenance: 'unknown', ref: a };
        set({ bundle: { ...d, views: bare }, phase: 'assets', refreshing: !!d.stale });
        const ids = refs.map((a) => a.id);
        if (d.stale) {
          const warm = await rpc('assets.resolve', { ids, refs, allowStale: true });
          if (dead) return;
          set((s) => ({ ...s, bundle: { ...d, views: warm }, phase: 'assets', refreshing: true }));
          const fresh = await rpc('outfits.details', { userId, id, force: true });
          if (dead) return;
          const refs2 = fresh.details.assets;
          const views = await rpc('assets.resolve', { ids: refs2.map((a) => a.id), refs: refs2, force: n > 0 });
          if (dead) return;
          set({ bundle: { ...fresh, views }, phase: 'done', refreshing: false });
          return;
        }
        const views = await rpc('assets.resolve', { ids, refs, force: n > 0 });
        if (dead) return;
        set({ bundle: { ...d, views }, phase: 'done', refreshing: false });
      } catch (e) {
        if (dead) return;
        const err = e as RpcError;
        if (fallback && (err.kind === 'not-found' || err.kind === 'forbidden')) {
          set({ bundle: { details: fallback.details, source: 'cached', views: fallback.views }, phase: 'done', usingFallback: true, error: err });
        } else set((s) => ({ ...s, error: err, phase: 'done', refreshing: false }));
      }
    })();
    return () => { dead = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, id, n]);
  return { ...st, refresh: useCallback(() => setN((x) => x + 1), []) };
}

export interface IndexProgress { phase: 'details' | 'prices'; done: number; total: number; failed: number }

/**
 * Loads details for many outfits with limited concurrency (backs search inside outfits), then, optionally, the price
 * of every item they use in catalog batches of 100 (backs cost filters and sorting). Stops at the first rate limit.
 * Item records already known are used straight away, with no network.
 */
export function useIndexer(userId: number) {
  const [details, setDetails] = useState<Map<number, OutfitDetails>>(new Map());
  const [recs, setRecs] = useState<Map<number, AssetRec>>(new Map());
  const [progress, setProgress] = useState<IndexProgress | null>(null);
  const [stopped, setStopped] = useState<RpcError | null>(null);
  const abort = useRef(false);
  const detailsRef = useRef(details);
  detailsRef.current = details;
  const recsRef = useRef(recs);
  recsRef.current = recs;

  const mergeRecs = useCallback((list: AssetRec[]) => {
    if (!list.length) return;
    setRecs((m) => { const n = new Map(m); for (const r of list) n.set(r.id, r); return n; });
  }, []);

  useEffect(() => {
    let dead = false;
    setDetails(new Map()); setRecs(new Map()); setStopped(null);
    if (userId <= 0) return;
    rpc('outfits.allDetails', { userId }).then(async (all) => {
      if (dead) return;
      setDetails(new Map(all.map((d) => [d.id, d])));
      const ids = [...new Set(all.flatMap((d) => d.assets.map((a) => a.id)))];
      if (ids.length) { const known = await rpc('assets.known', { ids }).catch(() => []); if (!dead) mergeRecs(known); }
    }, () => {});
    return () => { dead = true; };
  }, [userId]);

  const add = useCallback((d: OutfitDetails) => setDetails((m) => (m.get(d.id)?.fetchedAt === d.fetchedAt ? m : new Map(m).set(d.id, d))), []);
  const addViews = useCallback((views: Record<number, AssetView>) => mergeRecs(Object.values(views).filter((v) => v.rec && v.provenance === 'live').map((v) => v.rec!)), [mergeRecs]);

  const prices = useCallback(async (list: OutfitDetails[]) => {
    const refs = new Map<number, OutfitDetails['assets'][number]>();
    for (const d of list) for (const a of d.assets) if (!recsRef.current.has(a.id)) refs.set(a.id, a);
    const todo = [...refs.values()];
    if (!todo.length || abort.current) return;
    let done = 0, failed = 0;
    setProgress({ phase: 'prices', done, total: todo.length, failed });
    for (let i = 0; i < todo.length && !abort.current; i += 100) {
      const chunk = todo.slice(i, i + 100);
      try {
        const views = await rpc('assets.resolve', { ids: chunk.map((a) => a.id), refs: chunk, lite: true });
        mergeRecs(Object.values(views).filter((v) => v.rec).map((v) => v.rec!));
        failed += Object.values(views).filter((v) => !v.rec).length;
      } catch (e) {
        failed += chunk.length;
        if ((e as RpcError).kind === 'rate-limited') { abort.current = true; setStopped(e as RpcError); }
      }
      done += chunk.length;
      setProgress({ phase: 'prices', done, total: todo.length, failed });
    }
  }, [mergeRecs]);

  const run = useCallback(async (ids: number[], withPrices = false) => {
    abort.current = false;
    setStopped(null);
    const todo = ids.filter((id) => !detailsRef.current.has(id));
    let done = 0, failed = 0, next = 0;
    if (todo.length) setProgress({ phase: 'details', done, total: todo.length, failed });
    const got: OutfitDetails[] = [];
    const worker = async () => {
      while (next < todo.length && !abort.current) {
        const id = todo[next++];
        try {
          const r = await rpc('outfits.details', { userId, id });
          got.push(r.details);
          setDetails((m) => new Map(m).set(id, r.details));
        } catch (e) {
          failed++;
          if ((e as RpcError).kind === 'rate-limited') { abort.current = true; setStopped(e as RpcError); }
        }
        setProgress({ phase: 'details', done: ++done, total: todo.length, failed });
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    if (withPrices && !abort.current) {
      const want = new Set(ids);
      await prices([...detailsRef.current.values(), ...got].filter((d) => want.has(d.id)));
    }
    setProgress(null);
  }, [userId, prices]);

  return { details, recs, add, addViews, run, progress, stopped, cancel: () => { abort.current = true; } };
}

// ---- small things ----------------------------------------------------------------------------
export function useOsReducedMotion(): boolean {
  const [os, setOs] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const f = () => setOs(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return os;
}
/** What motion actually plays: the setting resolved against the OS preference (shared/motion.ts). */
export function useMotion(pref: Settings['motion']): MotionLevel {
  return motionLevel(pref, useOsReducedMotion());
}

export function useDebounced<T>(v: T, ms = 150): T {
  const [d, set] = useState(v);
  useEffect(() => { const t = setTimeout(() => set(v), ms); return () => clearTimeout(t); }, [v, ms]);
  return d;
}
