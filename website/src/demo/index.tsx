/**
 * The website's interactive demo: RoFit's real Preact UI (src/ui) and real service code (src/background/service.ts,
 * roblox.ts) running against the sample Roblox in sampleServer.ts. Only storage, settings, messaging and fetch are
 * swapped (see website/build.mjs). Mounted lazily when the demo section approaches the viewport.
 */
import { render } from 'preact';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import css from '../../../src/ui/styles.css';
import { Shell } from '../../../src/ui/Shell.tsx';
import { SettingsPage } from '../../../src/ui/Settings.tsx';
import { ToastHost } from '../../../src/ui/primitives.tsx';
import { useReducedMotion, useSettings, thumbStore } from '../../../src/ui/data.ts';
import { resolveTheme, themeVars } from '../../../src/ui/theme.ts';
import { HANGER } from '../../../src/shared/hanger.ts';
import * as roblox from '../../../src/background/roblox.ts';
// __demoReset is appended to roblox.ts by website/build.mjs (not present in the extension source).
const __demoReset = () => (roblox as unknown as { __demoReset: () => void }).__demoReset();
import { host } from './shim-rpc.ts';
import { resetSettings } from './shim-settings.ts';
import * as memdb from './memdb.ts';
import { clearLog, getLog, onLog, sim, type LogEntry, type Net } from './transport.ts';
import { EVENTS, findOutfit, outfitImage, outfitsOf, resetWorld, setSignedIn, isSignedIn, type EventKey } from './sampleServer.ts';
import { USERS, USER } from './fixtures.ts';

// RoFit's shell listens for keys on window because in the extension it is a modal sheet. On a website that would
// steal "/" and Esc from the whole page, so the build routes that listener here and only keys aimed at the demo pass.
const keyListeners = new Set<(e: KeyboardEvent) => void>();
(globalThis as any).__rofitKeys = keyListeners;
let sheetHost: HTMLElement | null = null;
window.addEventListener('keydown', (e) => {
  if (!sheetHost || !e.composedPath().includes(sheetHost)) return;
  keyListeners.forEach((f) => f(e));
}, true);

const Hanger = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    {HANGER.map(([, a], i) => <path key={i} d={a.d} />)}
  </svg>
);

const NETS: { v: Net; label: string; hint: string }[] = [
  { v: 'normal', label: 'Normal', hint: 'Answers in about a tenth of a second.' },
  { v: 'slow', label: 'Slow', hint: 'One to two seconds per request. Watch cached data show first.' },
  { v: 'ratelimit', label: 'Rate limited', hint: 'Two requests per five seconds, then HTTP 429. RoFit backs off and says so.' },
  { v: 'offline', label: 'Unreachable', hint: 'Every request fails. Saved and cached things still open.' },
];

function useLog() {
  const [, tick] = useState(0);
  useEffect(() => onLog(() => tick((n) => n + 1)), []);
  return getLog();
}

