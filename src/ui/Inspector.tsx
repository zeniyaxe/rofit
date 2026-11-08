import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { AssetView, BodyColors, BodyScale, LibraryEntry, OutfitDetails, Snapshot } from '../shared/types.ts';
import { diffOutfits, groupAssets, priceKind, similarOutfits, summarizePrices, toStudioLua, type ChangeSummary } from '../shared/analysis.ts';
import { typeName } from '../shared/assetTypes.ts';
import { rpc } from '../shared/rpc.ts';
import type { Settings } from '../shared/settings.ts';
import { DURATION, type MotionLevel } from '../shared/motion.ts';
import { renderCard, type CardData } from './shareCard.ts';
import type { AccessInfo } from '../shared/access.ts';
import { Ico } from './icons.tsx';
import { Chip, Confirm, Empty, Menu, Spinner, Swatch, Thumb, useToast, type MenuItem } from './primitives.tsx';
import { copy, dateStr, download, errorText, itemUrl, outfitUrl, plural, robux, timeAgo } from './format.ts';
import { thumbStore, useAsync, useOutfitBundle } from './data.ts';
import { Collapse, fitSquare, flyGhost, whenLoaded } from './motion.tsx';
import { AccessBadge } from './Access.tsx';
import { ShareDialog } from './Share.tsx';

export interface InspectorProps {
  userId: number; userName: string;
  outfit: { id: number; name: string; isEditable?: boolean };
  settings: Settings;
  fromRect?: DOMRect;
  fromSrc?: string;
  saved: boolean; libEntry?: LibraryEntry;
  onSave: () => void; onUnsave: () => void; onClose: () => void; onCompare: (how: 'pick' | 'me') => void;
  onLibUpdate: (patch: Partial<Pick<LibraryEntry, 'tags' | 'note' | 'collection' | 'favorite'>>) => void;
  indexed: Map<number, OutfitDetails>;
  outfitName: (id: number) => string;
  onFilterItem: (f: { id: number; name: string }) => void;
  onDetails: (d: OutfitDetails) => void;
  /** Item records Roblox just returned: feeds the explorer's price index. */
  onViews?: (views: Record<number, AssetView>) => void;
  onOpenOutfit: (id: number) => void;
  /** Saved outfits, for "similar outfits". */
  libEntries: LibraryEntry[];
  onOpenEntry: (e: LibraryEntry) => void;
  /** What RoFit knows about who can see this outfit (drives the badge and sharing). */
  access?: AccessInfo;
  narrow: boolean;
  closing: boolean; motion: MotionLevel;
  /** Where this outfit's card currently is, so the render can fly back to it on close. */
  cardRect: (id: number) => DOMRect | undefined;
}

const PART_LABELS: Record<keyof BodyColors, string> = { head: 'Head', torso: 'Torso', rightArm: 'Right arm', leftArm: 'Left arm', rightLeg: 'Right leg', leftLeg: 'Left leg' };
const SCALE_LABELS: Record<keyof BodyScale, [string, number]> = {
  height: ['Height', 1], width: ['Width', 1], head: ['Head', 1], depth: ['Depth', 1], proportion: ['Proportions', 0], bodyType: ['Body type', 0],
};

