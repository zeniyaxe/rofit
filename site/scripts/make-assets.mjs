// Renders the site's raster assets (OG image, apple-touch icon) from HTML with the site's own fonts.
// node scripts/make-assets.mjs  -> public/og.png, public/apple-touch-icon.png
// Permanent artwork carries no avatars: it outlives the dated snapshot the homepage uses.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const site = resolve(import.meta.dirname, '..');
const font = (pkg, f) => 'data:font/woff2;base64,' + readFileSync(resolve(site, `node_modules/@fontsource-variable/${pkg}/files/${f}`)).toString('base64');
const any = font('anybody', 'anybody-latin-standard-normal.woff2');
const ons = font('onest', 'onest-latin-wght-normal.woff2');
const hanger = (s, w = 2.2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"/><path d="M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"/></svg>`;
const css = `@font-face{font-family:A;src:url(${any});font-weight:100 900;font-stretch:50% 150%}@font-face{font-family:O;src:url(${ons});font-weight:100 900}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;overflow:hidden;font-family:O;background:#ff3d7f;color:#0c0c0d;position:relative}
.mast{position:absolute;left:44px;top:40px;font-family:A;font-weight:900;font-stretch:150%;font-size:262px;line-height:.74;letter-spacing:-.05em;text-transform:uppercase;white-space:nowrap}
.rule{position:absolute;left:52px;right:52px;top:300px;border-top:2px solid #0c0c0d}
h1{position:absolute;left:52px;top:330px;font-family:A;font-weight:900;font-stretch:62%;font-size:108px;line-height:.86;letter-spacing:-.02em;text-transform:uppercase}
.deck{position:absolute;left:56px;bottom:52px;font-size:30px;font-weight:600;max-width:640px;line-height:1.25}
.url{position:absolute;right:56px;bottom:56px;font-family:A;font-stretch:128%;font-weight:700;font-size:26px}
.lines{position:absolute;right:56px;top:336px;width:420px;display:grid;gap:14px}
.lines div{display:flex;align-items:center;gap:14px;font-size:22px;font-weight:700}.lines i{flex:1;border-top:1.5px solid #0c0c0d}.lines span{display:inline-block;padding:2px 9px;box-shadow:inset 0 0 0 1.5px #0c0c0d;font-size:18px}`;
const og = `<style>${css}</style><body><div class="mast">RoFit</div><div class="rule"></div><h1>Get the<br>look.</h1>
<div class="lines"><div><i></i>Every piece</div><div><i></i>Who made it</div><div><i></i>What it costs</div><div><i></i><span>Off sale</span></div></div>
<p class="deck">Saved Roblox outfits, piece by piece.</p><p class="url">rofit.site</p></body>`;
const icon = `<style>body{margin:0;width:180px;height:180px;background:#ff3d7f;color:#0c0c0d;display:grid;place-items:center}</style><body>${hanger(116, 2.4)}</body>`;

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
