// Bundles the website demo: the extension's real UI + demo shims (rpc, settings) into src/demo-dist/demo.js.
import { build, transform } from 'esbuild';
import { readFileSync as readCss } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, '..');
const repo = resolve(site, '..');
const norm = (p) => p.replace(/\\/g, '/');
const srcDir = norm(resolve(repo, 'src'));

// The extension imports ../shared/rpc.ts and ../shared/settings.ts. In the demo those two files are replaced by shims
// with identical exports; everything else in src/ui is used untouched.
const swap = {
  name: 'demo-shims',
  setup(b) {
    b.onResolve({ filter: /shared\/(rpc|settings)\.ts$/ }, (a) => {
      if (!norm(a.importer).startsWith(srcDir)) return;
      return { path: resolve(site, 'demo', a.path.includes('rpc') ? 'shim-rpc.ts' : 'shim-settings.ts') };
    });
  },
};

mkdirSync(resolve(site, 'src/demo-dist'), { recursive: true });
const res = await build({
  entryPoints: [resolve(site, 'demo/entry.tsx')],
  outfile: resolve(site, 'src/demo-dist/demo.js'),
  bundle: true, format: 'esm', minify: true, target: 'es2022', legalComments: 'none',
  jsx: 'automatic', jsxImportSource: 'preact', loader: { '.css': 'text' },
  alias: { preact: resolve(repo, 'node_modules/preact'), lucide: resolve(repo, 'node_modules/lucide') },
  define: { __ROFIT_TEST__: 'false', 'process.env.NODE_ENV': '"production"' },
  plugins: [swap, { name: 'css-text', setup(b) { b.onLoad({ filter: /\.css$/ }, async (a) => ({ contents: (await transform(readCss(a.path, 'utf8'), { loader: 'css', minify: true, target: 'chrome110' })).code, loader: 'text' })); } }], metafile: true, logLevel: 'warning',
});
const kb = Object.values(res.metafile.outputs).reduce((n, o) => n + o.bytes, 0) / 1024;
console.log(`demo bundle: ${kb.toFixed(0)} KB (lazy-loaded)`);
