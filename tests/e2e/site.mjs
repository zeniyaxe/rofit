/**
 * rofit.site end to end: every page renders without errors or CSP violations, internal links resolve, the share
 * viewer decodes a real link and refuses hostile ones safely, and the extension bridge imports a link into the library.
 * Pages are served at their real origin (https://rofit.site) through Playwright routing, so the extension's
 * site.js content script runs exactly as it would in production.
 *
 *   npm --prefix site run build && node scripts/build.mjs --test && node tests/e2e/site.mjs [shots=1]
 */
import { chromium } from 'playwright';
import { deflateRawSync } from 'node:zlib';
import { existsSync, readFileSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { launch } from './harness.mjs';
import { encodeShare, shareUrl } from '../../src/shared/share.ts';

const DIST = resolve('site/dist');
const shots = process.argv.includes('shots=1');
mkdirSync('shots', { recursive: true });
let failed = 0;
const ok = (name, cond, extra = '') => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`); if (!cond) failed++; };

const headers = Object.fromEntries(readFileSync(join(DIST, '_headers'), 'utf8').split('\n').filter((l) => /^\s+\S+:/.test(l) && !/Cache-Control/.test(l)).map((l) => { const i = l.indexOf(':'); return [l.slice(0, i).trim().toLowerCase(), l.slice(i + 1).trim()]; }));
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json' };
function fileFor(pathname) {
  let f = join(DIST, decodeURIComponent(pathname));
  if (!f.startsWith(DIST)) return null;
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) f = join(DIST, decodeURIComponent(pathname).replace(/\/$/, '') + '.html');
  return existsSync(f) ? f : null;
}
async function serve(ctx) {
  await ctx.route('https://rofit.site/**', (route) => {
    const url = new URL(route.request().url());
    const f = fileFor(url.pathname);
    route.fulfill({ status: f ? 200 : 404, headers: { ...headers, 'content-type': TYPES[extname(f ?? '404.html')] ?? 'application/octet-stream' }, body: readFileSync(f ?? join(DIST, '404.html')) });
  });
}
const watch = (page, bag) => {
  page.on('pageerror', (e) => bag.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') bag.push(m.text()); });
};

// A real outfit when Roblox is reachable (so screenshots show real renders), else a fixture.
async function sampleOutfit() {
  const fixture = {
    user: { id: 156, name: 'builderman' }, outfit: { id: 987654321, name: 'Weekend fit' }, avatarType: 'R15',
    bodyColors: { head: 'F8D95C', torso: '0D69AC', rightArm: 'F8D95C', leftArm: 'F8D95C', rightLeg: 'A3A2A5', leftLeg: 'A3A2A5' },
    scale: { height: 1.05, width: 0.9, head: 1, depth: 1, proportion: 0.25, bodyType: 0.1 },
    items: [{ id: 1028606, name: 'Red Baseball Cap', typeId: 8 }, { id: 144076358, name: 'Blue Hoodie', typeId: 11 }, { id: 144076760, name: 'Dark Jeans', typeId: 12 }, { id: 2510230574, name: 'Mood', typeId: 78 }],
    at: Date.now() - 3 * 86400e3,
  };
  try {
    const j = async (u) => { const r = await fetch(u, { signal: AbortSignal.timeout(8000) }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); };
    const list = await j('https://avatar.roblox.com/v2/avatar/users/156/outfits?outfitType=Avatar&itemsPerPage=50&isEditable=true');
    const o = (list.data ?? []).find((x) => x.isEditable) ?? list.data?.[0];
    const d = await j(`https://avatar.roblox.com/v3/outfits/${o.id}/details`);
    const [ot, at] = await Promise.all([
      j(`https://thumbnails.roblox.com/v1/users/outfits?userOutfitIds=${o.id}&size=420x420&format=Png`),
      j(`https://thumbnails.roblox.com/v1/assets?assetIds=${d.assets.map((a) => a.id).join(',')}&size=150x150&format=Png`),
    ]);
    const thumbs = new Map(at.data.map((t) => [t.targetId, t.imageUrl]));
    const bc = d.bodyColor3s ?? {};
    const hex = (k) => (bc[k + 'Color3'] ?? 'A3A2A5').replace('#', '').toUpperCase();
    return {
      user: { id: 156, name: 'builderman' }, outfit: { id: o.id, name: o.name }, avatarType: d.playerAvatarType === 'R6' ? 'R6' : 'R15',
      bodyColors: { head: hex('head'), torso: hex('torso'), rightArm: hex('rightArm'), leftArm: hex('leftArm'), rightLeg: hex('rightLeg'), leftLeg: hex('leftLeg') },
      scale: { height: d.scale?.height ?? 1, width: d.scale?.width ?? 1, head: d.scale?.head ?? 1, depth: d.scale?.depth ?? 1, proportion: d.scale?.proportion ?? 0, bodyType: d.scale?.bodyType ?? 0 },
      items: d.assets.map((a) => ({ id: a.id, name: a.name, typeId: a.assetType?.id ?? 0, thumb: thumbs.get(a.id) })),
      thumb: ot.data?.[0]?.imageUrl, at: Date.now() - 2 * 3600e3,
    };
  } catch (e) {
    console.log('note: using a fixture outfit (' + e.message + ')');
    return fixture;
  }
}
/** Hand-built payloads that encodeShare() would never produce. */
const raw = (arr) => '1.' + deflateRawSync(Buffer.from(JSON.stringify(arr))).toString('base64url');

