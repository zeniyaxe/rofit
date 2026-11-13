import { ACCOUNT_URL, DONATE_URL, ISSUES_URL, SITE_URL } from '../shared/links.ts';
import { render } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import css from '../ui/styles.css';
import { rpc } from '../shared/rpc.ts';
import { rank, type Field } from '../shared/search.ts';
import type { LibraryEntry, RpcError, UserRec } from '../shared/types.ts';
import { Ico, type IconName } from '../ui/icons.tsx';
import { Spinner } from '../ui/primitives.tsx';
import { useAsync, useMotion, useSettings, useThumb } from '../ui/data.ts';
import { brandVars, resolveTheme, themeVars } from '../ui/theme.ts';
import { motionClass } from '../shared/motion.ts';
import { useFlip, useIndicator } from '../ui/motion.tsx';
import { copy, errorText, outfitUrl, plural, profileOutfits, timeAgo } from '../ui/format.ts';

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

interface Here { tabId: number; userId: number; name: string }
interface Row { key: string; icon: IconName; title: string; sub: string; run: () => void }
type Tab = 'recent' | 'favorites' | 'saved';

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'recent', label: 'Recent', icon: 'clock' },
  { id: 'favorites', label: 'Favorites', icon: 'star' },
  { id: 'saved', label: 'Saved', icon: 'saved' },
];
const TAB_KEY = 'rofit.popup.tab';
const readTab = (): Tab => { try { const t = localStorage.getItem(TAB_KEY); return t === 'favorites' || t === 'saved' ? t : 'recent'; } catch { return 'recent'; } };

const PROFILE = /^https:\/\/www\.roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i;
const profileUrl = (id: number, outfit?: number) => `https://www.roblox.com/users/${id}/profile#rofit${outfit ? '/' + outfit : ''}`;
/** Same rules as the worker's lookup (service.ts#lookupUser): an ID, a profile URL, or a valid Roblox username. */
const lookupable = (q: string) => PROFILE.test(q) || /^#?\d{1,19}$/.test(q) || /^@?[A-Za-z0-9_]{3,20}$/.test(q);

/** navigator.onLine, live. The popup can't fix a dead connection, but it can say so instead of spinning. */
function useOnline(): boolean {
  const [on, set] = useState(navigator.onLine);
  useEffect(() => {
    const up = () => set(true), down = () => set(false);
    addEventListener('online', up); addEventListener('offline', down);
    return () => { removeEventListener('online', up); removeEventListener('offline', down); };
  }, []);
  return on;
}

/** Roving arrow-key focus for a list of [data-row] buttons; Home/End jump. */
function rove(e: KeyboardEvent, input: HTMLInputElement | null) {
  const list = e.currentTarget as HTMLElement;
  const rows = [...list.querySelectorAll<HTMLElement>('[data-row]')];
  const i = rows.indexOf(document.activeElement as HTMLElement);
  let next = -1;
  if (e.key === 'ArrowDown') next = Math.min(rows.length - 1, i + 1);
  else if (e.key === 'ArrowUp') { if (i <= 0) { e.preventDefault(); input?.focus(); return; } next = i - 1; }
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = rows.length - 1;
  if (next >= 0 && rows[next]) { e.preventDefault(); rows[next].focus(); }
}

function Avatar({ name }: { name: string }) {
  // A stable hue per name so recent profiles are recognisable at a glance without fetching headshots.
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  return <span class="rf-pop-av" style={{ '--h': String(h) } as any}>{name.slice(0, 1).toUpperCase()}</span>;
}

function LibRow({ e, i, onOpen, onProfile }: { e: LibraryEntry; i: number; onOpen: () => void; onProfile: () => void }) {
  const t = useThumb(e.outfitId, '150x150', !e.thumb);
  const src = e.thumb ?? t?.url ?? null;
  return (
    <div class="rf-pop-item" data-k={'l' + e.key} style={{ '--i': String(i) } as any}>
      <button class="rf-pop-row" data-row onClick={onOpen} title={`Open “${e.name}” in your library`}>
        <span class={'rf-pop-th' + (src ? '' : ' none')}>{src ? <img src={src} alt="" loading="lazy" /> : <Ico n="outfit" size={16} />}</span>
        <span class="rf-pop-name">{e.name}<small>{e.favorite ? '★ ' : ''}by {e.userName}{e.collection ? ' · ' + e.collection : ''} · {timeAgo(e.savedAt)}</small></span>
      </button>
      {e.source !== 'import' && e.source !== 'share' && (
        <button class="rf-ib rf-pop-side" data-row title="Open on their Roblox profile" aria-label={`Open ${e.name} on ${e.userName}’s profile`} onClick={onProfile}><Ico n="external" size={15} /></button>
      )}
    </div>
  );
}

