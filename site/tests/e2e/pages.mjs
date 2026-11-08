// node tests/e2e/pages.mjs [w] [h] [tag]: full-page screenshots of every static page + home sections
import { chromium, devices } from 'playwright';
const [w = '1440', h = '900', tag = 'd'] = process.argv.slice(2);
const b = await chromium.launch();
const mobile = +w < 600;
const ctx = await b.newContext(mobile ? { ...devices['iPhone 13'], viewport: { width: +w, height: +h } } : { viewport: { width: +w, height: +h } });
const p = await ctx.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
for (const path of ['privacy', 'install', 'guides/no-outfits', 'changelog', 'roadmap', '404']) {
  await p.goto('http://localhost:4321/' + path, { waitUntil: 'load' });
  await p.waitForTimeout(500);
  await p.screenshot({ path: `shots/pg-${tag}-${path.replace('/', '_')}.png`, fullPage: false });
}
await p.goto('http://localhost:4321/', { waitUntil: 'load' });
for (const id of ['proof', 'private', 'demo']) {
  await p.evaluate((id) => { const e = document.getElementById(id); scrollTo(0, e.getBoundingClientRect().top + scrollY + (id === 'private' ? e.offsetHeight * .6 : 0)); }, id);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `shots/home-${tag}-${id}.png` });
}
await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(900);
await p.screenshot({ path: `shots/home-${tag}-end.png` });
console.log('errors', JSON.stringify(errs));
await b.close();
