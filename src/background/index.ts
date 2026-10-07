import * as db from './db.ts';
import { limiter, onCapability, registerTab, RobloxError, transportInfo, unregisterTab } from './roblox.ts';
import { makeHandlers } from './service.ts';
import type { Reply, RpcType, Diagnostics } from '../shared/rpc.ts';
import type { CapState, Capability, RpcError } from '../shared/types.ts';
import { loadSettings } from '../shared/settings.ts';

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
  openPage: async (route) => {
    const url = chrome.runtime.getURL('workspace.html') + (route ? '#' + route : '');
    const tabs = await chrome.tabs.query({ url: chrome.runtime.getURL('workspace.html*') });
    if (tabs[0]?.id) { await chrome.tabs.update(tabs[0].id, { url, active: true }); await chrome.windows.update(tabs[0].windowId, { focused: true }); }
    else await chrome.tabs.create({ url });
  },
});

// Content scripts announce themselves so the worker can run Roblox requests inside a Roblox tab (see roblox.ts#send).
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg?.__rofit === 'hello' && sender.id === chrome.runtime.id && sender.tab?.id !== undefined) registerTab(sender.tab.id);
  return false;
});
chrome.tabs.onRemoved.addListener((id) => { unregisterTab(id); });

chrome.runtime.onMessage.addListener((msg, sender, send) => {
  if (!msg || msg.__rofit !== true) return false;
  // Only our own extension pages and content scripts may talk to the worker.
  if (sender.id !== chrome.runtime.id) return false;
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
