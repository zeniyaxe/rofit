import { render } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import css from '../ui/styles.css';
import { rpc } from '../shared/rpc.ts';
import { rank, type Field } from '../shared/search.ts';
import type { LibraryEntry, RpcError, UserRec } from '../shared/types.ts';
import { Ico, type IconName } from '../ui/icons.tsx';
import { Spinner } from '../ui/primitives.tsx';
import { useAsync, useMotion, useSettings } from '../ui/data.ts';
import { resolveTheme, themeVars } from '../ui/theme.ts';
import { motionClass } from '../shared/motion.ts';
import { errorText, plural, profileOutfits, timeAgo } from '../ui/format.ts';

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

interface Here { tabId: number; userId: number; name: string }
interface Row { key: string; icon: IconName; title: string; sub: string; run: () => void }

const PROFILE = /^https:\/\/www\.roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i;
const profileUrl = (id: number, outfit?: number) => `https://www.roblox.com/users/${id}/profile#rofit${outfit ? '/' + outfit : ''}`;
/** Same rules as the worker's lookup (service.ts#lookupUser): an ID, a profile URL, or a valid Roblox username. */
const lookupable = (q: string) => PROFILE.test(q) || /^#?\d{1,19}$/.test(q) || /^@?[A-Za-z0-9_]{3,20}$/.test(q);

