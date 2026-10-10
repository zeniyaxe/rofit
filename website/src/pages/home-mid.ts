import type { Provenance } from '../../../src/shared/types.ts';
import { renderItem, svgUrl } from '../demo/art.ts';
import { ITEM } from '../demo/fixtures.ts';
import { esc } from './lib.ts';
import { COAT, heroProv, heroSum, outfit, priceKind, robux, summarizePrices, tagFor, thumb, view, wardrobe } from './sample.ts';

export function demoSection(): string {
  const saved = wardrobe.outfits.filter((o) => o.editable);
  return `<section class="sec demo-sec" id="demo" aria-labelledby="demo-h">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow reveal">02 · Try it</span><h2 id="demo-h" class="reveal" style="--d:1">The real extension, on a pretend profile.</h2></div>
      <p class="reveal" style="--d:2">This is RoFit’s actual interface and data code, running in the page against a sample Roblox we invented. It never contacts Roblox and stores nothing. Click the hanger or <b>Outfits</b> to start.</p>
    </div>
  </div>
  <div class="demo-wrap">
    <div id="demo-root">
      <div class="demo-fallback">
        <p>The interactive demo needs JavaScript. These are the sample outfits it uses (invented, not from Roblox):</p>
        ${saved.map((o) => `<figure><img class="th" src="${thumb(o)}" alt="" width="120" height="120" loading="lazy"><figcaption>${esc(o.name)}</figcaption></figure>`).join('\n        ')}
      </div>
    </div>
    <p class="sr" aria-live="polite" data-demo-status></p>
  </div>
  <div class="wrap">
    <div class="demo-notes">
      <div><b>Sample data, labelled</b>Every user, outfit, item and price in the demo is made up. None of it is a real Roblox item or price.</div>
      <div><b>The same code as the extension</b>The sheet is RoFit’s own interface and service code. Only storage, settings, messaging and the network are swapped for in-page stand-ins.</div>
      <div><b>Break it on purpose</b>Use the panel to go offline, trigger a rate limit, open a private profile, or change an item, and watch how RoFit reports it.</div>
    </div>
  </div>
</section>`;
}

const STATES: { p: Provenance; title: string; desc: string; sub: string; say: string }[] = [
  { p: 'live', title: 'Roblox just answered.', desc: 'Fetched moments ago: the price Roblox gives right now.', sub: 'Seen just now', say: 'Roblox answered a moment ago. The price counts toward the buy-now total.' },
  { p: 'cached', title: 'Answered recently, not re-asked.', desc: 'Kept for a few minutes (you choose how long) so RoFit doesn’t ask Roblox the same thing twice.', sub: 'Seen 12 min ago (cached)', say: 'From RoFit’s cache: Roblox gave this price 12 minutes ago. It still counts, and a refresh asks again.' },
  { p: 'last-known', title: 'Roblox stopped returning it.', desc: 'Usually deleted or moderated. RoFit shows what it saw earlier, says when, and leaves the price out.', sub: 'Unavailable · last seen 3 days ago', say: 'Roblox no longer returns this item. RoFit shows what it saw 3 days ago and leaves the price out of the total.' },
  { p: 'unknown', title: 'Never seen, nothing returned.', desc: 'Only the name and type from the outfit itself are known. Counted as unknown, never guessed.', sub: 'No data · name and type only', say: 'Roblox returned nothing and RoFit has never seen it. The price is counted as unknown, not guessed.' },
];

export function honestySection(): string {
  const coat = ITEM.get(COAT)!;
  const btn = (s: (typeof STATES)[0], i: number) => {
    const views = outfit.items.map((id) => view(id, id === COAT ? s.p : heroProv.get(id) ?? 'live'));
    const sum = summarizePrices(views);
    const pk = priceKind(views.find((v) => v.id === COAT)!);
    const [cls, word] = tagFor(s.p);
    const price = s.p === 'unknown' ? '' : robux(coat.price!);
    return `<button class="state-btn" type="button" aria-pressed="${i === 0}" data-state="${s.p}" data-tag="${word}" data-tag-class="${cls}" data-sub="${esc(s.sub)}" data-price="${esc(price)}" data-counted="${pk.kind === 'onsale'}" data-say="${esc(s.say)}" data-total="${esc(robux(sum.buyNow))}" data-count="${sum.buyCount}" data-unknown="${sum.unknown}"><span><span class="tag ${cls}">${word}</span></span><p><b>${s.title}</b> ${s.desc}</p></button>`;
  };
  const first = STATES[0];
  return `<section class="sec" id="honesty" aria-labelledby="honesty-h">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow reveal">03 · Data honesty</span><h2 id="honesty-h" class="reveal" style="--d:1">It tells you how sure it is.</h2></div>
      <p class="reveal" style="--d:2">Every item says where its data came from. Totals keep buy-now and resale prices apart, and prices Roblox didn’t give are counted as unknown instead of guessed.</p>
    </div>
    <div class="states">
      <div class="state-list reveal" role="group" aria-label="Provenance states. Choose one to see how the sample item changes.">
        ${STATES.map(btn).join('\n        ')}
      </div>
      <div class="item-card reveal" style="--d:1" data-state="live">
        <div class="item-card-top"><span class="tag solid">Sample item</span><span class="mono">in “${esc(outfit.name)}”</span></div>
        <div class="item-row">
          <img class="th" src="${svgUrl(renderItem(coat.art))}" alt="" width="64" height="64">
          <span><b>${esc(coat.name)}</b><small>${esc(first.sub)}</small> <span class="tag live">Live</span></span>
          <span class="item-price"><span>${robux(coat.price!)}</span></span>
        </div>
        <p class="item-say" aria-live="polite">${esc(first.say)}</p>
        <dl class="item-tot">
          <dt>Outfit total, buy now</dt><dd class="big"><span class="roll" data-k="total">${robux(heroSum.buyNow)}</span></dd>
          <dt>Items in that total</dt><dd><span class="roll" data-k="count">${heroSum.buyCount}</span></dd>
          <dt>Prices unknown</dt><dd><span class="roll" data-k="unknown">${heroSum.unknown}</span></dd>
        </dl>
        <p class="item-foot mono">Totals computed by RoFit’s own summarizePrices() on the sample outfit.</p>
      </div>
    </div>
    <div class="wont">
      <div class="reveal"><h3>When an outfit was made</h3><p>Roblox doesn’t share creation dates or edit history. Any “changed since” is what RoFit saw on your computer.</p></div>
      <div class="reveal" style="--d:1"><h3>A price history</h3><p>RoFit shows today’s price, a limited item’s recent average when Roblox provides one, and changes it saw itself. No made-up charts.</p></div>
      <div class="reveal" style="--d:2"><h3>A guess</h3><p>If Roblox returns no price, RoFit says “unknown” and counts it. Totals are never padded with estimates.</p></div>
      <div class="reveal" style="--d:3"><h3>Hidden outfits</h3><p>When an owner limits who can see their outfits, RoFit shows Roblox’s refusal and nothing else.</p></div>
    </div>
  </div>
</section>`;
}