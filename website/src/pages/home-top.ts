import { renderFigure } from '../demo/art.ts';
import { ITEM } from '../demo/fixtures.ts';
import { arrow, esc, type Ctx } from './lib.ts';
import { BOOT_L, BOOT_R, COAT, HAIR, HAT, JEANS, PACK, SCARF, heroSum, heroViews, outfit, priceKind, robux, tagFor, thumb, typeName, wardrobe } from './sample.ts';

/** How far each part travels when the figure comes apart (SVG user units) and when it starts (progress 0..1). */
const EXPLODE: Record<string, { dx: number; dy: number; s: number }> = {
  [HAT]: { dx: 0, dy: -24, s: 0 }, [HAIR]: { dx: 0, dy: -10, s: 0.04 }, [SCARF]: { dx: -38, dy: 0, s: 0.09 },
  [COAT]: { dx: 42, dy: -2, s: 0.13 }, [PACK]: { dx: -48, dy: 10, s: 0.17 }, [JEANS]: { dx: 36, dy: 4, s: 0.21 },
  [BOOT_L]: { dx: -16, dy: 16, s: 0.25 }, [BOOT_R]: { dx: 16, dy: 16, s: 0.27 },
};

function heroFigure(): string {
  const svg = renderFigure({ skin: outfit.skin, avatarType: outfit.avatarType, items: outfit.items.map((id) => ({ id, art: ITEM.get(id)!.art })) },
    { split: true, prefix: 'hero', label: `Sample outfit “${outfit.name}”, taken apart into its items` });
  return svg.replace(/<g class="part" data-part="(\w+)">/g, (m, id) => {
    const e = EXPLODE[id];
    return e ? `<g class="part" data-part="${id}" style="--dx:${e.dx};--dy:${e.dy};--s:${e.s}">` : m;
  });
}

/** Callouts: position (% of the stage) and side. Wording comes from the item data and RoFit's priceKind(). */
export const CALLOUTS: { id: number; ax: number; ay: number; side: 'l' | 'r'; label?: string; k?: string }[] = [
  { id: HAT, ax: 134, ay: 20, side: 'r' },
  { id: HAIR, ax: 70, ay: 42, side: 'l' },
  { id: SCARF, ax: 40, ay: 86, side: 'l' },
  { id: COAT, ax: 184, ay: 92, side: 'r' },
  { id: PACK, ax: 22, ay: 124, side: 'l' },
  { id: JEANS, ax: 166, ay: 150, side: 'r' },
  { id: BOOT_L, ax: 74, ay: 196, side: 'l', label: 'Rain boots, L + R', k: 'Shoes' },
];
/** Anchor (SVG user units, after explosion) → % of the stage. Must match .spec-fig's box in site.css (62% wide, centred). */
const FIG = { w: 62, aspect: 1.02 };
const toPct = (ax: number, ay: number) => {
  const left = (100 - FIG.w) / 2, h = FIG.w / FIG.aspect, top = (100 - h) / 2;
  return { x: left + (ax / 200) * FIG.w, y: top + (ay / 200) * h };
};
/** Small screens get a legend under the figure instead of callouts around it (no room for leader lines). */
function legend(): string {
  return `<ul class="legend" aria-hidden="true">${CALLOUTS.map((c, i) => {
    const v = heroViews.find((x) => x.id === c.id)!;
    const pk = priceKind(v);
    const [cls, word] = tagFor(v.provenance);
    const price = pk.kind === 'onsale' ? (c.id === BOOT_L ? `2 × ${robux(pk.amount!)}` : robux(pk.amount!)) : 'not counted';
    return `<li style="--s:${(0.1 + i * 0.06).toFixed(2)}"><span class="dot ${cls}"></span><b>${esc(c.label ?? ITEM.get(c.id)!.name)}</b><span>${word} · ${esc(price)}</span></li>`;
  }).join('')}</ul>`;
}

function callouts(): string {
  return CALLOUTS.map((c) => {
    const v = heroViews.find((x) => x.id === c.id)!;
    const it = ITEM.get(c.id)!;
    const pk = priceKind(v);
    const [cls, word] = tagFor(v.provenance);
    const price = pk.kind === 'onsale' ? (c.id === BOOT_L ? `2 × ${robux(pk.amount!)}` : robux(pk.amount!)) : v.provenance === 'last-known' ? 'not counted' : pk.kind;
    const s = (EXPLODE[c.id]?.s ?? 0) + 0.02;
    const { x, y } = toPct(c.ax, c.ay);
    return `<div class="callout ${c.side}" style="--x:${(x + (c.side === 'r' ? 1 : -1) * 4.5).toFixed(1)}%;--y:${y.toFixed(1)}%;--s:${s.toFixed(2)}"><span class="lead"></span><span class="k">${esc(c.k ?? typeName(it.type))}</span><b>${esc(c.label ?? it.name)}</b><span class="v"><span class="tag ${cls}">${word}</span>${esc(price)}</span></div>`;
  }).join('\n        ');
}

