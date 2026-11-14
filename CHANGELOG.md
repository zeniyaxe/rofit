# Changelog

## 3.0.0 — RoFit 3.0: get the look
**rofit.site, redesigned** (`site/`, design system in `site/DESIGN.md`)
- A new identity replaces the blue fitting room: coated white stock, ink black and one fluoro-pink spot printed as whole fields; Anybody (variable width) for mastheads and cover lines, Onest for reading.
- The homepage opens on a **cover**: a real saved outfit called out piece by piece with leader lines (name, kind, creator, and Roblox’s own price or an honest *Off sale* / *Unknown*), its real outfit ID as a collector number, and a switcher through five real looks (buttons, arrow keys, swipe). Then a **wardrobe** of collector cards for five public profiles (each card opens that profile in the live demo), **Face to face** (a wipe between two real outfits and a shared / only-in ledger with on-sale totals), **Take it with you** (the share card PNG drawn by the extension’s own renderer, fragment-only links), **Some wardrobes stay shut** (the visibility labels, read from the extension’s source), the live demo (now follows the site’s theme and lets you pick the profile), the manifest-generated privacy proof, and an install close.
- **Fixed: the site showed made-up prices.** The old scroll scenes and the demo’s share card filled in “illustrative” prices for items that aren’t for sale. Every price now comes from the dated snapshot, and `example-price.ts` is gone.
- The sticky scroll scenes, which held the page still while you scrolled, are gone (desktop homepage 13,186 → 10,013 px tall; on a phone it is about the same length as before). Motion is reveals, the cover’s re-dealt looks, card deals and the compare wipe; all of it retargets when interrupted, Calm keeps fades only, Off removes it.
- **Install page** rebuilt: honest store status, one download, four steps with a copy button, the permissions table generated from the manifest, the keep-the-same-folder warning, and an FAQ for updating, removing and trouble.
- **Features** rebuilt with real outfits (the old page used an invented profile and invented prices). Docs, guides, changelog, legal pages, the share viewer and 404 moved onto the same system; tables of contents sit on the left everywhere.
- Navigation: a sliding current-page indicator (transform only), and a full-screen menu on phones that keeps focus inside and closes with Esc. Fixed: nav links were nearly invisible over the old hero.
- Fixed: the share viewer’s manual-import help stayed visible when RoFit was installed (a style overrode `hidden`).
- New OG image and icons. New test: `npm --prefix site run test:ui` (cover switcher, tabs, menu focus trap, wipe, no sideways scroll at 320–1920 px on seven pages, Calm motion).

**Extension**
- **Wardrobe overview.** With no outfit open, the side panel is no longer empty: it sums up what RoFit already knows about the profile (count, presets hidden, R6/R15, the dearest known look, how many can be bought new, the most-worn pieces). It makes no requests, and shows nothing for private lists. Click an item to filter to the outfits that wear it.
- **Honest costs everywhere.** One rule for cards, the inspector and compare: exact totals print plainly; totals with unknown prices read “R$ 854+” with a dashed underline and say what wasn’t counted; differences are stated only when both totals are exact. The inspector’s cost block shows new, resale and free separately.
- **Fixed: renders stuck on “Rendering…”.** The worker cached Roblox’s “pending” answer for 20 s while the UI retried every 2.5 s, so no retry reached Roblox. Pending is now cached for 2 s, retries back off (bounded), and while a big render is being made the inspector and compare show the small one the grid already has. A render that never arrives says so instead of spinning.
- **Collector number.** The inspector header shows the outfit’s real ID as “No. …”; click to copy it.
- **Compare:** one colour per side throughout, labelled only-left / shared / only-right counts, switching cost per side, body-colour hex codes only with Technical details, icon-only actions on narrow sheets. Fixed: the “What I’m wearing” render never appeared.
- **Keyboard:** the explorer grid is one tab stop (arrow keys move inside it), so Tab reaches the inspector without walking every card. Menus stay attached to their button while it moves.
- **RoFit’s own pages** (popup, welcome, library, settings) carry the new pink mark; inside roblox.com RoFit keeps Roblox’s own colours. The popup no longer shows a horizontal scrollbar when its content is tall, and only flags status when something is wrong.
- Secondary text contrast raised to at least 4.5:1 on tinted surfaces.
- Tests: wardrobe overview and cost rules (55 unit tests); the e2e suites were updated for the 2.x UI they had drifted from (welcome, popup, motion, skeleton cards).

