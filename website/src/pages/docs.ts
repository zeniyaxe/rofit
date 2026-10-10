/** Privacy, terms, security, support and licenses. Every statement here is checkable against the repository. */
import { doc, esc, type Ctx } from './lib.ts';

const UPDATED = '10 October 2026';
const gh = (c: Ctx, p = '') => c.facts.repo + p;

export function privacy(c: Ctx): string {
  const f = c.facts;
  return doc(c, {
    path: 'privacy/index.html', nav: 'privacy', eyebrow: 'Privacy policy', title: 'Privacy', updated: UPDATED,
    description: 'What RoFit and this website do with data: RoFit keeps everything in your browser, talks only to Roblox, and has no analytics.',
    summary: 'RoFit has no servers and collects nothing. What it learns from Roblox stays in your browser. This website sets no cookies and runs no analytics.',
    sections: [
      { id: 'who', h: 'Who this covers', html: `<p>This policy covers the RoFit browser extension (version ${esc(f.version)}) and this website. RoFit is an independent open-source project published at <a href="${gh(c)}">${gh(c).replace('https://', '')}</a>. It is not run by, or affiliated with, Roblox Corporation.</p>` },
      { id: 'collect', h: 'What we collect', html: `<p><strong>Nothing.</strong> The developer of RoFit receives no data from the extension or the website: there is no account, no analytics, no telemetry, no crash reporting and no server operated for RoFit.</p>` },
      { id: 'extension', h: 'What the extension does with data', html: `
        <h3>What it reads</h3>
        <ul>
          <li>On <code>https://www.roblox.com/*</code> pages, the address of the page, to recognise a profile and its user ID, and to add the Outfits tab and button.</li>
          <li>From Roblox’s read-only APIs (${f.hosts.map((h) => `<code>${esc(h)}</code>`).join(', ')}): outfit lists and details, outfit and item images, item names, prices and sale status, and, if you are signed in to Roblox, your user ID and whether you own particular items.</li>
          <li>When you click the toolbar button, the current tab’s address (the <code>activeTab</code> permission), to offer that profile’s outfits.</li>
        </ul>
        <h3>Your Roblox session</h3>
        <p>When a roblox.com tab is open, requests to Roblox are made from inside it so that your browser attaches your normal Roblox session, exactly as roblox.com itself would. Otherwise they come from RoFit’s background worker, which Roblox sees as signed out. RoFit never reads, stores or sends your cookies or tokens. That tab only forwards requests to the six Roblox API hosts above, and only on behalf of RoFit. All requests are reads; RoFit has no feature that changes anything on your account.</p>
        <h3>Where it is kept</h3>
        <table><thead><tr><th>What</th><th>Where</th><th>How long</th></tr></thead><tbody>
          <tr><td>Settings</td><td><code>chrome.storage.local</code></td><td>Until you change them or remove RoFit</td></tr>
          <tr><td>Cache: profiles you viewed, outfit lists and details, item records</td><td>IndexedDB database <code>rofit</code> in your browser profile</td><td>Item records are kept so RoFit can show “last known” data; clear them in Settings</td></tr>
          <tr><td>Image links</td><td>Same database</td><td>Removed by a daily tidy-up after 7 days</td></tr>
          <tr><td>Change history (snapshots)</td><td>Same database</td><td>Limited per outfit by the “Snapshots per outfit” setting; can be turned off</td></tr>
          <tr><td>Your library of saved outfits</td><td>Same database</td><td>Until you delete it</td></tr>
        </tbody></table>
        <p>None of this leaves your computer unless you export it yourself (Settings → Export backup, or the export buttons in the inspector). Settings → Privacy and storage clears the cache, history, library, or everything. Removing the extension removes all of it.</p>
        <h3>Diagnostics</h3>
        <p>Settings → Diagnostics can copy a short technical report to your clipboard for a bug report. It contains RoFit’s version, your browser’s user-agent string and which Roblox features worked, and never cookies, tokens or outfit contents. It is only shared if you paste it somewhere yourself.</p>` },
      { id: 'roblox', h: 'Roblox', html: `<p>Because RoFit asks Roblox for data, Roblox receives those requests from your browser, as it does when you browse roblox.com. Roblox’s handling of that is covered by <a href="https://www.roblox.com/info/privacy">Roblox’s privacy policy</a>. RoFit respects Roblox’s outfit-privacy setting: if Roblox refuses to show someone’s outfits to you, RoFit shows the refusal and does not try another way.</p>` },
      { id: 'website', h: 'This website', html: `<p>This site is static HTML, CSS, fonts and scripts served from one origin. It sets no cookies, uses no local storage or IndexedDB, runs no analytics and loads nothing from third parties; its content security policy blocks any other origin. The interactive demo runs entirely in your tab against invented sample data and sends nothing anywhere.</p><p>The company hosting the site may keep ordinary server logs (such as IP address, time and page requested) to operate and protect its service. Those logs are controlled by the host, not by RoFit.</p>` },
      { id: 'children', h: 'Children', html: `<p>Many Roblox players are children. RoFit collects no personal information from anyone, of any age. Anything it stores stays in the browser where it was used.</p>` },
      { id: 'changes', h: 'Changes and contact', html: `<p>If RoFit ever starts handling data differently, this page will change before or with that release, and the change will be listed in the <a href="${gh(c, '/blob/main/CHANGELOG.md')}">changelog</a>. This page’s history is public in the repository. Questions: <a href="${gh(c, '/issues')}">open an issue on GitHub</a>.</p>` },
    ],
  });
}

