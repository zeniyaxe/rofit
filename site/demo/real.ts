/**
 * Real public profiles for the demo, read from the dated snapshot that scripts/capture-real.mjs wrote to /real/snapshot.json.
 * The site never calls Roblox from the visitor's browser: this is a static copy of what a signed-out visitor could see.
 * If the file is missing or empty the demo simply has no real profiles and says so.
 */
import type { AssetRec, BodyColors, BodyScale, OutfitDetails, OutfitRec } from '../../src/shared/types.ts';

interface SnapAsset { id: number; name: string; typeId: number; typeName: string; creator: { id: number; name: string; type: string; verified: boolean } | null; price: number | null; forSale: boolean; limited: boolean; resolved: boolean; thumb: string | null }
interface SnapOutfit { id: number; name: string; thumb: string; avatarType: string; bodyColors: Record<string, string> | null; scale: Record<string, number> | null; assets: { id: number; name: string; typeId: number; typeName: string }[] }
export interface SnapUser { id: number; name: string; displayName: string; verified: boolean; headshot: string | null; outfits: SnapOutfit[] }
interface Snap { capturedAt: string; users: SnapUser[]; assets: Record<number, SnapAsset> }

let snap: Snap | null = null;
let loading: Promise<Snap | null> | null = null;

export function loadReal(): Promise<Snap | null> {
  return loading ??= fetch('/real/snapshot.json').then((r) => (r.ok ? r.json() : null)).then((j) => (snap = j && Array.isArray(j.users) && j.users.length ? j : null)).catch(() => null);
}
export const realUsers = () => snap?.users ?? [];
export const capturedAt = () => snap?.capturedAt ?? null;
export const realUser = (id: number) => snap?.users.find((u) => u.id === id);
export const realOutfit = (id: number) => { for (const u of snap?.users ?? []) { const o = u.outfits.find((x) => x.id === id); if (o) return { u, o }; } return undefined; };

const when = () => (snap ? Date.parse(snap.capturedAt) : Date.now());
const hex = (v?: string) => (v ?? '#d3d3d3').replace('#', '').toUpperCase();
const DEFAULT_SCALE: BodyScale = { height: 1, width: 1, head: 1, depth: 1, proportion: 0, bodyType: 0 };

export function realOutfitRec(u: SnapUser, o: SnapOutfit, order: number): OutfitRec {
  return { userId: u.id, id: o.id, name: o.name, isEditable: true, outfitType: 'Avatar', order, firstSeen: when(), lastSeen: when() };
}
export function realDetails(o: SnapOutfit): OutfitDetails {
  const c = o.bodyColors ?? {};
  const bodyColors: BodyColors = { head: hex(c.headColor3), torso: hex(c.torsoColor3), rightArm: hex(c.rightArmColor3), leftArm: hex(c.leftArmColor3), rightLeg: hex(c.rightLegColor3), leftLeg: hex(c.leftLegColor3) };
  return {
    id: o.id, name: o.name, avatarType: o.avatarType ?? 'R15', outfitType: 'Avatar', fetchedAt: when(), bodyColors,
    scale: { ...DEFAULT_SCALE, ...(o.scale ?? {}) },
    assets: o.assets.map((a) => ({ id: a.id, name: a.name, assetTypeId: a.typeId, assetTypeName: a.typeName })),
  };
}
/** An AssetRec the way the extension would hold it, or undefined when Roblox didn't resolve the asset (shown as unknown, never as "deleted"). */
export function realAssetRec(id: number): AssetRec | undefined {
  const a = snap?.assets[id];
  if (!a || !a.resolved) return undefined;
  const free = a.forSale && a.price === 0;
  return {
    id, name: a.name, assetTypeId: a.typeId, creator: a.creator ?? undefined, price: a.forSale ? a.price : null, isFree: free, isOffSale: !a.forSale,
    restriction: a.limited ? 'limited' : 'none', lowestResale: null, status: [], thumb: a.thumb ?? undefined, observedAt: snap ? Date.parse(snap.capturedAt) : Date.now(),
  };
}
