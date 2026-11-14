---
name: RoFit
description: The rofit.site design system. A "get the look" fashion spread fused with a collector's archive, printed in ink on coated stock with one fluoro spot.
colors:
  paper: "#f4f4f1"
  paper-2: "#e9e9e4"
  stock: "#ffffff"
  ink: "#0c0c0d"
  ink-2: "#45454b"
  ink-3: "#66666e"
  rule: "rgb(12 12 13 / .14)"
  rule-2: "rgb(12 12 13 / .32)"
  spot: "#ff3d7f"
  spot-ink: "#0c0c0d"
  spot-rule: "rgb(12 12 13 / .28)"
  link: "#c8104f"
  ok: "#0b7a52"
  warn: "#8f4f00"
  bad: "#c21f3a"
  dark-paper: "#0f0f10"
  dark-paper-2: "#18181a"
  dark-stock: "#1c1c1f"
  dark-ink: "#f3f3ef"
  dark-ink-2: "#b6b6bc"
  dark-ink-3: "#8c8c94"
  dark-link: "#ff7aa6"
  dark-ok: "#3fcf98"
  dark-warn: "#f0a53c"
  dark-bad: "#ff6b85"
typography:
  masthead:
    fontFamily: "'Anybody Variable', 'Anybody', 'Arial Narrow', sans-serif"
    fontSize: "clamp(6rem, 21.5vw, 26rem)"
    fontWeight: 900
    lineHeight: 0.72
    letterSpacing: "-0.05em"
    fontVariation: "'wdth' 150"
  cover-line:
    fontFamily: "'Anybody Variable', 'Anybody', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3rem, 8vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "'Anybody Variable', 'Anybody', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 6rem)"
    fontWeight: 820
    lineHeight: 0.96
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 72"
  title:
    fontFamily: "'Anybody Variable', 'Anybody', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.25rem, 1vw + 1rem, 1.6rem)"
    fontWeight: 760
    lineHeight: 1.12
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 86"
  body:
    fontFamily: "'Onest Variable', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(16px, .35vw + 14.6px, 18px)"
    fontWeight: 400
    lineHeight: 1.6
  numeral:
    fontFamily: "'Anybody Variable', 'Anybody', 'Arial Narrow', sans-serif"
    fontSize: "1.4rem"
    fontWeight: 800
    fontFeature: "'tnum', 'lnum'"
    fontVariation: "'wdth' 128"
  collector-no:
    fontFamily: "'Anybody Variable', 'Anybody', 'Arial Narrow', sans-serif"
    fontSize: ".78rem"
    fontWeight: 600
    letterSpacing: "0.02em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 128"
  label:
    fontFamily: "'Onest Variable', 'Onest', system-ui, sans-serif"
    fontSize: ".78rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  code:
    fontFamily: "ui-monospace, 'Cascadia Mono', 'SF Mono', Consolas, monospace"
    fontSize: ".9em"
  micro:
    fontFamily: "'Onest Variable', 'Onest', system-ui, sans-serif"
    fontSize: ".72rem"
  small:
    fontFamily: "'Onest Variable', 'Onest', system-ui, sans-serif"
    fontSize: ".875rem"
  ui:
    fontFamily: "'Onest Variable', 'Onest', system-ui, sans-serif"
    fontSize: ".94rem"
  ui-l:
    fontFamily: "'Onest Variable', 'Onest', system-ui, sans-serif"
    fontSize: "1rem"
  lead:
    fontFamily: "'Onest Variable', 'Onest', system-ui, sans-serif"
    fontSize: "1.05rem"
  h5:
    fontFamily: "'Anybody Variable', 'Anybody', 'Arial Narrow', sans-serif"
    fontSize: "1.2rem"
  h4:
    fontFamily: "'Anybody Variable', 'Anybody', 'Arial Narrow', sans-serif"
    fontSize: "1.6rem"