const outfit = await sampleOutfit();
const payload = await encodeShare(outfit);
const PAGES = ['/', '/features/', '/download/', '/docs/', '/changelog/', '/privacy/', '/o/', '/no-such-page'];

// ---- 1. pages without the extension ----------------------------------------------------------
{
  const browser = await chromium.launch({ executablePath: process.env.ROFIT_CHROME || undefined, headless: true });
  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, colorScheme: scheme });
    await serve(ctx);
    const page = await ctx.newPage();
    for (const path of scheme === 'light' ? PAGES : ['/', `/o/#${payload}`]) {
      const errs = [];
      watch(page, errs);
      const res = await page.goto('https://rofit.site' + path, { waitUntil: 'load' });
      await page.waitForTimeout(250);
      const info = await page.evaluate(() => ({
        h1: document.querySelector('h1')?.textContent?.trim(),
        links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
        ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      }));
      const label = `${path} (${scheme})`;
      const notFound = path === '/no-such-page';
      const real = errs.filter((e) => !(notFound && /status of 404/.test(e)));
      ok(`${label}: renders with an h1, no errors or CSP violations`, !!info.h1 && real.length === 0 && res.status() === (notFound ? 404 : 200), real.join(' | ') || info.h1);
      if (scheme === 'light') {
        const broken = info.links.filter((h) => h.startsWith('/') && !fileFor(h.split('#')[0]));
        const anchors = info.links.filter((h) => h.startsWith('#') && h.length > 1 && !info.ids.includes(h.slice(1)));
        ok(`${label}: internal links and anchors resolve`, broken.length === 0 && anchors.length === 0, [...broken, ...anchors].join(', '));
        ok(`${label}: no sideways scroll`, !info.overflow);
      }
      page.removeAllListeners('console'); page.removeAllListeners('pageerror');
      if (shots && ['/', '/features/', '/download/', '/docs/'].includes(path)) await page.waitForTimeout(900), await page.screenshot({ path: `shots/site-${scheme}-${path.replace(/\W+/g, '') || 'home'}.png` });
    }
    // Share viewer, real link.
    await page.goto(`https://rofit.site/o/#${payload}`);
    await page.waitForSelector('.v-grid');
    const v = await page.evaluate(() => ({ title: document.querySelector('.v-head h1')?.textContent, items: document.querySelectorAll('.v-item').length, get: !!document.querySelector('.v-actions a[href="/download/"]'), manual: !document.querySelector('.v-help')?.hidden, imgs: [...document.querySelectorAll('img')].map((i) => i.src) }));
    if (scheme === 'light') {
      ok('viewer shows the outfit, its items, and Get RoFit when RoFit is absent', v.title === outfit.outfit.name && v.items === outfit.items.length && v.get && v.manual, JSON.stringify({ ...v, imgs: v.imgs.length }));
      ok('viewer loads images only from tr.rbxcdn.com', v.imgs.every((s) => s.startsWith('https://tr.rbxcdn.com/')));
    }
    if (shots) { await page.waitForTimeout(1200); await page.screenshot({ path: `shots/site-${scheme}-viewer.png`, fullPage: true }); }
    await ctx.close();
  }

  // Hostile and broken links.
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
  await serve(ctx);
  const page = await ctx.newPage();
  const errs = [];
  watch(page, errs);
  let alerted = false;
  page.on('dialog', (d) => { alerted = true; d.dismiss(); });
  const xss = '<img src=x onerror=alert(1)>';
  const evil = await encodeShare({ ...outfit, user: { id: 1, name: '"><script>alert(1)</script>' }, outfit: { id: 2, name: xss }, items: [{ id: 3, name: xss, typeId: 8 }], thumb: undefined });
  await page.goto(`https://rofit.site/o/#${evil}`);
  await page.waitForSelector('.v-grid');
  const r = await page.evaluate(() => ({ h1: document.querySelector('.v-head h1')?.textContent, injected: document.querySelectorAll('#viewer img[src="x"], #viewer script').length }));
  ok('markup in names is shown as text, never parsed', r.h1 === xss && r.injected === 0 && !alerted, JSON.stringify(r));
  const cases = [
    ['not a share link', '#hello<b>', /isn’t a RoFit share link/],
    ['foreign image host', '#' + raw([1, 1, 'a', 2, 'b', 1, 'A3A2A5'.repeat(6), [1, 1, 1, 1, 0, 0], [], '../../evil.example/x.png', 1]), /can’t be opened/],
    ['javascript: smuggled as an item image', '#' + raw([1, 1, 'a', 2, 'b', 1, 'A3A2A5'.repeat(6), [1, 1, 1, 1, 0, 0], [[5, 8, 'x', 'javascript:alert(1)']], 0, 1]), /can’t be opened/],
    ['zip bomb', '#' + raw([1, 1, 'a'.repeat(200000)]), /can’t be opened/],
    ['damaged link', '#1.AAAA____', /can’t be opened/],
  ];
  for (const [name, hash, re] of cases) {
    await page.goto('https://rofit.site/o/' + hash);
    await page.waitForSelector('.v-empty h1');
    const t = await page.locator('.v-empty h1').textContent();
    ok(`viewer refuses: ${name}`, re.test(t) && (await page.locator('.v-item').count()) === 0, t);
  }
  ok('no script errors on hostile links', errs.length === 0 && !alerted, errs.join(' | '));
  await page.goto('https://rofit.site/download/');
  await page.waitForSelector('#detect:not([hidden])', { timeout: 4000 });
  ok('download page says RoFit is not detected without the extension', /isn’t detected/.test(await page.locator('#detect').textContent()));
  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', `/o/#${payload}`, '/docs/']) {
    await page.goto('https://rofit.site' + path);
    await page.waitForTimeout(300);
    ok(`mobile ${path.slice(0, 12)}: no sideways scroll`, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
    if (shots) await page.waitForTimeout(900), await page.screenshot({ path: `shots/site-mobile-${path.replace(/\W+/g, '').slice(0, 8) || 'home'}.png` });
  }
  await page.goto('https://rofit.site/');
  await page.locator('.menu-btn').click();
  ok('mobile menu opens', await page.locator('#nav-links.open').isVisible() && (await page.locator('.menu-btn').getAttribute('aria-expanded')) === 'true');
  await ctx.close();
  await browser.close();
}