export function terms(c: Ctx): string {
  return doc(c, {
    path: 'terms/index.html', nav: 'terms', eyebrow: 'Terms of use', title: 'Terms', updated: UPDATED,
    description: 'The terms for using RoFit and this website: free, open source, MIT licensed, provided as is, and not affiliated with Roblox.',
    summary: 'RoFit is free, open-source software under the MIT License. Use it at your own risk, and use it in line with Roblox’s own rules.',
    sections: [
      { id: 'license', h: 'License', html: `<p>RoFit’s source code is licensed under the <a href="${gh(c, '/blob/main/LICENSE')}">MIT License</a>. That license, not this page, governs the software, including its warranty disclaimer: the software is provided “as is”, without warranty of any kind.</p>` },
      { id: 'roblox', h: 'Roblox', html: `<p>RoFit is not affiliated with, endorsed, sponsored or approved by Roblox Corporation. Roblox is a trademark of Roblox Corporation. RoFit only reads information that Roblox makes available to you in your browser. You remain responsible for following <a href="https://www.roblox.com/info/terms">Roblox’s Terms of Use</a> when you use Roblox, with or without RoFit.</p>` },
      { id: 'use', h: 'Acceptable use', html: `<ul><li>Don’t use RoFit to harass, track or target other people.</li><li>Don’t use it, or modified versions of it, to get around Roblox’s privacy settings, rate limits or other protections. RoFit is designed not to.</li><li>Prices and availability come from Roblox and can change at any moment; RoFit’s totals are informational, not offers.</li></ul>` },
      { id: 'data', h: 'Accuracy', html: `<p>RoFit labels every piece of item data with where it came from (live, cached, last known or unknown) and never fills in prices it doesn’t have. Even so, Roblox’s data can be incomplete or wrong, and RoFit can have bugs. Check on Roblox before buying anything.</p>` },
      { id: 'site', h: 'This website and the demo', html: `<p>The demo on this site uses invented sample data. Outfit names, item names, creators, user names and prices in it are fictional and do not describe real Roblox items. The website’s text and design are © RoFit contributors; the source is in the same repository.</p>` },
      { id: 'changes', h: 'Changes', html: `<p>These terms may be updated; the date at the top shows the latest version and the full history is public on GitHub.</p>` },
    ],
  });
}

