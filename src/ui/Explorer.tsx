import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { AssetRec, AssetView, OutfitDetails, OutfitRec, RpcError } from '../shared/types.ts';
import { buyableNew, clusterVariants, costTotal, inBucket, outfitCost, PRICE_BUCKETS, reuseMap, type OutfitCost, type PriceBucket } from '../shared/analysis.ts';
import { GROUP_ORDER, typeGroup, typeName, type Group } from '../shared/assetTypes.ts';
import { isEmpty, matchFields, norm, parseQuery, type Field } from '../shared/search.ts';
import { rpc } from '../shared/rpc.ts';
import type { Settings } from '../shared/settings.ts';
import { saveSettings } from '../shared/settings.ts';
import type { MotionLevel } from '../shared/motion.ts';
import { Ico } from './icons.tsx';
import { Chip, Empty, Menu, Popover, Prompt, Seg, Spinner, Thumb, Toggle } from './primitives.tsx';
import { costLabel, errorText, plural, robux, timeAgo } from './format.ts';
import { useAsync, useDebounced, type IndexProgress, type OutfitList } from './data.ts';
import { useFlip, useIntro } from './motion.tsx';
import { NoOutfits } from './NoOutfits.tsx';
import { AccessBadge } from './Access.tsx';

export type Sort = 'roblox' | 'name' | 'items' | 'cost-desc' | 'cost-asc';
export interface Filters { type: 'all' | 'R6' | 'R15'; saved: 'all' | 'saved' | 'unsaved'; price: PriceBucket; limited: boolean; buyable: boolean; groups: Group[] }
export const NO_FILTERS: Filters = { type: 'all', saved: 'all', price: 'any', limited: false, buyable: false, groups: [] };
const FILTER_GROUPS: Group[] = GROUP_ORDER.filter((g) => g !== 'Other' && g !== 'Body parts');

interface Props {
  userName: string;
  list: OutfitList;
  settings: Settings;
  motion: MotionLevel;
  openId: number | null;
  multi: Set<number>;
  saved: Set<string>;
  collections: string[];
  userId: number;
  details: Map<number, OutfitDetails>;
  recs: Map<number, AssetRec>;
  indexing: IndexProgress | null;
  stopped: RpcError | null;
  saving: { done: number; total: number } | null;
  onIndex: (ids: number[], withPrices: boolean) => void;
  onCancelIndex: () => void;
  onOpen: (o: OutfitRec, from?: DOMRect, src?: string) => void;
  onToggle: (id: number) => void;
  onSelect: (ids: number[]) => void;
  onCompare: () => void;
  onClearMulti: () => void;
  onSaveMany: (ids: number[], collection: string) => void;
  onOrder: (ids: number[]) => void;
  itemFilter: { id: number; name: string } | null;
  setItemFilter: (f: { id: number; name: string } | null) => void;
  searchRef: { current: HTMLInputElement | null };
}

// Normalizing the same item names on every index update adds up; names repeat across outfits, so memoize.
const NORM = new Map<string, string>();
const n = (s: string) => { let v = NORM.get(s); if (v === undefined) { if (NORM.size > 20000) NORM.clear(); v = norm(s); NORM.set(s, v); } return v; };

function fieldsOf(o: OutfitRec, d: OutfitDetails | undefined, recs: Map<number, AssetRec>): Field[] {
  const f: Field[] = [{ text: o.name, weight: 1.25, kind: 'name' }, { text: '', id: o.id, kind: 'id' }];
  if (d) for (const a of d.assets) {
    f.push({ text: a.name, kind: 'item', label: a.name, id: a.id });
    f.push({ text: typeName(a.assetTypeId, a.assetTypeName), weight: 0.55, kind: 'type', label: typeName(a.assetTypeId, a.assetTypeName) });
    const c = recs.get(a.id)?.creator?.name;
    if (c) f.push({ text: c, weight: 0.6, kind: 'creator', label: `by ${c}` });
  }
  return f;
}

