# rofit.site

The companion website for RoFit: home, features, download, docs, changelog, privacy policy, and the share-link
viewer at `/o/#…`. Static files only: no server code, no cookies, no analytics, no third-party requests except
outfit images from Roblox's CDN (`tr.rbxcdn.com`) on the viewer.

```bash
node site/build.mjs            # → site/dist/
node site/build.mjs --serve    # build and serve on http://localhost:8787
node tests/e2e/site.mjs        # pages, CSP, viewer hostile-input cases, extension bridge (needs the test build)
```

## Layout

| Path | What |
|---|---|
| `build.mjs` | Renders every page, bundles `src/app.ts` and `src/site.css` with content hashes, writes `_headers` and `sitemap.xml` |
| `src/layout.mjs` | Page shell (head, nav, footer), the CSP, `esc()` for anything dynamic, icons from Lucide |
| `src/pages.mjs` | Copy for each page. Claims are checked against the extension's code; change both together |
| `src/markdown.mjs` | A small, escaping Markdown subset used to render `CHANGELOG.md` |
| `src/app.ts` | The only script: nav toggle, copy buttons, RoFit detection, the share viewer |
| `public/` | Copied as is: favicon, robots.txt, CNAME |

The viewer decodes links with the extension's own `src/shared/share.ts`, so both sides agree on the format and on
what counts as valid. The version shown on the site comes from the root `package.json`.

## Security model

- **CSP** (header via `_headers`, and the same policy in a `<meta>` tag for hosts without custom headers):
  `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' https://tr.rbxcdn.com; connect-src 'none'; base-uri 'none'; form-action 'none'`,
  plus `frame-ancestors 'none'` as a header. Pages have no inline scripts, styles or event handlers.
- **Share links are untrusted input.** `decodeShare()` caps size (including after decompression), checks every
  field's type and length, and accepts images only as paths on `tr.rbxcdn.com`. The viewer inserts text with
  `textContent`, builds links only from numeric IDs, and colours swatches through the CSSOM from validated hex.
- **No referrer** is sent anywhere (`Referrer-Policy: no-referrer`), so Roblox's CDN doesn't learn which page loaded an image.
- **The extension bridge** (`src/content/site.ts` in the extension) runs only on `https://rofit.site/*`. The site can
  learn that RoFit is installed (and its version), and ask it to open its import screen for one share link, only
  during a user click and at most every 1.5 s. RoFit validates the link again in its service worker and shows a
  preview; nothing is saved until the user presses Import. The site can't read anything from RoFit.

## Deploying

Any static host works. The site expects to live at `https://rofit.site` (the bridge only runs there).

**Cloudflare Workers (static assets)**: the repo's `wrangler.jsonc` configures it.
Build command `node site/build.mjs`, deploy command `npx wrangler deploy --assets ./site/dist`, branch `main`.
`name` in `wrangler.jsonc` must match the Worker's name in the dashboard. `_headers` is honoured; unknown paths get `404.html`.
Attach `rofit.site` under the Worker's *Domains & Routes*.

**Cloudflare Pages** (recommended: it honours `_headers`)
1. Create a Pages project from this repository.
2. Build command `node site/build.mjs`, output directory `site/dist`, Node 20 or newer.
3. Add the custom domain `rofit.site` and point the domain's DNS at Cloudflare as it instructs.

**Netlify** works the same way (`_headers` is honoured). **GitHub Pages** can serve `site/dist` (CNAME included) but
ignores `_headers`; the `<meta>` CSP still applies, without `frame-ancestors`.

Release order: merge the extension release to `main` first, since the download button points at
`https://github.com/zeniyaxe/rofit/archive/refs/heads/main.zip`, then deploy the site.
