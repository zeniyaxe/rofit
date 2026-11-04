import test from 'node:test';
import assert from 'node:assert/strict';
import { configHash, diffOutfits, jaccard, clusterVariants, summarizePrices, priceKind, toStudioLua, groupAssets } from '../../src/shared/analysis.ts';
import type { AssetView, OutfitDetails } from '../../src/shared/types.ts';

const colors = { head: 'FFFFFF', torso: 'FFFFFF', rightArm: 'FFFFFF', leftArm: 'FFFFFF', rightLeg: 'FFFFFF', leftLeg: 'FFFFFF' };
const scale = { height: 1, width: 1, head: 1, depth: 1, proportion: 0, bodyType: 0 };
const mk = (ids: number[], over: Partial<OutfitDetails> = {}): OutfitDetails => ({
  id: 1, name: 'x', assets: ids.map((id) => ({ id, name: 'a' + id, assetTypeId: 8, assetTypeName: 'Hat' })),
  bodyColors: colors, scale, avatarType: 'R15', outfitType: 'Avatar', fetchedAt: 0, ...over,
});

test('configHash ignores order and name, notices content', () => {
  assert.equal(configHash(mk([1, 2, 3])), configHash(mk([3, 1, 2], { name: 'other' })));
  assert.notEqual(configHash(mk([1, 2, 3])), configHash(mk([1, 2])));
  assert.notEqual(configHash(mk([1])), configHash(mk([1], { bodyColors: { ...colors, head: '000000' } })));
  assert.notEqual(configHash(mk([1])), configHash(mk([1], { scale: { ...scale, height: 1.05 } })));
});

test('diffOutfits reports shared/unique items, colors and scales', () => {
  const d = diffOutfits(mk([1, 2, 3]), mk([2, 3, 4], { bodyColors: { ...colors, torso: '000000' }, scale: { ...scale, width: 0.9 } }));
  assert.deepEqual(d.shared.sort(), [2, 3]);
  assert.deepEqual(d.onlyA, [1]);
  assert.deepEqual(d.onlyB, [4]);
  assert.equal(d.similarity, 0.5);
  assert.equal(d.colors.length, 1);
  assert.equal(d.colors[0].part, 'torso');
  assert.equal(d.scales[0].key, 'width');
});

test('jaccard edge cases', () => {
  assert.equal(jaccard([], []), 1);
  assert.equal(jaccard([1], [2]), 0);
});

test('clusterVariants groups near-duplicates only', () => {
  const sets = new Map([[1, [1, 2, 3, 4]], [2, [1, 2, 3, 4, 5]], [3, [9, 10]], [4, [1, 2, 3, 4, 6]]]);
  const g = clusterVariants(sets, 0.7);
  assert.equal(g.length, 1);
  assert.deepEqual(g[0].sort(), [1, 2, 4]);
});

const view = (id: number, rec: Partial<NonNullable<AssetView['rec']>> | null, provenance: AssetView['provenance'] = 'live'): AssetView => ({
  id, provenance,
  rec: rec ? { id, name: 'n', assetTypeId: 8, price: null, isFree: false, isOffSale: false, restriction: 'none', lowestResale: null, status: [], observedAt: 0, ...rec } : undefined,
});

test('price kinds never confuse off-sale, resale, last-known and unknown', () => {
  assert.equal(priceKind(view(1, { price: 75 })).kind, 'onsale');
  assert.equal(priceKind(view(2, { price: 0, isFree: true })).kind, 'free');
  assert.equal(priceKind(view(3, { price: 7, isOffSale: true, restriction: 'limited', lowestResale: 1500 })).kind, 'resale');
  assert.equal(priceKind(view(4, { price: 7, isOffSale: true })).kind, 'offsale');
  // A historical price is never presented as a current one.
  assert.equal(priceKind(view(5, { price: 50 }, 'last-known')).kind, 'unknown');
  assert.equal(priceKind(view(6, null, 'unknown')).kind, 'unknown');
});

test('summarizePrices keeps buy-now and resale separate and counts unknowns', () => {
  const s = summarizePrices([view(1, { price: 100 }), view(2, { price: 50 }), view(3, { isFree: true, price: 0 }), view(4, { isOffSale: true, lowestResale: 900 }), view(5, { isOffSale: true }), view(6, null, 'unknown')]);
  assert.equal(s.buyNow, 150);
  assert.equal(s.buyCount, 2);
  assert.equal(s.free, 1);
  assert.equal(s.resale, 900);
  assert.equal(s.offsale, 1);
  assert.equal(s.unknown, 1);
  assert.equal(s.parts[0].id, 4);
  assert.equal(summarizePrices([view(1, { price: 100 })], new Set([1])).buyNow, 0);
});

test('Studio Lua export maps accessories, classic and layered clothing', () => {
  const d = mk([], {
    assets: [
      { id: 1, name: 'h', assetTypeId: 8, assetTypeName: 'Hat' }, { id: 2, name: 'h2', assetTypeId: 8, assetTypeName: 'Hat' },
      { id: 3, name: 's', assetTypeId: 11, assetTypeName: 'Shirt' }, { id: 4, name: 'j', assetTypeId: 67, assetTypeName: 'JacketAccessory' },
    ],
  });
  const lua = toStudioLua(d);
  assert.match(lua, /d\.HatAccessory = "1,2"/);
  assert.match(lua, /d\.Shirt = 3/);
  assert.match(lua, /AccessoryType = Enum\.AccessoryType\.Jacket/);
  assert.match(lua, /HeadColor = Color3\.fromHex\("#FFFFFF"\)/);
});

test('groupAssets orders groups predictably', () => {
  const g = groupAssets([{ assetTypeId: 27 }, { assetTypeId: 8 }, { assetTypeId: 11 }]);
  assert.deepEqual(g.map((x) => x.group), ['Accessories', 'Classic clothing', 'Body parts']);
});

test('price buckets only claim what prices prove', async () => {
  const { inBucket, buyableNew, outfitCost } = await import('../../src/shared/analysis.ts');
  const rec = (id: number, price: number | null, extra: Record<string, unknown> = {}) => [id, { id, name: 'x', assetTypeId: 8, price, isFree: price === 0, isOffSale: price == null, restriction: 'none', lowestResale: null, status: [], observedAt: 1, ...extra }] as const;
  const recs = new Map<number, any>([rec(1, 50), rec(2, 0), rec(3, null), rec(4, null, { restriction: 'limited', lowestResale: 9000 })]);
  const cheap = outfitCost([1, 2], recs);
  assert.equal(inBucket(cheap, '100'), true);
  assert.equal(inBucket(cheap, 'free'), false);
  assert.equal(buyableNew(cheap), true);
  const free = outfitCost([2], recs);
  assert.equal(inBucket(free, 'free'), true);
  const offsale = outfitCost([1, 3], recs);
  assert.equal(inBucket(offsale, '100'), false, 'an off-sale item means the total is not a real total');
  assert.equal(buyableNew(offsale), false);
  const unknown = outfitCost([1, 99], recs);
  assert.equal(inBucket(unknown, '5000'), false);
  assert.equal(inBucket(unknown, 'any'), true);
  const limited = outfitCost([1, 4], recs);
  assert.equal(inBucket(limited, 'over'), true);
  assert.equal(limited.limiteds, 1);
  assert.equal(buyableNew(limited), false);
});
