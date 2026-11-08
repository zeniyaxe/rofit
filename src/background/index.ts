import * as db from './db.ts';
import { limiter, onCapability, registerTab, RobloxError, transportInfo, unregisterTab } from './roblox.ts';
import { makeHandlers } from './service.ts';
import type { Reply, RpcType, Diagnostics } from '../shared/rpc.ts';
import type { CapState, Capability, RpcError } from '../shared/types.ts';
import { loadSettings } from '../shared/settings.ts';
import { payloadFrom } from '../shared/share.ts';

const CAP_KEY = 'caps';
const ERR_KEY = 'errors';

// Service workers sleep; anything worth reading later goes in storage.session, not module globals.
onCapability((cap, st) => {
  chrome.storage.session.get(CAP_KEY).then((o) => {
    const caps = (o[CAP_KEY] ?? {}) as Partial<Record<Capability, CapState>>;
    caps[cap] = st;
    return chrome.storage.session.set({ [CAP_KEY]: caps });
  }).catch(() => {});
  if (!st.ok) {
    chrome.storage.session.get(ERR_KEY).then((o) => {
      const errs = ((o[ERR_KEY] ?? []) as Diagnostics['recentErrors']).slice(-19);
      errs.push({ at: st.at, where: cap, message: st.error ?? 'failed' });
      return chrome.storage.session.set({ [ERR_KEY]: errs });
    }).catch(() => {});
  }
});

/** Opens (or reuses) the workspace tab at a route; see pages/workspace.tsx for the routes. */
async function openPage(route: string) {
  const url = chrome.runtime.getURL('workspace.html') + (route ? '#' + route : '');
  const tabs = await chrome.tabs.query({ url: chrome.runtime.getURL('workspace.html*') });
  if (tabs[0]?.id) { await chrome.tabs.update(tabs[0].id, { url, active: true }); await chrome.windows.update(tabs[0].windowId, { focused: true }); }
  else await chrome.tabs.create({ url });
}

const handlers = makeHandlers({
  openUrls: async (urls) => {
    // Only roblox.com catalog pages, only a handful, only on explicit request from the UI.
    for (const u of urls.slice(0, 10)) if (/^https:\/\/www\.roblox\.com\/catalog\/\d+$/.test(u)) await chrome.tabs.create({ url: u, active: false });
  },
  diag: async () => {
    const s = await chrome.storage.session.get([CAP_KEY, ERR_KEY]);
    const counts: Record<string, number> = {};
    for (const n of ['users', 'outfits', 'details', 'assets', 'snapshots', 'library', 'thumbs'] as const) counts[n] = await db.count(n);
    let storageBytes: number | undefined;
    try { storageBytes = (await navigator.storage.estimate()).usage; } catch { /* optional */ }
    return {
      version: chrome.runtime.getManifest().version,
      capabilities: (s[CAP_KEY] ?? {}) as Diagnostics['capabilities'], counts, recentErrors: (s[ERR_KEY] ?? []) as Diagnostics['recentErrors'],
      limiter: { cooldownMs: Math.max(0, limiter.cooldownUntil - Date.now()) }, transport: { via: transportInfo.via, at: transportInfo.at }, storageBytes,
    };
  },
  openPage,
});

// ---- who may talk to the worker -------------------------------------------------------------------
// Extension pages and the roblox.com content script get the full RPC surface. The rofit.site bridge (content/site.ts)
// gets exactly one message, 'site-import', which can only open the import dialog for a valid share link.
const EXT_ORIGIN = new URL(chrome.runtime.getURL('')).origin;
const SITE_ORIGIN = 'https://rofit.site';
const originOf = (s: chrome.runtime.MessageSender) => { try { return s.origin ?? new URL(s.url ?? '').origin; } catch { return ''; } };
const trusted = (s: chrome.runtime.MessageSender) => s.id === chrome.runtime.id && (originOf(s) === EXT_ORIGIN || originOf(s) === 'https://www.roblox.com');

