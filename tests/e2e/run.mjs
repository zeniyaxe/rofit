/**
 * Regression suite against real roblox.com in real Chromium with the extension loaded.
 * Needs network. Build the test bundle first: node scripts/build.mjs --test
 * (The test build is identical to production except the sheet's shadow root is open so locators can reach in.)
 */
import { launch, openProfile, openRoFit, ENTRY } from './harness.mjs';
import { mkdirSync } from 'node:fs';
import { decodeShare, payloadFrom, SHARE_BASE } from '../../src/shared/share.ts';
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
  const matches = manifest.content_scripts.flatMap((c) => c.matches).sort().join();
  ok('content scripts run on roblox.com profiles and rofit.site only', matches === 'https://rofit.site/*,https://www.roblox.com/*', matches);
  ok('only sheet.js and account.js are web-accessible, and only to roblox.com', JSON.stringify(manifest.web_accessible_resources.map((w) => [w.resources, w.matches])) === '[[["sheet.js","account.js"],["https://www.roblox.com/*"]]]');

  const page = await openProfile(ctx, 156);
  watch(page);
  await page.waitForSelector(ENTRY, { timeout: 25000 });
  await page.waitForSelector('[data-rofit-btn]', { timeout: 15000 });
  const layout = (await page.locator('[data-rofit-tab]').count()) ? 'Outfits tab' : 'Saved Outfits row';
  ok(`profile entry (${layout}) mounted once`, (await page.locator(ENTRY).count()) === 1);
  ok('header button mounted once', (await page.locator('[data-rofit-btn]').count()) === 1);
  ok('nothing opens until asked', (await page.locator('#rofit-host').count()) === 0);

  // Roblox re-render: delete our nodes, they must come back, still exactly once.
  await page.evaluate(() => {
    document.querySelectorAll('[data-rofit-tab]').forEach((a) => a.closest('li').remove());
    document.querySelectorAll('[data-rofit-sec], [data-rofit-wrap], [data-rofit-btn]').forEach((a) => a.remove());
  });
  const back = await page.waitForFunction((sel) => document.querySelectorAll(sel).length === 1 && document.querySelectorAll('[data-rofit-btn]').length === 1, ENTRY, { timeout: 8000 }).then(() => true, () => false);
  ok('re-mounts after Roblox re-render, no duplicates', back);

  // SPA navigation to a non-profile URL then another profile.
  await page.evaluate(() => history.pushState({}, '', '/home'));
  const left = await page.waitForFunction((sel) => document.querySelectorAll(sel + ', [data-rofit-btn]').length === 0, ENTRY, { timeout: 5000 }).then(() => true, () => false);
  ok('unmounts when leaving a profile', left);
  await page.evaluate(() => history.pushState({}, '', '/users/156/profile'));
  await page.waitForFunction((sel) => document.querySelectorAll(sel).length === 1, ENTRY, { timeout: 5000 }).catch(() => {});
  ok('mounts again on SPA navigation back', (await page.locator(ENTRY).count()) === 1);

  // ---- 2. explorer ----
  await openRoFit(page);
  await page.waitForSelector('.rf-card:not(.sk)', { state: 'attached', timeout: 25000 });
  const n = await page.locator('.rf-card:not(.sk)').count();
  ok('lists the 5 saved outfits (presets hidden)', n === 5, `${n} cards`);
  ok('opening moves focus into the sheet (modal dialog)', await page.evaluate(() => !!document.querySelector('#rofit-host').shadowRoot.activeElement));
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
  const menuGeo = (label) => page.evaluate(async (label) => {
    const r = document.querySelector('#rofit-host').shadowRoot;
    await Promise.all(r.querySelector('.rf-menu').getAnimations().map((a) => a.finished.catch(() => {})));
    const m = r.querySelector('.rf-menu').getBoundingClientRect(), b = r.querySelector(`button[aria-label="${label}"]`).getBoundingClientRect();
    return { top: Math.round(m.top - b.bottom), left: Math.round(Math.abs(m.left - b.left)), inView: m.bottom <= innerHeight && m.left >= 0 && m.right <= innerWidth };
  }, label);
  await page.locator('button[aria-label="Sort"]').click();
  await page.waitForSelector('.rf-menu');
  const geo = await menuGeo('Sort');
  ok('Sort menu opens directly under its button, left-aligned, inside the viewport', geo.top >= 0 && geo.top < 14 && geo.left < 2 && geo.inView, JSON.stringify(geo));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  ok('Esc closes the menu (not the sheet)', (await page.locator('.rf-menu').count()) === 0 && (await page.locator('#rofit-host').count()) === 1);

  // Filters popover: opens under its button, has the real controls, Esc closes only it
  await page.locator('button[aria-label="Filters"]').click();
  await page.waitForSelector('.rf-filters');
  const fgeo = await menuGeo('Filters');
  ok('Filters popover opens under its button with avatar type, contents, cost and preset controls',
    fgeo.top >= 0 && fgeo.top < 14 && fgeo.inView && (await page.locator('.rf-filters [aria-label="Avatar type"]').count()) === 1 && (await page.locator('.rf-filters .rf-fchips .rf-chip').count()) >= 6
    && (await page.locator('.rf-filters [aria-label="Show Roblox presets"]').count()) === 1, JSON.stringify(fgeo));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  ok('Esc closes the Filters popover (not the sheet)', (await page.locator('.rf-filters').count()) === 0 && (await page.locator('#rofit-host').count()) === 1);

  // who-can-see badge: user 156's outfits are public; when the anonymous check can't run it must say so, never guess
  await page.waitForSelector('.rf-access', { timeout: 15000 }).catch(() => {});
  const access = (await page.locator('.rf-access').count()) ? (await page.locator('.rf-access').innerText()).trim() : '';
  ok('visibility badge shown for a public profile', ['Public', 'Visible to you', 'Visibility unknown'].includes(access), access || 'missing');
  if (access === 'Public') ok('badge says Public (anonymous check succeeded)', true);
  else console.log('note  anonymous visibility check did not confirm Public here (' + access + '); share needs consent');

  // command palette and shortcuts
  await page.keyboard.press('Control+k');
  await page.waitForSelector('.rf-palette', { timeout: 3000 }).catch(() => {});
  ok('Ctrl+K opens the command palette', (await page.locator('.rf-palette').count()) === 1);
  await page.keyboard.type('size');
  await page.waitForTimeout(200);
  const hits = await page.locator('.rf-palette [role="option"]').count();
  ok('palette filters commands as you type', hits > 0, `${hits} results for "size"`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  ok('Esc closes the palette, not the sheet', (await page.locator('.rf-palette').count()) === 0 && (await page.locator('#rofit-host').count()) === 1);
  await page.keyboard.press('?');
  await page.waitForSelector('.rf-dialog[aria-label="Keyboard shortcuts"]', { timeout: 3000 }).catch(() => {});
  ok('"?" opens the keyboard shortcuts', (await page.locator('.rf-dialog[aria-label="Keyboard shortcuts"] .rf-keys').count()) === 1);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  ok('Esc closes the shortcuts, not the sheet', (await page.locator('.rf-dialog').count()) === 0 && (await page.locator('#rofit-host').count()) === 1);
  ok('focus returns into RoFit after a dialog closes', await page.evaluate(() => !!document.querySelector('#rofit-host').shadowRoot.activeElement));

  // choosing a menu item must actually apply it (regression: outside-click handler closed the menu on pointer-down inside the shadow root)
  const order = () => page.evaluate(() => [...document.querySelector('#rofit-host').shadowRoot.querySelectorAll('.rf-card .rf-card-name')].map((e) => e.textContent));
  const before = await order();
  await page.locator('button[aria-label="Sort"]').click();
  await page.locator('.rf-mi', { hasText: 'Name' }).first().click();
  await page.waitForTimeout(700);
  const after = await order();
  ok('sort menu item applies (Name sort reorders the grid)', after.join() !== before.join() && after[0] === '2007' && after[after.length - 1] === 'Early 2011', after.join(' | '));
  await page.locator('button[aria-label="Sort"]').click();
  await page.locator('.rf-mi', { hasText: 'Roblox order' }).first().click();
  await page.waitForTimeout(500);

  // ---- 3. inspector ----
  await page.locator('.rf-card').nth(1).click();
  await page.waitForSelector('.rf-item', { timeout: 25000 });
  await page.waitForFunction(() => !document.querySelector('#rofit-host').shadowRoot.querySelector('.rf-sec-h .rf-spin'), null, { timeout: 30000 });
  const items = await page.locator('.rf-item').count();
  ok('inspector lists items', items >= 5, `${items} items`);
  ok('body colors shown (figure + swatches)', (await page.locator('svg.rf-fig rect').count()) === 6 && (await page.locator('.rf-swatch').count()) >= 6);
  const hash = await page.evaluate(() => location.hash);
  ok('hash deep link written', hash.startsWith('#rofit/'), hash);
  const openId = Number(hash.split('/')[1]);
  await page.screenshot({ path: 'shots/e2e-inspector.png' });
  // inspector menus work (they live in the shadow root too)
  await page.locator('button[aria-label="More actions"]').click();
  await page.locator('.rf-mi', { hasText: 'Copy item IDs' }).click();
  await page.waitForSelector('.rf-toast', { timeout: 5000 });
  ok('inspector "More" menu action runs (toast shown)', /Copied|copy/i.test(await page.locator('.rf-toast').innerText()));
  await page.waitForFunction(() => !document.querySelector('#rofit-host').shadowRoot.querySelector('.rf-toast'), null, { timeout: 8000 }).catch(() => {});

  // share link: a self-contained snapshot in the URL fragment
  await page.locator('button[aria-label="Share"]').click();
  await page.waitForSelector('.rf-dialog[aria-label="Share this outfit"]');
  const consent = page.locator('.rf-dialog .rf-consent [role="switch"], .rf-dialog .rf-consent button');
  if (await consent.count()) await consent.first().click(); // visibility unknown: RoFit asks first
  await page.waitForFunction(() => document.querySelector('#rofit-host').shadowRoot.querySelector('input[aria-label="Share link"]')?.value, null, { timeout: 8000 }).catch(() => {});
  const link = await page.locator('input[aria-label="Share link"]').inputValue();
  ok('Share makes a rofit.site link with the snapshot in the fragment', link.startsWith(SHARE_BASE + '#1.'), link.slice(0, 40) + '…');
  let shared = null;
  try { shared = await decodeShare(payloadFrom(link)); } catch (e) { shared = { error: String(e) }; }
  ok('the link decodes to this outfit, its items and owner', shared?.outfit?.id === openId && shared.user?.id === 156 && shared.items?.length === items && !('price' in (shared.items?.[0] ?? {})),
    JSON.stringify({ outfit: shared?.outfit, user: shared?.user, items: shared?.items?.length, error: shared?.error }));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  ok('Esc closes the share dialog, inspector stays', (await page.locator('.rf-dialog').count()) === 0 && (await page.locator('.rf-item').count()) === items);

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
  {
    const p2 = await ctx.newPage(); watch(p2);
    await p2.goto(`https://www.roblox.com/users/156/profile#rofit/${openId}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const opened = await p2.waitForSelector('.rf-item', { timeout: 30000 }).then(() => true, () => false);
    const title = opened ? await p2.locator('.rf-insp').getAttribute('aria-label') : '';
    ok('deep link in a fresh tab opens that outfit', opened && title === `Outfit ${shared?.outfit?.name}`, title);
    await p2.close();
  }

  // ---- 5. narrow viewport: inspector replaces the grid ----
  await page.setViewportSize({ width: 700, height: 800 });
  await page.waitForTimeout(500);
  await openRoFit(page);
  await page.waitForSelector('.rf-card:not(.sk)', { state: 'attached' });
  await page.locator('.rf-card').nth(0).click();
  await page.waitForSelector('.rf-item');
  ok('narrow: inspector overlays the grid (grid stays mounted, inert)', (await page.locator('.rf-pane[inert]').count()) === 1 && (await page.locator('.rf-card:not(.sk)').count()) === 5);
  await page.screenshot({ path: 'shots/e2e-narrow.png' });
  await page.locator('button[aria-label="Back to outfits"]').click();
  const backToGrid = await page.waitForFunction(() => !document.querySelector('#rofit-host').shadowRoot.querySelector('.rf-item') && !document.querySelector('#rofit-host').shadowRoot.querySelector('.rf-pane[inert]'), null, { timeout: 4000 }).then(() => true, () => false);
  ok('narrow: back returns to the grid', backToGrid);

  // ---- 5b. the share link imports into the library ----
  if (link.startsWith(SHARE_BASE)) {
    const ws = await ctx.newPage(); watch(ws);
    await ws.goto(`chrome-extension://${id}/workspace.html#library/import/${payloadFrom(link)}`);
    await ws.waitForSelector('.rf-dialog', { timeout: 10000 });
    await ws.waitForTimeout(600);
    ok('workspace import route opens the import dialog pre-filled', (await ws.locator('.rf-dialog textarea').inputValue()) === link);
    await ws.locator('.rf-dialog button:has-text("Import")').last().click();
    const lib = () => ws.evaluate(() => new Promise((r) => chrome.runtime.sendMessage({ __rofit: true, type: 'library.list', req: {} }, (x) => r(x?.data ?? []))));
    await ws.waitForFunction(() => new Promise((r) => chrome.runtime.sendMessage({ __rofit: true, type: 'library.list', req: {} }, (x) => r((x?.data?.length ?? 0) > 0))), null, { timeout: 10000 }).catch(() => {});
    const entry = (await lib()).find((e) => e.outfitId === openId);
    ok('the link imports into the library as a shared snapshot', !!entry && entry.source === 'share' && entry.name === shared?.outfit?.name && entry.details?.assets?.length === items,
      JSON.stringify(entry ? { name: entry.name, source: entry.source, assets: entry.details?.assets?.length } : null));
    await ws.close();
  }

  ok('no extension console/page errors', errors.length === 0, errors.slice(0, 3).join(' | '));

  // Roblox sometimes renders a profile without Currently Wearing (it failed to load): the row must still appear.
  if (layout === 'Saved Outfits row') {
    await page.bringToFront();
    await page.evaluate(() => { document.querySelector('.profile-currently-wearing')?.remove(); document.querySelector('[data-rofit-sec]')?.remove(); });
    const fb = await page.waitForFunction(() => document.querySelector('.profile-content > [data-rofit-sec]:first-child'), null, { timeout: 5000 }).then(() => true, () => false);
    ok('without Currently Wearing, the Saved Outfits row starts the profile sections', fb && (await page.locator('[data-rofit-sec]').count()) === 1);
  }
  await ctx.close();
}

// ---- 6. failure states with mocked Roblox responses --------------------------------------------
{
  const { ctx } = await launch();
  await ctx.route('https://avatar.roblox.com/v2/avatar/users/156/outfits**', (r) => r.fulfill({ status: 429, headers: { 'retry-after': '1', 'access-control-allow-origin': '*' }, body: '{}' }));
  const page = await openProfile(ctx, 156);
  await openRoFit(page);
  await page.waitForSelector('.rf-why', { timeout: 40000 });
  const txt = await page.locator('.rf-why').innerText();
  ok('429 shows a rate-limit message, not a generic error', /rate limiting/i.test(txt), txt.split('\n')[0]);
  await ctx.close();
}
{
  const { ctx } = await launch();
  await ctx.route('https://avatar.roblox.com/v2/avatar/users/156/outfits**', (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ data: [{ id: 1, name: 'Only preset', isEditable: false, outfitType: 'Avatar' }], paginationToken: '' }) }));
  const page = await openProfile(ctx, 156);
  await openRoFit(page);
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
  await openRoFit(page);
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
  await page.waitForSelector(ENTRY, { timeout: 25000 });
  await page.waitForTimeout(1500);
  await openRoFit(page);
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
      // One retry, as in openProfile: roblox.com occasionally stalls a page load from CI machines.
      const go = () => page.goto('https://www.roblox.com/users/' + uid + '/profile', { waitUntil: 'domcontentloaded', timeout: 45000 });
      const loaded = await go().catch(() => go()).then(() => true, () => false);
      if (!loaded) { ok('user ' + uid + ' @' + w + 'px: profile loaded', false, 'roblox.com did not answer'); continue; }
      const found = await page.waitForSelector(ENTRY, { timeout: 25000 }).then(() => true, () => false);
      if (!found) { ok('user ' + uid + ' @' + w + 'px: entry mounted', false); continue; }
      await page.waitForTimeout(2500);
      const r = await page.evaluate((sel) => {
        const mine = [...document.querySelectorAll('[data-rofit-btn]')].filter((b) => b.offsetWidth > 0);
        const header = document.querySelector('.user-profile-header-info');
        const all = [...(header?.querySelectorAll('button') ?? [])].filter((b) => b.offsetWidth > 0);
        let overlap = 0;
        for (const m of mine) for (const o of all) {
          if (o === m) continue;
          const a = m.getBoundingClientRect(), b = o.getBoundingClientRect();
          if (a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1) overlap++;
        }
        return { entries: document.querySelectorAll(sel).length, visibleBtns: mine.length, overlap };
      }, ENTRY);
      ok('user ' + uid + ' @' + w + 'px: one entry, no overlap with Roblox buttons', r.entries === 1 && r.overlap === 0 && r.visibleBtns <= 1, JSON.stringify(r));
    }
    await page.close();
  }
  await ctx.close();
}

console.log(failed ? `\n${failed} FAILED` : '\nall passed');
process.exit(failed ? 1 : 0);
