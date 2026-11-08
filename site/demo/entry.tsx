/**
 * The website demo: RoFit's real Shell (src/ui) mounted in a shadow root, fed by demo/shim-rpc.ts.
 * Loaded lazily when the demo section nears the viewport.
 */
import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import css from '../../src/ui/styles.css';
import demoCss from './demo.css';
import { Shell } from '../../src/ui/Shell.tsx';
import { resolveTheme, themeVars } from '../../src/ui/theme.ts';
import { DEFAULTS, setDemoSettings } from './shim-settings.ts';
import { renderCard } from '../../src/ui/shareCard.ts';
import { USERS, ITEM, allOutfits, detailsOf, assetRec, outfitUri, itemUri } from './fixtures.ts';
import { summarizePrices } from '../../src/shared/analysis.ts';
import { loadReal, realUser, realUsers, capturedAt, realOutfit, realDetails, realAssetRec } from './real.ts';
import { PRIVATE_ID } from './shim-rpc.ts';
import type { AssetView } from '../../src/shared/types.ts';

export interface DemoOptions { userId: number; theme: 'light' | 'dark'; reduced: boolean }

function Frame({ o }: { o: DemoOptions }) {
  const user = o.userId === PRIVATE_ID ? { id: PRIVATE_ID, name: 'quiet' } : (realUser(o.userId) ?? { id: o.userId, name: 'unavailable' });
  const vars = themeVars(resolveTheme({ ...DEFAULTS, appearance: o.theme, motion: o.reduced ? 'reduced' : 'full' }, false));
  const [note, setNote] = useState('');
  useEffect(() => { setDemoSettings({ motion: o.reduced ? 'reduced' : 'full' }); }, [o.reduced]);
  useEffect(() => {
    let t = 0;
    const f = (e: Event) => { setNote((e as CustomEvent<string>).detail); clearTimeout(t); t = window.setTimeout(() => setNote(''), 3200); };
    window.addEventListener('rofit-demo-note', f);
    return () => { window.removeEventListener('rofit-demo-note', f); clearTimeout(t); };
  }, []);
  return (
    <div class={'rf rf-demo' + (o.reduced ? ' rm' : '')} style={vars as any}>
      <Shell key={user.id} userId={user.id} userName={user.name} standalone />
      {note && <div class="rf-demo-note" role="status">{note}</div>}
    </div>
  );
}

export async function mountDemo(host: HTMLElement, o: DemoOptions) {
  await loadReal();
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
  let mount = shadow.querySelector<HTMLElement>('[data-demo-mount]');
  if (!mount) {
    const style = document.createElement('style');
    style.textContent = css + demoCss;
    mount = document.createElement('div');
    mount.dataset.demoMount = '';
    mount.style.cssText = 'height:100%';
    shadow.append(style, mount);
  }
  render(<Frame o={o} />, mount);
  return { update: (n: DemoOptions) => render(<Frame o={n} />, mount!), unmount: () => render(null, mount!) };
}

/** Draws the share card for a real captured outfit with RoFit's own renderer (used by the site's "Save as image"). */
export async function makeCard(outfitId: number, root: Element): Promise<Blob> {
  await loadReal();
  const r = realOutfit(outfitId);
  if (!r) throw new Error('That outfit is not in the snapshot.');
  const d = realDetails(r.o);
  const views: AssetView[] = d.assets.map((a) => { const rec = realAssetRec(a.id); return { id: a.id, provenance: rec ? 'cached' : 'unknown', rec, ref: a } as AssetView; });
  const sum = summarizePrices(views);
  const money = (n: number) => 'R$ ' + n.toLocaleString('en-US');
  return renderCard(root, {
    title: r.o.name, owner: r.u.displayName, meta: d.avatarType + ' · ' + d.assets.length + ' items', avatarUrl: r.o.thumb,
    items: d.assets.map((a) => { const rec = realAssetRec(a.id); return { name: rec?.name ?? a.name, sub: a.assetTypeName.replace(/Accessory$/, ''), price: !rec ? undefined : rec.isOffSale ? undefined : rec.isFree ? 'Free' : rec.price != null ? money(rec.price) : undefined, flag: rec && rec.isOffSale ? 'off sale' : undefined, thumb: rec?.thumb }; }),
    total: sum.buyCount > 0 ? money(sum.buyNow) : 'Free', totalNote: 'to buy new today',
  });
}
export { renderCard };

/** Real public profiles available in the dated snapshot (empty when none were captured). */
export async function realProfiles() {
  await loadReal();
  return { capturedAt: capturedAt(), users: realUsers().map((u) => ({ id: u.id, name: u.name, displayName: u.displayName, count: u.outfits.length, headshot: u.headshot })) };
}