export function Inspector(p: InspectorProps) {
  const toast = useToast();
  const fallback = useMemo(() => p.libEntry ? {
    details: p.libEntry.details,
    views: Object.fromEntries(p.libEntry.details.assets.map((a) => [a.id, { id: a.id, provenance: 'last-known', rec: p.libEntry!.assets[a.id], ref: a } satisfies AssetView])),
  } : undefined, [p.libEntry?.key]);
  const b = useOutfitBundle(p.userId, p.outfit.id, fallback);
  const d = b.bundle?.details;
  const views = b.bundle?.views ?? {};
  const [owned, setOwned] = useState<{ me: { id: number; name: string } | null; owned: Record<number, boolean> } | null>(null);
  const [ownedBusy, setOwnedBusy] = useState(false);
  const [confirm, setConfirm] = useState<null | { ids: number[] }>(null);
  const [sharing, setSharing] = useState(false);
  const [open, setOpen] = useState({ items: true, body: true, similar: true, history: false, library: true, tech: false });
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => { if (d) p.onDetails(d); }, [d?.fetchedAt, d?.id]);
  useEffect(() => { if (b.phase === 'done' && b.bundle && !b.usingFallback) p.onViews?.(b.bundle.views); }, [b.phase, b.bundle]);
  useEffect(() => { setOwned(null); scroller.current?.scrollTo({ top: 0 }); }, [p.outfit.id]);

  const list = d ? d.assets.map((a) => views[a.id] ?? { id: a.id, provenance: 'unknown', ref: a } as AssetView) : [];
  const priced = p.settings.showPrices;
  const sum = useMemo(() => summarizePrices(list, owned?.me ? new Set(Object.entries(owned.owned).filter(([, v]) => v).map(([k]) => Number(k))) : undefined), [b.bundle?.views, owned]);
  const sumAll = useMemo(() => summarizePrices(list), [b.bundle?.views]);
  const missing = owned?.me ? list.filter((v) => owned.owned[v.id] === false) : [];
  const ownedCount = owned?.me ? list.filter((v) => owned.owned[v.id]).length : 0;

  const checkOwned = async () => {
    setOwnedBusy(true);
    try {
      const r = await rpc('assets.owned', { ids: list.map((v) => v.id) });
      setOwned(r);
      if (!r.me) toast('Sign in to Roblox to check what you own', { tone: 'warn' });
    } catch (e) { toast(errorText(e as any).title, { tone: 'warn' }); }
    setOwnedBusy(false);
  };

  // Same shape RoFit's Library → Import reads back (shared/backup.ts), so a manifest is also a one-outfit backup.
  const manifest = () => JSON.stringify({
    app: 'rofit-inspector', kind: 'outfit-manifest', version: chrome.runtime.getManifest?.().version,
    outfit: { id: p.outfit.id, name: d?.name, user: { id: p.userId, name: p.userName }, avatarType: d?.avatarType, bodyColors: d?.bodyColors, scale: d?.scale },
    items: list.map((v) => { const typeId = v.ref?.assetTypeId ?? v.rec?.assetTypeId ?? 0; return { id: v.id, name: v.rec?.name ?? v.ref?.name, typeId, type: typeName(typeId), creator: v.rec?.creator?.name, price: v.rec?.price ?? null, offSale: v.rec?.isOffSale ?? null, restriction: v.rec?.restriction ?? null, provenance: v.provenance }; }),
    exportedAt: new Date().toISOString(),
  }, null, 2);

  const doCopy = async (text: string, what: string) => { toast((await copy(text)) ? `Copied ${what}` : 'Couldn’t copy'); };
  // Shareable card: drawn locally on a canvas, nothing leaves the browser.
  const makeCard = async (): Promise<Blob> => {
    const rootEl = (scroller.current?.closest('.rf') ?? document.body) as Element;
    const data: CardData = {
      title: d!.name || p.outfit.name, owner: p.userName, meta: `${d!.avatarType} · ${plural(d!.assets.length, 'item')}`,
      avatarUrl: heroRef.current?.querySelector('img')?.currentSrc || undefined,
      items: list.map((v) => {
        const pk = priceKind(v);
        return {
          name: v.rec?.name ?? v.ref?.name ?? String(v.id), sub: typeName(v.ref?.assetTypeId ?? v.rec?.assetTypeId ?? 0, v.ref?.assetTypeName),
          price: pk.kind === 'onsale' ? robux(pk.amount!) : pk.kind === 'free' ? 'Free' : pk.kind === 'resale' ? robux(pk.amount!) : undefined,
          flag: pk.kind === 'resale' ? 'resale' : pk.kind === 'offsale' ? 'off sale' : pk.kind === 'unknown' ? 'no data' : undefined, thumb: v.rec?.thumb,
        };
      }),
      total: sumAll.buyCount > 0 ? robux(sumAll.buyNow) : sumAll.free > 0 ? 'Free' : 'Nothing on sale',
      totalNote: sumAll.buyCount > 0 ? 'to buy new today' + (sumAll.resaleCount ? ` · +${robux(sumAll.resale)} from resellers` : '') : 'none of these can be bought new right now',
    };
    return renderCard(rootEl, data);
  };
  const saveImage = async () => { try { download(`rofit-${p.outfit.id}.png`, await makeCard(), 'image/png'); toast('Saved the outfit card'); } catch { toast('Couldn’t make the card', { tone: 'warn' }); } };
  const copyImage = async () => { try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': makeCard() })]); toast('Copied the outfit card'); } catch { toast('Couldn’t copy the image', { tone: 'warn' }); } };

  const menu: MenuItem[] = d ? [
    { label: 'Copy outfit ID', icon: 'hash', onClick: () => doCopy(String(p.outfit.id), 'outfit ID') },
    { label: 'Copy profile link to this outfit', icon: 'link', hint: 'needs RoFit', onClick: () => doCopy(outfitUrl(p.userId, p.outfit.id), 'link') },
    ...(p.access?.state === 'public' || p.access?.state === 'owner' ? [
      { label: 'Save as image', icon: 'download' as const, hint: 'PNG', onClick: saveImage },
      { label: 'Copy image', icon: 'copy' as const, onClick: copyImage },
    ] : []),
    { label: 'Share a snapshot link…', icon: 'share', onClick: () => setSharing(true) },
    { sep: true },
    { label: 'Copy item IDs', icon: 'copy', onClick: () => doCopy(d.assets.map((a) => a.id).join(', '), `${d.assets.length} item IDs`) },
    { label: 'Copy item manifest (JSON)', icon: 'json', onClick: () => doCopy(manifest(), 'manifest') },
    { label: 'Copy Studio script (Lua)', icon: 'code', onClick: () => doCopy(toStudioLua(d, `${p.userName} · ${d.name}`), 'Studio script') },
    { sep: true },
    { label: 'Download manifest (.json)', icon: 'download', onClick: () => download(`rofit-${p.outfit.id}.json`, manifest()) },
    { label: 'Download Studio script (.lua)', icon: 'download', onClick: () => download(`rofit-${p.outfit.id}.lua`, toStudioLua(d, `${p.userName} · ${d.name}`), 'text/plain') },
    { sep: true },
    { label: 'Reload from Roblox', icon: 'refresh', onClick: b.refresh },
  ] : [];

  // Shared element, in: a ghost of the card's image flies into the hero's spot; the real hero takes over once it has landed and loaded.
  const heroRef = useRef<HTMLDivElement>(null);
  // Shared-element flights are the biggest movement in RoFit, so only Full motion plays them.
  const fly = p.motion === 'full';
  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || !p.fromRect || !p.fromSrc || !fly || p.narrow) return;
    el.style.opacity = '0';
    const fl = flyGhost(el, p.fromSrc, p.fromRect, fitSquare(el.getBoundingClientRect()), DURATION.full.fly);
    let dead = false;
    fl.landed.then(() => whenLoaded(el, 600)).then(() => {
      if (dead) return;
      el.style.transition = 'opacity .18s'; el.style.opacity = '';
      setTimeout(() => { fl.remove(); el.style.transition = ''; }, 190);
    });
    return () => { dead = true; fl.remove(); el.style.opacity = ''; el.style.transition = ''; };
  }, [p.outfit.id]);

  // Shared element, out: the render shrinks back into the card it came from while the panel slides away.
  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!p.closing || !el || !fly || p.narrow) return;
    const to = p.cardRect(p.outfit.id);
    const src = el.querySelector('img')?.currentSrc;
    if (!to || !src) return;
    const fl = flyGhost(el, src, fitSquare(el.getBoundingClientRect()), to, DURATION.full.flyBack);
    el.style.opacity = '0';
    fl.landed.then(() => fl.remove());
  }, [p.closing]);

  const toggle = (k: keyof typeof open) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  return (
    <aside class="rf-insp" aria-label={`Outfit ${p.outfit.name}`}>
      <header class="rf-ibar">
        {p.narrow && <button class="rf-ib" aria-label="Back to outfits" onClick={p.onClose}><Ico n="back" /></button>}
        <span class="rf-ibar-t">Outfit</span>
        <div class="rf-grow" />
        <button class={'rf-btn' + (p.saved ? ' on' : '')} onClick={p.saved ? p.onUnsave : p.onSave} aria-pressed={p.saved}>
          <Ico n={p.saved ? 'saved' : 'save'} size={16} />{p.saved ? 'Saved' : 'Save'}
        </button>
        <button class="rf-ib" aria-label="Share" title="Share a snapshot link" disabled={!d} onClick={() => setSharing(true)}><Ico n="share" /></button>
        <Menu label="Compare" icon="compare" align="right" items={[
          { label: 'With another outfit…', icon: 'compare', hint: 'C', onClick: () => p.onCompare('pick') },
          { label: 'With what I’m wearing', icon: 'user', onClick: () => p.onCompare('me') },
        ]} />
        <Menu label="More actions" items={menu} />
        {!p.narrow && <button class="rf-ib" aria-label="Close inspector" title="Close (Esc)" onClick={p.onClose}><Ico n="close" /></button>}
      </header>

      <div class={'rf-refresh' + (b.refreshing || b.phase === 'assets' ? ' on' : '')} aria-hidden="true" />
      <div class="rf-iscroll" ref={scroller}>
        <div class="rf-hero">
          <div class="rf-stage" ref={heroRef}><Thumb id={p.outfit.id} size="420x420" alt={p.outfit.name} class="big" /></div>
          <h2 class="rf-iname-h">{d?.name || p.outfit.name || 'Untitled'}</h2>
          <div class="rf-meta">
            <span>{p.userName}</span>
            {d && <><i>·</i><span>{d.avatarType}</span><i>·</i><span>{plural(d.assets.length, 'item')}</span></>}
            {p.outfit.isEditable === false && <Chip tone="muted" title="Supplied by Roblox, not saved by this user">Roblox preset</Chip>}
            {p.access && <AccessBadge info={p.access} />}
            {p.settings.technical && <><i>·</i><span class="rf-mono">#{p.outfit.id}</span></>}
          </div>
          {b.bundle && (
            <div class="rf-prov">
              {b.usingFallback
                ? <Chip tone="warn" icon="info" title={errorText(b.error).body}>Roblox no longer lists this outfit · showing your saved copy from {dateStr(p.libEntry!.savedAt)}</Chip>
                : <span class="rf-muted rf-small rf-fresh-text" key={b.refreshing ? 'r' : b.bundle.source}>{b.refreshing ? `Showing a saved copy from ${timeAgo(b.bundle.details.fetchedAt)} · checking Roblox…` : b.bundle.source === 'live' ? 'Fetched from Roblox just now' : `Cached ${timeAgo(b.bundle.details.fetchedAt)}`}</span>}
            </div>
          )}
        </div>

        {b.error && !b.bundle && (
          <Empty icon="warn" title={errorText(b.error).title} body={errorText(b.error).body}><button class="rf-btn primary" onClick={b.refresh}>Try again</button></Empty>
        )}
        {!b.bundle && !b.error && <div class="rf-sk-block"><div class="rf-skel" style={{ height: '18px', width: '60%' }} /><div class="rf-skel" style={{ height: '64px' }} /><div class="rf-skel" style={{ height: '180px' }} /></div>}

        {b.bundle?.change && <ChangeBanner change={b.bundle.change} at={b.bundle.previousAt!} names={Object.fromEntries(d!.assets.map((a) => [a.id, a.name]))} />}

        {d && priced && (
          <CostSummary sum={owned?.me ? sum : sumAll} all={sumAll} loading={b.phase === 'assets'} owned={owned?.me ? { have: ownedCount, total: list.length } : null} views={list} />
        )}

        {d && (
          <section class="rf-sec">
            <button class="rf-sec-h" aria-expanded={open.items} onClick={() => toggle('items')}>
              <Ico n="right" size={16} class="rf-chev" /><h3>Items</h3><span class="rf-muted">{d.assets.length}</span>
              <span class="rf-grow" />
              {b.phase === 'assets' && <Spinner size={14} />}
            </button>
            <Collapse open={open.items}>
              <div class="rf-sec-b">
                <div class="rf-sec-tools">
                  <button class="rf-btn sm" onClick={checkOwned} disabled={ownedBusy}>{ownedBusy ? <Spinner size={14} /> : <Ico n="ok" size={14} />}{owned?.me ? 'Recheck ownership' : 'What do I own?'}</button>
                  {owned?.me && missing.length > 0 && <>
                    <button class="rf-btn sm" onClick={() => doCopy(missing.map((m) => m.id).join(', '), `${missing.length} missing IDs`)}><Ico n="copy" size={14} />Copy missing IDs</button>
                    <button class="rf-btn sm" onClick={() => setConfirm({ ids: missing.map((m) => m.id) })}><Ico n="external" size={14} />Open missing</button>
                  </>}
                </div>
                {owned && !owned.me && <p class="rf-hintline"><Ico n="info" size={14} />You’re not signed in to Roblox in this browser, so ownership can’t be checked.</p>}
                {owned?.me && <p class="rf-hintline"><Ico n="ok" size={14} />You own {ownedCount} of {list.length}{missing.length ? ` · missing ${missing.length}` : ' · nothing missing'}.</p>}
                {groupAssets(list.map((v) => ({ ...v, assetTypeId: v.ref?.assetTypeId ?? v.rec?.assetTypeId ?? 0 }))).map((g) => (
                  <div class="rf-group" key={g.group}>
                    <div class="rf-group-h">{g.group}<span>{g.items.length}</span></div>
                    {g.items.map((v) => (
                      <ItemRow key={v.id} v={v} pending={b.phase === 'assets'} settings={p.settings} owned={owned?.me ? owned.owned[v.id] : undefined}
                        reuse={[...p.indexed.values()].filter((x) => x.id !== p.outfit.id && x.assets.some((a) => a.id === v.id)).map((x) => x.id)}
                        outfitName={p.outfitName} onOpenOutfit={p.onOpenOutfit} onFilter={() => p.onFilterItem({ id: v.id, name: v.rec?.name ?? v.ref?.name ?? String(v.id) })} />
                    ))}
                  </div>
                ))}
                {d.assets.length === 0 && <p class="rf-muted rf-small">This outfit has no items, just body colors and scale.</p>}
              </div>
            </Collapse>
          </section>
        )}

        {d && (
          <section class="rf-sec">
            <button class="rf-sec-h" aria-expanded={open.body} onClick={() => toggle('body')}>
              <Ico n="right" size={16} class="rf-chev" /><h3>Body</h3><span class="rf-muted">{d.avatarType}</span>
            </button>
            <Collapse open={open.body}><BodyPanel d={d} tech={p.settings.technical} /></Collapse>
          </section>
        )}

        {d && <Similar d={d} self={`${p.userId}:${p.outfit.id}`} indexed={p.indexed} userId={p.userId} entries={p.libEntries} outfitName={p.outfitName}
          open={open.similar} onToggle={() => toggle('similar')} onOpenOutfit={p.onOpenOutfit} onOpenEntry={p.onOpenEntry} />}

        {d && p.libEntry && (
          <section class="rf-sec">
            <button class="rf-sec-h" aria-expanded={open.library} onClick={() => toggle('library')}>
              <Ico n="right" size={16} class="rf-chev" /><h3>Your notes</h3>
            </button>
            <Collapse open={open.library}><LibraryPanel e={p.libEntry} onUpdate={p.onLibUpdate} /></Collapse>
          </section>
        )}

        {d && p.settings.keepHistory && (
          <section class="rf-sec">
            <button class="rf-sec-h" aria-expanded={open.history} onClick={() => toggle('history')}>
              <Ico n="right" size={16} class="rf-chev" /><h3>History</h3>
            </button>
            <Collapse open={open.history}><History userId={p.userId} id={p.outfit.id} current={d} refreshKey={d.fetchedAt} /></Collapse>
          </section>
        )}
      </div>

      {sharing && d && (
        <ShareDialog d={d} views={views} user={{ id: p.userId, name: p.userName }} onClose={() => setSharing(false)}
          access={p.access?.state ?? 'unknown'} thumb={thumbStore.get(p.outfit.id, '420x420')?.url ?? p.libEntry?.thumb ?? undefined} />
      )}
      {confirm && (
        <Confirm title={`Open ${plural(Math.min(confirm.ids.length, 10), 'item page')}?`} confirm="Open"
          body={`Opens the catalog page for each missing item in new tabs${confirm.ids.length > 10 ? ` (first 10 of ${confirm.ids.length})` : ''}.`}
          onCancel={() => setConfirm(null)}
          onConfirm={() => { rpc('page.openUrls', { urls: confirm.ids.slice(0, 10).map(itemUrl) }).catch(() => {}); setConfirm(null); }} />
      )}
    </aside>
  );
}

