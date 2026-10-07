import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import { rpc } from '../shared/rpc.ts';
import type { ThumbInfo } from '../shared/rpc.ts';
import type { AssetView, OutfitDetails, OutfitRec, RpcError } from '../shared/types.ts';
import { loadSettings, onSettings, DEFAULTS, type Settings } from '../shared/settings.ts';
import type { ChangeSummary } from '../shared/analysis.ts';

// ---- settings --------------------------------------------------------------------------------
export function useSettings(): Settings {
  const [s, set] = useState<Settings>(DEFAULTS);
  useEffect(() => { loadSettings().then(set); return onSettings(set); }, []);
  return s;
}

// ---- outfit thumbnails: coalesced into batches, cached for the session ---------------------------
type Listener = () => void;
class ThumbStore {
  private map = new Map<string, ThumbInfo>();
  private queue = new Map<string, { id: number; size: '150x150' | '420x420'; tries: number }>();
  private listeners = new Set<Listener>();
  private timer = 0;
  get(id: number, size: '150x150' | '420x420' = '150x150') { return this.map.get(`${id}:${size}`); }
  subscribe(fn: Listener) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  request(id: number, size: '150x150' | '420x420' = '150x150') {
    const k = `${id}:${size}`;
    const have = this.map.get(k);
    if (have?.url || this.queue.has(k)) return;
    this.queue.set(k, { id, size, tries: 0 });
    if (!this.timer) this.timer = window.setTimeout(() => this.flush(), 50);
  }
  private emit() { this.listeners.forEach((l) => l()); }
  private async flush() {
    this.timer = 0;
    const items = [...this.queue.values()];
    this.queue.clear();
    for (const size of ['150x150', '420x420'] as const) {
      const ids = items.filter((i) => i.size === size).map((i) => i.id);
      for (let i = 0; i < ids.length; i += 50) {
        const chunk = ids.slice(i, i + 50);
        try {
          const res = await rpc('outfits.thumbs', { ids: chunk, size });
          for (const id of chunk) {
            const t = res[id] ?? { state: 'Error', url: null };
            this.map.set(`${id}:${size}`, t);
            // Roblox renders on demand: Pending usually resolves within seconds.
            const prev = items.find((x) => x.id === id && x.size === size)!;
            if (t.state === 'Pending' && prev.tries < 6) {
              this.queue.set(`${id}:${size}`, { id, size, tries: prev.tries + 1 });
              if (!this.timer) this.timer = window.setTimeout(() => this.flush(), 2500);
            }
          }
        } catch (e) {
          for (const id of chunk) this.map.set(`${id}:${size}`, { state: (e as RpcError).kind === 'rate-limited' ? 'RateLimited' : 'Error', url: null });
        }
        this.emit();
      }
    }
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
          if (c.outfits.length) set({ outfits: c.outfits, phase: 'syncing', fetchedAt: c.user?.lastSyncAt });
          else set((s) => ({ ...s, phase: 'syncing' }));
        } else set((s) => ({ ...s, phase: 'syncing' }));
        const r = await rpc('outfits.sync', { userId, userName, force: n > 0 });
        if (dead) return;
        set({
          outfits: r.outfits, phase: 'ready', fetchedAt: r.fetchedAt, via: r.via,
          changes: { added: r.added.length, removed: r.removed.length, renamed: r.renamed.length }, viewer: r.viewer,
        });
      } catch (e) {
        if (!dead) set((s) => ({ ...s, phase: 'error', error: e as RpcError }));
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

/** Loads details for many outfits with limited concurrency. Backs “search inside outfits”. */
export function useIndexer(userId: number) {
  const [details, setDetails] = useState<Map<number, OutfitDetails>>(new Map());
  const [progress, setProgress] = useState<{ done: number; total: number; failed: number } | null>(null);
  const abort = useRef(false);

  useEffect(() => {
    let dead = false;
    if (userId <= 0) return;
    rpc('outfits.allDetails', { userId }).then((all) => { if (!dead) setDetails(new Map(all.map((d) => [d.id, d]))); }, () => {});
    return () => { dead = true; };
  }, [userId]);

  const add = useCallback((d: OutfitDetails) => setDetails((m) => (m.get(d.id)?.fetchedAt === d.fetchedAt ? m : new Map(m).set(d.id, d))), []);

  const run = useCallback(async (ids: number[]) => {
    abort.current = false;
    const todo = ids.filter((id) => !details.has(id));
    let done = 0, failed = 0, next = 0;
    setProgress({ done, total: todo.length, failed });
    const worker = async () => {
      while (next < todo.length && !abort.current) {
        const id = todo[next++];
        try {
          const r = await rpc('outfits.details', { userId, id });
          setDetails((m) => new Map(m).set(id, r.details));
        } catch (e) {
          failed++;
          if ((e as RpcError).kind === 'rate-limited') { abort.current = true; }
        }
        setProgress({ done: ++done, total: todo.length, failed });
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    setProgress(null);
  }, [details, userId]);

  return { details, add, run, progress, cancel: () => { abort.current = true; } };
}

// ---- small things ----------------------------------------------------------------------------
export function useReducedMotion(settingMotion: Settings['motion']): boolean {
  const [os, setOs] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const f = () => setOs(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return os || settingMotion === 'reduced';
}

export function useDebounced<T>(v: T, ms = 150): T {
  const [d, set] = useState(v);
  useEffect(() => { const t = setTimeout(() => set(v), ms); return () => clearTimeout(t); }, [v, ms]);
  return d;
}
