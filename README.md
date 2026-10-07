# RoFit Inspector

A Manifest V3 extension (Chrome, Edge, Brave) for exploring **the outfits another Roblox user has actually saved**: browse them on their profile, take them apart, compare them, and keep the ones you like.

Saved outfits are the whole point. RoFit does not substitute bundles, inventory, the currently-worn avatar or catalog favorites.

## Install

**Windows:** double-click `setup.bat`. It installs dependencies, builds, and walks you through *Load unpacked*.

**By hand**

```bash
npm ci
npm run build          # → dist/
```

Then `chrome://extensions` → Developer mode → **Load unpacked** → pick `dist/`. A prebuilt copy is in `release/rofit-inspector-<version>.zip` (unzip, then Load unpacked on the folder).

## Using it

Open any profile on roblox.com. **Outfits** appears next to About and Creations (and a hanger button sits by the ⋯ menu). It opens a workspace under Roblox's top bar:

- **Browse**: grid or list, three sizes, search, sort, arrow-key navigation. `/` focuses search, `Space`/shift-click selects, `Esc` backs out one layer at a time.
- **Inspect**: render, every item grouped by kind, what it costs to buy new today, what's off sale or limited, body colors and scale, and what changed since you last looked.
- **Look inside** (optional, one click): loads each outfit's details once so you can search by item, see reused items across outfits, and spot near-duplicate looks. Paced to stay under Roblox's rate limits.
- **Compare** two outfits (or an outfit against what you're wearing, if signed in): shared and unique items, similarity, body and cost differences, plus a **Slider** view that wipes between the two renders.
- **Save** to a local library grouped by collection, with tags, notes and a strip of each outfit's items; export/import as JSON.
- **Export** an item manifest (JSON) or a Roblox Studio `HumanoidDescription` script.
- **Ownership** (signed in): "What do I own?" marks items, totals what's missing, copies or opens only the missing ones.

Screenshots from real roblox.com pages are in `docs/screenshots/`.

Share a link to one outfit with *More → Copy link* (`…/profile#rofit/<outfitId>`); anyone with RoFit lands on it.

## Motion

Opening an outfit flies its image from the card into the inspector, and back on close; sorting, filtering and resizing glide instead of snapping; menus, dialogs and panels animate out as well as in; known data shows instantly while Roblox is asked again in the background. **Settings → Motion → Calm** keeps the fades but removes all travel and springs (your OS reduced-motion setting always applies).

## What is and isn't "a saved outfit"

Roblox's outfit list mixes things. RoFit asks for `outfitType=Avatar` (full-avatar outfits; head and shoe sets are excluded) and then separates `isEditable: true`, which are the user's own saves, from `isEditable: false`, which are Roblox-supplied presets (Robloxian 2.0, Action Figure…). Presets are hidden by default and labelled when shown. `/v1/users/{id}/outfits` reports a misleading `total` (500 for everyone), so it's only a fallback.

## When a profile shows no outfits

Roblox added outfit privacy in Nov 2025: owners can limit who sees their saved outfits, and an empty list can mean either "none" or "hidden from you". RoFit never works around that. It tells you what it observed instead: Roblox's refusal text (if any), whether Roblox saw you as signed in, whether only presets exist, and offers "Check again" / "Sign in". If you're signed out of Roblox in this browser, friends-only outfits stay hidden.

RoFit's Roblox requests run inside an open roblox.com tab so they carry your session (a background worker's requests don't carry SameSite=Lax cookies and would look signed out). The tab only forwards requests to RoFit's six read-only API hosts, and only for RoFit's own background worker.

## Data honesty

Every item carries provenance: `live` (Roblox just answered), `cached` (answered recently, not re-asked), `last-known` (Roblox no longer returns it; RoFit shows what it saw earlier and says when), `unknown` (Roblox returns nothing and RoFit never saw it, so only the name and type from the outfit itself are shown). Historical prices are never used in totals. Items Roblox won't resolve are labelled *No data* or *Unavailable*, not "deleted", because Roblox doesn't say which.

Totals keep **buy-now** and **resale** separate and count unknown prices instead of guessing.

## Permissions

| Permission | Why |
|---|---|
| `storage` | settings |
| `alarms` | daily cache pruning |
| `activeTab` | the toolbar popup reads the current tab's URL to offer "Open this profile's outfits" |
| host: `avatar`, `thumbnails`, `catalog`, `economy`, `inventory`, `users` `.roblox.com` | the read-only APIs below |
| content script on `https://www.roblox.com/*` | adds the tab/button on profiles |

No remote code, no `eval`, no analytics, no other hosts. RoFit never reads or exposes cookies; Roblox API calls use the browser's own session (`credentials: include`) so ownership checks work when you're signed in.

## Roblox endpoints used (all read-only)

| Capability | Endpoint |
|---|---|
| Outfit list | `GET avatar.roblox.com/v2/avatar/users/{id}/outfits?outfitType=Avatar&itemsPerPage=50&paginationToken=` (fallback `v1/users/{id}/outfits`) |
| Outfit details | `GET avatar.roblox.com/v3/outfits/{id}/details` |
| Outfit / item thumbnails | `GET thumbnails.roblox.com/v1/users/outfits`, `/v1/assets` |
| Item data (price, limited, off-sale, creator) | `POST catalog.roblox.com/v1/catalog/items/details` (a read; Roblox requires a CSRF token on POST) |
| Item data fallback | `GET economy.roblox.com/v2/assets/{id}/details` |
| Resale average | `GET economy.roblox.com/v1/assets/{id}/resale-data` |
| Ownership | `GET users.roblox.com/v1/users/authenticated`, `GET inventory.roblox.com/v1/users/{me}/items/Asset/{id}/is-owned` |
| My avatar (compare) | `GET avatar.roblox.com/v1/avatar` |

## Storage

IndexedDB `rofit` (owned by the service worker, unreachable from the Roblox page): `users`, `outfits`, `details`, `assets`, `snapshots`, `library`, `thumbs`. Settings are in `chrome.storage.local`. The library is self-contained (it embeds the item data as saved), so clearing the cache never damages it. Everything can be exported or erased in Settings.

## Limits imposed by Roblox

- Saved outfits are public per Roblox; RoFit doesn't try to reach anything else.
- Roblox returns no list total, no outfit creation date and no edit history. History in RoFit is what *RoFit* observed on *this* computer.
- Deleted/moderated items usually vanish from every API; RoFit can only show what it saw earlier.
- Outfit thumbnails are rendered images, not interactive 3D.
- Aggressive loading gets rate-limited (HTTP 429). RoFit caps concurrency, backs off, and says so.

## Not built (on purpose)

**Wearing/equipping** an outfit (needs CSRF'd account writes; a misclick could change someone's avatar; not worth the risk for the core goal). **Price watching/notifications** (needs background polling). **Interactive 3D** (no supported public API). The data model leaves room for all three.

## Development

```bash
npm run watch          # rebuild on change
npm run typecheck
npm test               # unit tests (analysis, IndexedDB, API adapter, provenance, history, stale-while-revalidate)
node scripts/build.mjs --test && npm run test:e2e   # real Chromium + live roblox.com
npm run zip            # release/rofit-inspector-<v>.zip
```

The e2e build (`dist-test/`) differs from production only in that the sheet's shadow root is open so Playwright can query it. See [CLAUDE.md](CLAUDE.md) for architecture and where things live.

## Third-party

Preact (MIT) and Lucide icons (ISC), bundled; licenses in `licenses/`. Build/test tooling is dev-only.
