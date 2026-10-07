import 'fake-indexeddb/auto';
import test from 'node:test';
import assert from 'node:assert/strict';

// Minimal chrome stub: the service layer reads settings from storage.local.
const store: Record<string, unknown> = {};
(globalThis as any).chrome = {
  storage: { local: { get: async (k: string) => ({ [k]: store[k] }), set: async (o: any) => Object.assign(store, o) }, onChanged: { addListener() {} } },
};

const db = await import('../../src/background/db.ts');
const rbx = await import('../../src/background/roblox.ts');
const { makeHandlers } = await import('../../src/background/service.ts');

const json = (status: number, body: unknown, headers: Record<string, string> = {}) => new Response(JSON.stringify(body), { status, headers });
const handlers = () => makeHandlers({ diag: async () => ({}) as any, openPage: async () => {}, openUrls: async () => {} }) as any;

test('db round trips and indexes', async () => {
  await db.put('outfits', { key: '1:5', userId: 1, id: 5 });
  await db.put('outfits', { key: '2:6', userId: 2, id: 6 });
  assert.equal((await db.getAllByIndex('outfits', 'userId', 1)).length, 1);
  await db.del('outfits', ['1:5']);
  assert.equal(await db.count('outfits'), 1);
});

test('listOutfits follows v2 pagination tokens and requests only Avatar outfits', async () => {
  const urls: string[] = [];
  globalThis.fetch = (async (u: string) => {
    urls.push(u);
    return u.includes('paginationToken=T1')
      ? json(200, { data: [{ id: 3, name: 'c', isEditable: true, outfitType: 'Avatar' }], paginationToken: '' })
      : json(200, { data: [{ id: 1, name: 'a', isEditable: true, outfitType: 'Avatar' }, { id: 2, name: 'b', isEditable: false, outfitType: 'Avatar' }], paginationToken: 'T1' });
  }) as any;
  const r = await rbx.listOutfits(9);
  assert.equal(r.via, 'v2');
  assert.deepEqual(r.outfits.map((o: any) => o.id), [1, 2, 3]);
  assert.ok(urls.every((u) => u.includes('outfitType=Avatar')));
});

test('listOutfits falls back to v1 when v2 breaks, but not on 404', async () => {
  globalThis.fetch = (async (u: string) => (u.includes('/v2/') ? json(400, {}) : json(200, { data: [{ id: 7, name: 'old', isEditable: true, outfitType: null }] }))) as any;
  const r = await rbx.listOutfits(9);
  assert.equal(r.via, 'v1');
  assert.equal(r.outfits[0].outfitType, 'Avatar');
  globalThis.fetch = (async () => json(404, {})) as any;
  await assert.rejects(rbx.listOutfits(9), (e: any) => e.kind === 'not-found');
});

test('429 surfaces as rate-limited after retries', async () => {
  rbx.limiter.cooldownUntil = 0;
  let calls = 0;
  globalThis.fetch = (async () => { calls++; return json(429, {}, { 'retry-after': '0' }); }) as any;
  await assert.rejects(rbx.http('https://avatar.roblox.com/x', { retries: 1 }), (e: any) => e.kind === 'rate-limited');
  assert.equal(calls, 2);
  rbx.limiter.cooldownUntil = 0;
});

test('catalog POST retries once with the CSRF token Roblox hands back', async () => {
  const seen: (string | null)[] = [];
  globalThis.fetch = (async (_u: string, init: any) => {
    const tok = init.headers['x-csrf-token'] ?? null;
    seen.push(tok);
    return tok ? json(200, { data: [{ id: 1, name: 'n', assetType: 8 }] }) : json(403, {}, { 'x-csrf-token': 'abc' });
  }) as any;
  const r = await rbx.catalogDetails([1]);
  assert.equal(r.length, 1);
  assert.deepEqual(seen, [null, 'abc']);
});

test('assets: unresolved stays unknown, and becomes last-known (never live) once seen before', async () => {
  await db.clear('assets');
  const h = handlers();
  const refs = [{ id: 10, name: 'Hat', assetTypeId: 8, assetTypeName: 'Hat' }];
  let present = true;
  globalThis.fetch = (async (u: string) => {
    if (u.includes('catalog.roblox.com')) return present ? json(200, { data: [{ id: 10, name: 'Hat', assetType: 8, price: 75, creatorName: 'Roblox', creatorTargetId: 1, creatorType: 'User' }] }) : json(200, { data: [] });
    if (u.includes('economy.roblox.com')) return json(404, {});
    if (u.includes('thumbnails')) return json(200, { data: [{ targetId: 10, state: 'Completed', imageUrl: 'https://tr.rbxcdn.com/x' }] });
    return json(500, {});
  }) as any;
  const live = await h['assets.resolve']({ ids: [10], refs, force: true });
  assert.equal(live[10].provenance, 'live');
  assert.equal(live[10].rec.price, 75);
  assert.equal(live[10].rec.thumb, 'https://tr.rbxcdn.com/x');
  present = false;
  const later = await h['assets.resolve']({ ids: [10], refs, force: true });
  assert.equal(later[10].provenance, 'last-known');
  assert.equal(later[10].rec.price, 75);
  const never = await h['assets.resolve']({ ids: [11], refs: [{ id: 11, name: 'Ghost', assetTypeId: 8, assetTypeName: 'Hat' }], force: true });
  assert.equal(never[11].provenance, 'unknown');
  assert.equal(never[11].rec, undefined);
  assert.equal(never[11].ref.name, 'Ghost');
});

