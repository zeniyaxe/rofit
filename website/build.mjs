/**
 * Builds the RoFit website into website/dist.
 *   node website/build.mjs            production build
 *   BASE=/rofit/ node website/build.mjs   for hosting under a sub-path (e.g. GitHub Pages project site)
 *
 * The interactive demo bundles the extension's real UI and service code from ../src. Four modules are swapped and
 * three source substitutions are applied, all listed below and all verified (the build fails if one stops matching),
 * so the extension itself is never modified.
 */
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const out = resolve(here, 'dist');
const cache = resolve(here, '.cache');
const BASE = (process.env.BASE || '/').replace(/\/?$/, '/');
const SITE_URL = process.env.SITE_URL || ''; // absolute origin for canonical/og tags, optional

// ---- facts: read from the repository, never typed in by hand ------------------------------------------------
function facts() {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  const src = JSON.parse(readFileSync(join(root, 'public/manifest.json'), 'utf8'));
  const built = existsSync(join(root, 'dist/manifest.json')) ? JSON.parse(readFileSync(join(root, 'dist/manifest.json'), 'utf8')) : null;
  const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8');
  const clVersion = (changelog.match(/^##\s+(\d+\.\d+\.\d+)/m) || [])[1];
  const zips = existsSync(join(root, 'release')) ? readdirSync(join(root, 'release')).filter((f) => /\.zip$/.test(f)) : [];
  const zip = zips.find((f) => f.includes(pkg.version));
  const problems = [];
  if (built && built.version !== pkg.version) problems.push(`dist/manifest.json is ${built.version}, package.json is ${pkg.version}`);
  if (clVersion !== pkg.version) problems.push(`CHANGELOG.md tops out at ${clVersion}, package.json is ${pkg.version}`);
  if (!zip) problems.push(`no release zip for ${pkg.version} in release/`);
  if (problems.length) throw new Error('Version sources disagree:\n  ' + problems.join('\n  '));
  // public/manifest.json carries a placeholder version that scripts/build.mjs overwrites from package.json.
  const zipBytes = statSync(join(root, 'release', zip)).size;
  const zipSha = createHash('sha256').update(readFileSync(join(root, 'release', zip))).digest('hex');
  return {
    version: pkg.version, name: src.name, description: src.description, minChrome: src.minimum_chrome_version,
    permissions: src.permissions, hosts: src.host_permissions.map((h) => h.replace(/^https:\/\//, '').replace(/\/\*$/, '')),
    contentScripts: src.content_scripts.map((c) => c.matches).flat(), csp: src.content_security_policy?.extension_pages,
    zip, zipBytes, zipSha, deps: Object.keys(pkg.dependencies), sourcePlaceholderVersion: src.version,
    changelog: changelog.split(/^## /m).slice(1, 4).map((s) => ({ title: s.split('\n')[0].trim(), body: s.split('\n').slice(1).join('\n').trim() })),
    repo: 'https://github.com/zeniyaxe/rofit',
  };
}

// ---- demo wiring ---------------------------------------------------------------------------------------------
const R = (p) => resolve(root, p);
const swaps = new Map([
  [R('src/shared/rpc.ts'), R('website/src/demo/shim-rpc.ts')],          // messaging → direct calls to the real handlers
  [R('src/shared/settings.ts'), R('website/src/demo/shim-settings.ts')], // chrome.storage → memory
  [R('src/background/db.ts'), R('website/src/demo/memdb.ts')],           // IndexedDB → memory (nothing stored by the site)
]);
const patches = [
  // fetch → the sample server (or nothing else): every other line of the adapter runs as shipped
  { file: R('src/background/roblox.ts'), prepend: `import { demoFetch as fetch } from ${JSON.stringify(R('website/src/demo/transport.ts'))};\n`,
    append: '\nexport const __demoReset = () => { meCache = null; csrf = \'\'; };\n', find: [/\bfetch\(url,/g], expect: [1] },
  // window-level shortcuts → only for keys aimed at the demo (see website/src/demo/index.tsx)
  { file: R('src/ui/Shell.tsx'), replace: [
    ["window.addEventListener('keydown', f, true);", '(globalThis as any).__rofitKeys.add(f);'],
    ["window.removeEventListener('keydown', f, true);", '(globalThis as any).__rofitKeys.delete(f);'] ] },
  // chrome.runtime.getManifest() → the version read from the repository at build time
  { file: R('src/ui/Settings.tsx'), replace: [['chrome.runtime.getManifest().version', '__ROFIT_VERSION__']] },
];
const demoPlugin = {
  name: 'rofit-demo',
  setup(b) {
    b.onResolve({ filter: /\.tsx?$/ }, (a) => {
      if (a.kind === 'entry-point') return;
      const p = resolve(a.resolveDir, a.path);
      const to = swaps.get(p);
      if (to && a.importer !== to) return { path: to };
    });
    for (const pt of patches) {
      b.onLoad({ filter: new RegExp(pt.file.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '$') }, () => {
        let s = readFileSync(pt.file, 'utf8');
        (pt.find || []).forEach((re, i) => { const n = (s.match(re) || []).length; if (n !== pt.expect[i]) throw new Error(`${relative(root, pt.file)}: expected ${pt.expect[i]} match(es) of ${re}, found ${n}`); });
        for (const [from, to] of pt.replace || []) {
          const n = s.split(from).length - 1;
          if (n !== 1) throw new Error(`${relative(root, pt.file)}: expected exactly one "${from}", found ${n}`);
          s = s.replace(from, to);
        }
        s = (pt.prepend || '') + s + (pt.append || '');
        return { contents: s, loader: pt.file.endsWith('x') ? 'tsx' : 'ts', resolveDir: dirname(pt.file) };
      });
    }
  },
};

// ---- build -----------------------------------------------------------------------------------------------------
const F = facts();
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });
mkdirSync(join(out, 'fonts'), { recursive: true });
mkdirSync(cache, { recursive: true });

const define = { __ROFIT_VERSION__: JSON.stringify(F.version), __ROFIT_TEST__: 'false', 'process.env.NODE_ENV': '"production"' };
const js = await build({
  entryPoints: { site: R('website/src/site/main.ts') },
  outdir: join(out, 'assets'), bundle: true, splitting: true, format: 'esm', minify: true, target: ['chrome113', 'firefox115', 'safari16'],
  jsx: 'automatic', jsxImportSource: 'preact', loader: { '.css': 'text' }, define, legalComments: 'none', metafile: true,
  entryNames: '[name]-[hash]', chunkNames: '[name]-[hash]', plugins: [demoPlugin], logLevel: 'warning',
});
const css = await build({
  entryPoints: { site: R('website/src/site/site.css') }, outdir: join(out, 'assets'), bundle: true, minify: true, metafile: true,
  entryNames: '[name]-[hash]', external: ['*.woff2'], target: ['chrome113', 'firefox115', 'safari16'], logLevel: 'warning',
});
const outName = (meta, entry) => Object.entries(meta.outputs).find(([, o]) => o.entryPoint && o.entryPoint.endsWith(entry))[0].split('/').pop();
const assets = { js: outName(js.metafile, 'website/src/site/main.ts'), css: outName(css.metafile, 'website/src/site/site.css') };

// fonts are kept in the repo as base64 text (the repo is edited through text-only tooling); decode here
for (const f of readdirSync(R('website/src/fonts'))) {
  if (f.endsWith('.b64')) writeFileSync(join(out, 'fonts', f.replace(/\.b64$/, '')), Buffer.from(readFileSync(R('website/src/fonts/' + f), 'utf8'), 'base64'));
  else cpSync(R('website/src/fonts/' + f), join(out, 'fonts', f));
}
cpSync(R('website/src/static'), out, { recursive: true });
cpSync(R('licenses'), join(out, 'licenses'), { recursive: true });

// pages are rendered at build time (they work without JavaScript); the generator is TypeScript, so bundle it first
await build({
  entryPoints: [R('website/src/pages/generate.ts')], outfile: join(cache, 'generate.mjs'), bundle: true, platform: 'node', format: 'esm',
  jsx: 'automatic', jsxImportSource: 'preact', loader: { '.css': 'text' }, define, plugins: [demoPlugin], logLevel: 'warning',
});
const { generate } = await import(pathToFileURL(join(cache, 'generate.mjs')).href + '?t=' + Date.now());
const pages = generate({ facts: F, base: BASE, siteUrl: SITE_URL, assets, root });
for (const [path, html] of Object.entries(pages)) {
  const file = join(out, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const size = (f) => statSync(join(out, f)).size;
const report = Object.keys(js.metafile.outputs).concat(Object.keys(css.metafile.outputs)).map((p) => `${p.split('/').pop()}  ${(size('assets/' + p.split('/').pop()) / 1024).toFixed(1)} KB`);
console.log(`RoFit website ${F.version} → ${relative(process.cwd(), out)} (base ${BASE})\n  ` + report.join('\n  ') + `\n  pages: ${Object.keys(pages).join(', ')}`);
writeFileSync(join(cache, 'facts.json'), JSON.stringify({ ...F, assets }, null, 2));
