// RoFit 3.0 site interactions and responsive checks, against a running dev/preview server.
//   npm run dev  (or: npx astro preview --port 4321)   then   node tests/e2e/v3.mjs [base]
import { chromium, devices } from 'playwright';
const base = process.argv[2] ?? 'http://localhost:4321';
let failed = 0;
const ok = (name, cond, extra = '') => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`); if (!cond) failed++; };
const b = await chromium.launch();

// ---- cover: switcher, keyboard, swipe-safe, a11y state ----------------------------------------------------------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  const on = () => p.evaluate(() => [...document.querySelectorAll('.cover .look')].findIndex((l) => l.hasAttribute('data-on')));
  ok('cover starts on the first look', (await on()) === 0);
  ok('only the visible look is exposed to assistive tech', await p.evaluate(() => [...document.querySelectorAll('.cover .look')].filter((l) => !l.hasAttribute('aria-hidden')).length === 1));
  await p.click('.cover .next');
  ok('next shows look 2', (await on()) === 1);
  ok('counter follows', (await p.textContent('.cover .count b')) === '2');
  await p.click('.cover .next'); await p.click('.cover .prev'); await p.click('.cover .prev'); await p.click('.cover .prev');
  ok('rapid clicks wrap around and settle on one look', (await on()) === 4 && (await p.locator('.cover .look[data-on]').count()) === 1);
  await p.focus('.cover .next'); await p.keyboard.press('ArrowRight');
  ok('arrow keys move between looks', (await on()) === 0);
  const prices = await p.$$eval('.cover .price', (els) => els.map((e) => e.textContent?.trim()));
  ok('cover prices are real values or honest labels', prices.every((t) => /^R\$ [\d,]+$|^Free$|^Off sale$|^Unknown$/.test(t ?? '')), prices.join(' | '));
  ok('callouts never sit on the masthead letters', await p.evaluate(() => {
    const mast = document.querySelector('.cover .mast span').getBoundingClientRect();
    return [...document.querySelectorAll('.cover .look[data-on] .call')].every((c) => c.getBoundingClientRect().top > mast.bottom - 4);
  }));
  // rack tabs
  await p.locator('#wardrobe').scrollIntoViewIfNeeded();
  await p.click('.shelf-tabs [role=tab]:nth-of-type(2)');
  ok('profile tab swaps the shelf', await p.evaluate(() => { const t = document.querySelector('.shelf-tabs [aria-selected=true]'); return !document.getElementById(t.getAttribute('aria-controls')).hidden; }));
  await p.keyboard.press('ArrowRight');
  ok('tabs follow arrow keys with roving focus', await p.evaluate(() => document.activeElement?.getAttribute('role') === 'tab' && document.activeElement.getAttribute('aria-selected') === 'true' && document.activeElement.tabIndex === 0));
  // card backs
  const card = p.locator('#wardrobe .shelf:not([hidden]) .card.flip').first();
  await card.locator('.front .turn').click();
  ok('a card turns to its piece list, focus follows', await p.evaluate(() => { const c = document.querySelector('#wardrobe .shelf:not([hidden]) .card.flip'); return c.classList.contains('turned') && c.querySelector('.back').contains(document.activeElement) && c.querySelector('.front').inert; }));
  await p.keyboard.press('Enter');
  ok('and back again', await p.evaluate(() => !document.querySelector('#wardrobe .shelf:not([hidden]) .card.flip').classList.contains('turned')));
  // wipe
  await p.locator('#compare .stage').scrollIntoViewIfNeeded();
  ok('compare rests on two cards face to face, not a split figure', await p.evaluate(() => getComputedStyle(document.querySelector('#compare .duo')).visibility === 'visible' && document.querySelectorAll('#compare .cc').length === 2));
  await p.click('#compare .modes [data-mode=wipe]');
  await p.waitForTimeout(400);
  await p.focus('#compare .wipe input'); await p.keyboard.press('Home');
  ok('wipe is keyboard operable', (await p.evaluate(() => getComputedStyle(document.querySelector('#compare .stage')).getPropertyValue('--at').trim())) === '0%');
  ok('no page errors on home', errs.length === 0, errs.join(' | '));
  await ctx.close();
}

// ---- mobile menu: focus moves in, Tab stays inside, Esc returns focus ------------------------------------------
{
  const ctx = await b.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(base + '/privacy', { waitUntil: 'networkidle' });
  await p.click('#menu-btn');
  ok('menu opens with focus inside', await p.evaluate(() => !!document.activeElement?.closest('#nav-links')));
  for (let i = 0; i < 12; i++) await p.keyboard.press('Tab');
  ok('Tab stays inside the open menu', await p.evaluate(() => !!document.activeElement?.closest('#nav-links, #menu-btn')));
  await p.keyboard.press('Escape');
  ok('Esc closes the menu and returns focus to its button', await p.evaluate(() => !document.getElementById('nav-links').classList.contains('open') && document.activeElement?.id === 'menu-btn'));
  await ctx.close();
}

// ---- responsive: no horizontal overflow at the widths people use ------------------------------------------------
for (const w of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  for (const path of ['/', '/download', '/features', '/docs', '/privacy', '/o', '/changelog']) {
    await p.goto(base + path, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(150);
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (over > 1) ok(`no horizontal scroll at ${w}px on ${path}`, false, `${over}px`);
  }
  ok(`no horizontal scroll at ${w}px (7 pages)`, true);
  await ctx.close();
}

// ---- reduced motion: content visible, nothing travels -------------------------------------------------------------
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  ok('reduced motion resolves to Calm', (await p.evaluate(() => document.documentElement.dataset.motion)) === 'reduced');
  ok('travel tokens are zeroed in Calm', (await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--deal').trim())) === '0px');
  await p.locator('#wardrobe .cards').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
  ok('cards are visible in Calm', (await p.evaluate(() => getComputedStyle(document.querySelector('#wardrobe .shelf:not([hidden]) li')).opacity)) === '1');
  await ctx.close();
}

await b.close();
console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
