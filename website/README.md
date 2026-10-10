# RoFit website

The marketing site, interactive demo and policy pages for RoFit. Static output, no server code, no third-party requests.

```bash
npm run site:build                 # → website/dist   (BASE=/rofit/ for a GitHub Pages project site; SITE_URL=https://… for canonical/sitemap)
npm run site:serve                 # http://localhost:4321/   (THROTTLE=600 to simulate a slow network)
npm run site:test                  # Playwright, Chromium + Firefox; screenshots in website/.cache/shots
```

## How it's put together

| Path | What |
|---|---|
| `build.mjs` | Reads facts from the repo (version, permissions, hosts, zip size + SHA-256, changelog) and fails if version sources disagree; bundles JS/CSS with esbuild; renders pages at build time. |
| `src/pages/` | Page templates (plain template strings). Every page works without JavaScript. |
| `src/site/` | `site.css` (the visual identity) and `main.ts` (progressive enhancement: hero scroll story, reveals, provenance switcher, browser detection, lazy demo). |
| `src/demo/` | The interactive demo: RoFit's **real** UI (`src/ui`) and service code (`src/background/service.ts`, `roblox.ts`) running against an invented sample Roblox. |
| `src/fonts/` | Font subsets stored as base64 text (the repo is edited through text-only tooling) plus their OFL licenses; decoded at build. |
| `serve.mjs` | Local static server with the recommended security headers and an optional throttle. |
| `tests/site.test.mjs` | The product test suite. |

### Demo wiring (no extension code is modified)

`build.mjs` swaps three modules and patches three source lines at bundle time; each substitution is verified and the build fails if one stops matching:

- `src/shared/rpc.ts` → `src/demo/shim-rpc.ts` (calls the real handlers directly instead of messaging a service worker)
- `src/shared/settings.ts` → `src/demo/shim-settings.ts` (memory instead of `chrome.storage`)
- `src/background/db.ts` → `src/demo/memdb.ts` (memory instead of IndexedDB; the site stores nothing)
- `roblox.ts`: `fetch` → `demoFetch` (the sample server, with host allow-list, latency, offline and HTTP 429 simulation)
- `Shell.tsx`: window-level shortcut listener → only keys aimed at the demo
- `Settings.tsx`: `chrome.runtime.getManifest().version` → version from `package.json`

The sample world (`src/demo/fixtures.ts`) uses ID ranges that don't collide with real Roblox content, invented names ("Sample Studio", "Sample Wardrobe") and invented prices. Images are original flat drawings from `src/demo/art.ts`.

## Deploying

Any static host works. Recommended response headers (meta CSP is already in every page; `frame-ancestors` and these can only be sent as headers):

```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Cache-Control: public, max-age=31536000, immutable      (only for /assets/*, which are content-hashed)
```

GitHub Pages can't set custom headers; the meta CSP still applies there. Nothing is deployed yet (see `LEGAL-REVIEW.md` and `CONTINUATION.md`).
