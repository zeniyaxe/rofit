/** Stand-in for src/shared/settings.ts: same API, kept in memory (no chrome.storage, nothing persisted by the website). */
import { DEFAULTS as REAL_DEFAULTS, type Settings } from '../../../src/shared/settings.ts';

export type { Settings };
export const DEFAULTS: Settings = { ...REAL_DEFAULTS };
let current: Settings = { ...REAL_DEFAULTS, onboarded: true };
const subs = new Set<(s: Settings) => void>();

export async function loadSettings(): Promise<Settings> { return { ...current }; }
export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  current = { ...current, ...patch };
  subs.forEach((f) => f({ ...current }));
  return { ...current };
}
export function onSettings(cb: (s: Settings) => void): () => void { subs.add(cb); return () => { subs.delete(cb); }; }
export function resetSettings() { saveSettings({ ...REAL_DEFAULTS, onboarded: true }); }