rounded:
  inner: "1px"
  sm: "2px"
  card: "3px"
  md: "6px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "144px"
  section: "clamp(88px, 12vw, 176px)"
  gutter: "clamp(16px, 3.6vw, 56px)"
  maxw: "1360px"
  nav-h: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "52px"
  button-on-field:
    backgroundColor: "{colors.spot-ink}"
    textColor: "{colors.spot}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "52px"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "52px"
  button-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "40px"
  spot-field:
    backgroundColor: "{colors.spot}"
    textColor: "{colors.spot-ink}"
  collector-card:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "5px"
  price-known:
    textColor: "{colors.ink}"
    typography: "{typography.numeral}"
  price-off:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1px 7px"
  price-unknown:
    textColor: "{colors.ink-3}"
    rounded: "{rounded.sm}"
    padding: "1px 7px"
  limited-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "0 5px"
  segmented-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    height: "38px"
  callout-note:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    padding: "16px 24px"
---

# Design System: RoFit

## Overview

**Creative North Star: "The Get-the-Look Issue"**

rofit.site reads as a fashion magazine issue about Roblox wardrobes, crossed with a collector's archive. A real saved outfit is the cover, every piece gets a callout with only what Roblox actually knows about it, and outfits sit on the page as printed collector cards stamped with their real outfit ID. The stock is coated near-white, the ink is near-black, and one fluoro-pink spot colour is printed as whole fields: the cover, the face-to-face compare spread and the closing call. It never shows up as a glow, gradient or tint.

The page alternates between loud and quiet. Spot fields and the ink band shout in ultra-narrow heavy capitals. Paper sections do the reading in sentence-case condensed headings over Onest body text. Data honesty is drawn, not written: a value Roblox returned prints solid, and a value it did not return prints as a dashed hairline. Motion is a deal of cards and a redraw of leader lines, and all of it rests on tokens that Calm and Off modes zero out.

This file governs rofit.site only. The extension UI inside roblox.com is not governed by it: that UI inherits Roblox's font and sampled colours (`--rf-bg/--rf-fg/--rf-accent`, see the repo CLAUDE.md). RoFit's own extension pages borrow exactly two things from this system: the pink mark (`--rf-brand`, the spot on ink) and the link colours (light `link`, dark `#FF6F9F`), in `src/ui/theme.ts`.

**Key Characteristics:**
- One spot colour, printed as fields with ink text on top.
- Anybody's variable width does the work of a type family: 150% for mastheads, 62% for cover lines, 72% for headings, 128% for numerals.
- Known values solid, unknown values dashed. Nothing is inferred.
- Collector cards: the outfit render on stock, a double hairline frame, a ruled stat strip, "No." plus the real outfit ID.
- Flat print. Depth is used sparingly, for paper lifting off paper, never for glow.
- Entrance travel and all durations are tokens, so Calm and Off are designed states.

## Colors

Ink on coated stock with one fluoro spot. The site has one accent and no secondary.

### Primary
- **Fluoro Spot Pink** (spot): printed as whole areas (the cover, the compare spread, the close, the OG image and icon) and as tiny marks (the wordmark dot, `::selection`, the caret, bullet dots on paper, the "New" release tag, the PRIVATE stamp). Text on the spot is always ink (spot-ink). Inside a field, rules, secondary ink, links and focus re-point to ink (`.field` overrides `--rule`, `--ink-2`, `--ink-3`, `--link`, `--focus`).
- **Deep Spot Link** (link): the pink darkened until it reads as text on paper. Used for inline links and the current item in the mobile menu. On dark it lifts to dark-link.

### Neutral
- **Coated Paper** (paper): the page ground and the nav once it goes solid.
- **Second Pass** (paper-2): code wells, callouts and notes, segmented-control tracks, hover fills.
- **White Stock** (stock): what cards, the proof sheet and popovers are printed on. The compare cards and share card stay pure white with fixed ink in both themes because they are printed objects.
- **Press Ink** (ink): text, primary buttons, the selected state, heavy section rules (1.5px).
- **Ink 2 / Ink 3** (ink-2, ink-3): secondary copy, then meta, source lines and unknown prices.
- **Hairline / Hairline Strong** (rule, rule-2): 1px dividers, card frames, dashed unknown outlines.
- **State inks** (ok, warn, bad): only for functional badges and notes in long-form pages. On the homepage, visibility states are re-inked in ink, spot and dashed (see the rule below).

