import type { AccessInfo } from './access.ts';

/** Where a piece of data came from. The UI never shows cached data as live. */
export type Provenance = 'live' | 'cached' | 'last-known' | 'derived' | 'unknown';

export interface OutfitRec {
  userId: number;
  id: number;
  name: string;
  /** Roblox: true for outfits the user saved; false for Roblox-supplied presets. */
  isEditable: boolean;
  outfitType: string;
  /** Position in Roblox's own ordering (0 = newest/first returned). */
  order: number;
  firstSeen: number;
  lastSeen: number;
  /** Set when a later sync no longer returned it (deleted by its owner). */
  missingSince?: number;
  prevNames?: { name: string; at: number }[];
}

export interface OutfitAssetRef {
  id: number;
  name: string;
  assetTypeId: number;
  assetTypeName: string;
}

export interface BodyColors {
  head: string; torso: string; rightArm: string; leftArm: string; rightLeg: string; leftLeg: string;
}
export interface BodyScale {
  height: number; width: number; head: number; depth: number; proportion: number; bodyType: number;
}

export interface OutfitDetails {
  id: number;
  name: string;
  assets: OutfitAssetRef[];
  bodyColors: BodyColors;
  scale: BodyScale;
  avatarType: 'R6' | 'R15' | string;
  outfitType: string;
  fetchedAt: number;
}

export interface Creator { id: number; name: string; type: string; verified: boolean }

export interface AssetRec {
  id: number;
  name: string;
  assetTypeId: number;
  creator?: Creator;
  /** Robux price on the day it was observed. null = no price (offsale/unknown). */
  price: number | null;
  isFree: boolean;
  isOffSale: boolean;
  restriction: 'none' | 'limited' | 'collectible';
  lowestResale: number | null;
  status: string[];
  thumb?: string;
  /** Last time Roblox resolved this asset. */
  observedAt: number;
  prevPrice?: number | null;
  prevObservedAt?: number;
}

/** What the UI receives for each asset: a record plus honesty about its freshness. */
export interface AssetView {
  id: number;
  provenance: Provenance;
  rec?: AssetRec;
  /** Always-live fallback data from the outfit itself. */
  ref?: OutfitAssetRef;
}

export interface Snapshot {
  id?: number;
  outfitKey: string;
  at: number;
  hash: string;
  name: string;
  assetIds: number[];
  assetNames: Record<number, string>;
  bodyColors: BodyColors;
  scale: BodyScale;
  avatarType: string;
}

export interface LibraryEntry {
  key: string; // `${userId}:${outfitId}`
  userId: number;
  userName: string;
  outfitId: number;
  name: string;
  savedAt: number;
  tags: string[];
  note: string;
  collection: string;
  thumb?: string;
  details: OutfitDetails;
  /** Snapshot of each asset as known when saved. */
  assets: Record<number, AssetRec>;
  favorite?: boolean;
  /** How it got here: saved from a profile (default), opened from a share link, or imported from a file. */
  source?: 'profile' | 'share' | 'import';
}

export interface UserRec {
  id: number; name: string; displayName: string; lastSeen: number;
  outfitCount?: number; lastSyncAt?: number;
  /** What RoFit last observed about who can see this account's outfits. */
  access?: AccessInfo;
}

export type ErrKind =
  | 'rate-limited' | 'not-found' | 'forbidden' | 'unauthenticated'
  | 'network' | 'timeout' | 'server' | 'bad-response' | 'aborted';
export interface RpcError {
  kind: ErrKind; message: string; status?: number; retryAfter?: number;
  /** Roblox's own error text/code, when it gave one. */
  detail?: string; code?: number;
  /** Whether Roblox saw the request as signed in (the viewer's relationship can change what a user's outfits reveal). */
  viewer?: 'in' | 'out' | 'unknown';
  /** For outfit-list failures: what the failure says about access (restricted, unavailable…). */
  access?: AccessInfo;
}

export type Capability =
  | 'list' | 'thumbs' | 'details' | 'catalog' | 'economy' | 'ownership' | 'resale' | 'myAvatar' | 'users' | 'access';
export interface CapState { ok: boolean; at: number; error?: string }

export const outfitKey = (userId: number, id: number) => `${userId}:${id}`;
