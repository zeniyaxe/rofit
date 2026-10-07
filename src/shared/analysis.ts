import type { AssetView, BodyColors, BodyScale, OutfitDetails, Snapshot } from './types.ts';
import { ASSET_TYPES, GROUP_ORDER, typeGroup, type Group } from './assetTypes.ts';

/** Stable fingerprint of what an outfit actually contains (not its name). */
export function configHash(d: Pick<OutfitDetails, 'assets' | 'bodyColors' | 'scale' | 'avatarType'>): string {
  const ids = d.assets.map((a) => a.id).sort((a, b) => a - b).join(',');
  const c = d.bodyColors;
  const s = d.scale;
  const raw = [ids, c.head, c.torso, c.rightArm, c.leftArm, c.rightLeg, c.leftLeg,
    s.height, s.width, s.head, s.depth, s.proportion, s.bodyType, d.avatarType].join('|');
  let h = 5381;
  for (let i = 0; i < raw.length; i++) h = ((h << 5) + h + raw.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36) + ':' + raw.length;
}

export function groupAssets<T extends { assetTypeId: number }>(items: T[]): { group: Group; items: T[] }[] {
  const m = new Map<Group, T[]>();
  for (const it of items) {
    const g = typeGroup(it.assetTypeId);
    if (!m.has(g)) m.set(g, []);
    m.get(g)!.push(it);
  }
  return GROUP_ORDER.filter((g) => m.has(g)).map((g) => ({ group: g, items: m.get(g)! }));
}

export type PriceKind = 'free' | 'onsale' | 'resale' | 'offsale' | 'unknown';

export function priceKind(v: AssetView): { kind: PriceKind; amount: number | null } {
  const r = v.rec;
  if (!r || v.provenance === 'unknown') return { kind: 'unknown', amount: null };
  if (v.provenance === 'last-known') return { kind: 'unknown', amount: null };
  if (!r.isOffSale && (r.isFree || r.price === 0)) return { kind: 'free', amount: 0 };
  if (!r.isOffSale && r.price != null) return { kind: 'onsale', amount: r.price };
  if (r.lowestResale != null && r.lowestResale > 0) return { kind: 'resale', amount: r.lowestResale };
  return { kind: 'offsale', amount: null };
}

export interface PriceSummary {
  buyNow: number; buyCount: number; free: number;
  resale: number; resaleCount: number;
  offsale: number; unknown: number;
  /** Largest contributors first. */
  parts: { id: number; amount: number; kind: PriceKind }[];
}

/** Totals never mix buy-now and resale prices, and unknowns are counted rather than guessed. */
export function summarizePrices(views: AssetView[], skip?: Set<number>): PriceSummary {
  const s: PriceSummary = { buyNow: 0, buyCount: 0, free: 0, resale: 0, resaleCount: 0, offsale: 0, unknown: 0, parts: [] };
  for (const v of views) {
    if (skip?.has(v.id)) continue;
    const { kind, amount } = priceKind(v);
    if (kind === 'free') s.free++;
    else if (kind === 'onsale') { s.buyNow += amount!; s.buyCount++; if (amount) s.parts.push({ id: v.id, amount: amount!, kind }); }
    else if (kind === 'resale') { s.resale += amount!; s.resaleCount++; s.parts.push({ id: v.id, amount: amount!, kind }); }
    else if (kind === 'offsale') s.offsale++;
    else s.unknown++;
  }
  s.parts.sort((a, b) => b.amount - a.amount);
  return s;
}

