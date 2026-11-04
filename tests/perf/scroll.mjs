// Frame-time measurement while scrolling/sorting a 300-outfit explorer. Usage: node tests/perf/scroll.mjs [cv|nocv]
import { launch, openProfile, openRoFit } from '../e2e/harness.mjs';
const mode = process.argv[2] || 'cv';
const cors = { 'access-control-allow-origin': '*' };
const all = Array.from({ length: 300 }, (_, i) => ({ id: 800000 + i, name: `Fit ${i} ${'x'.repeat(i % 5 * 6)}`, isEditable: true, outfitType: 'Avatar' }));
const { ctx } = await launch();
await ctx.route('https://avatar.roblox.com/v2/avatar/users/156/outfits**', (r) => {
  const tok = new URL(r.request().url()).searchParams.get('paginationToken');
  r.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify(tok ? { data: all.slice(100), paginationToken: '' } : { data: all.slice(0, 100), paginationToken: 'T' }) });
});
await ctx.route('https://thumbnails.roblox.com/v1/users/outfits**', (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify({ data: [] }) }));
const page = await openProfile(ctx, 156);
await openRoFit(page);
await page.waitForFunction(() => (document.querySelector('#rofit-host')?.shadowRoot?.querySelectorAll('.rf-card:not(.sk)').length ?? 0) >= 300, null, { timeout: 30000 });
await page.waitForTimeout(2500);
if (mode === 'nocv') await page.evaluate(() => { const s = document.createElement('style'); s.textContent = '.rf-cell{content-visibility:visible !important}'; document.querySelector('#rofit-host').shadowRoot.appendChild(s); });
const res = await page.evaluate(async () => {
  const root = document.querySelector('#rofit-host').shadowRoot; const sc = root.querySelector('.rf-scroll');
  const frames = []; let last = performance.now(); let run = true;
  const tick = (t) => { frames.push(t - last); last = t; if (run) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  const t0 = performance.now();
  for (let i = 0; i < 90; i++) { sc.scrollTop = (i / 90) * (sc.scrollHeight - sc.clientHeight); await new Promise((r) => requestAnimationFrame(r)); }
  const scrollMs = performance.now() - t0;
  // sort toggles
  const sortT = []; for (const label of ['Name', 'Roblox order', 'Name']) {
    const b = [...root.querySelectorAll('button[aria-label="Sort and filter"]')][0]; b.click(); await new Promise((r) => setTimeout(r, 80));
    const mi = [...root.querySelectorAll('.rf-mi')].find((m) => m.textContent.includes(label)); const s = performance.now(); mi.click();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); sortT.push(Math.round(performance.now() - s)); await new Promise((r) => setTimeout(r, 500));
  }
  run = false; frames.sort((a, b) => a - b);
  const p = (q) => Math.round(frames[Math.floor(frames.length * q)] * 10) / 10;
  return { frames: frames.length, p50: p(0.5), p95: p(0.95), p99: p(0.99), max: Math.round(frames[frames.length - 1]), scrollMs: Math.round(scrollMs), sortTwoFrameMs: sortT };
});
console.log(mode, JSON.stringify(res));
await ctx.close();
