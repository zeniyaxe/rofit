// node tests/e2e/modes.mjs -> shots/mode-{nojs,calm}-{d,m}.png (full page): checks static fallbacks
import { chromium } from 'playwright';
const b = await chromium.launch();
for (const [name, opts] of [['nojs', { javaScriptEnabled: false }], ['calm', { reducedMotion: 'reduce' }]]) {
  for (const [vp, w, h] of [['d', 1440, 900], ['m', 390, 844]]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, ...opts });
    const p = await c.newPage();
    await p.goto('http://localhost:4321/', { waitUntil: 'load' });
    await p.waitForTimeout(1500);
    const hgt = await p.evaluate(() => document.documentElement.scrollHeight);
    console.log(name, vp, 'height', hgt);
    await p.screenshot({ path: `shots/mode-${name}-${vp}.png`, fullPage: true });
    await c.close();
  }
}
await b.close();
