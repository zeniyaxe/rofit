import type {
  AssetRec, AssetView, CapState, Capability, LibraryEntry, OutfitDetails, OutfitRec, RpcError, Snapshot, UserRec,
} from './types.ts';
import type { ChangeSummary } from './analysis.ts';
import type { AccessInfo } from './access.ts';
import type { ImportReport } from './backup.ts';

export interface ThumbInfo { state: string; url: string | null }

/** Request type → response. The UI and the service worker both import this so the contract stays checked. */
export interface Rpc {
  'outfits.cached': { req: { userId: number }; res: { outfits: OutfitRec[]; user?: UserRec } };
  'outfits.sync': { req: { userId: number; userName?: string; force?: boolean }; res: { outfits: OutfitRec[]; source: 'live' | 'cached'; fetchedAt: number; via: 'v1' | 'v2' | 'cache'; removed: number[]; added: number[]; renamed: { id: number; from: string; to: string }[]; /** Present when nothing visible came back: was Roblox seeing a signed-in viewer? */ viewer?: 'in' | 'out' | 'unknown'; /** Why this viewer can see the list (docs/research/outfit-access.md). */ access?: AccessInfo } };
  'outfits.thumbs': { req: { ids: number[]; size?: '150x150' | '420x420' }; res: Record<number, ThumbInfo> };
  'outfits.details': { req: { userId: number; id: number; force?: boolean; allowStale?: boolean }; res: { details: OutfitDetails; source: 'live' | 'cached'; stale?: boolean; change?: ChangeSummary; previousAt?: number } };
  'outfits.allDetails': { req: { userId: number }; res: OutfitDetails[] };
  'assets.resolve': { req: { ids: number[]; refs: { id: number; name: string; assetTypeId: number; assetTypeName: string }[]; force?: boolean; allowStale?: boolean; /** Catalog batch only: no economy fallback, no thumbnails (profile-wide price indexing). */ lite?: boolean }; res: Record<number, AssetView> };
  /** Item records RoFit already has, no network. */
  'assets.known': { req: { ids: number[] }; res: AssetRec[] };
  'assets.resale': { req: { id: number }; res: { recentAveragePrice: number | null; sales: number | null; originalPrice: number | null; points: { value: number; date: string }[] } };
  'assets.owned': { req: { ids: number[] }; res: { me: { id: number; name: string } | null; owned: Record<number, boolean> } };
  'me.avatar': { req: Record<string, never>; res: { me: { id: number; name: string } | null; avatar: OutfitDetails | null } };
  'history.list': { req: { userId: number; id: number }; res: Snapshot[] };
  'library.list': { req: Record<string, never>; res: LibraryEntry[] };
  'library.save': { req: { userId: number; userName: string; outfitId: number; name: string; collection?: string; tags?: string[]; favorite?: boolean }; res: LibraryEntry };
  'library.update': { req: { key: string; patch: Partial<Pick<LibraryEntry, 'tags' | 'note' | 'collection' | 'name' | 'favorite'>> }; res: LibraryEntry };
  'library.remove': { req: { keys: string[] }; res: null };
  'library.bulk': { req: { keys: string[]; op: 'move' | 'tag' | 'untag' | 'favorite' | 'unfavorite'; value?: string }; res: { changed: number } };
  'library.collection': { req: { op: 'rename' | 'delete'; name: string; to?: string; /** delete: also remove the outfits (default: just un-file them) */ removeEntries?: boolean }; res: { changed: number } };
  'library.keys': { req: Record<string, never>; res: string[] };
  'data.export': { req: { keys?: string[] }; res: unknown };
  /** data: parsed backup/manifest JSON, or pasted text (share link or JSON). dryRun reports without writing. */
  'data.import': { req: { data: unknown; replace?: boolean; dryRun?: boolean }; res: ImportReport };
  'data.clear': { req: { what: 'cache' | 'history' | 'library' | 'all' }; res: null };
  'diag.get': { req: Record<string, never>; res: Diagnostics };
  'page.openUrls': { req: { urls: string[] }; res: null };
  'page.open': { req: { route: string }; res: null };
  'users.recent': { req: { limit?: number }; res: UserRec[] };
  /** Username, @name, user ID or profile URL → the account, via users.roblox.com. */
  'users.lookup': { req: { query: string }; res: { id: number; name: string; displayName: string; isBanned?: boolean } | null };
}
export type RpcType = keyof Rpc;

export interface Diagnostics {
  version: string;
  capabilities: Partial<Record<Capability, CapState>>;
  counts: Record<string, number>;
  recentErrors: { at: number; where: string; message: string }[];
  limiter: { cooldownMs: number };
  /** Whether requests last ran inside a Roblox tab (sends your Roblox session) or in the background worker (anonymous). */
  transport: { via: 'tab' | 'worker'; at: number };
  storageBytes?: number;
}

export type Reply<T> = { ok: true; data: T } | { ok: false; error: RpcError };

export async function rpc<K extends RpcType>(type: K, req: Rpc[K]['req']): Promise<Rpc[K]['res']> {
  let r: Reply<Rpc[K]['res']> | undefined;
  try {
    r = await chrome.runtime.sendMessage({ __rofit: true, type, req });
  } catch (e) {
    throw { kind: 'network', message: 'RoFit’s background worker did not answer. Reload the page and try again.' } as RpcError;
  }
  if (!r) throw { kind: 'network', message: 'RoFit’s background worker did not answer. Reload the page and try again.' } as RpcError;
  if (!r.ok) throw r.error;
  return r.data;
}

export type { AssetRec };
