# Outfit access on Roblox — what can legitimately be shown, to whom

*Research for RoFit 2.0. Last verified **2026-11-04**. Everything below is either quoted from a cited source or was observed directly against the live API on that date (marked **Observed**). Anything we could not verify is marked **Unverified** and RoFit does not depend on it.*

## Summary

- Since **2025-11-12** Roblox applies a user's **inventory visibility** setting to their saved outfits ("Characters"). The outfit list an API caller gets back therefore depends on *who is asking*: the owner, someone the owner allows (for example friends), or everyone.
- RoFit runs in the viewer's own browser and asks Roblox **as the signed-in viewer**. It can only show what Roblox would already show that person. It never uses another account, a proxy, a cache shared between users, or any other way around the owner's setting.
- RoFit can find out *why* it can see a list by repeating the first page request **without** the session. If an anonymous request sees the same outfits, they're **Public**. If only the signed-in request sees them, they're visible **because of the viewer's account** (for example friendship), and RoFit says so and warns before sharing.
- Nothing documented lets a third-party website read Roblox outfit data in the browser (no CORS for other origins, **Observed**). Inside a Roblox experience, `AvatarEditorService:GetOutfitsAsync` returns **only the local player's own outfits**, and only after they agree to a permission prompt. RoFit has no backend of its own, so the companion website shows outfits **only from share links people create on purpose**.

## Sources

| # | Source | What it establishes |
|---|---|---|
| S1 | DevForum feature request *Better privacy for user outfits* (devforum.roblox.com/t/1823630), staff reply marked as solution, and the author's edit "EDIT 2025/11/12: This feature is now live!" | Staff: "we just enabled Private Outfits, so it should respect your inventory privacy setting now." The thread also notes that purchased (bundle) outfits were already hidden for private inventories, and that "Outfit Viewer" games let anyone view anyone's outfits. |
| S2 | Roblox wiki (Fandom), *Character* article | Character visibility "was updated to respect inventory privacy settings" (Nov 12, 2025). The outfit limit went from 50 to 150 on Oct 1, 2024. Outfits are now called **Characters** in the Roblox UI. |
| S3 | Roblox Support, *How to View or Hide Your Inventory in a Browser* | The setting is at Settings → Privacy & content restrictions → Trading & inventory → **Inventory visibility**. "Selecting No one will hide your inventory from all other users." |
| S4 | Open Cloud reference, *Inventories* (`GET /cloud/v2/users/{user_id}/inventory-items`) | Visibility depends on "Who can see my inventory?". With **Everyone**, any key or token can read it. Otherwise it needs the **owner's own API key** (Inventory: Read) or an **OAuth2 token the owner authorized**. This is Roblox's official model for owner-authorized access to inventory. |
| S5 | Open Cloud reference, *Avatars* (legacy web endpoints) | `GET avatar.roblox.com/v2/avatar/users/{userId}/outfits` (cookie optional). `v1/users/{userId}/outfits` is deprecated. `v1/outfits/{id}/details` and `v3/outfits/{id}/details` are deprecated in favor of **`v4/outfits/{outfitId}/details`** (auth optional). `v1/users/{userId}/avatar` returns the avatar someone is wearing now. |
| S6 | Creator Docs, `AvatarEditorService` | `GetOutfitsAsync` returns outfits **for the LocalPlayer**. It requires `PromptAllowInventoryReadAccess`, which asks the player each session and isn't remembered. `GetOutfitDetailsAsync(outfitId)` needs AssetRead. `PromptCreateOutfit` saves a HumanoidDescription as an outfit after a prompt. |
| S7 | Creator Docs, `Players:GetHumanoidDescriptionFromOutfitId` | Builds a HumanoidDescription from an outfit ID, server-side. Historic "outfit viewer" experiences paired this with web outfit lists fetched through public proxies. |
| S8 | **Observed** with `curl` from a server, no cookies, `Origin: https://rofit.site` | `thumbnails`, `users`, and `avatar` hosts return 200 **without** `Access-Control-Allow-Origin`. `OPTIONS` preflight to `users.roblox.com/v1/usernames/users` returns 405. A browser page on another origin can't read these responses. |
| S9 | **Observed**, anonymous `GET v2/avatar/users/156/outfits?itemsPerPage=3&outfitType=Avatar` | 200 with `{data:[{id,name,isEditable,outfitType}], paginationToken}`. IDs are large integers (16 digits) and still JSON-safe. |
| S10 | **Observed**, anonymous `GET v1/users/156/outfits?page=1&itemsPerPage=3` | HTTP 200 with body `{"errors":[{"code":0,"message":""}]}`. The deprecated v1 list can't be relied on, so RoFit treats this as a bad response and not as "no outfits". |
| S11 | **Observed**, anonymous `GET v4/outfits/1/details` and `v3/outfits/1/details` | Both return 200. v4 wraps the data in `outfitModel` (`assets[{id,name,assetType{id,name},currentVersionId}]`, `bodyColors{headColor…}` as hex, `scale`, `playerAvatarType`). v3 uses `bodyColor3s`. |
| S12 | RoFit 1.x e2e suite (`tests/e2e/run.mjs` §6c) | Requests sent through a roblox.com tab carry the viewer's SameSite=Lax session cookies. Requests from the extension worker don't, so they're effectively anonymous. |

