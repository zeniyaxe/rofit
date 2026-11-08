/** What the "What's new" page shows for the current minor version. Keep to 4-5 lines a person would care about. */
export const HIGHLIGHTS: { icon: 'settings' | 'download' | 'lock' | 'compare' | 'layers' | 'globe'; title: string; body: string }[] = [
  { icon: 'lock', title: 'Private profiles, still useful', body: 'When saved outfits are hidden, RoFit now shows what the player is wearing right now, clearly labelled.' },
  { icon: 'settings', title: 'Safer by design', body: 'RoFit’s Roblox requests are limited to the exact read-only endpoints it uses.' },
  { icon: 'download', title: 'Share an outfit as an image', body: 'Inspector → More → Save as image. Render, items, prices and total.' },
  { icon: 'compare', title: 'Compare slider', body: 'Wipe between two outfits and see every difference.' },
  { icon: 'globe', title: 'rofit.site', body: 'Guides, updates, support and a way to chip in.' },
];