export function Explorer(p: Props) {
  const { settings: st, list } = p;
  const [q, setQ] = useState('');
  const dq = useDebounced(q, 90);
  const [sort, setSort] = useState<Sort>('roblox');
  const [view, setView] = useState<'outfits' | 'items'>('outfits');
  const [f, setF] = useState<Filters>(NO_FILTERS);
  const [bannerGone, setBannerGone] = useState(false);
  const [asking, setAsking] = useState(false);

  const presets = useMemo(() => list.outfits.filter((o) => !o.isEditable), [list.outfits]);
  const pool = useMemo(() => (st.showPresets ? list.outfits : list.outfits.filter((o) => o.isEditable)), [list.outfits, st.showPresets]);
  const indexedCount = pool.filter((o) => p.details.has(o.id)).length;
  const fullyIndexed = pool.length > 0 && indexedCount === pool.length;

  // Per-outfit cost, only once every item in it has a record (otherwise the number would be a guess).
  const costs = useMemo(() => {
    const m = new Map<number, OutfitCost>();
    for (const o of pool) {
      const d = p.details.get(o.id);
      if (d && d.assets.every((a) => p.recs.has(a.id))) m.set(o.id, outfitCost(d.assets.map((a) => a.id), p.recs));
    }
    return m;
  }, [pool, p.details, p.recs]);
  const pricedCount = costs.size;
  const needsPrices = f.price !== 'any' || f.buyable || f.limited || sort === 'cost-asc' || sort === 'cost-desc';
  const needsDetails = needsPrices || f.type !== 'all' || f.groups.length > 0 || !!p.itemFilter;

  const prepared = useMemo(() => {
    const m = new Map<number, { fields: Field[]; texts: string[] }>();
    for (const o of pool) { const fields = fieldsOf(o, p.details.get(o.id), p.recs); m.set(o.id, { fields, texts: fields.map((x) => n(x.text)) }); }
    return m;
  }, [pool, p.details, p.recs]);

  const query = useMemo(() => parseQuery(dq), [dq]);
  const searching = !isEmpty(query);

  const rows = useMemo(() => {
    const out: { o: OutfitRec; score: number; hit?: Field; cost?: OutfitCost }[] = [];
    for (const o of pool) {
      const d = p.details.get(o.id);
      const cost = costs.get(o.id);
      if (f.type !== 'all' && d?.avatarType !== f.type) continue;
      if (p.itemFilter && !d?.assets.some((a) => a.id === p.itemFilter!.id)) continue;
      const isSaved = p.saved.has(`${p.userId}:${o.id}`);
      if ((f.saved === 'saved' && !isSaved) || (f.saved === 'unsaved' && isSaved)) continue;
      if (f.groups.length && !(d && f.groups.every((g) => d.assets.some((a) => typeGroup(a.assetTypeId) === g)))) continue;
      if (f.price !== 'any' && !(cost && inBucket(cost, f.price))) continue;
      if (f.buyable && !(cost && buyableNew(cost))) continue;
      if (f.limited && !(cost && cost.limiteds > 0)) continue;
      let score = 0, hit: Field | undefined;
      if (searching) {
        const pr = prepared.get(o.id)!;
        const m = matchFields(query, pr.fields, pr.texts);
        if (!m) continue;
        score = m.score; hit = m.field;
      }
      out.push({ o, score, hit, cost });
    }
    const name = (a: OutfitRec, b: OutfitRec) => a.name.localeCompare(b.name, undefined, { numeric: true });
    if (sort === 'name') out.sort((a, b) => name(a.o, b.o));
    else if (sort === 'items') out.sort((a, b) => (p.details.get(b.o.id)?.assets.length ?? -1) - (p.details.get(a.o.id)?.assets.length ?? -1));
    else if (sort === 'cost-desc' || sort === 'cost-asc') {
      const dir = sort === 'cost-desc' ? -1 : 1;
      // Unpriced outfits always go last, whichever direction.
      out.sort((a, b) => (a.cost ? 0 : 1) - (b.cost ? 0 : 1) || (a.cost && b.cost ? dir * (costTotal(a.cost) - costTotal(b.cost)) : 0));
    } else if (searching) out.sort((a, b) => b.score - a.score);
    return out;
  }, [pool, prepared, query, searching, sort, f, costs, p.details, p.itemFilter, p.saved, p.userId]);

  useEffect(() => { p.onOrder(rows.map((r) => r.o.id)); }, [rows]);

  // Settings → Explorer → "Read outfits automatically": once per profile, after the list arrives.
  const autoRan = useRef(0);
  useEffect(() => {
    if (!st.autoIndex || list.phase !== 'ready' || p.indexing || autoRan.current === p.userId || pool.length < 2) return;
    autoRan.current = p.userId;
    if (!fullyIndexed || (st.indexPrices && pricedCount < pool.length)) p.onIndex(pool.map((o) => o.id), st.indexPrices);
  }, [st.autoIndex, list.phase, p.userId, pool.length]);

  const gridRef = useRef<HTMLDivElement>(null);
  useFlip(gridRef, rows.map((r) => r.o.id).join(',') + st.layout + st.density + view, p.motion);
  const loading = list.phase === 'cache' || (list.phase === 'syncing' && !list.outfits.length);
  const intro = useIntro(loading ? 'loading' : `u${p.userId}`);
  const onGridKey = (e: KeyboardEvent) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const cards = [...(gridRef.current?.querySelectorAll<HTMLElement>('.rf-card') ?? [])];
    const root = gridRef.current!.getRootNode() as ShadowRoot | Document;
    const i = cards.indexOf(root.activeElement as HTMLElement);
    if (i < 0) return;
    e.preventDefault();
    let cols = 1;
    if (st.layout === 'grid') { const top = cards[0].offsetTop; cols = Math.max(1, cards.filter((c) => c.offsetTop === top).length); }
    const nxt = e.key === 'ArrowLeft' ? i - 1 : e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowUp' ? i - cols : e.key === 'ArrowDown' ? i + cols : e.key === 'Home' ? 0 : cards.length - 1;
    cards[Math.max(0, Math.min(cards.length - 1, nxt))]?.focus();
  };

  const activeFilters = (f.type !== 'all' ? 1 : 0) + (f.saved !== 'all' ? 1 : 0) + (f.price !== 'any' ? 1 : 0) + (f.limited ? 1 : 0) + (f.buyable ? 1 : 0) + f.groups.length;
  const clearAll = () => { setF(NO_FILTERS); p.setItemFilter(null); setQ(''); };
  const setFilter = (patch: Partial<Filters>) => setF((x) => ({ ...x, ...patch }));
  const priceLabel = PRICE_BUCKETS.find((b) => b.v === f.price)!.label;
  const unpriced = pool.length - pricedCount;
  const unindexed = pool.length - indexedCount;
  const indexAll = (withPrices: boolean) => p.onIndex(pool.map((o) => o.id), withPrices);
  const priceHint = indexedCount === 0 ? 'Reads every outfit, then its item prices.' : unpriced > 0 ? `${plural(unpriced, 'outfit')} not priced yet.` : 'Every outfit is priced.';

  const filterPanel = (
    <div class="rf-filters">
      <div class="rf-frow"><span>Avatar type</span>
        <Seg label="Avatar type" value={f.type} onChange={(v) => setFilter({ type: v })} options={[{ v: 'all', label: 'Any' }, { v: 'R15', label: 'R15' }, { v: 'R6', label: 'R6' }]} /></div>
      <div class="rf-frow"><span>In your library</span>
        <Seg label="In your library" value={f.saved} onChange={(v) => setFilter({ saved: v })} options={[{ v: 'all', label: 'Any' }, { v: 'saved', label: 'Saved' }, { v: 'unsaved', label: 'Not saved' }]} /></div>
      <div class="rf-fsec"><span>Contains</span>
        <div class="rf-fchips">{FILTER_GROUPS.map((g) => {
          const on = f.groups.includes(g);
          return <button key={g} class={'rf-chip btn' + (on ? ' accent' : '')} aria-pressed={on} onClick={() => setFilter({ groups: on ? f.groups.filter((x) => x !== g) : [...f.groups, g] })}>{on && <Ico n="check" size={11} />}{g}</button>;
        })}</div></div>
      <div class="rf-fsec"><span>Cost to recreate</span>
        <div class="rf-fchips">{PRICE_BUCKETS.map((b) => <button key={b.v} class={'rf-chip btn' + (f.price === b.v ? ' accent' : '')} aria-pressed={f.price === b.v} onClick={() => setFilter({ price: b.v })}>{b.label}</button>)}</div></div>
      <label class="rf-frow"><span>Buyable new today<small>Every item is on sale or free</small></span><Toggle label="Buyable new today" on={f.buyable} onChange={(v) => setFilter({ buyable: v })} /></label>
      <label class="rf-frow"><span>Has limiteds<small>At least one limited or collectible</small></span><Toggle label="Has limiteds" on={f.limited} onChange={(v) => setFilter({ limited: v })} /></label>
      <label class="rf-frow"><span>Roblox presets{presets.length ? ` (${presets.length})` : ''}<small>Outfits Roblox supplies, not saved by {p.userName}</small></span><Toggle label="Show Roblox presets" on={st.showPresets} onChange={(v) => saveSettings({ showPresets: v })} /></label>
      {(unindexed > 0 || unpriced > 0) && (
        <div class="rf-fnote"><Ico n="info" size={14} /><span>Type, contents and price filters use each outfit’s contents. {unindexed > 0 ? `${plural(unindexed, 'outfit')} haven’t been read yet.` : priceHint}</span>
          {!p.indexing && <button class="rf-btn sm" onClick={() => indexAll(true)}>{unindexed > 0 ? 'Read all' : 'Load prices'}</button>}</div>
      )}
      <div class="rf-factions"><button class="rf-linkbtn" disabled={!activeFilters} onClick={() => setF(NO_FILTERS)}>Reset filters</button></div>
    </div>
  );

  const sortItems = [
    { label: 'Roblox order', hint: searching ? 'best match first' : '', checked: sort === 'roblox', onClick: () => setSort('roblox') },
    { label: 'Name', checked: sort === 'name', onClick: () => setSort('name') },
    { label: 'Most items', checked: sort === 'items', onClick: () => setSort('items'), disabled: indexedCount === 0, hint: indexedCount ? '' : 'read outfits first' },
    { sep: true },
    { label: 'Most expensive', icon: 'coins' as const, checked: sort === 'cost-desc', onClick: () => setSort('cost-desc'), disabled: pricedCount === 0, hint: pricedCount ? '' : 'load prices first' },
    { label: 'Cheapest', icon: 'coins' as const, checked: sort === 'cost-asc', onClick: () => setSort('cost-asc'), disabled: pricedCount === 0, hint: pricedCount ? '' : 'load prices first' },
  ];
  const sortLabel = { roblox: searching ? 'Best match' : 'Roblox order', name: 'Name', items: 'Most items', 'cost-desc': 'Most expensive', 'cost-asc': 'Cheapest' }[sort];

  return (
    <section class="rf-explorer" aria-label={`${p.userName}’s outfits`}>
      <div class="rf-toolbar">
        <label class="rf-search">
          <Ico n="search" size={16} />
          <input ref={(el) => { p.searchRef.current = el; }} type="search" placeholder={indexedCount ? 'Search outfits & items' : 'Search outfits'} value={q}
            onInput={(e) => setQ((e.target as HTMLInputElement).value)} aria-label="Search outfits" />
          {q && <button class="rf-clear" aria-label="Clear search" onClick={() => setQ('')}><Ico n="close" size={14} /></button>}
          {!q && <kbd class="rf-kbd">/</kbd>}
        </label>
        <Popover label="Filters" class="rf-btn" align="left" width={360} content={filterPanel}>
          <Ico n="sliders" size={16} /><span class="rf-hide-s">Filters</span>{activeFilters > 0 && <em class="rf-count-badge">{activeFilters}</em>}
        </Popover>
        <Menu label="Sort" class="rf-btn" align="left" items={sortItems}>
          <Ico n="sort" size={16} /><span class="rf-hide-s">{sortLabel}</span>
        </Menu>
        {indexedCount > 0 && (
          <Seg label="View" value={view} onChange={setView} options={[{ v: 'outfits', icon: 'outfit', label: 'Outfits' }, { v: 'items', icon: 'layers', label: 'Items' }]} />
        )}
        <div class="rf-grow" />
        <Seg label="Layout" value={st.layout} onChange={(v) => saveSettings({ layout: v })} options={[{ v: 'grid', icon: 'grid', title: 'Grid' }, { v: 'list', icon: 'list', title: 'List' }]} />
        <Seg label="Size" value={st.density} onChange={(v) => saveSettings({ density: v })} options={[{ v: 'compact', label: 'S', title: 'Compact' }, { v: 'comfortable', label: 'M', title: 'Comfortable' }, { v: 'large', label: 'L', title: 'Large' }]} />
      </div>

      <div class={'rf-refresh' + (list.phase === 'syncing' && list.outfits.length ? ' on' : '')} aria-hidden="true" />
      <div class="rf-subbar">
        <span class="rf-count" aria-live="polite">
          {loading ? 'Loading outfits…' : <>
            <b>{plural(rows.length, 'outfit')}</b>
            {rows.length !== pool.length && <> of {pool.length}</>}
            {!st.showPresets && presets.length > 0 && <> · <button class="rf-linkbtn" onClick={() => saveSettings({ showPresets: true })}>+{presets.length} Roblox presets hidden</button></>}
          </>}
        </span>
        <AccessBadge info={list.access} onRecheck={list.refresh} />
        {p.itemFilter && <button class="rf-chip accent btn" onClick={() => p.setItemFilter(null)} aria-label={`Remove filter: contains ${p.itemFilter.name}`}>Contains {p.itemFilter.name}<Ico n="close" size={12} /></button>}
        {f.type !== 'all' && <FChip label={`${f.type} only`} onClear={() => setFilter({ type: 'all' })} />}
        {f.saved !== 'all' && <FChip label={f.saved === 'saved' ? 'In your library' : 'Not in your library'} onClear={() => setFilter({ saved: 'all' })} />}
        {f.groups.map((g) => <FChip key={g} label={`Has ${g.toLowerCase()}`} onClear={() => setFilter({ groups: f.groups.filter((x) => x !== g) })} />)}
        {f.price !== 'any' && <FChip label={priceLabel} onClear={() => setFilter({ price: 'any' })} />}
        {f.buyable && <FChip label="Buyable new" onClear={() => setFilter({ buyable: false })} />}
        {f.limited && <FChip label="Has limiteds" onClear={() => setFilter({ limited: false })} />}
        {(activeFilters + (p.itemFilter ? 1 : 0)) > 1 && <button class="rf-linkbtn rf-small" onClick={() => { setF(NO_FILTERS); p.setItemFilter(null); }}>Clear all</button>}
        {list.phase === 'error' && list.outfits.length > 0
          ? <button class="rf-chip warn btn" onClick={list.refresh} title={errorText(list.error).body}><Ico n="warn" size={12} />Couldn’t refresh · showing a saved copy · Retry</button>
          : <span class="rf-upd">
              {list.fetchedAt && list.phase !== 'cache' && <span class="rf-muted rf-small">Updated {timeAgo(list.fetchedAt)}</span>}
              <button class="rf-ib sm" aria-label="Refresh from Roblox" title="Refresh from Roblox" onClick={list.refresh} disabled={list.phase === 'syncing'}>
                {list.phase === 'syncing' ? <Spinner /> : <Ico n="refresh" size={14} />}
              </button>
            </span>}
        {list.changes && (list.changes.added + list.changes.removed + list.changes.renamed > 0) && (
          <Chip tone="accent" icon="info" title="Compared with the last time RoFit loaded this list">
            {[list.changes.added && `${list.changes.added} new`, list.changes.removed && `${list.changes.removed} removed`, list.changes.renamed && `${list.changes.renamed} renamed`].filter(Boolean).join(' · ')} since last visit
          </Chip>
        )}
      </div>

      {!bannerGone && !fullyIndexed && !loading && pool.length > 1 && !p.indexing && !p.stopped && view === 'outfits' && (
        <div class="rf-note">
          <Ico n="layers" size={18} />
          <div class="rf-note-t">
            <b>Look inside {pool.length > 40 ? 'these outfits' : 'every outfit'}</b>
            <span>Search by item or creator, filter by contents and cost, spot reused pieces. Reads each outfit once ({plural(unindexed, 'request')}{st.indexPrices ? ', then item prices in batches' : ''}), then it’s instant.</span>
          </div>
          <button class="rf-btn primary" onClick={() => indexAll(st.indexPrices)}>Read {unindexed}</button>
          <button class="rf-ib" aria-label="Dismiss" onClick={() => setBannerGone(true)}><Ico n="close" size={16} /></button>
        </div>
      )}
      {p.indexing && (
        <div class="rf-note" role="status">
          <Spinner />
          <div class="rf-note-t">
            <b>{p.indexing.phase === 'details' ? `Reading outfits… ${p.indexing.done}/${p.indexing.total}` : `Looking up prices… ${p.indexing.done}/${p.indexing.total} items`}</b>
            <span>{p.indexing.failed ? `${p.indexing.failed} couldn’t be read. ` : ''}Paced to stay under Roblox’s rate limits.</span>
          </div>
          <div class="rf-progress" role="progressbar" aria-label="Progress" aria-valuemin={0} aria-valuemax={p.indexing.total} aria-valuenow={p.indexing.done}><i style={{ transform: `scaleX(${p.indexing.total ? p.indexing.done / p.indexing.total : 0})` }} /></div>
          <button class="rf-btn" onClick={p.onCancelIndex}>Stop</button>
        </div>
      )}
      {p.stopped && !p.indexing && (
        <div class="rf-note warn" role="status">
          <Ico n="clock" size={18} />
          <div class="rf-note-t"><b>Paused: {errorText(p.stopped).title}</b><span>{indexedCount} of {pool.length} outfits read{pricedCount ? `, ${pricedCount} priced` : ''}. Everything read so far is kept.</span></div>
          <button class="rf-btn" onClick={() => indexAll(st.indexPrices)}>Resume</button>
        </div>
      )}
      {searching && !fullyIndexed && !loading && view === 'outfits' && rows.length > 0 && (
        <p class="rf-hintline rf-pad"><Ico n="info" size={14} />Item and creator names only match in the {indexedCount} outfit{indexedCount === 1 ? '' : 's'} RoFit has read.</p>
      )}

      <div class="rf-scroll" id="rf-explorer-scroll">
        {list.phase === 'error' && !list.outfits.length ? (
          <NoOutfits userId={p.userId} userName={p.userName} error={list.error} presets={0} viewer={list.error?.viewer} busy={false} onRetry={list.refresh} onShowPresets={() => saveSettings({ showPresets: true })} />
        ) : loading ? (
          <div class={'rf-grid ' + st.density}>{Array.from({ length: 12 }, (_, i) => <div class="rf-card sk" key={i}><div class="rf-thumb"><div class="rf-skel" /></div><div class="rf-sk-l" /></div>)}</div>
        ) : view === 'items' && indexedCount > 0 ? (
          <ItemsView details={p.details} pool={pool} onFilter={(x) => { p.setItemFilter(x); setView('outfits'); }} onOpen={p.onOpen} onToggle={p.onToggle} multi={p.multi} />
        ) : rows.length === 0 ? (
          pool.length === 0 ? (
            <NoOutfits userId={p.userId} userName={p.userName} presets={presets.length} viewer={list.viewer} via={list.via} busy={list.phase === 'syncing'} onRetry={list.refresh} onShowPresets={() => saveSettings({ showPresets: true })} access={list.access} />
          ) : (
            <Empty icon="search" title="No outfits match" body={
              needsPrices && unpriced > 0 ? `Price filters only use outfits whose items all have prices. ${plural(unpriced, 'outfit')} aren’t priced yet.`
                : needsDetails && unindexed > 0 ? `These filters use outfit contents, and ${plural(unindexed, 'outfit')} haven’t been read yet.`
                  : p.itemFilter ? `None of the read outfits contain ${p.itemFilter.name}.` : searching && !fullyIndexed ? 'Try fewer words. Item names only match in outfits RoFit has read.' : 'Try fewer words or fewer filters.'}>
              {(needsDetails && (unindexed > 0 || (needsPrices && unpriced > 0))) && !p.indexing && <button class="rf-btn primary" onClick={() => indexAll(true)}>{unindexed > 0 ? `Read ${unindexed} outfits` : 'Load prices'}</button>}
              <button class="rf-btn" onClick={clearAll}>Clear search and filters</button>
            </Empty>
          )
        ) : (
          <div ref={gridRef} class={`rf-grid ${st.layout} ${st.density}${rows.length > 150 ? ' big' : ''}${intro ? ' intro' : ''}`} role="list" onKeyDown={onGridKey}>
            {rows.map((r, i) => (
              <OutfitCard key={r.o.id} o={r.o} i={i} d={p.details.get(r.o.id)} cost={st.showPrices ? r.cost : undefined} active={p.openId === r.o.id} picked={p.multi.has(r.o.id)}
                isSaved={p.saved.has(`${p.userId}:${r.o.id}`)} list={st.layout === 'list'} hit={r.hit && r.hit.kind !== 'name' && r.hit.kind !== 'id' ? r.hit.label ?? null : null}
                multiMode={p.multi.size > 0} onOpen={p.onOpen} onToggle={p.onToggle} showTech={st.technical} compact={st.density === 'compact'} />
            ))}
          </div>
        )}
      </div>

      {p.multi.size > 0 && (
        <div class="rf-tray" role="region" aria-label="Selection">
          <b>{p.multi.size} selected</b>
          <span class="rf-muted rf-small rf-hide-s">{p.saving ? `Saving ${p.saving.done} of ${p.saving.total}…` : p.multi.size === 2 ? 'Ready to compare' : p.multi.size < 2 ? 'Pick one more to compare' : 'Compare works on two'}</span>
          <div class="rf-grow" />
          {rows.length > p.multi.size && <button class="rf-btn" onClick={() => p.onSelect(rows.map((r) => r.o.id))}><Ico n="selectAll" size={16} /><span class="rf-hide-s">Select all {rows.length}</span></button>}
          <button class="rf-btn" disabled={!!p.saving} onClick={() => setAsking(true)}>{p.saving ? <Spinner size={14} /> : <Ico n="save" size={16} />}Save</button>
          <button class="rf-btn primary" disabled={p.multi.size !== 2} onClick={p.onCompare}><Ico n="compare" size={16} />Compare</button>
          <button class="rf-btn" onClick={p.onClearMulti}>Clear</button>
        </div>
      )}
      {asking && (
        <Prompt title={`Save ${plural(p.multi.size, 'outfit')} to your library`} label="Collection (optional)" confirm="Save" allowEmpty suggestions={p.collections}
          hint="Outfits already in your library keep their notes and tags."
          onCancel={() => setAsking(false)} onConfirm={(c) => { setAsking(false); p.onSaveMany([...p.multi], c); }} />
      )}
    </section>
  );
}