## What a viewer can see

| Viewer | Owner's inventory visibility = Everyone | = Friends (or similar subset) | = No one |
|---|---|---|---|
| Owner, signed in | All outfits | All outfits | All outfits |
| Signed-in viewer allowed by the setting | All outfits | All outfits | — |
| Signed-in viewer not allowed | All outfits | Hidden | Hidden |
| Anonymous (no session, proxies, servers, websites) | All outfits | Hidden | Hidden |

Source for the rule: S1, S2, S3, S4. The exact set of non-"Everyone" options is in the Roblox settings UI and differs by account age and region. RoFit doesn't depend on it: it only compares "visible signed in" with "visible anonymously".

**Unverified:** whether a hidden list comes back as an HTTP 403 or an empty `data` array. RoFit 1.x handles both: a 403 becomes "private", and an empty list stays "no visible outfits — possibly private". RoFit 2.0 adds the anonymous probe so it can tell these cases apart when the signed-in list isn't empty.

## Access states used by RoFit 2.0

| State | How RoFit knows | What it shows | Sharing |
|---|---|---|---|
| **Yours** (owner) | The signed-in user ID equals the profile ID (`users.roblox.com/v1/users/authenticated`, viewer side only) | Everything, labeled "Your outfits" | Allowed |
| **Public** | The anonymous probe (first page, no cookies) returns at least one of the same outfits | Everything | Allowed |
| **Visible to you** (friend or other permission) | The signed-in list has outfits but the anonymous probe sees none or gets 403 | Everything, labeled "Not public — visible because you're signed in" | Warns first: you must confirm you have the owner's permission |
| **Shared with you** | Opened from a share link or an imported manifest that someone made on purpose | Only the snapshot in the link or file | Already shared, but RoFit doesn't make new links from it |
| **Saved earlier** | Comes from RoFit's local cache or Library while live data can't be loaded (offline or rate-limited) | The cached copy, with its date | Warns first |
| **Private** (restricted) | Roblox returns 403 or a permissions error **for this viewer** | Explanation only. Earlier cached copies of that list are **not** shown, so the owner's choice wins. Library entries the viewer saved stay theirs and are labeled | Blocked for outfits that aren't in the Library |
| **Unavailable** | The user doesn't exist or is banned (400/404), or the API is down | Explanation | — |
| **Unknown** | The probe couldn't run (rate limit, network, or signed out with nothing visible) | Neutral. Never claims "public" | Warns first |

## Legitimate paths, ranked

1. **The viewer's own session in their own browser (what RoFit does).** Roblox enforces privacy for the viewer. RoFit adds nothing beyond what Roblox already shows that person.
2. **Owner-authorized OAuth 2.0 (future, server needed).** S4 documents the model for inventory. **Unverified:** whether an OAuth scope covers *outfits/characters*. No such scope was found in the Open Cloud reference on 2026-11-04, so RoFit doesn't claim it.
3. **Owner-initiated sharing.** The owner, or a viewer with permission, creates a share link. The link holds a snapshot of names, IDs, body colors and scales. RoFit adds a warning step when the outfit isn't public (see the access states above).
4. **In-experience companion (future).** A Roblox experience can read the **local player's own** outfits with a prompt (S6) and save outfits with `PromptCreateOutfit`. It can't list other players' outfits through this service, so it's a "your own outfits" tool and not a viewer.

## Paths RoFit will not use

- Public proxies (roproxy-style) or a server that lists outfits for any user ID. These are anonymous, so after S1 they only see public lists anyway, and running one would centralize scraping.
- Other accounts, cookie sharing, or reading `.ROBLOSECURITY` (the extension has no `cookies` permission).
- Showing cached copies of a list after Roblox started returning "private" for it.
- Any scraping beyond what the viewer opened. The background indexer only fetches details for profiles the viewer opened, at most 3 at a time, and stops on the first rate limit.

## Consequences for the product

- **Access badge** in the Explorer header, with an explanation popover that cites what RoFit observed.
- **Share links** carry only what the outfit page shows. They warn first when the state isn't Public or Yours, and include no viewer data.
- **The website can't browse anyone's outfits.** It only renders share links. That's a design consequence of S8 and of the privacy stance, not a missing feature.
- **Details endpoint:** RoFit asks `v3` first, because 1.x parsing is proven against it, and falls back to `v4` (S5, S11) when `v3` returns a server error, a bad response, or 404, so the deprecation doesn't break inspection.