function Empty({ icon, title, body, action }: { icon: IconName; title: string; body: string; action?: { label: string; run: () => void } }) {
  return (
    <div class="rf-pop-empty">
      <span class="rf-pop-empty-ic"><Ico n={icon} size={20} /></span>
      <b>{title}</b>
      <p>{body}</p>
      {action && <button class="rf-btn" onClick={action.run}>{action.label}</button>}
    </div>
  );
}

function Popup() {
  const s = useSettings();
  const motion = useMotion(s.motion);
  const online = useOnline();
  const [here, setHere] = useState<Here | null | undefined>(undefined);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [look, setLook] = useState<{ q: string; busy?: boolean; msg?: string } | null>(null);
  const [tab, setTabState] = useState<Tab>(readTab);
  const [copied, setCopied] = useState(false);
  const [libWanted, setLibWanted] = useState(tab !== 'recent');
  const input = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const recent = useAsync(() => rpc('users.recent', { limit: 24 }), []);
  const count = useAsync(() => rpc('diag.get', {}).then((d) => d.counts.library), []);
  // The whole library is only fetched once something needs it (typing, or the Favorites/Saved tabs).
  const lib = useAsync<LibraryEntry[] | null>(() => (libWanted ? rpc('library.list', {}) : Promise.resolve(null)), [libWanted]);
  const known = useAsync(async () => (here ? rpc('outfits.cached', { userId: here.userId }) : null), [here?.userId]);

  const setTab = (t: Tab) => { setTabState(t); if (t !== 'recent') setLibWanted(true); try { localStorage.setItem(TAB_KEY, t); } catch { /* private mode */ } };
  useIndicator(tabsRef, tab, 3);

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
  // "/" focuses search from anywhere; 1-3 switch tabs when not typing.
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const typing = document.activeElement === input.current;
      if (e.key === '/' && !typing) { e.preventDefault(); input.current?.focus(); input.current?.select(); }
      else if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && /^[1-3]$/.test(e.key)) { e.preventDefault(); setTab(TABS[Number(e.key) - 1].id); }
    };
    addEventListener('keydown', on);
    return () => removeEventListener('keydown', on);
  }, []);

  const theme = resolveTheme(s, false);
  const vars = { ...themeVars(theme), ...brandVars(theme) };
  const openHere = async (outfit?: number) => {
    if (!here) return;
    try {
      if (outfit) throw 0; // deep links go through the URL so the content script opens the inspector directly
      await chrome.tabs.sendMessage(here.tabId, { __rofit: 'open' }); window.close();
    } catch { await chrome.tabs.update(here.tabId, { url: profileUrl(here.userId, outfit) }); window.close(); }
  };
  const openTab = (url: string) => { chrome.tabs.create({ url }); window.close(); };
  const page = (route: string) => { rpc('page.open', { route }); window.close(); };
  const copyHere = async () => {
    if (!here) return;
    if (await copy(`https://www.roblox.com/users/${here.userId}/profile`)) { setCopied(true); setTimeout(() => setCopied(false), 1400); }
  };
  const find = async (raw: string) => {
    const query = raw.trim();
    if (!lookupable(query)) { setLook({ q: query, msg: 'That isn’t a Roblox username or user ID. Usernames are 3–20 letters, numbers or underscores.' }); return; }
    if (!online) { setLook({ q: query, msg: 'You’re offline, so RoFit can’t ask Roblox who that is. Your saved outfits below still work.' }); return; }
    setLook({ q: query, busy: true });
    try {
      const u = await rpc('users.lookup', { query });
      if (!u) setLook({ q: query, msg: `No Roblox account is called “${query.replace(/^@/, '')}”.` });
      else if (u.isBanned) setLook({ q: query, msg: `@${u.name} is banned, so Roblox shows no profile.` });
      else openTab(profileUrl(u.id));
    } catch (e) { const t = errorText(e as RpcError); setLook({ q: query, msg: t.title + '. ' + t.body }); }
  };

  const term = q.trim();
  const rows = useMemo<Row[]>(() => {
    if (!term) return [];
    const out: Row[] = [{ key: 'find', icon: 'search', title: `Find “${term.replace(/^@/, '')}” on Roblox`, sub: 'Open their profile with RoFit', run: () => find(term) }];
    const people = rank<UserRec>(recent.data ?? [], term, (u) => [{ text: u.name, weight: 1.2 }, { text: u.displayName }, { text: '', id: u.id }]).slice(0, 4);
    for (const { item: u } of people) out.push({ key: 'u' + u.id, icon: 'user', title: u.displayName && u.displayName !== u.name ? `${u.displayName} (@${u.name})` : u.name, sub: `${profileOutfits(u)} · seen ${timeAgo(u.lastSeen)}`, run: () => openTab(profileUrl(u.id)) });
    const saved = rank<LibraryEntry>(lib.data ?? [], term, (e): Field[] => [{ text: e.name, weight: 1.25 }, { text: e.userName }, { text: e.collection, weight: 0.8 }, ...e.tags.map((t) => ({ text: t })), { text: e.note, weight: 0.5 }, { text: '', id: e.outfitId }]).slice(0, 5);
    for (const { item: e } of saved) out.push({ key: 'l' + e.key, icon: e.favorite ? 'star' : 'saved', title: e.name, sub: `Saved · by ${e.userName}${e.collection ? ' · ' + e.collection : ''}`, run: () => page('library/open/' + encodeURIComponent(e.key)) });
    return out;
  }, [term, recent.data, lib.data, online]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && rows.length) { e.preventDefault(); setActive((i) => (i + 1) % rows.length); }
    else if (e.key === 'ArrowUp' && rows.length) { e.preventDefault(); setActive((i) => (i - 1 + rows.length) % rows.length); }
    else if (e.key === 'ArrowDown' && !term) { e.preventDefault(); listRef.current?.querySelector<HTMLElement>('[data-row]')?.focus(); }
    else if (e.key === 'Enter' && rows[active]) { e.preventDefault(); rows[active].run(); }
    else if (e.key === 'Escape' && q) { e.preventDefault(); setQ(''); }
  };

  const hereOutfits = known.data?.outfits.filter((o) => o.isEditable) ?? [];
  const savedHere = (lib.data ?? []).filter((e) => here && e.userId === here.userId).length;
  const others = (recent.data ?? []).filter((u) => u.id !== here?.userId).slice(0, 6);
  const favs = useMemo(() => (lib.data ?? []).filter((e) => e.favorite).sort((a, b) => b.savedAt - a.savedAt).slice(0, 6), [lib.data]);
  const latest = useMemo(() => [...(lib.data ?? [])].sort((a, b) => b.savedAt - a.savedAt).slice(0, 6), [lib.data]);
  const workerDown = !!(recent.error && count.error);
  const status: { cls: string; label: string } = !online ? { cls: 'off', label: 'Offline' } : workerDown ? { cls: 'bad', label: 'Worker asleep' } : { cls: 'ok', label: 'Ready' };

  const listItems = tab === 'recent' ? others.map((u) => 'u' + u.id) : (tab === 'favorites' ? favs : latest).map((e) => 'l' + e.key);
  useFlip(listRef, tab + ':' + listItems.join(','), motion);

  const libLoading = lib.loading && libWanted;
  const panel = (() => {
    if (tab === 'recent') {
      if (recent.loading && !recent.data) return <div class="rf-pop-skels">{[0, 1, 2].map((i) => <div key={i} class="rf-skel" />)}</div>;
      if (!others.length) return <Empty icon="users" title="No profiles yet" body="Profiles you open with RoFit show up here, so you can jump back in one click." />;
      return others.map((u, i) => (
        <div class="rf-pop-item" key={u.id} data-k={'u' + u.id} style={{ '--i': String(i) } as any}>
          <button class="rf-pop-row" data-row onClick={() => openTab(profileUrl(u.id))}>
            <Avatar name={u.name} />
            <span class="rf-pop-name">{u.displayName && u.displayName !== u.name ? u.displayName : u.name}<small>@{u.name} · {profileOutfits(u)} · {timeAgo(u.lastSeen)}</small></span>
            <Ico n="right" size={16} class="rf-pop-chev" />
          </button>
        </div>
      ));
    }
    const list = tab === 'favorites' ? favs : latest;
    if (libLoading && !lib.data) return <div class="rf-pop-skels">{[0, 1, 2].map((i) => <div key={i} class="rf-skel" />)}</div>;
    if (lib.error) return <Empty icon="warn" title="Couldn’t read your library" body={errorText(lib.error).body} action={{ label: 'Try again', run: lib.reload }} />;
    if (!list.length) return tab === 'favorites'
      ? <Empty icon="star" title="No favorites yet" body="Star an outfit in your library and it lives here for quick access." action={latest.length ? { label: 'Open library', run: () => page('library') } : undefined} />
      : <Empty icon="saved" title="Nothing saved yet" body="Open any outfit on a profile and press Save. It stays in your library even if the owner deletes it." />;
    return list.map((e, i) => <LibRow key={e.key} e={e} i={i} onOpen={() => page('library/open/' + encodeURIComponent(e.key))} onProfile={() => openTab(outfitUrl(e.userId, e.outfitId))} />);
  })();

  return (
    <div class={'rf rf-popup rf-pop2 rf-own' + motionClass(motion)} style={vars as any}>
      <header class="rf-pop-h">
        <span class="rf-pop-logo"><Ico n="outfit" size={16} /></span>
        <b>RoFit</b>
        {/* Only worth a word when something is wrong; "Ready" would be noise. */}
        <span role="status" class="rf-pop-statuswrap">{status.cls !== 'ok' && <span class={'rf-pop-status ' + status.cls} title={workerDown ? 'RoFit’s background worker didn’t answer. Reload the extension from chrome://extensions if this keeps happening.' : status.label}><i />{status.label}</span>}</span>
        <span class="rf-grow" />
        <button class="rf-ib" aria-label="Open settings" title="Settings" onClick={() => page('settings')}><Ico n="settings" size={18} /></button>
        <a class="rf-ib" href={ACCOUNT_URL} target="_blank" rel="noopener noreferrer" title="RoFit settings on Roblox" aria-label="RoFit settings on Roblox"><Ico n="user" size={18} /></a>
      </header>

      <div class="rf-pop-search">
        <label class="rf-search">
          <Ico n="search" size={16} />
          <input ref={input} autoFocus value={q} spellcheck={false} autocomplete="off" aria-autocomplete="list" placeholder="Username, user ID or saved outfit" aria-label="Search Roblox users and your library"
            role="combobox" aria-expanded={rows.length > 0} aria-controls="rf-pop-results" aria-activedescendant={rows[active] ? 'rf-pr-' + active : undefined}
            onInput={(e) => setQ((e.target as HTMLInputElement).value)} onKeyDown={onKey} />
          {q ? <button class="rf-ib rf-pop-clear" aria-label="Clear search" onClick={() => { setQ(''); input.current?.focus(); }}><Ico n="close" size={14} /></button> : <kbd class="rf-kbd" aria-hidden="true">/</kbd>}
        </label>
      </div>

      {!online && <p class="rf-pop-msg rf-pop-banner" role="alert"><Ico n="offline" size={14} />You’re offline. Saved outfits still open; new profiles need a connection.</p>}

      {term ? (
        <div class="rf-pop-results" id="rf-pop-results" role="listbox" aria-label="Results" data-anim="enter">
          {rows.map((r, i) => (
            <div key={r.key} id={'rf-pr-' + i} role="option" aria-selected={i === active} class={'rf-pop-row' + (i === active ? ' on' : '')} style={{ '--i': String(i) } as any}
              onMouseMove={() => setActive(i)} onClick={r.run}>
              <span class="rf-pop-av ic"><Ico n={r.icon} size={16} /></span>
              <span class="rf-pop-name">{r.title}<small>{r.sub}</small></span>
              {i === 0 && look?.busy ? <Spinner size={14} /> : i === active ? <kbd class="rf-kbd">↵</kbd> : null}
            </div>
          ))}
          {look?.msg && <p class="rf-pop-msg" role="alert"><Ico n="warn" size={14} />{look.msg}</p>}
          {libLoading && <p class="rf-pop-msg muted"><Spinner size={12} />Searching your library…</p>}
          {!lib.loading && rows.length === 1 && !look && <p class="rf-pop-msg muted">Nothing saved or recently viewed matches. Press Enter to look the name up on Roblox.</p>}
        </div>
      ) : (
        <div class="rf-pop-home" data-anim="enter">
          {here === undefined ? <div class="rf-pop-now sk"><div class="rf-skel" /></div> : here ? (
            <div class="rf-pop-here">
              <button class="rf-pop-now live" onClick={() => openHere()}>
                <span class="rf-pop-now-t">
                  <small>On this profile</small>
                  <b>{here.name}</b>
                  <span class="rf-muted">{hereOutfits.length ? `${plural(hereOutfits.length, 'saved outfit')} · checked ${timeAgo(known.data?.user?.lastSyncAt ?? Date.now())}` : 'Browse their saved outfits'}</span>
                </span>
                <span class="rf-pop-go"><Ico n="right" size={18} /></span>
              </button>
              <div class="rf-pop-acts">
                <button class={'rf-chip' + (copied ? ' on' : '')} onClick={copyHere}><Ico n={copied ? 'check' : 'link'} size={14} />{copied ? 'Copied' : 'Copy link'}</button>
                {savedHere > 0 && <button class="rf-chip" onClick={() => page('library')}><Ico n="saved" size={14} />{plural(savedHere, 'in library', 'in library')}</button>}
                {hereOutfits[0] && <button class="rf-chip" onClick={() => openHere(hereOutfits[0].id)} title={`Open “${hereOutfits[0].name}”`}><Ico n="eye" size={14} />Newest outfit</button>}
              </div>
            </div>
          ) : (
            <div class="rf-pop-now idle"><Ico n="outfit" size={20} /><span>Open any Roblox profile and look for <b>Saved Outfits</b> (an <b>Outfits</b> tab on older layouts), or search for someone above.</span></div>
          )}

          {workerDown && <p class="rf-pop-msg" role="alert"><Ico n="warn" size={14} />RoFit’s background worker didn’t answer. Reload the extension from chrome://extensions if this keeps happening.</p>}

          <div class="rf-pop-tabs rf-seg" role="tablist" aria-label="Quick access" ref={tabsRef}>
            {TABS.map((t, i) => (
              <button key={t.id} role="tab" id={'rf-pt-' + t.id} aria-selected={tab === t.id} aria-controls="rf-pop-panel" tabIndex={tab === t.id ? 0 : -1} title={`${t.label} (${i + 1})`}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]; setTab(n.id); tabsRef.current?.querySelector<HTMLElement>('#rf-pt-' + n.id)?.focus(); } }}>
                <Ico n={t.icon} size={14} />{t.label}
                {t.id === 'favorites' && lib.data ? <em>{lib.data.filter((e) => e.favorite).length || ''}</em> : null}
              </button>
            ))}
          </div>

          <div class="rf-pop-panel" id="rf-pop-panel" role="tabpanel" aria-labelledby={'rf-pt-' + tab} key={tab} ref={listRef} onKeyDown={(e) => rove(e, input.current)}>
            {panel}
          </div>
        </div>
      )}

      <footer class="rf-pop-foot">
        <button class="rf-pop-lib" onClick={() => page('library')}>
          <Ico n="library" size={16} /><span>Library</span>
          <em>{count.data != null ? plural(count.data, 'saved outfit') : ''}</em>
          <Ico n="right" size={16} class="rf-pop-chev" />
        </button>
        <div class="rf-poplinks"><a href={SITE_URL} target="_blank" rel="noopener noreferrer">Official site</a> · <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer">Report a problem</a> · <a href={DONATE_URL} target="_blank" rel="noopener noreferrer">Donate</a></div>
      </footer>
    </div>
  );
}
render(<Popup />, document.getElementById('root')!);

void chrome.action.setBadgeText({ text: '' }).catch(() => {});
