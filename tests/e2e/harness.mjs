import { chromium } from 'playwright';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

export const EXT = resolve(process.env.ROFIT_EXT || 'dist-test');
/** Use a system Chrome/Chromium when Playwright's bundled browser isn't installed (e.g. ROFIT_CHROME=/usr/bin/chromium). */
const executablePath = process.env.ROFIT_CHROME || undefined;

export async function launch({ colorScheme = 'light', viewport = { width: 1400, height: 900 }, headless = true, reducedMotion = 'no-preference' } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'rofit-pw-'));
  const ctx = await chromium.launchPersistentContext(dir, {
    headless: false, colorScheme, viewport, reducedMotion, executablePath,
    args: ['--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', `--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`, ...(headless ? ['--headless=new'] : [])],
  });
  let [sw] = ctx.serviceWorkers();
  if (!sw) sw = await ctx.waitForEvent('serviceworker', { timeout: 15000 });
  const id = sw.url().split('/')[2];
  return { ctx, sw, id };
}

/** Pierce the closed shadow root by asking the extension's own code path: find the host and read via a test hook-free approach —
 * Playwright's locators pierce *open* shadow roots only, so tests screenshot the host element and use keyboard/mouse input. */
export async function openProfile(ctx, userId = 156) {
  const page = await ctx.newPage();
  await page.bringToFront();
  await page.goto(`https://www.roblox.com/users/${userId}/profile`, { waitUntil: 'domcontentloaded' });
  return page;
}
