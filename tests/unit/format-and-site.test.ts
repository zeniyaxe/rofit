import test from 'node:test';
import assert from 'node:assert/strict';
import { costLabel, errorText, plural, profileOutfits, timeAgo } from '../../src/ui/format.ts';
import type { OutfitCost } from '../../src/shared/analysis.ts';
import { markdown, inline, slug } from '../../site/src/markdown.mjs';

const cost = (c: Partial<OutfitCost>): OutfitCost => ({ buyNow: 0, resale: 0, free: 0, offsale: 0, unknown: 0, limiteds: 0, known: 0, total: 0, ...c });

test('costLabel states only what the prices prove', () => {
  assert.equal(costLabel(cost({ free: 3, known: 3, total: 3 })), 'Free');
  assert.equal(costLabel(cost({ buyNow: 1250, known: 2, total: 2 })), 'R$ 1,250');
  assert.equal(costLabel(cost({ buyNow: 100, resale: 900, known: 2, total: 2, limiteds: 1 })), 'R$ 1,000');
  // a sum with off-sale or unknown items is a lower bound
  assert.equal(costLabel(cost({ buyNow: 120, offsale: 1, known: 2, total: 2 })), 'R$ 120+');
  assert.equal(costLabel(cost({ buyNow: 120, unknown: 1, known: 1, total: 2 })), 'R$ 120+');
  // …and a lower bound of zero says nothing: never "R$ 0+"
  assert.equal(costLabel(cost({ offsale: 2, known: 2, total: 2 })), 'Off sale');
  assert.equal(costLabel(cost({ unknown: 2, total: 2 })), null);
  assert.equal(costLabel(cost({ free: 1, unknown: 1, known: 1, total: 2 })), null);
});

test('error copy is specific, and unknown errors still read as sentences', () => {
  assert.match(errorText({ kind: 'rate-limited', retryAfter: 7 }).body, /Wait 7s/);
  assert.match(errorText({ kind: 'rate-limited' }).title, /rate limiting/);
  for (const kind of ['network', 'timeout', 'server', 'forbidden', 'not-found', 'unauthenticated', 'bad-response', 'something-new']) {
    const t = errorText({ kind });
    assert.ok(t.title.length > 3 && t.body.length > 3, kind);
    assert.doesNotMatch(t.title + t.body, /undefined|\[object/);
  }
});

test('plural and timeAgo', () => {
  assert.equal(plural(1, 'outfit'), '1 outfit');
  assert.equal(plural(1200, 'outfit'), '1,200 outfits');
  assert.equal(plural(2, 'category', 'categories'), '2 categories');
  const now = Date.UTC(2026, 0, 10);
  assert.equal(timeAgo(now - 10_000, now), 'just now');
  assert.equal(timeAgo(now - 5 * 60_000, now), '5m ago');
  assert.equal(timeAgo(now - 3 * 3600_000, now), '3h ago');
  assert.equal(timeAgo(now - 2 * 86400_000, now), '2d ago');
  assert.equal(timeAgo(now + 60_000, now), 'just now', 'clock skew never shows negative time');
});

test('remembered profiles never present an empty answer as “0 outfits”', () => {
  assert.equal(profileOutfits({ outfitCount: 5 }), '5 outfits');
  assert.equal(profileOutfits({ outfitCount: 1, access: { state: 'public' } }), '1 outfit');
  assert.equal(profileOutfits({ outfitCount: 0 }), 'No outfits shown');
  assert.equal(profileOutfits({ outfitCount: 3, access: { state: 'restricted' } }), 'Outfits private');
  assert.equal(profileOutfits({ access: { state: 'unavailable' } }), 'Unavailable');
  assert.equal(profileOutfits({}), 'Profile');
});

test('site markdown escapes everything and only links to safe places', () => {
  const html = markdown('# Title\n\n## 2.0.0 <b>new</b>\n\n- <img src=x onerror=alert(1)> **bold** `<code>`\n- [docs](/docs/#share) [gh](https://github.com/zeniyaxe/rofit) [top](#install)\n');
  assert.doesNotMatch(html, /<img|<b>|<code><code>/);
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /<code>&lt;code&gt;<\/code>/);
  assert.match(html, /<a href="\/docs\/#share">docs<\/a>/);
  assert.match(html, /<a href="https:\/\/github.com\/zeniyaxe\/rofit">gh<\/a>/);
  assert.match(html, /<a href="#install">top<\/a>/);
  assert.doesNotMatch(html, /<h1/, 'the page supplies its own h1');
  assert.match(html, /<h2 id="[a-z0-9-]+">2\.0\.0 &lt;b&gt;new&lt;\/b&gt;<\/h2>/);
});

test('site markdown drops unsafe link targets but keeps their text', () => {
  for (const href of ['javascript:alert(1)', 'data:text/html,hi', 'http://example.com', '//evil.example/x', '/\\evil.example', 'vbscript:x', 'https://a.example/"onmouseover="x']) {
    const out = inline(`[click](${href})`);
    assert.ok(!out.includes('<a '), `${href} → ${out}`);
    assert.ok(out.includes('click'), href);
  }
  // markup inside code spans stays literal
  assert.equal(inline('`[x](https://a.example) **b**`'), '<code>[x](https://a.example) **b**</code>');
  assert.equal(slug('Install &amp; update <em>now</em>'), 'install-update-now');
});
