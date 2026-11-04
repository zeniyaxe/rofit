import type { MotionPref } from './motion.ts';

export interface Settings {
  /** Schema of this object. 1 = RoFit 1.x (motion full|reduced), 2 = RoFit 2.0. */
  v: number;
  appearance: 'auto' | 'light' | 'dark' | 'oled';
  motion: MotionPref;
  density: 'compact' | 'comfortable' | 'large';
  layout: 'grid' | 'list';
  showPrices: boolean;
  technical: boolean;       // IDs, version IDs, hex values
  showPresets: boolean;     // Roblox-supplied (non-editable) outfits
  profileTab: boolean;
  profileButton: boolean;
  keepHistory: boolean;
  historyLimit: number;
  cacheMinutes: number;
  onboarded: boolean;
  /** Read every outfit's contents when a profile opens (otherwise the explorer offers it). */
  autoIndex: boolean;
  /** While indexing, also look up item prices so the explorer can filter and sort by cost. */
  indexPrices: boolean;
  /** Ask Roblox once without your session to tell "public" from "visible because you're signed in". */
  checkAccess: boolean;
}

export const DEFAULTS: Settings = {
  v: 2,
  appearance: 'auto', motion: 'system', density: 'comfortable', layout: 'grid',
  showPrices: true, technical: false, showPresets: false,
  profileTab: true, profileButton: true,
  keepHistory: true, historyLimit: 20, cacheMinutes: 10, onboarded: false,
  autoIndex: false, indexPrices: true, checkAccess: true,
};

const KEY = 'settings';

/**
 * Brings stored settings up to the current schema. 1.x stored motion as 'full' (its default, which still honoured the
 * OS reduced-motion setting) or 'reduced'. Those become 'system' and 'calm', so nobody's motion changes on upgrade.
 */
export function normalizeSettings(raw: unknown): Settings {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const s = { ...DEFAULTS, ...o } as Settings & Record<string, unknown>;
  if (!o.v || (o.v as number) < 2) {
    if (o.motion === 'reduced') s.motion = 'calm';
    else if (o.motion === 'full' || o.motion === undefined) s.motion = 'system';
  }
  if (!['system', 'full', 'balanced', 'calm'].includes(s.motion)) s.motion = 'system';
  s.v = 2;
  return s;
}

export async function loadSettings(): Promise<Settings> {
  try {
    const o = await chrome.storage.local.get(KEY);
    return normalizeSettings(o[KEY]);
  } catch { return { ...DEFAULTS }; }
}
export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const next = { ...(await loadSettings()), ...patch, v: 2 };
  await chrome.storage.local.set({ [KEY]: next });
  return next;
}
export function onSettings(cb: (s: Settings) => void): () => void {
  const fn = (c: Record<string, chrome.storage.StorageChange>, area: string) => {
    if (area === 'local' && c[KEY]) cb(normalizeSettings(c[KEY].newValue));
  };
  chrome.storage.onChanged.addListener(fn);
  return () => chrome.storage.onChanged.removeListener(fn);
}
