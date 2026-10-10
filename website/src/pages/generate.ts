/** Build-time page generator, called by website/build.mjs. Returns { relative path: html }. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { home } from './home.ts';
import { licenses, privacy, security, support, terms } from './docs.ts';
import { arrow, page, type Ctx, type Facts } from './lib.ts';

export function generate(o: { facts: Facts; base: string; siteUrl: string; assets: { js: string; css: string }; root: string }): Record<string, string> {
  const c: Ctx = { ...o, built: new Date().toISOString().slice(0, 10) };
  const read = (p: string) => readFileSync(resolve(o.root, p), 'utf8');
  const notFound = page(c, {
    path: '404.html', title: 'Not found · RoFit', description: 'This page doesn’t exist.',
    body: `<section class="doc"><div class="wrap nf"><span class="eyebrow">404 · Not found</span><h1>Nothing on this hanger.</h1><p class="summary">The page you asked for doesn’t exist, or it moved.</p><p><a class="btn blue" href="${c.base}">Back to RoFit ${arrow}</a></p></div></section>`,
  });
  const robots = `User-agent: *\nAllow: /\n${o.siteUrl ? `Sitemap: ${o.siteUrl.replace(/\/$/, '')}${o.base}sitemap.xml\n` : ''}`;
  const out: Record<string, string> = {
    'index.html': home(c),
    'privacy/index.html': privacy(c),
    'terms/index.html': terms(c),
    'security/index.html': security(c),
    'support/index.html': support(c),
    'licenses/index.html': licenses(c, { mit: read('LICENSE'), preact: read('licenses/preact-MIT.txt'), lucide: read('licenses/lucide-ISC.txt') }),
    '404.html': notFound,
    'robots.txt': robots,
  };
  if (o.siteUrl) {
    const u = o.siteUrl.replace(/\/$/, '') + o.base;
    out['sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['', 'privacy/', 'terms/', 'security/', 'support/', 'licenses/'].map((p) => `  <url><loc>${u}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
  }
  return out;
}
