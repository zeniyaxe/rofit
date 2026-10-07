import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { OutfitRec, OutfitDetails } from '../shared/types.ts';
import { clusterVariants, reuseMap } from '../shared/analysis.ts';
import { rpc } from '../shared/rpc.ts';
import type { Settings } from '../shared/settings.ts';
import { saveSettings } from '../shared/settings.ts';
import { Ico } from './icons.tsx';
import { Chip, Empty, Menu, Seg, Spinner, Thumb } from './primitives.tsx';
import { errorText, plural, timeAgo } from './format.ts';
import { useAsync, useDebounced, useReducedMotion, type OutfitList } from './data.ts';
import { useFlip, useIntro } from './motion.tsx';
import { NoOutfits } from './NoOutfits.tsx';
import type { AssetView } from '../shared/types.ts';

export type Sort = 'roblox' | 'name' | 'items';

interface Props {
  userName: string;
  list: OutfitList;
  settings: Settings;
  openId: number | null;
  multi: Set<number>;
  saved: Set<string>;
  userId: number;
  details: Map<number, OutfitDetails>;
  indexing: { done: number; total: number; failed: number } | null;
  onIndex: (ids: number[]) => void;
  onCancelIndex: () => void;
  onOpen: (o: OutfitRec, from?: DOMRect, src?: string) => void;
  onToggle: (id: number) => void;
  onCompare: () => void;
  onClearMulti: () => void;
  itemFilter: { id: number; name: string } | null;
  setItemFilter: (f: { id: number; name: string } | null) => void;
  searchRef: { current: HTMLInputElement | null };
}

