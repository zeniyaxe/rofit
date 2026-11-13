import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { AssetRec, LibraryEntry } from '../shared/types.ts';
import { rpc } from '../shared/rpc.ts';
import type { Settings } from '../shared/settings.ts';
import { saveSettings } from '../shared/settings.ts';
import type { MotionLevel } from '../shared/motion.ts';
import type { ImportReport } from '../shared/backup.ts';
import { costTotal, outfitCost, type OutfitCost } from '../shared/analysis.ts';
import { isEmpty, matchFields, norm, parseQuery, type Field } from '../shared/search.ts';
import { Ico } from './icons.tsx';
import { Confirm, Dialog, Empty, Figure, Menu, Prompt, Seg, Spinner, Thumb, Toggle, useToast } from './primitives.tsx';
import { costFigure, dateStr, download, plural, robux } from './format.ts';
import { useDebounced } from './data.ts';
import { useFlip, useIntro } from './motion.tsx';

type LibSort = 'recent' | 'name' | 'user' | 'cost';

interface Props {
  entries: LibraryEntry[] | undefined;
  settings: Settings;
  motion: MotionLevel;
  openKey: string | null;
  multi: Set<string>;
  onOpen: (e: LibraryEntry, from?: DOMRect, src?: string) => void;
  onToggle: (key: string) => void;
  onSelect: (keys: string[]) => void;
  onCompare: () => void;
  onClearMulti: () => void;
  onRemove: (keys: string[]) => void;
  onReload: () => void;
  onOrder: (keys: string[]) => void;
  searchRef: { current: HTMLInputElement | null };
  /** A share link handed over by rofit.site (via the bridge): opens the import dialog prefilled. */
  importText?: string | null;
  onImportShown?: () => void;
}

function fieldsOf(e: LibraryEntry): Field[] {
  const f: Field[] = [
    { text: e.name, weight: 1.25, kind: 'name' }, { text: e.userName, kind: 'user', label: `by ${e.userName}` },
    { text: e.collection, weight: 0.8, kind: 'collection', label: e.collection }, { text: e.note, weight: 0.6, kind: 'note', label: 'in your note' },
    { text: '', id: e.outfitId, kind: 'id' },
  ];
  for (const t of e.tags) f.push({ text: t, kind: 'tag', label: `#${t}` });
  for (const a of e.details.assets) f.push({ text: a.name, kind: 'item', label: a.name, id: a.id });
  return f;
}
const costOf = (e: LibraryEntry): OutfitCost | undefined => {
  if (e.source === 'share' || e.source === 'import') return undefined; // links and manifests carry no prices
  const c = outfitCost(e.details.assets.map((a) => a.id), new Map(Object.entries(e.assets).map(([k, v]) => [Number(k), v as AssetRec])));
  return c.known ? c : undefined;
};