// ---------------------------------------------------------------------------------------------
function ChangeBanner({ change, at, names }: { change: ChangeSummary; at: number; names: Record<number, string> }) {
  const bits: string[] = [];
  if (change.added.length) bits.push(`+${plural(change.added.length, 'item')}`);
  if (change.removed.length) bits.push(`−${plural(change.removed.length, 'item')}`);
  if (change.colorChanges) bits.push('body colors');
  if (change.scaleChanges) bits.push('scale');
  if (change.avatarTypeChanged) bits.push('avatar type');
  return (
    <div class="rf-change" role="status">
      <Ico n="history" size={16} />
      <div>
        <b>Changed since you last looked <span class="rf-muted">({timeAgo(at)})</span></b>
        <div class="rf-small">{bits.join(' · ') || 'Configuration updated'}{change.added.length > 0 && <span class="rf-muted"> — added {change.added.slice(0, 2).map((i) => names[i] ?? i).join(', ')}{change.added.length > 2 ? '…' : ''}</span>}</div>
      </div>
    </div>
  );
}

function CostSummary({ sum, all, loading, owned, views }: { sum: ReturnType<typeof summarizePrices>; all: ReturnType<typeof summarizePrices>; loading: boolean; owned: { have: number; total: number } | null; views: AssetView[] }) {
  const byId = new Map(views.map((v) => [v.id, v]));
  const total = sum.parts.reduce((a, x) => a + x.amount, 0);
  const segs = sum.parts.slice(0, 6);
  return (
    <section class="rf-cost" aria-label="Cost to recreate">
      <div class="rf-cost-top">
        <div>
          <div class="rf-cost-n">{loading ? <span class="rf-skel inline" /> : sum.buyCount > 0 ? robux(sum.buyNow) : sum.free > 0 ? 'Free' : 'Nothing on sale'}</div>
          <div class="rf-cost-l">{loading ? 'Checking prices…' : sum.buyCount > 0 ? (owned ? 'to buy what you’re missing' : 'to buy new today') : sum.free > 0 ? 'everything missing is free' : 'none of these can be bought new right now'}{sum.buyCount > 0 && sum.free > 0 && <> · {sum.free} free</>}</div>
        </div>
        {sum.resaleCount > 0 && !loading && (
          <div class="rf-cost-r">
            <div class="rf-cost-n sm">{robux(sum.resale)}</div>
            <div class="rf-cost-l">{plural(sum.resaleCount, 'limited')} from resellers</div>
          </div>
        )}
      </div>
      {segs.length > 1 && total > 0 && (
        <div class="rf-costbar" role="img" aria-label={`Largest costs: ${segs.map((s) => `${byId.get(s.id)?.rec?.name ?? byId.get(s.id)?.ref?.name} ${robux(s.amount)}`).join(', ')}`}>
          {segs.map((s, i) => <i key={s.id} class={'seg s' + (i % 6) + (s.kind === 'resale' ? ' resale' : '')} style={{ flexGrow: s.amount }} title={`${byId.get(s.id)?.rec?.name ?? byId.get(s.id)?.ref?.name} · ${robux(s.amount)}${s.kind === 'resale' ? ' (resale)' : ''}`} />)}
        </div>
      )}
      {!loading && (all.offsale > 0 || all.unknown > 0) && (
        <div class="rf-cost-notes">
          {all.offsale > 0 && <Chip tone="warn" icon="lock" title="Not sold by Roblox right now and with no resellers">{plural(all.offsale, 'item')} unavailable</Chip>}
          {all.unknown > 0 && <Chip tone="muted" icon="dashed" title="Roblox didn’t return a price, so they’re not in the total">{plural(all.unknown, 'price')} unknown</Chip>}
        </div>
      )}
      {owned && <div class="rf-cost-own">You own {owned.have} of {owned.total}</div>}
    </section>
  );
}

