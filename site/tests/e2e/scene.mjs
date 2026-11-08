// node tests/e2e/scene.mjs <selector> <fractions comma> <name> [w] [h]
import { chromium } from 'playwright';
const [sel, fr = '0.1,0.5,0.9', name = 'scene', w = '1440', h = '900'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto('http://localhost:4321/', { waitUntil: 'load' });
await p.waitForTimeout(800);
for (const f of fr.split(',')) {
  await p.evaluate(([s, f]) => { const e = document.querySelector(s); const top = e.getBoundingClientRect().top + scrollY; const span = e.offsetHeight - innerHeight; scrollTo(0, top + span * f); }, [sel, +f]);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `shots/${name}-${f}.png` });
}
console.log('errors', JSON.stringify(errs));
await b.close();
