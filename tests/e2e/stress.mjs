import { launch, openProfile, openRoFit } from './harness.mjs';
const out = [];
const ok = (n, c, x = '') => { console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${x ? ' — ' + x : ''}`); if (!c) process.exitCode = 1; };
const cors = { 'access-control-allow-origin': '*' };
const names = Array.from({ length: 240 }, (_, i) => ({ id: 900000 + i, name: i % 7 === 0 ? `Extremely long outfit name number ${i} that goes on and on and on forever` : `Fit ${i}`, isEditable: true, outfitType: 'Avatar' }));

const { ctx } = await launch({ viewport: { width: 933, height: 600 }, reducedMotion: 'reduce' }); // 933x600 ≈ 150% zoom of 1400x900
await ctx.route('https://avatar.roblox.com/v2/avatar/users/156/outfits**', (r) => {
  const tok = new URL(r.request().url()).searchParams.get('paginationToken');
  return r.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify(tok ? { data: names.slice(50, 240), paginationToken: '' } : { data: names.slice(0, 50), paginationToken: 'T' }) });
});
await ctx.route('https://avatar.roblox.com/v3/outfits/9000**', (r) => r.fulfill({ status: 404, contentType: 'application/json', headers: cors, body: '{}' }));
const page = await openProfile(ctx, 156);
const errs = []; page.on('pageerror', (e) => errs.push(e.message));
await openRoFit(page);
await page.waitForSelector('.rf-card:not(.sk)', { state: 'attached', timeout: 30000 });
await page.waitForTimeout(1500);
const n = await page.locator('.rf-card:not(.sk)').count();
ok('240 outfits across 2 pages render', n === 240, `${n}`);
const overflow = await page.evaluate(() => { const r = document.querySelector('#rofit-host').shadowRoot; const sc = r.querySelector('.rf-scroll'); return { sw: sc.scrollWidth, cw: sc.clientWidth }; });
ok('no horizontal overflow at 150% zoom', overflow.sw <= overflow.cw + 1, JSON.stringify(overflow));
const rmv = await page.evaluate(() => { const s = document.querySelector('#rofit-host').shadowRoot.querySelector('.rf-sheet'); const cs = getComputedStyle(s); return { rm: s.classList.contains('rm'), dy: cs.getPropertyValue('--rf-dy').trim(), press: cs.getPropertyValue('--rf-press').trim() }; });
ok('reduced motion: travel and springs zeroed, fades kept (not blanket-disabled)', rmv.rm && rmv.dy === '0px' && rmv.press === '1', JSON.stringify(rmv));
await page.screenshot({ path: 'shots/stress-zoom150.png' });
await page.locator('.rf-card').nth(7).click();
await page.waitForSelector('.rf-empty', { timeout: 20000 });
ok('failing details shows a specific error with retry', /can.t find|no longer|Roblox/i.test(await page.locator('.rf-insp .rf-empty').innerText()));
await page.screenshot({ path: 'shots/stress-inspector-error.png' });
await page.setViewportSize({ width: 1400, height: 900 });
ok('no page errors', errs.length === 0, errs.join('|'));
await ctx.close();
