# Continuation notes

Where the website work stands, for whoever picks it up next.

## State (10 Oct 2026)
- Branch `website` (from `main` d799d59). Only `website/**`, two `package.json` scripts lines and two `.gitignore` lines changed. Extension source, `dist/`, `release/` untouched.
- Builds with `npm run site:build`; typechecks with `npm run site:typecheck`; tests with `npm run site:test`.
- Not deployed anywhere. No live Roblox lookup (see LEGAL-REVIEW.md §3).

## Verified
- Facts on the site (version 1.2.0, permissions, hosts, zip size, SHA-256, changelog) are read from the repo at build time; the build fails if `package.json`, `dist/manifest.json`, `CHANGELOG.md` and the release zip disagree. (`public/manifest.json` carries a placeholder 1.0.0 that the extension build overwrites; that's expected.)
- Hero and honesty-section totals come from the extension's own `summarizePrices()`/`priceKind()`.
- Demo runs the real `src/ui` + `src/background/service.ts` + `roblox.ts` with swaps listed in README.md.
- Test suite (Chromium + Firefox): 4 viewports × light/dark with overflow checks and screenshots, scroll-story vs reduced-motion vs phone modes, no-JS, demo flows (inspect, last-known after delist, private profile with no fallback endpoint, offline, HTTP 429), demo chunk failure + reload recovery, keyboard/skip link/focus, install states for 6 spoofed browsers, throttled network, crawl of every internal link + non-affiliation text on every page, 404, gzip budgets.
- Lighthouse (mobile, local, before final contrast fix): performance 95, accessibility 95 → contrast/heading fixes applied, best practices 100, SEO 100; CLS 0.006.

## Known issues / ideas
- `npm test` (extension unit tests) fails on Node 24 because `node --test tests/unit/` treats the directory as a file; `node --test tests/unit/*.test.ts` passes. Pre-existing; not changed here.
- The demo chunk is ~66 KB gzip (Preact + the whole extension UI); loaded only near the demo.
- Hero callout positions are hand-placed in `src/pages/home-top.ts` (`CALLOUTS`, `EXPLODE`, `FIG` must match `.spec-fig` in CSS). If the art changes, re-check screenshots at 1440/1024/768/390.
- `index.html` inlines sample thumbnails as SVG data URLs (~16 KB gzip total HTML). Fine for now.
- Firefox can't install RoFit; the site says so rather than hiding it.

## Decisions waiting on the owner
1. Hosting (GitHub Pages with `BASE=/rofit/`, or a custom domain) and naming the host in the privacy policy.
2. Enable GitHub private vulnerability reporting (currently off).
3. Name/trademark comfort ("RoFit"), sample-art resemblance, optional contact email (LEGAL-REVIEW.md).
4. Whether a live public lookup (proxy) is ever wanted.
