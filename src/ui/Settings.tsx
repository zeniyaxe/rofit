import { useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { saveSettings, DEFAULTS, type Settings as S } from '../shared/settings.ts';
import { rpc } from '../shared/rpc.ts';
import type { Capability } from '../shared/types.ts';
import { Ico } from './icons.tsx';
import { Confirm, Seg, Toggle, useToast } from './primitives.tsx';
import { copy, download, plural, timeAgo } from './format.ts';
import { useAsync } from './data.ts';

interface Row { id: string; group: string; label: string; hint?: string; keywords?: string; control: (s: S) => ComponentChildren }

const set = (p: Partial<S>) => saveSettings(p);

const ROWS: Row[] = [
  { id: 'appearance', group: 'Appearance', label: 'Theme', hint: 'Auto follows Roblox on roblox.com and your system elsewhere.', keywords: 'dark light oled',
    control: (s) => <Seg label="Theme" value={s.appearance} onChange={(v) => set({ appearance: v })} options={[{ v: 'auto', label: 'Auto' }, { v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }, { v: 'oled', label: 'OLED' }]} /> },
  { id: 'motion', group: 'Appearance', label: 'Motion', hint: 'Calm keeps content easing in and out but drops all travel, springs and the avatar fly-between. Your OS reduced-motion setting always applies.', keywords: 'animation reduced',
    control: (s) => <Seg label="Motion" value={s.motion} onChange={(v) => set({ motion: v })} options={[{ v: 'full', label: 'Full' }, { v: 'reduced', label: 'Calm' }]} /> },
  { id: 'density', group: 'Appearance', label: 'Thumbnail size', keywords: 'density grid',
    control: (s) => <Seg label="Thumbnail size" value={s.density} onChange={(v) => set({ density: v })} options={[{ v: 'compact', label: 'Small' }, { v: 'comfortable', label: 'Medium' }, { v: 'large', label: 'Large' }]} /> },
  { id: 'tab', group: 'Profiles', label: 'Outfits tab', hint: 'Adds Outfits next to About and Creations.', keywords: 'integration profile',
    control: (s) => <Toggle label="Outfits tab" on={s.profileTab} onChange={(v) => set({ profileTab: v })} /> },
  { id: 'btn', group: 'Profiles', label: 'Outfits button by the profile actions', hint: 'A hanger icon next to the ⋯ menu.', keywords: 'integration profile button',
    control: (s) => <Toggle label="Outfits button" on={s.profileButton} onChange={(v) => set({ profileButton: v })} /> },
  { id: 'presets', group: 'Browsing', label: 'Show Roblox presets', hint: 'Roblox lists its own non-editable outfits on profiles. They aren’t saved by the user, so they’re hidden by default.', keywords: 'preset robloxian default',
    control: (s) => <Toggle label="Show Roblox presets" on={s.showPresets} onChange={(v) => set({ showPresets: v })} /> },
  { id: 'prices', group: 'Browsing', label: 'Show prices and cost to recreate', keywords: 'robux price cost',
    control: (s) => <Toggle label="Show prices" on={s.showPrices} onChange={(v) => set({ showPrices: v })} /> },
  { id: 'tech', group: 'Browsing', label: 'Technical details', hint: 'IDs and hex values inline.', keywords: 'id hex developer',
    control: (s) => <Toggle label="Technical details" on={s.technical} onChange={(v) => set({ technical: v })} /> },
  { id: 'cache', group: 'Data', label: 'Refresh after', hint: 'How long a loaded outfit list or outfit stays fresh before RoFit asks Roblox again. Manual refresh always works.', keywords: 'cache ttl minutes',
    control: (s) => <Seg label="Refresh after" value={String(s.cacheMinutes)} onChange={(v) => set({ cacheMinutes: Number(v) })} options={[{ v: '2', label: '2 min' }, { v: '10', label: '10 min' }, { v: '60', label: '1 hr' }]} /> },
  { id: 'history', group: 'Data', label: 'Keep outfit history', hint: 'Snapshots what an outfit contained each time you open it and it has changed.', keywords: 'snapshot changes',
    control: (s) => <Toggle label="Keep history" on={s.keepHistory} onChange={(v) => set({ keepHistory: v })} /> },
  { id: 'hlimit', group: 'Data', label: 'Snapshots per outfit', keywords: 'history limit',
    control: (s) => <Seg label="Snapshots per outfit" value={String(s.historyLimit)} onChange={(v) => set({ historyLimit: Number(v) })} options={[{ v: '5', label: '5' }, { v: '20', label: '20' }, { v: '50', label: '50' }]} /> },
];

export function SettingsPage({ settings }: { settings: S }) {
  const [q, setQ] = useState('');
  const n = q.trim().toLowerCase();
  const rows = ROWS.filter((r) => !n || `${r.label} ${r.hint ?? ''} ${r.group} ${r.keywords ?? ''}`.toLowerCase().includes(n));
  const groups = [...new Set(rows.map((r) => r.group))];
  const showData = !n || 'privacy storage clear export diagnostics data'.includes(n) || 'data'.includes(n);

  return (
    <div class="rf-settings">
      <header class="rf-sethead">
        <h1>Settings</h1>
        <label class="rf-search">
          <Ico n="search" size={16} />
          <input type="search" placeholder="Search settings" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} aria-label="Search settings" />
        </label>
      </header>
      {groups.map((g) => (
        <section class="rf-setgroup" key={g}>
          <h2>{g}</h2>
          {rows.filter((r) => r.group === g).map((r) => (
            <div class="rf-setrow" key={r.id}>
              <div class="rf-setl"><span>{r.label}</span>{r.hint && <small>{r.hint}</small>}</div>
              <div class="rf-setc">{r.control(settings)}</div>
            </div>
          ))}
        </section>
      ))}
      {rows.length === 0 && !showData && <p class="rf-muted">No settings match “{q}”.</p>}
      {showData && <DataPanel />}
      <div class="rf-setfoot">
        <button class="rf-linkbtn" onClick={() => set({ ...DEFAULTS, onboarded: true })}>Reset settings to defaults</button>
      </div>
    </div>
  );
}

