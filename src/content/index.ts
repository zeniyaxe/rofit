import { startAccountIntegration } from './account.ts';
/**
 * Profile integration. Deliberately tiny: it finds the right places on roblox.com profiles,
 * puts a native-looking Outfits tab and action button there, and loads the real UI (sheet.js)
 * only when someone opens it. Everything Roblox-DOM-specific lives in this file.
 */
import { HANGER } from '../shared/hanger.ts';
import { loadSettings, onSettings, DEFAULTS, type Settings } from '../shared/settings.ts';
import { parseRoFitHash } from '../shared/deeplink.ts';

const TAB = 'data-rofit-tab';
const BTN = 'data-rofit-btn';
const WRAP = 'data-rofit-wrap';
const SEC = 'data-rofit-sec';

let settings: Settings = DEFAULTS;
let sheetApi: { openSheet(o: SheetOpts): void; closeSheet(restoreFocus?: boolean, instant?: boolean): void; isOpen(): boolean } | null = null;
let loading: Promise<void> | null = null;
let obs: MutationObserver | null = null;
let lastKey = '';

interface SheetOpts { userId: number; userName: string; initialOutfit?: number; returnFocus?: HTMLElement | null; onClose?: () => void }

/** Profile URLs look like /users/156/profile, optionally with a locale prefix like /es/. */
function profileUserId(): number | null {
  const m = location.pathname.match(/^\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)(?:\/profile)?\/?$/i);
  return m ? Number(m[1]) : null;
}
function profileName(): string {
  const h = document.querySelector('.profile-name, [class*="profile-header"] h1, .user-profile-header h1');
  const t = (h?.textContent || document.title.replace(/\s*[-–|]\s*Roblox.*$/i, '')).trim();
  return t || 'this user';
}

async function ensureSheet() {
  if (sheetApi) return;
  loading ??= import(/* @vite-ignore */ chrome.runtime.getURL('sheet.js')).then((m) => { sheetApi = m; });
  await loading;
}

async function open(initialOutfit?: number, from?: HTMLElement | null) {
  const userId = profileUserId();
  if (!userId) return;
  await ensureSheet();
  sheetApi!.openSheet({ userId, userName: profileName(), initialOutfit, returnFocus: from ?? null });
}

// ---- finding native anchors ---------------------------------------------------------------------
function findTabList(): HTMLElement | null {
  const direct = document.querySelector<HTMLElement>('ul.profile-tabs');
  if (direct) return direct;
  // Class names churn; the tabs are always a list of links whose text includes About.
  for (const a of document.querySelectorAll<HTMLAnchorElement>('a')) {
    if (a.textContent?.trim() === 'About' && a.closest('ul,[role=tablist]')) return a.closest('ul,[role=tablist]') as HTMLElement;
  }
  return null;
}

function addTab() {
  const list = findTabList();
  if (!list || list.querySelector(`[${TAB}]`)) return;
  const items = [...list.children] as HTMLElement[];
  const model = items.find((li) => li.querySelector('a:not(.active)')) ?? items[0];
  const modelA = model?.querySelector('a') as HTMLAnchorElement | null;
  if (!model || !modelA) return;
  const li = model.cloneNode(false) as HTMLElement;
  const a = modelA.cloneNode(false) as HTMLAnchorElement;
  a.classList.remove('active');
  a.removeAttribute('id');
  a.href = '#rofit';
  a.textContent = 'Outfits';
  a.setAttribute(TAB, '');
  a.setAttribute('aria-haspopup', 'dialog');
  a.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); open(undefined, a); });
  li.appendChild(a);
  list.appendChild(li);
  // One entry per profile: if the tab list rendered after the row was placed, the tab wins.
  document.querySelectorAll(`[${SEC}]`).forEach((x) => x.remove());
}

/**
 * Roblox's 2025+ profile has no About/Creations tab list; its content is a stack of sections (Currently Wearing, …).
 * There, the Outfits entry is a section of its own right after Currently Wearing, using Roblox's heading classes.
 * It's a single button: nothing is fetched until it's clicked.
 */