// ---- 2. with the extension: detection and the import bridge ------------------------------------
{
  const { ctx, id } = await launch();
  await serve(ctx);
  const page = await ctx.newPage();
  const errs = [];
  watch(page, errs);
  await page.goto('https://rofit.site/download/');
  await page.waitForSelector('#detect:not([hidden])', { timeout: 6000 });
  const detect = await page.locator('#detect').textContent();
  const version = JSON.parse(readFileSync('package.json', 'utf8')).version;
  ok('download page detects the installed version', detect.includes(`RoFit ${version} is installed`) && /up to date/.test(detect), detect);
  ok('site.js marks the page with the version', (await page.evaluate(() => document.documentElement.dataset.rofit)) === version);

  // Not on look-alike origins.
  await ctx.route('https://rofit.site.example.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>x</title><p>x</p>' }));
  const other = await ctx.newPage();
  await other.goto('https://rofit.site.example.com/');
  await other.waitForTimeout(800);
  ok('bridge does not run on look-alike origins', (await other.evaluate(() => document.documentElement.dataset.rofit)) === undefined);
  await other.close();

  await page.goto(`https://rofit.site/o/#${payload}`);
  await page.waitForSelector('.v-actions button:has-text("Save to RoFit")', { timeout: 6000 });
  ok('viewer offers Save to RoFit when RoFit is installed', (await page.locator('.v-actions a[href="/download/"]').count()) === 0 && await page.locator('.v-help').isHidden());

  // Without a click the bridge refuses (a page can't open RoFit by itself). Playwright's evaluate() runs with a user
  // gesture, so the request is made by a timer in an init script on a page nobody has touched.
  {
    const extPages = () => ctx.pages().filter((p) => p.url().startsWith('chrome-extension://')).length;
    const before = extPages();
    const quiet = await ctx.newPage();
    await quiet.addInitScript(() => {
      window.__noClick = 'timeout';
      addEventListener('message', (e) => { if (e.data?.type === 'rofit:import-result') window.__noClick = e.data; });
      setTimeout(() => postMessage({ type: 'rofit:import', payload: location.hash.slice(1) }, location.origin), 1200);
    });
    await quiet.goto(`https://rofit.site/o/#${payload}`);
    await quiet.waitForTimeout(3000);
    const noClick = await quiet.evaluate(() => window.__noClick);
    ok('bridge refuses imports without a user click', noClick?.ok === false && noClick?.reason === 'activation', JSON.stringify(noClick));
    ok('…and opens nothing', extPages() === before);
    await quiet.close();
  }
  const bad = await page.evaluate(() => new Promise((res) => {
    addEventListener('message', (e) => { if (e.data?.type === 'rofit:import-result') res(e.data); });
    postMessage({ type: 'rofit:import', payload: 'javascript:alert(1)' }, location.origin);
    setTimeout(() => res('timeout'), 3000);
  }));
  ok('bridge rejects payloads that are not share links', bad?.ok === false && bad?.reason === 'invalid', JSON.stringify(bad));

  const opened = ctx.waitForEvent('page', { timeout: 10000 });
  await page.locator('.v-actions button:has-text("Save to RoFit")').click();
  const ws = await opened;
  await ws.waitForLoadState();
  ok('Save to RoFit opens RoFit’s import screen', ws.url().startsWith(`chrome-extension://${id}/workspace.html`), ws.url().replace(/#.{40}.*/, '#…'));
  await page.waitForSelector('.v-status.ok', { timeout: 6000 });
  ok('viewer confirms RoFit answered', /import screen/.test(await page.locator('.v-status').textContent()));
  await ws.waitForSelector('.rf-dialog textarea', { timeout: 10000 });
  const pasted = await ws.locator('.rf-dialog textarea').inputValue();
  ok('import dialog is pre-filled with the link', pasted === shareUrl(payload));
  await ws.waitForSelector('.rf-dialog .rf-import-report, .rf-dialog .rf-report', { timeout: 10000 }).catch(() => {});
  if (shots) { await ws.waitForTimeout(700); await ws.screenshot({ path: 'shots/site-bridge-import.png' }); }
  const before = await ws.evaluate(() => new Promise((r) => chrome.runtime.sendMessage({ __rofit: true, type: 'library.list', req: {} }, (x) => r(x?.data?.length ?? -1))));
  await ws.locator('.rf-dialog button:has-text("Import")').last().click();
  await ws.waitForFunction((b) => new Promise((r) => chrome.runtime.sendMessage({ __rofit: true, type: 'library.list', req: {} }, (x) => r((x?.data?.length ?? -1) > b))), before, { timeout: 10000 }).catch(() => {});
  const lib = await ws.evaluate(() => new Promise((r) => chrome.runtime.sendMessage({ __rofit: true, type: 'library.list', req: {} }, (x) => r(x?.data ?? []))));
  const entry = lib.find((e) => e.outfitId === outfit.outfit.id);
  ok('the shared outfit is in the library after confirming, marked as shared', !!entry && entry.source === 'share' && entry.name === outfit.outfit.name, JSON.stringify(entry ? { name: entry.name, source: entry.source } : lib.length));
  ok('no errors on rofit.site with the extension', errs.length === 0, errs.join(' | '));
  await ctx.close();
}

console.log(failed ? `\n${failed} FAILED` : '\nall passed');
process.exit(failed ? 1 : 0);
