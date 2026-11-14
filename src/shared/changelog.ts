/** What the "What's new" page shows for the current minor version. Keep to 4-5 lines a person would care about. */
export const HIGHLIGHTS: { icon: 'settings' | 'download' | 'lock' | 'compare' | 'layers' | 'globe'; title: string; body: string }[] = [
  { icon: 'layers', title: 'A wardrobe at a glance', body: 'Before you pick an outfit, the side panel sums up the profile: R6/R15, the dearest known look, what you can still buy, the most-worn pieces.' },
  { icon: 'settings', title: 'Honest costs', body: 'A total with unknown prices reads “R$ 854+” and says what wasn’t counted. Differences are only stated when both totals are exact.' },
  { icon: 'download', title: 'Renders that arrive', body: 'Outfits no longer get stuck on “Rendering…”: RoFit retries Roblox properly and shows the small render while the big one is made.' },
  { icon: 'compare', title: 'Clearer compare', body: 'One colour per side, labelled counts, and the cost of switching from one look to the other.' },
  { icon: 'globe', title: 'A new rofit.site', body: 'Redesigned around real saved outfits, called out piece by piece.' },
];
