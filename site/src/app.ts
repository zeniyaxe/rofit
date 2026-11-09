/**
 * rofit.site client script: navigation toggle, copy buttons, RoFit detection and the share viewer (/o/#…).
 *
 * Security notes
 * - Everything from a share link is untrusted. decodeShare() validates types and lengths; this file only ever
 *   inserts it as text (textContent / append(string)), builds links from validated numeric IDs, loads images only
 *   from the https://tr.rbxcdn.com/ URLs decodeShare() rebuilt from validated paths, and sets swatch colours
 *   through the CSSOM from validated hex (the CSP blocks inline style attributes, not CSSOM).
 * - The bridge is postMessage on this window only. Messages are accepted from this window and origin only, and
 *   RoFit decides for itself what to do with an import request (it opens its own confirmation screen).
 */
import { decodeShare, payloadFrom, shareUrl, type SharedOutfit } from '../../src/shared/share.ts';
import { GROUP_ORDER, typeGroup, typeName, type Group } from '../../src/shared/assetTypes.ts';
import { Check, Copy, Download, ExternalLink, ImageOff, Link2, TriangleAlert, BookmarkPlus, Info } from 'lucide';

type IconNode = [string, Record<string, string | number>][];
type Kid = Node | string | null | undefined | false;

const SVGNS = 'http://www.w3.org/2000/svg';
function ico(node: IconNode): SVGSVGElement {
  const s = document.createElementNS(SVGNS, 'svg');
  for (const [k, v] of Object.entries({ viewBox: '0 0 24 24', width: '24', height: '24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false' })) s.setAttribute(k, v);
  for (const [tag, attrs] of node) {
    const c = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) c.setAttribute(k, String(v));
    s.append(c);
  }
  return s;
}

const ATTRS = new Set(['class', 'href', 'src', 'alt', 'rel', 'id', 'type', 'title', 'role', 'loading', 'decoding', 'referrerpolicy', 'aria-label', 'aria-live', 'aria-hidden', 'hidden', 'width', 'height']);
function h<K extends keyof HTMLElementTagNameMap>(tag: K, props?: Record<string, string | boolean | undefined> | null, ...kids: Kid[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === false) continue;
    if (!ATTRS.has(k)) throw new Error(`attribute ${k} not allowed`);
    el.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids) if (k != null && k !== false) el.append(k);
  return el;
}

// ---- small page behaviours ---------------------------------------------------------------------
function copyButtons() {
  document.addEventListener('click', async (e) => {
    const btn = (e.target as Element | null)?.closest?.<HTMLButtonElement>('button[data-copy]');
    if (!btn) return;
    const ok = await copyText(btn.dataset.copy ?? '');
    flash(btn, ok ? 'Copied' : 'Select and copy it');
  });
}

// ---- RoFit detection (the extension's site.js announces itself; see src/content/site.ts) ----------
const VERSION = /^\d{1,4}(?:\.\d{1,4}){0,3}$/;
let installed: string | null = null;
const onInstalled = new Set<(v: string) => void>();
let pendingImport: ((r: { ok: boolean; reason?: string }) => void) | null = null;

function setInstalled(v: unknown) {
  if (typeof v !== 'string' || !VERSION.test(v) || v === installed) return;
  installed = v;
  for (const f of onInstalled) f(v);
}
function watchRoFit() {
  window.addEventListener('message', (e: MessageEvent) => {
    if (e.source !== window || e.origin !== location.origin) return;
    const d = e.data as { type?: unknown; version?: unknown; ok?: unknown; reason?: unknown } | null;
    if (!d || typeof d !== 'object') return;
    if (d.type === 'rofit:hello') setInstalled(d.version);
    else if (d.type === 'rofit:import-result' && pendingImport) pendingImport({ ok: d.ok === true, reason: typeof d.reason === 'string' ? d.reason : undefined });
  });
  setInstalled(document.documentElement.dataset.rofit);
  window.postMessage({ type: 'rofit:ping' }, location.origin);
}
const whenInstalled = (f: (v: string) => void) => { if (installed) f(installed); onInstalled.add(f); };

/** Ask RoFit to open its import screen for a share link. Must be called from a click (RoFit checks). */
function requestImport(payload: string, timeout = 5000): Promise<{ ok: boolean; reason?: string }> {
  return new Promise((resolve) => {
    const done = (r: { ok: boolean; reason?: string }) => { clearTimeout(t); pendingImport = null; resolve(r); };
    const t = setTimeout(() => done({ ok: false, reason: 'timeout' }), timeout);
    pendingImport = done;
    window.postMessage({ type: 'rofit:import', payload }, location.origin);
  });
}

const newer = (a: string, b: string) => {
  const x = a.split('.').map(Number), y = b.split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) > (y[i] ?? 0);
  return false;
};

