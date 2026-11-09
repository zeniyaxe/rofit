/**
 * "RoFit settings" inside Roblox's own account settings page (roblox.com/my/account), as another entry in its left list.
 * Roblox's markup for that page churns, so nothing here depends on class names: the list is found by the labels of the
 * entries it contains, the content column by geometry. If either can't be found the popup's link still works, because
 * #!/rofit falls back to RoFit's own settings page.
 */
import { SETTINGS_HASH } from '../shared/links.ts';
import { HANGER } from '../shared/hanger.ts';

const LABELS = new Set([
  'account info', 'security', 'privacy', 'privacy & content restrictions', 'notifications', 'spending', 'robux',
  'subscriptions', 'parental controls', 'app permissions', 'browser preferences', 'billing', 'beta features', 'account restrictions',
]);
const MARK = 'data-rofit-account';

interface Nav { list: HTMLElement; items: HTMLElement[] }

export const isAccountPage = () => /^\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?my\/account\/?$/i.test(location.pathname);

function findNav(): Nav | null {
  const hits = new Map<HTMLElement, HTMLElement[]>();
  for (const el of document.querySelectorAll<HTMLElement>('a, button, li, [role=tab]')) {
    const t = (el.textContent ?? '').trim().toLowerCase();
    if (t.length > 40 || !LABELS.has(t)) continue;
    // The entry is the <li> if there is one, otherwise the link itself.
    const item = (el.closest('li') as HTMLElement | null) ?? el;
    const list = item.parentElement;
    if (!list) continue;
    const arr = hits.get(list) ?? [];
    if (!arr.includes(item)) arr.push(item);
    hits.set(list, arr);
  }
  let best: Nav | null = null;
  for (const [list, items] of hits) if (items.length >= 3 && (!best || items.length > best.items.length)) best = { list, items: [...list.children] as HTMLElement[] };
  return best;
}

/** The column to the side of the list: the biggest sibling (of the list or one of its ancestors) that doesn't contain it. */
function findContent(list: HTMLElement): HTMLElement | null {
  let n: HTMLElement | null = list;
  for (let depth = 0; n?.parentElement && depth < 6; depth++, n = n.parentElement) {
    let best: HTMLElement | null = null, area = 0;
    for (const c of n.parentElement.children as Iterable<HTMLElement>) {
      if (c === n || c.contains(list) || c.id === 'rofit-account-host') continue;
      const r = c.getBoundingClientRect();
      if (r.width > 280 && r.height > 120 && r.width * r.height > area) { best = c; area = r.width * r.height; }
    }
    if (best) return best;
  }
  return null;
}

