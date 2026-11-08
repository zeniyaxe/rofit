import { useEffect, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { saveSettings, DEFAULTS, type Settings as S } from '../shared/settings.ts';
import { motionLevel } from '../shared/motion.ts';
import { rpc } from '../shared/rpc.ts';
import type { Capability } from '../shared/types.ts';
import { Ico, type IconName } from './icons.tsx';
import { Confirm, Seg, Toggle, useToast } from './primitives.tsx';
import { copy, download, plural, timeAgo } from './format.ts';
import { useAsync, useOsReducedMotion } from './data.ts';
import { ShortcutList } from './Palette.tsx';

interface Row { id: string; label: string; hint?: string | ((s: S, os: boolean) => string); keywords?: string; control: (s: S) => ComponentChildren }
interface Section { id: string; title: string; icon: IconName; lead?: string; keywords?: string; rows?: Row[]; panel?: () => ComponentChildren }

const set = (p: Partial<S>) => saveSettings(p);

const MOTION_HINT: Record<S['motion'], string> = {
  system: 'Follows your device: Full, or Calm when it asks for reduced motion.',
  full: 'Everything RoFit does: cards glide when you sort, the avatar flies into the inspector, springy toggles.',
  balanced: 'Shorter and gentler: things still slide into place, without the avatar flight, overshoot or staggered entrances.',
  calm: 'No movement across the screen. Changes fade in place, at the same pace, so you can still follow them.',
};

const SECTIONS: Section[] = [
  { id: 'appearance', title: 'Appearance', icon: 'palette', rows: [
    { id: 'theme', label: 'Theme', hint: 'Auto follows Roblox on roblox.com and your system elsewhere.', keywords: 'dark light oled color',
      control: (s) => <Seg label="Theme" value={s.appearance} onChange={(v) => set({ appearance: v })} options={[{ v: 'auto', label: 'Auto' }, { v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }, { v: 'oled', label: 'OLED' }]} /> },
    { id: 'density', label: 'Thumbnail size', keywords: 'density grid',
      control: (s) => <Seg label="Thumbnail size" value={s.density} onChange={(v) => set({ density: v })} options={[{ v: 'compact', label: 'Small' }, { v: 'comfortable', label: 'Medium' }, { v: 'large', label: 'Large' }]} /> },
    { id: 'layout', label: 'Outfit layout', keywords: 'grid list',
      control: (s) => <Seg label="Outfit layout" value={s.layout} onChange={(v) => set({ layout: v })} options={[{ v: 'grid', icon: 'grid', label: 'Grid' }, { v: 'list', icon: 'list', label: 'List' }]} /> },
  ] },
  { id: 'motion', title: 'Motion', icon: 'gauge', keywords: 'animation reduced', panel: () => <MotionPanel /> },
  { id: 'explorer', title: 'Explorer', icon: 'outfit', rows: [
    { id: 'auto', label: 'Read outfits automatically', hint: 'When a profile opens, read every outfit right away so search, filters and cost sorting work without asking. Uses one request per outfit, paced for Roblox’s limits.', keywords: 'index scan automatic',
      control: (s) => <Toggle label="Read outfits automatically" on={s.autoIndex} onChange={(v) => set({ autoIndex: v })} /> },
    { id: 'iprices', label: 'Look up prices while reading', hint: 'Also fetch item prices in batches of 100, for price filters, cost sorting and costs on cards.', keywords: 'robux cost index',
      control: (s) => <Toggle label="Look up prices while reading" on={s.indexPrices} onChange={(v) => set({ indexPrices: v })} /> },
    { id: 'presets', label: 'Show Roblox presets', hint: 'Roblox lists its own non-editable outfits on profiles. They aren’t saved by the user, so they’re hidden by default.', keywords: 'preset robloxian default',
      control: (s) => <Toggle label="Show Roblox presets" on={s.showPresets} onChange={(v) => set({ showPresets: v })} /> },
    { id: 'prices', label: 'Show prices and cost to recreate', keywords: 'robux price cost',
      control: (s) => <Toggle label="Show prices" on={s.showPrices} onChange={(v) => set({ showPrices: v })} /> },
    { id: 'tech', label: 'Technical details', hint: 'IDs and hex values inline.', keywords: 'id hex developer',
      control: (s) => <Toggle label="Technical details" on={s.technical} onChange={(v) => set({ technical: v })} /> },
  ] },
  { id: 'profiles', title: 'Profiles', icon: 'user', rows: [
    { id: 'tab', label: 'Outfits entry on profiles', hint: 'A tab next to About and Creations, or a Saved Outfits row under Currently Wearing on profiles without tabs.', keywords: 'integration profile tab section',
      control: (s) => <Toggle label="Outfits entry on profiles" on={s.profileTab} onChange={(v) => set({ profileTab: v })} /> },
    { id: 'btn', label: 'Outfits button by the profile actions', hint: 'A hanger icon next to the ⋯ menu.', keywords: 'integration profile button',
      control: (s) => <Toggle label="Outfits button" on={s.profileButton} onChange={(v) => set({ profileButton: v })} /> },
  ] },
  { id: 'data', title: 'Library & data', icon: 'library', keywords: 'storage clear export backup import cache', rows: [
    { id: 'cache', label: 'Refresh after', hint: 'How long a loaded outfit list or outfit stays fresh before RoFit asks Roblox again. Manual refresh always works.', keywords: 'cache ttl minutes',
      control: (s) => <Seg label="Refresh after" value={String(s.cacheMinutes)} onChange={(v) => set({ cacheMinutes: Number(v) })} options={[{ v: '2', label: '2 min' }, { v: '10', label: '10 min' }, { v: '60', label: '1 hr' }]} /> },
    { id: 'history', label: 'Keep outfit history', hint: 'Snapshots what an outfit contained each time you open it and it has changed.', keywords: 'snapshot changes',
      control: (s) => <Toggle label="Keep history" on={s.keepHistory} onChange={(v) => set({ keepHistory: v })} /> },
    { id: 'hlimit', label: 'Snapshots per outfit', keywords: 'history limit',
      control: (s) => <Seg label="Snapshots per outfit" value={String(s.historyLimit)} onChange={(v) => set({ historyLimit: Number(v) })} options={[{ v: '5', label: '5' }, { v: '20', label: '20' }, { v: '50', label: '50' }]} /> },
  ], panel: () => <DataPanel /> },
  { id: 'privacy', title: 'Privacy', icon: 'shield', keywords: 'public private access share rofit.site permission',
    lead: 'Everything RoFit knows lives in this browser. It talks to Roblox with read-only requests, using your Roblox session the way the Roblox site does. No analytics, no accounts, nothing uploaded.',
    rows: [
      { id: 'access', label: 'Check whether outfits are public', keywords: 'visibility anonymous signed out',
        hint: 'Asks Roblox once more, without your session, whether a list is visible to people who aren’t signed in. That’s how RoFit tells “Public” from “Visible to you” and warns before you share something that isn’t public. Off: those outfits show “Visibility unknown” and sharing always asks first.',
        control: (s) => <Toggle label="Check whether outfits are public" on={s.checkAccess} onChange={(v) => set({ checkAccess: v })} /> },
    ], panel: () => <PrivacyNotes /> },
  { id: 'diagnostics', title: 'Diagnostics', icon: 'monitor', keywords: 'debug errors status endpoints', panel: () => <Diagnostics /> },
  { id: 'shortcuts', title: 'Shortcuts', icon: 'keyboard', keywords: 'keyboard keys palette', panel: () => <ShortcutList /> },
  { id: 'about', title: 'About', icon: 'info', keywords: 'version licence license credits', panel: () => <About /> },
];

const hintOf = (r: Row, s: S, os: boolean) => (typeof r.hint === 'function' ? r.hint(s, os) : r.hint ?? '');

export function SettingsPage({ settings }: { settings: S }) {
  const [q, setQ] = useState('');
  const os = useOsReducedMotion();
  const [current, setCurrent] = useState(location.hash.split('/')[1] || 'appearance');
  const n = q.trim().toLowerCase();
  const visible = SECTIONS.map((sec) => {
    if (!n) return { sec, rows: sec.rows ?? [], panel: true };
    const secHit = `${sec.title} ${sec.keywords ?? ''} ${sec.lead ?? ''}`.toLowerCase().includes(n);
    const rows = (sec.rows ?? []).filter((r) => secHit || `${r.label} ${hintOf(r, settings, os)} ${r.keywords ?? ''}`.toLowerCase().includes(n));
    return { sec, rows, panel: secHit };
  }).filter((x) => x.rows.length || (x.panel && x.sec.panel) || (x.panel && x.sec.lead));

  // Highlight the section in view.
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = [...(body.current?.querySelectorAll<HTMLElement>('section[data-sec]') ?? [])];
    const io = new IntersectionObserver((es) => {
      const top = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (top) setCurrent((top.target as HTMLElement).dataset.sec!);
    }, { rootMargin: '-20% 0px -70% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [n]);
  useEffect(() => { const id = location.hash.split('/')[1]; if (id) document.getElementById('set-' + id)?.scrollIntoView(); }, []);
  const go = (id: string) => { document.getElementById('set-' + id)?.scrollIntoView({ behavior: motionLevel(settings.motion, os) === 'calm' ? 'auto' : 'smooth', block: 'start' }); setCurrent(id); };

  return (
    <div class="rf-settings">
      <aside class="rf-setnav" aria-label="Settings sections">
        <h1>Settings</h1>
        <label class="rf-search">
          <Ico n="search" size={16} />
          <input type="search" placeholder="Search settings" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} aria-label="Search settings" />
        </label>
        <nav>
          {SECTIONS.map((s) => {
            const shown = visible.some((v) => v.sec.id === s.id);
            return <button key={s.id} class={current === s.id && shown ? 'on' : ''} aria-current={current === s.id && shown ? 'true' : undefined} disabled={!shown} onClick={() => go(s.id)}><Ico n={s.icon} size={16} />{s.title}</button>;
          })}
        </nav>
      </aside>
      <div class="rf-setbody" ref={body}>
        {visible.map(({ sec, rows, panel }) => (
          <section class="rf-setgroup" key={sec.id} id={'set-' + sec.id} data-sec={sec.id} aria-labelledby={'seth-' + sec.id}>
            <h2 id={'seth-' + sec.id}><Ico n={sec.icon} size={16} />{sec.title}</h2>
            {sec.lead && <p class="rf-setp">{sec.lead}</p>}
            {rows.map((r) => (
              <div class="rf-setrow" key={r.id}>
                <div class="rf-setl"><span>{r.label}</span>{hintOf(r, settings, os) && <small>{hintOf(r, settings, os)}</small>}</div>
                <div class="rf-setc">{r.control(settings)}</div>
              </div>
            ))}
            {panel && sec.panel?.()}
          </section>
        ))}
        {visible.length === 0 && <p class="rf-muted rf-setp">No settings match “{q}”.</p>}
        <div class="rf-setfoot">
          <button class="rf-linkbtn" onClick={() => set({ ...DEFAULTS, onboarded: true })}>Reset settings to defaults</button>
        </div>
      </div>
    </div>
  );
}

function MotionPanel() {
  const [s, setS] = useState<S | null>(null);
  useEffect(() => { import('../shared/settings.ts').then((m) => { m.loadSettings().then(setS); return m.onSettings(setS); }); }, []);
  const os = useOsReducedMotion();
  const [run, setRun] = useState(0);
  if (!s) return null;
  const level = motionLevel(s.motion, os);
  return (
    <div class="rf-motion">
      <div class="rf-setrow">
        <div class="rf-setl"><span>Motion</span><small>{MOTION_HINT[s.motion]}{s.motion === 'system' ? ` Right now: ${os ? 'Calm (your device asks for reduced motion)' : 'Full'}.` : os ? ' This overrides your device’s reduced-motion setting, because you picked it here.' : ''}</small></div>
        <div class="rf-setc"><Seg label="Motion" value={s.motion} onChange={(v) => { set({ motion: v }); setRun((x) => x + 1); }} options={[{ v: 'system', label: 'System' }, { v: 'full', label: 'Full' }, { v: 'balanced', label: 'Balanced' }, { v: 'calm', label: 'Calm' }]} /></div>
      </div>
      <div class="rf-mprev" aria-label={`Preview of ${level} motion`}>
        <div class={'rf-grid comfortable intro'} key={run} aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => <div class="rf-cell" style={{ '--i': i } as any} key={i}><div class="rf-card sk"><div class="rf-thumb"><div class="rf-mprev-fig" /></div><div class="rf-sk-l" /></div></div>)}
        </div>
        <div class="rf-mprev-foot"><span class="rf-muted rf-small">Playing: <b>{level[0].toUpperCase() + level.slice(1)}</b>. Spinners and progress bars always move, because they mean something is happening.</span>
          <button class="rf-btn sm" onClick={() => setRun((x) => x + 1)}><Ico n="refresh" size={14} />Replay</button></div>
      </div>
    </div>
  );
}