function downloadPage() {
  const box = document.getElementById('detect');
  const latest = box?.closest<HTMLElement>('[data-release-version]')?.dataset.releaseVersion ?? '';
  if (!box) return;
  const show = (cls: string, ...kids: Kid[]) => { box.className = `note detect ${cls}`; box.replaceChildren(...kids.filter(Boolean) as (Node | string)[]); box.hidden = false; };
  whenInstalled((v) => {
    if (VERSION.test(latest) && newer(latest, v)) show('warn', h('b', null, `RoFit ${v} is installed in this browser.`), ` Version ${latest} is out; see `, h('a', { href: '#update' }, 'Updating'), ' to keep your library.');
    else show('ok', h('b', null, `RoFit ${v} is installed in this browser.`), ' You’re up to date.');
  });
  setTimeout(() => { if (!installed) show('', 'RoFit isn’t detected in this browser.'); }, 1500);
}

// ---- share viewer -------------------------------------------------------------------------------
const PARTS: [keyof SharedOutfit['bodyColors'], string][] = [['head', 'Head'], ['torso', 'Torso'], ['leftArm', 'Left arm'], ['rightArm', 'Right arm'], ['leftLeg', 'Left leg'], ['rightLeg', 'Right leg']];
const SCALES: [keyof SharedOutfit['scale'], string][] = [['height', 'Height'], ['width', 'Width'], ['head', 'Head'], ['depth', 'Depth'], ['proportion', 'Proportion'], ['bodyType', 'Body type']];
const dateFmt = (t: number) => new Date(t).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
const plural = (n: number, one: string) => `${n} ${n === 1 ? one : one + 's'}`;
const profileUrl = (id: number) => `https://www.roblox.com/users/${id}/profile`;

function img(src: string | undefined, fallback: () => Node): Node {
  if (!src) return fallback();
  const el = h('img', { src, alt: '', loading: 'lazy', decoding: 'async', referrerpolicy: 'no-referrer' });
  el.addEventListener('error', () => el.replaceWith(fallback()), { once: true });
  return el;
}
const figure = (cls = 'c1') => h('span', { class: `fig ${cls}` });

function emptyState(title: string, body: Kid[], iconNode: IconNode, actions = true): HTMLElement {
  return h('div', { class: 'v-empty' },
    h('div', { class: 'ic' }, ico(iconNode)),
    h('h1', null, title),
    h('p', { class: 'lede' }, ...body),
    actions ? h('div', { class: 'btns' }, h('a', { class: 'btn primary', href: '/download/' }, 'Get RoFit'), h('a', { class: 'btn', href: '/docs/#share-links' }, 'How share links work')) : null);
}

