// Captures mid-flight frames of the key transitions so motion can be reviewed as images. Output: shots/motion-*.png
import { launch, openProfile } from './harness.mjs';
import { mkdirSync } from 'node:fs';
mkdirSync('shots', { recursive: true });
const { ctx } = await launch();
const page = await openProfile(ctx, 156);
await page.waitForSelector('[data-rofit-tab]', { timeout: 25000 });
await page.locator('[data-rofit-tab]').first().click();
await page.waitForSelector('.rf-card:not(.sk)', { timeout: 25000 });
await page.waitForTimeout(2500);
const shot = (n) => page.screenshot({ path: `shots/motion-${n}.png`, clip: { x: 0, y: 40, width: 1385, height: 560 } });
// open: sample the flight
await page.locator('.rf-card').nth(1).click();
for (const [i, t] of [[1, 90], [2, 120], [3, 150]]) { await page.waitForTimeout(t); await shot('open-' + i); }
await page.waitForSelector('.rf-item', { timeout: 20000 });
await page.waitForTimeout(1500);
// close: Esc
await page.keyboard.press('Escape');
for (const [i, t] of [[1, 70], [2, 90]]) { await page.waitForTimeout(t); await shot('close-' + i); }
await page.waitForTimeout(600);
// sort FLIP
await page.locator('button[aria-label="Sort and filter"]').click();
await page.waitForTimeout(250);
await page.locator('.rf-mi', { hasText: 'Name' }).click();
for (const [i, t] of [[1, 60], [2, 100]]) { await page.waitForTimeout(t); await shot('sort-' + i); }
const fin = await page.evaluate(() => { const r = document.querySelector('#rofit-host').shadowRoot; return { anims: r.getAnimations ? r.getAnimations().length : -1 }; });
console.log(JSON.stringify(fin));
await ctx.close();
