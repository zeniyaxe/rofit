/**
 * Build-time view of the real-profile snapshot (public/real/snapshot.json, written by scripts/capture-real.mjs).
 * Every avatar picture on the site comes from here. If the snapshot is missing the build fails loudly rather than
 * falling back to anything invented.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isDisplayAsset } from './display-assets';

export interface Item { id: number; name: string; typeId: number; typeName: string; creator: { name: string; verified: boolean } | null; price: number | null; forSale: boolean; limited: boolean; resolved: boolean; thumb: string | null }
export interface Outfit { id: number; name: string; thumb: string; assets: { id: number; name: string; typeName: string }[] }
export interface Person { id: number; name: string; displayName: string; headshot: string | null; outfits: Outfit[] }

const file = resolve(process.cwd(), 'public/real/snapshot.json');
if (!existsSync(file)) throw new Error('public/real/snapshot.json is missing. Run: node scripts/capture-real.mjs <userIds…>');
const snap = JSON.parse(readFileSync(file, 'utf8')) as { capturedAt: string; users: Person[]; assets: Record<string, Item> };
if (!snap.users.length) throw new Error('The real-profile snapshot has no users.');

export const capturedAt = snap.capturedAt;
export const capturedLabel = new Date(snap.capturedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
export const people = snap.users.map((person) => ({
  ...person,
  outfits: person.outfits.map((outfit) => ({ ...outfit, assets: outfit.assets.filter(isDisplayAsset) })),
}));
export const item = (id: number): Item | undefined => snap.assets[String(id)];
export const money = (n: number) => 'R$ ' + n.toLocaleString('en-US');

/** Items of an outfit that Roblox resolved and that have a picture. */
export const knownItems = (o: Outfit) => o.assets.map((a) => item(a.id)).filter((i): i is Item => !!i && i.resolved && !!i.thumb);

/** What it costs to buy, today, the items that are for sale (Roblox's own numbers on the capture date). */
export const buyNow = (o: Outfit) => knownItems(o).filter((i) => i.forSale && i.price).reduce((n, i) => n + (i.price ?? 0), 0);

const person = people.reduce((a, b) => (b.outfits.length > a.outfits.length ? b : a));
export const star = person;

const richness = (o: Outfit) => Math.min(knownItems(o).length, 5) * 3 + knownItems(o).filter((i) => i.forSale && i.price).length * 6 - (o.assets.length > 8 ? 5 : 0);
const originalOutfits = snap.users.find((user) => user.id === person.id)!.outfits;
const compact = originalOutfits.filter((o) => o.assets.length <= 7);
const ranked = [...(compact.length ? compact : originalOutfits)].sort((a, b) => richness(b) - richness(a));
/** The outfit the story follows: lots of resolvable, picture-having items. */
export const hero = person.outfits.find((outfit) => outfit.id === ranked[0].id)!;

/** The pair with the most items in common, for the Compare scene. */
export const pair: [Outfit, Outfit] = (() => {
  let best: [Outfit, Outfit] = [person.outfits[0], person.outfits[1] ?? person.outfits[0]], score = -1;
  for (const a of person.outfits) for (const b of person.outfits) {
    if (a.id >= b.id) continue;
    const A = new Set(a.assets.map((x) => x.id)); const shared = b.assets.filter((x) => A.has(x.id)).length;
    const s = shared * 3 - Math.abs(a.assets.length - b.assets.length);
    if (shared && s > score) { score = s; best = [a, b]; }
  }
  return best;
})();
