// Builds rofit.site into site/dist: static HTML, one hashed CSS file, one hashed JS bundle, security headers.
//   node site/build.mjs            production build
//   node site/build.mjs --serve    build, then serve site/dist on http://localhost:8787 (no bridge: that needs https://rofit.site)
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, CSP } from './src/layout.mjs';
import { markdown } from './src/markdown.mjs';
import * as P from './src/pages.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const out = join(here, 'dist');
const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });
cpSync(join(here, 'public'), out, { recursive: true });

const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 10);

// CSS and JS, content-hashed so they can be cached forever.
const css = await build({ entryPoints: [join(here, 'src/site.css')], bundle: true, minify: true, write: false, logLevel: 'silent' });
const cssText = css.outputFiles[0].text;
const js = await build({
  entryPoints: [join(here, 'src/app.ts')], bundle: true, minify: true, write: false, format: 'iife', target: ['chrome110', 'firefox115', 'safari16'],
  legalComments: 'none', logLevel: 'silent',
});
const jsText = js.outputFiles[0].text;
const assets = { css: `site.${hash(cssText)}.css`, js: `app.${hash(jsText)}.js` };
writeFileSync(join(out, 'assets', assets.css), cssText);
writeFileSync(join(out, 'assets', assets.js), jsText);

const changelogHtml = markdown(readFileSync(join(root, 'CHANGELOG.md'), 'utf8'));

const PAGES = [
  { path: '/', file: 'index.html', title: 'RoFit', description: 'A free browser extension that adds an Outfits view to Roblox profiles: browse, inspect, compare and keep the outfits people save.', body: P.home({ version }) },
  { path: '/features/', file: 'features/index.html', title: 'Features', description: 'Explorer, inspector, compare, library, share links and visibility labels: everything RoFit does with saved Roblox outfits.', body: P.features() },
  { path: '/download/', file: 'download/index.html', title: 'Download', description: `Install RoFit ${version} in Chrome, Edge or Brave in about a minute.`, body: P.download({ version }) },
  { path: '/docs/', file: 'docs/index.html', title: 'Docs', description: 'How to use RoFit: opening it, search, inspector, compare, library, share links, settings and troubleshooting.', body: P.docs() },
  { path: '/changelog/', file: 'changelog/index.html', title: 'Changelog', description: 'Every RoFit release, newest first.', body: P.changelog({ html: changelogHtml }) },
  { path: '/privacy/', file: 'privacy/index.html', title: 'Privacy', description: 'RoFit has no servers, accounts or analytics. What it stores, who it talks to, and how share links stay private.', body: P.privacy() },
  { path: '/o/', file: 'o/index.html', title: 'Shared outfit', description: 'An outfit shared from RoFit.', body: P.viewer(), noindex: true },
  { path: '/404', file: '404.html', title: 'Not found', description: 'This page doesn’t exist.', body: P.notFound(), noindex: true },
];
for (const p of PAGES) {
  const file = join(out, p.file);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page({ ...p, assets, version }));
}

// Response headers for hosts that read a _headers file (Cloudflare Pages, Netlify). The same CSP is also in a
// <meta> tag on every page, for hosts that can't set headers (GitHub Pages); frame-ancestors only works as a header.
writeFileSync(join(out, '_headers'), `/*
  Content-Security-Policy: ${CSP}; frame-ancestors 'none'; upgrade-insecure-requests
  Referrer-Policy: no-referrer
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), clipboard-read=()
  Strict-Transport-Security: max-age=31536000
/assets/*
  Cache-Control: public, max-age=31536000, immutable
`);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.filter((p) => !p.noindex).map((p) => `  <url><loc>https://rofit.site${p.path}</loc></url>`).join('\n')}
</urlset>
`);
console.log(`rofit.site ${version} → ${out} (${PAGES.length} pages, ${(jsText.length / 1024).toFixed(1)} KB js, ${(cssText.length / 1024).toFixed(1)} KB css)`);

if (process.argv.includes('--serve')) {
  const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
  createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    let f = join(out, decodeURIComponent(url.pathname));
    if (!f.startsWith(out)) { res.writeHead(403).end(); return; }
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
    const found = existsSync(f);
    if (!found) f = join(out, '404.html');
    res.writeHead(found ? 200 : 404, { 'content-type': TYPES[extname(f)] ?? 'application/octet-stream', 'content-security-policy': `${CSP}; frame-ancestors 'none'` });
    res.end(readFileSync(f));
  }).listen(8787, () => console.log('serving http://localhost:8787'));
}
