import type { AccessState } from './access.ts';
import type { AssetRec, OutfitDetails, OutfitRec } from './types.ts';
import { costTotal, lookIds, outfitCost, reuseMap, type OutfitCost } from './analysis.ts';

/**
 * What the explorer's empty inspector pane can say about a profile's wardrobe, built only from data RoFit already
 * holds (the outfit list, outfits the user chose to read, item records already known). Pure; never asks Roblox.
 */
export interface WardrobeOverview {
  /** Outfits in view (presets excluded unless shown). */
  outfits: number;
  presetsHidden: number;
  /** Outfits whose contents RoFit has read. */
  read: number;
  /** Avatar types among the read outfits only. */
  types: { R15: number; R6: number; other: number };
  /** Outfits whose every item has a price record (the same rule the cards use). */
  priced: number;
  /** Highest cost among priced outfits; `cost` may be a lower bound (the UI marks it). */
  priciest: { id: number; name: string; cost: OutfitCost } | null;
  /** Lowest cost among priced outfits whose total is exact (nothing off sale or unknown). */
  cheapest: { id: number; name: string; cost: OutfitCost } | null;
  /** Priced outfits that can be bought new today in full. */
  buyable: number;
  /** Items that define a look (no body parts or animations) worn in two or more read outfits, most worn first. */
  reused: { id: number; name: string; typeName: string; count: number }[];
}

export interface OverviewInput {
  outfits: OutfitRec[];
  presetsHidden: number;
  details: Map<number, OutfitDetails>;
  recs: Map<number, AssetRec>;
  /** What RoFit last observed about who can see the list. Restricted or unavailable lists get no overview at all. */
  access?: AccessState;
}

export function wardrobeOverview(input: OverviewInput, top = 3): WardrobeOverview | null {
  if (input.access === 'restricted' || input.access === 'unavailable') return null;
  if (!input.outfits.length) return null;
  const types = { R15: 0, R6: 0, other: 0 };
  const sets = new Map<number, number[]>();
  const names = new Map<number, { name: string; typeName: string }>();
  let read = 0, priced = 0, buyable = 0;
  let priciest: WardrobeOverview['priciest'] = null;
  let cheapest: WardrobeOverview['cheapest'] = null;
  for (const o of input.outfits) {
    const d = input.details.get(o.id);
    if (!d) continue;
    read++;
    if (d.avatarType === 'R15') types.R15++; else if (d.avatarType === 'R6') types.R6++; else types.other++;
    sets.set(o.id, lookIds(d.assets));
    for (const a of d.assets) if (!names.has(a.id)) names.set(a.id, { name: a.name, typeName: a.assetTypeName });
    if (!d.assets.length || !d.assets.every((a) => input.recs.has(a.id))) continue;
    const cost = outfitCost(d.assets.map((a) => a.id), input.recs);
    priced++;
    const t = costTotal(cost);
    const exact = cost.offsale === 0 && cost.unknown === 0;
    if (exact && cost.resale === 0) buyable++;
    if (t > 0 && (!priciest || t > costTotal(priciest.cost))) priciest = { id: o.id, name: o.name, cost };
    if (exact && (!cheapest || t < costTotal(cheapest.cost))) cheapest = { id: o.id, name: o.name, cost };
  }
  if (cheapest && priciest && cheapest.id === priciest.id) cheapest = null;
  const reused = [...reuseMap(sets).entries()]
    .filter(([, os]) => os.length > 1)
    .map(([id, os]) => ({ id, count: os.length, name: names.get(id)?.name ?? String(id), typeName: names.get(id)?.typeName ?? '' }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, top);
  return { outfits: input.outfits.length, presetsHidden: input.presetsHidden, read, types, priced, priciest, cheapest, buyable, reused };
}
