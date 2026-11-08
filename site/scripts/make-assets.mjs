// Renders the site's raster assets (OG image, apple-touch icon) from HTML with the site's own fonts and art.
// node scripts/make-assets.mjs  -> public/og.png, public/apple-touch-icon.png
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const site = resolve(import.meta.dirname, '..');
const font = (pkg, f) => 'data:font/woff2;base64,' + readFileSync(resolve(site, `node_modules/@fontsource-variable/${pkg}/files/${f}`)).toString('base64');
const unb = font('unbounded', 'unbounded-latin-wght-normal.woff2');
const ons = font('onest', 'onest-latin-wght-normal.woff2');
const hanger = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"/><path d="M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"/></svg>`;
// Permanent artwork carries no avatars at all: just the rail and empty hangers.
const hang = () => `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#f0b46a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"/><path d="M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"/></svg>`;
const css = `@font-face{font-family:U;src:url(${unb});font-weight:200 900}@font-face{font-family:O;src:url(${ons});font-weight:100 900}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;overflow:hidden;font-family:O;background:#2a4bff;color:#fff;position:relative}
.cl{position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(0,0,40,.24) 0 2px,transparent 2px 15px,rgba(255,255,255,.07) 15px 19px,transparent 19px 38px)}
.rail{position:absolute;left:0;right:0;top:128px;height:6px;background:#aab3c8}
.row{position:absolute;right:50px;top:60px;display:flex;gap:6px}
.row div{width:150px;height:150px;margin-top:-2px;display:flex;align-items:flex-start;justify-content:center}.row svg{width:150px;height:auto}
h1{font-family:U;font-weight:800;font-size:128px;letter-spacing:-.04em;line-height:1}
.l{position:absolute;left:70px;bottom:78px}.l p{font-size:34px;margin-top:20px;color:#dbe2ff;max-width:520px;line-height:1.25}
.m{position:absolute;left:70px;top:58px;width:64px;height:64px;border-radius:16px;background:#fff;color:#2a4bff;display:grid;place-items:center}`;
const og = `<style>${css}</style><body><div class="cl"></div><div class="m">${hanger(40)}</div><div class="rail"></div>
<div class="row">${[0, 1, 2].map(() => `<div>${hang()}</div>`).join('')}</div>
<div class="l"><h1>RoFit</h1><p>See the fit. Know every piece.</p></div></body>`;
const icon = `<style>body{margin:0;width:180px;height:180px;background:#2a4bff;color:#fff;display:grid;place-items:center}</style><body>${hanger(112)}</body>`;

const b = await chromium.launch();
const shot = async (html, w, h, out) => {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
  await p.screenshot({ path: resolve(site, out) }); await p.close();
};
await shot(og, 1200, 630, 'public/og.png');
await shot(icon, 180, 180, 'public/apple-touch-icon.png');
await b.close();
console.log('assets written');