function FChip({ label, onClear }: { label: string; onClear: () => void }) {
  return <button class="rf-chip accent btn" onClick={onClear} aria-label={`Remove filter: ${label}`}>{label}<Ico n="close" size={12} /></button>;
}

function OutfitCard({ o, i, d, cost, active, picked, isSaved, list, hit, multiMode, onOpen, onToggle, showTech, compact }: {
  o: OutfitRec; i: number; d?: OutfitDetails; cost?: OutfitCost; active: boolean; picked: boolean; isSaved: boolean; list: boolean; hit: string | null; multiMode: boolean;
  onOpen: Props['onOpen']; onToggle: (id: number) => void; showTech: boolean; compact: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [near, setNear] = useState(i < 24);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (near || !host.current) return;
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { setNear(true); io.disconnect(); } }, { rootMargin: '600px' });
    io.observe(host.current);
    return () => io.disconnect();
  }, [near]);

  const click = (e: MouseEvent) => {
    if (e.shiftKey || e.ctrlKey || e.metaKey || multiMode) { e.preventDefault(); onToggle(o.id); return; }
    const th = ref.current?.querySelector('.rf-thumb');
    onOpen(o, th?.getBoundingClientRect(), th?.querySelector('img')?.currentSrc);
  };
  const sub = d ? `${d.avatarType} · ${plural(d.assets.length, 'item')}` : null;
  const costText = cost ? costLabel(cost) : null;
  const costTip = cost ? [`${robux(cost.buyNow)} new`, cost.resale ? `${robux(cost.resale)} from resellers` : '', cost.offsale ? `${cost.offsale} off sale` : '', cost.unknown ? `${cost.unknown} unknown` : ''].filter(Boolean).join(' · ') : '';
  return (
    <div ref={host} role="listitem" data-k={o.id} data-oid={o.id} style={{ '--i': Math.min(i, 24) } as any} class={'rf-cell' + (picked ? ' picked' : '') + (active ? ' active' : '')}>
      <button ref={ref} class="rf-card" title={o.name} onClick={click} aria-label={`${o.name}${isSaved ? ', saved' : ''}${costText ? `, ${costText}` : ''}`} aria-pressed={picked ? true : undefined} aria-current={active ? 'true' : undefined}
        onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); onToggle(o.id); } }}>
        <Thumb id={o.id} enabled={near} />
        <span class="rf-card-t">
          <span class="rf-card-name">{o.name || 'Untitled'}</span>
          <span class="rf-card-sub">
            {hit ? <><Ico n="search" size={11} /><span class="rf-ell">{hit}</span></> : <span class="rf-ell">{sub ?? (showTech ? `#${o.id}` : ' ')}</span>}
            {!o.isEditable && <em class="rf-tag">Preset</em>}
            {costText && !compact && <span class="rf-card-cost" title={costTip}>{costText}</span>}
          </span>
        </span>
        {isSaved && <span class="rf-badge" title="In your library"><Ico n="saved" size={14} /></span>}
      </button>
      <button class="rf-pick" role="checkbox" aria-checked={picked} aria-label={`Select ${o.name}`} onClick={(e) => { e.stopPropagation(); onToggle(o.id); }} tabIndex={-1}>
        {picked && <Ico n="check" size={14} />}
      </button>
    </div>
  );
}