/** The RoFit sheet, mounted in its own shadow root like the extension does on roblox.com. */
function Sheet({ userId, userName, initialOutfit, onExit, closing }: { userId: number; userName: string; initialOutfit?: number; onExit: () => void; closing: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLElement | null>(null);
  const [route, setRoute] = useState<'outfits' | 'settings'>('outfits');

  useLayoutEffect(() => {
    const h = hostRef.current!;
    const shadow = h.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = css + DEMO_CSS;
    const m = document.createElement('div');
    m.className = 'rf-mount';
    shadow.append(style, m);
    mount.current = m;
    sheetHost = h;
    // Sample items aren't on Roblox: keep their links from sending visitors to unrelated real pages.
    shadow.addEventListener('click', (e) => {
      const a = (e.composedPath() as HTMLElement[]).find((n) => n instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;
      if (a && /^https:\/\/www\.roblox\.com\//.test(a.href)) { e.preventDefault(); notice('Sample items and profiles aren’t on Roblox, so RoFit’s links go nowhere here. In the extension they open the item or profile.'); }
    }, true);
    host.openPage = (r) => setRoute(r === 'settings' ? 'settings' : 'outfits');
    host.openUrls = () => notice('In the extension this opens the missing items on Roblox, at most ten tabs, only when you confirm. Sample items aren’t on Roblox.');
    return () => { render(null, m); sheetHost = null; };
  }, []);

  useLayoutEffect(() => {
    if (!mount.current) return;
    render(<SheetRoot userId={userId} userName={userName} initialOutfit={initialOutfit} onExit={onExit} closing={closing} route={route} setRoute={setRoute} />, mount.current);
  });

  useEffect(() => {
    requestAnimationFrame(() => (hostRef.current?.shadowRoot?.querySelector('.rf-shell') as HTMLElement | null)?.focus({ preventScroll: true }));
  }, []);

  return <div class="dm-sheet-host" ref={hostRef} />;
}

function SheetRoot({ userId, userName, initialOutfit, onExit, closing, route, setRoute }: { userId: number; userName: string; initialOutfit?: number; onExit: () => void; closing: boolean; route: string; setRoute: (r: 'outfits' | 'settings') => void }) {
  const settings = useSettings();
  const rm = useReducedMotion(settings.motion);
  const [, tick] = useState(0);
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const f = () => tick((n) => n + 1);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  const vars = themeVars(resolveTheme(settings, false));
  return (
    <div class={'rf rf-sheet' + (rm ? ' rm' : '')} style={vars as any} data-state={closing ? 'closed' : 'open'} role="region" aria-label={`${userName}’s outfits, RoFit demo`}>
      {route === 'settings' ? (
        <ToastHost>
          <div class="rf-demo-settings">
            <header class="rf-bar"><button class="rf-btn ghost" onClick={() => setRoute('outfits')}>← Back to outfits</button><div class="rf-who"><b>Settings</b><span>RoFit</span></div></header>
            <div class="rf-demo-settings-scroll"><SettingsPage settings={settings} /></div>
          </div>
        </ToastHost>
      ) : <Shell userId={userId} userName={userName} initialOutfit={initialOutfit} onExit={onExit} />}
    </div>
  );
}

// Inside the shadow root: the sheet fills the demo stage instead of the window, and fixed-position menus/toasts stay inside it.
const DEMO_CSS = `
:host { all: initial; position: absolute; inset: 0; display: block; font-family: var(--demo-font, system-ui, sans-serif); }
.rf-mount { position: absolute; inset: 0; }
.rf-sheet { position: absolute; inset: 0; top: 0; border-top: 0; contain: layout; }
.rf-demo-settings { display: flex; flex-direction: column; height: 100%; }
.rf-demo-settings-scroll { flex: 1; overflow: auto; }
`;

/** The UI keeps outfit thumbnails for the session; after a Roblox-side change the demo starts it fresh. */
const clearThumbs = () => (thumbStore as any).map?.clear?.();

let noticeFn: (t: string) => void = () => {};
const notice = (t: string) => noticeFn(t);

function LogList() {
  const log = useLog();
  const shown = log.slice(0, 14);
  return (
    <ol class="dm-log" aria-label="Requests RoFit made, newest first">
      {shown.length === 0 && <li class="dm-log-empty">Nothing yet. Open the Outfits tab and every request appears here.</li>}
      {shown.map((e: LogEntry) => (
        <li key={e.n} class={'dm-log-row s' + String(e.status ?? 'p').slice(0, 1)}>
          <span class="dm-log-m">{e.method}</span>
          <span class="dm-log-u"><b>{e.host.replace('.roblox.com', '')}</b>{e.path}</span>
          <span class="dm-log-s">{e.status === undefined ? '…' : e.status}{e.note ? <i> {e.note}</i> : null}</span>
        </li>
      ))}
    </ol>
  );
}

export function Demo({ initialOutfit }: { initialOutfit?: number }) {
  const initUser = initialOutfit ? USERS.find((u) => u.outfits.some((o) => o.id === initialOutfit))?.id : undefined;
  const [userId, setUserId] = useState(initUser ?? USERS[0].id);
  const [open, setOpen] = useState(!!initUser);
  const [closing, setClosing] = useState(false);
  const [net, setNet] = useState<Net>(sim.net);
  const [signed, setSigned] = useState(isSignedIn());
  const [msg, setMsg] = useState<{ t: string; n: number } | null>(null);
  const [epoch, setEpoch] = useState(0); // remounts the sheet on reset
  const [fired, setFired] = useState<Record<string, number>>({});
  const tabRef = useRef<HTMLButtonElement>(null);
  const user = USER.get(userId)!;
  noticeFn = (t) => setMsg({ t, n: Date.now() });
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(null), 6000); return () => clearTimeout(t); }, [msg]);

  const openSheet = () => { setClosing(false); setOpen(true); };
  const exit = () => {
    if (closing) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); tabRef.current?.focus(); }, reduced ? 120 : 210);
  };
  const pick = (id: number) => { if (id === userId) return; setOpen(false); setClosing(false); setUserId(id); };
  const fire = (k: EventKey) => {
    EVENTS[k].run();
    memdb.age(65 * 60_000); // "an hour later": cached copies are due for a re-check, as they would be in real life
    clearThumbs();
    if (open) { setOpen(false); setClosing(false); }
    setFired((f) => ({ ...f, [k]: (f[k] ?? 0) + 1 }));
    notice(`${EVENTS[k].label}. An hour passes. ${k === 'remove' || k === 'rename' ? 'Refresh the list (↻) to see RoFit notice.' : 'Open the outfit again to see what RoFit makes of it.'}`);
  };
  const reset = () => {
    resetWorld(); memdb.resetAll(); resetSettings(); clearLog(); __demoReset(); clearThumbs();
    sim.net = 'normal'; setNet('normal'); setSigned(false); setFired({}); setOpen(false); setClosing(false); setEpoch((e) => e + 1);
    notice('Demo reset. Nothing was stored anywhere, so there was nothing else to clear.');
  };

  const editable = outfitsOf(userId).filter((o) => o.editable);
  const face = findOutfit(editable[0]?.id ?? outfitsOf(userId)[0]?.id ?? 0);

  return (
    <div class="dm" data-open={open ? '' : undefined}>
      <div class="dm-stage">
        <div class="dm-chrome" aria-hidden="true"><span /><span /><span /><em>a stand-in for a Roblox profile page · sample data</em></div>
        <div class="dm-profile" inert={open || undefined}>
          <div class="dm-head">
            <div class="dm-ava">{face ? <img src={outfitImage(face)} alt="" width={72} height={72} /> : <Hanger size={28} />}</div>
            <div class="dm-name"><h3>{user.displayName}</h3><span>Sample profile</span></div>
            <button class="dm-hanger" onClick={openSheet} aria-label={`Open ${user.displayName}’s outfits`} title="RoFit’s hanger button"><Hanger /></button>
          </div>
          <div class="dm-tabs" role="tablist" aria-label="Profile sections">
            <button role="tab" aria-selected="true" tabIndex={-1}>About</button>
            <button role="tab" aria-selected="false" tabIndex={-1} disabled>Creations</button>
            <button role="tab" aria-selected="false" ref={tabRef} class="dm-rofit-tab" onClick={openSheet}><Hanger size={15} />Outfits<small>added by RoFit</small></button>
          </div>
          <div class="dm-about">
            <p>{user.blurb}</p>
            <p class="dm-hint">Open <b>Outfits</b> (or the hanger) to start. Everything you see is RoFit’s real interface; Roblox is played by a sample server in this page.</p>
            <div class="dm-ghost" aria-hidden="true"><i /><i /><i /></div>
          </div>
        </div>
        {open && <Sheet key={`${userId}:${epoch}`} userId={userId} userName={user.displayName} initialOutfit={initialOutfit && initUser === userId ? initialOutfit : undefined} onExit={exit} closing={closing} />}
        <div class="dm-notice" role="status" aria-live="polite">{msg && <p key={msg.n}>{msg.t}</p>}</div>
      </div>

      <aside class="dm-panel" aria-label="Sample Roblox controls">
        <div class="dm-panel-head"><span class="tag">Sample Roblox</span><button class="dm-reset" onClick={reset}>Reset</button></div>
        <fieldset class="dm-group">
          <legend>Whose profile</legend>
          {USERS.map((u) => (
            <label class="dm-radio" key={u.id}>
              <input type="radio" name="dm-user" checked={u.id === userId} onChange={() => pick(u.id)} />
              <span><b>{u.displayName}</b><small>{u.blurb}</small></span>
            </label>
          ))}
        </fieldset>
        <fieldset class="dm-group">
          <legend>Roblox is</legend>
          <div class="dm-seg">
            {NETS.map((x) => <label key={x.v}><input type="radio" name="dm-net" checked={net === x.v} onChange={() => { sim.net = x.v; setNet(x.v); }} /><span>{x.label}</span></label>)}
          </div>
          <p class="dm-small">{NETS.find((x) => x.v === net)!.hint}</p>
        </fieldset>
        <fieldset class="dm-group">
          <legend>You are</legend>
          <div class="dm-seg">
            <label><input type="radio" name="dm-me" checked={!signed} onChange={() => { setSignedIn(false); __demoReset(); setSigned(false); }} /><span>Signed out</span></label>
            <label><input type="radio" name="dm-me" checked={signed} onChange={() => { setSignedIn(true); __demoReset(); setSigned(true); }} /><span>Signed in</span></label>
          </div>
          <p class="dm-small">{signed ? 'As “Sample Viewer”. Try “What do I own?” and Compare → with what I’m wearing.' : 'The default. RoFit never asks for a password; in the extension it uses the Roblox session your browser already has.'}</p>
        </fieldset>
        <fieldset class="dm-group">
          <legend>Meanwhile, on Roblox</legend>
          <div class="dm-events">
            {(Object.keys(EVENTS) as EventKey[]).map((k) => (
              <button key={k} class="dm-event" onClick={() => fire(k)} disabled={userId !== USERS[0].id}>
                <span>{EVENTS[k].label}</span>{fired[k] ? <em>×{fired[k]}</em> : null}
              </button>
            ))}
          </div>
          <p class="dm-small">{userId === USERS[0].id ? 'Each one also skips an hour, so RoFit’s cached copies are due for a re-check.' : 'These happen on Sample Wardrobe.'}</p>
        </fieldset>
        <div class="dm-group dm-reqs">
          <div class="dm-legend">Requests RoFit made</div>
          <LogList />
        </div>
      </aside>
    </div>
  );
}

export function mountDemo(el: HTMLElement, initialOutfit?: number) {
  el.textContent = '';
  render(<Demo initialOutfit={initialOutfit} />, el);
}
