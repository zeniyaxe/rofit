# Where the site stands (update when you stop)

**Done:** homepage (hero, exploded-outfit rail, compare toy, share-card scene, private-profile scene, real demo, privacy proof, install CTA), /install /privacy /terms /security /support /roadmap /changelog /guides (+4) /404, sitemap, robots, _headers, wrangler, OG + touch icon, claim check + tests.

**Not done / next:**
1. Mobile pass on SceneRail, SceneCompare, SceneShare (private + demo + proof checked OK at 390px).
2. Reduced-motion / no-JS screenshots of every scene; Firefox smoke test (no scroll-driven CSS there; scenes use JS).
3. Chrome Web Store asset generator (1280x800 x<=5, 440x280, 1400x560, 128 icon) from the demo.
4. Performance profile (CLS/INP on scroll scenes), Lighthouse-ish check, `impeccable detect`, finish-reviewer, DESIGN.md.
5. Optional: press kit, View Transitions.

**Owner inputs still needed:** licence, store/support/security/Discord/donate links, tagline sign-off, legal review (`LEGAL-REVIEW.md`).

**Finish-review follow-ups (open):** recapture hero/proof/rail/compare/share at desktop+mobile and Calm/no-JS; Share scene text too small at 390px (raise cqw sizes in the mobile block); verify Rail desktop caption vs left tags overlap; tighten content-script proxy to an explicit POST allowlist (extension change, optional). Already fixed: "open source" wording, nav contrast on home, mirror aria-hidden, Rail list exposed to screen readers, privacy/security wording.

**Update (9 Oct):** real-profile demo done (Shedletsky 8 outfits, KreekCraft 2, snapshot 9 Oct 2026; Stickmasterluke has presets only, so excluded). Donate (Roblox store page) + support@rofit.site wired in site and extension popup. Store assets generator + `store/` images, Share scene mobile layout, Calm/no-JS full-page checks done. Open: Firefox/tablet smoke test, perf profile (CLS/INP), DESIGN.md, nav/footer polish, owner decisions (MIT wording on Terms/Roadmap/PRODUCT.md NOT yet changed per owner instruction).

**Update (10 Oct):** all drawn avatars removed (demo/art.ts and fixtures deleted). Hero, rail, compare, share card and demo use the real snapshot (Shedletsky 8, KreekCraft 2, rip_indra 8, builderman 5, Reverse_Polarity 3). OG/promo art has no avatars. Extension 1.5.0: "Wearing now" for private profiles, proxy allowlist, packaged in release/. Open: 3D viewer (not started; Roblox has no public 3D API for other users' outfits), mobile pass on the new hero/compare, dark-mode scene check, store screenshots use real profiles (decide), re-run capture before launch, MIT wording update, commit/push on owner's go.
