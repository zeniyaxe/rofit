// Page shell for rofit.site. Everything dynamic goes through esc(); pages contain no inline scripts or styles,
// so the Content-Security-Policy can stay at script-src 'self' / style-src 'self'.
import * as lucide from 'lucide';

export const SITE = 'https://rofit.site';
export const REPO = 'https://github.com/zeniyaxe/rofit';
export const CSP = [
  "default-src 'none'", "script-src 'self'", "style-src 'self'", "img-src 'self' https://tr.rbxcdn.com",
  "connect-src 'none'", "base-uri 'none'", "form-action 'none'",
].join('; ');

const ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ENT[c]);

const HANGER = [
  ['path', { d: 'M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5' }],
  ['path', { d: 'M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z' }],
];

/** Inline SVG for a Lucide icon name (or the RoFit hanger), decorative by default. */
export function icon(name, cls = '') {
  const node = name === 'Hanger' ? HANGER : lucide[name];
  if (!Array.isArray(node)) throw new Error(`Unknown icon ${name}`);
  const body = node.map(([t, a]) => `<${t} ${Object.entries(a).map(([k, v]) => `${k}="${esc(v)}"`).join(' ')}/>`).join('');
  return `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

export const LOGO = `<svg viewBox="0 0 128 128" aria-hidden="true" focusable="false"><rect width="128" height="128" rx="28" fill="#335fff"/><g fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M64 56v-4a11 11 0 1 0-11-11"/><path d="M64 56 22 86a7 7 0 0 0 4 12.5h76a7 7 0 0 0 4-12.5L64 56Z"/></g></svg>`;

const NAV = [['/features/', 'Features'], ['/docs/', 'Docs'], ['/changelog/', 'Changelog'], ['/privacy/', 'Privacy']];

export function page({ path, title, description, body, assets, version, noindex = false }) {
  const full = path === '/' ? 'RoFit: see the outfits people save on Roblox' : `${title} · RoFit`;
  const nav = NAV.map(([href, label]) => `<a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="no-referrer">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="canonical" href="${SITE}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RoFit">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${path}">
<meta name="theme-color" content="#335fff">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/${assets.css}">
<script src="/assets/${assets.js}" defer></script>
</head>
<body data-page="${esc(path)}" data-latest="${esc(version)}">
<a class="skip" href="#main">Skip to content</a>
<header class="top">
<div class="wrap">
<a class="brand" href="/" aria-label="RoFit home">${LOGO}<span>RoFit</span></a>
<nav class="nav" id="nav" aria-label="Main">${nav}</nav>
<span class="grow"></span>
<a class="btn primary get" href="/download/">${icon('Download')}Get RoFit</a>
<button class="btn menu-btn" type="button" aria-controls="nav" aria-expanded="false" aria-label="Menu">${icon('Menu')}</button>
</div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="foot">
<div class="wrap">
<div>
<a class="brand" href="/">${LOGO}<span>RoFit</span></a>
<p class="small">A free, open-source browser extension for exploring the outfits people save on Roblox. Version ${esc(version)}.</p>
</div>
<div><h4>Product</h4><ul><li><a href="/features/">Features</a></li><li><a href="/download/">Download</a></li><li><a href="/changelog/">Changelog</a></li></ul></div>
<div><h4>Help</h4><ul><li><a href="/docs/">Docs</a></li><li><a href="/docs/#troubleshooting">Troubleshooting</a></li><li><a href="${REPO}/issues">Report a problem</a></li></ul></div>
<div><h4>Project</h4><ul><li><a href="${REPO}">Source on GitHub</a></li><li><a href="/privacy/">Privacy</a></li><li><a href="${REPO}/blob/main/LICENSE">MIT licence</a></li></ul></div>
<p class="legal">RoFit is an independent project. It isn’t made, endorsed or supported by Roblox Corporation. Roblox and the Roblox logo are trademarks of Roblox Corporation.</p>
</div>
</footer>
</body>
</html>
`;
}
