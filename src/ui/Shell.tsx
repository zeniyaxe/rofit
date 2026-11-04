import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { AccessInfo } from '../shared/access.ts';
import type { LibraryEntry, OutfitDetails, OutfitRec, RpcError } from '../shared/types.ts';
import { outfitKey } from '../shared/types.ts';
import { rpc } from '../shared/rpc.ts';
import { saveSettings } from '../shared/settings.ts';
import { isRoFitHash, rofitHash } from '../shared/deeplink.ts';
import { Ico } from './icons.tsx';
import { Menu, ToastHost, useToast } from './primitives.tsx';
import { Explorer } from './Explorer.tsx';
import { Inspector } from './Inspector.tsx';
import { Compare, type Subject } from './Compare.tsx';
import { LibraryView } from './Library.tsx';
import { Palette, ShortcutsDialog, MOD, type Command } from './Palette.tsx';
import { useAsync, useIndexer, useMotion, useOutfits, useSettings } from './data.ts';
import { useIndicator } from './motion.tsx';
import { download, errorText, plural } from './format.ts';

type Tab = 'outfits' | 'library';
interface Open { id: number; name: string; isEditable?: boolean; rect?: DOMRect; src?: string; lib?: LibraryEntry; userId: number; userName: string; closing?: boolean }

/** Shared by the on-profile sheet (userId set) and the standalone Library page (no userId). */
export function Shell(p: {
  userId?: number; userName?: string; initialOutfit?: number; onExit?: () => void; standalone?: boolean;
  /** Text for the library's import dialog (a share link handed over by rofit.site). */
  importText?: string | null; onImportShown?: () => void;
  /** Library entry to open once the library has loaded (the popup's search links here). */
  openKey?: string | null;
}) {
  return <ToastHost><ShellInner {...p} /></ToastHost>;
}

const profileUrl = (id: number) => `https://www.roblox.com/users/${id}/profile#rofit`;