function ItemRow({ v, pending, settings, owned, reuse, outfitName, onOpenOutfit, onFilter }: {
  v: AssetView; pending: boolean; settings: Settings; owned?: boolean; reuse: number[]; outfitName: (id: number) => string; onOpenOutfit: (id: number) => void; onFilter: () => void;
}) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const rec = v.rec;
  const name = rec?.name ?? v.ref?.name ?? `Item ${v.id}`;
  const type = v.ref?.assetTypeName ? typeName(v.ref.assetTypeId, v.ref.assetTypeName) : typeName(rec?.assetTypeId ?? 0);
  const pk = priceKind(v);
  const unresolved = v.provenance === 'unknown';
  const lastKnown = v.provenance === 'last-known';
  const resale = useAsync(async () => (open && rec && rec.restriction !== 'none' ? await rpc('assets.resale', { id: v.id }).catch(() => null) : null), [open, v.id]);

  const status = unresolved ? (pending ? null : { t: 'No data', i: 'dashed' as const, tone: 'muted' as const, tip: 'Roblox returned nothing for this item, and RoFit has never seen it before. It may be deleted or moderated; only its name and type are known.' })
    : lastKnown ? { t: 'Unavailable', i: 'lock' as const, tone: 'warn' as const, tip: `Roblox no longer returns this item. It may be deleted or moderated. Showing what RoFit last saw on ${dateStr(rec!.observedAt)}.` }
      : pk.kind === 'offsale' ? { t: 'Off sale', i: 'lock' as const, tone: 'warn' as const }
        : pk.kind === 'resale' ? { t: rec!.restriction === 'collectible' ? 'Collectible' : 'Limited', i: 'tag' as const, tone: 'accent' as const }
          : pk.kind === 'free' ? { t: 'Free', i: 'ok' as const, tone: 'ok' as const } : null;
  const restrictionChip = rec && rec.restriction !== 'none' && pk.kind !== 'resale' ? (rec.restriction === 'collectible' ? 'Collectible' : 'Limited') : null;

  return (
    <div class={'rf-item' + (open ? ' open' : '') + (unresolved || lastKnown ? ' dim' : '')}>
      <div class="rf-item-main" role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen(!open)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}>
        <span class="rf-ithumb lg">{rec?.thumb ? <img src={rec.thumb} alt="" loading="lazy" /> : <Ico n="boxes" size={18} />}</span>
        <span class="rf-item-t">
          <span class="rf-item-name">{name}</span>
          <span class="rf-item-sub">{type}{rec?.creator ? ` · ${rec.creator.name}` : ''}{lastKnown && ` · last seen ${timeAgo(rec!.observedAt)}`}</span>
        </span>
        <span class="rf-item-r">
          {owned === true && <Chip tone="ok" icon="check">Owned</Chip>}
          {owned === false && <Chip tone="muted" icon="plus">Missing</Chip>}
          {pending && unresolved && <span class="rf-skel inline sm" />}
          {status && <Chip tone={status.tone} icon={status.i} title={status.tip}>{status.t}</Chip>}
          {restrictionChip && <Chip tone="accent" icon="tag">{restrictionChip}</Chip>}
          {settings.showPrices && (pk.kind === 'onsale' || pk.kind === 'resale') && <span class="rf-price" title={pk.kind === 'resale' ? 'Lowest resale price' : 'Price from Roblox'}>{robux(pk.amount!)}{pk.kind === 'resale' && <small>resale</small>}</span>}
        </span>
      </div>
      <Collapse open={open}>
        <div class="rf-item-more">
          <dl>
            {rec?.creator && <><dt>Creator</dt><dd>{rec.creator.name}{rec.creator.verified && ' ✓'}</dd></>}
            <dt>ID</dt><dd class="rf-mono">{v.id}</dd>
            {rec && <><dt>Seen</dt><dd>{v.provenance === 'live' ? 'Just now' : timeAgo(rec.observedAt)}{v.provenance === 'cached' ? ' (cached)' : ''}</dd></>}
            {rec?.prevObservedAt !== undefined && <><dt>Price changed</dt><dd>{rec.prevPrice == null ? 'was off sale' : `was ${robux(rec.prevPrice)}`} · seen {timeAgo(rec.prevObservedAt)}</dd></>}
            {rec && rec.restriction !== 'none' && rec.lowestResale != null && <><dt>Lowest resale</dt><dd>{robux(rec.lowestResale)}</dd></>}
            {resale.data && resale.data.recentAveragePrice != null && <><dt>Recent average</dt><dd>{robux(resale.data.recentAveragePrice)}{resale.data.sales ? ` · ${plural(resale.data.sales, 'sale')}` : ''}</dd></>}
            {resale.loading && open && rec && rec.restriction !== 'none' && <><dt>Recent average</dt><dd><Spinner size={12} /></dd></>}
          </dl>
          <div class="rf-item-acts">
            <a class="rf-btn sm" href={itemUrl(v.id)} target="_blank" rel="noopener noreferrer"><Ico n="external" size={14} />Open item</a>
            <button class="rf-btn sm" onClick={async () => toast((await copy(String(v.id))) ? 'Copied item ID' : 'Couldn’t copy')}><Ico n="hash" size={14} />Copy ID</button>
            <button class="rf-btn sm" onClick={async () => toast((await copy(name)) ? 'Copied name' : 'Couldn’t copy')}><Ico n="copy" size={14} />Copy name</button>
            <button class="rf-btn sm" onClick={onFilter}><Ico n="search" size={14} />Outfits with this</button>
          </div>
          {reuse.length > 0 && (
            <div class="rf-reuse">Also in {reuse.slice(0, 4).map((id, i) => <span key={id}>{i > 0 && ', '}<button class="rf-linkbtn" onClick={() => onOpenOutfit(id)}>{outfitName(id)}</button></span>)}{reuse.length > 4 && ` +${reuse.length - 4} more`}</div>
          )}
        </div>
      </Collapse>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
