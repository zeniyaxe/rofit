// Popup states for visual review: idle, on a profile (after visiting some), narrow height.
import { launch, openProfile } from './harness.mjs';
const { ctx, id } = await launch();
for (const uid of [156, 1]) {
  const p = await openProfile(ctx, uid);
  await p.waitForSelector('[data-rofit-tab]', { timeout: 25000 });
  await p.locator('[data-rofit-tab]').first().click();
  await p.waitForSelector('.rf-why, .rf-card:not(.sk)', { state: 'attached', timeout: 30000 });
  await p.waitForTimeout(800);
  await p.close();
}
for (const [name, hash] of [['idle', ''], ['here', '#fake=156:builderman']]) {
  const pp = await ctx.newPage();
  await pp.setViewportSize({ width: 320, height: 420 });
  await pp.goto(`chrome-extension://${id}/popup.html${hash}`);
  await pp.waitForTimeout(1200);
  await pp.screenshot({ path: `shots/popup-${name}.png` });
  await pp.close();
}
await ctx.close();