## 2.0.0 — visibility, search, library 2.0, rofit.site
**Visibility you can trust** (research: `docs/research/outfit-access.md`)
- Every outfit list gets a label: **Your outfits**, **Public**, **Visible to you**, **Saved earlier**, **Private**, **Unavailable** or **Visibility unknown**. To tell Public from Visible to you, RoFit asks for the first page once more without your session (Settings → Privacy, on by default).
- When Roblox won't show a list to you, RoFit now also hides copies it cached on earlier visits. Your own library entries stay yours.
- Share links need your OK for anything RoFit can't confirm is public, and can't be made for a private list.

**Explorer**
- New search: forgiving of typos, with `"phrases"`, `-exclusions` and `#IDs`, ranked by match quality. After outfits are read it also searches items, item types and creators, and shows why each result matched.
- **Read every outfit** can look up item prices in batches of 100, unlocking price filters, cost on cards, and sorting by most expensive or cheapest. Optional: read automatically when a profile opens.
- Filters panel: avatar type, item kinds, price range (only claims a bucket the known prices prove), buyable new, limiteds, in your library. Active filters show as removable chips.
- Select all, and save a selection to a collection in one go.
- The refresh button moved next to “Updated …”, so the toolbar no longer wraps.
- Card prices never show “R$ 0+”: a total with unknown parts is a lower bound, and an all-off-sale outfit says “Off sale”.

**Command palette and shortcuts**
- `Ctrl K` / `⌘ K`: jump to an outfit, a saved look, a recent profile, any username or user ID on Roblox, or an action. `?` lists every shortcut; `J`/`K` step through outfits while one is open.

**Inspector**
- Similar outfits from the profile (once read) and your library.
- **Share a snapshot link** (`https://rofit.site/o/#…`): the outfit travels in the link's fragment, which never reaches a server.
- History is described as what it is: changes RoFit observed on this computer (now including scale and avatar type), never Roblox's edit history. Visits where nothing changed add nothing.
- Item thumbnails now load for items whose data was first cached by a price lookup.

**Library 2.0**
- Favorites, collection management (rename, delete, with or without their outfits), bulk favorite / move / tag / export / remove, filter by person, tag and favorites, sort by cost.
- Import backups, item manifests and share links with a dry-run report (new, already saved, unreadable) before anything is written; optional replace. Export all or just the selection.
- Entries opened from share links are marked **Shared**.

**Profiles, popup, settings**
- Roblox's newer profile layout has no tab list; RoFit adds a **Saved Outfits** row under Currently Wearing there (nothing is fetched until you click). If Roblox leaves Currently Wearing out, the row still appears at the top of the profile and moves under Currently Wearing if it shows up later.
- Toolbar popup: one search box for usernames, user IDs, profile links and your library; recent profiles (including ones Roblox failed to load); clear errors for unknown, banned and unreachable accounts.
- Settings are grouped (Appearance, Motion, Explorer, Profiles, Library & data, Privacy, Diagnostics, Shortcuts, About) with search and deep links (`workspace.html#settings/motion`).
- Motion is now **System / Full / Balanced / Calm** with a live preview. 1.x settings migrate without changing anyone's motion (`full` → System, `reduced` → Calm).
- Workspace routes: `#library`, `#library/import/<link>`, `#library/open/<user:outfit>`, `#settings[/section]`, `#welcome`.

**rofit.site** (new, `site/`)
- Companion website: home, features, download (detects the installed version), docs, changelog, privacy policy and the share-link viewer. Static, no cookies, no analytics, strict CSP; images only from Roblox's CDN.
- The extension talks to the site through a narrow bridge (`src/content/site.ts`): the site can learn that RoFit is installed and, after a click, ask it to open its import screen for one share link. Nothing is saved until you confirm in RoFit.

