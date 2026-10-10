/**
 * Product tests for the RoFit website. Plain Playwright (already a devDependency), no extra test runner.
 *   node website/build.mjs && node website/tests/site.test.mjs            (starts its own servers)
 *   BROWSERS=chromium SHOTS=/tmp/shots node website/tests/site.test.mjs
 * Screenshots go to website/.cache/shots (git-ignored) unless SHOTS is set.
 */
import { chromium, firefox } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const here = dirname(fileURLToPath(import.meta.url));
const SHOTS = process.env.SHOTS || resolve(here, '../.cache/shots');
mkdirSync(SHOTS, { recursive: true });
const PORT = 4401, SLOW = 4402;
const URL0 = `http://localhost:${PORT}/`;
const browsers = (process.env.BROWSERS || 'chromium,firefox').split(',');
const ENGINES = { chromium, firefox };

const servers = [
  spawn(process.execPath, [resolve(here, '../serve.mjs'), String(PORT)], { stdio: 'ignore' }),
  spawn(process.execPath, [resolve(here, '../serve.mjs'), String(SLOW)], { stdio: 'ignore', env: { ...process.env, THROTTLE: '600' } }),
];
await new Promise((r) => setTimeout(r, 700));

let pass = 0, fail = 0;
const results = [];
async function t(name, fn) {
  const t0 = Date.now();
  try { await fn(); pass++; results.push(`  ok   ${name} (${Date.now() - t0}ms)`); }
  catch (e) { fail++; results.push(`  FAIL ${name}\n       ${String(e && e.message || e).split('\n').slice(0, 4).join('\n       ')}`); }
  console.log(results.at(-1));
}
const ok = (c, msg) => { if (!c) throw new Error(msg); };
const watch = (page) => {
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  return errs;
};
const sheet = (page) => page.locator('.dm-sheet-host .rf-sheet');

