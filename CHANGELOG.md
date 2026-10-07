# Changelog

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
