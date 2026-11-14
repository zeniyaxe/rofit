# rofit.site

Static Astro site for RoFit. Lives in `site/` of the extension repo. **Not pushed anywhere; deploy only on the owner's go-ahead.**

```
npm install
npm run dev      # builds the demo bundle, then astro dev (http://localhost:4321)
npm run build    # demo bundle -> claim check -> astro build -> dist/
npm test         # claim check + built-site checks
node scripts/make-assets.mjs   # regenerates public/og.png and apple-touch-icon.png
node tests/e2e/pages.mjs 1440 900 d   # screenshots of pages into shots/ (needs the dev/preview server)
npm run test:ui  # cover switcher, tabs, menu focus, wipe, overflow at 320–1920px, Calm motion (needs the dev/preview server)
```

## How it works
- **The demo is the real extension UI.** `scripts/build-demo.mjs` bundles `../src/ui` with two shims (`demo/shim-rpc.ts`, `demo/shim-settings.ts`) swapped for the extension's rpc/settings modules, into `public/demo/demo.js` (lazy-loaded, ~180 KB). Real public profiles come from a dated snapshot (`public/real/`, see below); the only invented profile is "quiet" (private, no avatar). There are no drawn avatars anywhere.
- **Design system** (RoFit 3.0): see `DESIGN.md`. One stylesheet of tokens (`src/styles/global.css`); sections are plain Astro components with their own scoped styles. No sticky scroll scenes: motion is reveals, the cover's re-dealt looks and leader lines, card deals on the wardrobe shelf and the compare wipe. Calm zeroes travel tokens and keeps fades; Off removes durations. Content is visible without JS.
- **Prices are never illustrative.** Everything priced on the site comes from the snapshot; off-sale items say Off sale and unresolved items say Unknown (dashed). `src/lib/real.ts#priceOf` is the only formatter.
- **Privacy claims are generated, not typed.** `src/lib/privacy.ts` reads the extension's `public/manifest.json` and source; `scripts/check-claims.mjs` fails the build if permissions/hosts/network files change without the site's wording being updated.
- **Changelog** is parsed from `../CHANGELOG.md` at build time.
- **Display preferences** (theme, Full/Calm/Off motion) live in `localStorage` only.

## Placeholders (nothing invented)
Everything unknown is `null` in `src/config.ts` (`chromeStore`, `firefoxAddons`, `supportEmail`, `securityEmail`, `discord`, `donate`). UI shows an honest "not yet" state until set. See `LEGAL-REVIEW.md` for decisions the owner must make. Firefox has no build; the site never claims one.

## Deploy
`wrangler.jsonc` and `public/_headers` target Cloudflare static assets; not connected to any account. Do not change DNS or buy anything without the owner.

## Real public profiles in the demo
`node scripts/capture-real.mjs <userId> ...` takes a dated snapshot of what a signed-out visitor sees (saved outfits with `isEditable:true`, outfit renders, item details) into `public/real/` (snapshot.json + img/). The demo shows each as a "real" chip with a non-affiliation note; with no snapshot the chips simply don't appear. Visitors' browsers never call Roblox. Private outfits never come back and are never worked around. Be gentle with Roblox: it rate-limits (429) quickly, so capture a few ids at a time. Featured players can be removed on request (support@rofit.site): delete their entry and rebuild.
`node scripts/make-store-assets.mjs` writes Chrome Web Store images (sample data only) to `store/`.