**Reliability and security**
- Fixed: outfit links (`…/profile#rofit/<id>`) didn't open on Roblox's current profile page, which rewrites the fragment when it loads (`#!#rofit%2F…`). Both spellings work now, and RoFit leaves fragments it didn't write alone.
- Fixed: focus didn't always move into the sheet, dialogs and menus when they opened, so `Esc` and `Tab` could miss them. Focus now moves in reliably and returns to where it was when a dialog or the palette closes; `Esc` closes the topmost dialog even if focus wandered outside it.
- Requests time out after 20 s instead of hanging; a frozen Roblox tab no longer stalls everything. Offline gets its own message.
- Outfit details fall back from `v3` to `v4` when Roblox misbehaves (`v3` is deprecated).
- The service worker only answers RoFit's own pages and the roblox.com content script; the rofit.site bridge can send exactly one kind of message, which is validated again in the worker.
- The website's changelog renderer only links to `https:` URLs, site paths and anchors (`//host` and `/\host` don't count as site paths).
- New tests: search ranking, share-link encoding and hostile payloads, deep-link parsing, access states and hiding cached copies after a refusal, settings migration, backup validation, v3/v4 details, thumbnail caching, bulk library edits, price labels, website pages and CSP, changelog escaping, viewer XSS cases, and the bridge end to end. The live-site regression suite covers the new toolbar, filters, palette, shortcuts, visibility badge, share link round trip and import.

## 1.5.0 — Local build · private profiles, tighter proxy, smaller pages
- **Private outfits no longer a dead end.** When Roblox hides someone's saved outfits (often because their inventory is private, which Roblox ties together), RoFit now also shows **what they're wearing right now**: a render and every item with price and creator, clearly labelled "not a saved outfit". That is public on every profile, so nothing is bypassed. Saved outfits still only appear when Roblox returns them.
- **Clearer wording** on the "why no outfits" screen about inventory privacy.
- **Safer request proxy:** the roblox.com tab now forwards only the exact endpoints RoFit uses (plus the catalog batch lookup), not everything on those six hosts.
- **Donate** (popup and settings) opens the project's Roblox store page; the popup footer links got icons.
- Slightly smaller bundles (stylesheet is minified once).

## 1.4.0 — Local build · welcome, what's new, official site
- **Welcome page redone:** staggered title, a self-playing demo of the product (tab appears, gets clicked, outfits load, one opens), links to rofit.site and GitHub. Calm mode shows the finished state.
- **What's new tab** after real updates (new major.minor), opened in the background; patch updates only light the toolbar badge, which the popup clears. Settings → About → Replay welcome.
- **Official site** (rofit.site) in the popup, About, welcome and manifest.
- Popup: Settings, Official site, Library, Star/Donate, Report a problem, GitHub.
- Settings panel inside roblox.com/my/account now lays out in the page (no overlay), grows with its content and stays short; storage and diagnostics stay on RoFit's own page.

## 1.3.0 — Local build · popup, native settings, outfit cards
- **Toolbar popup redone:** big RoFit wordmark, an "Open outfits" action when you're on a profile, **Extension Settings**, **Star on GitHub** (or **Donate**, see `src/shared/links.ts`), Library and GitHub icons.
- **Settings now live inside Roblox's own account settings** (roblox.com/my/account): a "RoFit settings" entry in its left list opens a compact, native-styled panel. The entry is found by its neighbours' labels, not class names, and #!/rofit falls back to RoFit's own settings page if Roblox's list can't be found. Also available as Settings in the popup.
- **New settings:** default order, read outfits automatically (bounded), keyboard shortcuts on/off, and an About section (GitHub, report a problem, optional Donate).
- **Shareable outfit card:** Inspector → More → Save as image / Copy image. A 1200×675 PNG with the render, items, prices and total, drawn locally on a canvas.