export function hero(c: Ctx): string {
  const words = (s: string, start: number) => s.split(' ').map((w, i) => `<span class="w" style="--i:${start + i}">${esc(w)}</span>`).join(' ');
  return `<section class="hero" data-mode="static" style="--p:1" aria-labelledby="hero-h">
  <div class="hero-stage wrap">
    <div class="hero-copy">
      <span class="eyebrow">Browser extension for Roblox profiles</span>
      <h1 id="hero-h">${words('Every saved outfit,', 0)} <span class="apart">${words('taken apart.', 3)}</span></h1>
      <p class="lede">RoFit opens the outfits someone has saved on their Roblox profile and shows every item in them, what each costs today, and exactly how sure it is about that.</p>
      <div class="hero-cta"><a class="btn blue" href="#demo" data-open-demo>Try the live demo ${arrow}</a><a class="btn ghost" href="#install">Install free</a></div>
      <p class="hero-meta"><span>Open source</span><span>Read-only</span><span>No tracking</span><span>v${esc(c.facts.version)}</span></p>
    </div>
    <div class="spec">
      <div class="spec-inner">
        <div class="spec-grid" aria-hidden="true"></div><div class="spec-ruler" aria-hidden="true"></div>
        <div class="spec-label"><span class="tag solid">Sample outfit</span><span class="mono">“${esc(outfit.name)}” · illustrated states</span></div>
        <div class="spec-fig">${heroFigure()}</div>
        <div class="callouts" aria-hidden="true">
        ${callouts()}
        </div>
      </div>
      ${legend()}
      <div class="receipt" role="group" aria-label="Sample total">
        <p class="rh"><span>RoFit total</span><span>sample</span></p>
        <dl>
          <dt>Buy now · ${heroSum.buyCount} items</dt><dd>${robux(heroSum.buyNow)}</dd>
          <dt>Free</dt><dd>${heroSum.free} items</dd>
          <dt>Resale</dt><dd>${heroSum.resaleCount ? robux(heroSum.resale) : 'none'}</dd>
          <dt>Price unknown</dt><dd>${heroSum.unknown}</dd>
          <dt class="tot">To buy it new</dt><dd class="tot">${robux(heroSum.buyNow)}</dd>
        </dl>
        <p class="note">The backpack is “last known”: Roblox stopped returning it, so it isn’t counted or guessed.</p>
      </div>
    </div>
    <div class="scroll-cue" aria-hidden="true">Scroll<i></i></div>
  </div>
</section>`;
}

export function sortSection(): string {
  const saved = wardrobe.outfits.filter((o) => o.editable).slice(0, 4);
  const presets = wardrobe.outfits.filter((o) => !o.editable);
  // Roblox's list interleaves them; this is the order they arrive in before RoFit sorts them.
  const mixed = [saved[0], presets[0], saved[1], saved[2], presets[1], saved[3], presets[2]];
  const chip = (o: (typeof saved)[0], sub: string, cls = '') =>
    `<li class="chip${cls}" data-to data-order="${mixed.indexOf(o)}"><img class="th" src="${thumb(o)}" alt="" width="40" height="40"><span>${esc(o.name)}<small>${sub}</small></span></li>`;
  const never = [['Bundles', 'items sold together'], ['What they’re wearing', 'their current avatar'], ['Their inventory', 'things they own'], ['Catalog favorites', 'things they liked']];
  const more = wardrobe.outfits.filter((o) => o.editable).length - saved.length;
  return `<section class="sec" id="how" aria-labelledby="how-h">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow reveal">01 · What counts</span><h2 id="how-h" class="reveal" style="--d:1">Only what they actually saved.</h2></div>
      <p class="reveal" style="--d:2">Roblox’s outfit list mixes the outfits a person saved with presets Roblox gives every account. RoFit shows the saved ones, keeps the presets one switch away, and never fills a gap with something that isn’t an outfit.</p>
    </div>
    <div class="sort reveal" data-sorted="true">
      <div class="sort-col"><h3>Saved outfits</h3><p>Shown. Made and saved by this person.</p><ul class="chips" data-pile>${saved.map((o) => chip(o, 'saved · editable')).join('')}<li class="chip muted more">+ ${more} more</li></ul></div>
      <div class="sort-col"><h3>Roblox presets</h3><p>Set aside. Same list, supplied by Roblox.</p><ul class="chips">${presets.map((o) => chip(o, 'preset · not editable', ' muted')).join('')}</ul></div>
      <div class="sort-col"><h3>Never substituted</h3><p>Not outfits, so RoFit doesn’t pass them off as outfits.</p><ul class="chips">${never.map(([a, b]) => `<li class="chip out"><span class="th" aria-hidden="true"></span><span>${a}<small>${b}</small></span></li>`).join('')}</ul></div>
    </div>
    <p class="sort-foot"><span class="mono">sample profile “${esc(wardrobe.name)}” · invented data</span><button class="btn sm ghost" type="button" data-replay hidden>Sort again</button></p>
    <div class="two empty-note">
      <div class="reveal"><h3>When a profile shows no outfits</h3><p>Since November 2025, Roblox lets people limit who sees their saved outfits, so an empty list can mean “none” or “hidden from you”. RoFit shows what Roblox actually answered, including its own refusal text, and stops there.</p></div>
      <div class="reveal" style="--d:1"><h3>It never works around privacy</h3><p>No older endpoints, no other accounts, no guessing from inventory. If Roblox says no, RoFit tells you Roblox said no.</p></div>
    </div>
  </div>
</section>`;
}