// Quick visual capture: node website/tests/shoot.mjs <url> <out-prefix> [width] [height] [scheme] [reduced] [scrollY...]
import { chromium } from 'playwright';
const [url, out, w = 1440, h = 900, scheme = 'light', reduced = 'no', ...ys] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, colorScheme: scheme, reducedMotion: reduced === 'yes' ? 'reduce' : 'no-preference' });
const errs = [];
p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
for (const y of ys.length ? ys : ['0']) {
  if (y === 'full') { await p.screenshot({ path: `${out}-full.png`, fullPage: true }); continue; }
  if (y.startsWith('#')) { await p.locator(y).scrollIntoViewIfNeeded(); await p.waitForTimeout(1500); await p.screenshot({ path: `${out}-${y.slice(1)}.png` }); continue; }
  await p.evaluate((yy) => window.scrollTo(0, yy), +y); await p.waitForTimeout(+(process.env.WAIT || 900));
  await p.screenshot({ path: `${out}-${y}.png` });
}
console.log(errs.length ? errs.join('\n') : 'no console errors');
await b.close();