export function security(c: Ctx): string {
  const f = c.facts;
  return doc(c, {
    path: 'security/index.html', nav: 'security', eyebrow: 'Security', title: 'Security', updated: UPDATED,
    description: 'How RoFit is built to be safe, and how to report a security problem.',
    summary: 'RoFit is read-only, runs no remote code, and talks to six Roblox API hosts only. If you find a problem, please report it privately first.',
    sections: [
      { id: 'report', h: 'Reporting a vulnerability', html: `<p>Please don’t post exploit details publicly before there is a fix.</p><ol><li>Use GitHub’s private reporting: <a href="${gh(c, '/security/advisories/new')}">report a vulnerability</a>.</li><li>If that page says private reporting isn’t available, <a href="${gh(c, '/issues/new')}">open an issue</a> titled “Security contact request” with <strong>no details</strong>, and the maintainer will arrange a private channel.</li></ol><p>RoFit is a volunteer project: there is no bug bounty, and response times aren’t guaranteed. Reports are credited in the changelog if you want.</p>` },
      { id: 'design', h: 'How it’s built', html: `<ul>
        <li><strong>Read-only.</strong> Every Roblox request is a read. The one POST (<code>catalog.roblox.com/v1/catalog/items/details</code>) is a lookup that Roblox requires to carry a CSRF token; it changes nothing.</li>
        <li><strong>Narrow permissions.</strong> <code>${f.permissions.map(esc).join('</code>, <code>')}</code>, plus host access to ${f.hosts.length} Roblox API hosts and a content script on <code>www.roblox.com</code>. No <code>cookies</code>, <code>tabs</code>, <code>webRequest</code> or all-sites access.</li>
        <li><strong>No remote code.</strong> Extension pages use the policy <code>${esc(f.csp)}</code>; there is no <code>eval</code> and nothing is downloaded and run.</li>
        <li><strong>Allow-listed relay.</strong> The roblox.com tab only relays requests from RoFit’s own background worker, and only to the allow-listed hosts.</li>
        <li><strong>Isolated storage.</strong> RoFit’s database belongs to the extension and can’t be read by roblox.com pages.</li>
        <li><strong>Small supply chain.</strong> Two bundled libraries (${f.deps.map(esc).join(', ')}); everything else is build-time tooling.</li>
      </ul>` },
      { id: 'verify', h: 'Verifying your download', html: `<p>The release zip is built from the repository with <code>npm run build</code> and <code>npm run zip</code>. Compare your download with:</p><table><tbody><tr><th>File</th><td><code>${esc(f.zip)}</code></td></tr><tr><th>Size</th><td>${f.zipBytes.toLocaleString('en-US')} bytes</td></tr><tr><th>SHA-256</th><td><code>${f.zipSha}</code></td></tr></tbody></table><p>On Windows: <code>certutil -hashfile ${esc(f.zip)} SHA256</code>. On macOS or Linux: <code>shasum -a 256 ${esc(f.zip)}</code>.</p>` },
      { id: 'website', h: 'This website', html: `<p>Static files only, with a content security policy that allows nothing but this site’s own scripts, styles, fonts and images. No forms, no cookies, no third-party requests.</p>` },
      { id: 'scope', h: 'Out of scope', html: `<p>Problems in Roblox itself should go to Roblox. Issues that require a modified copy of RoFit or an already-compromised computer are usually out of scope, but tell us if you’re unsure.</p>` },
    ],
  });
}

