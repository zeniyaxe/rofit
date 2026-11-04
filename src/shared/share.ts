/**
 * Share links: a snapshot of one outfit packed into the URL fragment of https://rofit.site/o/#…
 * The fragment never reaches a server (browsers don't send it), so rofit.site stores nothing and sees nothing.
 * Used by the extension (encode, and decode when importing) and by the website's viewer (decode).
 *
 * Wire format v1: "1." + base64url(deflate-raw(JSON array)) — see pack()/unpack() for the array layout.
 * Everything decoded is untrusted: strict types, length caps, and images only from Roblox's CDN.
 */
import type { BodyColors, BodyScale } from './types.ts';

export const SHARE_BASE = 'https://rofit.site/o/';
export const THUMB_HOST = 'https://tr.rbxcdn.com/';
const MAX_ITEMS = 80;
const MAX_NAME = 120;
const MAX_ENCODED = 24_000;
const MAX_JSON = 96_000;

export interface SharedItem { id: number; name: string; typeId: number; thumb?: string }
export interface SharedOutfit {
  user: { id: number; name: string };
  outfit: { id: number; name: string };
  avatarType: 'R6' | 'R15';
  bodyColors: BodyColors;
  scale: BodyScale;
  items: SharedItem[];
  /** Full-body render, Roblox CDN only. */
  thumb?: string;
  /** When the snapshot was taken (ms). */
  at: number;
}

const PARTS: (keyof BodyColors)[] = ['head', 'torso', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg'];
const SCALES: (keyof BodyScale)[] = ['height', 'width', 'head', 'depth', 'proportion', 'bodyType'];

/** Keeps only the path of a Roblox CDN image URL; anything else is dropped rather than shared. */
export function thumbPath(url: string | null | undefined): string | undefined {
  if (!url || !url.startsWith(THUMB_HOST)) return undefined;
  const p = url.slice(THUMB_HOST.length);
  return /^[A-Za-z0-9._\-/]{1,200}$/.test(p) && !p.includes('..') ? p : undefined;
}
export const thumbUrl = (path: string | undefined) => (path ? THUMB_HOST + path : undefined);

const clip = (s: string, n = MAX_NAME) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
const round = (n: number) => Math.round(n * 1000) / 1000;

function pack(o: SharedOutfit): unknown[] {
  return [
    1,
    o.user.id, clip(o.user.name, 40),
    o.outfit.id, clip(o.outfit.name),
    o.avatarType === 'R6' ? 0 : 1,
    PARTS.map((k) => o.bodyColors[k]).join(''),
    SCALES.map((k) => round(o.scale[k])),
    o.items.slice(0, MAX_ITEMS).map((it) => {
      const t = thumbPath(it.thumb);
      return t ? [it.id, it.typeId, clip(it.name), t] : [it.id, it.typeId, clip(it.name)];
    }),
    thumbPath(o.thumb) ?? 0,
    Math.round(o.at / 1000),
  ];
}

export class ShareError extends Error {}
const fail = (why: string): never => { throw new ShareError(why); };
const isId = (v: unknown): v is number => typeof v === 'number' && Number.isSafeInteger(v) && v > 0;
const isStr = (v: unknown, max = MAX_NAME): v is string => typeof v === 'string' && v.length <= max;

function unpack(a: unknown): SharedOutfit {
  if (!Array.isArray(a) || a[0] !== 1) fail('Unsupported share format.');
  const [, uid, uname, oid, oname, at6, colors, scales, items, thumb, at] = a as unknown[];
  if (!isId(uid) || !isStr(uname, 60) || !isId(oid) || !isStr(oname)) fail('The link is missing the outfit or its owner.');
  if (typeof colors !== 'string' || !/^[0-9A-Fa-f]{36}$/.test(colors)) fail('Body colors are malformed.');
  if (!Array.isArray(scales) || scales.length !== 6 || !scales.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= -1 && n <= 5)) fail('Body scale is malformed.');
  if (!Array.isArray(items) || items.length > MAX_ITEMS) fail('The item list is malformed.');
  if (typeof at !== 'number' || !Number.isFinite(at) || at < 0) fail('The snapshot date is malformed.');
  const out: SharedItem[] = [];
  for (const it of items as unknown[]) {
    if (!Array.isArray(it) || it.length < 3 || it.length > 4) fail('An item is malformed.');
    const [id, typeId, name, t] = it as unknown[];
    if (!isId(id) || typeof typeId !== 'number' || !Number.isInteger(typeId) || typeId < 0 || typeId > 1000 || !isStr(name)) fail('An item is malformed.');
    if (t !== undefined && (typeof t !== 'string' || thumbPath(THUMB_HOST + t) !== t)) fail('An item image is not from Roblox.');
    out.push({ id: id as number, typeId: typeId as number, name: name as string, ...(t ? { thumb: THUMB_HOST + t } : {}) });
  }
  if (thumb !== 0 && (typeof thumb !== 'string' || thumbPath(THUMB_HOST + thumb) !== thumb)) fail('The outfit image is not from Roblox.');
  const c = (colors as string).toUpperCase();
  const bodyColors = Object.fromEntries(PARTS.map((k, i) => [k, c.slice(i * 6, i * 6 + 6)])) as unknown as BodyColors;
  const scale = Object.fromEntries(SCALES.map((k, i) => [k, (scales as number[])[i]])) as unknown as BodyScale;
  return {
    user: { id: uid as number, name: uname as string }, outfit: { id: oid as number, name: oname as string },
    avatarType: at6 === 0 ? 'R6' : 'R15', bodyColors, scale, items: out,
    thumb: typeof thumb === 'string' ? THUMB_HOST + thumb : undefined, at: (at as number) * 1000,
  };
}

