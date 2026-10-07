# RoFit Inspector — notes for future Claude sessions

## What it is
MV3 extension. On another user's roblox.com profile it adds an **Outfits** tab and a hanger button; both open a workspace for that user's **real saved avatar outfits** (`outfitType=Avatar`, `isEditable:true`). Roblox presets (`isEditable:false`) are hidden by default and always labelled. Never present bundles, inventory, currently-wearing or favorites as saved outfits.

## Commands
```
npm run build        # dist/ (production, closed shadow root, minified)
node scripts/build.mjs --test   # dist-test/ (open shadow root, for Playwright)
npm run typecheck && npm test   # tsc + node --test (20 unit tests, node strips TS: no enums / parameter properties)
npm run test:e2e     # tests/e2e/run.mjs — real Chromium, live roblox.com, needs the --test build
node tests/e2e/stress.mjs   # 240 mocked outfits, 150% zoom, reduced motion, failing details
node tests/e2e/motion.mjs   # mid-flight frames of open/close/sort into shots/
npm run test:perf    # frame times while scrolling/sorting 300 outfits (cv|nocv arg)
npm run zip          # release/*.zip from dist/
```
`tests/e2e/flow.mjs tag=x [dark=1]` captures screenshots of every surface into `shots/` — use it for visual review. Look at the screenshots; don't trust the DOM alone.

## Architecture
- `src/background/` service worker. **Only** place that talks to Roblox (`roblox.ts`) and the only owner of IndexedDB (`db.ts`). `service.ts` = handlers (sync, thumbs, details+history, asset resolution+provenance, library, export/import). `index.ts` = message router, capability tracking in `storage.session`, daily prune alarm.
- `src/shared/` types, `rpc.ts` (typed request map used by both sides), `analysis.ts` (pure: hash, diff, price summary, clustering, Lua export — unit tested), `assetTypes.ts`, `settings.ts`.
- `src/content/index.ts` — the only code that knows Roblox's profile DOM. Tiny; lazy-imports `sheet.js` (declared in `web_accessible_resources`, `use_dynamic_url`). `sheet.tsx` mounts Preact in a closed shadow root outside React's tree.
- `src/ui/` Preact UI shared by the sheet, the library/settings page (`pages/workspace.tsx`) and the popup. `Shell.tsx` owns navigation state; `Explorer`, `Inspector`, `Compare`, `Library`, `Settings`, `Welcome`. One stylesheet (`styles.css`) driven by three variables (`--rf-bg/--rf-fg/--rf-accent`) sampled from the live page in `theme.ts`; every other color is `color-mix` of those.

## Roblox assumptions (verified Oct 2026; re-verify before relying)
- v2 outfit list is token-paginated, no total. v1's `total` is bogus (500).
- v3 details give hex `bodyColor3s`, `scale`, `playerAvatarType`, and assets with name/type (even for assets the catalog won't resolve).
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
- Playwright: use `waitForSelector(..., { state: 'attached' })` for cards (they animate in); exits are animated so wait for the end state, not a fixed delay.

- **A service worker's fetch() does not send SameSite=Lax cookies** (tested with a probe cookie): it is anonymous to Roblox. `roblox.ts#send` proxies requests through a registered roblox.com tab (`content/index.ts#proxyFetch`, host allowlist) and falls back to the worker. Never "fix" visibility problems by switching endpoints; outfit privacy is intentional and must not be bypassed.

## Fragile areas
`content/index.ts` selectors (`ul.profile-tabs`, `.user-profile-header-info`, `button[class*=icon-button]`) — each has a fallback and failure just means no tab/button (popup still opens it). `sheet.tsx#navBottom` guesses the fixed Roblox header. 429 handling in `roblox.ts` (shared cooldown). Anything fetching more than one request per outfit: don't, indexing is deliberately user-triggered.

## Rules
- Read-only toward Roblox. No avatar writes, no cookie access, no telemetry, no remote code, no new hosts without updating README permissions table.
- Provenance is part of the data model (`live|cached|last-known|unknown`). Never show `last-known` price in totals; never call an unresolved item "deleted".
- Add a permission only if a shipped feature needs it.

## Design intent
Native first: reuse Roblox's own tab/button classes in the profile chrome, inherit its font and sampled colors in the sheet. Flat surfaces, 8px radius, hairline dividers, accent only for selection/primary. Motion = transform/opacity, tied to interactions (sheet/dock slide, thumbnail→hero shared-element move, press scale); `rm` class + `prefers-reduced-motion` kill it. Progressive disclosure: item rows expand, sections collapse, advanced data behind Settings → Technical details. **Avoid generic generated-UI tells** (card spam, gradient heroes, glow, emoji icons, pill-everything, stat tiles with no purpose, AI-landing-page copy). Ask "why is this here" of every element.

## Storage
IndexedDB `rofit` v1 (stores listed in `db.ts`; bump `DB_VERSION` and branch in `onupgradeneeded` for migrations). Library entries embed their own details + asset records so they survive cache clears. Export format `{app:'rofit-inspector', schema:1, …}` is validated on import.