function Popup() {
  const s = useSettings();
  const motion = useMotion(s.motion);
  const [here, setHere] = useState<Here | null | undefined>(undefined);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [look, setLook] = useState<{ q: string; busy?: boolean; msg?: string } | null>(null);
  const [libWanted, setLibWanted] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const recent = useAsync(() => rpc('users.recent', { limit: 24 }), []);
  const count = useAsync(() => rpc('diag.get', {}).then((d) => d.counts.library), []);
  // The whole library is only fetched once the user starts typing.
  const lib = useAsync<LibraryEntry[] | null>(() => (libWanted ? rpc('library.list', {}) : Promise.resolve(null)), [libWanted]);
  const known = useAsync(async () => (here ? rpc('outfits.cached', { userId: here.userId }) : null), [here?.userId]);

  useEffect(() => {
    // Test builds can fake the active tab (#fake=<id>:<name>) because a popup opened as a page has no profile tab behind it.
    const fake = __ROFIT_TEST__ ? location.hash.match(/^#fake=(\d+):(.+)$/) : null;
    if (fake) { setHere({ tabId: -1, userId: Number(fake[1]), name: decodeURIComponent(fake[2]) }); return; }
    chrome.tabs.query({ active: true, currentWindow: true }).then(([t]) => {
      const m = t?.url?.match(PROFILE);
      setHere(t?.id && m ? { tabId: t.id, userId: Number(m[1]), name: (t.title ?? '').replace(/\s*[-–|]\s*Roblox.*$/i, '').trim() || 'this profile' } : null);
    }).catch(() => setHere(null));
  }, []);
  useEffect(() => { if (q.trim()) setLibWanted(true); setActive(0); setLook((l) => (l && l.q === q.trim() ? l : null)); }, [q]);

  const vars = themeVars(resolveTheme(s, false));
  const openHere = async () => {
    if (!here) return;
    try { await chrome.tabs.sendMessage(here.tabId, { __rofit: 'open' }); window.close(); }
    catch { await chrome.tabs.update(here.tabId, { url: profileUrl(here.userId) }); window.close(); }
  };
  const openTab = (url: string) => { chrome.tabs.create({ url }); window.close(); };
  const page = (route: string) => { rpc('page.open', { route }); window.close(); };
  const find = async (raw: string) => {
    const query = raw.trim();
    if (!lookupable(query)) { setLook({ q: query, msg: 'That isn’t a Roblox username or user ID. Usernames are 3–20 letters, numbers or underscores.' }); return; }
    setLook({ q: query, busy: true });
    try {
      const u = await rpc('users.lookup', { query });
      if (!u) setLook({ q: query, msg: `No Roblox account is called “${query.replace(/^@/, '')}”.` });
      else if (u.isBanned) setLook({ q: query, msg: `@${u.name} is banned, so Roblox shows no profile.` });
      else openTab(profileUrl(u.id));
    } catch (e) { setLook({ q: query, msg: errorText(e as RpcError).title + '. ' + errorText(e as RpcError).body }); }
  };

  const term = q.trim();
  const rows = useMemo<Row[]>(() => {
    if (!term) return [];
    const out: Row[] = [{ key: 'find', icon: 'search', title: `Find “${term.replace(/^@/, '')}” on Roblox`, sub: 'Open their profile with RoFit', run: () => find(term) }];
    const people = rank<UserRec>(recent.data ?? [], term, (u) => [{ text: u.name, weight: 1.2 }, { text: u.displayName }, { text: '', id: u.id }]).slice(0, 4);
    for (const { item: u } of people) out.push({ key: 'u' + u.id, icon: 'user', title: u.displayName && u.displayName !== u.name ? `${u.displayName} (@${u.name})` : u.name, sub: `${profileOutfits(u)} · seen ${timeAgo(u.lastSeen)}`, run: () => openTab(profileUrl(u.id)) });
    const saved = rank<LibraryEntry>(lib.data ?? [], term, (e): Field[] => [{ text: e.name, weight: 1.25 }, { text: e.userName }, { text: e.collection, weight: 0.8 }, ...e.tags.map((t) => ({ text: t })), { text: '', id: e.outfitId }]).slice(0, 5);
    for (const { item: e } of saved) out.push({ key: 'l' + e.key, icon: e.favorite ? 'star' : 'saved', title: e.name, sub: `Saved · by ${e.userName}${e.collection ? ' · ' + e.collection : ''}`, run: () => page('library/open/' + encodeURIComponent(e.key)) });
    return out;
  }, [term, recent.data, lib.data]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && rows.length) { e.preventDefault(); setActive((i) => (i + 1) % rows.length); }
    else if (e.key === 'ArrowUp' && rows.length) { e.preventDefault(); setActive((i) => (i - 1 + rows.length) % rows.length); }
    else if (e.key === 'Enter' && rows[active]) { e.preventDefault(); rows[active].run(); }
    else if (e.key === 'Escape' && q) { e.preventDefault(); setQ(''); }
  };

  const saved = known.data?.outfits.filter((o) => o.isEditable).length;
  const others = (recent.data ?? []).filter((u) => u.id !== here?.userId).slice(0, 4);
  const failed = recent.error && count.error;

  return (
    <div class={'rf rf-popup' + motionClass(motion)} style={vars as any}>
      <header class="rf-pop-h">
        <span class="rf-pop-logo"><Ico n="outfit" size={16} /></span>
        <b>RoFit</b>
        <span class="rf-grow" />
        <button class="rf-ib" aria-label="Open settings" title="Settings" onClick={() => page('settings')}><Ico n="settings" size={18} /></button>
      </header>

      <div class="rf-pop-search">
        <label class="rf-search">
          <Ico n="search" size={16} />
          <input ref={input} autoFocus value={q} spellcheck={false} autocomplete="off" aria-autocomplete="list" placeholder="Username, user ID or saved outfit" aria-label="Search Roblox users and your library"
            role="combobox" aria-expanded={rows.length > 0} aria-controls="rf-pop-results" aria-activedescendant={rows[active] ? 'rf-pr-' + active : undefined}
            onInput={(e) => setQ((e.target as HTMLInputElement).value)} onKeyDown={onKey} />
        </label>
      </div>

      {term ? (
        <div class="rf-pop-results" id="rf-pop-results" role="listbox" aria-label="Results">
          {rows.map((r, i) => (
            <div key={r.key} id={'rf-pr-' + i} role="option" aria-selected={i === active} class={'rf-pop-row' + (i === active ? ' on' : '')}
              onMouseMove={() => setActive(i)} onClick={r.run}>
              <span class="rf-pop-av ic"><Ico n={r.icon} size={16} /></span>
              <span class="rf-pop-name">{r.title}<small>{r.sub}</small></span>
              {i === 0 && look?.busy ? <Spinner size={14} /> : i === active ? <kbd class="rf-kbd">↵</kbd> : null}
            </div>
          ))}
          {look?.msg && <p class="rf-pop-msg" role="alert"><Ico n="warn" size={14} />{look.msg}</p>}
          {lib.loading && libWanted && <p class="rf-pop-msg muted"><Spinner size={12} />Searching your library…</p>}
          {!lib.loading && rows.length === 1 && !look && <p class="rf-pop-msg muted">Nothing saved or recently viewed matches. Press Enter to look the name up on Roblox.</p>}
        </div>
      ) : (
        <>
          {here === undefined ? <div class="rf-pop-now sk"><div class="rf-skel" /></div> : here ? (
            <button class="rf-pop-now live" onClick={openHere}>
              <span class="rf-pop-now-t">
                <small>This profile</small>
                <b>{here.name}</b>
                <span class="rf-muted">{saved ? `${plural(saved, 'saved outfit')} · seen ${timeAgo(known.data!.user?.lastSyncAt ?? Date.now())}` : 'Browse their saved outfits'}</span>
              </span>
              <span class="rf-pop-go"><Ico n="right" size={18} /></span>
            </button>
          ) : (
            <div class="rf-pop-now idle"><Ico n="outfit" size={20} /><span>Open any Roblox profile and look for <b>Outfits</b> (or <b>Saved Outfits</b>), or search for someone above.</span></div>
          )}

          {failed && <p class="rf-pop-msg" role="alert"><Ico n="warn" size={14} />RoFit’s background worker didn’t answer. Reload the extension from chrome://extensions if this keeps happening.</p>}

          {others.length > 0 && (
            <section class="rf-pop-sec" aria-label="Recently viewed">
              <h2>Recently viewed</h2>
              {others.map((u, i) => (
                <button class="rf-pop-row" key={u.id} style={{ '--i': i } as any} onClick={() => openTab(profileUrl(u.id))}>
                  <span class="rf-pop-av">{u.name.slice(0, 1).toUpperCase()}</span>
                  <span class="rf-pop-name">{u.name}<small>{profileOutfits(u)} · {timeAgo(u.lastSeen)}</small></span>
                  <Ico n="right" size={16} class="rf-pop-chev" />
                </button>
              ))}
            </section>
          )}
        </>
      )}

      <footer class="rf-pop-foot">
        <button class="rf-pop-lib" onClick={() => page('library')}>
          <Ico n="library" size={16} /><span>Library</span>
          <em>{count.data != null ? plural(count.data, 'saved outfit') : ''}</em>
          <Ico n="right" size={16} class="rf-pop-chev" />
        </button>
      </footer>
    </div>
  );
}
render(<Popup />, document.getElementById('root')!);
