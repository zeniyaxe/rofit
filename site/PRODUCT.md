# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated by the owner ("full creative freedom"): Astro (static) + TypeScript + plain CSS, selective islands, Cloudflare hosting. Lives in /site inside the RoFit repo; never pushed by the agent.

## Users

Roblox players and avatar enthusiasts (many are teenagers or younger) who want to see what another player's saved avatar outfits are made of, plus technically curious people who check what an extension does before installing it. Visitors arrive from shared links on phones as often as on desktops.

## Product Purpose

RoFit is an independent browser extension. On another user's Roblox profile it adds an Outfits tab: browse the outfits they saved, inspect every item (price, availability, creator), compare two outfits, keep a local library and save an outfit as an image card. The website must make that understandable in seconds, prove the privacy claims from the code, and get Chrome (and later Firefox) users to install it.

## Positioning

The only avatar-outfit tool that is built around *saved outfits* specifically, explains why data is missing (private/hidden/none) instead of failing silently, and can prove it collects nothing: no servers, no accounts, no analytics, read-only requests to Roblox.

## Operating Context

The extension runs inside roblox.com profiles in the user's own browser. Everything is stored locally (IndexedDB / extension storage). Requests go only to six Roblox API hosts (avatar, thumbnails, catalog, economy, inventory, users) using the user's browser session, via an open roblox.com tab. Extension is Chrome MV3 today; there is no Firefox build yet.

## Capabilities and Constraints

Real: Outfits tab + hanger button on profiles; saved-outfit explorer (grid/list, search, sort, optional "read outfits" index for item search, reused items, near-duplicate looks); inspector (items, prices, off-sale/limited/resale, ownership check, body colors/scale, history); compare (side by side + slider, vs what I'm wearing); local library (collections, tags, notes, JSON export/import); share card PNG; Studio Lua export; privacy-aware empty states (private / signed-out / presets-only); Calm (reduced) motion; settings inside Roblox's account settings. Flat 2D renders only: NO 3D, no equipping/wearing outfits, no price alerts, no accounts, no sync.
Constraints: not affiliated with Roblox; never bypass privacy; no analytics at launch; store listings and support channels do not exist yet (placeholders only, clearly configurable, never fake links); open-source licence not yet chosen.

## Brand Commitments

Name "RoFit" (not "RoFit Inspector" on the site). Site must feel recognisably RoFit, not Roblox: no Roblox logos, no counterfeit Roblox chrome. Official site rofit.site. Repo https://github.com/zeniyaxe/rofit.

## Evidence on Hand

The extension source (/src), its CHANGELOG.md, manifest (public/manifest.json), real UI components reusable in a demo, share-card renderer. Absent and must NOT be fabricated: users, ratings, reviews, testimonials, store links, support email, Discord, performance benchmarks.

## Product Principles

1. Demonstrate, don't describe: the page is a guided session of the real product.
2. Claims come from the code: permissions and network hosts are generated from the manifest and source.
3. Honest about limits: say what RoFit cannot see and will not do.
4. Motion carries meaning; reduced motion is a designed experience.
5. Mobile is first-class because links get shared to phones.

## Accessibility & Inclusion

Keyboard operable, visible focus, semantic HTML, prefers-reduced-motion honored by default, readable at 200% zoom, touch-first alternatives for any hover behaviour, plain language for a young audience.
