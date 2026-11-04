import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveAccess, sharePolicy } from '../../src/shared/access.ts';
import { motionLevel } from '../../src/shared/motion.ts';
import { normalizeSettings, DEFAULTS } from '../../src/shared/settings.ts';
import { planImport } from '../../src/shared/backup.ts';
import { encodeShare } from '../../src/shared/share.ts';
import { similarOutfits, outfitCost } from '../../src/shared/analysis.ts';
import type { AssetRec } from '../../src/shared/types.ts';

test('access states follow the evidence, never claim public without proof', () => {
  assert.equal(deriveAccess({ userId: 5, visible: 3, meId: 5 }), 'owner');
  assert.equal(deriveAccess({ userId: 5, visible: 3, meId: null }), 'public', 'signed out → Roblox already answered anonymously');
  assert.equal(deriveAccess({ userId: 5, visible: 3, meId: 9, anon: 'visible' }), 'public');
  assert.equal(deriveAccess({ userId: 5, visible: 3, meId: 9, anon: 'hidden' }), 'viewer');
  assert.equal(deriveAccess({ userId: 5, visible: 3, meId: 9, anon: 'error' }), 'unknown');
  assert.equal(deriveAccess({ userId: 5, visible: 3, meId: 9, anon: 'skipped' }), 'unknown');
  assert.equal(deriveAccess({ userId: 5, visible: 0, meId: 9, anon: 'visible' }), 'unknown', 'empty lists prove nothing');
  assert.equal(deriveAccess({ userId: 5, visible: 0, error: 'forbidden', cached: 4 }), 'restricted', 'private beats cached copies');
  assert.equal(deriveAccess({ userId: 5, visible: 0, error: 'not-found' }), 'unavailable');
  assert.equal(deriveAccess({ userId: 5, visible: 0, error: 'network', cached: 2 }), 'cached');
  assert.equal(deriveAccess({ userId: 5, visible: 0, error: 'timeout' }), 'unknown');
  assert.equal(sharePolicy('public'), 'allow');
  assert.equal(sharePolicy('owner'), 'allow');
  assert.equal(sharePolicy('viewer'), 'confirm');
  assert.equal(sharePolicy('unknown'), 'confirm');
  assert.equal(sharePolicy('restricted'), 'block');
});

test('motion levels: system follows the OS, explicit choices win', () => {
  assert.equal(motionLevel('system', false), 'full');
  assert.equal(motionLevel('system', true), 'calm');
  assert.equal(motionLevel('balanced', true), 'balanced');
  assert.equal(motionLevel('full', true), 'full');
  assert.equal(motionLevel('calm', false), 'calm');
  assert.equal(motionLevel('weird', true), 'calm');
});

test('1.x settings migrate without changing anyone’s motion', () => {
  assert.equal(normalizeSettings({ motion: 'reduced' }).motion, 'calm');
  assert.equal(normalizeSettings({ motion: 'full' }).motion, 'system', '1.x "full" still honoured the OS setting');
  assert.equal(normalizeSettings({ v: 2, motion: 'full' }).motion, 'full', 'a 2.0 explicit Full stays Full');
  assert.equal(normalizeSettings({ v: 2, motion: 'nonsense' }).motion, 'system');
  assert.deepEqual(normalizeSettings(undefined), DEFAULTS);
  assert.equal(normalizeSettings({ density: 'large' }).density, 'large');
});

const colors = { head: 'FFFFFF', torso: 'FFFFFF', rightArm: 'FFFFFF', leftArm: 'FFFFFF', rightLeg: 'FFFFFF', leftLeg: 'FFFFFF' };
const scale = { height: 1, width: 1, head: 1, depth: 1, proportion: 0, bodyType: 0 };
const entry = (u: number, o: number, extra: Record<string, unknown> = {}) => ({
  key: `${u}:${o}`, userId: u, userName: 'u' + u, outfitId: o, name: 'Outfit ' + o, savedAt: 1, tags: ['a', 'a', ' b '], note: '', collection: '',
  details: { id: o, name: 'Outfit ' + o, assets: [{ id: 11, name: 'Hat', assetTypeId: 8, assetTypeName: 'Hat' }], bodyColors: colors, scale, avatarType: 'R15', outfitType: 'Avatar', fetchedAt: 1 },
  assets: { 11: { id: 11, name: 'Hat', assetTypeId: 8, price: 50, isFree: false, isOffSale: false, restriction: 'none', lowestResale: null, status: [], observedAt: 1, thumb: 'https://evil.example/x.png' } },
  ...extra,
});