// ---- cross-outfit patterns: reused items + near-duplicate looks ---------------------------------
function ItemsView({ details, pool, onFilter, onOpen, onToggle, multi }: {
  details: Map<number, OutfitDetails>; pool: OutfitRec[]; onFilter: (f: { id: number; name: string }) => void; onOpen: Props['onOpen']; onToggle: (id: number) => void; multi: Set<number>;
}) {
  const poolIds = useMemo(() => new Set(pool.map((o) => o.id)), [pool]);
  const byId = useMemo(() => new Map(pool.map((o) => [o.id, o])), [pool]);
  const { rows, variants } = useMemo(() => {
    const sets = new Map<number, number[]>();
    const names = new Map<number, { name: string; typeName: string; typeId: number }>();
    for (const [oid, d] of details) {
      if (!poolIds.has(oid)) continue;
      sets.set(oid, d.assets.map((a) => a.id));
      for (const a of d.assets) names.set(a.id, { name: a.name, typeName: a.assetTypeName, typeId: a.assetTypeId });
    }
    const reuse = reuseMap(sets);
    const rows = [...reuse.entries()].map(([id, outfits]) => ({ id, outfits, ...names.get(id)! }))
      .sort((a, b) => b.outfits.length - a.outfits.length || a.name.localeCompare(b.name));
    return { rows, variants: clusterVariants(sets, 0.75) };
  }, [details, poolIds]);

  const top = rows.slice(0, 60);
  const thumbs = useAsync(() => rpc('assets.resolve', { ids: top.map((r) => r.id), refs: top.map((r) => ({ id: r.id, name: r.name, assetTypeId: r.typeId, assetTypeName: r.typeName })) }).catch(() => ({} as Record<number, AssetView>)), [top.map((r) => r.id).join(',')]);
  const reused = rows.filter((r) => r.outfits.length > 1);
  const [all, setAll] = useState(false);

  return (
    <div class="rf-items">
      {variants.length > 0 && (
        <div class="rf-block">
          <h3>Near-duplicate looks <span class="rf-muted">· share ≥ 75% of their items</span></h3>
          <div class="rf-variants">
            {variants.map((g, gi) => (
              <div class="rf-variant" key={gi}>
                <div class="rf-vstack">{g.slice(0, 5).map((id) => <button key={id} class={'rf-vthumb' + (multi.has(id) ? ' on' : '')} title={byId.get(id)?.name} aria-label={`Open ${byId.get(id)?.name}`} onClick={() => onOpen(byId.get(id)!)}><Thumb id={id} /></button>)}</div>
                <div class="rf-vmeta">
                  <b>{g.map((id) => byId.get(id)?.name).slice(0, 3).join(' · ')}{g.length > 3 ? ` +${g.length - 3}` : ''}</b>
                  <span class="rf-muted rf-small">{g.length} outfits</span>
                </div>
                {g.length === 2 && <button class="rf-btn" onClick={() => g.forEach((id) => !multi.has(id) && onToggle(id))}><Ico n="compare" size={16} />Pick both</button>}
              </div>
            ))}
          </div>
        </div>
      )}
      <div class="rf-block">
        <h3>{reused.length ? 'Reused items' : 'Items'} <span class="rf-muted">· {plural(rows.length, 'unique item')} across {plural(details.size, 'outfit')}</span></h3>
        <div class="rf-irows">
          {(all ? rows : (reused.length ? reused : rows)).slice(0, all ? 400 : 40).map((r) => {
            const v = thumbs.data?.[r.id];
            return (
              <button class="rf-irow" key={r.id} onClick={() => onFilter({ id: r.id, name: r.name })}>
                <span class="rf-ithumb">{v?.rec?.thumb ? <img src={v.rec.thumb} alt="" loading="lazy" /> : <Ico n="boxes" size={16} />}</span>
                <span class="rf-iname"><b>{r.name}</b><span class="rf-muted rf-small">{r.typeName}</span></span>
                <span class="rf-istrip">{r.outfits.slice(0, 5).map((id) => <span key={id} class="rf-mini"><Thumb id={id} /></span>)}</span>
                <span class="rf-icount">{r.outfits.length === 1 ? 'in 1 outfit' : `in ${r.outfits.length} outfits`}</span>
              </button>
            );
          })}
        </div>
        {!all && rows.length > (reused.length || 40) && <button class="rf-btn" onClick={() => setAll(true)}>Show all {rows.length}</button>}
      </div>
    </div>
  );
}