// ---- bytes <-> base64url, deflate-raw via the platform's streams (Chrome 103+, Node 21+) ----------
function toB64url(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function fromB64url(s: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]*$/.test(s)) fail('The link contains characters a share link never has.');
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
async function pipe(bytes: Uint8Array, t: CompressionStream | DecompressionStream, limit: number): Promise<Uint8Array> {
  const reader = new Blob([bytes as BlobPart]).stream().pipeThrough(t as unknown as TransformStream<Uint8Array, Uint8Array>).getReader();
  const chunks: Uint8Array[] = [];
  let n = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    n += value.length;
    // Refuse anything that inflates past what a real outfit could need (zip-bomb guard).
    if (n > limit) { await reader.cancel(); fail('The link is too large to be an outfit.'); }
    chunks.push(value);
  }
  const out = new Uint8Array(n);
  let o = 0;
  for (const c of chunks) { out.set(c, o); o += c.length; }
  return out;
}

export async function encodeShare(o: SharedOutfit): Promise<string> {
  const json = new TextEncoder().encode(JSON.stringify(pack(o)));
  const z = await pipe(json, new CompressionStream('deflate-raw'), MAX_JSON);
  return '1.' + toB64url(z);
}

export async function decodeShare(payload: string): Promise<SharedOutfit> {
  const p = payload.trim();
  if (!p.startsWith('1.')) fail('This isn’t a RoFit share link, or it was made by a newer version.');
  if (p.length > MAX_ENCODED) fail('The link is too large to be an outfit.');
  let text: string;
  try {
    const bytes = await pipe(fromB64url(p.slice(2)), new DecompressionStream('deflate-raw'), MAX_JSON);
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch (e) {
    if (e instanceof ShareError) throw e;
    fail('The link is damaged. Ask for it to be copied again.');
  }
  let json: unknown;
  try { json = JSON.parse(text!); } catch { fail('The link is damaged. Ask for it to be copied again.'); }
  return unpack(json);
}

/** Accepts a full URL (https://rofit.site/o/#1.…), a bare fragment (#1.…) or the payload itself. */
export function payloadFrom(input: string): string | null {
  const s = input.trim();
  const m = /^(?:https:\/\/(?:www\.)?rofit\.site\/o\/?)?#?(1\.[A-Za-z0-9_-]+)$/.exec(s);
  return m ? m[1] : null;
}

export const shareUrl = (payload: string) => `${SHARE_BASE}#${payload}`;
