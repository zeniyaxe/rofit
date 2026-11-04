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

const fullEntry = (key = '1:5') => {
  const [userId, outfitId] = key.split(':').map(Number);
  return {
    key, userId, userName: 'u', outfitId, name: 'Fit', savedAt: 1, tags: ['x'], note: 'mine', collection: 'C', assets: {},
    details: { id: outfitId, name: 'Fit', assets: [{ id: 9, name: 'Hat', assetTypeId: 8, assetTypeName: 'Hat' }], bodyColors: { head: 'FFFFFF', torso: 'FFFFFF', rightArm: 'FFFFFF', leftArm: 'FFFFFF', rightLeg: 'FFFFFF', leftLeg: 'FFFFFF' },
      scale: { height: 1, width: 1, head: 1, depth: 1, proportion: 0, bodyType: 0 }, avatarType: 'R15', outfitType: 'Avatar', fetchedAt: 1 },
  };
};

test('import rejects foreign files and export/import round-trips the library', async () => {
  const h = handlers();
  await db.clear('library');
  await assert.rejects(h['data.import']({ data: { hello: 1 } }), (e: any) => /isn’t a RoFit backup/.test(e.message));
  const dry = await h['data.import']({ data: { hello: 1 }, dryRun: true });
  assert.equal(dry.kind, 'unknown');
  await db.put('library', fullEntry());
  const out = await h['data.export']({});
  await db.clear('library');
  const first = await h['data.import']({ data: out });
  assert.equal(first.kind, 'backup');
  assert.equal(first.add, 1);
  assert.equal((await db.get('library', '1:5') as any).note, 'mine');
  const again = await h['data.import']({ data: JSON.stringify(out) });
  assert.equal(again.add, 0);
  assert.equal(again.existing, 1);
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

test('outfit details: v3 and v4 shapes normalize to the same record; junk is rejected', () => {
  const asset = { id: 11, name: 'Hat', assetType: { id: 8, name: 'Hat' } };
  const v3 = rbx.parseDetails({ id: 5, name: 'Fit', assets: [asset, { name: 'no id' }], bodyColor3s: { headColor3: 'f8f8f8', torsoColor3: '0D69AC', rightArmColor3: 'zz', leftArmColor3: 'F8F8F8', rightLegColor3: 'F8F8F8', leftLegColor3: 'F8F8F8' }, scale: { height: 1.05 }, playerAvatarType: 'R6' }, 5);
  const v4 = rbx.parseDetails({ outfitModel: { id: '5', name: 'Fit', assets: [asset], bodyColors: { headColor: 'F8F8F8', torsoColor: '0d69ac', rightArmColor: 'zz', leftArmColor: 'F8F8F8', rightLegColor: 'F8F8F8', leftLegColor: 'F8F8F8' }, scale: { height: 1.05 }, playerAvatarType: 'R6' } }, 5);
  for (const d of [v3, v4]) {
    assert.equal(d.id, 5);
    assert.deepEqual(d.assets, [{ id: 11, name: 'Hat', assetTypeId: 8, assetTypeName: 'Hat' }]);
    assert.equal(d.bodyColors.head, 'F8F8F8');
    assert.equal(d.bodyColors.torso, '0D69AC');
    assert.equal(d.bodyColors.rightArm, 'A3A2A5', 'invalid colors fall back to Roblox’s default grey');
    assert.equal(d.scale.height, 1.05);
    assert.equal(d.scale.width, 1);
    assert.equal(d.avatarType, 'R6');
  }
  assert.throws(() => rbx.parseDetails({ id: 5 }, 5), (e: any) => e.kind === 'bad-response');
  assert.throws(() => rbx.parseDetails(null, 5), (e: any) => e.kind === 'bad-response');
});

test('outfit details fall back to v4 when v3 answers with something unexpected', async () => {
  const urls: string[] = [];
  globalThis.fetch = (async (u: string) => {
    urls.push(u);
    return u.includes('/v3/') ? json(200, { weird: true }) : json(200, { outfitModel: { id: 8, name: 'From v4', assets: [], bodyColors: {}, scale: {} } });
  }) as any;
  const d = await rbx.outfitDetails(8);
  assert.equal(d.name, 'From v4');
  assert.deepEqual(urls.map((u) => (u.includes('/v3/') ? 'v3' : 'v4')), ['v3', 'v4']);
});

test('after Roblox refuses a list, cached copies stay hidden until it shows the list again', async () => {
  const h = handlers();
  let phase: 'ok' | 'forbidden' = 'ok';
  globalThis.fetch = (async (u: string) => {
    if (u.includes('/users/authenticated')) return json(401, {});
    if (u.includes('/outfits')) {
      return phase === 'ok'
        ? json(200, { data: [{ id: 1, name: 'a', isEditable: true, outfitType: 'Avatar' }, { id: 2, name: 'b', isEditable: true, outfitType: 'Avatar' }], paginationToken: '' })
        : json(403, { errors: [{ code: 4, message: 'Insufficient permissions' }] });
    }
    return json(200, { data: [] });
  }) as any;
  await h['outfits.sync']({ userId: 5151, userName: 'friend' });
  assert.equal((await h['outfits.cached']({ userId: 5151 })).outfits.length, 2);

  phase = 'forbidden';
  await assert.rejects(h['outfits.sync']({ userId: 5151, force: true }), (e: any) => e.kind === 'forbidden' && e.access?.state === 'restricted');
  const hiddenNow = await h['outfits.cached']({ userId: 5151 });
  assert.equal(hiddenNow.outfits.length, 0, 'earlier copies must not be shown after a refusal');
  assert.equal(hiddenNow.user?.access?.state, 'restricted');

  phase = 'ok';
  const again = await h['outfits.sync']({ userId: 5151 }); // not forced: a remembered refusal is never served from cache
  assert.equal(again.source, 'live');
  assert.deepEqual(again.removed, [], 'no "removed since last visit" noise after a hidden period');
  assert.equal((await h['outfits.cached']({ userId: 5151 })).outfits.length, 2);
});

test('a visit counts as recent even when Roblox fails briefly, and what was known about visibility is kept', async () => {
  const h = handlers();
  let phase: 'ok' | 'offline' = 'ok';
  globalThis.fetch = (async (u: string) => {
    if (phase === 'offline') throw new TypeError('Failed to fetch');
    if (u.includes('/users/authenticated')) return json(401, {});
    if (u.includes('/outfits')) return json(200, { data: [{ id: 1, name: 'a', isEditable: true, outfitType: 'Avatar' }], paginationToken: '' });
    return json(200, { data: [] });
  }) as any;
  await h['outfits.sync']({ userId: 6161, userName: 'steady' });
  const known = (await h['outfits.cached']({ userId: 6161 })).user?.access?.state;

  phase = 'offline';
  await assert.rejects(h['outfits.sync']({ userId: 7171, userName: 'flaky' }), (e: any) => e.kind === 'network');
  await assert.rejects(h['outfits.sync']({ userId: 6161, force: true }), (e: any) => e.kind === 'network');
  const recent = await h['users.recent']({ limit: 10 });
  assert.ok(recent.some((u: any) => u.id === 7171 && u.name === 'flaky'), 'a profile that failed to load is still recently viewed');
  const steady = await h['outfits.cached']({ userId: 6161 });
  assert.equal(steady.user?.access?.state, known, 'a network error is not evidence about visibility');
  assert.equal(steady.user?.name, 'steady');
  assert.equal(steady.outfits.length, 1, 'cached outfits stay visible after a transient failure');
});

test('outfit thumbnails: completed ones are reused, pending ones re-asked, only missing ids requested', async () => {
  const h = handlers();
  await db.clear('thumbs');
  const asked: string[] = [];
  globalThis.fetch = (async (u: string) => {
    const ids = new URL(u).searchParams.get('userOutfitIds')!;
    asked.push(ids);
    return json(200, { data: ids.split(',').map(Number).map((id) => (id === 21 ? { targetId: id, state: 'Completed', imageUrl: `https://tr.rbxcdn.com/${id}/150/150/Avatar/Webp/noFilter` } : { targetId: id, state: 'Pending', imageUrl: null })) });
  }) as any;
  const a = await h['outfits.thumbs']({ ids: [21, 22] });
  assert.equal(a[21].url, 'https://tr.rbxcdn.com/21/150/150/Avatar/Webp/noFilter');
  assert.equal(a[22].url, null);
  await h['outfits.thumbs']({ ids: [21, 22] });
  assert.equal(asked.length, 1, 'a second look within the TTL is answered from cache');
  const row = await db.get<any>('thumbs', 'o:22:150x150');
  await db.put('thumbs', { ...row, at: Date.now() - 60_000 });
  await h['outfits.thumbs']({ ids: [21, 22, 23] });
  assert.deepEqual(asked, ['21,22', '22,23'], 'pending is re-asked after a short wait; completed is not');
});

test('library bulk edits and collection operations', async () => {
  const h = handlers();
  await db.clear('library');
  const entry = (n: number, collection = '') => ({ key: `7:${n}`, userId: 7, userName: 'u', outfitId: n, name: 'Fit ' + n, savedAt: n, tags: [], note: '', collection, details: { id: n, assets: [] }, assets: {} });
  await db.putMany('library', [entry(1), entry(2), entry(3, 'Keep')]);
  const get = async (n: number) => db.get<any>('library', `7:${n}`);

  assert.equal((await h['library.bulk']({ keys: ['7:1', '7:2'], op: 'move', value: '  Summer fits ' })).changed, 2);
  assert.equal((await get(1)).collection, 'Summer fits');
  await h['library.bulk']({ keys: ['7:1', '7:2'], op: 'tag', value: ' red ' });
  await h['library.bulk']({ keys: ['7:1'], op: 'tag', value: 'red' });
  assert.deepEqual((await get(1)).tags, ['red'], 'tags are trimmed and never duplicated');
  await h['library.bulk']({ keys: ['7:2'], op: 'untag', value: 'red' });
  assert.deepEqual((await get(2)).tags, []);
  await h['library.bulk']({ keys: ['7:1'], op: 'favorite' });
  assert.equal((await get(1)).favorite, true);
  await h['library.bulk']({ keys: ['7:1'], op: 'unfavorite' });
  assert.ok(!('favorite' in (await get(1))));

  assert.equal((await h['library.collection']({ op: 'rename', name: 'Summer fits', to: 'Beach' })).changed, 2);
  assert.equal((await get(2)).collection, 'Beach');
  await assert.rejects(h['library.collection']({ op: 'rename', name: 'Beach', to: '   ' }), (e: any) => /needs a name/.test(e.message));
  await h['library.collection']({ op: 'delete', name: 'Beach' });
  assert.equal((await get(1)).collection, '', 'deleting a collection un-files its outfits by default');
  await h['library.collection']({ op: 'delete', name: 'Keep', removeEntries: true });
  assert.equal(await get(3), undefined);
  assert.equal(await db.count('library'), 2, 'only that collection’s outfits are removed');
});
