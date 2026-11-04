import { costTotal, type OutfitCost } from '../shared/analysis.ts';

export const nf = new Intl.NumberFormat('en-US');
export const robux = (n: number) => `R$ ${nf.format(n)}`;

/**
 * Price label for an outfit card. States only what the data proves: with off-sale or unknown items the sum is a lower
 * bound ("R$ 120+"), and a lower bound of zero says nothing, so it's never shown as "R$ 0+".
 */
export function costLabel(c: OutfitCost): string | null {
  const t = costTotal(c);
  if (c.offsale === 0 && c.unknown === 0) return t === 0 ? 'Free' : robux(t);
  if (t > 0) return robux(t) + '+';
  return c.unknown === 0 ? 'Off sale' : null;
}

export function timeAgo(t: number, now = Date.now()): string {
  const s = Math.max(0, (now - t) / 1000);
  if (s < 45) return 'just now';
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  if (s < 86400 * 30) return `${Math.round(s / 86400)}d ago`;
  return new Date(t).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
export const dateStr = (t: number) => new Date(t).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
export const plural = (n: number, one: string, many = one + 's') => `${nf.format(n)} ${n === 1 ? one : many}`;

/** A remembered profile's outfit list as last seen, without overstating it: Roblox answers "none" and "hidden" alike. */
export function profileOutfits(u: { outfitCount?: number; access?: { state: string } }): string {
  const s = u.access?.state;
  if (s === 'restricted') return 'Outfits private';
  if (s === 'unavailable') return 'Unavailable';
  if (u.outfitCount == null) return 'Profile';
  return u.outfitCount ? plural(u.outfitCount, 'outfit') : 'No outfits shown';
}

export const itemUrl = (id: number) => `https://www.roblox.com/catalog/${id}`;
export const outfitUrl = (userId: number, id: number) => `https://www.roblox.com/users/${userId}/profile#rofit/${id}`;

export function download(name: string, text: string, mime = 'application/json') {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function copy(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy'); ta.remove(); return ok;
  }
}

export function errorText(e: { kind?: string; message?: string; retryAfter?: number } | undefined): { title: string; body: string } {
  switch (e?.kind) {
    case 'rate-limited': return { title: 'Roblox is rate limiting RoFit', body: `Too many requests in a short time. Wait ${e.retryAfter ?? 10}s and try again.` };
    case 'not-found': return { title: 'Roblox can’t find that', body: 'The user or outfit no longer exists, or its ID is wrong.' };
    case 'forbidden': return { title: 'Roblox won’t show this', body: 'This list is private or restricted. RoFit doesn’t get around that.' };
    case 'network':
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return { title: 'You’re offline', body: 'RoFit shows what it has saved; anything new from Roblox needs a connection. Try again once you’re back online.' };
      return { title: 'Couldn’t reach Roblox', body: e.message || 'Check your connection and try again.' };
    case 'timeout': return { title: 'Roblox took too long', body: 'It didn’t answer within 20 seconds. It may be busy; try again in a moment.' };
    case 'unauthenticated': return { title: 'Sign in to Roblox', body: e.message || 'This needs you to be signed in to Roblox in this browser.' };
    case 'server': return { title: 'Roblox had a problem', body: 'Their servers returned an error. Try again shortly.' };
    case 'bad-response': return { title: 'Roblox changed something', body: e.message || 'The response wasn’t in the shape RoFit expects. Diagnostics in settings has details.' };
    default: return { title: 'Request failed', body: e?.message || 'Try again.' };
  }
}