function PrivacyNotes() {
  return (
    <ul class="rf-plist">
      <li><Ico n="lock" size={16} /><div><b>Private stays private.</b> When Roblox won’t show someone’s outfits to you, RoFit says so and also hides anything it cached on earlier visits.</div></li>
      <li><Ico n="share" size={16} /><div><b>Share links carry a snapshot, not access.</b> The outfit travels inside the link’s <code>#fragment</code>, which browsers never send to a server. Links for outfits that aren’t public need your OK first.</div></li>
      <li><Ico n="globe" size={16} /><div><b>rofit.site can only suggest.</b> On rofit.site, RoFit listens for one thing: “import this share link”. It opens RoFit’s own import screen with a preview; nothing is saved until you press Import. The site never sees your library.</div></li>
      <li><Ico n="monitor" size={16} /><div><b>Diagnostics stay local.</b> “Copy diagnostics” never includes cookies, tokens or outfit contents.</div></li>
    </ul>
  );
}

const CAPS: Record<Capability, [string, string]> = {
  worn: ["Currently worn avatar", "Roblox avatar API"],
  list: ['Outfit lists', 'avatar.roblox.com v2 (v1 fallback)'],
  details: ['Outfit details', 'avatar.roblox.com v3 (v4 fallback)'],
  access: ['Public check', 'avatar.roblox.com v2, without your session'],
  thumbs: ['Thumbnails', 'thumbnails.roblox.com'],
  catalog: ['Item catalog data', 'catalog.roblox.com'],
  economy: ['Item sale data (fallback)', 'economy.roblox.com'],
  resale: ['Resale averages', 'economy.roblox.com'],
  ownership: ['Ownership check', 'inventory.roblox.com, needs Roblox sign-in'],
  myAvatar: ['Your current avatar', 'avatar.roblox.com v1, needs sign-in'],
  users: ['Profile search', 'users.roblox.com'],
};

