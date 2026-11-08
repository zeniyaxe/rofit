// Fails the build when the website's privacy claims stop matching the extension's real files.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = resolve(fileURLToPath(import.meta.url), '..', '..');
const repo = resolve(site, '..');
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

const manifest = JSON.parse(readFileSync(join(repo, 'public/manifest.json'), 'utf8'));
const words = readFileSync(join(site, 'src/lib/privacy.ts'), 'utf8');

// 1. Every permission and host in the manifest has a plain-language description on the site, and nothing extra is described.
for (const p of manifest.permissions) ok(new RegExp(`\\b${p}:\\s*\\{`).test(words), `permission "${p}" is in the manifest but has no description in site/src/lib/privacy.ts`);
for (const h of manifest.host_permissions) ok(words.includes(`'${h}'`), `host "${h}" is in the manifest but has no description`);
for (const m of words.matchAll(/^\s{2}(\w+):\s*\{ name:/gm)) ok(manifest.permissions.includes(m[1]), `site describes permission "${m[1]}" which the manifest does not request`);

// 2. Network code lives in exactly two files, and no banned transport or tracker appears in the source.
function walk(d, out = []) { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p, out) : /\.tsx?$/.test(n) && out.push(p); } return out; }
const src = walk(join(repo, 'src'));
const fetchers = src.filter((f) => /\bfetch\s*\(/.test(readFileSync(f, 'utf8'))).map((f) => f.replace(repo, '').replace(/\\/g, '/').slice(1));
const allowed = ['src/background/roblox.ts', 'src/content/index.ts'];
ok(fetchers.length === allowed.length && allowed.every((a) => fetchers.includes(a)), `network call sites changed: [${fetchers.join(', ')}]. Update the privacy page's claims, then this list.`);
for (const f of src) {
  const t = readFileSync(f, 'utf8');
  for (const r of [/sendBeacon/, /XMLHttpRequest/, /WebSocket/, /\beval\s*\(/, /new Function\s*\(/, /document\.cookie/, /chrome\.cookies/, /google-analytics|mixpanel|amplitude|sentry/i])
    ok(!r.test(t), `${f}: found ${r}`);
}

// 3. Hosts mentioned in source are only Roblox, RoFit's own pages, or GitHub links.
const okHost = /(^|\.)roblox\.com$|^tr\.rbxcdn\.com$|^rofit\.site$|^github\.com$|^localhost$|^www\.w3\.org$/;
for (const f of src) for (const m of readFileSync(f, 'utf8').matchAll(/https?:\/\/([a-z0-9.-]+)/gi)) ok(okHost.test(m[1].toLowerCase()), `${f}: unexpected host ${m[1]}`);

// 4. No remote code: the extension-page CSP is script-src 'self' with no other origins.
const csp = manifest.content_security_policy?.extension_pages ?? '';
ok(/script-src 'self'/.test(csp) && !/https?:/.test(csp), `unexpected CSP: ${csp}`);

if (fails.length) { console.error('\nclaim check failed:\n - ' + fails.join('\n - ') + '\n'); process.exit(1); }
console.log(`claim check ok: ${manifest.permissions.length} permissions, ${manifest.host_permissions.length} hosts, ${fetchers.length} network files`);