function findWearingSection(): HTMLElement | null {
  const direct = document.querySelector<HTMLElement>('.profile-currently-wearing');
  if (direct) return direct;
  for (const h of document.querySelectorAll<HTMLElement>('h2, h3')) {
    if (h.textContent?.trim() === 'Currently Wearing') return (h.closest('[class*="profile-"]') as HTMLElement | null) ?? h.parentElement;
  }
  return null;
}

/** How long a profile gets to render Currently Wearing before the Saved Outfits row stops waiting for it. */
const SETTLE_MS = 2500;
let keySince = 0;

/**
 * Where the Saved Outfits row goes: right after Currently Wearing. Roblox leaves that section out when it fails to load
 * (or has nothing to show), so then the row starts the profile's sections instead: as soon as other sections have
 * rendered, or once the page has had SETTLE_MS to render it. If Currently Wearing shows up later, the row moves below it.
 */
function sectionSpot(): { anchor: HTMLElement; mode: 'after' | 'prepend' } | null {
  const wearing = findWearingSection();
  if (wearing?.parentElement) return { anchor: wearing, mode: 'after' };
  const content = document.querySelector<HTMLElement>('.profile-content');
  if (content && (content.querySelector('.profile-carousel, h2') || performance.now() - keySince > SETTLE_MS)) return { anchor: content, mode: 'prepend' };
  return null;
}

function addSection() {
  // A tab already exists (older layout): don't add a second entry.
  if (document.querySelector(`[${TAB}]`)) return;
  const spot = sectionSpot();
  const existing = document.querySelector<HTMLElement>(`[${SEC}]`);
  if (existing) {
    // Currently Wearing can render after the row was placed: keep the row directly below it.
    if (spot?.mode === 'after' && spot.anchor.nextElementSibling !== existing) spot.anchor.after(existing);
    return;
  }
  if (!spot) return;
  const heading = spot.anchor.querySelector('h2, h3');
  const sec = document.createElement('section');
  sec.setAttribute(SEC, '');
  sec.setAttribute('aria-label', 'Saved outfits');
  sec.style.cssText = 'margin: 24px 0 8px;';
  const h = (heading?.cloneNode(false) as HTMLElement | undefined) ?? document.createElement('h2');
  h.removeAttribute('id');
  h.textContent = 'Saved Outfits';
  h.style.marginBottom = '12px';
  const b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('aria-haspopup', 'dialog');
  b.style.cssText = 'display:flex;align-items:center;gap:12px;width:100%;max-width:520px;padding:12px 16px;border:0;border-radius:12px;'
    + 'background:color-mix(in srgb, currentColor 7%, transparent);color:inherit;font:inherit;text-align:left;cursor:pointer;transition:background .15s';
  b.addEventListener('mouseenter', () => { b.style.background = 'color-mix(in srgb, currentColor 11%, transparent)'; });
  b.addEventListener('mouseleave', () => { b.style.background = 'color-mix(in srgb, currentColor 7%, transparent)'; });
  const ic = document.createElement('span');
  ic.style.cssText = 'display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;flex:none;background:color-mix(in srgb, currentColor 9%, transparent)';
  ic.appendChild(iconSvg());
  const t = document.createElement('span');
  t.style.cssText = 'display:flex;flex-direction:column;flex:1;min-width:0;line-height:1.3';
  const t1 = document.createElement('b');
  t1.textContent = 'Browse their saved outfits';
  t1.style.fontWeight = '600';
  const t2 = document.createElement('span');
  t2.textContent = 'Opens RoFit: inspect, compare and keep outfits';
  t2.style.cssText = 'font-size:13px;opacity:.7';
  t.append(t1, t2);
  const arrow = document.createElement('span');
  arrow.textContent = '→';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.style.cssText = 'font-size:18px;opacity:.6';
  b.append(ic, t, arrow);
  b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); open(undefined, b); });
  sec.append(h, b);
  if (spot.mode === 'after') spot.anchor.after(sec); else spot.anchor.prepend(sec);
}

