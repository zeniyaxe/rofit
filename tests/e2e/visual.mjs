// Library grouping + compare slider + settings, screenshots for review.
import { launch, openProfile, openRoFit } from './harness.mjs';
const { ctx, id } = await launch();
const page = await openProfile(ctx, 156);
await openRoFit(page);
await page.waitForSelector('.rf-card:not(.sk)', { state: 'attached', timeout: 25000 });
await page.waitForTimeout(1500);
for (const [i, coll] of [[0, 'Early days'], [1, 'Early days'], [2, '']]) {
  await page.locator('.rf-card').nth(i).click();
  await page.waitForSelector('.rf-item', { timeout: 25000 });
  await page.getByRole('button', { name: /^Save$/ }).click();
  await page.waitForSelector('.rf-form', { timeout: 15000 });
  if (coll) { await page.locator('.rf-form input').first().fill(coll); await page.locator('.rf-form input').nth(1).fill('r6, classic'); await page.locator('.rf-form textarea').click(); }
  await page.waitForTimeout(700);
}
await page.getByRole('tab', { name: /Library/ }).click();
await page.waitForTimeout(2500);
await page.screenshot({ path: 'shots/v-library.png' });
// compare two from library
await page.locator('.rf-pick').nth(0).click({ force: true });
await page.locator('.rf-pick').nth(1).click({ force: true });
await page.locator('.rf-tray .rf-btn.primary').click();
await page.waitForSelector('.rf-compare');
await page.waitForTimeout(3500);
await page.getByRole('radio', { name: 'Slider' }).click();
await page.waitForTimeout(700);
await page.screenshot({ path: 'shots/v-compare-slider.png' });
await ctx.close();