/** Outfits that share the most look-defining items with this one: from this profile (once read) and your library. */
function Similar({ d, self, indexed, userId, entries, outfitName, open, onToggle, onOpenOutfit, onOpenEntry }: {
  d: OutfitDetails; self: string; indexed: Map<number, OutfitDetails>; userId: number; entries: LibraryEntry[]; outfitName: (id: number) => string;
  open: boolean; onToggle: () => void; onOpenOutfit: (id: number) => void; onOpenEntry: (e: LibraryEntry) => void;
}) {
  const found = useMemo(() => {
    const cands: { key: string; assets: { id: number; assetTypeId: number }[] }[] = [];
    for (const [id, x] of indexed) if (`${userId}:${id}` !== self) cands.push({ key: `o:${id}`, assets: x.assets });
    for (const e of entries) if (e.key !== self && !(e.userId === userId && indexed.has(e.outfitId))) cands.push({ key: `l:${e.key}`, assets: e.details.assets });
    return similarOutfits(d.assets, cands, 0.3, 6);
  }, [d, indexed, entries, self]);
  if (!found.length) return null;
  const byKey = new Map(entries.map((e) => [e.key, e]));
  return (
    <section class="rf-sec">
      <button class="rf-sec-h" aria-expanded={open} onClick={onToggle}>
        <Ico n="right" size={16} class="rf-chev" /><h3>Similar outfits</h3><span class="rf-muted">{found.length}</span>
      </button>
      <Collapse open={open}>
        <div class="rf-sec-b">
          <div class="rf-similar">
            {found.map((s) => {
              const lib = s.key.startsWith('l:') ? byKey.get(s.key.slice(2)) : undefined;
              const id = lib ? lib.outfitId : Number(s.key.slice(2));
              const name = lib ? lib.name : outfitName(id);
              return (
                <button key={s.key} class="rf-sim-card" onClick={() => (lib ? onOpenEntry(lib) : onOpenOutfit(id))} title={`${name}: ${s.shared} items in common`}>
                  <Thumb id={id} src={lib?.thumb} />
                  <span class="rf-sim-t"><b class="rf-ell">{name}</b><small>{Math.round(s.score * 100)}% alike{lib ? ` · ${lib.userId === userId ? 'saved' : lib.userName}` : ''}</small></span>
                </button>
              );
            })}
          </div>
          <p class="rf-muted rf-small">Compares accessories, clothing and faces, not body parts or animations.</p>
        </div>
      </Collapse>
    </section>
  );
}

