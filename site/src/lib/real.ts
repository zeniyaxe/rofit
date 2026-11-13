/**
 * Build-time view of the real-profile snapshot (public/real/snapshot.json, written by scripts/capture-real.mjs).
 * Every avatar picture on the site comes from here. If the snapshot is missing the build fails loudly rather than
 * falling back to anything invented.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isDisplayAsset } from './display-assets';

export interface Item { id: number; name: string; typeId: number; typeName: string; creator: { name: string; verified: boolean } | null; price: number | null; forSale: boolean; limited: boolean; resolved: boolean; thumb: string | null }
export interface Outfit { id: number; name: string; thumb: string; avatarType?: string; assets: { id: number; name: string; typeName: string }[] }
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

/* ---- RoFit 3.0 editorial helpers ----------------------------------------------------------------------- */

/** Items you can see on a render (animations and emotes are real parts of an outfit, but nothing to point at). */
export const visible = (i: Item) => !/Animation|Emote/.test(i.typeName);

export type PriceTone = 'known' | 'free' | 'off' | 'unknown';
/** What Roblox said about buying this item new on the capture date. Nothing here is estimated. */
export function priceOf(i: Item | undefined): { text: string; tone: PriceTone; aria: string } {
  if (!i || !i.resolved) return { text: 'Unknown', tone: 'unknown', aria: 'Price unknown: Roblox did not return this item' };
  if (i.forSale && i.price === 0) return { text: 'Free', tone: 'free', aria: 'Free' };
  if (i.forSale && i.price != null) return { text: money(i.price), tone: 'known', aria: `${i.price} Robux` };
  if (!i.forSale) return { text: 'Off sale', tone: 'off', aria: 'Off sale: not sold new' };
  return { text: 'Unknown', tone: 'unknown', aria: 'Price unknown' };
}

/** Where a kind of item is worn on Roblox's full-body render, as a fraction of the square image. Approximate by design:
 *  callouts point at the part of the body an item type belongs to, not at pixels. */
const WORN: [RegExp, number, number][] = [
  [/^(Hat|HairAccessory)$/, .5, .14],
  [/^(DynamicHead|Head|Face|FaceAccessory|EyebrowAccessory|EyelashAccessory)$/, .5, .24],
  [/^NeckAccessory$/, .5, .34],
  [/^ShoulderAccessory$/, .36, .37],
  [/^BackAccessory$/, .64, .38],
  [/^(Shirt|TShirt|Torso|JacketAccessory|ShirtAccessory|TShirtAccessory|SweaterAccessory)$/, .5, .46],
  [/^RightArm$/, .35, .48],
  [/^LeftArm$/, .65, .48],
  [/^Gear$/, .29, .52],
  [/^WaistAccessory$/, .5, .58],
  [/^(Pants|PantsAccessory|ShortsAccessory|DressSkirtAccessory)$/, .5, .66],
  [/^RightLeg$/, .44, .75],
  [/^LeftLeg$/, .56, .75],
  [/^(LeftShoeAccessory|RightShoeAccessory)$/, .5, .86],
];
export const wornAt = (typeName: string): [number, number] => {
  const hit = WORN.find(([r]) => r.test(typeName));
  return hit ? [hit[1], hit[2]] : [.5, .5];
};
export const kindOf = (typeName: string) => typeName.replace(/Accessory$/, '').replace(/([a-z])([A-Z])/g, '$1 $2').replace('Dynamic Head', 'Head').replace('T Shirt', 'T-shirt');

export interface Callout { item: Item; ax: number; ay: number; side: 'l' | 'r'; ly: number }

/** Up to `max` callouts for a look: one per body region, a mix of for-sale / off-sale / limited, spread left and right. */
export function callouts(o: Outfit, max = 5): Callout[] {
  const items = knownItems(o).filter(visible);
  const seen = new Set<string>();
  const rank = (i: Item) => (i.limited ? 3 : 0) + (i.forSale && i.price ? 2 : 0) + (/Shirt|Pants|Hat|Hair|Gear|Back|Face/.test(i.typeName) ? 1 : 0);
  const picked: Item[] = [];
  for (const i of [...items].sort((a, b) => rank(b) - rank(a))) {
    const key = wornAt(i.typeName).join(',');
    if (seen.has(key)) continue;
    seen.add(key); picked.push(i);
    if (picked.length === max) break;
  }
  picked.sort((a, b) => wornAt(a.typeName)[1] - wornAt(b.typeName)[1]);
  // One column of cover lines on the right, in body order (head first), spaced so labels never touch.
  const out: Callout[] = picked.map((item) => { const [ax, ay] = wornAt(item.typeName); return { item, ax, ay, side: 'r', ly: ay }; });
  const top = .29, limit = .8; // below the masthead overlap, above the switcher
  const gap = out.length > 1 ? Math.min(.15, (limit - top) / (out.length - 1)) : 0;
  out.forEach((c, n) => { c.ly = Math.max(c.ay, n ? out[n - 1].ly + gap : top); });
  const over = out.length ? out[out.length - 1].ly - limit : 0;
  if (over > 0) out.forEach((c) => { c.ly = Math.max(top, c.ly - over); });
  return out;
}

const COVER_IDS = [1243260966, 2332209305307399, 41057747, 24477597, 6749434067112598];
const ownerOf = new Map(people.flatMap((p) => p.outfits.map((o) => [o.id, p] as const)));
/** The looks the cover cycles through, each with its owner. Falls back to the richest outfits if ids leave the snapshot. */
export const coverLooks = (() => {
  const chosen = COVER_IDS.map((id) => people.flatMap((p) => p.outfits).find((o) => o.id === id)).filter((o): o is Outfit => !!o);
  const list = chosen.length >= 3 ? chosen : people.flatMap((p) => p.outfits).sort((a, b) => knownItems(b).length - knownItems(a).length).slice(0, 5);
  return list.map((o) => ({ outfit: o, owner: ownerOf.get(o.id)!, calls: callouts(o), buyNow: buyNow(o), offSale: knownItems(o).filter((i) => visible(i) && !i.forSale).length, unknown: o.assets.filter((a) => !item(a.id)?.resolved).length }));
})();

/** Stats for a collector card. `known` is false when some prices are unknown, so the total is a lower bound. */
export function cardStats(o: Outfit) {
  const ks = knownItems(o);
  const forSale = ks.filter((i) => i.forSale && i.price != null);
  const unresolved = o.assets.filter((a) => !item(a.id)?.resolved).length;
  return { pieces: o.assets.filter((a) => visible({ typeName: a.typeName } as Item)).length, total: forSale.reduce((n, i) => n + (i.price ?? 0), 0), forSale: forSale.length, offSale: ks.filter((i) => !i.forSale).length, limited: ks.filter((i) => i.limited).length, unresolved };
}
export const ownerOfOutfit = (id: number) => ownerOf.get(id);