function DataPanel() {
  const toast = useToast();
  const d = useAsync(() => rpc('diag.get', {}), []);
  const [confirm, setConfirm] = useState<null | 'cache' | 'history' | 'library' | 'all'>(null);
  const c = d.data;
  const size = c?.storageBytes != null ? `${(c.storageBytes / 1048576).toFixed(1)} MB` : '—';
  const labels = { cache: 'Clear cache', history: 'Clear history', library: 'Clear library', all: 'Erase everything' } as const;
  return (
    <>
      <div class="rf-setrow">
        <div class="rf-setl"><span>Stored on this computer</span><small>{c ? `${plural(c.counts.library, 'saved outfit')} · ${plural(c.counts.details, 'cached outfit')} · ${plural(c.counts.assets, 'item record')} · ${plural(c.counts.snapshots, 'snapshot')} · ${size}` : 'Loading…'}</small></div>
        <div class="rf-setc wrap">
          <button class="rf-btn" onClick={async () => { download(`rofit-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(await rpc('data.export', {}), null, 2)); toast('Exported backup'); }}><Ico n="download" size={16} />Export backup</button>
          <a class="rf-btn" href="#library/import"><Ico n="upload" size={16} />Import…</a>
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
      {confirm && (
        <Confirm title={`${labels[confirm]}?`} confirm={labels[confirm]} danger={confirm === 'library' || confirm === 'all'}
          body={confirm === 'library' || confirm === 'all' ? 'This permanently removes saved outfits from this browser. Export a backup first if you might want them.' : confirm === 'history' ? 'Removes recorded changes for every outfit.' : 'RoFit will re-fetch outfits and items from Roblox as you browse. “Last known” item data for things Roblox has since removed is lost.'}
          onCancel={() => setConfirm(null)}
          onConfirm={async () => { await rpc('data.clear', { what: confirm }); setConfirm(null); toast('Cleared'); d.reload(); }} />
      )}
    </>
  );
}

function Diagnostics() {
  const toast = useToast();
  const d = useAsync(() => rpc('diag.get', {}), []);
  const [ver] = useState(() => chrome.runtime.getManifest().version);
  const c = d.data;
  const copyDiag = async () => {
    const out = { rofit: ver, chrome: navigator.userAgent, ...c, note: 'No cookies, tokens or outfit contents included.' };
    toast((await copy(JSON.stringify(out, null, 2))) ? 'Copied diagnostics' : 'Couldn’t copy');
  };
  return (
    <>
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
      <div class="rf-setrow"><div class="rf-setl"><span>Copy diagnostics</span><small>Never includes cookies, tokens or outfit contents.</small></div>
        <div class="rf-setc"><button class="rf-btn" onClick={copyDiag} disabled={!c}><Ico n="copy" size={16} />Copy</button><button class="rf-btn" onClick={d.reload}><Ico n="refresh" size={16} />Recheck</button></div></div>
    </>
  );
}

function About() {
  const [ver] = useState(() => chrome.runtime.getManifest().version);
  return (
    <div class="rf-about">
      <a href={chrome.runtime.getURL("workspace.html#welcome")} target="_blank" rel="noopener noreferrer">Replay welcome</a>
      <div class="rf-about-h"><span class="rf-logo sm"><Ico n="outfit" size={18} /></span><div><b>RoFit {ver}</b><span class="rf-muted rf-small">Browse, inspect, compare and keep the outfits people save on Roblox.</span></div></div>
      <p class="rf-setp">Not affiliated with Roblox Corporation. RoFit reads the same public endpoints the Roblox website uses and shows only what Roblox returns to you.</p>
      <p class="rf-muted rf-small">Built with Preact (MIT) and Lucide icons (ISC); licence texts ship in the extension’s <code>licenses/</code> folder.</p>
    </div>
  );
}
