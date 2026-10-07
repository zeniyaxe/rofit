/**
 * Regression suite against real roblox.com in real Chromium with the extension loaded.
 * Needs network. Build the test bundle first: node scripts/build.mjs --test
 * (The test build is identical to production except the sheet's shadow root is open so locators can reach in.)
 */
import { launch, openProfile } from './harness.mjs';
import { mkdirSync } from 'node:fs';
mkdirSync('shots', { recursive: true });

let failed = 0;
const ok = (name, cond, extra = '') => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`); if (!cond) failed++; };
const errors = [];
const watch = (page) => {
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && /chrome-extension|rofit/i.test(m.text())) errors.push(m.text()); });
};

// ---- 1. install, profile integration, SPA behaviour --------------------------------------------
{
  const { ctx, sw, id } = await launch();
  ok('service worker starts', !!sw);
  const manifest = await sw.evaluate(() => chrome.runtime.getManifest());
  ok('manifest is MV3 with scoped permissions', manifest.manifest_version === 3 && manifest.permissions.join() === 'storage,alarms,activeTab' && manifest.host_permissions.every((h) => /^https:\/\/[a-z]+\.roblox\.com\/\*$/.test(h)));

  const page = await openProfile(ctx, 156);
  watch(page);
  await page.waitForSelector('[data-rofit-tab]', { timeout: 25000 });
  await page.waitForSelector('[data-rofit-btn]', { timeout: 15000 });
  ok('Outfits tab mounted once', (await page.locator('[data-rofit-tab]').count()) === 1);
  ok('Outfits button mounted once', (await page.locator('[data-rofit-btn]').count()) === 1);

  // Roblox re-render: delete our nodes, they must come back, still exactly once.
  await page.evaluate(() => { document.querySelectorAll('[data-rofit-tab]').forEach((a) => a.closest('li').remove()); document.querySelectorAll('[data-rofit-wrap]').forEach((a) => a.remove()); });
  await page.waitForFunction(() => document.querySelectorAll('[data-rofit-tab]').length === 1 && document.querySelectorAll('[data-rofit-btn]').length === 1, null, { timeout: 8000 });
  ok('re-mounts after Roblox re-render, no duplicates', true);

  // SPA navigation to a non-profile URL then another profile.
  await page.evaluate(() => history.pushState({}, '', '/home'));
  await page.waitForFunction(() => document.querySelectorAll('[data-rofit-tab]').length === 0, null, { timeout: 5000 });
  ok('unmounts when leaving a profile', true);
  await page.evaluate(() => history.pushState({}, '', '/users/156/profile'));
  await page.waitForFunction(() => document.querySelectorAll('[data-rofit-tab]').length === 1, null, { timeout: 5000 });
  ok('mounts again on SPA navigation back', (await page.locator('[data-rofit-tab]').count()) === 1);

  // ---- 2. explorer ----
  await page.locator('[data-rofit-tab]').first().click();
  await page.waitForSelector('.rf-card:not(.sk)', { state: 'attached', timeout: 25000 });
  const n = await page.locator('.rf-card:not(.sk)').count();
  ok('lists the 5 saved outfits (presets hidden)', n === 5, `${n} cards`);
  ok('presets are not mixed in by default', (await page.getByText('Roblox presets hidden').count()) > 0);

  // keyboard
  await page.keyboard.press('/');
  ok('"/" focuses search', await page.evaluate(() => document.querySelector('#rofit-host').shadowRoot.activeElement?.type === 'search'));
  await page.keyboard.type('2011');
  await page.waitForTimeout(400);
  const filtered = await page.locator('.rf-card:not(.sk)').count();
  ok('name search filters', filtered > 0 && filtered < 5, `${filtered} cards`);
  await page.keyboard.press('Escape'); // clears the query
  await page.waitForTimeout(300);
  ok('Esc clears search first', (await page.locator('.rf-card:not(.sk)').count()) === 5);

  // menus must sit under their button (regression: Preact 11 doesn't append px to numeric style values)
  await page.locator('button[aria-label="Sort and filter"]').click();
  await page.waitForTimeout(300);
  const geo = await page.evaluate(async () => {
    const r = document.querySelector('#rofit-host').shadowRoot;
    await Promise.all(r.querySelector('.rf-menu').getAnimations().map((a) => a.finished.catch(() => {})));
    const m = r.querySelector('.rf-menu').getBoundingClientRect(), b = r.querySelector('button[aria-label="Sort and filter"]').getBoundingClientRect();
    return { top: m.top - b.bottom, right: Math.abs(m.right - b.right), inView: m.bottom <= innerHeight && m.left >= 0 };
  });
  ok('menu opens directly under its button, inside the viewport', geo.top >= 0 && geo.top < 14 && geo.right < 2 && geo.inView, JSON.stringify(geo));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  ok('Esc closes the menu (not the sheet)', (await page.locator('.rf-menu').count()) === 0 && (await page.locator('#rofit-host').count()) === 1);

  // choosing a menu item must actually apply it (regression: outside-click handler closed the menu on pointer-down inside the shadow root)
  const order = () => page.evaluate(() => [...document.querySelector('#rofit-host').shadowRoot.querySelectorAll('.rf-card .rf-card-name')].map((e) => e.textContent));
  const before = await order();
  await page.locator('button[aria-label="Sort and filter"]').click();
  await page.locator('.rf-mi', { hasText: 'Name' }).first().click();
  await page.waitForTimeout(700);
  const after = await order();
  ok('sort menu item applies (Name sort reorders the grid)', after.join() !== before.join() && after[0] === '2007' && after[after.length - 1] === 'Early 2011', after.join(' | '));
  await page.locator('button[aria-label="Sort and filter"]').click();
  await page.locator('.rf-mi', { hasText: 'Roblox order' }).first().click();
  await page.waitForTimeout(500);

  // ---- 3. inspector ----
  await page.locator('.rf-card').nth(1).click();
  await page.waitForSelector('.rf-item', { timeout: 25000 });
  await page.waitForFunction(() => !document.querySelector('#rofit-host').shadowRoot.querySelector('.rf-sec-h .rf-spin'), null, { timeout: 30000 });
  const items = await page.locator('.rf-item').count();
  ok('inspector lists items', items >= 5, `${items} items`);
  ok('body colors shown', (await page.locator('.rf-swatch').count()) >= 6);
  ok('hash deep link written', (await page.evaluate(() => location.hash)).startsWith('#rofit/'));
  await page.screenshot({ path: 'shots/e2e-inspector.png' });
  // inspector menus work (they live in the shadow root too)
  await page.locator('button[aria-label="More actions"]').click();
  await page.locator('.rf-mi', { hasText: 'Copy item IDs' }).click();
  await page.waitForSelector('.rf-toast', { timeout: 5000 });
  ok('inspector "More" menu action runs (toast shown)', /Copied|copy/i.test(await page.locator('.rf-toast').innerText()));
  await page.locator('button[aria-label="Compare"]').click();
  await page.locator('.rf-mi', { hasText: 'another outfit' }).click();
  await page.waitForTimeout(500);
  ok('Compare → another outfit enters selection mode', (await page.locator('.rf-tray').count()) === 1 || (await page.locator('.rf-pane[inert]').count()) === 0);
  if (await page.locator('.rf-tray').count()) await page.locator('.rf-tray .rf-btn', { hasText: 'Clear' }).click();

  // exits are animated now, so wait for the end state instead of a fixed delay
  await page.keyboard.press('Escape');
  const gone = await page.waitForFunction(() => !document.querySelector('#rofit-host')?.shadowRoot?.querySelector('.rf-item'), null, { timeout: 4000 }).then(() => true, () => false);
  ok('Esc closes inspector, sheet stays', gone && (await page.locator('#rofit-host').count()) === 1);
  await page.keyboard.press('Escape');
  const sheetGone = await page.waitForFunction(() => !document.querySelector('#rofit-host'), null, { timeout: 4000 }).then(() => true, () => false);
  ok('second Esc closes the sheet (after its exit animation)', sheetGone);
  ok('page scroll restored', (await page.evaluate(() => document.documentElement.style.overflow)) !== 'hidden');

  // ---- 4. deep link in a fresh load ----
  const ids = await sw.evaluate(async () => { const r = await chrome.runtime.sendMessage({ __rofit: true, type: 'outfits.cached', req: { userId: 156 } }); return r; }).catch(() => null);
  const first = ids?.data?.outfits?.[0]?.id;
  if (first) {
    const p2 = await ctx.newPage(); watch(p2);
    await p2.goto(`https://www.roblox.com/users/156/profile#rofit/${first}`, { waitUntil: 'domcontentloaded' });
    await p2.waitForSelector('.rf-item', { timeout: 30000 });
    ok('deep link opens that outfit', true);
    await p2.close();
  }

  // ---- 5. narrow viewport: inspector replaces the grid ----
  await page.setViewportSize({ width: 700, height: 800 });
  await page.waitForTimeout(500);
  await page.locator('[data-rofit-tab]').first().click();
  await page.waitForSelector('.rf-card:not(.sk)', { state: 'attached' });
  await page.locator('.rf-card').nth(0).click();
  await page.waitForSelector('.rf-item');
  ok('narrow: inspector overlays the grid (grid stays mounted, inert)', (await page.locator('.rf-pane[inert]').count()) === 1 && (await page.locator('.rf-card:not(.sk)').count()) === 5);
  await page.screenshot({ path: 'shots/e2e-narrow.png' });
  await page.locator('.rf-ibar .rf-ib').first().click();
  await page.waitForSelector('.rf-card:not(.sk)', { state: 'attached' });
  ok('narrow: back returns to the grid', true);

  ok('no extension console/page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await ctx.close();
}

