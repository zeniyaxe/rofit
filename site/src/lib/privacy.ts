/**
 * Privacy facts, derived at build time from the extension's own files (manifest + source), never typed by hand.
 * The permission wording lives here; scripts/check-claims.mjs fails the build if the manifest and these descriptions disagree.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const repo = resolve(process.cwd(), '..');
const manifest = JSON.parse(readFileSync(join(repo, 'public/manifest.json'), 'utf8'));
const pkg = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8'));

export const PERMISSION_WORDS: Record<string, { name: string; why: string }> = {
  storage: { name: 'Store data on this device', why: 'Keeps your settings and the outfits you save in the browser’s own storage. Nothing in it is sent anywhere.' },
  alarms: { name: 'Run a daily cleanup', why: 'Wakes the extension once a day to delete cached data that is too old. Nothing is sent anywhere.' },
  activeTab: { name: 'Work on the tab you click from', why: 'Lets the toolbar button open the workspace for the Roblox profile you are looking at, only when you click it.' },
};

export const HOST_WORDS: Record<string, string> = {
  'https://avatar.roblox.com/*': 'Roblox’s avatar service: a player’s saved outfits and what each one contains.',
  'https://thumbnails.roblox.com/*': 'Roblox’s image service: outfit and item pictures.',
  'https://catalog.roblox.com/*': 'Roblox’s catalog: item names, creators and prices.',
  'https://economy.roblox.com/*': 'Roblox’s economy service: item prices and resale values.',
  'https://inventory.roblox.com/*': 'Roblox’s inventory service: whether you own an item.',
  'https://users.roblox.com/*': 'Roblox’s user service: a player’s name and id.',
};

function walk(dir: string, out: string[] = []): string[] {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(n)) out.push(p);
  }
  return out;
}

const files = walk(join(repo, 'src'));
const read = (f: string) => readFileSync(f, 'utf8');
const rel = (f: string) => relative(repo, f).replace(/\\/g, '/');

/** Source files that can start a network request, with how many call sites each has. */
export const networkCallSites = files
  .map((f) => ({ file: rel(f), n: (read(f).match(/\bfetch\s*\(/g) ?? []).length }))
  .filter((x) => x.n > 0);

/** Every distinct https host written anywhere in the source, so a new one cannot slip in unnoticed. */
export const hostsInSource = [...new Set(files.flatMap((f) => [...read(f).matchAll(/https?:\/\/([a-z0-9.-]+)/gi)].map((m) => m[1].toLowerCase())))].sort();

const BANNED = [/sendBeacon/, /XMLHttpRequest/, /WebSocket/, /\beval\s*\(/, /new Function\s*\(/, /document\.cookie/, /chrome\.cookies/, /\bgtag\b|google-analytics|segment\.|mixpanel|sentry|amplitude/i];
export const bannedHits = files.flatMap((f) => BANNED.filter((r) => r.test(read(f))).map((r) => `${rel(f)}: ${r}`));

export const facts = {
  version: pkg.version as string,
  permissions: (manifest.permissions as string[]),
  hostPermissions: (manifest.host_permissions as string[]),
  contentMatches: (manifest.content_scripts as { matches: string[] }[]).flatMap((c) => c.matches),
  csp: manifest.content_security_policy?.extension_pages as string,
  minChrome: manifest.minimum_chrome_version as string,
  hasRemoteCode: /https?:\/\//.test(String(manifest.content_security_policy?.extension_pages ?? '').replace(/'self'/g, '')),
};