export function jaccard(a: Iterable<number>, b: Iterable<number>): number {
  const A = new Set(a), B = new Set(b);
  if (!A.size && !B.size) return 1;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

export interface OutfitDiff {
  shared: number[]; onlyA: number[]; onlyB: number[];
  similarity: number;
  colors: { part: keyof BodyColors; a: string; b: string }[];
  scales: { key: keyof BodyScale; a: number; b: number }[];
  avatarTypeDiffers: boolean;
}

type Comparable = Pick<OutfitDetails, 'bodyColors' | 'scale' | 'avatarType'> & { assets?: { id: number }[]; assetIds?: number[] };
const idsOf = (x: Comparable) => x.assetIds ?? (x.assets ?? []).map((a) => a.id);

export function diffOutfits(a: Comparable, b: Comparable): OutfitDiff {
  const A = new Set(idsOf(a)), B = new Set(idsOf(b));
  const colors = (Object.keys(a.bodyColors) as (keyof BodyColors)[])
    .filter((k) => a.bodyColors[k].toLowerCase() !== b.bodyColors[k].toLowerCase())
    .map((part) => ({ part, a: a.bodyColors[part], b: b.bodyColors[part] }));
  const scales = (Object.keys(a.scale) as (keyof BodyScale)[])
    .filter((k) => Math.abs(a.scale[k] - b.scale[k]) > 0.0005)
    .map((key) => ({ key, a: a.scale[key], b: b.scale[key] }));
  return {
    shared: [...A].filter((x) => B.has(x)),
    onlyA: [...A].filter((x) => !B.has(x)),
    onlyB: [...B].filter((x) => !A.has(x)),
    similarity: jaccard(A, B),
    colors, scales,
    avatarTypeDiffers: a.avatarType !== b.avatarType,
  };
}

/** Group outfits whose items overlap strongly (variants of one look). Union-find on Jaccard ≥ threshold. */
export function clusterVariants(sets: Map<number, number[]>, threshold = 0.75): number[][] {
  const ids = [...sets.keys()];
  const parent = new Map(ids.map((i) => [i, i]));
  const find = (x: number): number => {
    while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x)!)!); x = parent.get(x)!; }
    return x;
  };
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      if (jaccard(sets.get(ids[i])!, sets.get(ids[j])!) >= threshold) parent.set(find(ids[i]), find(ids[j]));
    }
  }
  const out = new Map<number, number[]>();
  for (const i of ids) { const r = find(i); if (!out.has(r)) out.set(r, []); out.get(r)!.push(i); }
  return [...out.values()].filter((g) => g.length > 1);
}

/** asset id → outfit ids that contain it. */
export function reuseMap(sets: Map<number, number[]>): Map<number, number[]> {
  const m = new Map<number, number[]>();
  for (const [oid, assets] of sets) for (const a of assets) { if (!m.has(a)) m.set(a, []); m.get(a)!.push(oid); }
  return m;
}

export interface ChangeSummary {
  added: number[]; removed: number[];
  colorChanges: number; scaleChanges: number; renamed?: { from: string; to: string };
  avatarTypeChanged: boolean;
}
export function describeChange(prev: Snapshot, next: Snapshot): ChangeSummary {
  const d = diffOutfits(prev, next);
  return {
    added: d.onlyB, removed: d.onlyA, colorChanges: d.colors.length, scaleChanges: d.scales.length,
    renamed: prev.name !== next.name ? { from: prev.name, to: next.name } : undefined,
    avatarTypeChanged: d.avatarTypeDiffers,
  };
}

export const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};

/** HumanoidDescription script. Layered clothing goes through SetAccessories; everything else maps to a property. */
export function toStudioLua(d: OutfitDetails, title?: string): string {
  const lists: Record<string, number[]> = {};
  const layered: { id: number; type: string }[] = [];
  const direct: Record<string, number> = {};
  for (const a of d.assets) {
    const t = ASSET_TYPES[a.assetTypeId];
    if (t?.layered) layered.push({ id: a.id, type: t.layered });
    else if (t?.lua) {
      if (t.lua.endsWith('Accessory')) (lists[t.lua] ||= []).push(a.id);
      else direct[t.lua] = a.id;
    }
  }
  const L: string[] = [];
  L.push(`-- ${title ?? d.name} · outfit ${d.id} · ${d.avatarType}`);
  L.push('-- Generated by RoFit Inspector from the outfit as Roblox returned it.');
  L.push('local d = Instance.new("HumanoidDescription")');
  for (const [k, v] of Object.entries(direct)) L.push(`d.${k} = ${v}`);
  for (const [k, v] of Object.entries(lists)) L.push(`d.${k} = "${v.join(',')}"`);
  const c = d.bodyColors;
  const col = (hex: string) => `Color3.fromHex("#${hex}")`;
  L.push(`d.HeadColor = ${col(c.head)}`, `d.TorsoColor = ${col(c.torso)}`,
    `d.RightArmColor = ${col(c.rightArm)}`, `d.LeftArmColor = ${col(c.leftArm)}`,
    `d.RightLegColor = ${col(c.rightLeg)}`, `d.LeftLegColor = ${col(c.leftLeg)}`);
  const s = d.scale;
  L.push(`d.HeightScale = ${s.height}`, `d.WidthScale = ${s.width}`, `d.HeadScale = ${s.head}`,
    `d.DepthScale = ${s.depth}`, `d.ProportionScale = ${s.proportion}`, `d.BodyTypeScale = ${s.bodyType}`);
  if (layered.length) {
    L.push('d:SetAccessories({');
    layered.forEach((x, i) => L.push(`\t{ AssetId = ${x.id}, AccessoryType = Enum.AccessoryType.${x.type}, IsLayered = true, Order = ${i + 1} },`));
    L.push('}, true)');
  }
  L.push('return d');
  return L.join('\n');
}