### Dark theme
`:root[data-theme='dark']` swaps the stock for near-black paper (dark-paper, dark-paper-2, dark-stock) and the ink for warm off-white (dark-ink, dark-ink-2, dark-ink-3), with rules at 16% / 34% of the ink. Focus becomes the spot. The spot itself and spot-ink do not change, so fields print the same pink with ink text in both themes. The `.ink-page` band (the Private section) uses the dark palette locally in both themes.

### Named Rules
**The One Spot Rule.** The site prints in ink and one pink. The spot is a field or a mark, never a glow, gradient, tinted shadow halo or second accent. Text on the spot is ink.

**The Re-ink Rule.** States that the extension shows in green and amber are re-inked on the site: known or public states in solid ink, refusals as a spot field or spot outline, unknowns as a dashed hairline. ok, warn and bad are reserved for functional long-form notes and badges.

## Typography

**Display Font:** Anybody Variable (falls back to Arial Narrow, then sans-serif)
**Body Font:** Onest Variable (falls back to system-ui)
**Code:** ui-monospace stack

**Character:** Anybody is used as a whole wardrobe of widths: stretched wide for the masthead and for numerals that should look set rather than typed, crushed narrow for cover lines. Onest is a calm, legible grotesque for the reading.

### Hierarchy
- **Masthead** (900, 150% width, clamp(6rem, 21.5vw, 26rem), line-height .72, uppercase): the "ROFIT" title across the cover, repeated at full width as the footer's sign-off. Only these two places use it.
- **Cover line** (900, 62% width, uppercase, line-height .84–.88): the shout. Used for the cover h1 ("GET THE LOOK."), headings on spot fields and on the ink band, the Proof head, long-form page mastheads (880) and the 404.
- **Headline** (820, 72% width, sentence case, line-height .96, `--t-h2`): the speaking voice of paper working sections ("A wardrobe, filed.", "Take it with you.", "Try it live.", features, prose h2).
- **Title** (760, 86% width, `--t-h3`): card and sub-section titles. Inside prose and on dense card backs, titles switch to Onest at 750–760.
- **Body** (Onest 400, 16–18px fluid, line-height 1.6): reading text. Prose is capped at 70ch, docs columns at 72ch, leads at 46–58ch.
- **Numeral** (Anybody 128% width, 600–860, tabular): totals, counts, step numbers, release versions, the compare "3".
- **Collector No.** (Anybody 128% width, 600, .78rem, tabular): the real outfit ID, prefixed with a "No." that is generated in CSS at 90% width, 800 weight.
- **Label** (Onest 700, .78rem, .08em tracking, uppercase): footer column heads, TOC heads and table headers only. These are structural labels for lists and tables, not kickers above headlines.
- **Small ramp** (tokens in `global.css`): `--t-micro` .72rem (stamps, pins, chips on cards), `--t-tiny` .78rem (captions, footnotes), `--t-small` .875rem (secondary text, item rows), `--t-ui` .94rem (ledger and table text), `--t-ui-l` 1rem (item names, controls), `--t-lead` 1.05rem (decks), `--t-h5` 1.2rem and `--t-h4` 1.6rem (block titles). Every non-display size on the site is one of these; add a step here before adding a literal.
- **Display sizes are set per section, on purpose.** Each section makes one typographic move (the 9rem wardrobe headline, the 10rem FACE TO FACE., the 11rem OPEN ANY PROFILE.), so display `clamp()`s live with their section rather than on a shared ramp. Keep each within its role above, and keep minimums at or above 2.4rem.

### Named Rules
**The Width Is the Role Rule.** Change emphasis by changing width (`--narrow` 62%, `--cond` 72%, `--wide` 128%, 150% for mastheads), not by adding families or colours.

**The Shout and Speak Rule.** Narrow uppercase is for section turns: the spot fields, the ink band, page mastheads and the Proof head. Paper working sections speak in sentence-case condensed. A section that holds the reader's attention for a while does not shout.

## Layout

Content sits in a centred `.wrap` (max 1360px, fluid gutter of 16–56px). Sections are separated by a fluid `--section` gap (88–176px). Spot fields and the ink band run full-bleed and carry their own internal padding. The spacing scale is on a 4px base (s1–s10: 4 to 144px).