const svgNS = 'http://www.w3.org/2000/svg';
function iconSvg(): SVGElement {
  const svg = document.createElementNS(svgNS, 'svg');
  for (const [k, v] of Object.entries({ width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' })) svg.setAttribute(k, v);
  for (const [tag, attrs] of HANGER) {
    const el = document.createElementNS(svgNS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    svg.appendChild(el);
  }
  return svg;
}

function addButtons() {
  const header = document.querySelector('.user-profile-header-info, [class*="user-profile-header-info"]');
  if (!header) return;
  // The ⋯ button is an icon button; we copy its classes so the new button is natively styled and sized.
  header.querySelectorAll<HTMLButtonElement>('button[class*="icon-button"]').forEach((more) => {
    if (more.hasAttribute(BTN)) return;
    // Roblox wraps the ⋯ button in a plain block div (for its popover). Sit beside the wrapper, not inside it.
    let anchor: HTMLElement = more;
    while (anchor.parentElement && anchor.parentElement !== header && anchor.parentElement.children.length === 1 && getComputedStyle(anchor.parentElement).display !== 'flex') anchor = anchor.parentElement;
    const prev = anchor.previousElementSibling;
    if (prev?.hasAttribute(BTN) || prev?.hasAttribute(WRAP)) return;
    const b = more.cloneNode(false) as HTMLButtonElement;
    b.removeAttribute('id');
    b.setAttribute(BTN, '');
    b.setAttribute('aria-label', 'Saved outfits');
    b.title = 'Saved outfits';
    b.type = 'button';
    b.appendChild(iconSvg());
    b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); open(undefined, b); });
    if (anchor === more) { anchor.before(b); return; }
    const w = anchor.cloneNode(false) as HTMLElement;
    w.removeAttribute('id');
    w.setAttribute(WRAP, '');
    w.appendChild(b);
    anchor.before(w);
  });
}

function removeInjected() {
  document.querySelectorAll(`[${TAB}]`).forEach((a) => a.closest('li')?.remove());
  document.querySelectorAll(`[${SEC}]`).forEach((x) => x.remove());
  document.querySelectorAll(`[${WRAP}]`).forEach((w) => w.remove());
  document.querySelectorAll(`[${BTN}]`).forEach((b) => b.remove());
}

let pending = false, raf = 0, timer = 0;
/** Batches Roblox's bursts of DOM changes into one ensure(): on the next frame, or a timer when the tab isn't painting. */
function schedule() {
  if (pending) return;
  pending = true;
  const run = () => { if (!pending) return; pending = false; cancelAnimationFrame(raf); clearTimeout(timer); ensure(); };
  raf = requestAnimationFrame(run);
  timer = window.setTimeout(run, 120);
}

function ensure() {
  const id = profileUserId();
  const key = id ? `${id}` : '';
  if (key !== lastKey) {
    // Navigated to a different profile (or away): drop the old sheet and anything we injected.
    lastKey = key;
    keySince = performance.now();
    sheetApi?.closeSheet(false, true);
    removeInjected();
    // Re-check once the settle window has passed, even if Roblox stops mutating the page by then.
    if (id) window.setTimeout(schedule, SETTLE_MS + 100);
  }
  if (!id) { obs?.disconnect(); obs = null; return; }
  if (!obs) {
    obs = new MutationObserver(schedule);
    obs.observe(document.body, { childList: true, subtree: true });
  }
  if (settings.profileTab) { addTab(); addSection(); } else { document.querySelectorAll(`[${TAB}]`).forEach((a) => a.closest('li')?.remove()); document.querySelectorAll(`[${SEC}]`).forEach((x) => x.remove()); }
  if (settings.profileButton) addButtons(); else { document.querySelectorAll(`[${WRAP}]`).forEach((w) => w.remove()); document.querySelectorAll(`[${BTN}]`).forEach((b) => b.remove()); }
}

// ---- request proxy for the worker ---------------------------------------------------------------
// Restrict the Roblox tab proxy to the endpoints used by our RPC layer.
const GET_OK: RegExp[] = [
  /^https:\/\/avatar\.roblox\.com\/v1\/avatar(?:\?|$)/,
  /^https:\/\/avatar\.roblox\.com\/v1\/users\/\d+\/(?:avatar|outfits)(?:\?|$)/,
  /^https:\/\/avatar\.roblox\.com\/v2\/avatar\/users\/\d+\/outfits(?:\?|$)/,
  /^https:\/\/avatar\.roblox\.com\/v3\/outfits\/\d+\/details(?:\?|$)/,
  /^https:\/\/avatar\.roblox\.com\/v4\/outfits\/\d+\/details(?:\?|$)/,
  /^https:\/\/thumbnails\.roblox\.com\/v1\/(?:users\/(?:outfits|avatar)|assets)\?/,
  /^https:\/\/catalog\.roblox\.com\/v1\/catalog\/items\/details(?:\?|$)/,
  /^https:\/\/economy\.roblox\.com\/v2\/assets\/\d+\/details(?:\?|$)/,
  /^https:\/\/economy\.roblox\.com\/v1\/assets\/\d+\/resale-data(?:\?|$)/,
  /^https:\/\/inventory\.roblox\.com\/v1\/users\/\d+\/items\/Asset\/\d+\/is-owned(?:\?|$)/,
  /^https:\/\/users\.roblox\.com\/v1\/users\/\d+(?:\?|$)/,
  /^https:\/\/users\.roblox\.com\/v1\/users\/authenticated(?:\?|$)/,
];
const LOOKUP_POST = /^https:\/\/users\.roblox\.com\/v1\/usernames\/users(?:\?|$)/;
const POST_OK = /^https:\/\/catalog\.roblox\.com\/v1\/catalog\/items\/details(?:\?|$)/;
const API_HOST = /^https:\/\/(avatar|thumbnails|catalog|economy|inventory|users)\.roblox\.com\//;
const allowed = (url: string, method?: string) => API_HOST.test(url) && (method === 'POST' ? (POST_OK.test(url) || LOOKUP_POST.test(url)) : (!method || method === 'GET') && GET_OK.some((r) => r.test(url)));
async function proxyFetch(m: { url: string; method?: string; body?: string; csrf?: string }) {
  if (!allowed(m.url, m.method)) return { ok: false, error: 'blocked' };
  try {
    const post = m.method === 'POST';
    const r = await fetch(m.url, {
      method: post ? 'POST' : 'GET', credentials: 'include', body: post ? m.body : undefined, signal: AbortSignal.timeout(18_000),
      headers: post ? { 'content-type': 'application/json', ...(m.csrf ? { 'x-csrf-token': m.csrf } : {}) } : undefined,
    });
    return { ok: true, status: r.status, csrf: r.headers.get('x-csrf-token'), retryAfter: r.headers.get('retry-after'), text: await r.text() };
  } catch (e) { return { ok: false, error: String(e) }; }
}
chrome.runtime.sendMessage({ __rofit: 'hello' }).catch(() => {});
chrome.runtime.onMessage.addListener((msg, sender, send) => {
  if (sender.id !== chrome.runtime.id || msg?.__rofit !== 'fetch') return false;
  proxyFetch(msg).then(send);
  return true;
});

// ---- boot ---------------------------------------------------------------------------------------
loadSettings().then((s) => {
  settings = s;
  ensure();
  const link = parseRoFitHash(location.hash);
  if (link && profileUserId()) open(link.outfit);
});
onSettings((s) => { settings = s; ensure(); });

// SPA navigation: the Navigation API where it exists, history events and a slow poll as backstops.
// The Navigation API (Chrome 102+) reports every same-document navigation. The slow poll only exists for browsers without it.
const nav = (window as any).navigation;
if (nav?.addEventListener) nav.addEventListener('navigatesuccess', schedule);
else {
  let href = location.href;
  setInterval(() => { if (location.href !== href) { href = location.href; schedule(); } }, 1000);
}
window.addEventListener('popstate', schedule);

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (sender.id !== chrome.runtime.id || msg?.__rofit !== 'open') return;
  open();
});

startAccountIntegration();
