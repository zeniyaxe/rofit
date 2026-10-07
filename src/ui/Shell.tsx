import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { LibraryEntry, OutfitDetails, OutfitRec } from '../shared/types.ts';
import { outfitKey } from '../shared/types.ts';
import { rpc } from '../shared/rpc.ts';
import { Ico } from './icons.tsx';
import { Menu, ToastHost, useToast } from './primitives.tsx';
import { Explorer } from './Explorer.tsx';
import { Inspector } from './Inspector.tsx';
import { Compare, type Subject } from './Compare.tsx';
import { LibraryView } from './Library.tsx';
import { useAsync, useIndexer, useOutfits, useReducedMotion, useSettings } from './data.ts';
import { useIndicator } from './motion.tsx';
import { errorText } from './format.ts';

type Tab = 'outfits' | 'library';
interface Open { id: number; name: string; isEditable?: boolean; rect?: DOMRect; src?: string; lib?: LibraryEntry; userId: number; userName: string; closing?: boolean }

/** Shared by the on-profile sheet (userId set) and the standalone Library page (no userId). */
export function Shell({ userId, userName, initialOutfit, onExit, standalone }: {
  userId?: number; userName?: string; initialOutfit?: number; onExit?: () => void; standalone?: boolean;
}) {
  return <ToastHost><ShellInner userId={userId} userName={userName} initialOutfit={initialOutfit} onExit={onExit} standalone={standalone} /></ToastHost>;
}

