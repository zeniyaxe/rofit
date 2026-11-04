import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { LibraryEntry, OutfitRec, UserRec } from '../shared/types.ts';
import { rank } from '../shared/search.ts';
import { rpc } from '../shared/rpc.ts';
import { Ico, type IconName } from './icons.tsx';
import { Dialog, Spinner, Thumb, afterFrame, useReturnFocus } from './primitives.tsx';
import { profileOutfits, timeAgo } from './format.ts';

export interface Command { id: string; label: string; icon: IconName; hint?: string; keywords?: string; run: () => void }

interface Row { key: string; section: string; icon?: IconName; thumb?: { id: number; src?: string }; label: string; sub?: string; hint?: string; run: () => void | Promise<void> }

const LOOKS_LIKE_USER = /^(?:https?:\/\/(?:www\.)?roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/\d+.*|@?[A-Za-z0-9_]{3,20}|\d{1,19})$/i;

/** Ctrl/Cmd+K: one place to jump to an outfit, a saved look, a profile, or an action. */
export function Palette(p: {
  onClose: () => void;
  outfits: OutfitRec[];
  userName?: string;
  entries: LibraryEntry[];
  commands: Command[];
  onOpenOutfit: (o: OutfitRec) => void;
  onOpenEntry: (e: LibraryEntry) => void;
  onGoUser: (u: { id: number; name: string }) => void;
}) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const [closing, setClosing] = useState(false);
  const [recent, setRecent] = useState<UserRec[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  useReturnFocus(layer);
  useEffect(() => { rpc('users.recent', { limit: 8 }).then(setRecent, () => {}); return afterFrame(() => input.current?.focus({ preventScroll: true })); }, []);

  const close = () => { setClosing(true); setTimeout(p.onClose, 120); };
  const go = (fn: () => void) => () => { close(); fn(); };

  const rows = useMemo<Row[]>(() => {
    const t = q.trim();
    const out: Row[] = [];
    if (t) {
      for (const { item: o } of rank(p.outfits, t, (o) => [{ text: o.name }, { text: '', id: o.id }]).slice(0, 6)) {
        out.push({ key: 'o' + o.id, section: p.userName ? `${p.userName}’s outfits` : 'Outfits', thumb: { id: o.id }, label: o.name || 'Untitled', sub: o.isEditable ? undefined : 'Roblox preset', run: go(() => p.onOpenOutfit(o)) });
      }
      for (const { item: e } of rank(p.entries, t, (e) => [{ text: e.name, weight: 1.2 }, { text: e.userName }, { text: e.collection, weight: 0.8 }, ...e.tags.map((x) => ({ text: x })), { text: '', id: e.outfitId }]).slice(0, 5)) {
        out.push({ key: 'l' + e.key, section: 'Library', thumb: { id: e.outfitId, src: e.thumb }, label: e.name, sub: [e.userName, e.collection].filter(Boolean).join(' · '), run: go(() => p.onOpenEntry(e)) });
      }
    }
    const users = t ? rank(recent, t, (u) => [{ text: u.name, weight: 1.2 }, { text: u.displayName }, { text: '', id: u.id }]).slice(0, 5).map((x) => x.item) : recent.slice(0, 4);
    for (const u of users) {
      out.push({ key: 'u' + u.id, section: 'Profiles', icon: 'user', label: u.displayName && u.displayName !== u.name ? `${u.displayName} (@${u.name})` : u.name, sub: `${profileOutfits(u)} · viewed ${timeAgo(u.lastSeen)}`, run: go(() => p.onGoUser({ id: u.id, name: u.name })) });
    }
    if (t && LOOKS_LIKE_USER.test(t)) {
      out.push({ key: 'find', section: 'Profiles', icon: 'search', label: `Find “${t.length > 40 ? t.slice(0, 40) + '…' : t}” on Roblox`, sub: 'Username, user ID or profile link', run: async () => {
        setBusy(true); setNote('');
        try {
          const u = await rpc('users.lookup', { query: t });
          if (!u) { setNote(`Roblox has no user “${t}”.`); return; }
          close(); p.onGoUser({ id: u.id, name: u.name });
        } catch (e: any) { setNote(e?.message || 'Couldn’t reach Roblox.'); } finally { setBusy(false); }
      } });
    }
    for (const { item: c } of rank(p.commands, t, (c) => [{ text: c.label, weight: 1.2 }, { text: c.keywords ?? '', weight: 0.7 }]).slice(0, t ? 6 : 12)) {
      out.push({ key: 'c' + c.id, section: 'Actions', icon: c.icon, label: c.label, hint: c.hint, run: go(c.run) });
    }
    return out;
  }, [q, recent, p.outfits, p.entries, p.commands]);

  useEffect(() => { setActive(0); setNote(''); }, [q]);
  useEffect(() => { listRef.current?.querySelector('[aria-selected=true]')?.scrollIntoView({ block: 'nearest' }); }, [active]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(rows.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Home' && e.ctrlKey) { e.preventDefault(); setActive(0); }
    else if (e.key === 'Enter') { e.preventDefault(); if (!busy) rows[active]?.run(); }
    else if (e.key === 'Tab') e.preventDefault();
    else if (e.key === '?' && !q) {
      // The footer promises "? all shortcuts"; an empty search has nothing to lose by honouring it.
      const keys = p.commands.find((c) => c.id === 'keys');
      if (keys) { e.preventDefault(); go(keys.run)(); }
    }
  };

  let last = '';
  return (
    <div class="rf-scrim top" data-state={closing ? 'closed' : 'open'} onClick={close}>
      <div ref={layer} class="rf-palette" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <label class="rf-pal-in">
          <Ico n="search" size={18} />
          <input ref={input} value={q} placeholder="Jump to an outfit, a profile or an action…" role="combobox" aria-expanded="true" aria-controls="rf-pal-list" aria-autocomplete="list"
            aria-activedescendant={rows[active] ? `rf-pal-${active}` : undefined} onInput={(e) => setQ((e.target as HTMLInputElement).value)} onKeyDown={onKey} spellcheck={false} autocomplete="off" />
          {busy ? <Spinner size={16} /> : <kbd class="rf-kbd">Esc</kbd>}
        </label>
        {note && <p class="rf-pal-note" role="alert"><Ico n="info" size={14} />{note}</p>}
        <div class="rf-pal-list" id="rf-pal-list" role="listbox" aria-label="Results" ref={listRef}>
          {rows.length === 0 && <p class="rf-pal-empty">Nothing matches “{q}”.</p>}
          {rows.map((r, i) => {
            const head = r.section !== last ? (last = r.section) : null;
            return (
              <div key={r.key}>
                {head && <div class="rf-pal-sec" role="presentation">{head}</div>}
                <div id={`rf-pal-${i}`} role="option" aria-selected={i === active} class={'rf-pal-row' + (i === active ? ' on' : '')} onMouseMove={() => i !== active && setActive(i)} onClick={() => !busy && r.run()}>
                  <span class="rf-pal-ic">{r.thumb ? <Thumb id={r.thumb.id} src={r.thumb.src} /> : <Ico n={r.icon ?? 'arrow'} size={16} />}</span>
                  <span class="rf-pal-t"><b>{r.label}</b>{r.sub && <small>{r.sub}</small>}</span>
                  {r.hint && <kbd class="rf-kbd">{r.hint}</kbd>}
                  {i === active && <Ico n="enter" size={14} class="rf-pal-enter" />}
                </div>
              </div>
            );
          })}
        </div>
        <div class="rf-pal-foot"><span><kbd class="rf-kbd">↑</kbd><kbd class="rf-kbd">↓</kbd> move</span><span><kbd class="rf-kbd">Enter</kbd> open</span><span><kbd class="rf-kbd">?</kbd> all shortcuts</span></div>
      </div>
    </div>
  );
}

export const MOD = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl';
export const SHORTCUTS: [string[], string][] = [
  [['/'], 'Search'],
  [[MOD, 'K'], 'Command palette: outfits, library, profiles, actions'],
  [['?'], 'Keyboard shortcuts'],
  [['Esc'], 'Clear search, close the panel on top, or close RoFit'],
  [['←', '→', '↑', '↓'], 'Move between outfits'],
  [['Enter'], 'Open the focused outfit'],
  [['Space'], 'Select the focused outfit'],
  [['Shift', 'Click'], 'Select several'],
  [['J'], 'Next outfit, while one is open'],
  [['K'], 'Previous outfit, while one is open'],
  [['S'], 'Save or unsave the open outfit'],
  [['C'], 'Compare the open outfit with another'],
];

export function ShortcutList() {
  return (
    <dl class="rf-keys">
      {SHORTCUTS.map(([keys, what]) => (
        <div class="rf-keyrow" key={what}><dt>{keys.map((k) => <kbd class="rf-kbd" key={k}>{k}</kbd>)}</dt><dd>{what}</dd></div>
      ))}
    </dl>
  );
}

export function ShortcutsDialog({ onClose }: { onClose: () => void }) {
  return <Dialog title="Keyboard shortcuts" onClose={onClose} class="wide"><ShortcutList /></Dialog>;
}