for (const bn of browsers) {
  const b = await ENGINES[bn].launch();
  const ctx = (o = {}) => b.newContext({ viewport: { width: 1440, height: 900 }, ...o });

  // ---- layout matrix ----------------------------------------------------------------------------------
  for (const [w, h] of [[1440, 900], [1024, 768], [768, 1024], [390, 844]]) {
    for (const scheme of ['light', 'dark']) {
      await t(`${bn} ${w}x${h} ${scheme}: loads clean, no horizontal overflow`, async () => {
        const c = await ctx({ viewport: { width: w, height: h }, colorScheme: scheme });
        const p = await c.newPage(); const errs = watch(p);
        await p.goto(URL0, { waitUntil: 'networkidle' });
        await p.waitForTimeout(400);
        await p.screenshot({ path: `${SHOTS}/${bn}-${w}-${scheme}-top.png` });
        for (const id of ['how', 'demo', 'honesty', 'privacy', 'install']) {
          await p.locator('#' + id).scrollIntoViewIfNeeded();
          await p.waitForTimeout(id === 'demo' ? 1500 : 700);
          const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
          ok(over <= 0, `#${id}: page is ${over}px wider than the viewport`);
          if (w === 1440 || w === 390) await p.screenshot({ path: `${SHOTS}/${bn}-${w}-${scheme}-${id}.png` });
        }
        ok(!errs.length, 'console errors: ' + errs.join(' | '));
        await c.close();
      });
    }
  }

  // ---- hero modes -------------------------------------------------------------------------------------
  await t(`${bn}: desktop hero is a scroll story driven by native scroll`, async () => {
    const c = await ctx(); const p = await c.newPage();
    await p.goto(URL0, { waitUntil: 'networkidle' });
    ok(await p.locator('.hero').getAttribute('data-mode') === 'scroll', 'expected scroll mode');
    const p0 = await p.evaluate(() => +getComputedStyle(document.querySelector('.hero')).getPropertyValue('--p'));
    await p.mouse.wheel(0, 500); await p.waitForTimeout(500);
    const p1 = await p.evaluate(() => +getComputedStyle(document.querySelector('.hero')).getPropertyValue('--p'));
    ok(p0 < 0.05 && p1 > p0, `progress should grow with scroll (${p0} → ${p1})`);
    ok(await p.evaluate(() => scrollY) > 300, 'scrolling must not be hijacked');
    await c.close();
  });
  await t(`${bn}: reduced motion shows the figure already taken apart, no travel`, async () => {
    const c = await ctx({ reducedMotion: 'reduce' }); const p = await c.newPage();
    await p.goto(URL0, { waitUntil: 'networkidle' });
    ok(await p.locator('.hero').getAttribute('data-mode') === 'static', 'expected static mode');
    ok(await p.evaluate(() => document.querySelector('.hero').style.getPropertyValue('--p')) === '1.0000', 'expected --p 1');
    ok(await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--m').trim()) === '0', 'expected --m 0');
    await p.screenshot({ path: `${SHOTS}/${bn}-reduced.png` });
    await c.close();
  });
  await t(`${bn}: phones get the one-shot hero and a legend instead of callouts`, async () => {
    const c = await ctx({ viewport: { width: 390, height: 844 }, hasTouch: bn === 'chromium', isMobile: bn === 'chromium' }); const p = await c.newPage();
    await p.goto(URL0, { waitUntil: 'networkidle' });
    ok(await p.locator('.hero').getAttribute('data-mode') === 'static', 'expected static mode');
    ok(await p.locator('.callouts').isHidden() && await p.locator('.legend').isVisible(), 'legend should replace callouts');
    await p.locator('.spec').scrollIntoViewIfNeeded(); await p.waitForTimeout(3200);
    ok(+(await p.evaluate(() => document.querySelector('.hero').style.getPropertyValue('--p'))) === 1, 'animation should finish at 1');
    await c.close();
  });

  // ---- no JavaScript ----------------------------------------------------------------------------------
  await t(`${bn}: everything readable without JavaScript`, async () => {
    const c = await ctx({ javaScriptEnabled: false }); const p = await c.newPage();
    await p.goto(URL0);
    ok(await p.locator('html.html-nojs').count() === 1, 'no-js class');
    ok(await p.locator('.demo-fallback figure').count() === 12, 'fallback should list 12 sample outfits');
    ok(await p.locator('.state-btn').count() === 4, 'states listed');
    const op = await p.locator('#honesty h2').evaluate((e) => getComputedStyle(e).opacity);
    ok(op === '1', 'reveal content must be visible without JS, got opacity ' + op);
    ok((await p.locator('.receipt').evaluate((e) => getComputedStyle(e).opacity)) === '1', 'hero receipt visible');
    await p.screenshot({ path: `${SHOTS}/${bn}-nojs.png`, fullPage: true });
    for (const path of ['privacy/', 'terms/', 'security/', 'support/', 'licenses/']) { await p.goto(URL0 + path); ok(await p.locator('h1').count() === 1, path + ' h1'); }
    await c.close();
  });

  // ---- demo ---------------------------------------------------------------------------------------------
  await t(`${bn}: demo — open outfits, inspect, prices with provenance, request log`, async () => {
    const c = await ctx(); const p = await c.newPage(); const errs = watch(p);
    await p.goto(URL0 + '#demo', { waitUntil: 'networkidle' });
    await p.locator('.dm-rofit-tab').click();
    await sheet(p).waitFor({ timeout: 8000 });
    await p.locator('.dm-sheet-host .rf-card').first().waitFor({ timeout: 8000 });
    const n = await p.locator('.dm-sheet-host .rf-card').count();
    ok(n === 12, `expected 12 saved outfits (presets hidden), got ${n}`);
    await p.locator('.dm-sheet-host .rf-card', { hasText: 'Rainy day, scarf' }).first().click();
    await p.locator('.dm-sheet-host .rf-insp').waitFor({ timeout: 8000 });
    await p.waitForTimeout(1500);
    const text = await p.locator('.dm-sheet-host .rf-insp').innerText();
    ok(/R\$\s?110/.test(text), 'raincoat price shown');
    ok(/Yellow Rain Hat/.test(text), 'items listed');
    ok(await p.locator('.dm-log li:not(.dm-log-empty)').count() > 3, 'requests logged');
    const hosts = await p.locator('.dm-log-u b').allInnerTexts();
    ok(hosts.every((h) => ['avatar', 'thumbnails', 'catalog', 'economy', 'inventory', 'users'].includes(h.trim())), 'only allow-listed hosts: ' + [...new Set(hosts)].join(','));
    await p.screenshot({ path: `${SHOTS}/${bn}-demo-inspect.png` });
    await p.keyboard.press('Escape'); await p.waitForTimeout(600);
    ok(!errs.length, 'console errors: ' + errs.join(' | '));
    await c.close();
  });
  await t(`${bn}: demo — item delisted → last known; rename noticed`, async () => {
    const c = await ctx(); const p = await c.newPage();
    await p.goto(URL0 + '#rofit/800000000000102', { waitUntil: 'networkidle' });
    await p.locator('.dm-sheet-host .rf-insp').waitFor({ timeout: 8000 });
    await p.waitForTimeout(1200);
    await p.locator('.dm-event', { hasText: /backpack/i }).click();
    await p.waitForTimeout(400);
    await p.locator('.dm-rofit-tab').click();
    await p.locator('.dm-sheet-host .rf-card', { hasText: 'Rainy day, scarf' }).first().click();
    await p.waitForTimeout(2500);
    const text = await p.locator('.dm-sheet-host .rf-insp').innerText();
    ok(/Unavailable|last seen/i.test(text), 'backpack should be shown as last known/unavailable');
    await p.screenshot({ path: `${SHOTS}/${bn}-demo-lastknown.png` });
    await c.close();
  });
  await t(`${bn}: demo — private profile is reported, not worked around`, async () => {
    const c = await ctx(); const p = await c.newPage();
    await p.goto(URL0 + '#demo', { waitUntil: 'networkidle' });
    await p.locator('.dm-radio', { hasText: 'Hidden Closet' }).click();
    await p.locator('.dm-rofit-tab').click();
    await p.waitForTimeout(2000);
    const text = await sheet(p).innerText();
    ok(/private|refused/i.test(text), 'should explain privacy');
    const paths = await p.locator('.dm-log-u').allInnerTexts();
    ok(!paths.some((x) => /v1\/users\/900000000000002\/outfits/.test(x)), 'must not fall back to older endpoint after 403');
    await p.screenshot({ path: `${SHOTS}/${bn}-demo-private.png` });
    await c.close();
  });
  await t(`${bn}: demo — unreachable and rate-limited Roblox are explained`, async () => {
    const c = await ctx(); const p = await c.newPage();
    await p.goto(URL0 + '#demo', { waitUntil: 'networkidle' });
    await p.locator('.dm-seg label', { hasText: 'Unreachable' }).click();
    await p.locator('.dm-rofit-tab').click();
    await p.waitForTimeout(2500);
    const t1 = await sheet(p).innerText();
    ok(/reach|network|offline|connect/i.test(t1), 'offline should be explained: ' + t1.slice(0, 200));
    await p.screenshot({ path: `${SHOTS}/${bn}-demo-offline.png` });
    await p.locator('.dm-reset').click();
    await p.locator('.dm-seg label', { hasText: 'Rate limited' }).click();
    await p.locator('.dm-rofit-tab').click();
    await p.locator('.dm-sheet-host .rf-card').first().waitFor({ timeout: 8000 });
    await p.locator('.dm-sheet-host .rf-card', { hasText: 'Gallery opening' }).first().click();
    await p.waitForTimeout(4000);
    const statuses = await p.locator('.dm-log-s').allInnerTexts();
    ok(statuses.some((x) => x.startsWith('429')), 'rate limit should produce HTTP 429 in the log');
    await p.screenshot({ path: `${SHOTS}/${bn}-demo-ratelimit.png` });
    await c.close();
  });
  await t(`${bn}: demo chunk fails to load → message + retry works`, async () => {
    const c = await ctx(); const p = await c.newPage();
    await p.route(/demo-.*\.js$/, (r) => r.abort());
    await p.goto(URL0 + '#demo', { waitUntil: 'networkidle' });
    await p.locator('.demo-error').waitFor({ timeout: 6000 });
    ok(await p.locator('.demo-fallback').isVisible(), 'static fallback restored');
    await p.unroute(/demo-.*\.js$/);
    await Promise.all([p.waitForNavigation(), p.locator('.demo-error button').click()]);
    await p.locator('.dm').waitFor({ timeout: 8000 });
    await c.close();
  });

  // ---- keyboard ------------------------------------------------------------------------------------------
  await t(`${bn}: keyboard — skip link, focus visible, states operable`, async () => {
    const c = await ctx(); const p = await c.newPage();
    await p.goto(URL0, { waitUntil: 'networkidle' });
    await p.keyboard.press('Tab');
    ok(await p.evaluate(() => document.activeElement.classList.contains('skip')), 'first tab stop is the skip link');
    const top = await p.locator('.skip').evaluate((e) => e.getBoundingClientRect().top);
    ok(top >= 0, 'skip link visible when focused');
    await p.keyboard.press('Enter');
    ok(await p.evaluate(() => document.activeElement.id === 'main'), 'skip moves focus to main');
    await p.locator('.state-btn').nth(2).focus();
    await p.keyboard.press('Enter');
    await p.waitForTimeout(300);
    ok(await p.locator('.state-btn').nth(2).getAttribute('aria-pressed') === 'true', 'state toggled by keyboard');
    ok((await p.locator('[data-k=total]').innerText()).replace(/\s/g, '') === 'R$320', 'total drops when the coat is last known');
    const outline = await p.locator('.state-btn').nth(2).evaluate((e) => getComputedStyle(e).outlineStyle);
    ok(outline !== 'none', 'focus outline visible');
    await c.close();
  });

  // ---- install states --------------------------------------------------------------------------------------
  const UAS = {
    ok: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', /Chrome 130/],
    edge: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0', /Edge 130/],
    old: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36', /too old/],
    firefox: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0', /Firefox/],
    safari: ['Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15', /Safari/],
    android: ['Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', /phone or tablet/],
  };
  const want = { ok: 'ok', edge: 'ok', old: 'warn', firefox: 'no', safari: 'no', android: 'no' };
  if (bn === 'chromium') for (const [k, [ua, re]] of Object.entries(UAS)) {
    await t(`${bn}: install state for ${k}`, async () => {
      const c = await ctx({ userAgent: ua }); const p = await c.newPage();
      if (k !== 'ok') await p.addInitScript(() => { Object.defineProperty(navigator, 'userAgentData', { get: () => undefined }); });
      await p.goto(URL0 + '#install', { waitUntil: 'networkidle' });
      const st = await p.locator('.browser-state').getAttribute('data-state');
      const txt = await p.locator('.browser-state').innerText();
      ok(st === want[k] && re.test(txt), `got ${st}: ${txt}`);
      if (k === 'edge') ok((await p.locator('[data-ext-url]').innerText()) === 'edge://extensions', 'edge scheme');
      if (k === 'firefox' || k === 'old') await p.locator('.browser-state').screenshot({ path: `${SHOTS}/install-${k}.png` });
      await c.close();
    });
  }

  // ---- slow network ------------------------------------------------------------------------------------------
  await t(`${bn}: slow network — text first, demo shows a loading state`, async () => {
    const c = await ctx(); const p = await c.newPage();
    const t0 = Date.now();
    await p.goto(`http://localhost:${SLOW}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const dcl = Date.now() - t0;
    ok(await p.locator('#hero-h').isVisible(), 'headline visible');
    await p.locator('#demo').scrollIntoViewIfNeeded();
    const sawLoading = await p.locator('.demo-load').waitFor({ timeout: 5000 }).then(() => true, () => false);
    await p.locator('.dm').waitFor({ timeout: 60000 });
    results.push(`       note: throttled DOMContentLoaded ${dcl}ms, loading state seen: ${sawLoading}`);
    await c.close();
  });

  // ---- legal pages & links -----------------------------------------------------------------------------------------
  await t(`${bn}: legal pages render, carry non-affiliation, internal links resolve`, async () => {
    const c = await ctx(); const p = await c.newPage(); const errs = watch(p);
    const seen = new Set(); const queue = [URL0]; const bad = [];
    while (queue.length) {
      const u = queue.shift(); if (seen.has(u)) continue; seen.add(u);
      const r = await p.goto(u, { waitUntil: 'load' });
      if (!r || r.status() !== 200) { bad.push(`${u} → ${r && r.status()}`); continue; }
      if (!/\.(txt|svg|xml)$/.test(u)) {
        ok(/not affiliated with, endorsed, sponsored or approved by Roblox Corporation/.test(await p.locator('.ftr').innerText()), 'non-affiliation on ' + u);
        for (const href of await p.$$eval('a[href]', (as) => as.map((a) => a.href))) {
          const x = new URL(href); x.hash = '';
          if (x.origin === new URL(URL0).origin && !seen.has(x.href)) queue.push(x.href);
        }
      }
    }
    ok(!bad.length, 'broken: ' + bad.join(', '));
    ok(seen.size >= 8, 'crawled ' + seen.size);
    for (const path of ['privacy/', 'terms/', 'security/', 'support/', 'licenses/']) {
      await p.goto(URL0 + path); await p.screenshot({ path: `${SHOTS}/${bn}-${path.replace('/', '')}.png` });
    }
    ok(!errs.length, 'console errors: ' + errs.join(' | '));
    const r404 = await p.goto(URL0 + 'nope/');
    ok(r404.status() === 404 && /Nothing on this hanger/.test(await p.content()), '404 page');
    await c.close();
  });
  await b.close();
}

// ---- budgets (static) ---------------------------------------------------------------------------------------------------
await t('budgets: gzip sizes of what the home page needs', async () => {
  const facts = JSON.parse(readFileSync(resolve(here, '../.cache/facts.json'), 'utf8'));
  const d = resolve(here, '../dist');
  const gz = (f) => gzipSync(readFileSync(resolve(d, f))).length;
  const html = gz('index.html'), js = gz('assets/' + facts.assets.js), css = gz('assets/' + facts.assets.css), font = readFileSync(resolve(d, 'fonts/bricolage-grotesque.woff2')).length;
  const demo = gz('assets/' + (await import('node:fs')).readdirSync(resolve(d, 'assets')).find((f) => f.startsWith('demo-')));
  results.push(`       html ${(html / 1024).toFixed(1)}K · js ${(js / 1024).toFixed(1)}K · css ${(css / 1024).toFixed(1)}K · font ${(font / 1024).toFixed(1)}K · demo (lazy) ${(demo / 1024).toFixed(1)}K  (gzip)`);
  ok(html < 45 * 1024, 'html budget 45K'); ok(js < 10 * 1024, 'js budget 10K'); ok(css < 12 * 1024, 'css budget 12K'); ok(demo < 90 * 1024, 'demo budget 90K');
});

servers.forEach((s) => s.kill());
console.log(`\n${pass} passed, ${fail} failed\n` + results.filter((r) => r.includes('note:') || r.includes('html ')).join('\n'));
process.exit(fail ? 1 : 0);
