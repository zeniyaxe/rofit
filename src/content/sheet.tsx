/**
 * The on-profile workspace. Loaded lazily by content.js. Lives in a closed shadow root so
 * Roblox's CSS can't reach in and ours can't leak out, and it sits outside React's tree.
 */
import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import css from '../ui/styles.css';
import { Shell } from '../ui/Shell.tsx';
import { useMotion, useSettings } from '../ui/data.ts';
import { resolveTheme, themeVars } from '../ui/theme.ts';
import { motionClass } from '../shared/motion.ts';
import { isRoFitHash } from '../shared/deeplink.ts';

interface Opts { userId: number; userName: string; initialOutfit?: number; returnFocus?: HTMLElement | null; onClose?: () => void }

let host: HTMLElement | null = null;
let mountEl: HTMLElement | null = null;
let prevOverflow = '';
let opts: Opts | null = null;

export const isOpen = () => !!host;

/** The fixed Roblox top bar stays visible; the sheet fills what's below it. */
function navBottom(): number {
  let max = 0;
  for (const el of document.querySelectorAll<HTMLElement>('#header, .rbx-header, header, nav, [class*="navbar"], [class*="header"]')) {
    const cs = getComputedStyle(el);
    if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
    const r = el.getBoundingClientRect();
    if (r.top <= 1 && r.height > 20 && r.height < 120 && r.width > innerWidth * 0.6) max = Math.max(max, r.bottom);
  }
  return Math.round(max || 48);
}

function Root({ o, close }: { o: Opts; close: () => void }) {
  const settings = useSettings();
  const motion = useMotion(settings.motion);
  const [, bump] = useState(0);
  useEffect(() => {
    // Follow Roblox if the user flips its theme while the sheet is open.
    const mo = new MutationObserver(() => bump((n) => n + 1));
    mo.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    const onResize = () => bump((n) => n + 1);
    addEventListener('resize', onResize);
    return () => { mo.disconnect(); removeEventListener('resize', onResize); };
  }, []);
  const vars = { ...themeVars(resolveTheme(settings, true)), '--rf-top': navBottom() + 'px' };
  return (
    <div class={'rf rf-sheet' + motionClass(motion)} style={vars as any} role="dialog" aria-modal="true" aria-label={`${o.userName}’s outfits`}>
      <Shell userId={o.userId} userName={o.userName} initialOutfit={o.initialOutfit} onExit={close} />
    </div>
  );
}

export function openSheet(o: Opts) {
  if (host) closeSheet(false, true);
  opts = o;
  host = document.createElement('div');
  host.id = 'rofit-host';
  host.style.cssText = `all:initial;position:fixed;inset:0;z-index:2147483000;pointer-events:none;font-family:${getComputedStyle(document.body).fontFamily};`;
  const shadow = host.attachShadow({ mode: __ROFIT_TEST__ ? 'open' : 'closed' });
  const style = document.createElement('style');
  // Page font is inherited so the sheet reads as part of Roblox, not an overlay.
  style.textContent = css;
  const mount = document.createElement('div');
  mount.style.pointerEvents = 'auto';
  shadow.append(style, mount);
  mountEl = mount;
  document.documentElement.appendChild(host);
  prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  render(<Root o={o} close={() => closeSheet(true)} />, mount);
  // It's a modal dialog: focus moves in (the shell is rendered synchronously, so no need to wait for a frame).
  (shadow.querySelector('.rf-shell') as HTMLElement | null)?.focus({ preventScroll: true });
}

let closing = false;
/** Plays the exit (the sheet eases away) before tearing down; `instant` skips it for route changes. */
export function closeSheet(restoreFocus = true, instant = false) {
  if (!host || closing) return;
  const h = host, o = opts, m = mountEl;
  const sheet = (m?.querySelector('.rf-sheet') ?? null) as HTMLElement | null;
  const finish = () => {
    closing = false;
    if (host !== h) return;
    host = null; opts = null;
    if (m) render(null, m);
    mountEl = null;
    h.remove();
    document.documentElement.style.overflow = prevOverflow;
    if (isRoFitHash(location.hash)) history.replaceState(history.state, '', location.pathname + location.search);
    if (restoreFocus) o?.returnFocus?.focus?.();
    o?.onClose?.();
  };
  if (instant || !sheet) { finish(); return; }
  closing = true;
  sheet.dataset.state = 'closed';
  setTimeout(finish, 210);
}
