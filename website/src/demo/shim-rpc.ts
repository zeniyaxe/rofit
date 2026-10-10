/**
 * Stand-in for src/shared/rpc.ts. In the extension, rpc() messages the service worker; here it calls the very same
 * handlers (src/background/service.ts) directly, with values cloned across the boundary like real messaging.
 */
import type { Rpc, RpcType } from '../../../src/shared/rpc.ts';
import type { CapState, Capability, RpcError } from '../../../src/shared/types.ts';
import { makeHandlers } from '../../../src/background/service.ts';
import { limiter, onCapability, RobloxError } from '../../../src/background/roblox.ts';
import * as db from './memdb.ts';

export type { Rpc, RpcType, ThumbInfo, Diagnostics, Reply } from '../../../src/shared/rpc.ts';

declare const __ROFIT_VERSION__: string;
const caps: Partial<Record<Capability, CapState>> = {};
const errors: { at: number; where: string; message: string }[] = [];
onCapability((cap, st) => { caps[cap] = st; if (!st.ok) { errors.push({ at: st.at, where: cap, message: st.error ?? 'failed' }); errors.splice(0, errors.length - 20); } });

/** Hooks the demo page fills in: what "open settings" and "open these items on Roblox" mean on a website. */
export const host = {
  openPage: (_route: string) => {},
  openUrls: (_urls: string[]) => {},
};

const handlers = makeHandlers({
  openPage: async (route) => host.openPage(route),
  openUrls: async (urls) => host.openUrls(urls),
  diag: async () => {
    const counts: Record<string, number> = {};
    for (const n of ['users', 'outfits', 'details', 'assets', 'snapshots', 'library', 'thumbs'] as const) counts[n] = await db.count(n);
    // transport.at = 0 hides the extension's "ran in your Roblox tab / background worker" line, which doesn't apply here.
    return { version: __ROFIT_VERSION__, capabilities: { ...caps }, counts, recentErrors: [...errors], limiter: { cooldownMs: Math.max(0, limiter.cooldownUntil - Date.now()) }, transport: { via: 'worker', at: 0 } };
  },
});

const clone = <T>(v: T): T => (v === undefined || v === null ? v : structuredClone(v));

export async function rpc<K extends RpcType>(type: K, req: Rpc[K]['req']): Promise<Rpc[K]['res']> {
  const h = handlers[type] as ((r: unknown) => Promise<Rpc[K]['res']>) | undefined;
  if (!h) throw { kind: 'bad-response', message: 'Unknown request' } as RpcError;
  try {
    return clone(await h(clone(req)));
  } catch (e: any) {
    throw (e instanceof RobloxError ? e.toJSON() : e && typeof e.kind === 'string' ? e : { kind: 'server', message: String(e?.message ?? e) }) as RpcError;
  }
}
