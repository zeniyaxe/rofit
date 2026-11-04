/**
 * The rofit.site bridge. Runs only on https://rofit.site/* in Chrome's isolated world (the page can't reach this script's scope).
 *
 * Trust boundary: rofit.site is treated like any other web page. Through this bridge it can only
 *   1. learn that RoFit is installed, and which version (so the site can say “Open in RoFit” instead of “Install”);
 *   2. ask RoFit to open its import dialog for one share link — after a click, at most once every 1.5 s.
 * It can't read the library, settings, history or anything else, and nothing is saved until the user confirms
 * inside the extension (the import dialog shows a dry-run report first). The worker re-checks the sender and the payload.
 */
import { payloadFrom } from '../shared/share.ts';

const ORIGIN = 'https://rofit.site';
const version = chrome.runtime.getManifest().version;
let last = 0;

const post = (msg: Record<string, unknown>) => window.postMessage(msg, ORIGIN);
const hello = () => post({ type: 'rofit:hello', version });

if (location.origin === ORIGIN) {
  document.documentElement.dataset.rofit = version;
  window.addEventListener('message', (e: MessageEvent) => {
    if (e.source !== window || e.origin !== ORIGIN) return;
    const d = e.data as { type?: unknown; payload?: unknown } | null;
    if (!d || typeof d !== 'object' || typeof d.type !== 'string') return;
    if (d.type === 'rofit:ping') { hello(); return; }
    if (d.type !== 'rofit:import') return;
    const result = (ok: boolean, reason?: string) => post({ type: 'rofit:import-result', ok, reason });
    const payload = typeof d.payload === 'string' && d.payload.length <= 32_000 ? payloadFrom(d.payload) : null;
    if (!payload) return result(false, 'invalid');
    // Only in response to a click or key press, so a page can't open RoFit on its own.
    if (!navigator.userActivation?.isActive) return result(false, 'activation');
    const now = Date.now();
    if (now - last < 1500) return result(false, 'busy');
    last = now;
    chrome.runtime.sendMessage({ __rofit: 'site-import', payload }).then(
      (r: { ok?: boolean; reason?: string } | undefined) => result(!!r?.ok, r?.reason),
      () => result(false, 'unavailable'),
    );
  });
  hello();
}
