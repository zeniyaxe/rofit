# RoFit Inspector

A Manifest V3 extension (Chrome, Edge, Brave) for exploring **the outfits a Roblox user has actually saved**: browse them on their profile, take them apart, compare them, keep the ones you like and share a snapshot of one.

Saved outfits are the whole point. RoFit does not substitute bundles, inventory, the currently-worn avatar or catalog favorites, and it never works around Roblox's outfit privacy.

Website: [rofit.site](https://rofit.site) (source in [`site/`](site/README.md)): interactive demos, download, docs, release notes, privacy policy and the share-link viewer.

## Install

**Windows:** double-click `setup.bat`. It installs dependencies, builds, and walks you through *Load unpacked*.

**By hand**

```bash
npm ci
npm run build          # → dist/
```

Then `chrome://extensions` → Developer mode → **Load unpacked** → pick `dist/`.

**Updating:** replace the folder's contents with the new build and press the reload icon on RoFit's card in `chrome://extensions`. Keep the same folder: Chrome ties an unpacked extension's data (library, settings) to where it was loaded from.

## Using it

Open any profile on roblox.com. RoFit adds one entry point that matches the page: a **Saved Outfits** row under *Currently Wearing* on Roblox's current profile layout, or an **Outfits** tab next to About and Creations on the older one. A hanger button also sits by the ⋯ menu. Nothing is fetched until you open it.

- **Browse**: grid or list in three sizes, arrow-key navigation, and a toolbar with **Search**, **Filters** and **Sort**. Search matches outfit names right away, and item and creator names once outfits have been read; it understands `"exact phrases"`, `-exclusions` and `#ids`. Filters cover avatar type, whether it's in your library, contents (accessories, layered or classic clothing, face & head, animations, gear), cost to recreate, *buyable new today* and *has limiteds*. Roblox presets are hidden unless you ask.
- **Inspect**: render, every item grouped by kind, what it costs to buy new today, what's off sale or limited, body colors (as a figure and as swatches) and scale, and what changed since you last looked.
- **Look inside** (optional, one click): reads each outfit's details once so search, filters and sorting can use contents and prices, reused items show up across outfits, and near-duplicate looks are spotted. Paced to stay under Roblox's rate limits; stop and resume any time.
- **Compare** two outfits (or an outfit against what you're wearing, if signed in): shared and unique items, similarity, body and cost differences, plus a **Slider** view that wipes between the two renders.
- **Library**: save outfits locally with collections, favorites, tags and notes; select several to move, tag or favorite them at once; rename or delete collections. **Backups** export everything as JSON; importing shows a dry-run report first (what's new, what's already in your library and whether to replace it, what's invalid and why).
- **Share** a snapshot of one outfit as a link (see below), or export an item manifest (JSON) or a Roblox Studio `HumanoidDescription` script.
- **Ownership** (signed in): "What do I own?" marks items, totals what's missing, copies or opens only the missing ones.
- **Command palette**: `Ctrl K` / `⌘ K` jumps to an outfit, a library entry, a recent profile or any action. `?` lists every shortcut; `/` focuses search; `Esc` backs out one layer at a time.
- **Toolbar popup**: search by username, user ID or a saved outfit's name, reopen recently viewed profiles, or open RoFit on the profile you're looking at.

`docs/screenshots/` has screenshots of 1.x on real roblox.com pages; `node tests/e2e/flow.mjs tag=<name>` captures the current UI into `shots/`.

## Who can see these outfits

Since November 2025, Roblox lets owners limit who sees their saved outfits. RoFit shows a small badge with what it knows, and the evidence behind it:

| Badge | Meaning |
|---|---|
| **Public** | Roblox shows the list to people who aren't signed in. RoFit checks once per profile per half hour by asking without your session (Settings → Privacy can turn that check off). |
| **Visible to you** | Roblox shows it to your account but not to signed-out visitors (for example, you're friends). |
| **Your outfits** | You're signed in as this account. |
| **Private** | Roblox refused. Copies RoFit cached on earlier visits stay hidden too, until Roblox shows the list again. |
| **Saved earlier** / **Visibility unknown** | Roblox couldn't be reached, or there wasn't enough to tell. RoFit never guesses "public". |

The research behind this (what each endpoint returns, signed in and out) is in [docs/research/outfit-access.md](docs/research/outfit-access.md).

## Share links

**Share** in the inspector packs a snapshot of the outfit into a link like `https://rofit.site/o/#1.…`: its name, owner, items (names, types, pictures), body colors, scale and avatar type, as of now. No prices, notes, tags or anything about you. The snapshot lives in the URL fragment, which browsers never send to a server, so rofit.site stores and sees nothing.

What you may share follows the badge: **Public** and **Your outfits** share directly, **Visible to you** and **unknown** ask you to confirm you're allowed to, and **Private** can't be shared at all. Anyone can open the link on rofit.site; with RoFit installed, **Save to RoFit** opens RoFit's import screen (you confirm there), or paste the link into **Library → Import**. Links are validated on both sides (size limits, field types, images only from Roblox's CDN).

## Motion

Opening an outfit flies its image from the card into the inspector and back; sorting, filtering and resizing glide instead of snapping; menus, dialogs and panels animate out as well as in. **Settings → Motion** offers **System** (the default: Calm if your OS asks for reduced motion, Full otherwise), **Full**, **Balanced** (shorter moves, no flights) and **Calm** (fades only, no travel or springs). A choice made in RoFit wins over the OS setting.

## What is and isn't "a saved outfit"

Roblox's outfit list mixes things. RoFit asks for `outfitType=Avatar` (full-avatar outfits; head and shoe sets are excluded) and then separates `isEditable: true`, which are the user's own saves, from `isEditable: false`, which are Roblox-supplied presets (Robloxian 2.0, Action Figure…). Presets are hidden by default and labelled when shown. `/v1/users/{id}/outfits` reports a misleading `total` (500 for everyone), so it's only a fallback.

## When a profile shows no outfits

An empty list can mean "none" or "hidden from you", and Roblox gives the same answer for both. RoFit tells you what it observed instead of guessing: Roblox's refusal text (if any), whether Roblox saw you as signed in, whether only presets exist, and offers *Check again* / *Sign in*. If you're signed out of Roblox in this browser, friends-only outfits stay hidden.

RoFit's Roblox requests run inside an open roblox.com tab so they carry your session (a background worker's requests don't carry SameSite=Lax cookies and would look signed out). The tab only forwards requests to RoFit's six read-only API hosts, and only for RoFit's own background worker. The one deliberate exception is the visibility check, which is sent without your session on purpose.

## Data honesty

Every item carries provenance: `live` (Roblox just answered), `cached` (answered recently, not re-asked), `last-known` (Roblox no longer returns it; RoFit shows what it saw earlier and says when), `unknown` (Roblox returns nothing and RoFit never saw it, so only the name and type from the outfit itself are shown). Historical prices are never used in totals. Items Roblox won't resolve are labelled *No data* or *Unavailable*, not "deleted", because Roblox doesn't say which.

Totals keep **buy-now** and **resale** separate and count unknown prices instead of guessing. A card shows `R$ 120+` when some prices are missing, and never `R$ 0+`.

## Permissions

| Permission | Why |
|---|---|
| `storage` | settings |
| `alarms` | daily cache pruning |
| `activeTab` | the toolbar popup reads the current tab's URL to offer "Open this profile's outfits" |
| host: `avatar`, `thumbnails`, `catalog`, `economy`, `inventory`, `users` `.roblox.com` | the read-only APIs below |
| content script on `https://www.roblox.com/*` | adds the entry points on profiles; forwards RoFit's API requests with your session |
| content script on `https://rofit.site/*` | lets the website see that RoFit is installed and hand it a share link to import (after a click; you confirm in RoFit) |

No remote code, no `eval`, no analytics, no other hosts. RoFit never reads or exposes cookies; Roblox API calls use the browser's own session (`credentials: include`) so ownership checks work when you're signed in.

## Roblox endpoints used (all read-only)

| Capability | Endpoint |
|---|---|
| Outfit list | `GET avatar.roblox.com/v2/avatar/users/{id}/outfits?outfitType=Avatar&itemsPerPage=50&paginationToken=` (fallback `v1/users/{id}/outfits`) |
| Visibility check | the same v2 list request, once, without credentials |
| Outfit details | `GET avatar.roblox.com/v3/outfits/{id}/details` (fallback `v4`) |
| Outfit / item thumbnails | `GET thumbnails.roblox.com/v1/users/outfits`, `/v1/assets` |
| Item data (price, limited, off-sale, creator) | `POST catalog.roblox.com/v1/catalog/items/details` (a read; Roblox requires a CSRF token on POST) |
| Item data fallback | `GET economy.roblox.com/v2/assets/{id}/details` |
| Resale average | `GET economy.roblox.com/v1/assets/{id}/resale-data` |
| Ownership | `GET users.roblox.com/v1/users/authenticated`, `GET inventory.roblox.com/v1/users/{me}/items/Asset/{id}/is-owned` |
| Finding a user (popup, palette) | `POST users.roblox.com/v1/usernames/users`, `GET users.roblox.com/v1/users/{id}` |
| My avatar (compare) | `GET avatar.roblox.com/v1/avatar` |

## Storage

IndexedDB `rofit` (owned by the service worker, unreachable from the Roblox page): `users`, `outfits`, `details`, `assets`, `snapshots`, `library`, `thumbs`. Settings are in `chrome.storage.local`. The library is self-contained (it embeds the item data as saved), so clearing the cache never damages it. Everything can be exported or erased in Settings.

## Limits imposed by Roblox

- RoFit shows what Roblox shows *you*. Outfits an owner keeps private stay private.
- Roblox returns no list total, no outfit creation date and no edit history. History in RoFit is what *RoFit* observed on *this* computer.
- Deleted/moderated items usually vanish from every API; RoFit can only show what it saw earlier.
- Outfit thumbnails are rendered images, not interactive 3D.
- Aggressive loading gets rate-limited (HTTP 429). RoFit caps concurrency, backs off, and says so.

## Not built (on purpose)

**Wearing/equipping** an outfit (needs CSRF'd account writes; a misclick could change someone's avatar; not worth the risk for the core goal). **Price watching/notifications** (needs background polling). **Interactive 3D** (no supported public API). **A server for share links** (the fragment design means there's nothing to host, log or leak).

## Development

```bash
npm run watch          # rebuild on change
npm run typecheck
npm test               # unit tests: analysis, search, share links, access, settings, backups, IndexedDB, API adapter, site markdown
node scripts/build.mjs --test && npm run test:e2e   # real Chromium + live roblox.com
node tests/e2e/site.mjs                             # rofit.site pages, CSP, viewer, extension bridge
npm run zip            # release/rofit-inspector-<v>.zip
```

The e2e build (`dist-test/`) differs from production only in that the sheet's shadow root is open so Playwright can query it. Set `ROFIT_CHROME` to use a system Chromium. See [CLAUDE.md](CLAUDE.md) for architecture and where things live, and [CHANGELOG.md](CHANGELOG.md) for what changed.

## Third-party

Preact (MIT) and Lucide icons (ISC), bundled; licenses in `licenses/`. Build/test tooling is dev-only. RoFit is not affiliated with or endorsed by Roblox Corporation.