The cover is a fixed 2.1:1 stage that the full-width masthead runs behind. The cover line and actions sit in the left third, the render is centred, and the callouts start at 70% of the stage. Below 1100px the cover stacks: copy, then the render with numbered pins, then the callouts as a ruled list. Section heads use a 1.2fr / 1fr split with the lead aligned to the baseline, which collapses at 860px. Long-form pages use a 220px sticky TOC beside a 72ch column, and drop the TOC at 1000px. Card grids auto-fill at a 220px minimum, with two columns forced below 520px. The nav turns into a full-screen menu at 900px, with menu items set as condensed display type.

Heavy 1.5px ink rules (spot-ink on fields) open leads, steps, ledger columns and totals. 1px hairlines divide rows, and dashed hairlines divide the price and pieces rows on cards.

## Elevation & Depth

The print is flat. Depth appears only when a printed object sits on the page (a card, share card, popover or demo frame) or when a hovered card lifts. Shadows are long, soft and offset downward, and they are tinted ink (wine-tinted on the pink field), never coloured light.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 1px 0 rgb(12 12 13 / .06), 0 14px 32px -18px rgb(12 12 13 / .35)`): hovered collector cards, the share-URL slip.
- **Lift 2** (`box-shadow: 0 2px 0 rgb(12 12 13 / .05), 0 30px 60px -28px rgb(12 12 13 / .45)`): the share card, the demo frame, the display popover.
- **Field drop** (`0 34px 60px -34px rgb(70 0 25 / .75)`, and a `drop-shadow(0 28px 24px rgb(80 0 30 / .3))` on the cover render): objects resting on the spot field. This is a shadow cast onto pink, not a glow.
- **Frame** (`0 0 0 1px var(--rule), inset 0 0 0 4px var(--stock), inset 0 0 0 5px var(--rule)`): the collector card's double hairline. It is a border, not an elevation.
Dark mode deepens both lifts to near-black.

### Named Rules
**The Paper Lifts, Light Doesn't Rule.** A shadow means one sheet sitting on another. No glows, no coloured halos, no hard offset shadows.

## Shapes

Corners are barely rounded: 2px for buttons, chips, tags and code, 3px for cards (1px on the art well inside), 6px for sheets, frames, callouts and code blocks. The only circles are the wordmark dot, the leader-line pins, the wipe handle and bullet dots. Collector cards tilt by about 1.2–2° when they are dealt or placed face to face, and settle to 0° on hover. Leader lines are 1-unit dashed strokes that end in ink pins with a spot ring. A dashed outline always means "not known" or "empty sleeve" (the private slot, unknown prices, missing item thumbnails).

## Components

### Buttons
Rectangles of ink with labels that say what happens.
- **Shape:** squared (2px), 52px tall (50px on phones), 0 22px padding, Onest 700 at 1rem.
- **Primary:** ink on paper. On a spot field it inverts to ink fill with spot text.
- **Line:** transparent with a 1.5px inset currentColor ring. Hover adds an 8% currentColor fill.
- **Small:** 40px tall with 0 14px padding. Nav CTA 42px.
- **Hover / Active:** a soft ink drop (`0 10px 24px -14px`), an arrow icon nudges 3px in its direction, press scales to .97 over 70ms on the `--land` spring.
- **Spot fill** (`.btn.primary`, ported download and viewer markup only): spot with ink text, on paper.

### Price marks (signature)
- **Known:** solid ink, 750 weight, tabular. Totals set in the 128% numeral.
- **Off sale:** a 1px solid inset outline chip.
- **Unknown:** a 1px dashed outline in ink-3, labelled "Unknown". It is never called deleted.
- **Limited tag:** a small ink block with uppercase paper text (spot text on a field), shown **only** when Roblox marks the item Limited or Limited U.
- **Source:** every price on the site comes from `site/src/lib/real.ts#priceOf` (tones known, free, off, unknown) applied to the dated real snapshot. The site has no illustrative or example prices.

