// Toolbar popup: recent profiles, search (recent people, Roblox lookup, input rules), "this profile", plus screenshots
// of each state for visual review. Needs the --test build (it can fake the active tab with #fake=<id>:<name>).
import { launch, openProfile, openRoFit } from './harness.mjs';
import { mkdirSync } from 'node:fs';
mkdirSync('shots', { recursive: true });

let failed = 0;
const ok = (name, cond, extra = '') => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`); if (!cond) failed++; };
const { ctx, id } = await launch();
for (const uid of [156, 1]) {
  const p = await openProfile(ctx, uid);
  await openRoFit(p);
  await p.waitForSelector('.rf-why, .rf-card:not(.sk)', { state: 'attached', timeout: 30000 });
  await p.waitForTimeout(800);
  await p.close();
}
const popup = async (hash = '') => {
  const pp = await ctx.newPage();
  await pp.setViewportSize({ width: 340, height: 480 }); // the popup is 340px wide (styles.css .rf-pop2)
  await pp.goto(`chrome-extension://${id}/popup.html${hash}`);
  await pp.waitForTimeout(900);
  return pp;
};

{
  const pp = await popup();
  await pp.screenshot({ path: 'shots/popup-idle.png' });
  const recent = await pp.locator('#rf-pop-panel[aria-labelledby="rf-pt-recent"] .rf-pop-name').allInnerTexts();
  ok('idle: recently viewed lists the profiles just visited', recent.some((t) => t.startsWith('builderman')) && recent.some((t) => t.startsWith('Roblox')), recent.map((t) => t.split('\n')[0]).join(', '));
  ok('idle: explains where RoFit lives on a profile', /Saved Outfits/.test(await pp.locator('.rf-pop-now.idle').innerText()));
  ok('search box has focus on open', await pp.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Search Roblox users and your library'));

  await pp.keyboard.type('builder');
  await pp.waitForTimeout(400);
  const rows = await pp.locator('.rf-pop-row .rf-pop-name').allInnerTexts();
  ok('typing offers a Roblox lookup first, then matching recent people', /^Find “builder” on Roblox/.test(rows[0] ?? '') && rows.some((t) => t.startsWith('builderman')), rows.map((t) => t.split('\n')[0]).join(' | '));
  await pp.screenshot({ path: 'shots/popup-search.png' });

  await pp.fill('input[role=combobox]', 'not a name!');
  await pp.keyboard.press('Enter');
  await pp.waitForSelector('.rf-pop-msg[role=alert]', { timeout: 3000 }).catch(() => {});
  ok('invalid usernames are explained instead of looked up', /isn’t a Roblox username or user ID/.test(await pp.locator('.rf-pop-msg[role=alert]').innerText().catch(() => '')));

  await pp.fill('input[role=combobox]', '');
  await pp.keyboard.type('156');
  const opened = ctx.waitForEvent('page', { timeout: 20000 }).catch(() => null);
  await pp.keyboard.press('Enter');
  const tab = await opened;
  ok('Enter on a user ID opens that profile with RoFit', !!tab && /^https:\/\/www\.roblox\.com\/users\/156\/profile#rofit$/.test(tab.url()), tab?.url());
  await tab?.close();
  if (!pp.isClosed()) await pp.close();
}
{
  const pp = await popup('#fake=156:builderman');
  await pp.screenshot({ path: 'shots/popup-here.png' });
  const t = await pp.locator('.rf-pop-now.live').innerText().catch(() => '');
  ok('on a profile: offers that profile first, with what RoFit already knows', /This profile/i.test(t) && /builderman/.test(t) && /5 saved outfits/.test(t), t.replace(/\n/g, ' / '));
  ok('library shortcut in the footer', (await pp.locator('.rf-pop-lib').count()) === 1);
  await pp.close();
}
await ctx.close();
console.log(failed ? `\n${failed} FAILED` : '\nall passed');
process.exit(failed ? 1 : 0);