function outfitView(o: SharedOutfit, payload: string): HTMLElement {
  const name = o.outfit.name.trim() || 'Untitled outfit';
  const status = h('p', { class: 'v-status', role: 'status', 'aria-live': 'polite' });
  const say = (cls: string, text: string) => { status.className = `v-status ${cls}`; status.textContent = text; };
  const manual = h('div', { class: 'note small v-help' },
    h('b', null, 'Already have RoFit?'), ' Copy this link, then in RoFit open your ', h('b', null, 'Library'), ', choose ', h('b', null, '⋯ → Import backup, manifest or link…'), ' and paste it. You’ll see a preview before anything is saved.');

  // Primary action: Save to RoFit when the extension is here, Get RoFit otherwise.
  const actions = h('div', { class: 'btns v-actions' });
  const get = h('a', { class: 'btn primary', href: '/download/' }, ico(Download as IconNode), 'Get RoFit');
  const save = h('button', { class: 'btn primary', type: 'button' }, ico(BookmarkPlus as IconNode), 'Save to RoFit');
  save.addEventListener('click', async () => {
    save.disabled = true;
    say('', 'Asking RoFit…');
    const r = await requestImport(payload);
    save.disabled = false;
    if (r.ok) { say('ok', 'RoFit opened its import screen in another tab. Check the preview there, then press Import.'); return; }
    const why: Record<string, string> = {
      busy: 'One moment, then try again.',
      activation: 'Click “Save to RoFit” again.',
      invalid: 'RoFit couldn’t read this link. Ask for it to be copied again.',
    };
    say('warn', why[r.reason ?? ''] ?? 'RoFit didn’t answer. You can still import the link by hand (see below).');
    manual.hidden = false;
  });
  const open = h('a', { class: 'btn', href: `${profileUrl(o.user.id)}#rofit/${o.outfit.id}`, rel: 'noopener noreferrer' }, ico(ExternalLink as IconNode), 'Open on Roblox');
  const copy = h('button', { class: 'btn', type: 'button' }, ico(Copy as IconNode), 'Copy link');
  copy.addEventListener('click', async () => flash(copy, (await copyText(shareUrl(payload))) ? 'Copied' : 'Copy from the address bar'));
  actions.append(get, open, copy);
  whenInstalled(() => { get.replaceWith(save); manual.hidden = true; });

  // Items, grouped like RoFit groups them.
  const groups = new Map<Group, SharedOutfit['items']>();
  for (const it of o.items) { const g = typeGroup(it.typeId); groups.set(g, [...(groups.get(g) ?? []), it]); }
  const items = h('section', { class: 'v-sec', 'aria-label': 'Items' }, h('h2', null, 'Items', h('small', null, String(o.items.length))));
  if (!o.items.length) items.append(h('p', { class: 'muted' }, 'This snapshot has no items.'));
  for (const g of GROUP_ORDER) {
    const list = groups.get(g);
    if (!list) continue;
    items.append(h('h3', { class: 'v-group' }, g), h('ul', { class: 'v-items' }, ...list.map((it) => h('li', { class: 'v-item' },
      h('span', { class: 'ith' }, img(it.thumb, () => ico(ImageOff as IconNode))),
      h('span', null, h('b', { title: it.name }, it.name || 'Untitled item'), h('small', null, typeName(it.typeId))),
      h('a', { href: `https://www.roblox.com/catalog/${it.id}`, rel: 'noopener noreferrer', 'aria-label': `${it.name} on the Roblox Marketplace` }, 'Marketplace')))));
  }

  // Body colours (CSSOM only, from validated 6-digit hex) and scale.
  const swatches = h('div', { class: 'v-body' }, ...PARTS.map(([k, label]) => {
    const sw = h('i');
    sw.style.backgroundColor = `#${o.bodyColors[k]}`;
    return h('div', { class: 'v-sw' }, sw, h('span', null, label, h('code', null, `#${o.bodyColors[k]}`)));
  }));
  const scale = h('div', { class: 'v-scale' }, ...SCALES.map(([k, label]) => h('div', null, label, h('b', null, `${Math.round(o.scale[k] * 100)}%`))));
  const body = h('section', { class: 'v-sec', 'aria-label': 'Body' }, h('h2', null, 'Body'), swatches,
    o.avatarType === 'R6' ? h('p', { class: 'muted small' }, 'R6 avatars don’t use body scale.') : scale);

  const at = dateFmt(o.at);
  return h('div', { class: 'v-grid' },
    h('div', { class: 'v-hero' }, h('div', { class: 'v-render' }, img(o.thumb, () => figure('c2')))),
    h('div', null,
      h('span', { class: 'badge accent' }, ico(Link2 as IconNode), 'Shared outfit'),
      h('div', { class: 'v-head' },
        h('h1', null, name),
        h('div', { class: 'v-sub' },
          h('span', null, 'by ', h('a', { href: profileUrl(o.user.id), rel: 'noopener noreferrer' }, `@${o.user.name}`)),
          h('span', null, o.avatarType), h('span', null, plural(o.items.length, 'item')), h('span', null, `Snapshot from ${at}`))),
      actions, status, manual,
      h('div', { class: 'note small' }, ico(Info as IconNode), ' ',
        h('b', null, 'This is a snapshot. '), `It shows what the sender saw in RoFit on ${at}. The outfit may have changed, been deleted or be private now; Roblox shows the current version. Pictures come from Roblox’s image server; nothing else on this page talks to a server.`),
      items, body));
}

async function viewerPage(root: HTMLElement) {
  const render = async () => {
    const raw = location.hash.slice(1);
    let view: HTMLElement;
    if (!raw) {
      view = emptyState('Shared outfits open here', ['When someone shares an outfit from RoFit, the link points here and carries the outfit inside it, after the #. Browsers never send that part to a server, so rofit.site doesn’t see what’s in the link.'], Link2 as IconNode);
    } else if (typeof DecompressionStream === 'undefined') {
      view = emptyState('This browser can’t open share links', ['It’s missing a feature share links need (DecompressionStream). Try a current version of Chrome, Edge, Firefox or Safari.'], TriangleAlert as IconNode, false);
    } else {
      const payload = payloadFrom('#' + raw);
      if (!payload) view = emptyState('This isn’t a RoFit share link', ['The part after the # doesn’t look like one. Ask the sender to copy the link again.'], TriangleAlert as IconNode);
      else {
        try {
          const o = await decodeShare(payload);
          view = outfitView(o, payload);
          document.title = `${o.outfit.name.trim() || 'Untitled outfit'} by @${o.user.name} · RoFit`;
        } catch (e) {
          view = emptyState('This link can’t be opened', [e instanceof Error ? e.message : 'It may be damaged. Ask for it to be copied again.'], TriangleAlert as IconNode);
        }
      }
    }
    root.replaceChildren(view);
  };
  window.addEventListener('hashchange', render);
  await render();
}

copyButtons();
watchRoFit();
if (document.getElementById('detect')) downloadPage();
const viewer = document.getElementById('viewer');
if (viewer) void viewerPage(viewer);
