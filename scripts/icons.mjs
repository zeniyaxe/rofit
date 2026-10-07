import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
const svg = readFileSync('assets/icon.svg', 'utf8');
mkdirSync('public/icons', { recursive: true });
const b = await chromium.launch();
for (const s of [16, 32, 48, 128]) {
  const p = await b.newPage({ viewport: { width: s, height: s }, deviceScaleFactor: 1 });
  await p.setContent(`<style>html,body{margin:0;background:transparent}svg{width:${s}px;height:${s}px;display:block}</style>${svg}`);
  await p.screenshot({ path: `public/icons/icon${s}.png`, omitBackground: true });
  await p.close();
}
await b.close();
