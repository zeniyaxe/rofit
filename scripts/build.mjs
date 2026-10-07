import { build, context } from 'esbuild';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';

const watch = process.argv.includes('--watch');
const test = process.argv.includes('--test');
const out = test ? 'dist-test' : 'dist';
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const common = {
  bundle: true, minify: !watch && !test, sourcemap: watch ? 'inline' : false, target: 'chrome110',
  jsx: 'automatic', jsxImportSource: 'preact', loader: { '.css': 'text' },
  logLevel: 'info', legalComments: 'none',
  define: { 'process.env.NODE_ENV': '"production"', __ROFIT_TEST__: String(test) },
};

const targets = [
  { entryPoints: { background: 'src/background/index.ts' }, format: 'esm' },
  { entryPoints: { content: 'src/content/index.ts' }, format: 'iife' },
  { entryPoints: { sheet: 'src/content/sheet.tsx' }, format: 'esm' },
  { entryPoints: { workspace: 'src/pages/workspace.tsx' }, format: 'iife' },
  { entryPoints: { popup: 'src/pages/popup.tsx' }, format: 'iife' },
];

for (const t of targets) {
  const opts = { ...common, ...t, outdir: out };
  if (watch) await (await context(opts)).watch(); else await build(opts);
}

cpSync('public', out, { recursive: true });
const ver = JSON.parse(readFileSync('package.json', 'utf8')).version;
const mf = JSON.parse(readFileSync(`${out}/manifest.json`, 'utf8'));
mf.version = ver;
writeFileSync(`${out}/manifest.json`, JSON.stringify(mf, null, 2));
console.log('built →', out);