export function Explorer(p: Props) {
  const { settings: st, list } = p;
  const [q, setQ] = useState('');
  const dq = useDebounced(q, 120);
  const [sort, setSort] = useState<Sort>('roblox');
  const [view, setView] = useState<'outfits' | 'items'>('outfits');
  const [type, setType] = useState<'all' | 'R6' | 'R15'>('all');
  const [bannerGone, setBannerGone] = useState(false);

  const saved = list.outfits.filter((o) => o.isEditable);
  const presets = list.outfits.filter((o) => !o.isEditable);
  const pool = st.showPresets ? list.outfits : saved;
  const indexedCount = pool.filter((o) => p.details.has(o.id)).length;
  const fullyIndexed = pool.length > 0 && indexedCount === pool.length;

  const shown = useMemo(() => {
    const needle = dq.trim().toLowerCase();
    let r = pool.filter((o) => {
      const d = p.details.get(o.id);
      if (type !== 'all' && d?.avatarType !== type) return false;
      if (p.itemFilter && !d?.assets.some((a) => a.id === p.itemFilter!.id)) return false;
      if (!needle) return true;
      if (o.name.toLowerCase().includes(needle) || String(o.id) === needle) return true;
      return !!d?.assets.some((a) => a.name.toLowerCase().includes(needle) || String(a.id) === needle);
    });
    if (sort === 'name') r = [...r].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    if (sort === 'items') r = [...r].sort((a, b) => (p.details.get(b.id)?.assets.length ?? -1) - (p.details.get(a.id)?.assets.length ?? -1));
    return r;
  }, [pool, dq, sort, type, p.details, p.itemFilter]);

  const itemMatchCount = (o: OutfitRec) => {
    const needle = dq.trim().toLowerCase();
    if (!needle || o.name.toLowerCase().includes(needle)) return null;
    const d = p.details.get(o.id);
    return d?.assets.find((a) => a.name.toLowerCase().includes(needle) || String(a.id) === needle)?.name ?? null;
  };

  // Roving focus across the grid.
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion(st.motion);
  useFlip(gridRef, shown.map((o) => o.id).join(',') + st.layout + st.density + view, reduced);
  const intro = useIntro(list.phase === 'cache' || (list.phase === 'syncing' && !list.outfits.length) ? 'loading' : uidKey(p.userId));
  const onGridKey = (e: KeyboardEvent) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const cards = [...(gridRef.current?.querySelectorAll<HTMLElement>('.rf-card') ?? [])];
    const root = gridRef.current!.getRootNode() as ShadowRoot | Document;
    const i = cards.indexOf(root.activeElement as HTMLElement);
    if (i < 0) return;
    e.preventDefault();
    let cols = 1;
    if (st.layout === 'grid') {
      const top = cards[0].offsetTop;
      cols = Math.max(1, cards.filter((c) => c.offsetTop === top).length);
    }
    const nxt = e.key === 'ArrowLeft' ? i - 1 : e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowUp' ? i - cols : e.key === 'ArrowDown' ? i + cols : e.key === 'Home' ? 0 : cards.length - 1;
    cards[Math.max(0, Math.min(cards.length - 1, nxt))]?.focus();
  };

  const loading = list.phase === 'cache' || (list.phase === 'syncing' && !list.outfits.length);

  return (
    <section class="rf-explorer" aria-label={`${p.userName}’s outfits`}>
      <div class="rf-toolbar">
        <label class="rf-search">
          <Ico n="search" size={16} />
          <input ref={(el) => { p.searchRef.current = el; }} type="search" placeholder={fullyIndexed ? 'Search outfits and items' : 'Search outfits'} value={q}
            onInput={(e) => setQ((e.target as HTMLInputElement).value)} aria-label="Search outfits" />
          {q && <button class="rf-clear" aria-label="Clear search" onClick={() => setQ('')}><Ico n="close" size={14} /></button>}
          {!q && <kbd class="rf-kbd">/</kbd>}
        </label>
        <Menu label="Sort and filter" class="rf-btn" icon="sort" align="right" items={[
          { label: 'Roblox order', checked: sort === 'roblox', onClick: () => setSort('roblox') },
          { label: 'Name', checked: sort === 'name', onClick: () => setSort('name') },
          { label: 'Most items', checked: sort === 'items', onClick: () => setSort('items'), disabled: indexedCount === 0, hint: indexedCount ? '' : 'needs index' },
          { sep: true },
          { label: 'Any avatar type', checked: type === 'all', onClick: () => setType('all') },
          { label: 'R15 only', checked: type === 'R15', onClick: () => setType('R15'), disabled: indexedCount === 0 },
          { label: 'R6 only', checked: type === 'R6', onClick: () => setType('R6'), disabled: indexedCount === 0 },
          { sep: true },
          { label: `Roblox presets${presets.length ? ` (${presets.length})` : ''}`, icon: st.showPresets ? 'eye' : 'eyeOff', checked: st.showPresets, onClick: () => saveSettings({ showPresets: !st.showPresets }) },
        ]}><Ico n="sort" size={16} /><span class="rf-hide-s">Sort</span>{(sort !== 'roblox' || type !== 'all') && <i class="rf-dot" />}</Menu>
        {indexedCount > 0 && (
          <Seg label="View" value={view} onChange={setView} options={[{ v: 'outfits', icon: 'outfit', label: 'Outfits' }, { v: 'items', icon: 'layers', label: 'Items' }]} />
        )}
        <div class="rf-grow" />
        <Seg label="Layout" value={st.layout} onChange={(v) => saveSettings({ layout: v })} options={[{ v: 'grid', icon: 'grid', title: 'Grid' }, { v: 'list', icon: 'list', title: 'List' }]} />
        <Seg label="Size" value={st.density} onChange={(v) => saveSettings({ density: v })} options={[{ v: 'compact', label: 'S', title: 'Compact' }, { v: 'comfortable', label: 'M', title: 'Comfortable' }, { v: 'large', label: 'L', title: 'Large' }]} />
        <button class="rf-ib" aria-label="Refresh from Roblox" title="Refresh from Roblox" onClick={list.refresh} disabled={list.phase === 'syncing'}>
          {list.phase === 'syncing' ? <Spinner /> : <Ico n="refresh" />}
        </button>
      </div>

      <div class={'rf-refresh' + (list.phase === 'syncing' && list.outfits.length ? ' on' : '')} aria-hidden="true" />
      <div class="rf-subbar">
        <span class="rf-count" aria-live="polite">
          {loading ? 'Loading outfits…' : <>
            <b>{plural(shown.length, 'outfit')}</b>
            {shown.length !== pool.length && <> of {pool.length}</>}
            {!st.showPresets && presets.length > 0 && <> · <button class="rf-linkbtn" onClick={() => saveSettings({ showPresets: true })}>+{presets.length} Roblox presets hidden</button></>}
          </>}
        </span>
        {p.itemFilter && <button class="rf-chip accent btn" onClick={() => p.setItemFilter(null)}>Contains {p.itemFilter.name}<Ico n="close" size={12} /></button>}
        {list.phase === 'error' && list.outfits.length > 0
          ? <button class="rf-chip warn btn" onClick={list.refresh} title={errorText(list.error).body}><Ico n="warn" size={12} />Couldn’t refresh · showing a saved copy · Retry</button>
          : list.fetchedAt && list.phase !== 'cache' && <span class="rf-muted rf-small">Updated {timeAgo(list.fetchedAt)}</span>}
        {list.changes && (list.changes.added + list.changes.removed + list.changes.renamed > 0) && (
          <Chip tone="accent" icon="info" title="Compared with the last time RoFit loaded this list">
            {[list.changes.added && `${list.changes.added} new`, list.changes.removed && `${list.changes.removed} removed`, list.changes.renamed && `${list.changes.renamed} renamed`].filter(Boolean).join(' · ')} since last visit
          </Chip>
        )}
      </div>

      {!bannerGone && !fullyIndexed && !loading && pool.length > 1 && !p.indexing && view === 'outfits' && (
        <div class="rf-note">
          <Ico n="layers" size={18} />
          <div class="rf-note-t">
            <b>Look inside {pool.length > 40 ? 'these outfits' : 'every outfit'}</b>
            <span>Search by item, spot reused pieces and near-duplicate looks. Loads each outfit once ({plural(pool.length - indexedCount, 'request')}), then it’s instant.</span>
          </div>
          <button class="rf-btn primary" onClick={() => p.onIndex(pool.map((o) => o.id))}>Index {pool.length - indexedCount}</button>
          <button class="rf-ib" aria-label="Dismiss" onClick={() => setBannerGone(true)}><Ico n="close" size={16} /></button>
        </div>
      )}
      {p.indexing && (
        <div class="rf-note" role="status">
          <Spinner />
          <div class="rf-note-t"><b>Reading outfits… {p.indexing.done}/{p.indexing.total}</b><span>{p.indexing.failed ? `${p.indexing.failed} couldn’t be read. ` : ''}Paced to stay under Roblox’s rate limits.</span></div>
          <div class="rf-progress"><i style={{ transform: `scaleX(${p.indexing.total ? p.indexing.done / p.indexing.total : 0})` }} /></div>
          <button class="rf-btn" onClick={p.onCancelIndex}>Stop</button>
        </div>
      )}

      <div class="rf-scroll" id="rf-explorer-scroll">
        {list.phase === 'error' && !list.outfits.length ? (
          <NoOutfits userName={p.userName} error={list.error} presets={0} viewer={list.error?.viewer} busy={false} onRetry={list.refresh} onShowPresets={() => saveSettings({ showPresets: true })} />
        ) : loading ? (
          <div class={'rf-grid ' + st.density}>{Array.from({ length: 12 }, (_, i) => <div class="rf-card sk" key={i}><div class="rf-thumb"><div class="rf-skel" /></div><div class="rf-sk-l" /></div>)}</div>
        ) : view === 'items' && indexedCount > 0 ? (
          <ItemsView details={p.details} pool={pool} onFilter={(f) => { p.setItemFilter(f); setView('outfits'); }} onOpen={p.onOpen} onToggle={p.onToggle} multi={p.multi} />
        ) : shown.length === 0 ? (
          pool.length === 0 ? (
            <NoOutfits userName={p.userName} presets={presets.length} viewer={list.viewer} via={list.via} busy={list.phase === 'syncing'} onRetry={list.refresh} onShowPresets={() => saveSettings({ showPresets: true })} />
          ) : (
            <Empty icon="search" title="No outfits match" body={p.itemFilter ? `None of the indexed outfits contain ${p.itemFilter.name}.` : 'Try fewer words. Item names only match after the outfits are indexed.'}>
              <button class="rf-btn" onClick={() => { setQ(''); setType('all'); p.setItemFilter(null); }}>Clear filters</button>
            </Empty>
          )
        ) : (
          <div ref={gridRef} class={`rf-grid ${st.layout} ${st.density}${shown.length > 150 ? ' big' : ''}${intro ? ' intro' : ''}`} role="list" onKeyDown={onGridKey}>
            {shown.map((o, i) => (
              <OutfitCard key={o.id} o={o} i={i} d={p.details.get(o.id)} active={p.openId === o.id} picked={p.multi.has(o.id)} isSaved={p.saved.has(`${p.userId}:${o.id}`)}
                list={st.layout === 'list'} matchedItem={itemMatchCount(o)} multiMode={p.multi.size > 0} onOpen={p.onOpen} onToggle={p.onToggle} showTech={st.technical} />
            ))}
          </div>
        )}
      </div>

      {p.multi.size > 0 && (
        <div class="rf-tray" role="region" aria-label="Selection">
          <b>{p.multi.size} selected</b>
          <span class="rf-muted rf-small">{p.multi.size === 2 ? 'Ready to compare' : p.multi.size < 2 ? 'Pick one more to compare' : 'Compare works on two at a time'}</span>
          <div class="rf-grow" />
          <button class="rf-btn primary" disabled={p.multi.size !== 2} onClick={p.onCompare}><Ico n="compare" size={16} />Compare</button>
          <button class="rf-btn" onClick={p.onClearMulti}>Clear</button>
        </div>
      )}
    </section>
  );
}

