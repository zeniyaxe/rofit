/**
 * RoFit deep links live in a profile URL's fragment: …/profile#rofit (open RoFit) or …/profile#rofit/<outfitId>.
 * Roblox's current profile page rewrites fragments it doesn't know when it loads (#rofit/1 becomes #!#rofit%2F1),
 * so both spellings are read. Anything else in the fragment belongs to Roblox and is left alone.
 */
export function parseRoFitHash(hash: string): { outfit?: number } | null {
  let h = hash;
  try { h = decodeURIComponent(hash); } catch { /* malformed escapes: read it as is */ }
  const m = /^#(?:!\/?)?#?rofit(?:\/(\d{1,17}))?\/?$/.exec(h);
  if (!m) return null;
  const n = m[1] ? Number(m[1]) : NaN;
  return Number.isSafeInteger(n) && n > 0 ? { outfit: n } : {};
}

export const isRoFitHash = (hash: string) => parseRoFitHash(hash) !== null;

/** The fragment RoFit writes (without '#'): "rofit/<id>" while an outfit is open. */
export const rofitHash = (outfitId?: number) => (outfitId ? `rofit/${outfitId}` : 'rofit');
