/**
 * Profile integration. Deliberately tiny: it finds the right places on roblox.com profiles,
 * puts a native-looking Outfits tab and action button there, and loads the real UI (sheet.js)
 * only when someone opens it. Everything Roblox-DOM-specific lives in this file.
 */
import { HANGER } from '../shared/hanger.ts';
import { loadSettings, onSettings, DEFAULTS, type Settings } from '../shared/settings.ts';

const TAB = 'data-rofit-tab';
const BTN = 'data-rofit-btn';
const WRAP = 'data-rofit-wrap';

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
  document.querySelectorAll(`[${WRAP}]`).forEach((w) => w.remove());
  document.querySelectorAll(`[${BTN}]`).forEach((b) => b.remove());
}

let raf = 0;
function schedule() {
  if (raf) return;
  raf = requestAnimationFrame(() => { raf = 0; ensure(); });
}

function ensure() {
  const id = profileUserId();
  const key = id ? `${id}` : '';
  if (key !== lastKey) {
    // Navigated to a different profile (or away): drop the old sheet and anything we injected.
    lastKey = key;
    sheetApi?.closeSheet(false, true);
    removeInjected();
  }
  if (!id) { obs?.disconnect(); obs = null; return; }
  if (!obs) {
    obs = new MutationObserver(schedule);
    obs.observe(document.body, { childList: true, subtree: true });
  }
  if (settings.profileTab) addTab(); else document.querySelectorAll(`[${TAB}]`).forEach((a) => a.closest('li')?.remove());
  if (settings.profileButton) addButtons(); else { document.querySelectorAll(`[${WRAP}]`).forEach((w) => w.remove()); document.querySelectorAll(`[${BTN}]`).forEach((b) => b.remove()); }
}

// ---- request proxy for the worker ---------------------------------------------------------------
// Only our six read-only API hosts, only from our own extension, only GET or the catalog batch POST.
const API_HOST = /^https:\/\/(avatar|thumbnails|catalog|economy|inventory|users)\.roblox\.com\//;
async function proxyFetch(m: { url: string; method?: string; body?: string; csrf?: string }) {
  if (!API_HOST.test(m.url) || (m.method && m.method !== 'GET' && m.method !== 'POST')) return { ok: false, error: 'blocked' };
  try {
    const post = m.method === 'POST';
    const r = await fetch(m.url, {
      method: post ? 'POST' : 'GET', credentials: 'include', body: post ? m.body : undefined,
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
  const m = location.hash.match(/^#rofit(?:\/(\d+))?$/);
  if (m && profileUserId()) open(m[1] ? Number(m[1]) : undefined);
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