function ShellInner({ userId, userName, initialOutfit, onExit, standalone, importText, onImportShown, openKey }: {
  userId?: number; userName?: string; initialOutfit?: number; onExit?: () => void; standalone?: boolean; importText?: string | null; onImportShown?: () => void; openKey?: string | null;
}) {
  const settings = useSettings();
  const motion = useMotion(settings.motion);
  const toast = useToast();
  const [tab, setTab] = useState<Tab>(userId ? 'outfits' : 'library');
  const [open, setOpen] = useState<Open | null>(null);
  const [multi, setMulti] = useState<Set<number>>(new Set());
  const [multiLib, setMultiLib] = useState<Set<string>>(new Set());
  const [compare, setCompare] = useState<{ a: Subject; b: Subject } | null>(null);
  const [itemFilter, setItemFilter] = useState<{ id: number; name: string } | null>(null);
  const [narrow, setNarrow] = useState(false);
  const [dockAnim, setDockAnim] = useState<'' | 'enter' | 'switch' | 'exit'>('');
  const [palette, setPalette] = useState(false);
  const [keys, setKeys] = useState(false);
  const [saving, setSaving] = useState<{ done: number; total: number } | null>(null);
  const [libImport, setLibImport] = useState<string | null>(importText ?? null);
  const prevKey = useRef<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement | null>(null);
  const order = useRef<{ outfits: number[]; library: string[] }>({ outfits: [], library: [] });

  const uid = userId ?? 0;
  const list = useOutfits(uid || -1, userName);
  const indexer = useIndexer(uid);
  const libQ = useAsync(() => rpc('library.list', {}), []);
  const entries = libQ.data;
  const savedKeys = useMemo(() => new Set((entries ?? []).map((e) => e.key)), [entries]);
  const collections = useMemo(() => [...new Set((entries ?? []).map((e) => e.collection).filter(Boolean))].sort(), [entries]);

  useEffect(() => { if (importText != null) { setLibImport(importText); setTab('library'); setOpen(null); } }, [importText]);
  const deepLib = useRef<string | null>(null);
  useEffect(() => { if (openKey) deepLib.current = openKey; }, [openKey]);
  useEffect(() => {
    const k = deepLib.current;
    if (!k || !entries) return;
    deepLib.current = null;
    const e = entries.find((x) => x.key === k);
    if (e) { setTab('library'); openLib(e); } else toast('That outfit isn’t in your library any more', { tone: 'warn' });
  }, [openKey, entries]);

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
    // Keep the URL pointing at the open outfit, so it can be copied or reloaded. Roblox's own fragments are left alone.
    if (location.hash && !/^#!?\/?$/.test(location.hash) && !isRoFitHash(location.hash)) return;
    try {
      const u = new URL(location.href);
      u.hash = open && !open.lib ? rofitHash(open.id) : '';
      if (u.href !== location.href) history.replaceState(history.state, '', u.toString());
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
    setOpen((o) => (!o || o.closing ? o : { ...o, closing: true }));
    setDockAnim('exit');
    window.setTimeout(() => { setOpen((o) => (o?.closing ? null : o)); setDockAnim(''); }, motion === 'calm' ? 140 : motion === 'balanced' ? 200 : 260);
  }, [motion]);
  const cardRect = useCallback((id: number) => root.current?.querySelector(`[data-oid="${id}"] .rf-thumb`)?.getBoundingClientRect(), []);

  // ---- actions ----
  const openOutfit = useCallback((o: OutfitRec, rect?: DOMRect, src?: string) => setOpen({ id: o.id, name: o.name, isEditable: o.isEditable, rect, src, userId: uid, userName: userName ?? '' }), [uid, userName]);
  const openLib = (e: LibraryEntry, rect?: DOMRect, src?: string) => setOpen({ id: e.outfitId, name: e.name, userId: e.userId, userName: e.userName, rect, src, lib: e, isEditable: true });
  const toggleMulti = (id: number) => setMulti((m) => { const n = new Set(m); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleLib = (k: string) => setMultiLib((m) => { const n = new Set(m); n.has(k) ? n.delete(k) : n.add(k); return n; });

  const save = async (o: Open) => {
    try {
      await rpc('library.save', { userId: o.userId, userName: o.userName, outfitId: o.id, name: o.name });
      libQ.reload(); toast('Saved to your library');
    } catch (e) { toast(errorText(e as RpcError).title, { tone: 'warn' }); }
  };
  const saveMany = async (ids: number[], collection: string) => {
    let ok = 0, failed = 0, last: RpcError | undefined;
    setSaving({ done: 0, total: ids.length });
    for (const id of ids) {
      const o = list.outfits.find((x) => x.id === id);
      if (!o) continue;
      try { await rpc('library.save', { userId: uid, userName: userName ?? '', outfitId: id, name: o.name, collection: collection || undefined }); ok++; }
      catch (e) { failed++; last = e as RpcError; if (last.kind === 'rate-limited') break; }
      setSaving({ done: ok + failed, total: ids.length });
    }
    setSaving(null); libQ.reload();
    if (!failed) { setMulti(new Set()); toast(`Saved ${plural(ok, 'outfit')}${collection ? ` to “${collection}”` : ''}`); }
    else toast(`Saved ${ok} of ${ids.length}. ${errorText(last).title}`, { tone: 'warn' });
  };
  const unsave = async (ks: string[]) => {
    await rpc('library.remove', { keys: ks }); libQ.reload();
    setMultiLib(new Set()); if (open?.lib && ks.includes(open.lib.key)) closeInspector();
    toast(ks.length > 1 ? `Removed ${ks.length} outfits` : 'Removed from library');
  };
  const libUpdate = async (k: string, patch: Parameters<typeof rpc<'library.update'>>[1]['patch']) => {
    try { await rpc('library.update', { key: k, patch }); libQ.reload(); } catch { toast('Couldn’t save that', { tone: 'warn' }); }
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
  /** J/K: step through whatever the grid is showing, in its current order. */
  const step = (dir: 1 | -1) => {
    if (!open || compare) return;
    if (open.lib) {
      const ks = order.current.library; const i = ks.indexOf(open.lib.key); const k = ks[i + dir];
      const e = k ? entries?.find((x) => x.key === k) : undefined; if (e) openLib(e);
    } else {
      const ids = order.current.outfits; const i = ids.indexOf(open.id); const id = ids[i + dir];
      const o = id ? list.outfits.find((x) => x.id === id) : undefined; if (o) openOutfit(o);
    }
  };
  const goUser = (u: { id: number; name: string }) => {
    // Extension pages open a tab; on roblox.com the sheet simply follows the link (the content script reopens it there).
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) chrome.tabs.create({ url: profileUrl(u.id) });
    else location.assign(profileUrl(u.id));
  };
  const exportLib = async () => {
    try { download(`rofit-library-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(await rpc('data.export', {}), null, 2)); toast('Exported library'); }
    catch { toast('Export failed', { tone: 'warn' }); }
  };

  // ---- keyboard ----
  const onKey = (e: KeyboardEvent) => {
    // Window-level, not on the shell: if the focused element is removed (a tray button, a closed menu) focus falls to <body>
    // and shell-level handlers would silently stop working. Events are retargeted at the shadow boundary, so read the real target.
    const path = e.composedPath();
    const t = (path[0] ?? e.target) as HTMLElement;
    const inside = !!root.current && path.includes(root.current);
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k' && (inside || !t.closest?.('input,textarea'))) {
      e.preventDefault(); e.stopPropagation(); setKeys(false); setPalette((x) => !x); return;
    }
    // A menu, dialog or the palette owns Esc and arrows while it is open.
    if (root.current?.querySelector('.rf-menu[data-state=open], .rf-scrim[data-state=open]')) return;
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
    const k = e.key.toLowerCase();
    if (e.key === '/') { e.preventDefault(); search.current?.focus(); }
    else if (e.key === '?') { e.preventDefault(); setKeys(true); }
    else if (k === 'j' && open) { e.preventDefault(); step(1); }
    else if (k === 'k' && open) { e.preventDefault(); step(-1); }
    else if (k === 's' && open && !open.lib) { e.preventDefault(); savedKeys.has(outfitKey(open.userId, open.id)) ? unsave([outfitKey(open.userId, open.id)]) : save(open); }
    else if (k === 'c' && open) { e.preventDefault(); startCompare('pick'); }
  };
  const keyRef = useRef(onKey);
  keyRef.current = onKey;
  useEffect(() => {
    const f = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener('keydown', f, true);
    // Keys typed inside RoFit stop at its root, so Roblox's own page shortcuts don't see them. (Bubble phase, so RoFit's
    // own element handlers still run first.)
    const el = root.current;
    const stop = (e: Event) => e.stopPropagation();
    el?.addEventListener('keydown', stop);
    return () => { window.removeEventListener('keydown', f, true); el?.removeEventListener('keydown', stop); };
  }, []);

  const currentLib = open ? entries?.find((e) => e.key === outfitKey(open.userId, open.id)) : undefined;
  const reuseNames = (id: number) => list.outfits.find((o) => o.id === id)?.name ?? String(id);
  const feed = useCallback((d: OutfitDetails) => { if (d && open && open.userId === uid) indexer.add(d); }, [indexer.add, open?.userId, uid]);
  const openAccess: AccessInfo | undefined = !open ? undefined
    : open.lib?.source === 'share' ? { state: 'shared', at: open.lib.savedAt }
      : open.userId === uid ? list.access : undefined;

  useIndicator(tabsRef, tab, 10);
  const pool = settings.showPresets ? list.outfits : list.outfits.filter((o) => o.isEditable);
  const hasContent = tab === 'outfits' ? pool.length > 0 : (entries?.length ?? 0) > 0;
  const switchTab = (t: Tab) => { setTab(t); setOpen(null); };

  const commands: Command[] = [
    { id: 'search', label: tab === 'library' ? 'Search the library' : 'Search outfits', icon: 'search', hint: '/', run: () => setTimeout(() => search.current?.focus(), 150) },
    ...(userId ? [tab === 'library'
      ? { id: 'tab-o', label: `Go to ${userName}’s outfits`, icon: 'outfit' as const, run: () => switchTab('outfits') }
      : { id: 'tab-l', label: 'Go to your library', icon: 'library' as const, keywords: 'saved', run: () => switchTab('library') }] : []),
    ...(open && !open.lib ? [{ id: 'save', label: savedKeys.has(outfitKey(open.userId, open.id)) ? `Remove “${open.name}” from library` : `Save “${open.name}” to library`, icon: 'save' as const, hint: 'S', run: () => (savedKeys.has(outfitKey(open.userId, open.id)) ? unsave([outfitKey(open.userId, open.id)]) : save(open)) }] : []),
    ...(open ? [{ id: 'cmp', label: `Compare “${open.name}” with…`, icon: 'compare' as const, hint: 'C', run: () => startCompare('pick') },
      { id: 'cmp-me', label: `Compare “${open.name}” with what I’m wearing`, icon: 'user' as const, run: () => startCompare('me') }] : []),
    ...(tab === 'outfits' && userId && pool.some((o) => !indexer.details.has(o.id)) ? [{ id: 'index', label: 'Read every outfit (search items, filter by cost)', icon: 'layers' as const, keywords: 'index scan', run: () => indexer.run(pool.map((o) => o.id), settings.indexPrices) }] : []),
    ...(tab === 'outfits' && userId && indexer.details.size > 0 ? [{ id: 'prices', label: 'Load item prices for every outfit', icon: 'coins' as const, keywords: 'cost robux index', run: () => indexer.run(pool.map((o) => o.id), true) }] : []),
    ...(userId ? [{ id: 'refresh', label: 'Refresh from Roblox', icon: 'refresh' as const, keywords: 'reload sync', run: list.refresh }] : []),
    { id: 'layout', label: settings.layout === 'grid' ? 'Show as a list' : 'Show as a grid', icon: settings.layout === 'grid' ? 'list' : 'grid', keywords: 'layout view', run: () => saveSettings({ layout: settings.layout === 'grid' ? 'list' : 'grid' }) },
    { id: 'presets', label: settings.showPresets ? 'Hide Roblox presets' : 'Show Roblox presets', icon: settings.showPresets ? 'eyeOff' : 'eye', run: () => saveSettings({ showPresets: !settings.showPresets }) },
    { id: 'import', label: 'Import a backup or share link…', icon: 'upload', keywords: 'restore paste', run: () => { setTab('library'); setOpen(null); setLibImport(''); } },
    { id: 'export', label: 'Export library (.json)', icon: 'download', keywords: 'backup', run: exportLib },
    { id: 'settings', label: 'Open settings', icon: 'settings', keywords: 'preferences motion theme', run: () => rpc('page.open', { route: 'settings' }) },
    { id: 'keys', label: 'Keyboard shortcuts', icon: 'keyboard', hint: '?', run: () => setKeys(true) },
    ...(onExit && !standalone ? [{ id: 'exit', label: 'Close RoFit', icon: 'close' as const, hint: 'Esc', run: onExit }] : []),
  ];

  const inspector = open && (
    <Inspector key={open.lib?.key ?? open.id}
      userId={open.userId} userName={open.userName} outfit={open} settings={settings} fromRect={open.rect} fromSrc={open.src}
      saved={!!currentLib} libEntry={currentLib ?? open.lib}
      onSave={() => save(open)} onUnsave={() => unsave([outfitKey(open.userId, open.id)])}
      onClose={closeInspector} onCompare={startCompare} closing={!!open.closing} motion={motion} cardRect={cardRect}
      onLibUpdate={(patch) => libUpdate(outfitKey(open.userId, open.id), patch)}
      indexed={open.userId === uid ? indexer.details : new Map()} outfitName={reuseNames}
      onFilterItem={(f) => { setItemFilter(f); setTab('outfits'); if (narrow) setOpen(null); }}
      onDetails={feed} onViews={open.userId === uid ? indexer.addViews : undefined}
      onOpenOutfit={(id) => { const o = list.outfits.find((x) => x.id === id); if (o) openOutfit(o); }}
      libEntries={entries ?? []} onOpenEntry={(e) => openLib(e)} access={openAccess}
      narrow={narrow} />
  );

  const tabs = (
    <div class="rf-tabs" ref={tabsRef} role="tablist" aria-label="Outfits or library">
      {userId && <button role="tab" aria-selected={tab === 'outfits'} class={tab === 'outfits' ? 'on' : ''} onClick={() => switchTab('outfits')}>
        <Ico n="outfit" size={16} />Outfits{list.phase !== 'cache' && list.outfits.length > 0 ? <em>{pool.length}</em> : null}</button>}
      <button role="tab" aria-selected={tab === 'library'} class={tab === 'library' ? 'on' : ''} onClick={() => switchTab('library')}>
        <Ico n="library" size={16} />Library{entries && entries.length ? <em>{entries.length}</em> : null}</button>
    </div>
  );

  return (
    <div class={'rf-shell' + (narrow ? ' narrow' : '') + (open ? ' has-insp' : '')} ref={root} tabIndex={-1}>
      <header class="rf-bar">
        {!standalone && onExit && <button class="rf-btn ghost" onClick={onExit}><Ico n="back" size={16} />Profile</button>}
        {userId ? <div class="rf-who"><b>{userName}</b><span>RoFit</span></div> : <div class="rf-who"><b>Library</b><span>RoFit</span></div>}
        {tabs}
        <div class="rf-grow" />
        <button class="rf-btn ghost rf-cmdk" aria-label="Command palette" title={`Command palette (${MOD}+K)`} onClick={() => setPalette(true)}>
          <Ico n="command" size={16} /><span class="rf-hide-s">Jump to…</span><kbd class="rf-kbd rf-hide-s">{MOD} K</kbd>
        </button>
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
                <Explorer userId={uid} userName={userName ?? ''} list={list} settings={settings} motion={motion} openId={open && !open.lib ? open.id : null}
                  multi={multi} saved={savedKeys} collections={collections} details={indexer.details} recs={indexer.recs} indexing={indexer.progress} stopped={indexer.stopped} saving={saving}
                  onIndex={indexer.run} onCancelIndex={indexer.cancel} onOpen={openOutfit} onToggle={toggleMulti} onSelect={(ids) => setMulti(new Set([...multi, ...ids]))}
                  onCompare={compareSelected} onClearMulti={() => setMulti(new Set())} onSaveMany={saveMany} onOrder={(ids) => { order.current.outfits = ids; }}
                  itemFilter={itemFilter} setItemFilter={setItemFilter} searchRef={search} />
              ) : (
                <LibraryView entries={entries} settings={settings} motion={motion} openKey={open?.lib?.key ?? null} multi={multiLib}
                  onOpen={openLib} onToggle={toggleLib} onSelect={(ks) => setMultiLib(new Set([...multiLib, ...ks]))} onCompare={compareSelected} onClearMulti={() => setMultiLib(new Set())}
                  onRemove={unsave} onReload={libQ.reload} onOrder={(ks) => { order.current.library = ks; }} searchRef={search}
                  importText={libImport} onImportShown={() => { setLibImport(null); onImportShown?.(); }} />
              )}
            </div>
            {inspector ? <div class="rf-dock" data-anim={dockAnim}>{inspector}</div> : !narrow && hasContent && (
              <div class="rf-dock empty"><div class="rf-dock-hint"><Ico n="outfit" size={28} /><p>Pick an outfit to see what it’s made of.</p>
                <span class="rf-muted rf-small">Shift-click or Space selects several. <kbd class="rf-kbd">{MOD} K</kbd> jumps anywhere, <kbd class="rf-kbd">?</kbd> lists shortcuts.</span></div></div>
            )}
          </>
        )}
      </div>
      {palette && <Palette onClose={() => setPalette(false)} outfits={pool} userName={userName} entries={entries ?? []} commands={commands}
        onOpenOutfit={(o) => { setTab('outfits'); setCompare(null); openOutfit(o); }} onOpenEntry={(e) => { setTab('library'); setCompare(null); openLib(e); }} onGoUser={goUser} />}
      {keys && <ShortcutsDialog onClose={() => setKeys(false)} />}
    </div>
  );
}

export { Menu };