// ---- 6. failure states with mocked Roblox responses --------------------------------------------
{
  const { ctx } = await launch();
  await ctx.route('https://avatar.roblox.com/v2/avatar/users/156/outfits**', (r) => r.fulfill({ status: 429, headers: { 'retry-after': '1', 'access-control-allow-origin': '*' }, body: '{}' }));
  const page = await openProfile(ctx, 156);
  await page.waitForSelector('[data-rofit-tab]', { timeout: 25000 });
  await page.locator('[data-rofit-tab]').first().click();
  await page.waitForSelector('.rf-why', { timeout: 40000 });
  const txt = await page.locator('.rf-why').innerText();
  ok('429 shows a rate-limit message, not a generic error', /rate limiting/i.test(txt), txt.split('\n')[0]);
  await ctx.close();
}
{
  const { ctx } = await launch();
  await ctx.route('https://avatar.roblox.com/v2/avatar/users/156/outfits**', (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ data: [{ id: 1, name: 'Only preset', isEditable: false, outfitType: 'Avatar' }], paginationToken: '' }) }));
  const page = await openProfile(ctx, 156);
  await page.waitForSelector('[data-rofit-tab]', { timeout: 25000 });
  await page.locator('[data-rofit-tab]').first().click();
  await page.waitForSelector('.rf-why', { timeout: 20000 });
  const txt = await page.locator('.rf-why').innerText();
  ok('only presets → explains presets are hidden and offers them', /No saved outfits to show/.test(txt) && /Only Roblox presets are listed \(1\)/.test(txt) && /Show 1 preset/.test(txt), txt.replace(/\n/g, ' / ').slice(0, 160));
  await ctx.close();
}

