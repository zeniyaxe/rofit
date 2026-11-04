/**
 * Why RoFit can (or can't) show someone's outfits. One vocabulary for the explorer badge, the inspector, share links,
 * the library and the docs. Grounded in docs/research/outfit-access.md: Roblox applies the owner's inventory
 * visibility to outfits, so what is visible depends on who asks. RoFit only reports what it observed.
 */
import type { ErrKind } from './types.ts';

export type AccessState = 'owner' | 'public' | 'viewer' | 'shared' | 'cached' | 'restricted' | 'unavailable' | 'unknown';

export interface AccessInfo {
  state: AccessState;
  at: number;
  /** Was the signed-in viewer known? id when signed in, null when signed out, undefined when unknown. */
  meId?: number | null;
  /** Result of the anonymous first-page check. */
  anon?: 'visible' | 'hidden' | 'error' | 'skipped';
}

export interface AccessEvidence {
  userId: number;
  /** The signed-in list (or the error Roblox gave instead). */
  visible: number;
  error?: ErrKind;
  meId?: number | null;
  anon?: AccessInfo['anon'];
  /** Outfits RoFit has from an earlier visit. */
  cached?: number;
}

export function deriveAccess(e: AccessEvidence): AccessState {
  if (e.error === 'forbidden' || e.error === 'unauthenticated') return 'restricted';
  if (e.error === 'not-found') return 'unavailable';
  if (e.error) return e.cached ? 'cached' : 'unknown';
  if (e.meId != null && e.meId === e.userId) return 'owner';
  if (e.visible === 0) return 'unknown';
  // Signed out: Roblox already treated the request as anonymous, so whatever it showed is public.
  if (e.meId === null) return 'public';
  if (e.anon === 'visible') return 'public';
  if (e.anon === 'hidden') return 'viewer';
  return 'unknown';
}

export type Tone = 'ok' | 'accent' | 'warn' | 'muted';
export interface AccessCopy { label: string; body: string; tone: Tone; icon: 'ok' | 'user' | 'eye' | 'link' | 'clock' | 'lock' | 'warn' | 'dashed' }

export const ACCESS: Record<AccessState, AccessCopy> = {
  owner: { label: 'Your outfits', tone: 'ok', icon: 'user', body: 'You’re signed in as this account, so you see everything it has saved.' },
  public: { label: 'Public', tone: 'ok', icon: 'eye', body: 'Roblox shows these outfits to anyone, including people who aren’t signed in. RoFit checked by asking once without your session.' },
  viewer: { label: 'Visible to you', tone: 'accent', icon: 'lock', body: 'Roblox shows these because of your account (for example, you’re friends). Someone who isn’t signed in can’t see them, so think twice before sharing.' },
  shared: { label: 'Shared with you', tone: 'accent', icon: 'link', body: 'Someone sent you this snapshot. It shows what they saw when they made the link, and the live outfit may have changed or be private.' },
  cached: { label: 'Saved earlier', tone: 'muted', icon: 'clock', body: 'RoFit couldn’t reach Roblox just now, so this is the copy it loaded on an earlier visit.' },
  restricted: { label: 'Private', tone: 'warn', icon: 'lock', body: 'Roblox won’t show this account’s outfits to you. RoFit respects that and won’t show copies it cached earlier either.' },
  unavailable: { label: 'Unavailable', tone: 'warn', icon: 'warn', body: 'Roblox has no account with this ID. It may be deleted or banned.' },
  unknown: { label: 'Visibility unknown', tone: 'muted', icon: 'dashed', body: 'RoFit couldn’t tell whether these are public. If you share one, the link only carries what you see.' },
};

/** Sharing policy: public and your own outfits share freely; anything RoFit can't prove is public needs an explicit OK. */
export function sharePolicy(state: AccessState): 'allow' | 'confirm' | 'block' {
  if (state === 'owner' || state === 'public') return 'allow';
  if (state === 'restricted' || state === 'unavailable') return 'block';
  return 'confirm';
}