const CAPS: Record<Capability, [string, string]> = {
  list: ['Outfit lists', 'avatar.roblox.com v2 (v1 fallback)'],
  details: ['Outfit details', 'avatar.roblox.com v3'],
  thumbs: ['Thumbnails', 'thumbnails.roblox.com'],
  catalog: ['Item catalog data', 'catalog.roblox.com'],
  economy: ['Item sale data (fallback)', 'economy.roblox.com'],
  resale: ['Resale averages', 'economy.roblox.com'],
  ownership: ['Ownership check', 'inventory.roblox.com, needs Roblox sign-in'],
  myAvatar: ['Your current avatar', 'avatar.roblox.com v1, needs sign-in'],
};

function DataPanel() {
  const toast = useToast();
  const d = useAsync(() => rpc('diag.get', {}), []);
  const [confirm, setConfirm] = useState<null | 'cache' | 'history' | 'library' | 'all'>(null);
  const [ver] = useState(() => chrome.runtime.getManifest().version);
  const c = d.data;
  const size = c?.storageBytes != null ? `${(c.storageBytes / 1048576).toFixed(1)} MB` : '—';
  const labels = { cache: 'Clear cache', history: 'Clear history', library: 'Clear library', all: 'Erase everything' } as const;
  const copyDiag = async () => {
    const out = { rofit: ver, chrome: navigator.userAgent, ...c, note: 'No cookies, tokens or outfit contents included.' };
    toast((await copy(JSON.stringify(out, null, 2))) ? 'Copied diagnostics' : 'Couldn’t copy');
  };
  return (
    <>
      <section class="rf-setgroup">
        <h2>Privacy and storage</h2>
        <p class="rf-setp">Everything RoFit knows lives in this browser. It talks only to Roblox, using your existing Roblox session for read-only requests. No analytics, no accounts, nothing is uploaded.</p>
        <div class="rf-setrow">
          <div class="rf-setl"><span>Stored on this computer</span><small>{c ? `${plural(c.counts.library, 'saved outfit')} · ${plural(c.counts.details, 'cached outfit')} · ${plural(c.counts.assets, 'item record')} · ${plural(c.counts.snapshots, 'snapshot')} · ${size}` : 'Loading…'}</small></div>
          <div class="rf-setc wrap">
            <button class="rf-btn" onClick={async () => { download(`rofit-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(await rpc('data.export', {}), null, 2)); }}><Ico n="download" size={16} />Export backup</button>
          </div>
        </div>
        <div class="rf-setrow">
          <div class="rf-setl"><span>Clear</span><small>Cache holds outfit lists and item data, including the “last known” records of items Roblox no longer shows. Your library is self-contained, so clearing cache doesn’t touch it.</small></div>
          <div class="rf-setc wrap">
            <button class="rf-btn" onClick={() => setConfirm('cache')}>Cache</button>
            <button class="rf-btn" onClick={() => setConfirm('history')}>History</button>
            <button class="rf-btn danger" onClick={() => setConfirm('library')}>Library</button>
            <button class="rf-btn danger" onClick={() => setConfirm('all')}>Everything</button>
          </div>
        </div>
      </section>

      <section class="rf-setgroup">
        <h2>Diagnostics</h2>
        <p class="rf-setp">What RoFit could and couldn’t get from Roblox since the background worker last started. A feature that fails here degrades on its own; the rest keeps working.</p>
        <div class="rf-caps">
          {(Object.keys(CAPS) as Capability[]).map((k) => {
            const st = c?.capabilities[k];
            return (
              <div class="rf-cap" key={k}>
                <span class={'rf-led ' + (st ? (st.ok ? 'ok' : 'bad') : 'idle')} aria-hidden="true" />
                <span class="rf-cap-n">{CAPS[k][0]}<small>{CAPS[k][1]}</small></span>
                <span class="rf-cap-s">{st ? (st.ok ? `OK · ${timeAgo(st.at)}` : `Failing · ${st.error}`) : 'Not used yet'}</span>
              </div>
            );
          })}
        </div>
        {c && c.transport.at > 0 && <p class="rf-setp">Requests last ran {c.transport.via === 'tab' ? 'inside your Roblox tab, so Roblox sees your session (needed for friends-only content and ownership).' : 'in RoFit’s background worker, which Roblox sees as signed out. Keep a roblox.com tab open to use your session.'}</p>}
        {c && c.limiter.cooldownMs > 0 && <p class="rf-setp">Roblox asked RoFit to slow down. Pausing for {Math.ceil(c.limiter.cooldownMs / 1000)}s.</p>}
        {c && c.recentErrors.length > 0 && <details class="rf-details"><summary>{c.recentErrors.length} recent errors</summary>{c.recentErrors.map((e, i) => <div class="rf-mono rf-small" key={i}>{timeAgo(e.at)} · {e.where} · {e.message}</div>)}</details>}
        <div class="rf-setrow"><div class="rf-setl"><span>RoFit {ver}</span><small>Diagnostics never include cookies, tokens or outfit contents.</small></div>
          <div class="rf-setc"><button class="rf-btn" onClick={copyDiag} disabled={!c}><Ico n="copy" size={16} />Copy diagnostics</button><button class="rf-btn" onClick={d.reload}><Ico n="refresh" size={16} />Recheck</button></div></div>
      </section>

      {confirm && (
        <Confirm title={`${labels[confirm]}?`} confirm={labels[confirm]}
          body={confirm === 'library' || confirm === 'all' ? 'This permanently removes saved outfits from this browser. Export a backup first if you might want them.' : confirm === 'history' ? 'Removes recorded changes for every outfit.' : 'RoFit will re-fetch outfits and items from Roblox as you browse. “Last known” item data for things Roblox has since removed is lost.'}
          onCancel={() => setConfirm(null)}
          onConfirm={async () => { await rpc('data.clear', { what: confirm }); setConfirm(null); toast('Cleared'); d.reload(); }} />
      )}
    </>
  );
}
