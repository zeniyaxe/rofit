import { useMemo, useRef, useState } from 'preact/hooks';
import type { LibraryEntry } from '../shared/types.ts';
import { rpc } from '../shared/rpc.ts';
import type { Settings } from '../shared/settings.ts';
import { saveSettings } from '../shared/settings.ts';
import { Ico } from './icons.tsx';
import { Chip, Empty, Menu, Seg, Thumb, useToast } from './primitives.tsx';
import { dateStr, download, plural } from './format.ts';
import { useDebounced, useReducedMotion } from './data.ts';
import { useFlip, useIntro } from './motion.tsx';

interface Props {
  entries: LibraryEntry[] | undefined;
  settings: Settings;
  openKey: string | null;
  multi: Set<string>;
  onOpen: (e: LibraryEntry, from?: DOMRect, src?: string) => void;
  onToggle: (key: string) => void;
  onCompare: () => void;
  onClearMulti: () => void;
  onRemove: (keys: string[]) => void;
  onReload: () => void;
  searchRef: { current: HTMLInputElement | null };
  scopeUserId?: number;
}

export function LibraryView(p: Props) {
  const toast = useToast();
  const [q, setQ] = useState('');
  const dq = useDebounced(q, 120);
  const [coll, setColl] = useState('');
  const [user, setUser] = useState<number | 0>(0);
  const [tag, setTag] = useState('');
  const [sort, setSort] = useState<'recent' | 'name'>('recent');
  const fileRef = useRef<HTMLInputElement>(null);
  const all = p.entries ?? [];

  const collections = useMemo(() => [...new Set(all.map((e) => e.collection).filter(Boolean))].sort(), [all]);
  const users = useMemo(() => [...new Map(all.map((e) => [e.userId, e.userName])).entries()].sort((a, b) => a[1].localeCompare(b[1])), [all]);
  const tags = useMemo(() => [...new Set(all.flatMap((e) => e.tags))].sort(), [all]);

  const shown = useMemo(() => {
    const n = dq.trim().toLowerCase();
    let r = all.filter((e) => {
      if (coll && e.collection !== coll) return false;
      if (user && e.userId !== user) return false;
      if (tag && !e.tags.includes(tag)) return false;
      if (!n) return true;
      return e.name.toLowerCase().includes(n) || e.userName.toLowerCase().includes(n) || e.note.toLowerCase().includes(n)
        || e.tags.some((t) => t.toLowerCase().includes(n)) || e.details.assets.some((a) => a.name.toLowerCase().includes(n) || String(a.id) === n);
    });
    if (sort === 'name') r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [all, dq, coll, user, tag, sort]);

  const groups = useMemo(() => {
    const named = [...new Set(shown.map((e) => e.collection).filter(Boolean))].sort((x, y) => x.localeCompare(y));
    if (!named.length) return [{ name: '', items: shown }];
    const out = named.map((name) => ({ name, items: shown.filter((e) => e.collection === name) }));
    const rest = shown.filter((e) => !e.collection);
    if (rest.length) out.push({ name: '', items: rest });
    return out;
  }, [shown]);

  const exportAll = async () => {
    try { download(`rofit-library-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(await rpc('data.export', {}), null, 2)); toast('Exported library'); }
    catch { toast('Export failed', { tone: 'warn' }); }
  };
  const importFile = async (f: File) => {
    try {
      const r = await rpc('data.import', { data: JSON.parse(await f.text()) });
      toast(`Imported ${plural(r.added, 'outfit')}${r.skipped ? `, ${r.skipped} already here` : ''}`);
      p.onReload();
    } catch (e: any) { toast(e?.message ?? 'That file couldn’t be imported', { tone: 'warn' }); }
  };

  if (p.entries && all.length === 0) {
    return (
      <div class="rf-explorer">
        <Empty icon="library" title="Your library is empty" body="Save an outfit from any profile and it lands here with its items, prices and body settings frozen as you saw them. It stays useful even if the original disappears.">
          <button class="rf-btn" onClick={() => fileRef.current?.click()}><Ico n="upload" size={16} />Import a backup</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) importFile(f); }} />
        </Empty>
      </div>
    );
  }

  return (
    <section class="rf-explorer" aria-label="Library">
      <div class="rf-toolbar">
        <label class="rf-search">
          <Ico n="search" size={16} />
          <input ref={(el) => { p.searchRef.current = el; }} type="search" placeholder="Search names, items, tags, notes" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} aria-label="Search library" />
          {q ? <button class="rf-clear" aria-label="Clear search" onClick={() => setQ('')}><Ico n="close" size={14} /></button> : <kbd class="rf-kbd">/</kbd>}
        </label>
        {users.length > 1 && (
          <Menu label="Filter by user" class="rf-btn" align="left" items={[{ label: 'All users', checked: !user, onClick: () => setUser(0) }, { sep: true }, ...users.map(([id, n]) => ({ label: n, checked: user === id, onClick: () => setUser(id) }))]}>
            <Ico n="user" size={16} /><span>{user ? users.find(([i]) => i === user)?.[1] : 'Everyone'}</span><Ico n="down" size={14} />
          </Menu>
        )}
        {collections.length > 0 && (
          <Menu label="Filter by collection" class="rf-btn" align="left" items={[{ label: 'All collections', checked: !coll, onClick: () => setColl('') }, { sep: true }, ...collections.map((c) => ({ label: c, checked: coll === c, onClick: () => setColl(c) }))]}>
            <Ico n="layers" size={16} /><span>{coll || 'Collections'}</span><Ico n="down" size={14} />
          </Menu>
        )}
        <div class="rf-grow" />
        <Seg label="Sort" value={sort} onChange={setSort} options={[{ v: 'recent', label: 'Recent' }, { v: 'name', label: 'A–Z' }]} />
        <Seg label="Size" value={p.settings.density} onChange={(v) => saveSettings({ density: v })} options={[{ v: 'compact', label: 'S' }, { v: 'comfortable', label: 'M' }, { v: 'large', label: 'L' }]} />
        <Menu label="Library actions" items={[
          { label: 'Export library (.json)', icon: 'download', onClick: exportAll },
          { label: 'Import backup…', icon: 'upload', onClick: () => fileRef.current?.click() },
        ]} />
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) importFile(f); (e.target as HTMLInputElement).value = ''; }} />
      </div>
      <div class="rf-subbar">
        <span class="rf-count"><b>{plural(shown.length, 'saved outfit')}</b>{shown.length !== all.length && <> of {all.length}</>}</span>
        {tags.slice(0, 12).map((t) => <button key={t} class={'rf-chip btn' + (tag === t ? ' accent' : '')} onClick={() => setTag(tag === t ? '' : t)}><Ico n="tag" size={11} />{t}</button>)}
      </div>
      <div class="rf-scroll">
        {!p.entries ? <div class="rf-grid comfortable">{Array.from({ length: 8 }, (_, i) => <div class="rf-card sk" key={i}><div class="rf-thumb"><div class="rf-skel" /></div></div>)}</div>
          : shown.length === 0 ? <Empty icon="search" title="Nothing matches" body="Try a different word, or clear the filters."><button class="rf-btn" onClick={() => { setQ(''); setColl(''); setUser(0); setTag(''); }}>Clear filters</button></Empty>
            : groups.map((g) => (
              <section class="rf-lgroup" key={g.name}>
                {groups.length > 1 && <h3>{g.name || 'Uncollected'}<span>{g.items.length}</span></h3>}
                <LibGrid items={g.items} p={p} />
              </section>
            ))}
      </div>
      {p.multi.size > 0 && (
        <div class="rf-tray">
          <b>{p.multi.size} selected</b>
          <div class="rf-grow" />
          <button class="rf-btn primary" disabled={p.multi.size !== 2} onClick={p.onCompare}><Ico n="compare" size={16} />Compare</button>
          <button class="rf-btn danger" onClick={() => p.onRemove([...p.multi])}><Ico n="trash" size={16} />Remove</button>
          <button class="rf-btn" onClick={p.onClearMulti}>Clear</button>
        </div>
      )}
    </section>
  );
}

export { Chip, dateStr };

function LibGrid({ items, p }: { items: LibraryEntry[]; p: Props }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion(p.settings.motion);
  useFlip(ref, items.map((e) => e.key).join(',') + p.settings.density, reduced);
  const intro = useIntro('lib');
  return (
    <div ref={ref} class={`rf-grid grid ${p.settings.density}${items.length > 150 ? ' big' : ''}${intro ? ' intro' : ''}`} role="list">
      {items.map((e, i) => {
        const picked = p.multi.has(e.key);
        const chips = Object.values(e.assets).filter((a) => a.thumb).slice(0, 4);
        const more = e.details.assets.length - chips.length;
        return (
          <div role="listitem" data-k={e.key} data-oid={e.outfitId} style={{ '--i': Math.min(i, 24) } as any} class={'rf-cell' + (picked ? ' picked' : '') + (p.openKey === e.key ? ' active' : '')} key={e.key}>
            <button class="rf-card" title={e.name} aria-label={`${e.name} by ${e.userName}`}
              onClick={(ev) => { if (ev.shiftKey || ev.ctrlKey || ev.metaKey || p.multi.size) { p.onToggle(e.key); return; } const th = (ev.currentTarget as HTMLElement).querySelector('.rf-thumb'); p.onOpen(e, th?.getBoundingClientRect(), th?.querySelector('img')?.currentSrc); }}
              onKeyDown={(ev) => { if (ev.key === ' ') { ev.preventDefault(); p.onToggle(e.key); } }}>
              <Thumb id={e.outfitId} src={e.thumb} size="420x420" />
              <span class="rf-card-t">
                <span class="rf-card-name">{e.name}</span>
                <span class="rf-card-sub">{e.userName}</span>
                {p.settings.density !== 'compact' && <span class="rf-strip" aria-hidden="true">{chips.map((a) => <img key={a.id} src={a.thumb} alt="" loading="lazy" />)}{more > 0 && <em>+{more}</em>}</span>}
              </span>
              {e.note && <span class="rf-badge" title="Has a note"><Ico n="note" size={13} /></span>}
            </button>
            <button class="rf-pick" role="checkbox" aria-checked={picked} aria-label={`Select ${e.name}`} tabIndex={-1} onClick={() => p.onToggle(e.key)}>{picked && <Ico n="check" size={14} />}</button>
          </div>
        );
      })}
    </div>
  );
}
