import test from 'node:test';
import assert from 'node:assert/strict';
import { wardrobeOverview } from '../../src/shared/overview.ts';
import { costDelta, costFigure, costLabel } from '../../src/ui/format.ts';
import type { AssetRec, OutfitDetails, OutfitRec } from '../../src/shared/types.ts';

const parts = (c: Partial<{ buyNow: number; resale: number; free: number; offsale: number; unknown: number }>) => ({ buyNow: 0, resale: 0, free: 0, offsale: 0, unknown: 0, ...c });

test('costFigure: a known total prints solid, a lower bound says so', () => {
  const exact = costFigure(parts({ buyNow: 600, resale: 254 }));
  assert.deepEqual([exact.text, exact.exact, exact.missing], ['R$ 854', true, null]);
  assert.match(exact.says, /R\$ 854 to recreate/);

  const low = costFigure(parts({ buyNow: 854, unknown: 2, offsale: 1 }));
  assert.equal(low.text, 'R$ 854+');
  assert.equal(low.exact, false);
  assert.equal(low.missing, '1 off sale · 2 prices unknown');
  assert.match(low.says, /^At least R\$ 854\. Not counted: 1 item off sale with no resale price and 2 items with no price from Roblox\.$/);

  assert.equal(costFigure(parts({ free: 3 })).text, 'Free');
  // nothing priced: never "R$ 0+"
  assert.equal(costFigure(parts({ offsale: 2 })).text, 'Off sale');
  const unknown = costFigure(parts({ unknown: 2, free: 1 }));
  assert.equal(unknown.text, null);
  assert.match(unknown.says, /^Cost unknown/);
  // costLabel (cards) is the same rule
  assert.equal(costLabel({ ...parts({ buyNow: 120, unknown: 1 }), limiteds: 0, known: 1, total: 2 }), 'R$ 120+');
});

test('costDelta only claims a difference between two exact totals', () => {
  assert.deepEqual(costDelta(parts({ buyNow: 100 }), parts({ buyNow: 350 })), { text: '+R$ 250', exact: true, diff: 250 });
  assert.deepEqual(costDelta(parts({ buyNow: 350 }), parts({ buyNow: 100 })), { text: '−R$ 250', exact: true, diff: -250 });
  assert.deepEqual(costDelta(parts({ free: 1 }), parts({ free: 2 })), { text: 'Same cost', exact: true, diff: 0 });
  assert.equal(costDelta(parts({ buyNow: 100, unknown: 1 }), parts({ buyNow: 350 })).exact, false);
});

// ---- wardrobe overview -------------------------------------------------------------------------
const colors = { head: 'FFFFFF', torso: 'FFFFFF', rightArm: 'FFFFFF', leftArm: 'FFFFFF', rightLeg: 'FFFFFF', leftLeg: 'FFFFFF' };
const scale = { height: 1, width: 1, head: 1, depth: 1, proportion: 0, bodyType: 0 };
const o = (id: number, name = 'Fit ' + id, isEditable = true): OutfitRec => ({ userId: 7, id, name, isEditable, outfitType: 'Avatar', order: id, firstSeen: 0, lastSeen: 0 });
// assetTypeId 8 = Hat (a look item), 27 = Torso (a body part: shared by most outfits, so not "most worn")
const d = (id: number, items: [number, number][], avatarType = 'R15'): OutfitDetails => ({
  id, name: 'Fit ' + id, assets: items.map(([a, t]) => ({ id: a, name: 'Item ' + a, assetTypeId: t, assetTypeName: t === 8 ? 'Hat' : 'Torso' })),
  bodyColors: colors, scale, avatarType, outfitType: 'Avatar', fetchedAt: 0,
});
const rec = (id: number, r: Partial<AssetRec>): AssetRec => ({ id, name: 'Item ' + id, assetTypeId: 8, price: null, isFree: false, isOffSale: false, restriction: 'none', lowestResale: null, status: [], observedAt: 0, ...r });

test('wardrobeOverview: count only until outfits are read', () => {
  const ov = wardrobeOverview({ outfits: [o(1), o(2)], presetsHidden: 9, details: new Map(), recs: new Map() })!;
  assert.equal(ov.outfits, 2);
  assert.equal(ov.presetsHidden, 9);
  assert.equal(ov.read, 0);
  assert.equal(ov.priced, 0);
  assert.equal(ov.priciest, null);
  assert.deepEqual(ov.reused, []);
});

test('wardrobeOverview: types, most worn look items (not body parts), honest price extremes', () => {
  const details = new Map([
    [1, d(1, [[100, 8], [103, 8], [900, 27]], 'R6')],
    [2, d(2, [[100, 8], [101, 8], [900, 27]])],
    [3, d(3, [[100, 8], [101, 8], [102, 8], [900, 27]])],
  ]);
  const recs = new Map([
    [100, rec(100, { price: 50 })], [101, rec(101, { price: 0, isFree: true })], [900, rec(900, { price: 0, isFree: true })],
    [102, rec(102, { isOffSale: true, restriction: 'limited', lowestResale: null })], [103, rec(103, { price: 200 })],
  ]);
  const ov = wardrobeOverview({ outfits: [o(1, 'Old'), o(2, 'Cheap'), o(3, 'Rare'), o(4)], presetsHidden: 0, details, recs })!;
  assert.equal(ov.read, 3);
  assert.deepEqual(ov.types, { R15: 2, R6: 1, other: 0 });
  assert.deepEqual(ov.reused.map((r) => [r.id, r.count]), [[100, 3], [101, 2]], 'body part 900 is in every outfit but is not a look item');
  assert.equal(ov.priced, 3);
  // "Rare" has an off-sale limited with no resale price: R$ 50 is only a lower bound, so it can't be the cheapest.
  assert.equal(ov.priciest!.name, 'Old');
  assert.equal(ov.cheapest!.name, 'Cheap');
  assert.equal(ov.buyable, 2);
});

test('wardrobeOverview: nothing at all for lists Roblox refuses to show', () => {
  const details = new Map([[1, d(1, [[100, 8]])]]);
  for (const access of ['restricted', 'unavailable'] as const) assert.equal(wardrobeOverview({ outfits: [o(1)], presetsHidden: 0, details, recs: new Map(), access }), null);
  assert.equal(wardrobeOverview({ outfits: [], presetsHidden: 3, details: new Map(), recs: new Map() }), null);
  assert.ok(wardrobeOverview({ outfits: [o(1)], presetsHidden: 0, details, recs: new Map(), access: 'viewer' }));
});
