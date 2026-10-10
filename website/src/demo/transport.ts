/**
 * The only thing the website changes about RoFit's Roblox adapter: where its fetch() goes. The build injects
 * `import { demoFetch as fetch }` into src/background/roblox.ts, so retries, CSRF, 429 backoff and error mapping
 * all run as shipped. Every request is logged so visitors can see exactly what RoFit asks Roblox for.
 */
import { handle } from './sampleServer.ts';

export type Net = 'normal' | 'slow' | 'ratelimit' | 'offline';
export interface LogEntry { n: number; at: number; method: string; host: string; path: string; status?: number | 'failed'; ms?: number; note?: string }

const ALLOWED = new Set(['avatar.roblox.com', 'thumbnails.roblox.com', 'catalog.roblox.com', 'economy.roblox.com', 'inventory.roblox.com', 'users.roblox.com']);

export const sim = { net: 'normal' as Net };
let seq = 0;
const log: LogEntry[] = [];
const subs = new Set<() => void>();
export const getLog = () => log;
export const onLog = (fn: () => void) => { subs.add(fn); return () => subs.delete(fn); };
const emit = () => subs.forEach((f) => f());
export const clearLog = () => { log.length = 0; emit(); };

// ratelimit mode: two requests per 5 s window, everything else gets a 429 with Retry-After
let window0 = 0, used = 0;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const latency = () => (sim.net === 'slow' ? 900 + Math.random() * 1300 : 70 + Math.random() * 170);

export async function demoFetch(input: string | URL | Request, init: RequestInit = {}): Promise<Response> {
  const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
  const method = (init.method ?? 'GET').toUpperCase();
  const entry: LogEntry = { n: ++seq, at: Date.now(), method, host: url.hostname, path: url.pathname + (url.search.length > 64 ? url.search.slice(0, 60) + '…' : url.search) };
  log.unshift(entry); if (log.length > 60) log.length = 60; emit();
  const t0 = performance.now();
  const finish = (status: LogEntry['status'], note?: string) => { entry.status = status; entry.ms = Math.round(performance.now() - t0); entry.note = note; emit(); };

  if (!ALLOWED.has(url.hostname)) { finish('failed', 'blocked: not a RoFit host'); throw new TypeError('Blocked host'); }
  await sleep(latency());
  if (init.signal?.aborted) { finish('failed', 'cancelled'); throw new DOMException('Aborted', 'AbortError'); }
  if (sim.net === 'offline') { finish('failed', 'offline'); throw new TypeError('Failed to fetch'); }
  if (sim.net === 'ratelimit') {
    const now = Date.now();
    if (now - window0 > 5000) { window0 = now; used = 0; }
    if (++used > 2) { finish(429, 'rate limited'); return new Response(JSON.stringify({ errors: [{ code: 0, message: 'Too many requests' }] }), { status: 429, headers: { 'retry-after': '2', 'content-type': 'application/json' } }); }
  }
  const headers: Record<string, string> = {};
  new Headers(init.headers ?? {}).forEach((v, k) => { headers[k.toLowerCase()] = v; });
  const res = handle({ method, url, headers, body: typeof init.body === 'string' ? init.body : undefined });
  finish(res.status, res.status === 403 && res.headers?.['x-csrf-token'] ? 'CSRF handshake' : undefined);
  return new Response(res.json === undefined ? '' : JSON.stringify(res.json), { status: res.status, headers: { 'content-type': 'application/json', ...(res.headers ?? {}) } });
}
