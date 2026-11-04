/** Motion preference → what actually plays. Shared by every surface so "Balanced" means the same thing everywhere. */
export type MotionPref = 'system' | 'full' | 'balanced' | 'calm';
export type MotionLevel = 'full' | 'balanced' | 'calm';

/**
 * System follows the OS (reduce → calm, otherwise full). An explicit choice wins over the OS, because the user made it
 * on purpose in RoFit (and the UI says so). Unknown or legacy values fall back to System.
 */
export function motionLevel(pref: string | undefined, osReduced: boolean): MotionLevel {
  if (pref === 'full' || pref === 'balanced' || pref === 'calm') return pref;
  return osReduced ? 'calm' : 'full';
}

/** Durations in ms for JS-driven motion (FLIP, shared-element flights). Calm = no travel at all. */
export const DURATION: Record<MotionLevel, { flip: number; enter: number; fly: number; flyBack: number }> = {
  full: { flip: 420, enter: 320, fly: 440, flyBack: 300 },
  balanced: { flip: 240, enter: 200, fly: 0, flyBack: 0 },
  calm: { flip: 0, enter: 0, fly: 0, flyBack: 0 },
};

/** Class for the root element: CSS reads it to shorten or remove travel (see styles.css "motion levels"). */
export const motionClass = (l: MotionLevel) => (l === 'calm' ? ' rm' : l === 'balanced' ? ' mb' : '');
