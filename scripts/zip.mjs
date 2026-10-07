import { ZipArchive } from 'archiver';
import { createWriteStream, mkdirSync, readFileSync, existsSync } from 'node:fs';

if (!existsSync('dist/manifest.json')) { console.error('Run "npm run build" first.'); process.exit(1); }
const v = JSON.parse(readFileSync('package.json', 'utf8')).version;
mkdirSync('release', { recursive: true });
const out = `release/rofit-inspector-${v}.zip`;
const zip = new ZipArchive({ zlib: { level: 9 } });
const ws = createWriteStream(out);
zip.pipe(ws);
zip.directory('dist/', false);
await zip.finalize();
await new Promise((r) => ws.on('close', r));
console.log(`wrote ${out} (${(zip.pointer() / 1024).toFixed(0)} KB)`);