export function BodyFigure({ c }: { c: BodyColors }) {
  const f = (h: string) => '#' + h;
  return (
    <svg class="rf-fig" viewBox="0 0 64 88" role="img" aria-label="Body colors">
      <rect x="22" y="2" width="20" height="20" rx="5" fill={f(c.head)} />
      <rect x="20" y="24" width="24" height="26" rx="3" fill={f(c.torso)} />
      <rect x="8" y="24" width="10" height="26" rx="3" fill={f(c.leftArm)} />
      <rect x="46" y="24" width="10" height="26" rx="3" fill={f(c.rightArm)} />
      <rect x="20" y="52" width="11" height="32" rx="3" fill={f(c.leftLeg)} />
      <rect x="33" y="52" width="11" height="32" rx="3" fill={f(c.rightLeg)} />
    </svg>
  );
}

function BodyPanel({ d, tech }: { d: OutfitDetails; tech: boolean }) {
  const colors = Object.entries(d.bodyColors) as [keyof BodyColors, string][];
  const odd = Object.entries(d.scale).filter(([k, v]) => Math.abs(v - SCALE_LABELS[k as keyof BodyScale][1]) > 0.0005) as [keyof BodyScale, number][];
  return (
    <div class="rf-sec-b rf-body">
      <BodyFigure c={d.bodyColors} />
      <div class="rf-body-cols">
        <div class="rf-colors">
          {colors.map(([k, hex]) => (
            <div class="rf-color" key={k}><Swatch hex={hex} /><span>{PART_LABELS[k]}</span>{tech && <code>#{hex}</code>}</div>
          ))}
        </div>
        <div class="rf-scales">
          {(Object.keys(SCALE_LABELS) as (keyof BodyScale)[]).map((k) => {
            const [label, def] = SCALE_LABELS[k];
            const v = d.scale[k];
            const changed = Math.abs(v - def) > 0.0005;
            const pct = k === 'proportion' || k === 'bodyType' ? v * 100 : ((v - 0.5) / 1.0) * 100;
            return (
              <div class={'rf-scale' + (changed ? ' changed' : '')} key={k}>
                <span>{label}</span>
                <span class="rf-track"><i style={{ left: Math.max(0, Math.min(100, pct)) + '%' }} /></span>
                <span class="rf-mono">{k === 'proportion' || k === 'bodyType' ? `${Math.round(v * 100)}%` : v.toFixed(2)}</span>
              </div>
            );
          })}
          {odd.length === 0 && <p class="rf-muted rf-small">Default scale.</p>}
        </div>
      </div>
    </div>
  );
}

function LibraryPanel({ e, onUpdate }: { e: LibraryEntry; onUpdate: (p: Partial<Pick<LibraryEntry, 'tags' | 'note' | 'collection'>>) => void }) {
  const [tags, setTags] = useState(e.tags.join(', '));
  const [note, setNote] = useState(e.note);
  const [coll, setColl] = useState(e.collection);
  useEffect(() => { setTags(e.tags.join(', ')); setNote(e.note); setColl(e.collection); }, [e.key]);
  const commitTags = () => onUpdate({ tags: [...new Set(tags.split(',').map((t) => t.trim()).filter(Boolean))] });
  return (
    <div class="rf-sec-b rf-form">
      <label><span>Collection</span><input value={coll} placeholder="e.g. Streetwear" onInput={(ev) => setColl((ev.target as HTMLInputElement).value)} onBlur={() => onUpdate({ collection: coll.trim() })} /></label>
      <label><span>Tags</span><input value={tags} placeholder="comma, separated" onInput={(ev) => setTags((ev.target as HTMLInputElement).value)} onBlur={commitTags} /></label>
      <label><span>Note</span><textarea rows={3} value={note} placeholder="Only stored on this computer" onInput={(ev) => setNote((ev.target as HTMLTextAreaElement).value)} onBlur={() => onUpdate({ note })} /></label>
      <p class="rf-muted rf-small">Saved {dateStr(e.savedAt)}. Stays on this computer.</p>
    </div>
  );
}

function History({ userId, id, current, refreshKey }: { userId: number; id: number; current: OutfitDetails; refreshKey: number }) {
  const h = useAsync(() => rpc('history.list', { userId, id }), [userId, id, refreshKey]);
  const [openI, setOpenI] = useState<number | null>(null);
  const snaps = h.data ?? [];
  if (h.loading && !h.data) return <div class="rf-sec-b"><Spinner /></div>;
  if (snaps.length === 0) return <div class="rf-sec-b"><p class="rf-muted rf-small">Nothing recorded yet. RoFit keeps a snapshot each time it sees this outfit change.</p></div>;
  return (
    <div class="rf-sec-b rf-hist">
      {snaps.map((s, i) => {
        const older = snaps[i + 1];
        const d = older ? diffOutfits(older, s) : null;
        const label = !older ? 'First seen by RoFit' : [d!.onlyB.length && `+${d!.onlyB.length}`, d!.onlyA.length && `−${d!.onlyA.length}`, d!.colors.length && 'colors', d!.scales.length && 'scale', d!.avatarTypeDiffers && s.avatarType, older.name !== s.name && 'renamed'].filter(Boolean).join(' · ') || 'Updated';
        return (
          <div class="rf-hrow" key={s.id}>
            <button class="rf-hbtn" aria-expanded={openI === i} onClick={() => setOpenI(openI === i ? null : i)}>
              <span class="rf-hdot" /><span class="rf-hdate">{dateStr(s.at)}</span><span class="rf-hlabel">{label}</span><span class="rf-muted rf-small">{s.assetIds.length} items</span>
            </button>
            {openI === i && (
              <div class="rf-hdetail">
                {d && d.onlyB.map((x) => <div key={x} class="add">+ {s.assetNames[x] ?? x}</div>)}
                {d && d.onlyA.map((x) => <div key={x} class="rem">− {older!.assetNames[x] ?? x}</div>)}
                {older && older.name !== s.name && <div>Renamed “{older.name}” → “{s.name}”</div>}
                {d && d.colors.map((c) => <div key={c.part} class="clr"><Swatch hex={c.a} />→<Swatch hex={c.b} /> {PART_LABELS[c.part]}</div>)}
                {d && d.scales.map((x) => <div key={x.key}>{SCALE_LABELS[x.key][0]} {Math.round(x.a * 100)}% → {Math.round(x.b * 100)}%</div>)}
                {d?.avatarTypeDiffers && <div>Avatar type {older!.avatarType} → {s.avatarType}</div>}
                {(!d || (!d.onlyA.length && !d.onlyB.length && !d.colors.length && !d.scales.length && !d.avatarTypeDiffers)) && <div class="rf-muted">{s.assetIds.map((x) => s.assetNames[x] ?? x).join(', ')}</div>}
              </div>
            )}
          </div>
        );
      })}
      <p class="rf-muted rf-small">Each entry is when RoFit noticed a change on this computer, not when the owner made it. Roblox doesn’t publish outfit edit history. Visits where nothing changed add nothing.</p>
    </div>
  );
}