## 1.2.0 — privacy clarity, signed-in requests, popup
- **Why no outfits?** New explanation screen with the actual evidence: Roblox's own refusal text, whether it saw a signed-in viewer, presets-only, empty-vs-private. Roblox introduced outfit privacy in Nov 2025; RoFit shows what Roblox returns to you and never works around it (no fallback to older endpoints on a 403).
- **Fixed: requests were anonymous.** A service worker's fetch drops SameSite=Lax cookies (verified), so Roblox saw RoFit as signed out; friends-only outfits and ownership checks could silently fail. Requests now run inside an open roblox.com tab (same-site, carries your session) and fall back to the worker. Settings → Diagnostics says which path was used.
- Roblox's error text is preserved; "user does not exist" (HTTP 400) is a not-found, not a malformed request.
- An empty or presets-only list is never served from cache as fresh.
- Banner when a refresh fails but a saved copy is shown.
- **Toolbar popup redesigned:** one primary action for the current profile, recently viewed profiles, Library. Removed the toggle and cache stats.
- `#rofit` in a profile URL opens the Outfits workspace.

## 1.1.0 — motion and polish pass
**Fixed (found by testing the real thing)**
- Menus were rendering at the wrong place, and choosing an item did nothing in the on-profile sheet (Preact 11 doesn't add `px` to numeric styles; the outside-click handler saw the shadow host as the target). Sort, filters, More, Compare and Library menus all work now.
- Spinners and a few skeleton blocks had no size for the same reason.
- Keyboard shortcuts (Esc, /, S, C) died whenever the focused element was removed. They are now window-level while the sheet is open.
- Compare header laid out A | B | similarity instead of A | similarity | B.

**Motion system** (`src/ui/motion.tsx`, tokens at the top of `styles.css`)
- Real exits: sheet, inspector panel, menus, dialogs and toasts all animate out.
- Shared element: the card's image flies into the inspector hero and flies back to its card on close (ghost layer, so it isn't clipped by scroll containers).
- Sort, filter, search, layout and size changes glide (FLIP) instead of snapping; new items scale in; first load staggers in.
- Sliding indicators on segmented controls and the Outfits/Library tabs; height-animated disclosure for sections and item details; spring on switches, selection ticks, toasts and the save bookmark.
- Stale-while-revalidate for outfit details and item data: a saved copy shows instantly, a thin refresh line runs while Roblox is asked again.
- Narrow layouts: the inspector slides over the explorer, so the grid keeps its scroll position.
- Reduced motion is designed, not disabled: same timing, no travel/springs/fly-between, fades remain. Settings → Motion → Calm; the OS setting always applies.

**Product**
- Compare: Slider view wipes between two renders; body figures side by side.
- Library: grouped by collection, each card shows a strip of its items.
- Theme: surfaces now use Roblox's own blue-tinted neutrals sampled from the page (measured against Roblox's real dark theme).

**Engineering**
- `content-visibility` only for lists over 150 (measured at 300 outfits: p99 frame 20.7ms vs 27.7ms, worst frame 21ms vs 49ms). Removed the persistent `will-change`.
- Content script no longer polls the URL when the Navigation API exists.
- Minimum Chrome raised to 113 (CSS `linear()` easing).
- New tests: menu geometry and selection, profile button placement across 3 profiles × 4 widths, stress (240 outfits, 150% zoom, reduced motion), perf script, stale-while-revalidate unit test.

## 1.0.0
- Outfits tab and hanger button on every roblox.com profile, native-styled, survive Roblox re-renders and SPA navigation.
- Explorer for saved outfits (grid/list, 3 sizes, search, sort, keyboard), Roblox presets separated and hidden by default.
- Inspector: items by kind, cost to recreate (buy-now and resale kept apart), ownership check, body colors and scale, change detection and local history.
- Optional indexing: search by item, reused items, near-duplicate looks.
- Compare two outfits or an outfit against what you're wearing.
- Local library with collections, tags, notes, JSON export/import; Studio Lua and manifest export.
- Provenance on all item data (live / cached / last known / unknown); deleted items never shown as live.
- Settings with search, diagnostics per Roblox capability, data controls; onboarding; toolbar popup.