test('backup import validates entries and reports what it would do', async () => {
  const data = { app: 'rofit-inspector', schema: 1, library: [entry(1, 2), entry(1, 3), entry(1, 3), { ...entry(1, 4), key: '9:9' }, { nope: true }], assets: [], snapshots: [{ bad: 1 }] };
  const plan = await planImport(data, new Set(['1:3']));
  assert.equal(plan.report.kind, 'backup');
  assert.equal(plan.report.found, 5);
  assert.equal(plan.report.invalid, 3, 'duplicate, mismatched key and non-entry are dropped');
  assert.equal(plan.report.existing, 1);
  assert.equal(plan.report.add, 1);
  assert.equal(plan.entries.length, 1, 'existing entries are skipped unless replacing');
  assert.deepEqual(plan.entries[0].tags, ['a', 'b']);
  assert.equal(plan.entries[0].assets[11].thumb, undefined, 'non-Roblox images are dropped');
  assert.equal(plan.report.snapshots, 0);
  const rep = await planImport(data, new Set(['1:3']), true);
  assert.equal(rep.entries.length, 2);
});

test('imports single manifests (1.x type names) and share links; rejects junk and future schemas', async () => {
  const manifest = { outfit: { id: 77, name: 'Look', user: { id: 5, name: 'Pat' }, avatarType: 'R6', bodyColors: colors, scale }, items: [{ id: 3, name: 'Hair', type: 'Hair' }], exportedAt: '2025-01-02T00:00:00Z' };
  const m = await planImport(JSON.stringify(manifest), new Set());
  assert.equal(m.report.kind, 'manifest');
  assert.equal(m.entries[0].details.assets[0].assetTypeId, 41);
  assert.equal(m.entries[0].source, 'import');
  const payload = await encodeShare({ user: { id: 5, name: 'Pat' }, outfit: { id: 78, name: 'Shared' }, avatarType: 'R15', bodyColors: colors, scale, items: [{ id: 9, name: 'Cap', typeId: 8 }], at: 1000 });
  const s = await planImport(`https://rofit.site/o/#${payload}`, new Set());
  assert.equal(s.report.kind, 'share');
  assert.equal(s.entries[0].key, '5:78');
  assert.equal(s.entries[0].source, 'share');
  assert.equal(s.entries[0].assets[9].price, null, 'share links carry no prices, none are invented');
  const junk = await planImport('hello', new Set());
  assert.equal(junk.entries.length, 0);
  assert.match(junk.report.problems[0], /isn’t a RoFit/);
  const future = await planImport({ app: 'rofit-inspector', schema: 9, library: 5 }, new Set());
  assert.match(future.report.problems[0], /newer RoFit/);
});

test('similarOutfits ignores body parts and ranks by shared look items', () => {
  const body = [{ id: 1, assetTypeId: 27 }, { id: 2, assetTypeId: 28 }];
  const target = [...body, { id: 10, assetTypeId: 8 }, { id: 11, assetTypeId: 41 }, { id: 12, assetTypeId: 11 }];
  const cands = [
    { key: 'a', assets: [...body, { id: 99, assetTypeId: 8 }] },
    { key: 'b', assets: [...body, { id: 10, assetTypeId: 8 }, { id: 11, assetTypeId: 41 }] },
    { key: 'c', assets: [{ id: 10, assetTypeId: 8 }, { id: 50, assetTypeId: 41 }, { id: 51, assetTypeId: 11 }] },
  ];
  const r = similarOutfits(target, cands, 0.2);
  assert.deepEqual(r.map((x) => x.key), ['b', 'c'], 'sharing only body parts is not similar');
  assert.equal(r[0].shared, 2);
});

test('outfitCost separates buy-now, resale, free, off-sale and unknown', () => {
  const rec = (id: number, o: Partial<AssetRec>): AssetRec => ({ id, name: '', assetTypeId: 8, price: null, isFree: false, isOffSale: false, restriction: 'none', lowestResale: null, status: [], observedAt: 1, ...o });
  const recs = new Map([[1, rec(1, { price: 100 })], [2, rec(2, { isFree: true, price: 0 })], [3, rec(3, { isOffSale: true, restriction: 'limited', lowestResale: 900 })], [4, rec(4, { isOffSale: true })]]);
  const c = outfitCost([1, 2, 3, 4, 5], recs);
  assert.deepEqual({ buyNow: c.buyNow, resale: c.resale, free: c.free, offsale: c.offsale, unknown: c.unknown, limiteds: c.limiteds, known: c.known }, { buyNow: 100, resale: 900, free: 1, offsale: 1, unknown: 1, limiteds: 1, known: 4 });
});