function OutfitCard({ o, i, d, active, picked, isSaved, list, matchedItem, multiMode, onOpen, onToggle, showTech }: {
  o: OutfitRec; i: number; d?: OutfitDetails; active: boolean; picked: boolean; isSaved: boolean; list: boolean; matchedItem: string | null; multiMode: boolean;
  onOpen: Props['onOpen']; onToggle: (id: number) => void; showTech: boolean;
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
  return (
    <div ref={host} role="listitem" data-k={o.id} data-oid={o.id} style={{ '--i': Math.min(i, 24) } as any} class={'rf-cell' + (picked ? ' picked' : '') + (active ? ' active' : '')}>
      <button ref={ref} class="rf-card" title={o.name} onClick={click} aria-label={`${o.name}${isSaved ? ', saved' : ''}`} aria-pressed={picked ? true : undefined} aria-current={active ? 'true' : undefined}
        onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); onToggle(o.id); } }}>
        <Thumb id={o.id} enabled={near} />
        <span class="rf-card-t">
          <span class="rf-card-name">{o.name || 'Untitled'}</span>
          <span class="rf-card-sub">
            {matchedItem ? <><Ico n="search" size={11} />{matchedItem}</> : sub ?? (showTech ? `#${o.id}` : ' ')}
            {!o.isEditable && <em class="rf-tag">Preset</em>}
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
                <div class="rf-vstack">{g.slice(0, 5).map((id) => <button key={id} class={'rf-vthumb' + (multi.has(id) ? ' on' : '')} title={byId.get(id)?.name} onClick={() => onOpen(byId.get(id)!)}><Thumb id={id} /></button>)}</div>
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

const uidKey = (id: number) => `u${id}`;