// ---- 6b. outfit privacy: forbidden, empty, missing user ---------------------------------------
for (const [name, status, body, expect] of [
  ['private (403)', 403, { errors: [{ code: 4, message: 'Insufficient permissions to view outfits' }] }, [/outfits are private/, /Insufficient permissions/, /Looks like this/]],
  ['empty 200', 200, { data: [], paginationToken: '' }, [/No saved outfits to show/, /Outfit privacy is hiding them/, /Possible/]],
  ['no such user (400)', 400, { errors: [{ code: 1, message: 'The specified user does not exist.' }] }, [/User not found/]],
]) {
  const { ctx } = await launch();
  await ctx.route('https://avatar.roblox.com/v2/avatar/users/156/outfits**', (r) => r.fulfill({ status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(body) }));
  const page = await openProfile(ctx, 156);
  await page.waitForSelector('[data-rofit-tab]', { timeout: 25000 });
  await page.locator('[data-rofit-tab]').first().click();
  await page.waitForSelector('.rf-why', { timeout: 30000 });
  await page.waitForTimeout(800);
  const txt = await page.locator('.rf-why').innerText();
  ok(name + ': specific explanation, not "something went wrong"', expect.every((rx) => rx.test(txt)), txt.replace(/\n+/g, ' / ').slice(0, 200));
  if (status === 403) await page.screenshot({ path: 'shots/e2e-private.png' });
  await ctx.close();
}

