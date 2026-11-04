import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeShare, encodeShare, payloadFrom, shareUrl, thumbPath, type SharedOutfit } from '../../src/shared/share.ts';

const sample = (n = 12): SharedOutfit => ({
  user: { id: 156, name: 'builderman' }, outfit: { id: 6505210781156933, name: 'Early 2011 — remake' },
  avatarType: 'R15',
  bodyColors: { head: 'F8D95F', torso: '0D69AC', rightArm: 'F8D95F', leftArm: 'F8D95F', rightLeg: 'A4BD47', leftLeg: 'A4BD47' },
  scale: { height: 1.05, width: 0.9, head: 1, depth: 0.95, proportion: 0.333333, bodyType: 0.25 },
  items: Array.from({ length: n }, (_, i) => ({ id: 1000 + i, name: `Item ${i} with a long-ish name`, typeId: i % 2 ? 8 : 41, thumb: i % 3 ? `https://tr.rbxcdn.com/180DAY-abcdef${i}/150/150/Hat/Webp/noFilter` : undefined })),
  thumb: 'https://tr.rbxcdn.com/30DAY-Avatar-0123456789ABCDEF/420/420/Avatar/Webp/noFilter',
  at: 1_762_000_000_000,
});

test('share links round-trip and stay short', async () => {
  const p = await encodeShare(sample());
  assert.match(p, /^1\.[A-Za-z0-9_-]+$/);
  assert.ok(p.length < 1400, `payload is ${p.length} chars`);
  const back = await decodeShare(p);
  assert.equal(back.outfit.id, 6505210781156933);
  assert.equal(back.outfit.name, 'Early 2011 — remake');
  assert.equal(back.items.length, 12);
  assert.equal(back.items[1].thumb, 'https://tr.rbxcdn.com/180DAY-abcdef1/150/150/Hat/Webp/noFilter');
  assert.equal(back.items[0].thumb, undefined);
  assert.equal(back.scale.proportion, 0.333);
  assert.equal(back.bodyColors.torso, '0D69AC');
  assert.equal(back.at, 1_762_000_000_000);
});

test('only Roblox CDN images survive encoding', async () => {
  assert.equal(thumbPath('https://evil.example/x.png'), undefined);
  assert.equal(thumbPath('https://tr.rbxcdn.com/../x'), undefined);
  const s = sample(2);
  s.thumb = 'https://evil.example/pixel.gif';
  s.items[0].thumb = 'javascript:alert(1)';
  const back = await decodeShare(await encodeShare(s));
  assert.equal(back.thumb, undefined);
  assert.equal(back.items[0].thumb, undefined);
});

test('decoding rejects tampered, foreign and oversized input with a readable reason', async () => {
  await assert.rejects(decodeShare('2.abc'), /newer version|isn’t a RoFit/);
  await assert.rejects(decodeShare('1.$$$'), /characters/);
  await assert.rejects(decodeShare('1.AAAA'), /damaged/);
  await assert.rejects(decodeShare('1.' + 'A'.repeat(30_000)), /too large/);
  // A well-formed deflate stream of something that isn't an outfit.
  const bogus = Buffer.from(JSON.stringify([1, -5, 'x'])).toString('base64url');
  await assert.rejects(decodeShare('1.' + bogus), /damaged|missing/);
});

test('payloadFrom accepts links, fragments and bare payloads only', () => {
  assert.equal(payloadFrom('https://rofit.site/o/#1.abc_-9'), '1.abc_-9');
  assert.equal(payloadFrom(shareUrl('1.xyz')), '1.xyz');
  assert.equal(payloadFrom('#1.abc'), '1.abc');
  assert.equal(payloadFrom('1.abc'), '1.abc');
  assert.equal(payloadFrom('https://evil.example/o/#1.abc'), null);
  assert.equal(payloadFrom('{"app":"rofit-inspector"}'), null);
});

test('deep links are read in RoFit’s form and in the form Roblox’s router rewrites them to', async () => {
  const { parseRoFitHash, isRoFitHash, rofitHash } = await import('../../src/shared/deeplink.ts');
  assert.deepEqual(parseRoFitHash('#rofit/5069603964005866'), { outfit: 5069603964005866 });
  assert.deepEqual(parseRoFitHash('#!#rofit%2F5069603964005866'), { outfit: 5069603964005866 });
  assert.deepEqual(parseRoFitHash('#!/rofit/12'), { outfit: 12 });
  assert.deepEqual(parseRoFitHash('#rofit'), {});
  assert.deepEqual(parseRoFitHash('#!#rofit'), {});
  for (const h of ['', '#', '#!', '#about', '#rofit/abc', '#rofit/1/2', '#rofitx', '#rofit/99999999999999999', '#rofit/0', '#%E0%A4%A']) assert.equal(isRoFitHash(h) && parseRoFitHash(h)?.outfit !== undefined, false, h);
  assert.equal(isRoFitHash('#rofit/0'), true, 'an id of 0 still means "open RoFit", just no outfit');
  assert.equal(rofitHash(7), 'rofit/7');
});
