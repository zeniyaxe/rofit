// Prints geometry for debugging: node tests/e2e/probe.mjs <scrollY> <selector...>
import { chromium } from 'playwright';
const [scroll = '0', ...sels] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4321/', { waitUntil: 'load' });
await p.evaluate((y) => window.scrollTo(0, y), +scroll);
await p.waitForTimeout(1200);
const out = await p.evaluate((ss) => ss.map((s) => { const e = document.querySelector(s); if (!e) return [s, null]; const r = e.getBoundingClientRect(); return [s, [r.left, r.top, r.width, r.height].map(Math.round), getComputedStyle(e).transform]; }), sels);
console.log(JSON.stringify(out, null, 1));
console.log(await p.evaluate(() => { const s = document.querySelector('[data-scene]'); return [s.style.cssText, s.dataset.step]; }));
await b.close();