// Content scripts announce themselves so the worker can run Roblox requests inside a Roblox tab (see roblox.ts#send).
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg?.__rofit === 'hello' && sender.id === chrome.runtime.id && originOf(sender) === 'https://www.roblox.com' && sender.tab?.id !== undefined) registerTab(sender.tab.id);
  return false;
});

chrome.runtime.onMessage.addListener((msg, sender, send) => {
  if (msg?.__rofit !== 'site-import' || sender.id !== chrome.runtime.id) return false;
  if (originOf(sender) !== SITE_ORIGIN || sender.frameId !== 0) { send({ ok: false, reason: 'origin' }); return false; }
  const payload = typeof msg.payload === 'string' ? payloadFrom(msg.payload) : null;
  if (!payload) { send({ ok: false, reason: 'invalid' }); return false; }
  openPage('library/import/' + payload).then(() => send({ ok: true }), () => send({ ok: false, reason: 'unavailable' }));
  return true;
});
chrome.tabs.onRemoved.addListener((id) => { unregisterTab(id); });

chrome.runtime.onMessage.addListener((msg, sender, send) => {
  if (!msg || msg.__rofit !== true) return false;
  // Only our own extension pages and the roblox.com content script may talk to the worker.
  if (!trusted(sender)) { send({ ok: false, error: { kind: 'forbidden', message: 'Not allowed from here' } } satisfies Reply<never>); return false; }
  const h = handlers[msg.type as RpcType] as ((r: unknown) => Promise<unknown>) | undefined;
  if (!h) { send({ ok: false, error: { kind: 'bad-response', message: 'Unknown request' } } satisfies Reply<never>); return false; }
  h(msg.req).then(
    (data) => send({ ok: true, data } satisfies Reply<unknown>),
    (e) => {
      const error: RpcError = e instanceof RobloxError ? e.toJSON() : (e && typeof e.kind === 'string') ? e : { kind: 'server', message: String(e?.message ?? e) };
      send({ ok: false, error } satisfies Reply<never>);
    },
  );
  return true;
});

chrome.runtime.onInstalled.addListener(async (d) => {
  chrome.alarms.create('rofit-prune', { periodInMinutes: 60 * 24 });
  if (d.reason === 'install') await chrome.tabs.create({ url: chrome.runtime.getURL('workspace.html#welcome') });
  if (d.reason === 'update') {
    // A real release (new major.minor) gets a What's new tab, opened in the background so it never steals focus;
    // patches only light the toolbar badge. The popup clears it.
    const [pa, pb] = (d.previousVersion ?? '0.0').split('.');
    const [a, b] = chrome.runtime.getManifest().version.split('.');
    if (pa !== a || pb !== b) await chrome.tabs.create({ url: chrome.runtime.getURL('workspace.html#whatsnew'), active: false });
    await chrome.action.setBadgeBackgroundColor({ color: '#335fff' });
    await chrome.action.setBadgeText({ text: 'NEW' });
  }
});

chrome.alarms.onAlarm.addListener(async (a) => {
  if (a.name !== 'rofit-prune') return;
  // Expired thumbnail URLs go; resolved asset records are kept (they're what makes “last known” possible).
  const thumbs = await db.getAll<{ key: string; at: number }>('thumbs');
  await db.del('thumbs', thumbs.filter((t) => Date.now() - t.at > 7 * 86400_000).map((t) => t.key));
  const s = await loadSettings();
  const snaps = await db.getAll<{ id: number; outfitKey: string; at: number }>('snapshots');
  const by = new Map<string, typeof snaps>();
  for (const x of snaps) { if (!by.has(x.outfitKey)) by.set(x.outfitKey, []); by.get(x.outfitKey)!.push(x); }
  const drop: number[] = [];
  for (const list of by.values()) { list.sort((a, b) => b.at - a.at); drop.push(...list.slice(s.historyLimit).map((x) => x.id)); }
  await db.del('snapshots', drop);
});
