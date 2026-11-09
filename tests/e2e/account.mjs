import assert from 'node:assert/strict';
import { launch } from './harness.mjs';

const { ctx } = await launch();
try {
  await ctx.route('https://www.roblox.com/my/account', (route) => route.fulfill({
    contentType: 'text/html',
    body: '<main style="display:flex"><ul style="width:200px"><li><a href="#!/info">Account info</a></li><li><a href="#!/security">Security</a></li><li><a href="#!/privacy">Privacy</a></li></ul><section style="width:900px;min-height:350px"><p>Native content</p></section></main>',
  }));
  const page = await ctx.newPage();
  await page.goto('https://www.roblox.com/my/account');
  await page.getByText('RoFit settings', { exact: true }).click();
  const search = page.getByRole('searchbox', { name: 'Search settings' });
  await search.waitFor({ timeout: 5000 });
  await page.locator('main section').first().evaluate((el) => el.replaceChildren(Object.assign(document.createElement('p'), { textContent: 'Native content' })));
  await search.waitFor({ timeout: 5000 });
  await page.getByRole('button', { name: 'About', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'About', exact: true }).getAttribute('aria-current'), 'true');
  await page.getByRole('link', { name: 'Security', exact: true }).click();
  await page.getByText('Native content').waitFor({ timeout: 5000 });
  assert.equal(await search.count(), 0);
  console.log('Account settings opens, survives Roblox replacing its content, and restores native settings.');
} finally {
  await ctx.close();
}
