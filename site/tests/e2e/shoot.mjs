// Usage: node tests/e2e/shoot.mjs <path|home> <name> [width] [height] [waitMs] [scrollY] [full]
import { chromium } from 'playwright';
const [path = 'home', name = 'shot', w = '1440', h = '900', wait = '6500', scroll = '0', full = ''] = process.argv.slice(2);
const url = 'http://localhost:4321' + (path === 'home' ? '/' : '/' + path.replace(/^[/\\]+/, ''));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto(url, { waitUntil: 'load' });
if (+scroll) await p.evaluate((y) => window.scrollTo(0, y), +scroll);
await p.waitForTimeout(+wait);
await p.screenshot({ path: `shots/${name}.png`, fullPage: !!full });
console.log('errors:', JSON.stringify(errs));
await b.close();