function ShellInner({ userId, userName, initialOutfit, onExit, standalone }: { userId?: number; userName?: string; initialOutfit?: number; onExit?: () => void; standalone?: boolean }) {
  const settings = useSettings();
  const reduced = useReducedMotion(settings.motion);
  const toast = useToast();
  const [tab, setTab] = useState<Tab>(userId ? 'outfits' : 'library');
  const [open, setOpen] = useState<Open | null>(null);
  const [multi, setMulti] = useState<Set<number>>(new Set());
  const [multiLib, setMultiLib] = useState<Set<string>>(new Set());
  const [compare, setCompare] = useState<{ a: Subject; b: Subject } | null>(null);
  const [itemFilter, setItemFilter] = useState<{ id: number; name: string } | null>(null);
  const [narrow, setNarrow] = useState(false);
  const [dockAnim, setDockAnim] = useState<'' | 'enter' | 'switch' | 'exit'>('');
  const prevKey = useRef<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement | null>(null);

  const uid = userId ?? 0;
  const list = useOutfits(uid || -1, userName);
  const indexer = useIndexer(uid);
  const libQ = useAsync(() => rpc('library.list', {}), []);
  const entries = libQ.data;
  const savedKeys = useMemo(() => new Set((entries ?? []).map((e) => e.key)), [entries]);

  // ---- layout: stack the inspector over the grid when the sheet is narrow ----
  useEffect(() => {
    const el = root.current; if (!el) return;
    const ro = new ResizeObserver(() => setNarrow(el.clientWidth < 980));
    ro.observe(el); setNarrow(el.clientWidth < 980);
    return () => ro.disconnect();
  }, []);

  // ---- deep link: open the outfit named in the URL once the list is known ----
  const deep = useRef(initialOutfit);
  useEffect(() => {
    if (deep.current && list.outfits.length) {
      const o = list.outfits.find((x) => x.id === deep.current);
      if (o) setOpen({ id: o.id, name: o.name, isEditable: o.isEditable, userId: uid, userName: userName ?? '' });
      deep.current = undefined;
    }
  }, [list.outfits]);

  useEffect(() => {
    if (!userId || standalone) return;
    try {
      const u = new URL(location.href);
      u.hash = open && !open.lib ? `rofit/${open.id}` : '';
      history.replaceState(history.state, '', u.toString());
    } catch { /* optional */ }
  }, [open?.id, open?.lib?.key]);

  // ---- inspector choreography: enter once, crossfade when switching outfits, fly back to its card on close ----
  const key = open ? (open.lib?.key ?? `${open.userId}:${open.id}`) : null;
  useEffect(() => {
    if (key && !prevKey.current) setDockAnim('enter');
    else if (key && prevKey.current && key !== prevKey.current) setDockAnim('switch');
    prevKey.current = key;
  }, [key]);
  const closeInspector = useCallback(() => {
    setOpen((o) => {
      if (!o || o.closing) return o;
      return { ...o, closing: true };
    });
    setDockAnim('exit');
    window.setTimeout(() => { setOpen((o) => (o?.closing ? null : o)); setDockAnim(''); }, reduced ? 140 : 260);
  }, [reduced]);
  const cardRect = useCallback((id: number) => root.current?.querySelector(`[data-oid="${id}"] .rf-thumb`)?.getBoundingClientRect(), []);

  // ---- actions ----
  const openOutfit = useCallback((o: OutfitRec, rect?: DOMRect, src?: string) => setOpen({ id: o.id, name: o.name, isEditable: o.isEditable, rect, src, userId: uid, userName: userName ?? '' }), [uid, userName]);
  const toggleMulti = (id: number) => setMulti((m) => { const n = new Set(m); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleLib = (k: string) => setMultiLib((m) => { const n = new Set(m); n.has(k) ? n.delete(k) : n.add(k); return n; });

  const save = async (o: Open) => {
    try {
      await rpc('library.save', { userId: o.userId, userName: o.userName, outfitId: o.id, name: o.name });
      libQ.reload(); toast('Saved to your library');
    } catch (e) { toast(errorText(e as any).title, { tone: 'warn' }); }
  };
  const unsave = async (keys: string[]) => {
    await rpc('library.remove', { keys }); libQ.reload();
    setMultiLib(new Set()); if (open?.lib && keys.includes(open.lib.key)) closeInspector();
    toast(keys.length > 1 ? `Removed ${keys.length} outfits` : 'Removed from library');
  };
  const libUpdate = async (key: string, patch: Parameters<typeof rpc<'library.update'>>[1]['patch']) => {
    try { await rpc('library.update', { key, patch }); libQ.reload(); } catch { toast('Couldn’t save that', { tone: 'warn' }); }
  };

  const subjectOfOutfit = (id: number): Subject => {
    const o = list.outfits.find((x) => x.id === id);
    return { kind: 'outfit', userId: uid, userName: userName ?? '', id, name: o?.name ?? String(id) };
  };
  const subjectOfLib = (k: string): Subject => {
    const e = entries!.find((x) => x.key === k)!;
    return { kind: 'outfit', userId: e.userId, userName: e.userName, id: e.outfitId, name: e.name, lib: e };
  };

  const startCompare = (how: 'pick' | 'me') => {
    if (!open) return;
    const here: Subject = open.lib ? subjectOfLib(open.lib.key) : { kind: 'outfit', userId: open.userId, userName: open.userName, id: open.id, name: open.name };
    if (how === 'me') { setCompare({ a: here, b: { kind: 'me' } }); return; }
    if (open.lib) {
      const others = [...multiLib].filter((k) => k !== open.lib!.key);
      if (others.length === 1) { setCompare({ a: here, b: subjectOfLib(others[0]) }); return; }
      setMultiLib(new Set([open.lib.key])); setOpen(null);
    } else {
      const others = [...multi].filter((k) => k !== open.id);
      if (others.length === 1) { setCompare({ a: here, b: subjectOfOutfit(others[0]) }); return; }
      setMulti(new Set([open.id])); if (narrow) setOpen(null);
    }
    toast('Pick the outfit to compare with');
  };
  const compareSelected = () => {
    if (tab === 'library') { const [a, b] = [...multiLib]; if (a && b) setCompare({ a: subjectOfLib(a), b: subjectOfLib(b) }); }
    else { const [a, b] = [...multi]; if (a && b) setCompare({ a: subjectOfOutfit(a), b: subjectOfOutfit(b) }); }
  };

  // ---- keyboard ----
  const onKey = (e: KeyboardEvent) => {
    // Window-level, not on the shell: if the focused element is removed (a tray button, a closed menu) focus falls to <body>
    // and shell-level handlers would silently stop working. Events are retargeted at the shadow boundary, so read the real target.
    const path = e.composedPath();
    const t = (path[0] ?? e.target) as HTMLElement;
    const inside = !!root.current && path.includes(root.current);
    if (inside) e.stopPropagation(); // keep Roblox's own page shortcuts from seeing keys typed into RoFit
    // A menu or dialog owns Esc while it is open.
    if (e.key === 'Escape' && root.current?.querySelector('.rf-menu[data-state=open], .rf-scrim[data-state=open]')) return;
    if (e.defaultPrevented) return;
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName ?? '') || !!t.isContentEditable;
    if (e.key === 'Escape') {
      if (typing && (t as HTMLInputElement).value) { (t as HTMLInputElement).value = ''; t.dispatchEvent(new Event('input', { bubbles: true })); return; }
      if (compare) setCompare(null);
      else if (open) closeInspector();
      else if (multi.size || multiLib.size) { setMulti(new Set()); setMultiLib(new Set()); }
      else onExit?.();
      return;
    }
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === '/') { e.preventDefault(); search.current?.focus(); }
    else if (e.key.toLowerCase() === 's' && open && !open.lib) { e.preventDefault(); savedKeys.has(outfitKey(open.userId, open.id)) ? unsave([outfitKey(open.userId, open.id)]) : save(open); }
    else if (e.key.toLowerCase() === 'c' && open) { e.preventDefault(); startCompare('pick'); }
  };

  const keyRef = useRef(onKey);
  keyRef.current = onKey;
  useEffect(() => {
    const f = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener('keydown', f, true);
    return () => window.removeEventListener('keydown', f, true);
  }, []);

  const openLib = (e: LibraryEntry, rect?: DOMRect, src?: string) => setOpen({ id: e.outfitId, name: e.name, userId: e.userId, userName: e.userName, rect, src, lib: e, isEditable: true });
  const currentLib = open ? entries?.find((e) => e.key === outfitKey(open.userId, open.id)) : undefined;
  const reuseNames = (id: number) => list.outfits.find((o) => o.id === id)?.name ?? String(id);
  const feed = useCallback((d: OutfitDetails) => indexer.add(d), [indexer.add]);

  useIndicator(tabsRef, tab, 10);
  const hasContent = tab === 'outfits' ? list.outfits.some((o) => o.isEditable || settings.showPresets) : (entries?.length ?? 0) > 0;
  const inspector = open && (
    <Inspector key={open.lib?.key ?? open.id}
      userId={open.userId} userName={open.userName} outfit={open} settings={settings} fromRect={open.rect} fromSrc={open.src}
      saved={!!currentLib} libEntry={currentLib}
      onSave={() => save(open)} onUnsave={() => unsave([outfitKey(open.userId, open.id)])}
      onClose={closeInspector} onCompare={startCompare} closing={!!open.closing} reduced={reduced} cardRect={cardRect}
      onLibUpdate={(patch) => libUpdate(outfitKey(open.userId, open.id), patch)}
      indexed={open.userId === uid ? indexer.details : new Map()} outfitName={reuseNames}
      onFilterItem={(f) => { setItemFilter(f); setTab('outfits'); if (narrow) setOpen(null); }}
      onDetails={feed}
      onOpenOutfit={(id) => { const o = list.outfits.find((x) => x.id === id); if (o) openOutfit(o); }}
      narrow={narrow} />
  );

  const tabs = (
    <div class="rf-tabs" ref={tabsRef} role="tablist" aria-label="Outfits or library">
      {userId && <button role="tab" aria-selected={tab === 'outfits'} class={tab === 'outfits' ? 'on' : ''} onClick={() => { setTab('outfits'); setOpen(null); }}>
        <Ico n="outfit" size={16} />Outfits{list.phase !== 'cache' && list.outfits.length > 0 ? <em>{list.outfits.filter((o) => settings.showPresets || o.isEditable).length}</em> : null}</button>}
      <button role="tab" aria-selected={tab === 'library'} class={tab === 'library' ? 'on' : ''} onClick={() => { setTab('library'); setOpen(null); }}>
        <Ico n="library" size={16} />Library{entries && entries.length ? <em>{entries.length}</em> : null}</button>
    </div>
  );

  return (
    <div class={'rf-shell' + (narrow ? ' narrow' : '') + (open ? ' has-insp' : '')} ref={root} tabIndex={-1}>
      <header class="rf-bar">
        {!standalone && onExit && <button class="rf-btn ghost" onClick={onExit}><Ico n="back" size={16} />Profile</button>}
        {userId && <div class="rf-who"><b>{userName}</b><span>RoFit</span></div>}
        {!userId && <div class="rf-who"><b>Library</b><span>RoFit</span></div>}
        {tabs}
        <div class="rf-grow" />
        <button class="rf-ib" aria-label="Open settings" title="Settings" onClick={() => rpc('page.open', { route: 'settings' })}><Ico n="settings" /></button>
        {!standalone && onExit && <button class="rf-ib" aria-label="Close (Esc)" title="Close (Esc)" onClick={onExit}><Ico n="close" /></button>}
      </header>

      <div class="rf-main">
        {compare ? (
          <Compare a={compare.a} b={compare.b} onClose={() => setCompare(null)} onSwap={() => setCompare({ a: compare.b, b: compare.a })} />
        ) : (
          <>
            <div class="rf-pane" inert={narrow && !!open && !open.closing}>
              {tab === 'outfits' && userId ? (
                <Explorer userId={uid} userName={userName ?? ''} list={list} settings={settings} openId={open && !open.lib ? open.id : null}
                  multi={multi} saved={savedKeys} details={indexer.details} indexing={indexer.progress}
                  onIndex={indexer.run} onCancelIndex={indexer.cancel} onOpen={openOutfit} onToggle={toggleMulti}
                  onCompare={compareSelected} onClearMulti={() => setMulti(new Set())}
                  itemFilter={itemFilter} setItemFilter={setItemFilter} searchRef={search} />
              ) : (
                <LibraryView entries={entries} settings={settings} openKey={open?.lib?.key ?? null} multi={multiLib}
                  onOpen={openLib} onToggle={toggleLib} onCompare={compareSelected} onClearMulti={() => setMultiLib(new Set())}
                  onRemove={unsave} onReload={libQ.reload} searchRef={search} />
              )}
            </div>
            {inspector ? <div class="rf-dock" data-anim={dockAnim}>{inspector}</div> : !narrow && hasContent && <div class="rf-dock empty"><div class="rf-dock-hint"><Ico n="outfit" size={28} /><p>Pick an outfit to see what it’s made of.</p><span class="rf-muted rf-small">Shift-click or Space to select several.</span></div></div>}
          </>
        )}
      </div>
    </div>
  );
}

export { Menu };