export function LibraryView(p: Props) {
  const toast = useToast();
  const [q, setQ] = useState('');
  const dq = useDebounced(q, 90);
  const [coll, setColl] = useState<string | null>(null);
  const [user, setUser] = useState<number | 0>(0);
  const [tag, setTag] = useState('');
  const [fav, setFav] = useState(false);
  const [sort, setSort] = useState<LibSort>('recent');
  const [dialog, setDialog] = useState<null | 'import' | 'collections' | 'move' | 'tag' | 'remove'>(null);
  const [importText, setImportText] = useState<string | undefined>();
  const all = p.entries ?? [];

  useEffect(() => { if (p.importText != null) { setImportText(p.importText); setDialog('import'); p.onImportShown?.(); } }, [p.importText]);

  const collections = useMemo(() => [...new Set(all.map((e) => e.collection).filter(Boolean))].sort((a, b) => a.localeCompare(b)), [all]);
  const users = useMemo(() => [...new Map(all.map((e) => [e.userId, e.userName])).entries()].sort((a, b) => a[1].localeCompare(b[1])), [all]);
  const tags = useMemo(() => [...new Set(all.flatMap((e) => e.tags))].sort(), [all]);
  const favCount = useMemo(() => all.filter((e) => e.favorite).length, [all]);
  const prepared = useMemo(() => new Map(all.map((e) => { const f = fieldsOf(e); return [e.key, { f, t: f.map((x) => norm(x.text)) }]; })), [all]);
  const costs = useMemo(() => new Map(all.map((e) => [e.key, costOf(e)])), [all]);
  const query = useMemo(() => parseQuery(dq), [dq]);
  const searching = !isEmpty(query);

  const shown = useMemo(() => {
    const out: { e: LibraryEntry; score: number; hit?: Field }[] = [];
    for (const e of all) {
      if (coll !== null && e.collection !== coll) continue;
      if (user && e.userId !== user) continue;
      if (tag && !e.tags.includes(tag)) continue;
      if (fav && !e.favorite) continue;
      let score = 0, hit: Field | undefined;
      if (searching) { const pr = prepared.get(e.key)!; const m = matchFields(query, pr.f, pr.t); if (!m) continue; score = m.score; hit = m.field; }
      out.push({ e, score, hit });
    }
    if (sort === 'name') out.sort((a, b) => a.e.name.localeCompare(b.e.name, undefined, { numeric: true }));
    else if (sort === 'user') out.sort((a, b) => a.e.userName.localeCompare(b.e.userName) || b.e.savedAt - a.e.savedAt);
    else if (sort === 'cost') out.sort((a, b) => { const x = costs.get(a.e.key), y = costs.get(b.e.key); return (x ? 0 : 1) - (y ? 0 : 1) || (x && y ? costTotal(y) - costTotal(x) : 0); });
    else if (searching) out.sort((a, b) => b.score - a.score);
    return out;
  }, [all, coll, user, tag, fav, sort, query, searching, prepared, costs]);

  const groups = useMemo(() => {
    if (coll !== null || sort !== 'recent' || searching) return [{ name: '', items: shown }];
    const named = [...new Set(shown.map((r) => r.e.collection).filter(Boolean))].sort((x, y) => x.localeCompare(y));
    if (!named.length) return [{ name: '', items: shown }];
    const out = named.map((name) => ({ name, items: shown.filter((r) => r.e.collection === name) }));
    const rest = shown.filter((r) => !r.e.collection);
    if (rest.length) out.push({ name: '', items: rest });
    return out;
  }, [shown, coll, sort, searching]);

  useEffect(() => { p.onOrder(groups.flatMap((g) => g.items.map((r) => r.e.key))); }, [groups]);

  const selected = all.filter((e) => p.multi.has(e.key));
  const allFav = selected.length > 0 && selected.every((e) => e.favorite);
  const bulk = async (op: 'move' | 'tag' | 'untag' | 'favorite' | 'unfavorite', value?: string) => {
    try {
      const r = await rpc('library.bulk', { keys: [...p.multi], op, value });
      p.onReload();
      toast(op === 'move' ? (value ? `Moved ${plural(r.changed, 'outfit')} to “${value}”` : `Took ${plural(r.changed, 'outfit')} out of collections`)
        : op === 'tag' ? `Tagged ${plural(r.changed, 'outfit')} #${value}` : op === 'favorite' ? `Added ${plural(r.changed, 'favorite')}` : `Updated ${plural(r.changed, 'outfit')}`);
    } catch { toast('Couldn’t update those outfits', { tone: 'warn' }); }
  };
  const toggleFav = async (e: LibraryEntry) => {
    try { await rpc('library.update', { key: e.key, patch: { favorite: !e.favorite } }); p.onReload(); } catch { toast('Couldn’t save that', { tone: 'warn' }); }
  };
  const exportKeys = async (keys?: string[]) => {
    try {
      download(`rofit-library-${keys ? `${keys.length}-outfits-` : ''}${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(await rpc('data.export', keys ? { keys } : {}), null, 2));
      toast(keys ? `Exported ${plural(keys.length, 'outfit')}` : 'Exported library');
    } catch { toast('Export failed', { tone: 'warn' }); }
  };
  const clearFilters = () => { setQ(''); setColl(null); setUser(0); setTag(''); setFav(false); };

  const importDialog = dialog === 'import' && (
    <ImportDialog initial={importText} onClose={() => { setDialog(null); setImportText(undefined); }}
      onDone={(r) => { setDialog(null); setImportText(undefined); p.onReload(); toast(importSummary(r)); }} />
  );

  if (p.entries && all.length === 0) {
    return (
      <div class="rf-explorer">
        <Empty icon="library" title="Your library is empty" body="Save an outfit from any profile and it lands here with its items, prices and body settings frozen as you saw them. It stays useful even if the original disappears.">
          <button class="rf-btn" onClick={() => setDialog('import')}><Ico n="upload" size={16} />Import a backup or link</button>
        </Empty>
        {importDialog}
      </div>
    );
  }

  const collLabel = coll === null ? 'All collections' : coll || 'Not in a collection';
  return (
    <section class="rf-explorer" aria-label="Library">
      <div class="rf-toolbar">
        <label class="rf-search">
          <Ico n="search" size={16} />
          <input ref={(el) => { p.searchRef.current = el; }} type="search" placeholder="Search names, items, tags, notes" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} aria-label="Search library" />
          {q ? <button class="rf-clear" aria-label="Clear search" onClick={() => setQ('')}><Ico n="close" size={14} /></button> : <kbd class="rf-kbd">/</kbd>}
        </label>
        <button class={'rf-btn' + (fav ? ' on' : '')} aria-pressed={fav} onClick={() => setFav(!fav)} disabled={!favCount && !fav} title={favCount ? 'Show favorites only' : 'Star an outfit to make it a favorite'}>
          <Ico n="star" size={16} /><span class="rf-hide-s">Favorites</span>{favCount > 0 && <em class="rf-count-badge">{favCount}</em>}
        </button>
        {(collections.length > 0) && (
          <Menu label="Filter by collection" class="rf-btn" align="left" items={[
            { label: 'All collections', checked: coll === null, onClick: () => setColl(null) },
            { label: 'Not in a collection', checked: coll === '', onClick: () => setColl('') },
            { sep: true },
            ...collections.map((c) => ({ label: c, checked: coll === c, onClick: () => setColl(c) })),
            { sep: true },
            { label: 'Manage collections…', icon: 'edit' as const, onClick: () => setDialog('collections') },
          ]}>
            <Ico n="layers" size={16} /><span class="rf-ell rf-maxw">{collLabel}</span><Ico n="down" size={14} />
          </Menu>
        )}
        {users.length > 1 && (
          <Menu label="Filter by user" class="rf-btn" align="left" items={[{ label: 'Everyone', checked: !user, onClick: () => setUser(0) }, { sep: true }, ...users.map(([id, n]) => ({ label: n, checked: user === id, onClick: () => setUser(id) }))]}>
            <Ico n="user" size={16} /><span class="rf-ell rf-maxw">{user ? users.find(([i]) => i === user)?.[1] : 'Everyone'}</span><Ico n="down" size={14} />
          </Menu>
        )}
        <div class="rf-grow" />
        <Menu label="Sort library" class="rf-btn" align="right" items={[
          { label: 'Recently saved', hint: searching ? 'best match first' : '', checked: sort === 'recent', onClick: () => setSort('recent') },
          { label: 'Name', checked: sort === 'name', onClick: () => setSort('name') },
          { label: 'Owner', checked: sort === 'user', onClick: () => setSort('user') },
          { label: 'Most expensive', icon: 'coins', checked: sort === 'cost', onClick: () => setSort('cost') },
        ]}><Ico n="sort" size={16} /><span class="rf-hide-s">{{ recent: searching ? 'Best match' : 'Recent', name: 'Name', user: 'Owner', cost: 'Cost' }[sort]}</span></Menu>
        <Seg label="Size" value={p.settings.density} onChange={(v) => saveSettings({ density: v })} options={[{ v: 'compact', label: 'S', title: 'Compact' }, { v: 'comfortable', label: 'M', title: 'Comfortable' }, { v: 'large', label: 'L', title: 'Large' }]} />
        <Menu label="Library actions" items={[
          { label: 'Import backup, manifest or link…', icon: 'upload', onClick: () => setDialog('import') },
          { label: 'Export library (.json)', icon: 'download', onClick: () => exportKeys() },
          { sep: true },
          { label: 'Manage collections…', icon: 'edit', onClick: () => setDialog('collections'), disabled: !collections.length },
        ]} />
      </div>
      <div class="rf-subbar">
        <span class="rf-count"><b>{plural(shown.length, 'saved outfit')}</b>{shown.length !== all.length && <> of {all.length}</>}</span>
        {tags.slice(0, 14).map((t) => <button key={t} class={'rf-chip btn' + (tag === t ? ' accent' : '')} aria-pressed={tag === t} onClick={() => setTag(tag === t ? '' : t)}><Ico n="tag" size={11} />{t}</button>)}
        {(coll !== null || user || fav || tag) ? <button class="rf-linkbtn rf-small" onClick={clearFilters}>Clear filters</button> : null}
      </div>
      <div class="rf-scroll">
        {!p.entries ? <div class="rf-grid comfortable">{Array.from({ length: 8 }, (_, i) => <div class="rf-card sk" key={i}><div class="rf-thumb"><div class="rf-skel" /></div></div>)}</div>
          : shown.length === 0 ? <Empty icon="search" title="Nothing matches" body={fav ? 'None of your favorites match.' : 'Try a different word, or clear the filters.'}><button class="rf-btn" onClick={clearFilters}>Clear search and filters</button></Empty>
            : groups.map((g) => (
              <section class="rf-lgroup" key={g.name}>
                {groups.length > 1 && <h3>{g.name || 'Not in a collection'}<span>{g.items.length}</span></h3>}
                <LibGrid rows={g.items} p={p} costs={costs} onFav={toggleFav} />
              </section>
            ))}
      </div>
      {p.multi.size > 0 && (
        <div class="rf-tray" role="region" aria-label="Selection">
          <b>{p.multi.size} selected</b>
          <div class="rf-grow" />
          {shown.length > p.multi.size && <button class="rf-btn" onClick={() => p.onSelect(shown.map((r) => r.e.key))} title={`Select all ${shown.length}`}><Ico n="selectAll" size={16} /><span class="rf-hide-s">All {shown.length}</span></button>}
          <button class="rf-btn primary" disabled={p.multi.size !== 2} onClick={p.onCompare}><Ico n="compare" size={16} /><span class="rf-hide-s">Compare</span></button>
          <button class="rf-btn" onClick={() => bulk(allFav ? 'unfavorite' : 'favorite')} title={allFav ? 'Remove from favorites' : 'Add to favorites'}><Ico n="star" size={16} /><span class="rf-hide-s">{allFav ? 'Unfavorite' : 'Favorite'}</span></button>
          <Menu label="More for the selection" items={[
            { label: 'Move to collection…', icon: 'move', onClick: () => setDialog('move') },
            { label: 'Add a tag…', icon: 'tag', onClick: () => setDialog('tag') },
            { label: 'Export selected (.json)', icon: 'download', onClick: () => exportKeys([...p.multi]) },
            { sep: true },
            { label: `Remove ${p.multi.size} from library…`, icon: 'trash', danger: true, onClick: () => setDialog('remove') },
          ]} />
          <button class="rf-btn" onClick={p.onClearMulti}>Clear</button>
        </div>
      )}
      {dialog === 'move' && <Prompt title={`Move ${plural(p.multi.size, 'outfit')}`} label="Collection" confirm="Move" allowEmpty suggestions={collections} hint="Leave it empty to take them out of their collection."
        onCancel={() => setDialog(null)} onConfirm={(v) => { setDialog(null); bulk('move', v); }} />}
      {dialog === 'tag' && <Prompt title={`Tag ${plural(p.multi.size, 'outfit')}`} label="Tag" confirm="Add tag" suggestions={tags}
        onCancel={() => setDialog(null)} onConfirm={(v) => { setDialog(null); bulk('tag', v.replace(/^#/, '')); }} />}
      {dialog === 'remove' && <Confirm title={`Remove ${plural(p.multi.size, 'outfit')}?`} danger confirm="Remove" body="They’re deleted from your library on this computer, with their notes and tags. Export them first if you might want them back."
        onCancel={() => setDialog(null)} onConfirm={() => { setDialog(null); p.onRemove([...p.multi]); }} />}
      {dialog === 'collections' && <CollectionsDialog entries={all} onClose={() => setDialog(null)} onChanged={(msg) => { p.onReload(); toast(msg); if (coll) setColl(null); }} />}
      {importDialog}
    </section>
  );
}

function LibGrid({ rows, p, costs, onFav }: { rows: { e: LibraryEntry; hit?: Field }[]; p: Props; costs: Map<string, OutfitCost | undefined>; onFav: (e: LibraryEntry) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFlip(ref, rows.map((r) => r.e.key).join(',') + p.settings.density, p.motion);
  const intro = useIntro('lib');
  return (
    <div ref={ref} class={`rf-grid grid ${p.settings.density}${rows.length > 150 ? ' big' : ''}${intro ? ' intro' : ''}`} role="list">
      {rows.map(({ e, hit }, i) => {
        const picked = p.multi.has(e.key);
        const chips = Object.values(e.assets).filter((a) => a.thumb).slice(0, 4);
        const more = e.details.assets.length - chips.length;
        const cost = p.settings.showPrices ? costs.get(e.key) : undefined;
        const fig = cost ? costFigure(cost) : null;
        const hitText = hit && hit.kind !== 'name' && hit.kind !== 'user' && hit.kind !== 'id' ? hit.label : null;
        return (
          <div role="listitem" data-k={e.key} data-oid={e.outfitId} style={{ '--i': Math.min(i, 24) } as any} class={'rf-cell' + (picked ? ' picked' : '') + (p.openKey === e.key ? ' active' : '')} key={e.key}>
            <button class="rf-card" title={e.name} aria-label={`${e.name} by ${e.userName}${e.favorite ? ', favorite' : ''}${e.source === 'share' ? ', from a share link' : ''}`}
              onClick={(ev) => { if (ev.shiftKey || ev.ctrlKey || ev.metaKey || p.multi.size) { p.onToggle(e.key); return; } const th = (ev.currentTarget as HTMLElement).querySelector('.rf-thumb'); p.onOpen(e, th?.getBoundingClientRect(), th?.querySelector('img')?.currentSrc); }}
              onKeyDown={(ev) => { if (ev.key === ' ') { ev.preventDefault(); p.onToggle(e.key); } }}>
              <Thumb id={e.outfitId} src={e.thumb} size="420x420" />
              <span class="rf-card-t">
                <span class="rf-card-name">{e.name}</span>
                <span class="rf-card-sub">
                  {hitText ? <><Ico n="search" size={11} /><span class="rf-ell">{hitText}</span></> : <span class="rf-ell">{e.userName}</span>}
                  {e.source === 'share' && <em class="rf-tag" title="Opened from a share link: a snapshot someone sent, not checked against Roblox until you open it">Shared</em>}
                  {e.note && <Ico n="note" size={12} class="rf-card-ic" label="Has a note" />}
                  {fig?.text && p.settings.density !== 'compact' && <Figure f={fig} class="rf-card-cost" />}
                </span>
                {p.settings.density !== 'compact' && <span class="rf-strip" aria-hidden="true">{chips.map((a) => <img key={a.id} src={a.thumb} alt="" loading="lazy" />)}{more > 0 && <em>+{more}</em>}</span>}
              </span>
            </button>
            <button class="rf-pick" role="checkbox" aria-checked={picked} aria-label={`Select ${e.name}`} tabIndex={-1} onClick={() => p.onToggle(e.key)}>{picked && <Ico n="check" size={14} />}</button>
            <button class={'rf-fav' + (e.favorite ? ' on' : '')} aria-pressed={!!e.favorite} aria-label={e.favorite ? `Remove ${e.name} from favorites` : `Add ${e.name} to favorites`} title={e.favorite ? 'Favorite' : 'Add to favorites'} onClick={() => onFav(e)}>
              <Ico n="star" size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function importSummary(r: ImportReport): string {
  const n = r.add + (r.replace ? r.existing : 0);
  if (!n && !r.assets && !r.snapshots) return 'Nothing new to import';
  return `Imported ${plural(n, 'outfit')}${!r.replace && r.existing ? ` · ${r.existing} already here` : ''}${r.invalid ? ` · ${r.invalid} skipped` : ''}`;
}

const KIND: Record<ImportReport['kind'], string> = { backup: 'RoFit backup', manifest: 'Outfit manifest', share: 'Share link', unknown: 'Not recognised' };

/** Import with a dry run first: shows what the file or link contains and what would change before anything is written. */
export function ImportDialog({ initial, onClose, onDone }: { initial?: string; onClose: () => void; onDone: (r: ImportReport) => void }) {
  const [text, setText] = useState(initial ?? '');
  const [file, setFile] = useState('');
  const [report, setReport] = useState<ImportReport | null>(null);
  const [replace, setReplace] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const check = async (t: string) => {
    if (!t.trim()) return;
    setBusy(true); setErr(''); setReport(null);
    try { setReport(await rpc('data.import', { data: t, dryRun: true })); } catch (e: any) { setErr(e?.message || 'Couldn’t read that.'); } finally { setBusy(false); }
  };
  useEffect(() => { if (initial) check(initial); }, []);
  const onFile = async (f: File) => {
    if (f.size > 64 * 1024 * 1024) { setErr('That file is too large to be a RoFit backup.'); return; }
    const t = await f.text();
    setText(t); setFile(`${f.name} · ${(f.size / 1024).toFixed(f.size > 10240 ? 0 : 1)} KB`); check(t);
  };
  const run = async () => {
    setBusy(true);
    try { onDone(await rpc('data.import', { data: text, replace })); } catch (e: any) { setErr(e?.message || 'Import failed.'); setBusy(false); }
  };
  const n = report ? report.add + (replace ? report.existing : 0) : 0;
  const canRun = !!report && (n > 0 || report.assets > 0 || report.snapshots > 0) && report.kind !== 'unknown';
  return (
    <Dialog title="Import into your library" onClose={onClose} class="wide" initialFocus="textarea"
      actions={<><button class="rf-btn" onClick={onClose}>Cancel</button><button class="rf-btn primary" disabled={!canRun || busy} onClick={run}>{busy && report ? <Spinner size={14} /> : <Ico n="upload" size={16} />}{report && n ? `Import ${plural(n, 'outfit')}` : 'Import'}</button></>}>
      {!file ? (
        <label class="rf-field"><span>Paste a share link or RoFit JSON</span>
          <textarea rows={4} value={text} placeholder="https://rofit.site/o/#1.…" spellcheck={false}
            onInput={(e) => { setText((e.target as HTMLTextAreaElement).value); setReport(null); setErr(''); }} />
        </label>
      ) : (
        <div class="rf-filepill"><Ico n="json" size={16} /><span class="rf-ell">{file}</span><button class="rf-linkbtn" onClick={() => { setFile(''); setText(''); setReport(null); }}>Change</button></div>
      )}
      <div class="rf-row-acts">
        {!file && <button class="rf-btn sm" disabled={!text.trim() || busy} onClick={() => check(text)}>{busy && !report ? <Spinner size={14} /> : <Ico n="search" size={14} />}Check</button>}
        <button class="rf-btn sm" onClick={() => fileRef.current?.click()}><Ico n="upload" size={14} />Choose a file…</button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) onFile(f); (e.target as HTMLInputElement).value = ''; }} />
      </div>
      {err && <p class="rf-hintline warn" role="alert"><Ico n="warn" size={14} />{err}</p>}
      {report && (
        <div class="rf-report" role="status">
          <div class="rf-report-h"><b>{KIND[report.kind]}</b>{report.kind !== 'unknown' && <span class="rf-muted"> · {plural(report.found, 'outfit')} found</span>}</div>
          {report.kind !== 'unknown' && (
            <ul>
              <li><Ico n="plus" size={14} />{plural(report.add, 'new outfit')}</li>
              {report.existing > 0 && <li><Ico n="saved" size={14} />{report.existing} already in your library{replace ? ' — will be replaced, keeping your notes and tags' : ' — will be left as they are'}</li>}
              {report.invalid > 0 && <li class="warn"><Ico n="warn" size={14} />{plural(report.invalid, 'outfit')} failed checks and will be skipped</li>}
              {(report.assets > 0 || report.snapshots > 0) && <li><Ico n="history" size={14} />{plural(report.assets, 'item record')}, {plural(report.snapshots, 'history snapshot')}</li>}
            </ul>
          )}
          {report.problems.length > 0 && <details class="rf-details" open={report.kind === 'unknown'}><summary>{plural(report.problems.length, 'problem')}</summary>{report.problems.map((x, i) => <div class="rf-small" key={i}>{x}</div>)}</details>}
          {report.kind === 'share' && report.add + report.existing > 0 && <p class="rf-muted rf-small">A share link is a snapshot someone else made. It’s saved as “Shared” with no prices, and RoFit checks Roblox for the live outfit when you open it.</p>}
          {report.existing > 0 && <label class="rf-frow"><span>Replace the {report.existing} already here<small>Their notes, tags and collections are kept</small></span><Toggle label="Replace existing outfits" on={replace} onChange={setReplace} /></label>}
        </div>
      )}
    </Dialog>
  );
}

function CollectionsDialog({ entries, onClose, onChanged }: { entries: LibraryEntry[]; onClose: () => void; onChanged: (msg: string) => void }) {
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of entries) if (e.collection) m.set(e.collection, (m.get(e.collection) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [entries]);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const toast = useToast();
  const op = async (req: { op: 'rename' | 'delete'; name: string; to?: string; removeEntries?: boolean }, msg: (n: number) => string) => {
    try { const r = await rpc('library.collection', req); onChanged(msg(r.changed)); } catch { toast('Couldn’t change that collection', { tone: 'warn' }); }
  };
  return (
    <>
      <Dialog title="Collections" onClose={onClose} class="wide">
        {counts.length === 0 ? <p class="rf-muted">No collections yet. Put outfits in one from the inspector, or select several and choose Move.</p> : (
          <div class="rf-colls">
            {counts.map(([name, n]) => (
              <div class="rf-coll" key={name}>
                <Ico n="layers" size={16} /><b class="rf-ell">{name}</b><span class="rf-muted rf-small">{plural(n, 'outfit')}</span>
                <span class="rf-grow" />
                <button class="rf-btn sm" onClick={() => setRenaming(name)}><Ico n="edit" size={14} />Rename</button>
                <button class="rf-btn sm danger" onClick={() => setDeleting(name)}><Ico n="trash" size={14} />Delete</button>
              </div>
            ))}
          </div>
        )}
      </Dialog>
      {renaming !== null && <Prompt title={`Rename “${renaming}”`} label="New name" initial={renaming} confirm="Rename" suggestions={counts.map(([c]) => c).filter((c) => c !== renaming)}
        hint="Renaming to an existing collection merges the two." onCancel={() => setRenaming(null)}
        onConfirm={(to) => { const from = renaming; setRenaming(null); if (to !== from) op({ op: 'rename', name: from, to }, (n) => `Renamed “${from}” to “${to}” (${plural(n, 'outfit')})`); }} />}
      {deleting !== null && (
        <Dialog title={`Delete “${deleting}”?`} onClose={() => setDeleting(null)} initialFocus=".rf-btn.primary"
          actions={<>
            <button class="rf-btn" onClick={() => setDeleting(null)}>Cancel</button>
            <button class="rf-btn danger" onClick={() => { const d = deleting; setDeleting(null); op({ op: 'delete', name: d, removeEntries: true }, (n) => `Deleted “${d}” and ${plural(n, 'outfit')}`); }}>Delete outfits too</button>
            <button class="rf-btn primary" onClick={() => { const d = deleting; setDeleting(null); op({ op: 'delete', name: d }, (n) => `Deleted “${d}”. ${plural(n, 'outfit')} kept`); }}>Keep outfits</button>
          </>}>
          <p class="rf-muted">{plural(counts.find(([c]) => c === deleting)?.[1] ?? 0, 'outfit')} {(counts.find(([c]) => c === deleting)?.[1] ?? 0) === 1 ? 'is' : 'are'} in it. Keep them in your library without a collection, or delete them as well.</p>
        </Dialog>
      )}
    </>
  );
}

export { dateStr };
