/**
 * Every outbound link and fact the site shows about RoFit's availability lives here.
 * Set a value to turn the matching UI on; leave it null and the site shows an honest "not yet" state instead of a fake link.
 */
export const SITE = {
  name: 'RoFit',
  url: 'https://rofit.site',
  tagline: 'Saved Roblox outfits, piece by piece.',
  description: 'RoFit adds an Outfits tab to Roblox profiles: browse the outfits a player saved, inspect every item, compare looks and keep the ones you like. Free, source on GitHub, nothing collected.',
} as const;

export const LINKS = {
  github: 'https://github.com/zeniyaxe/rofit',
  issues: 'https://github.com/zeniyaxe/rofit/issues',
  /** Set once the listing is live. */
  chromeStore: null as string | null,
  firefoxAddons: null as string | null,
  edgeAddons: null as string | null,
  /** A real address / invite, when they exist. Never a placeholder. */
  supportEmail: 'support@rofit.site' as string | null,
  securityEmail: null as string | null,
  discord: null as string | null,
  donate: 'https://www.roblox.com/games/6513295364/hi#!/store' as string | null,
};

/** What RoFit actually ships for. Update when a build for another browser exists. */
export const BROWSERS = {
  chrome: { name: 'Chrome', built: true },
  edge: { name: 'Edge', built: true, note: 'Chromium-based; the Chrome build is expected to work, but it is not listed separately yet.' },
  firefox: { name: 'Firefox', built: false },
} as const;

export const LEGAL = {
  /** Date the privacy policy and terms were last reviewed by the owner. */
  updated: '7 October 2026',
  operator: 'The RoFit project (rofit.site)',
};