### Collector card (signature)
A white-stock card with a double hairline frame and 5px padding. The square art well (paper-2 mixed into stock) has the collector No. pinned top-left on a translucent stock chip. Below it sit the title (Onest 720–760, two-line clamp) and a ruled stat strip in Anybody at 112% width, .72rem. The cards on the Rack turn over (rotateY) to a back that lists the pieces, in Full motion only. In Calm and Off the faces crossfade. Hover lifts the card 4px and adds Lift. The compare cards (`.cc`) are the same object at a larger size, and always white.

### Spot field
A full-bleed area of spot with ink text. Rules, secondary ink and focus inside it are re-pointed to ink, and buttons and limited tags invert. It is used for the cover, the face-to-face spread, the closing call, the features "pieces" panel, the OG image and the app icon.

### Navigation
A fixed 64px bar (58px on phones). It is transparent over the cover with ink text, and goes solid (paper at 94%, 12px backdrop blur, hairline bottom) once scrolled. Links are Onest 600, .94rem, with a sliding 2px currentColor thumb under the current link. The wordmark (Anybody 78% width, 880, with a spot dot) is hidden over the cover, where the masthead is the title. Mobile is a full-screen paper sheet with condensed display-type links on hairlines.

### Chips, segmented controls, tabs
- **Chips and badges:** a 2px radius and a 1px inset outline in currentColor. Visibility chips are re-inked (ink, spot outline, spot fill, dashed).
- **Segmented control** (theme and motion): a paper-2 track, with the selected segment in solid ink and paper text.
- **Tabs** (Rack shelves): ink-3 labels that go ink when selected, with a counter in the 128% numeral and a 3px ink thumb sliding along the hairline.

### Callouts / notes / code
Paper-2 wells with a 6px radius and 16 by 24px padding. Inline code sits in a paper-2 well with a 2px radius.

### Motion
- **Easing:** `--ease` (expo-out) for travel, `--ease-in` for exits, and the `--land` linear() spring for objects that land (cards, pins, presses).
- **Durations:** `--d-fast` 160ms (controls), `--d` 320ms, `--d-slow` 640ms (deals, reveals).
- **Travel:** `--rise` 22px (reveals), `--deal` 34px (card deal and the cover render), `--tilt` 1.6deg.
- **Calm** (`data-motion='reduced'`) zeroes all travel, caps `--d-slow` at 240ms and swaps the spring for `--ease`, so fades remain. **Off** also zeroes every duration.
- Cover staging: the render deals in, leader lines draw with a stagger (`--k` × 70ms), then pins pop and callouts slide in. The masthead's scroll-linked lift runs in Full motion only.

## Do's and Don'ts

### Do:
- **Do** print the spot as a whole field with ink (`spot-ink`) text, and re-point rules, links and focus to ink inside it.
- **Do** draw honesty: solid for known values, a solid outline for off sale, a dashed hairline for unknown. Show the limited tag only when Roblox marks it.
- **Do** take every price from `real.ts#priceOf` over the real snapshot, and stamp every outfit with its real ID as the collector No.
- **Do** change emphasis through Anybody's width axis: 150% masthead, 62% cover line, 72% headline, 128% numerals.
- **Do** shout (narrow uppercase) only at section turns, and speak in sentence-case condensed on paper working sections.
- **Do** express entrance and travel distances (reveals, deals, the cover render, leader lines) and every duration through the motion tokens, so Calm and Off still work. Resting tilts on placed cards are layout, not motion.
- **Do** keep printed objects (compare cards, share card) white with fixed ink in both themes.

### Don't:
- **Don't** use the spot as glow, gradient, tint or text on paper. Use `link` for pink text on paper.
- **Don't** add a second accent or bring the extension's green and amber visibility colours onto the homepage.
- **Don't** invent prices, rarity, owners or "Limited" status, and never call an unresolved item deleted.
- **Don't** hardcode a travel distance or duration in a new entrance or keyframe. Use --rise, --deal, --tilt and the --d tokens.
- **Don't** apply this file to the extension's in-Roblox UI. It inherits Roblox's sampled colours, and only the pink mark and link colours carry over to RoFit's own extension pages.
- **Don't** add kickers or eyebrow labels above headlines. Small uppercase labels are reserved for footer columns, TOCs and table headers.
- **Don't** use hard offset shadows or coloured glows. Shadows are soft, downward and ink-tinted.