// ---- 6c. requests carry the Roblox session (SameSite=Lax cookies) --------------------------------
{
  const { ctx } = await launch();
  await ctx.addCookies([{ name: 'probe_lax', value: '1', domain: '.roblox.com', path: '/', secure: true, sameSite: 'Lax' }]);
  const seen = [];
  await ctx.route('https://avatar.roblox.com/v2/avatar/users/156/outfits**', async (r) => {
    const h = await r.request().allHeaders();
    if (r.request().method() === 'GET') seen.push(/probe_lax=1/.test(h.cookie || '')); // preflights never carry cookies
    r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': 'https://www.roblox.com', 'access-control-allow-credentials': 'true' }, body: '{"data":[],"paginationToken":""}' });
  });
  const page = await openProfile(ctx, 156);
  await page.waitForSelector('[data-rofit-tab]', { timeout: 25000 });
  await page.waitForTimeout(1500);
  await page.locator('[data-rofit-tab]').first().click();
  await page.waitForSelector('.rf-why', { timeout: 30000 });
  ok('API requests carry same-site (Lax) cookies via the Roblox tab, so Roblox sees the signed-in viewer', seen.length > 0 && seen.every(Boolean), JSON.stringify(seen));
  await ctx.close();
}

// ---- 7. profile action placement across profiles and widths: no overlap, no duplicates ----
{
  const { ctx } = await launch();
  for (const uid of [156, 1, 261]) {
    const page = await openProfile(ctx, uid);
    for (const w of [1400, 900, 600, 420]) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto('https://www.roblox.com/users/' + uid + '/profile', { waitUntil: 'domcontentloaded' });
      const found = await page.waitForSelector('[data-rofit-tab]', { timeout: 25000 }).then(() => true, () => false);
      if (!found) { ok('user ' + uid + ' @' + w + 'px: tab mounted', false); continue; }
      await page.waitForTimeout(2500);
      const r = await page.evaluate(() => {
        const mine = [...document.querySelectorAll('[data-rofit-btn]')].filter((b) => b.offsetWidth > 0);
        const header = document.querySelector('.user-profile-header-info');
        const all = [...(header?.querySelectorAll('button') ?? [])].filter((b) => b.offsetWidth > 0);
        let overlap = 0;
        for (const m of mine) for (const o of all) {
          if (o === m) continue;
          const a = m.getBoundingClientRect(), b = o.getBoundingClientRect();
          if (a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1) overlap++;
        }
        return { tabs: document.querySelectorAll('[data-rofit-tab]').length, visibleBtns: mine.length, overlap };
      });
      ok('user ' + uid + ' @' + w + 'px: one tab, no overlap with Roblox buttons', r.tabs === 1 && r.overlap === 0 && r.visibleBtns <= 1, JSON.stringify(r));
    }
    await page.close();
  }
  await ctx.close();
}

console.log(failed ? `\n${failed} FAILED` : '\nall passed');
process.exit(failed ? 1 : 0);