export function support(c: Ctx): string {
  return doc(c, {
    path: 'support/index.html', nav: 'support', eyebrow: 'Support', title: 'Support', updated: UPDATED,
    description: 'Help with installing and using RoFit, common questions, and how to report a bug.',
    summary: 'Most questions are answered below. For anything else, open an issue on GitHub. RoFit is a volunteer project, so please be patient.',
    sections: [
      { id: 'no-outfits', h: 'A profile shows no outfits', html: `<p>Since November 2025, Roblox lets people limit who can see their saved outfits. An empty list can mean the person saved none, or that Roblox won’t show them to you. RoFit’s “Why no outfits?” screen shows what Roblox actually said, whether it saw you as signed in, and whether only presets came back. RoFit can’t and won’t get around a refusal.</p><p>If you expected to see a friend’s outfits, make sure you’re signed in to roblox.com in the same browser and have a roblox.com tab open.</p>` },
      { id: 'presets', h: 'Where are the default outfits?', html: `<p>Outfits supplied by Roblox (presets) are hidden by default so you see what the person saved. Turn on Settings → Show Roblox presets to include them.</p>` },
      { id: 'prices', h: 'A price says “unknown” or “last known”', html: `<p><strong>Last known</strong>: Roblox stopped returning the item (often deleted or moderated); RoFit shows what it saw earlier and leaves it out of totals. <strong>Unknown</strong>: Roblox returned nothing and RoFit never saw it. Neither is guessed.</p>` },
      { id: 'slow', h: '“Roblox asked RoFit to slow down”', html: `<p>Roblox rate-limits requests. RoFit backs off on its own and continues when allowed; nothing is lost. “Look inside” is paced to avoid this.</p>` },
      { id: 'install', h: 'Installing and updating', html: `<ul><li>RoFit needs desktop Chrome, Edge or Brave, version ${esc(c.facts.minChrome)} or newer. Firefox, Safari and mobile browsers aren’t supported.</li><li>“Manifest file is missing or unreadable”: choose the folder that directly contains <code>manifest.json</code>, not the zip or a parent folder.</li><li>Updates are manual: replace the folder’s contents with the new version and press reload on the extensions page.</li><li>Don’t delete the folder after installing; the browser loads RoFit from it.</li></ul>` },
      { id: 'remove', h: 'Removing RoFit', html: `<p>Open your extensions page and click Remove on RoFit. That deletes its settings, cache and library from the browser; export a backup first if you want to keep your library.</p>` },
      { id: 'bugs', h: 'Reporting a bug', html: `<p><a href="${gh(c, '/issues/new')}">Open an issue on GitHub</a> with what you did, what you expected and what happened. Settings → Diagnostics → Copy diagnostics adds useful technical details (no cookies, tokens or outfit contents). Please don’t include other people’s private information. For security problems, see <a href="${c.base}security/">Security</a>.</p>` },
    ],
  });
}

export function licenses(c: Ctx, texts: { mit: string; preact: string; lucide: string }): string {
  const pre = (t: string) => `<pre class="license">${esc(t.trim())}</pre>`;
  return doc(c, {
    path: 'licenses/index.html', nav: 'licenses', eyebrow: 'Open source', title: 'Licenses', updated: UPDATED,
    description: 'Licenses for RoFit, its bundled libraries and the fonts used on this website.',
    summary: 'RoFit is MIT licensed. These are the licenses of everything it and this website ship.',
    sections: [
      { id: 'rofit', h: 'RoFit (MIT)', html: pre(texts.mit) },
      { id: 'preact', h: 'Preact (MIT)', html: `<p>Bundled in the extension and the demo.</p>${pre(texts.preact)}` },
      { id: 'lucide', h: 'Lucide icons (ISC)', html: `<p>Icons in the extension and the demo.</p>${pre(texts.lucide)}` },
      { id: 'fonts', h: 'Fonts (SIL OFL 1.1)', html: `<p>This website uses subsets of <strong>Bricolage Grotesque</strong> (© The Bricolage Grotesque Project Authors) and <strong>JetBrains Mono</strong> (© The JetBrains Mono Project Authors), both under the SIL Open Font License 1.1, self-hosted from this site. Full texts: <a href="${c.base}fonts/OFL-BricolageGrotesque.txt">Bricolage Grotesque</a>, <a href="${c.base}fonts/OFL-JetBrainsMono.txt">JetBrains Mono</a>.</p>` },
      { id: 'art', h: 'Illustrations', html: `<p>The figures and item drawings on this site are original, generated by code in the repository (<code>website/src/demo/art.ts</code>) and covered by RoFit’s MIT License. They are not Roblox assets.</p>` },
    ],
  });
}