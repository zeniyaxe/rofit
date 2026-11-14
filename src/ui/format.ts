import type { OutfitCost } from '../shared/analysis.ts';

export const nf = new Intl.NumberFormat('en-US');
export const robux = (n: number) => `R$ ${nf.format(n)}`;

/**
 * Price label for an outfit card. States only what the data proves: with off-sale or unknown items the sum is a lower
 * bound ("R$ 120+"), and a lower bound of zero says nothing, so it's never shown as "R$ 0+".
 */
export function costLabel(c: OutfitCost): string | null {
  return costFigure(c).text;
}

/** The counts every price summary shares (OutfitCost on cards, PriceSummary in the inspector and compare). */
export interface CostParts { buyNow: number; resale: number; free: number; offsale: number; unknown: number }
export interface CostFigure {
  /** New items at list price plus limiteds at their lowest resale: what Roblox's prices prove. */
  amount: number;
  /** null when nothing can honestly be said (only unknown prices, or a lower bound of zero). */
  text: string | null;
  /** false: some items aren't counted, so `amount` is a lower bound and the UI marks it as one. */
  exact: boolean;
  /** What isn't counted, e.g. "1 off sale · 2 prices unknown"; null when exact. */
  missing: string | null;
  /** One sentence for title/aria-label that says what the number means. */
  says: string;
}

/**
 * The single rule for showing a cost: a known total prints as is; with off-sale or unknown items it is a lower bound
 * ("R$ 854+") that the UI draws differently (dashed underline) and explains; a lower bound of zero is never shown.
 */
export function costFigure(c: CostParts): CostFigure {
  const amount = c.buyNow + c.resale;
  const exact = c.offsale === 0 && c.unknown === 0;
  const missing = exact ? null : [c.offsale && `${nf.format(c.offsale)} off sale`, c.unknown && plural(c.unknown, 'price') + ' unknown'].filter(Boolean).join(' · ');
  if (exact) {
    const text = amount === 0 ? 'Free' : robux(amount);
    return { amount, text, exact, missing, says: amount === 0 ? 'Free: every item costs nothing' : `${robux(amount)} to recreate with today’s prices` };
  }
  const notCounted = [c.offsale && plural(c.offsale, 'item') + ' off sale with no resale price', c.unknown && plural(c.unknown, 'item') + ' with no price from Roblox'].filter(Boolean).join(' and ');
  if (amount > 0) return { amount, text: robux(amount) + '+', exact, missing, says: `At least ${robux(amount)}. Not counted: ${notCounted}.` };
  if (c.unknown === 0) return { amount, text: 'Off sale', exact, missing, says: `Can’t be bought today: ${notCounted}.` };
  return { amount, text: null, exact, missing, says: `Cost unknown: ${notCounted}.` };
}

/** Difference between two costs (b − a), only claimed when both are exact. */
export function costDelta(a: CostParts, b: CostParts): { text: string; exact: boolean; diff: number | null } {
  const fa = costFigure(a), fb = costFigure(b);
  if (!fa.exact || !fb.exact) return { text: 'Difference unknown', exact: false, diff: null };
  const d = fb.amount - fa.amount;
  return { text: d === 0 ? 'Same cost' : `${d > 0 ? '+' : '−'}${robux(Math.abs(d))}`, exact: true, diff: d };
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

export function download(name: string, text: string | Blob, mime = 'application/json') {
  const url = URL.createObjectURL(text instanceof Blob ? text : new Blob([text], { type: mime }));
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
