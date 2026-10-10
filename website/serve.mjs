/**
 * Static server for website/dist, for local preview and tests.
 *   node website/serve.mjs [port]          BASE=/rofit/ to serve under a sub-path
 *   THROTTLE=400 node website/serve.mjs    adds latency (ms) and ~50 KB/s bandwidth per response, to test slow networks
 * Sends the same security headers we recommend for production (see website/README.md).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), 'dist');
const port = Number(process.argv[2] || process.env.PORT || 4321);
const BASE = (process.env.BASE || '/').replace(/\/?$/, '/');
const THROTTLE = Number(process.env.THROTTLE || 0);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.json': 'application/json' };
const HEADERS = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'DENY', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let p = decodeURIComponent(url.pathname);
  if (!p.startsWith(BASE)) { res.writeHead(404); return res.end('not under base'); }
  p = normalize(p.slice(BASE.length)).replace(/^(\.\.[/\\])+/, '');
  let file = join(dist, p);
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch { /* 404 below */ }
  let body, status = 200;
  try { body = await readFile(file); } catch { body = await readFile(join(dist, '404.html')); status = 404; file = '404.html'; }
  const type = TYPES[extname(file)] || 'application/octet-stream';
  const cache = /\/assets\//.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache';
  if (THROTTLE) await sleep(THROTTLE);
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': cache, ...HEADERS });
  if (!THROTTLE) return res.end(body);
  for (let i = 0; i < body.length; i += 5000) { res.write(body.subarray(i, i + 5000)); await sleep(100); }
  res.end();
}).listen(port, () => console.log(`RoFit website on http://localhost:${port}${BASE}${THROTTLE ? ` (throttled ${THROTTLE}ms)` : ''}`));
