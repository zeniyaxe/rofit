/** Shared page chrome for the build-time page generator. Plain template strings: the pages are static HTML. */
import { HANGER } from '../../../src/shared/hanger.ts';

export interface Facts {
  version: string; name: string; description: string; minChrome: string; permissions: string[]; hosts: string[];
  contentScripts: string[]; csp: string; zip: string; zipBytes: number; zipSha: string; deps: string[];
  changelog: { title: string; body: string }[]; repo: string;
}
export interface Ctx { facts: Facts; base: string; siteUrl: string; assets: { js: string; css: string }; built: string }

export const esc = (s: string | number) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export const hangerSvg = (size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${HANGER.map(([, a]) => `<path d="${a.d}"/>`).join('')}</svg>`;
export const arrow = '<span class="arr" aria-hidden="true">→</span>';

/** Tiny markdown subset used by CHANGELOG.md: paragraphs, "- " bullets, **bold**, `code`. */
export function md(s: string): string {
  const inline = (t: string) => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
  const out: string[] = [];
  let list = false;
  for (const line of s.split('\n')) {
    const m = line.match(/^\s*-\s+(.*)$/);
    if (m) { if (!list) { out.push('<ul>'); list = true; } out.push(`<li>${inline(m[1])}</li>`); continue; }
    if (list) { out.push('</ul>'); list = false; }
    if (line.trim()) out.push(`<p>${inline(line.trim())}</p>`);
  }
  if (list) out.push('</ul>');
  return out.join('');
}

export const CSP = [
  "default-src 'self'", "img-src 'self' data:", "style-src 'self' 'unsafe-inline'", "script-src 'self'", "font-src 'self'",
  "connect-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'none'", "manifest-src 'self'",
].join('; ');

export function page(c: Ctx, o: { path: string; title: string; description: string; body: string; nav?: string; bodyClass?: string }): string {
  const { base, siteUrl, assets } = c;
  const url = siteUrl ? siteUrl.replace(/\/$/, '') + base + o.path.replace(/index\.html$/, '') : '';
  const home = o.path === 'index.html';
  const h = (hash: string) => (home ? hash : base + hash);
  const cur = (k: string) => (o.nav === k ? ' aria-current="page"' : '');
  return `<!doctype html>
<html lang="en" class="html-nojs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f3f0e9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#121317" media="(prefers-color-scheme: dark)">
${url ? `<link rel="canonical" href="${esc(url)}">\n<meta property="og:url" content="${esc(url)}">\n` : ''}<meta property="og:type" content="website">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.description)}">
<link rel="icon" href="${base}icon.svg" type="image/svg+xml">
<link rel="preload" href="${base}fonts/bricolage-grotesque.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/${assets.css}">
<script type="module" src="${base}assets/${assets.js}"></script>
</head>
<body${o.bodyClass ? ` class="${o.bodyClass}"` : ''}>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap">
    <a class="brand" href="${base}" aria-label="RoFit home"><span class="brand-mark">${hangerSvg(18)}</span>RoFit</a>
    <nav class="nav" aria-label="Main">
      <a href="${h('#how')}">How it works</a>
      <a href="${h('#demo')}" data-open-demo>Demo</a>
      <a href="${h('#honesty')}">Data honesty</a>
      <a href="${base}privacy/"${cur('privacy')}>Privacy</a>
      <a class="btn sm blue nav-keep" href="${h('#install')}">Install</a>
    </nav>
  </div>
</header>
<main id="main" tabindex="-1">
${o.body}
</main>
${footer(c)}
</body>
</html>
`;
}

function footer(c: Ctx): string {
  const { base, facts: f } = c;
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div>
        <a class="brand" href="${base}"><span class="brand-mark">${hangerSvg(18)}</span>RoFit</a>
        <p style="max-width:40ch;margin:14px 0 0">A free, open-source browser extension for looking through the outfits people have saved on Roblox. Version ${esc(f.version)}.</p>
      </div>
      <div>
        <h4>Product</h4>
        <ul>
          <li><a href="${base}#demo">Demo</a></li>
          <li><a href="${base}#install">Install</a></li>
          <li><a href="${f.repo}/blob/main/CHANGELOG.md">Changelog</a></li>
          <li><a href="${f.repo}">Source code</a></li>
        </ul>
      </div>
      <div>
        <h4>Policies</h4>
        <ul>
          <li><a href="${base}privacy/">Privacy</a></li>
          <li><a href="${base}terms/">Terms</a></li>
          <li><a href="${base}security/">Security</a></li>
          <li><a href="${base}support/">Support</a></li>
          <li><a href="${base}licenses/">Licenses</a></li>
        </ul>
      </div>
    </div>
    <p class="legal">RoFit is an independent project. It is not affiliated with, endorsed, sponsored or approved by Roblox Corporation. Roblox is a trademark of Roblox Corporation. Every outfit, item, user name and price shown on this site is invented sample data, not taken from Roblox. RoFit is released under the MIT License.</p>
  </div>
</footer>`;
}

/** Document page (privacy, terms, …): title, last-updated line, table of contents built from the sections. */
export function doc(c: Ctx, o: { path: string; nav: string; title: string; eyebrow: string; description: string; updated: string; summary: string; sections: { id: string; h: string; html: string }[] }): string {
  const body = `<article class="doc"><div class="wrap doc-grid">
  <nav class="doc-toc" aria-label="On this page"><span class="eyebrow">On this page</span><ol>${o.sections.map((s) => `<li><a href="#${s.id}">${esc(s.h)}</a></li>`).join('')}</ol></nav>
  <div>
    <span class="eyebrow">${esc(o.eyebrow)}</span>
    <h1>${esc(o.title)}</h1>
    <p class="updated">Last updated ${esc(o.updated)} · applies to RoFit ${esc(c.facts.version)} and this website</p>
    <p class="summary">${o.summary}</p>
    ${o.sections.map((s) => `<section aria-labelledby="${s.id}"><h2 id="${s.id}">${esc(s.h)}</h2>${s.html}</section>`).join('\n    ')}
  </div>
</div></article>`;
  return page(c, { path: o.path, title: `${o.title} · RoFit`, description: o.description, body, nav: o.nav });
}
