# Competitive landscape — outfit and avatar tooling for Roblox

*Checked **2026-11-04** against each product's own public pages. A feature is listed only if the product's page names it. "—" means its public pages don't mention it, not that it's impossible.*

## Products

| Product | Type | Sources |
|---|---|---|
| **RoPro** | Browser extension (free + paid tiers) | ropro.io, ropro.io/features |
| **RoGold** | Browser extension, desktop app, iOS Safari extension, Studio plugin (free + Ultimate) | rogold.live/features, docs.rogold.live/features |
| **BTRoblox** | Browser extension (free, open source) | github.com/AntiBoomz/BTRoblox, addons.mozilla.org/firefox/addon/btroblox |
| **Catalog Avatar Creator** | Roblox experience (in-game avatar editor) | rolimons.com/game/7041939546 (description quoted from the experience) |
| **"Outfit viewer" experiences** | Roblox experiences that showed any user's outfits | DevForum *Better privacy for user outfits* (devforum.roblox.com/t/1823630) |

## Feature matrix

| Capability | RoFit 2.0 | RoPro | RoGold | BTRoblox | Catalog Avatar Creator |
|---|---|---|---|---|---|
| Browse **another user's saved outfits** from their profile | **Yes**, with access states | — | — | — | — |
| Inspect an outfit's items, body colors and scales | **Yes** | — | Avatar properties inspector (own avatar) | Item previewer and explorer | Try-on in experience |
| Cost breakdown (buy now vs resale, unknown counted separately) | **Yes** | Account value on profiles (limited value, via Rolimons) | Value history | — | In-experience purchases |
| Compare two outfits, or an outfit with your avatar | **Yes** (side-by-side + slider) | — | — | — | — |
| Personal library of outfits (tags, notes, collections) | **Yes**, local only | Saves *sandbox* outfits | Outfits panel for **own** outfits (All / My Created / Purchased) | — | Saves avatars created in experience |
| Community or shared outfits | **Opt-in share links** (snapshot, no server) | — | Community Outfits: "Publish, favourite, and browse outfits shared by other RoGold users" | — | "50M+ Community Created outfits" |
| Avatar sandbox or editor | — (RoFit is an inspector) | "Build any avatar in the Sandbox" | Remade avatar editor, sandbox, accessory adjustments | — | Core feature |
| Item search filters | Outfit search: fuzzy, item names and IDs, price and status filters | Quick item search (acronym or partial name) | Item search filters (category, price range, off-sale) | — | In experience |
| Respects outfit privacy | **Yes**, and explains why something is visible | Not stated | Not stated | Not stated | Not stated |
| Account or backend required | **No** (everything stays in the browser) | Account for paid tiers | Account for Ultimate | No | Roblox account (in experience) |

## What we take from this

1. **Nobody else does profile-scoped outfit browsing.** The tools that did ("outfit viewer" games, S1 in `outfit-access.md`) are exactly what Roblox's privacy change was aimed at. RoFit can only be in this space if it stays **viewer-scoped and transparent**, so the access-state model is a requirement, not decoration.
2. **Community outfits only work when people opt in.** RoGold's "Publish" model is the precedent. RoFit's share links are the serverless version: a snapshot the sharer chose to make, rendered by rofit.site from the URL fragment, with nothing stored on our side.
3. **Cost awareness is a big deal for the RoPro and RoGold audience** (value on profiles, value history). RoFit 2.0 indexes prices for the outfits a profile shows, so the Explorer can filter and sort by price. Buy-now cost and resale stay separate, because limited items have no catalog price.
4. **RoPro's quick item search and RoGold's filters set the bar for keyboard speed.** RoFit 2.0 adds a command palette (Ctrl/Cmd K), fuzzy search, ID tokens and filter chips.
5. **Don't build an avatar editor.** RoPro, RoGold and Catalog Avatar Creator already compete there, and a viewer that edits would blur the read-only promise in `CLAUDE.md`. RoFit hands off to Roblox instead: open the item, copy IDs, or export Studio Lua.
