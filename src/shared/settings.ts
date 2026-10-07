export interface Settings {
  appearance: 'auto' | 'light' | 'dark' | 'oled';
  motion: 'full' | 'reduced';
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
}

export const DEFAULTS: Settings = {
  appearance: 'auto', motion: 'full', density: 'comfortable', layout: 'grid',
  showPrices: true, technical: false, showPresets: false,
  profileTab: true, profileButton: true,
  keepHistory: true, historyLimit: 20, cacheMinutes: 10, onboarded: false,
};

const KEY = 'settings';

export async function loadSettings(): Promise<Settings> {
  try {
    const o = await chrome.storage.local.get(KEY);
    return { ...DEFAULTS, ...(o[KEY] || {}) };
  } catch { return { ...DEFAULTS }; }
}
export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const next = { ...(await loadSettings()), ...patch };
  await chrome.storage.local.set({ [KEY]: next });
  return next;
}
export function onSettings(cb: (s: Settings) => void): () => void {
  const fn = (c: Record<string, chrome.storage.StorageChange>, area: string) => {
    if (area === 'local' && c[KEY]) cb({ ...DEFAULTS, ...(c[KEY].newValue || {}) });
  };
  chrome.storage.onChanged.addListener(fn);
  return () => chrome.storage.onChanged.removeListener(fn);
}