test('details: history records a snapshot only when the configuration changes', async () => {
  await db.clear('snapshots');
  await db.clear('details');
  const h = handlers();
  let assets = [{ id: 1, name: 'a', assetType: { id: 8, name: 'Hat' } }];
  const white = { headColor3: 'FFFFFF', torsoColor3: 'FFFFFF', rightArmColor3: 'FFFFFF', leftArmColor3: 'FFFFFF', rightLegColor3: 'FFFFFF', leftLegColor3: 'FFFFFF' };
  globalThis.fetch = (async () => json(200, { id: 5, name: 'Fit', assets, bodyColor3s: white, scale: {}, playerAvatarType: 'R15', outfitType: 'Avatar' })) as any;
  const a = await h['outfits.details']({ userId: 1, id: 5, force: true });
  assert.equal(a.change, undefined);
  await h['outfits.details']({ userId: 1, id: 5, force: true });
  assert.equal((await h['history.list']({ userId: 1, id: 5 })).length, 1);
  assets = [...assets, { id: 2, name: 'b', assetType: { id: 8, name: 'Hat' } }];
  const c = await h['outfits.details']({ userId: 1, id: 5, force: true });
  assert.deepEqual(c.change.added, [2]);
  assert.equal((await h['history.list']({ userId: 1, id: 5 })).length, 2);
});

test('import rejects foreign files and export/import round-trips the library', async () => {
  const h = handlers();
  await assert.rejects(h['data.import']({ data: { hello: 1 } }), (e: any) => /RoFit export/.test(e.message));
  await db.put('library', { key: '1:5', userId: 1, userName: 'u', outfitId: 5, name: 'Fit', savedAt: 1, tags: [], note: '', collection: '', details: { assets: [] }, assets: {} });
  const out = await h['data.export']({});
  await db.clear('library');
  assert.equal((await h['data.import']({ data: out })).added, 1);
  assert.equal((await h['data.import']({ data: out })).skipped, 1);
});

test('stale-while-revalidate: allowStale answers from cache without touching the network', async () => {
  const h = handlers();
  const old = Date.now() - 3 * 3600_000;
  await db.put('details', { key: '1:77', userId: 1, id: 77, name: 'Old', assets: [{ id: 5, name: 'a', assetTypeId: 8, assetTypeName: 'Hat' }], bodyColors: {}, scale: {}, avatarType: 'R15', outfitType: 'Avatar', fetchedAt: old });
  await db.put('assets', { id: 5, name: 'a', assetTypeId: 8, price: 10, isFree: false, isOffSale: false, restriction: 'none', lowestResale: null, status: [], observedAt: old });
  let calls = 0;
  globalThis.fetch = (async () => { calls++; throw new Error('network must not be used'); }) as any;
  const d = await h['outfits.details']({ userId: 1, id: 77, allowStale: true });
  assert.equal(d.source, 'cached');
  assert.equal(d.stale, true);
  const v = await h['assets.resolve']({ ids: [5, 6], refs: [{ id: 5, name: 'a', assetTypeId: 8, assetTypeName: 'Hat' }, { id: 6, name: 'b', assetTypeId: 8, assetTypeName: 'Hat' }], allowStale: true });
  assert.equal(v[5].provenance, 'cached');
  assert.equal(v[5].rec.price, 10);
  assert.equal(v[6].provenance, 'unknown');
  assert.equal(calls, 0);
});

test('Roblox error text is kept and "user does not exist" becomes not-found, not a v1 fallback', async () => {
  let calls = 0;
  globalThis.fetch = (async () => { calls++; return json(400, { errors: [{ code: 1, message: 'The specified user does not exist.' }] }); }) as any;
  await assert.rejects(rbx.listOutfits(24), (e: any) => e.kind === 'not-found' && /does not exist/.test(e.detail) && e.code === 1);
  assert.equal(calls, 1);
});

test('403 keeps Roblox’s reason and is never retried through the older endpoint', async () => {
  const urls: string[] = [];
  globalThis.fetch = (async (u: string) => { urls.push(u); return json(403, { errors: [{ code: 4, message: 'Insufficient permissions' }] }); }) as any;
  await assert.rejects(rbx.listOutfits(9), (e: any) => e.kind === 'forbidden' && e.detail === 'Insufficient permissions');
  assert.ok(urls.every((u) => u.includes('/v2/')), 'privacy must not be re-asked via v1');
});

test('empty cached lists are not trusted as fresh (privacy and sign-in can change)', async () => {
  const h = handlers();
  await db.clear('outfits'); await db.clear('users');
  let calls = 0;
  globalThis.fetch = (async () => { calls++; return json(200, { data: [], paginationToken: '' }); }) as any;
  await h['outfits.sync']({ userId: 4242 });
  await h['outfits.sync']({ userId: 4242 });
  assert.ok(calls >= 2, 'second sync must hit Roblox again');
});
