/** Sample-world helpers for the pages. All numbers are computed by RoFit's own analysis code at build time. */
import { priceKind, summarizePrices } from '../../../src/shared/analysis.ts';
import { typeName } from '../../../src/shared/assetTypes.ts';
import type { AssetRec, AssetView, Provenance } from '../../../src/shared/types.ts';
import { renderFigure, svgUrl } from '../demo/art.ts';
import { HERO_OUTFIT, ITEM, USERS, type SampleItem } from '../demo/fixtures.ts';

export { priceKind, summarizePrices, typeName };
export const robux = (n: number) => `R$\u202f${new Intl.NumberFormat('en-US').format(n)}`;
export const wardrobe = USERS[0];
export const outfit = wardrobe.outfits.find((o) => o.id === HERO_OUTFIT)!;

function rec(it: SampleItem): AssetRec {
  return {
    id: it.id, name: it.name, assetTypeId: it.type, price: it.free ? 0 : (it.price ?? null), isFree: !!it.free, isOffSale: !!it.offsale,
    restriction: it.restriction ?? 'none', lowestResale: it.resale ?? null, status: [], observedAt: 0,
    creator: it.creator ? { id: 0, name: it.creator, type: 'User', verified: false } : undefined,
  };
}
export const view = (id: number, provenance: Provenance): AssetView => {
  const it = ITEM.get(id)!;
  return { id, provenance, rec: provenance === 'unknown' ? undefined : rec(it), ref: { id, name: it.name, assetTypeId: it.type, assetTypeName: typeName(it.type) } as AssetView['ref'] };
};

export const HAT = 910000000000020, HAIR = 910000000000030, SCARF = 910000000000045, COAT = 910000000000060, PACK = 910000000000050,
  JEANS = 910000000000064, BOOT_L = 910000000000070, BOOT_R = 910000000000071;
/** The states the hero illustrates: everything live, except a cached scarf and a backpack Roblox no longer returns. */
export const heroProv = new Map<number, Provenance>([[SCARF, 'cached'], [PACK, 'last-known']]);
export const heroViews = outfit.items.map((id) => view(id, heroProv.get(id) ?? 'live'));
export const heroSum = summarizePrices(heroViews);

export const tagFor = (p: Provenance): [string, string] =>
  (({ live: ['live', 'Live'], cached: ['cached', 'Cached'], 'last-known': ['known', 'Last known'], derived: ['cached', 'Derived'], unknown: ['unknown', 'Unknown'] }) as Record<Provenance, [string, string]>)[p];

export const thumb = (o: { skin: string; avatarType: string; scale?: object; items: number[] }) =>
  svgUrl(renderFigure({ skin: o.skin, avatarType: o.avatarType, scale: o.scale as never, items: o.items.map((id) => ({ id, art: ITEM.get(id)!.art })) }));