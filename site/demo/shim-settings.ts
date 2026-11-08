/** Stands in for src/shared/settings.ts in the website demo: same exports, in-memory instead of chrome.storage. */
export interface Settings {
  appearance: 'auto' | 'light' | 'dark' | 'oled';
  motion: 'full' | 'reduced';
  density: 'compact' | 'comfortable' | 'large';
  layout: 'grid' | 'list';
  showPrices: boolean; technical: boolean; showPresets: boolean; shortcuts: boolean; autoIndex: boolean; defaultSort: 'roblox' | 'name';
  keepHistory: boolean; historyLimit: number; cacheMinutes: number; profileTab: boolean; profileButton: boolean; onboarded: boolean;
}

export const DEFAULTS: Settings = {
  appearance: 'auto', motion: 'full', density: 'comfortable', layout: 'grid',
  showPrices: true, technical: false, showPresets: false, shortcuts: true, autoIndex: false, defaultSort: 'roblox',
  profileTab: true, profileButton: true, keepHistory: true, historyLimit: 20, cacheMinutes: 10, onboarded: true,
};

let state: Settings = { ...DEFAULTS };
const subs = new Set<(s: Settings) => void>();

export const loadSettings = async (): Promise<Settings> => ({ ...state });
export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  state = { ...state, ...patch };
  subs.forEach((f) => f({ ...state }));
  return { ...state };
}
export function onSettings(cb: (s: Settings) => void): () => void { subs.add(cb); return () => subs.delete(cb); }
export const setDemoSettings = (p: Partial<Settings>) => saveSettings(p);