const svgNS = 'http://www.w3.org/2000/svg';
function icon(): SVGElement {
  const svg = document.createElementNS(svgNS, 'svg');
  for (const [k, v] of Object.entries({ width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' })) svg.setAttribute(k, v);
  svg.style.cssText = 'flex:none;margin-right:8px;vertical-align:-3px';
  for (const [tag, attrs] of HANGER) { const e = document.createElementNS(svgNS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); svg.appendChild(e); }
  return svg;
}

type PanelApi = { mountPanel(host: HTMLElement): () => void };
let api: PanelApi | null = null;
async function panel(): Promise<PanelApi> {
  return (api ??= await import(/* @vite-ignore */ chrome.runtime.getURL('account.js')));
}

let ours: HTMLElement | null = null;
let host: HTMLElement | null = null;
let content: HTMLElement | null = null;
let unmount: (() => void) | null = null;
let removed: [Element, string][] = [];
let obs2: MutationObserver | null = null;
let saved: { height: string; maxHeight: string; overflow: string } | null = null;
let obs: MutationObserver | null = null;
let active = false;

const activeish = (c: string) => /(^|[-_])(active|selected|current)$/i.test(c);

/** Roblox's own children of the content column are hidden (not removed) while ours is open, so React keeps its tree intact. */
function hideSiblings() {
  if (!content) return;
  for (const c of content.children as Iterable<HTMLElement>) {
    if (c === host || c.hasAttribute('data-rofit-hidden')) continue;
    c.setAttribute('data-rofit-hidden', c.style.display || '-');
    c.style.display = 'none';
  }
}
function showSiblings() {
  if (!content) return;
  for (const c of content.querySelectorAll<HTMLElement>(':scope > [data-rofit-hidden]')) {
    const prev = c.getAttribute('data-rofit-hidden');
    c.style.display = prev && prev !== '-' ? prev : '';
    c.removeAttribute('data-rofit-hidden');
  }
}

async function activate(nav: Nav) {
  if (active) return;
  content = findContent(nav.list);
  if (!content) { fallback(); return; }
  active = true;
  // Look un-selected on Roblox's own entry while ours is open; restored on the way out.
  removed = [];
  for (const el of nav.list.querySelectorAll('*')) for (const c of [...el.classList]) if (activeish(c)) { removed.push([el, c]); el.classList.remove(c); }
  ours?.setAttribute('data-rofit-on', '');
  ours?.querySelector('a, button')?.setAttribute('aria-current', 'page');

  // In flow, not an overlay: the page (and footer) lays out around our panel's real height.
  // The column may have a fixed height from the page it normally shows; let it grow with our panel.
  saved = { height: content.style.height, maxHeight: content.style.maxHeight, overflow: content.style.overflow };
  content.style.height = 'auto'; content.style.maxHeight = 'none'; content.style.overflow = 'visible';
  host = document.createElement('div');
  host.id = 'rofit-account-host';
  host.style.cssText = 'display:block;width:100%';
  content.appendChild(host);
  const mountHost = host;
  // Roblox may render new children into the column while we are open; keep them out of sight.
  obs2 = new MutationObserver(() => {
    if (!content?.isConnected || host !== mountHost || !unmount) return;
    if (mountHost.parentElement !== content) content.appendChild(mountHost);
    hideSiblings();
  });
  obs2.observe(content, { childList: true });
  try {
    const { mountPanel } = await panel();
    if (host !== mountHost) return;
    if (!content?.isConnected) { deactivate(); fallback(); return; }
    if (mountHost.parentElement !== content) content.appendChild(mountHost);
    unmount = mountPanel(mountHost);
    hideSiblings();
  } catch (error) {
    if (host !== mountHost) return;
    console.warn("RoFit could not mount account settings", error);
    deactivate();
    fallback();
    return;
  }
  if (!location.hash.startsWith(SETTINGS_HASH)) history.replaceState(history.state, '', location.pathname + location.search + SETTINGS_HASH);
}

function deactivate() {
  if (!active) return;
  active = false;
  obs2?.disconnect(); obs2 = null;
  unmount?.(); unmount = null;
  host?.remove(); host = null;
  showSiblings();
  if (content && saved) { content.style.height = saved.height; content.style.maxHeight = saved.maxHeight; content.style.overflow = saved.overflow; saved = null; }
  for (const [el, c] of removed) el.classList.add(c);
  removed = [];
  ours?.removeAttribute('data-rofit-on');
  ours?.querySelector('a, button')?.removeAttribute('aria-current');
}

function fallback() {
  chrome.runtime.sendMessage({ __rofit: true, type: 'page.open', req: { route: 'settings' } }).catch(() => {});
}

function pageStyle() {
  if (document.getElementById('rofit-account-style')) return;
  const st = document.createElement('style');
  st.id = 'rofit-account-style';
  // Page-level (not in the panel's shadow root): this styles our entry in Roblox's own list.
  st.textContent = `[${MARK}] a,[${MARK}] button{cursor:pointer}[${MARK}][data-rofit-on]{font-weight:700}[${MARK}][data-rofit-on]>*{font-weight:700}[${MARK}][data-rofit-on]{box-shadow:inset 3px 0 0 currentColor}`;
  document.head.appendChild(st);
}

function inject(nav: Nav) {
  const existing = nav.list.querySelector<HTMLElement>(`[${MARK}]`);
  if (existing) { ours = existing; return; }
  pageStyle();
  const model = nav.items.find((i) => !i.querySelector('[aria-current], [aria-selected=true], .active') && !i.matches('.active')) ?? nav.items[nav.items.length - 1];
  if (!model) return;
  const li = model.cloneNode(true) as HTMLElement;
  li.setAttribute(MARK, '');
  li.removeAttribute('id');
  for (const c of [...li.querySelectorAll('*'), li]) for (const k of [...c.classList]) if (activeish(k)) c.classList.remove(k);
  // Put the label into the deepest element that carries the text, so Roblox's own typography and spacing stay.
  const holder = [...li.querySelectorAll<HTMLElement>('*')].reverse().find((e) => e.children.length === 0 && (e.textContent ?? '').trim()) ?? li;
  holder.textContent = 'RoFit settings';
  holder.prepend(icon());
  const a = li.matches('a') ? li : li.querySelector('a');
  if (a) { a.setAttribute('href', SETTINGS_HASH); a.removeAttribute('target'); }
  nav.list.appendChild(li);
  ours = li;
}

let wired: HTMLElement | null = null;
function wire(nav: Nav) {
  if (wired === nav.list) return;
  wired = nav.list;
  // Capture: take our own clicks before Roblox's router sees them, and release the panel when any other entry is chosen.
  nav.list.addEventListener('click', (e) => {
    const t = e.target as Node;
    if (ours?.contains(t)) { e.preventDefault(); e.stopPropagation(); activate(nav); }
    else if (active) deactivate();
  }, true);
}

function ensure() {
  if (!isAccountPage()) { teardown(); return; }
  if (active && !content?.isConnected) deactivate();
  const nav = findNav();
  if (!nav) return;
  inject(nav);
  wire(nav);
  if (location.hash.startsWith(SETTINGS_HASH) && !active) activate(nav);
  else if (active && !location.hash.startsWith(SETTINGS_HASH) && unmount) deactivate();
}

function teardown() {
  deactivate();
  document.querySelectorAll(`[${MARK}]`).forEach((e) => e.remove());
  ours = null; wired = null;
  obs?.disconnect(); obs = null;
}

let started = false;
let raf = 0;
export function startAccountIntegration() {
  const kick = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; ensure(); }); };
  if (!isAccountPage()) { if (started) teardown(); return; }
  if (!obs) { obs = new MutationObserver(kick); obs.observe(document.body, { childList: true, subtree: true }); }
  started = true;
  ensure();
  // The popup link lands on #!/rofit; if Roblox's list never shows up, don't leave the user on a dead page.
  if (location.hash.startsWith(SETTINGS_HASH)) setTimeout(() => { if (isAccountPage() && !active && !findNav()) fallback(); }, 8000);
}
