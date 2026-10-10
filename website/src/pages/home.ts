import { arrow, esc, md, page, type Ctx } from './lib.ts';
import { hero, sortSection } from './home-top.ts';
import { demoSection, honestySection } from './home-mid.ts';

function privacySection(c: Ctx): string {
  const f = c.facts;
  const why: Record<string, string> = {
    storage: 'Saves your settings in the browser.',
    alarms: 'Runs a once-a-day tidy-up of old cached images and history.',
    activeTab: 'Lets the toolbar popup read the current tab’s address to offer “open this profile’s outfits”.',
  };
  const unknownPerm = f.permissions.filter((p) => !why[p]);
  if (unknownPerm.length) throw new Error(`home.ts: explain these new permissions before building: ${unknownPerm.join(', ')}`);
  const rows = f.permissions.map((p) => `<tr><td>${esc(p)}</td><td>${esc(why[p])}</td></tr>`).join('') +
    `<tr><td>${f.hosts.map(esc).join('<br>')}</td><td>Read-only Roblox APIs: outfit lists and details, images, item data, and (when you’re signed in to Roblox) whether you own an item. No other sites.</td></tr>` +
    `<tr><td>${f.contentScripts.map(esc).join('<br>')}</td><td>Adds the Outfits tab and hanger button to Roblox profile pages.</td></tr>`;
  return `<section class="sec" id="privacy" aria-labelledby="privacy-h">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow reveal">04 · Privacy</span><h2 id="privacy-h" class="reveal" style="--d:1">Read-only, and it stays on your computer.</h2></div>
      <p class="reveal" style="--d:2">RoFit has no servers, no accounts and no analytics. It talks to Roblox and nothing else. This table is generated from the extension’s manifest when the site is built, so it can’t drift from what the browser grants.</p>
    </div>
    <div class="reveal perm-wrap"><table class="perm"><caption class="sr">Permissions RoFit ${esc(f.version)} asks for</caption><thead><tr><th scope="col">Permission</th><th scope="col">Why</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="nevers">
      <div class="never reveal"><b>No analytics or tracking</b><p>No telemetry and no third-party scripts, in the extension or on this site.</p></div>
      <div class="never reveal" style="--d:1"><b>Never changes your account</b><p>It only reads. It can’t wear, buy, trade or edit anything on Roblox.</p></div>
      <div class="never reveal" style="--d:2"><b>Never reads your cookies</b><p>When a Roblox tab is open, requests run inside it so Roblox sees your usual session. RoFit never sees the cookie itself.</p></div>
      <div class="never reveal"><b>No remote code</b><p>Everything it runs ships inside the extension, and its security policy allows only its own scripts.</p></div>
      <div class="never reveal" style="--d:1"><b>Kept on this computer</b><p>Cache, history and your library live in the browser. Clear any of them in Settings, or export a backup.</p></div>
      <div class="never reveal" style="--d:2"><b>Open source</b><p>All of it is on GitHub under the MIT License, so every claim here can be checked.</p></div>
    </div>
    <p class="more-link reveal"><a href="${c.base}privacy/">Read the full privacy policy ${arrow}</a></p>
  </div>
</section>`;
}

function installSection(c: Ctx): string {
  const f = c.facts;
  const zipUrl = `${f.repo}/raw/main/release/${f.zip}`;
  const kb = Math.round(f.zipBytes / 1024);
  const cl = f.changelog[0];
  return `<section class="sec install" id="install" aria-labelledby="install-h">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">05 · Install</span><h2 id="install-h">Free. About a minute to set up.</h2></div>
      <p>RoFit isn’t in the Chrome Web Store, so it’s installed the developer way: download, unzip, load. It doesn’t update itself; new versions are posted here and on GitHub.</p>
    </div>
    <div class="browser-state" data-min="${esc(f.minChrome)}" role="status"><span class="dot" aria-hidden="true"></span><div><b>For desktop Chrome, Edge and Brave</b><p>RoFit runs in Chromium browsers, version ${esc(f.minChrome)} or newer, on a computer. Phones and tablets can’t run it.</p></div></div>
    <ol class="steps">
      <li><h3>Download and unzip</h3><p>Unzip into a folder you’ll keep. The browser loads RoFit from that folder.</p><a class="btn" href="${zipUrl}">Download ${esc(f.version)} <span class="mono">.zip · ${kb} KB</span></a></li>
      <li><h3>Open your extensions page</h3><p>Type this into the address bar, then switch on <b>Developer mode</b>.</p><p><code data-ext-url>chrome://extensions</code> <button class="copy" type="button" data-copy="chrome://extensions" hidden>Copy</button></p></li>
      <li><h3>Load unpacked</h3><p>Click <b>Load unpacked</b> and choose the unzipped folder. Then open any Roblox profile: <b>Outfits</b> appears next to About.</p></li>
    </ol>
    <div class="two install-more">
      <div>
        <h3>Updating</h3>
        <p>Download the new zip, replace the contents of the same folder, then press the reload button on RoFit’s card on the extensions page. The browser keeps your settings and library as long as RoFit is loaded from the same place. Export a backup first to be safe.</p>
        <p class="install-links"><a class="btn ghost sm" href="${f.repo}">Source on GitHub ${arrow}</a> <a class="btn ghost sm" href="${f.repo}#install">Build it yourself</a></p>
      </div>
      <details class="changes"><summary>What’s new in ${esc(cl.title)}</summary><div class="changes-body">${md(cl.body)}</div></details>
    </div>
    <p class="fine">${esc(f.zip)} · ${f.zipBytes.toLocaleString('en-US')} bytes · SHA-256 ${f.zipSha}<br>Manifest V3 · minimum Chrome ${esc(f.minChrome)} · bundled libraries: ${f.deps.map(esc).join(', ')}</p>
  </div>
</section>`;
}

export function home(c: Ctx): string {
  const body = [hero(c), sortSection(), demoSection(), honestySection(), privacySection(c), installSection(c)].join('\n');
  return page(c, {
    path: 'index.html', title: 'RoFit · Every saved Roblox outfit, taken apart',
    description: 'RoFit is a free, open-source browser extension that opens the outfits people saved on their Roblox profile: every item, today’s prices, and how sure it is about each one. Read-only, no tracking.',
    body,
  });
}