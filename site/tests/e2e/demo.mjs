// node tests/e2e/demo.mjs [w] [h] -> shots/demo-*.png
import { chromium } from 'playwright';
const [w = '1440', h = '900'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto('http://localhost:4321/', { waitUntil: 'load' });
await p.evaluate(() => document.getElementById('demo').scrollIntoView());
await p.waitForSelector('#demo .view.ready', { timeout: 8000 });
await p.waitForTimeout(1200);
await p.screenshot({ path: 'shots/demo-a.png' });
await p.click('#demo [data-user="9003"]'); await p.waitForTimeout(1200);
await p.screenshot({ path: 'shots/demo-private.png' });
await p.click('#demo [data-real]'); await p.click('#demo-theme'); await p.waitForTimeout(1000);
await p.screenshot({ path: 'shots/demo-dark.png' });
console.log('errors', JSON.stringify(errs));
await b.close();
