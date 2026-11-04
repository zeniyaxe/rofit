# RoFit Inspector — notes for future Claude sessions

## What it is
MV3 extension. On a roblox.com profile it adds one entry point (a **Saved Outfits** row after *Currently Wearing* on Roblox's current tab-less profile, or an **Outfits** tab on the older layout) plus a hanger button by ⋯; they open a workspace for that user's **real saved avatar outfits** (`outfitType=Avatar`, `isEditable:true`). Roblox presets (`isEditable:false`) are hidden by default and always labelled. Never present bundles, inventory, currently-wearing or favorites as saved outfits. The companion website lives in `site/` (rofit.site: docs, download, privacy, share-link viewer).

## Commands
```
npm run build        # dist/ (production, closed shadow root, minified)
node scripts/build.mjs --test   # dist-test/ (open shadow root, for Playwright)
npm run typecheck && npm test   # tsc + node --test (50 unit tests, node strips TS: no enums / parameter properties)
npm run test:e2e     # tests/e2e/run.mjs — real Chromium, live roblox.com, needs the --test build
node tests/e2e/popup.mjs    # toolbar popup: search, recent, open-on-tab
node site/build.mjs [--serve]   # rofit.site → site/dist (serve on :8787)
node tests/e2e/site.mjs [shots=1]   # site pages, CSP, viewer hostile input, extension bridge
node tests/e2e/stress.mjs   # 240 mocked outfits, 150% zoom, reduced motion, failing details
node tests/e2e/motion.mjs   # mid-flight frames of open/close/sort into shots/
npm run test:perf    # frame times while scrolling/sorting 300 outfits (cv|nocv arg)
npm run zip          # release/*.zip from dist/
```
`tests/e2e/flow.mjs tag=x [dark=1]` captures screenshots of every surface into `shots/` — use it for visual review. Look at the screenshots; don't trust the DOM alone. Set `ROFIT_CHROME=/path/to/chromium` when Playwright's bundled browser isn't installed.

## Architecture
- `src/background/` service worker. **Only** place that talks to Roblox (`roblox.ts`) and the only owner of IndexedDB (`db.ts`). `service.ts` = handlers (sync + access, thumbs, details+history, asset resolution+provenance, library incl. bulk/collections, backups, user lookup). `index.ts` = message router (`trusted(sender)`: our own pages and roblox.com tabs only), the separate `site-import` listener for the rofit.site bridge, capability tracking in `storage.session`, daily prune alarm.
- `src/shared/` types, `rpc.ts` (typed request map used by both sides), `analysis.ts` (pure: hash, diff, price summary, cost buckets, clustering, Lua export), `access.ts` (visibility states, badge copy, share policy), `share.ts` (share-link codec; also used by the website), `backup.ts` (export/import validation + dry-run report), `search.ts` (query parsing and ranking), `deeplink.ts` (`#rofit/<id>` parsing), `motion.ts`, `settings.ts` (schema v2 + migration), `assetTypes.ts`. All pure and unit tested.
- `src/content/index.ts` — the only code that knows Roblox's profile DOM. Tiny; lazy-imports `sheet.js` (declared in `web_accessible_resources`, `use_dynamic_url`). `sheet.tsx` mounts Preact in a closed shadow root outside React's tree. `site.ts` — the rofit.site bridge (see Trust boundaries).
- `src/ui/` Preact UI shared by the sheet, the library/settings page (`pages/workspace.tsx`) and the popup. `Shell.tsx` owns navigation state, keyboard and the command list; `Explorer`, `Inspector`, `Compare`, `Library`, `Settings`, `Welcome`, `NoOutfits`, `Access` (badge), `Share` (dialog), `Palette` (Ctrl K + shortcuts). One stylesheet (`styles.css`) driven by three variables (`--rf-bg/--rf-fg/--rf-accent`) sampled from the live page in `theme.ts`; every other color is `color-mix` of those.
- `pages/workspace.tsx` routes on `location.hash`: `library`, `library/import`, `library/import/<share payload>`, `settings[/<section>]`, `welcome`.
- `site/` static website (see `site/README.md`): `build.mjs` renders pages from `src/pages.mjs`, bundles `src/app.ts` (the only script), writes `_headers` (CSP). Claims on the site must match the code.

## Roblox assumptions (verified Nov 2026; re-verify before relying)
- v2 outfit list is token-paginated, no total. v1's `total` is bogus (500). Owners can restrict outfit visibility (Nov 2025): 403 = refused, an empty 200 can also mean hidden. Details in `docs/research/outfit-access.md`.
- v3 details give hex `bodyColor3s`, `scale`, `playerAvatarType`, and assets with name/type (even for assets the catalog won't resolve). v4 wraps the same in `outfitModel` with `bodyColors.*Color`; `parseDetails` reads both and v4 is the fallback.
- The current profile page has no About/Creations tab list and rewrites unknown fragments on load (`#rofit/1` → `#!#rofit%2F1`); `deeplink.ts` reads both.
- Catalog batch POST **omits** unresolvable assets; economy `v2/assets/{id}/details` is the fallback and returns 400/404 for gone ones (treated as an answer, not a failure).
- Roblox's CSS tokens aren't exposed; profile uses `foundation-web-*` classes. The ⋯ button sits inside a plain wrapper `div` inside a flex row: insert beside the wrapper, not inside.

## Motion system (read before touching animation)
- Tokens live at the top of `styles.css` (`--rf-ease`, `--rf-spring`, `--rf-dy/dx/pop/lift/press/drop`). Spatial travel is *always* a variable so `.rm` (reduced motion) can zero it and leave opacity fades. Never hardcode a translate/scale in a keyframe.
- JS helpers in `motion.tsx`: `usePresence` (exits), `useFlip` (collection changes; children need `data-k`), `useIndicator` (sliding thumb), `Collapse`, `flyGhost` (shared-element flight above everything).
- Entrance animations use `backwards` fill, exits `forwards`. A `both`/`forwards` fill on a transform animation keeps the element a containing block for `position:fixed` descendants (menus).
- Animate transform/opacity only. No persistent `will-change`. `content-visibility` is limited to `.rf-grid.big` (>150) because it was measured to help only there.
- Every JS animation must check the reduced-motion flag (`useReducedMotion`).

## Gotchas that already bit us
- **Preact 11 does not append `px` to numeric inline styles.** Use strings (`'8px'`).
- Window-level listeners see events from the shadow root retargeted to the host: use `e.composedPath()` for "is this inside X", and read the real target from `path[0]`.
- Keyboard handling is window-level in `Shell.tsx` (focus is often lost when a focused element unmounts). Menus/dialogs own Esc while open.
- `position:fixed` inside the sheet is relative to the nearest transformed ancestor; `Menu` measures a probe to find the real origin.
- Playwright: use `waitForSelector(..., { state: 'attached' })` for cards (they animate in); exits are animated so wait for the end state, not a fixed delay. `page.evaluate` counts as a user gesture, so test "no click" paths with an init-script timer.
- Don't defer focus with a bare `requestAnimationFrame`: frames can be held back (background/headless tabs) and focus never arrives. Use `afterFrame()` from `primitives.tsx` (frame or 50 ms). Layers use `useReturnFocus` so focus goes back to where it was.
- A service worker's own `chrome.runtime.sendMessage` doesn't reach its own listeners; tests drive RPC from an extension page.

- **A service worker's fetch() does not send SameSite=Lax cookies** (tested with a probe cookie): it is anonymous to Roblox. `roblox.ts#send` proxies requests through a registered roblox.com tab (`content/index.ts#proxyFetch`, host allowlist) and falls back to the worker. Never "fix" visibility problems by switching endpoints; outfit privacy is intentional and must not be bypassed.

## Trust boundaries
- **roblox.com page → extension**: content scripts only send `hello`/fetch-proxy replies; the worker answers RPC only if `trusted(sender)` (extension pages or `https://www.roblox.com` frames of this extension). The fetch proxy only forwards to the six API hosts, GET or the catalog POST.
- **rofit.site → extension**: `content/site.ts` accepts `rofit:ping` and `rofit:import` via `postMessage` (same window, exact origin), import only during user activation and at most every 1.5 s, payload ≤ 32 KB and parsed by `payloadFrom`. The worker's `site-import` listener re-checks the origin (top frame only) and the payload's form (`payloadFrom`) before opening `workspace.html#library/import/<payload>`, where the import dialog decodes and validates it fully; nothing is written until the user presses Import. The site can never read RoFit data.
- **Share links / backup files are hostile input**: `decodeShare` caps sizes (also after decompression), checks every field, accepts images only as `tr.rbxcdn.com` paths; `backup.ts` validates every entry and reports instead of throwing. Render untrusted text with `textContent`/JSX only.
- **Privacy**: a `restricted` access state hides cached copies (`service.ts#hidden`) until Roblox shows the list again; share links follow `sharePolicy` (public/owner allow, private block, otherwise ask).

## Fragile areas
`content/index.ts` selectors (`ul.profile-tabs`, `.profile-currently-wearing`, `.profile-content`, `.user-profile-header-info`, `button[class*=icon-button]`) — each has a fallback and failure just means no tab/row/button (popup still opens it). The Saved Outfits row waits up to `SETTLE_MS` for Currently Wearing, then prepends to `.profile-content`; a tab, if one renders, replaces the row. `sheet.tsx#navBottom` guesses the fixed Roblox header. 429 handling in `roblox.ts` (shared cooldown). Anything fetching more than one request per outfit: don't, indexing is deliberately user-triggered.

## Rules
- Read-only toward Roblox. No avatar writes, no cookie access, no telemetry, no remote code, no new hosts without updating README permissions table (and the site's download page table).
- Never show more than Roblox shows the viewer. The only credential-less request is the visibility check (`anonymousOutfitCount`), at most once per profile per 30 min, and it can be turned off.
- Provenance is part of the data model (`live|cached|last-known|unknown`). Never show `last-known` price in totals; never call an unresolved item "deleted".
- Add a permission only if a shipped feature needs it.

## Design intent
Native first: reuse Roblox's own tab/button classes in the profile chrome, inherit its font and sampled colors in the sheet. Flat surfaces, 8px radius, hairline dividers, accent only for selection/primary. Motion = transform/opacity, tied to interactions (sheet/dock slide, thumbnail→hero shared-element move, press scale); `rm` class + `prefers-reduced-motion` kill it. Progressive disclosure: item rows expand, sections collapse, advanced data behind Settings → Technical details. **Avoid generic generated-UI tells** (card spam, gradient heroes, glow, emoji icons, pill-everything, stat tiles with no purpose, AI-landing-page copy). Ask "why is this here" of every element.

## Storage
IndexedDB `rofit` v1 (stores listed in `db.ts`; bump `DB_VERSION` and branch in `onupgradeneeded` for migrations). Library entries embed their own details + asset records so they survive cache clears; `source` says where they came from (`profile`/`share`/`import`). Backup format `{app:'rofit-inspector', schema:2, …}` (schema 1 still imports; newer schemas are refused with a clear message). Settings schema `v:2` (`normalizeSettings` migrates 1.x motion values).
