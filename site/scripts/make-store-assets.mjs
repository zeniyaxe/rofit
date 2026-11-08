// Generates Chrome Web Store listing images from the site's own demo (sample data only).
//   needs `npm run build` done and a preview server on :4321   ->   site/store/*.png
// Screenshots: 1280x800 x5. Small promo 440x280, marquee 1400x560. Always check them by eye before uploading.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const out = resolve(import.meta.dirname, '../store');
mkdirSync(out, { recursive: true });
const BASE = process.env.SITE ?? 'http://localhost:4321';
const b = await chromium.launch();

async function demoPage(w, h) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.evaluate(() => { const s = document.createElement('style'); s.textContent = 'nav,.nav,.controls,.head,.real,.dnote,footer,.foot,.skip{display:none!important}main>*:not(#demo){display:none!important}#demo{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}.browser{border-radius:0!important;box-shadow:none!important}.bar{display:none!important}.view{height:100vh!important}'; document.head.append(s); document.documentElement.dataset.motion = 'reduced'; });
  await p.evaluate(() => document.getElementById('demo').scrollIntoView());
  await p.waitForSelector('#demo .view.ready', { timeout: 10000 });
  await p.waitForTimeout(1200);
  return p;
}
const cards = (p) => p.locator('#demo-host .rf-card');

// 1 grid, 2 inspector, 3 compare, 4 dark, 5 private
let p = await demoPage(1280, 800);
await p.screenshot({ path: `${out}/screenshot-1-browse.png` });
await cards(p).nth(3).click(); await p.waitForTimeout(1400);
await p.screenshot({ path: `${out}/screenshot-2-inspect.png` });
await cards(p).nth(4).click({ modifiers: ['Shift'] }); await cards(p).nth(5).click({ modifiers: ['Shift'] }); await p.waitForTimeout(500);
await p.locator('#demo-host button:has-text("Compare")').first().click(); await p.waitForTimeout(1500);
await p.screenshot({ path: `${out}/screenshot-3-compare.png` });
await p.close();

// Dark + private use the visible controls, so show them for this pass.
for (const [file, sel] of [['screenshot-4-dark.png', '#demo-theme'], ['screenshot-5-private.png', '[data-user="9003"]']]) {
  const q = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await q.goto(BASE + '/', { waitUntil: 'load' });
  await q.evaluate(() => { document.documentElement.dataset.motion = 'reduced'; document.getElementById('demo').scrollIntoView(); });
  await q.waitForSelector('#demo .view.ready', { timeout: 10000 });
  await q.click(sel); await q.waitForTimeout(1500);
  await q.addStyleTag({ content: 'nav,.nav,.head,.real,.dnote,footer,.skip{display:none!important}main>*:not(#demo){display:none!important}#demo{margin:0!important;padding:0 24px!important;width:100%!important;max-width:none!important}.browser{border-radius:12px!important}.view{height:calc(100vh - 150px)!important}' });
  await q.waitForTimeout(600);
  await q.screenshot({ path: `${out}/${file}` });
  await q.close();
}

// Promo tiles: the same curtain-and-rail art as the OG image, at store sizes.
for (const [file, w, h, big] of [['promo-small-440x280.png', 440, 280, false], ['promo-marquee-1400x560.png', 1400, 560, true]]) {
  const q = await b.newPage({ viewport: { width: w, height: h } });
  await q.setContent(`<body style="margin:0;width:${w}px;height:${h}px;background:#2a4bff;overflow:hidden"><img id="i" src="${BASE}/og.png" style="width:100%;height:100%;object-fit:cover;object-position:${big ? 'center' : '15% center'}"></body>`, { waitUntil: 'domcontentloaded' });
  await q.waitForFunction(() => document.getElementById('i').complete);
  await q.screenshot({ path: `${out}/${file}` });
  await q.close();
}
await b.close();
console.log('wrote', out);
