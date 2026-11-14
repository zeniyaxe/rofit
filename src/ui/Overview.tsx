import { useMemo } from 'preact/hooks';
import type { AccessState } from '../shared/access.ts';
import type { AssetRec, OutfitDetails, OutfitRec } from '../shared/types.ts';
import { wardrobeOverview } from '../shared/overview.ts';
import { Ico } from './icons.tsx';
import { Figure } from './primitives.tsx';
import { MOD } from './Palette.tsx';
import { costFigure, nf, plural } from './format.ts';

const Hints = () => (
  <p class="rf-ov-keys">
    Shift-click or <kbd class="rf-kbd">Space</kbd> selects several. <kbd class="rf-kbd">{MOD} K</kbd> jumps anywhere, <kbd class="rf-kbd">?</kbd> lists shortcuts.
  </p>
);

/**
 * The inspector pane before an outfit is picked: a short wardrobe read-out from what RoFit already has (no requests).
 * Each line only appears once its data exists, so an unread profile shows little more than the count and the hints.
 */
export function WardrobeOverview({ userName, outfits, presetsHidden, details, recs, access, showPrices, onOpen, onFilterItem }: {
  userName: string; outfits: OutfitRec[]; presetsHidden: number; details: Map<number, OutfitDetails>; recs: Map<number, AssetRec>;
  access?: AccessState; showPrices: boolean; onOpen: (o: OutfitRec) => void; onFilterItem: (f: { id: number; name: string }) => void;
}) {
  const ov = useMemo(() => wardrobeOverview({ outfits, presetsHidden, details, recs, access }), [outfits, presetsHidden, details, recs, access]);
  const byId = useMemo(() => new Map(outfits.map((o) => [o.id, o])), [outfits]);
  if (!ov) {
    return (
      <div class="rf-dock-hint">
        <Ico n="outfit" size={28} />
        <p>Pick an outfit to see what it’s made of.</p>
        <Hints />
      </div>
    );
  }
  const types = [ov.types.R15 && `${nf.format(ov.types.R15)} R15`, ov.types.R6 && `${nf.format(ov.types.R6)} R6`, ov.types.other && `${nf.format(ov.types.other)} other`].filter(Boolean).join(' · ');
  const pricesKnown = showPrices && ov.priced > 0 && (ov.priciest || ov.cheapest);
  const open = (id: number) => { const o = byId.get(id); if (o) onOpen(o); };
  return (
    <section class="rf-ov" aria-label={`${userName}’s wardrobe`}>
      <p class="rf-ov-k">Wardrobe</p>
      <h3 class="rf-ov-h"><span class="rf-ov-n">{nf.format(ov.outfits)}</span> saved {ov.outfits === 1 ? 'outfit' : 'outfits'}</h3>
      <p class="rf-ov-sub">
        {ov.read === 0 ? 'Not read yet: contents, types and prices appear once RoFit reads them.'
          : <>{types}{ov.read < ov.outfits && <span class="rf-ov-part" title="Avatar types are known only for outfits RoFit has read"> · {nf.format(ov.read)} of {nf.format(ov.outfits)} read</span>}</>}
        {ov.presetsHidden > 0 && <><br /><span class="rf-muted">{plural(ov.presetsHidden, 'Roblox preset')} hidden</span></>}
      </p>

      {pricesKnown && (
        <dl class="rf-ov-dl">
          {ov.priciest && <>
            <dt>Highest known</dt>
            <dd><button class="rf-linkbtn rf-ov-o" onClick={() => open(ov.priciest!.id)}>{ov.priciest.name || 'Untitled'}</button><Figure f={costFigure(ov.priciest.cost)} /></dd>
          </>}
          {ov.cheapest && <>
            <dt>Lowest</dt>
            <dd><button class="rf-linkbtn rf-ov-o" onClick={() => open(ov.cheapest!.id)}>{ov.cheapest.name || 'Untitled'}</button><Figure f={costFigure(ov.cheapest.cost)} /></dd>
          </>}
          <dt>Buyable new</dt>
          <dd><span>{nf.format(ov.buyable)} of {nf.format(ov.priced)} priced</span></dd>
        </dl>
      )}

      {ov.reused.length > 0 && (
        <div class="rf-ov-re">
          <p class="rf-ov-k">Most worn pieces</p>
          <ul>
            {ov.reused.map((r) => (
              <li key={r.id}>
                <button class="rf-ov-item" onClick={() => onFilterItem({ id: r.id, name: r.name })} title={`Show the outfits with ${r.name}`}>
                  <span class="rf-ithumb">{recs.get(r.id)?.thumb ? <img src={recs.get(r.id)!.thumb} alt="" loading="lazy" /> : <Ico n="boxes" size={15} />}</span>
                  <span class="rf-item-t"><span class="rf-item-name">{r.name}</span><span class="rf-item-sub">{r.typeName}</span></span>
                  <span class="rf-ov-c">{nf.format(r.count)} outfits</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div class="rf-ov-foot">
        <p><Ico n="outfit" size={16} />Pick an outfit to see what it’s made of.</p>
        <Hints />
      </div>
    </section>
  );
}
