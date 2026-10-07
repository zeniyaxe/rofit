import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import css from '../ui/styles.css';
import { rpc } from '../shared/rpc.ts';
import { Ico } from '../ui/icons.tsx';
import { useAsync, useReducedMotion, useSettings } from '../ui/data.ts';
import { resolveTheme, themeVars } from '../ui/theme.ts';
import { plural, timeAgo } from '../ui/format.ts';

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

interface Here { tabId: number; userId: number; name: string }

function Popup() {
  const s = useSettings();
  const rm = useReducedMotion(s.motion);
  const [here, setHere] = useState<Here | null | undefined>(undefined);
  const recent = useAsync(() => rpc('users.recent', {}), []);
  const lib = useAsync(() => rpc('diag.get', {}).then((d) => d.counts.library), []);
  const known = useAsync(async () => (here ? rpc('outfits.cached', { userId: here.userId }) : null), [here?.userId]);

  useEffect(() => {
    // Test builds can fake the active tab (#fake=<id>:<name>) because a popup opened as a page has no profile tab behind it.
    const fake = __ROFIT_TEST__ ? location.hash.match(/^#fake=(\d+):(.+)$/) : null;
    if (fake) { setHere({ tabId: -1, userId: Number(fake[1]), name: decodeURIComponent(fake[2]) }); return; }
    chrome.tabs.query({ active: true, currentWindow: true }).then(([t]) => {
      const m = t?.url?.match(/^https:\/\/www\.roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i);
      setHere(t?.id && m ? { tabId: t.id, userId: Number(m[1]), name: (t.title ?? '').replace(/\s*[-–|]\s*Roblox.*$/i, '').trim() || 'this profile' } : null);
    }).catch(() => setHere(null));
  }, []);

  const vars = themeVars(resolveTheme(s, false));
  const openHere = async () => {
    if (!here) return;
    try { await chrome.tabs.sendMessage(here.tabId, { __rofit: 'open' }); window.close(); }
    catch { await chrome.tabs.update(here.tabId, { url: `https://www.roblox.com/users/${here.userId}/profile#rofit` }); window.close(); }
  };
  const openUser = (id: number) => { chrome.tabs.create({ url: `https://www.roblox.com/users/${id}/profile#rofit` }); window.close(); };
  const page = (route: string) => { rpc('page.open', { route }); window.close(); };

  const saved = known.data?.outfits.filter((o) => o.isEditable).length;
  const others = (recent.data ?? []).filter((u) => u.id !== here?.userId).slice(0, 4);

  return (
    <div class={'rf rf-popup' + (rm ? ' rm' : '')} style={vars as any}>
      <header class="rf-pop-h">
        <span class="rf-pop-logo"><Ico n="outfit" size={16} /></span>
        <b>RoFit</b>
        <span class="rf-grow" />
        <button class="rf-ib" aria-label="Open settings" title="Settings" onClick={() => page('settings')}><Ico n="settings" size={18} /></button>
      </header>

      {here === undefined ? <div class="rf-pop-now sk"><div class="rf-skel" /></div> : here ? (
        <button class="rf-pop-now live" onClick={openHere}>
          <span class="rf-pop-now-t">
            <small>This profile</small>
            <b>{here.name}</b>
            <span class="rf-muted">{saved === undefined ? 'Browse their saved outfits' : saved ? `${plural(saved, 'saved outfit')} · seen ${timeAgo(known.data!.user?.lastSyncAt ?? Date.now())}` : 'Browse their saved outfits'}</span>
          </span>
          <span class="rf-pop-go"><Ico n="right" size={18} /></span>
        </button>
      ) : (
        <div class="rf-pop-now idle"><Ico n="outfit" size={20} /><span>Open a Roblox profile and RoFit adds <b>Outfits</b> next to About and Creations.</span></div>
      )}

      {others.length > 0 && (
        <section class="rf-pop-sec" aria-label="Recently viewed">
          <h2>Recently viewed</h2>
          {others.map((u, i) => (
            <button class="rf-pop-row" key={u.id} style={{ '--i': i } as any} onClick={() => openUser(u.id)}>
              <span class="rf-pop-av">{u.name.slice(0, 1).toUpperCase()}</span>
              <span class="rf-pop-name">{u.name}<small>{u.outfitCount != null ? plural(u.outfitCount, 'outfit') : 'profile'} · {timeAgo(u.lastSeen)}</small></span>
              <Ico n="right" size={16} class="rf-pop-chev" />
            </button>
          ))}
        </section>
      )}

      <button class="rf-pop-lib" onClick={() => page('library')}>
        <Ico n="library" size={16} /><span>Library</span>
        <em>{lib.data ? plural(lib.data, 'saved outfit') : ''}</em>
        <Ico n="right" size={16} class="rf-pop-chev" />
      </button>
    </div>
  );
}
render(<Popup />, document.getElementById('root')!);
