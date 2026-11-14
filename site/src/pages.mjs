// Page bodies for rofit.site. Static copy only; anything that comes from data is passed through esc().
// Claims here are checked against the extension's code — if a feature changes, change its sentence too.
import { esc, icon, REPO } from './layout.mjs';

export const ZIP = `${REPO}/archive/refs/heads/main.zip`;

const fig = (c) => `<span class="fig c${c}"></span>`;

function heroArt() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8].map((c) => `<div class="faux-card${c === 2 ? ' on' : ''}"><div class="th">${fig(c)}</div><div class="t"></div></div>`).join('');
  return `<div class="faux" role="img" aria-label="Illustration: RoFit on a Roblox profile, with a grid of saved outfits and one outfit open showing its items and prices">
<div class="faux-bar" aria-hidden="true"><i></i><i></i><i></i><span>roblox.com/users/…/profile</span></div>
<div aria-hidden="true">
<div class="faux-head"><span class="faux-av"></span><span class="faux-name">pixelpanda</span><span class="faux-tabs"><span>About</span><span>Creations</span><b>Outfits</b></span></div>
<div class="faux-body">
<div class="faux-main"><div class="faux-tools"><span></span><span></span><span></span></div><div class="faux-grid">${cards}</div></div>
<div class="faux-side"><div class="th">${fig(2)}</div><div class="ttl">Weekend fit</div>
<div class="faux-chips"><span>R15</span><span>9 items</span><span class="ok">Public</span></div>
<div class="faux-row r1"><i></i><span></span><em>R$ 75</em></div>
<div class="faux-row r2"><i></i><span></span><em>R$ 120</em></div>
<div class="faux-row r3"><i></i><span></span><em class="off">Off sale</em></div>
<div class="faux-row r4"><i></i><span></span><em>Free</em></div>
</div>
</div>
</div>
</div>`;
}

const card = (ic, title, text) => `<div class="card"><div class="ic">${icon(ic)}</div><h3>${title}</h3><p>${text}</p></div>`;

export function home({ version }) {
  return `<div class="wrap">
<section class="hero">
<div>
<span class="eyebrow rise">Free browser extension for Roblox</span>
<h1 class="rise d1">See every outfit people save on Roblox.</h1>
<p class="lede rise d2">RoFit adds an Outfits view to Roblox profiles. Browse someone’s saved looks, take one apart item by item with prices, compare two side by side, and keep the ones you like in a library on your own computer.</p>
<div class="btns rise d3"><a class="btn primary" href="/download/">${icon('Download')}Get RoFit, free</a><a class="btn" href="/features/">See what it does</a></div>
<p class="meta rise d3">Version ${esc(version)} · Chrome, Edge and Brave · Open source (MIT) · No account, no tracking</p>
</div>
${heroArt()}
</section>
</div>

<section class="section"><div class="wrap">
<h2>How it works</h2>
<ol class="steps">
<li><h3>Install the extension</h3><p>Download it from GitHub and load it into Chrome, Edge or Brave. It takes about a minute.</p></li>
<li><h3>Open any profile</h3><p>RoFit adds <b>Outfits</b> to roblox.com profiles, or a <b>Saved Outfits</b> row where Roblox shows no tabs.</p></li>
<li><h3>Explore, compare, keep</h3><p>Search inside every outfit, see what each item costs, and save looks to your library.</p></li>
</ol>
</div></section>

<section class="section"><div class="wrap">
<h2>Everything about an outfit, in one place</h2>
<div class="grid3">
${card('Search', 'Explorer', 'Grid or list in three sizes. Search forgives typos and, once outfits are read, looks inside them: items, creators, prices.')}
${card('ScanSearch', 'Inspector', 'Every item grouped by kind, what the look costs to recreate, what’s off sale, body colors and scale.')}
${card('GitCompareArrows', 'Compare', 'Two outfits side by side or with a slider: what they share, what’s only in each, and how the cost differs.')}
${card('Library', 'Library', 'Keep looks in collections with favorites, tags and notes. Stored on your computer, backed up as one file.')}
${card('Share2', 'Share links', 'Send one outfit as a link. The outfit travels inside the link itself, so rofit.site never stores it.')}
${card('Command', 'Fast to drive', 'Ctrl K jumps to any outfit, profile or action. Shortcuts for the common things and a calm motion mode.')}
</div>
</div></section>

<section class="section"><div class="wrap">
<h2>Honest about what it knows</h2>
<p class="lede">Roblox decides who can see whose outfits. RoFit shows what Roblox shows you, labels where each fact came from, and says so when it can’t know.</p>
<ul class="honest">
<li>${icon('Lock')}<div><b>Private stays private.</b> If Roblox won’t show someone’s outfits to you, RoFit won’t either, not even copies it saw on an earlier visit.</div></li>
<li>${icon('Eye')}<div><b>Every list has a visibility label.</b> Public, Visible to you, Private or Visibility unknown, based on what Roblox actually returned.</div></li>
<li>${icon('Coins')}<div><b>Prices you can trust.</b> Buy-new and resale prices are kept apart. Items without a known price are counted, never guessed.</div></li>
<li>${icon('History')}<div><b>History means “what RoFit saw”.</b> Roblox doesn’t publish outfit edit history, so RoFit records the changes it noticed on your computer, and says exactly that.</div></li>
</ul>
</div></section>

<section class="wrap"><div class="cta">
<div><h2>Ready when you are.</h2><p>Free and open source. It never asks for your Roblox password.</p></div>
<div class="btns"><a class="btn" href="/download/">Get RoFit</a><a class="btn ghost" href="/docs/">Read the docs</a></div>
</div></section>`;
}

const feat = (id, eyebrow, title, lede, bullets, art) => `<section class="feat" id="${id}">
<div><h2>${title}</h2><p class="muted">${lede}</p><ul>${bullets.map((b) => `<li>${b}</li>`).join('')}</ul></div>
<div class="feat-art" aria-hidden="true">${art}</div>
</section>`;

const row = (cls, name, sub, right = '') => `<div class="faux-row ${cls}"><i></i><span>${name}${sub ? ` <small>${sub}</small>` : ''}</span>${right}</div>`;

export function features() {
  return `<div class="wrap">
<header class="page-head narrow-left"><h1>What RoFit does</h1>
<p class="lede">Browse saved outfits, find the pieces you like, and keep your favorite looks.</p></header>

<nav class="feature-nav" aria-label="Explore features"><a href="/#try">Try the demo</a><a href="#profiles">Profiles</a><a href="#explorer">Search</a><a href="#inspector">Inspect</a><a href="#compare">Compare</a><a href="#library">Library</a><a href="#share">Share</a><a href="/docs/">Read the docs</a></nav>

${feat('profiles', 'On every profile', 'Right where you already look', 'RoFit fits into roblox.com instead of sending you somewhere else.', [
  'An <b>Outfits</b> tab next to About and Creations, styled like Roblox’s own.',
  'On Roblox’s newer profile layout, which has no tabs, a <b>Saved Outfits</b> row under Currently Wearing.',
  'A <b>hanger button</b> by the profile’s ⋯ menu, and a toolbar popup that finds anyone by username, user ID or profile link.',
  'Keeps working as Roblox re-renders the page or you move between profiles.',
], `<div class="mini">${row('r2', 'Outfits', '· 24 saved looks')}${row('r1', 'Saved Outfits', '· Browse their saved outfits →')}<div class="mini-search">${icon('Search')}<span>pixelpanda</span></div></div>`)}

${feat('explorer', 'Explorer', 'Browse a whole wardrobe at once', 'Grid or list, three sizes, arrow keys to move around. Roblox’s own preset outfits stay hidden unless you ask for them.', [
  '<b>Read every outfit</b> with one click (one request per outfit, paced for Roblox’s limits) to search by item or creator, filter by price and sort by cost.',
  'Search that forgives typos and understands <code>"exact phrases"</code>, <code>-exclusions</code> and <code>#IDs</code>.',
  'Filters for avatar type, kinds of item, price range, limiteds, and whether a look is already in your library.',
  'The <b>Items</b> view lists every item across the outfits, how often each is reused, and near-duplicate looks.',
], `<div class="mini"><div class="mini-search">${icon('Search')}<span>hard <span class="mini-hit">hat</span></span></div>${row('r1', 'Construction day', '· Builders Club Hard <b>Hat</b>')}${row('r2', 'Weekend fit', '· Hard <b>Hat</b> (2008)')}${row('r3', '3 outfits', '· 1 filter: Up to R$ 500')}</div>`)}

${feat('inspector', 'Inspector', 'Take any outfit apart', 'Open an outfit to see exactly what it’s made of, with each fact labelled by where it came from.', [
  'The full render, then every item grouped by kind, with thumbnails and links to the Marketplace.',
  '<b>Cost to recreate</b>: buy-new and resale totals kept apart; off-sale items and unknown prices are counted, not guessed.',
  '<b>What do I own?</b> marks the items you already have, when you’re signed in to Roblox.',
  'Body colors and scale, similar outfits from the profile and your library, and <b>history</b>: what changed since RoFit last saw it.',
  'Copy or download the item list as JSON, or as a Roblox Studio script.',
], `<div class="mini">${row('r1', 'Builders Club Hard Hat', '· Hat', '<em class="off">Off sale</em>')}${row('r2', 'Blue Hoodie', '· Shirt', '<em>R$ 5</em>')}${row('r3', 'Jeans', '· Pants', '<em>R$ 5</em>')}${row('r4', 'Smile', '· Face', '<em>Free</em>')}</div>`)}

${feat('compare', 'Compare', 'Spot the difference', 'Pick two outfits, or one outfit and what you’re wearing, and see them together.', [
  'Side by side, or a <b>slider</b> that wipes from one render to the other.',
  'What’s in both, what’s only in each, and the share of items they have in common.',
  'Compare with <b>what you’re wearing</b> right now (needs you signed in to Roblox).',
  'Copy the differences as text to paste anywhere.',
], `<div class="cmp"><div class="th">${fig(3)}</div><div class="pct">64%<small>items shared</small></div><div class="th">${fig(5)}</div></div>`)}

${feat('library', 'Library', 'Keep the looks you like', 'Your library lives in your browser, on your computer. Nothing is uploaded anywhere.', [
  'Collections you can rename, delete or move outfits between; favorites, tags and notes.',
  'Select several to favorite, move, tag, export or remove in one go.',
  'Each saved outfit keeps its own copy of its item data, so clearing RoFit’s cache never breaks your library.',
  '<b>Back up</b> everything to one file. Importing shows what will be added before anything changes.',
], `<div class="mini">${row('r2', 'Weekend fit', '· pixelpanda · ★')}${row('r4', 'Red carpet', '· in “Formal”')}${row('r1', 'Construction day', '· tag: classic')}</div>`)}

${feat('share', 'Share links', 'Send an outfit, not an account', 'A share link is a snapshot of one outfit packed into the link itself.', [
  'The outfit sits after the <code>#</code> in the link, a part browsers never send to a server. rofit.site can show it but never receives it.',
  'Anyone can open the link on rofit.site; with RoFit installed, <b>Save to RoFit</b> imports it after you confirm in RoFit.',
  'Links show what you saw when you made them. For outfits RoFit can’t confirm are public, it asks you first.',
], `<div class="share-art"><div class="share-url">https://rofit.site/o/<b>#1.jVPLbts…</b></div><div class="btns"><span class="btn sm primary">Save to RoFit</span><span class="btn sm">Copy link</span></div></div>`)}

${feat('visibility', 'Visibility', 'Always clear about who can see what', 'Since late 2025, Roblox lets people limit who sees their outfits. RoFit labels every list with what it observed.', [
  '<b>Public</b>: Roblox shows the list to people who aren’t signed in. RoFit checks with one extra request made without your session (you can turn this off).',
  '<b>Visible to you</b>: Roblox shows it because of your account, for example because you’re friends.',
  '<b>Private</b>: Roblox won’t show it to you. RoFit doesn’t work around that, and hides copies it saw before.',
  '<b>Visibility unknown</b>: RoFit couldn’t tell, and says so instead of guessing.',
], `<div class="states"><div><span class="badge ok">Public</span><br>Anyone can see these</div><div><span class="badge accent">Visible to you</span><br>Because of your account</div><div><span class="badge warn">Private</span><br>Roblox won’t show them</div><div><span class="badge">Visibility unknown</span><br>RoFit couldn’t tell</div></div>`)}

${feat('keyboard', 'Comfort', 'Quick with a keyboard, easy on the eyes', 'RoFit is built to be driven quickly and to stay comfortable to look at.', [
  '<kbd>Ctrl</kbd> <kbd>K</kbd> command palette, <kbd>/</kbd> search, <kbd>J</kbd> and <kbd>K</kbd> for next and previous, <kbd>S</kbd> save, <kbd>C</kbd> compare, <kbd>?</kbd> for the full list.',
  'Motion you choose: System, Full, Balanced or Calm, with a live preview. Calm keeps gentle fades and drops movement.',
  'Light, dark and OLED themes; Auto follows Roblox’s own theme.',
], `<div class="mini">${row('r2', '<kbd>Ctrl</kbd> <kbd>K</kbd>', '· Jump to anything')}${row('r1', '<kbd>/</kbd>', '· Search')}${row('r3', '<kbd>?</kbd>', '· All shortcuts')}</div>`)}

<div class="cta"><div><h2>Try it on a profile you know.</h2><p>Installing takes about a minute.</p></div><div class="btns"><a class="btn" href="/download/">Get RoFit</a><a class="btn ghost" href="/docs/">Read the docs</a></div></div>
</div>`;
}

const PERMS = [
  ['Read Roblox’s outfit, avatar, thumbnail, catalog, economy, inventory and user APIs', 'To load outfits, item data, prices, renders and (when you’re signed in) ownership. Read-only: RoFit never buys, equips or changes anything.'],
  ['Run on www.roblox.com', 'To add Outfits to profiles, and to send Roblox requests from a Roblox tab so they carry your session the way the website does.'],
  ['Run on rofit.site', 'So this site can tell RoFit is installed and ask it to open its import screen for a share link. It can’t read anything from RoFit.'],
  ['Storage', 'Settings, your library and a cache, all kept in your browser.'],
  ['Alarms', 'A daily tidy-up of old cache entries.'],
  ['Active tab', 'So the toolbar popup can offer the profile you’re looking at.'],
];

export function download({ version }) {
  return `<div class="narrow">
<header class="page-head"><h1>Install RoFit</h1>
<p class="lede">RoFit isn’t in the Chrome Web Store yet, so you install it straight from GitHub. It takes about a minute and works in Chrome, Edge, Brave and other Chromium browsers (version 113 or newer).</p></header>
<div class="btns"><a class="btn primary" href="${ZIP}">${icon('Download')}Download RoFit ${esc(version)} (.zip)</a><a class="btn" href="${REPO}">${icon('ExternalLink')}Source on GitHub</a></div>
<div class="note detect" id="detect" role="status" hidden></div>

<div class="prose mt">
<h2 id="install">Install</h2>
<ol class="install">
<li><div><h3>Unzip the download</h3><p>Put the folder somewhere it can stay, like <code>Documents\\RoFit</code>. Your browser loads RoFit from this folder every time it starts, so don’t delete or move it.</p></div></li>
<li><div><h3>Open your browser’s extensions page</h3><p>Type this into the address bar (browsers don’t let websites link to it):</p>
<div class="copyline"><code>chrome://extensions</code><button class="btn sm" type="button" data-copy="chrome://extensions">${icon('Copy')}Copy</button></div>
<p class="small muted">Edge: <code>edge://extensions</code> · Brave: <code>brave://extensions</code></p></div></li>
<li><div><h3>Turn on Developer mode</h3><p>The switch is in the top-right corner (in Edge, it’s in the left sidebar).</p></div></li>
<li><div><h3>Click “Load unpacked”</h3><p>Choose the <code>dist</code> folder inside the folder you unzipped: <code>rofit-main\\dist</code>. RoFit opens a short welcome page.</p></div></li>
<li><div><h3>Open any Roblox profile</h3><p>Look for <b>Outfits</b> on the profile. To search from the toolbar, pin RoFit from the puzzle-piece menu.</p></div></li>
</ol>

<h2 id="update">Updating</h2>
<p>Download the new ZIP, replace the files <b>in the same folder</b>, then press the reload button on RoFit’s card in the extensions page.</p>
<div class="note warn"><p><b>Keep the same folder.</b> For extensions installed this way, the browser ties RoFit’s storage, including your library, to the folder it was loaded from. Loading a copy from a different folder starts with an empty library, and removing RoFit deletes its data. Before updating, export a backup: <b>Settings → Library &amp; data → Export backup</b>.</p></div>

<h2 id="build">Build it yourself</h2>
<p>The ZIP also contains the source. On Windows, double-click <code>setup.bat</code>: it installs what’s needed, builds RoFit and walks you through Load unpacked. Anywhere else, with Node.js 20 or newer:</p>
<pre><code>npm ci
npm run build    # the extension is now in dist/</code></pre>

<h2 id="permissions">What RoFit can access</h2>
<div class="tablewrap"><table><thead><tr><th>Permission</th><th>Why</th></tr></thead><tbody>
${PERMS.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('\n')}
</tbody></table></div>
<p>No remote code, no analytics, no accounts. Read the <a href="/privacy/">privacy policy</a> for the details.</p>
</div>
</div>`;
}

const SHORTCUTS = [
  [['/'], 'Search'], [['Ctrl', 'K'], 'Command palette: outfits, library, profiles and actions (⌘ K on a Mac)'], [['?'], 'Keyboard shortcuts'],
  [['Esc'], 'Clear the search, close the panel on top, or close RoFit'], [['←', '→', '↑', '↓'], 'Move between outfits'],
  [['Enter'], 'Open the focused outfit'], [['Space'], 'Select the focused outfit'], [['Shift', 'Click'], 'Select several'],
  [['J'], 'Next outfit, while one is open'], [['K'], 'Previous outfit, while one is open'],
  [['S'], 'Save or unsave the open outfit'], [['C'], 'Compare the open outfit with another'],
];

const ACCESS_ROWS = [
  ['Your outfits', 'You’re signed in as this account, so you see everything it has saved.'],
  ['Public', 'Roblox shows these outfits to anyone, including people who aren’t signed in. RoFit checked by asking once without your session.'],
  ['Visible to you', 'Roblox shows these because of your account (for example, you’re friends). Someone who isn’t signed in can’t see them.'],
  ['Shared with you', 'A snapshot someone sent you. It shows what they saw when they made the link; the live outfit may have changed or be private.'],
  ['Saved earlier', 'RoFit couldn’t reach Roblox just now, so it shows the copy it loaded on an earlier visit.'],
  ['Private', 'Roblox won’t show this account’s outfits to you. RoFit respects that and hides copies it cached earlier too.'],
  ['Unavailable', 'Roblox has no account with this ID. It may be deleted or banned.'],
  ['Visibility unknown', 'RoFit couldn’t tell whether these are public. A share link only carries what you see.'],
];

const TOC = [
  ['start', 'Getting started'], ['open', 'Opening RoFit'], ['explorer', 'Explorer'], ['search', 'Search'], ['inspector', 'Inspector'],
  ['compare', 'Compare'], ['library', 'Library'], ['share-links', 'Share links'], ['visibility', 'Visibility labels'],
  ['keyboard', 'Keyboard'], ['settings', 'Settings'], ['data', 'Your data'], ['troubleshooting', 'Troubleshooting'], ['faq', 'FAQ'],
];

const h2 = (id, text) => `<h2 id="${id}">${text}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h2>`;

export function docs() {
  return `<div class="wrap">
<header class="page-head"><h1>Using RoFit</h1><p class="lede">Get started, find the controls, or <a href="/guides/">browse the illustrated guides</a>.</p></header>
<div class="docs">
<nav class="toc" aria-label="On this page"><h4>On this page</h4><ol>${TOC.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></nav>
<article class="prose">
${h2('start', 'Getting started')}
<p>Install RoFit from the <a href="/download/">download page</a>. After you load it, RoFit opens a short welcome page. Then open any profile on roblox.com.</p>
<p>RoFit works best when you’re signed in to Roblox in the same browser: Roblox then shows you what it shows your account (for example, a friend’s outfits), and RoFit can tell you which items you already own. It works signed out too.</p>

${h2('open', 'Opening RoFit')}
<ul>
<li><b>Outfits tab</b>: on profiles with About and Creations tabs, RoFit adds <b>Outfits</b> next to them.</li>
<li><b>Saved Outfits row</b>: Roblox’s newer profile layout has no tabs; there, RoFit adds a Saved Outfits row under Currently Wearing.</li>
<li><b>Hanger button</b>: next to the profile’s ⋯ menu.</li>
<li><b>Toolbar popup</b>: click RoFit’s icon and type a username, a user ID or a profile link. It also lists profiles you viewed recently and opens your library.</li>
<li><b>From a link</b>: add <code>#rofit</code> to a profile’s address to open RoFit right away, or <code>#rofit/</code> plus an outfit ID to open that outfit.</li>
</ul>
<p>Press <kbd>Esc</kbd> to step back one layer at a time, or the × in RoFit’s top bar to return to the profile.</p>
<p>You can turn the tab or row and the hanger button off in <b>Settings → Profiles</b>.</p>

${h2('explorer', 'Explorer')}
<p>The explorer lists the outfits a person saved, in Roblox’s order. Switch between grid and list, and between three sizes, with the controls on the right of the toolbar.</p>
<ul>
<li><b>Presets are hidden.</b> Roblox mixes its own preset outfits into the list. They weren’t made by the user, so RoFit hides them and shows how many it hid; click the count to show them.</li>
<li><b>Read every outfit.</b> At first RoFit only knows names and renders. The <b>Read</b> button loads each outfit’s details once (one request per outfit, paced for Roblox’s limits; prices follow in batches of 100). That unlocks searching by item and creator, price filters, sorting by cost and the Items view. To do this automatically, turn on <b>Settings → Explorer → Read outfits automatically</b>.</li>
<li><b>Filters</b>: avatar type (R6 or R15), kinds of item, price range, buyable new, limiteds, and whether the look is in your library.</li>
<li><b>Sort</b>: Roblox order, name, most items, most expensive or cheapest. Cost sorting needs prices, so it’s available after reading.</li>
<li><b>Items view</b>: every item across the outfits, how many outfits reuse it, and groups of near-duplicate looks. Click an item to show only the outfits that contain it.</li>
<li><b>Select several</b> with <kbd>Shift</kbd>-click or <kbd>Space</kbd>, then save them all to a collection or compare two.</li>
<li><b>Freshness</b>: “Updated 2m ago” says when Roblox last answered, with a refresh button next to it. If Roblox doesn’t answer, RoFit shows the copy it saved and says so.</li>
</ul>

${h2('search', 'Search')}
<p>Press <kbd>/</kbd> to search. Before outfits are read, search covers their names; afterwards it also covers items, item types and creators. Terms are combined, so every term has to match.</p>
<div class="tablewrap"><table><thead><tr><th>Type</th><th>Finds</th></tr></thead><tbody>
<tr><td><code>hoodie</code></td><td>Names that contain it, start with it, or come close (one typo is forgiven in longer words)</td></tr>
<tr><td><code>"hard hat"</code></td><td>The exact phrase</td></tr>
<tr><td><code>-hat</code></td><td>Leaves out anything that matches</td></tr>
<tr><td><code>#1234567</code></td><td>The outfit or item with that ID. A plain number of three or more digits matches IDs and names</td></tr>
</tbody></table></div>

${h2('inspector', 'Inspector')}
<p>Click an outfit to open it. The inspector shows:</p>
<ul>
<li><b>The render</b> and the outfit’s visibility label.</li>
<li><b>Cost to recreate</b>: what the items cost to buy new today, with resale prices for limiteds shown separately. Items that are off sale or have no known price are counted and labelled, never added in as guesses.</li>
<li><b>Items</b>, grouped by kind, each with its type, creator, price or state, and a link to its Marketplace page. <b>What do I own?</b> (signed in) marks the ones you have.</li>
<li><b>Body</b>: body colors and scale.</li>
<li><b>Similar outfits</b> from the same profile (once its outfits are read) and from your library, ranked by how many look-defining items they share.</li>
<li><b>History</b>: each time RoFit loads the outfit and something changed, it keeps a snapshot on your computer. Roblox doesn’t publish edit history, so this is only what RoFit saw; visits where nothing changed add nothing. Turn it off or limit it in <b>Settings → Library &amp; data</b>.</li>
</ul>
<p>The ⋯ menu copies the outfit ID, a profile link to the outfit, item IDs, an item manifest (JSON) or a Roblox Studio script, and can download the last two as files.</p>

${h2('compare', 'Compare')}
<p>Select two outfits and press <b>Compare</b>, or open one and press <kbd>C</kbd> (or use <b>Compare → With what I’m wearing</b>, which needs you signed in to Roblox).</p>
<ul>
<li><b>Side by side</b> or <b>Slider</b>, which wipes between the two renders.</li>
<li>The share of items in common, then three lists: only in the first, in both, only in the second.</li>
<li><b>Swap sides</b> and <b>Copy differences</b> (as plain text).</li>
</ul>

${h2('library', 'Library')}
<p>Save an outfit with the bookmark button in the inspector, <kbd>S</kbd>, or by selecting several and pressing <b>Save</b>. Saved outfits appear in the <b>Library</b> tab on any profile and in the popup.</p>
<ul>
<li><b>Organise</b> with collections, favorites (the star), tags and notes. <b>Manage collections</b> renames or deletes them.</li>
<li><b>Find</b> with the same search as the explorer, covering names, owners, collections, tags, notes and items. Filter by favorites, collection, person or tag; sort by recent, name, owner or cost.</li>
<li><b>Bulk actions</b>: select several to favorite, move, tag, export or remove them.</li>
<li><b>Self-contained</b>: each saved outfit keeps the item data it had when saved, so clearing the cache never damages your library.</li>
<li><b>Backup and import</b>: the ⋯ menu exports the library as one JSON file and imports RoFit backups, item manifests and share links. Importing always shows a preview (what’s new, what you already have, anything it can’t read) before you confirm.</li>
</ul>

${h2('share-links', 'Share links')}
<p>Open an outfit and choose <b>Share</b> (or ⋯ → Share a snapshot link). RoFit makes a link like <code>https://rofit.site/o/#1.…</code>.</p>
<ul>
<li><b>What’s inside</b>: the outfit’s name and ID, the owner’s username and ID, the item names, types and IDs, body colors and scale, image addresses on Roblox’s image server, and when you made it.</li>
<li><b>Where it goes</b>: everything sits after the <code>#</code>. Browsers don’t send that part to servers, so rofit.site never receives the outfit; the page reads it in your browser.</li>
<li><b>Who can open it</b>: anyone with the link. For outfits RoFit can’t confirm are public, it asks before making a link, and it won’t make one for a private list.</li>
<li><b>Opening one</b>: the link shows the outfit on rofit.site. With RoFit 2.0 or later installed, <b>Save to RoFit</b> opens RoFit’s import screen with a preview; nothing is saved until you press Import there. Without it, paste the link into <b>Import</b> in your library (or <kbd>Ctrl</kbd> <kbd>K</kbd> → Import a backup or share link).</li>
<li><b>It’s a snapshot</b>: the link shows what the sender saw. The outfit may have changed since; opening it on Roblox shows what Roblox shows you today.</li>
</ul>

${h2('visibility', 'Visibility labels')}
<p>Roblox applies each person’s privacy settings to their outfits, so what you can see depends on who you are. RoFit labels every outfit list with what it observed:</p>
<div class="tablewrap"><table><thead><tr><th>Label</th><th>Meaning</th></tr></thead><tbody>
${ACCESS_ROWS.map(([a, b]) => `<tr><td><b>${a}</b></td><td>${b}</td></tr>`).join('\n')}
</tbody></table></div>
<p>To tell <b>Public</b> from <b>Visible to you</b>, RoFit asks Roblox for the first page once more without your session. Turn this off in <b>Settings → Privacy → Check whether outfits are public</b>; lists then show Visibility unknown, and sharing always asks first.</p>

${h2('keyboard', 'Keyboard')}
<div class="tablewrap"><table><thead><tr><th>Keys</th><th>Does</th></tr></thead><tbody>
${SHORTCUTS.map(([k, what]) => `<tr><td>${k.map((x) => `<kbd>${esc(x)}</kbd>`).join(' ')}</td><td>${esc(what)}</td></tr>`).join('\n')}
</tbody></table></div>

${h2('settings', 'Settings')}
<p>Open settings from the gear in RoFit’s top bar or the popup. They’re grouped as:</p>
<ul>
<li><b>Appearance</b>: theme (Auto follows Roblox, or Light, Dark, OLED), thumbnail size, grid or list.</li>
<li><b>Motion</b>: System follows your device, Full, Balanced or Calm, with a live preview. Spinners and progress bars always move, because they mean something is happening.</li>
<li><b>Explorer</b>: read outfits automatically, look up prices while reading, show Roblox presets, show prices, technical details.</li>
<li><b>Profiles</b>: the Outfits tab or row, and the hanger button.</li>
<li><b>Library &amp; data</b>: how long data stays fresh, history, what’s stored, backup, import, and clearing.</li>
<li><b>Privacy</b>, <b>Diagnostics</b> (which Roblox services answered, and a copyable report without cookies or outfit contents), <b>Shortcuts</b> and <b>About</b>.</li>
</ul>

${h2('data', 'Your data')}
<p>Everything RoFit knows stays in your browser on your computer: settings, your library, history snapshots and a cache of what Roblox returned. Nothing is sent to rofit.site or anyone else. Export a backup or clear any part of it in <b>Settings → Library &amp; data</b>. Removing RoFit from the browser deletes all of it. See the <a href="/privacy/">privacy policy</a>.</p>

${h2('troubleshooting', 'Troubleshooting')}
<h3>A profile shows no outfits, or says Private</h3>
<p>Roblox lets people limit who sees their outfits. If Roblox won’t show them to you, RoFit can’t either. If you expected to see them (say, a friend’s), check you’re signed in to roblox.com in this browser, then use <b>Check again</b>.</p>
<h3>“Couldn’t refresh · showing a saved copy”</h3>
<p>Roblox didn’t answer, so RoFit shows what it loaded last time. Click the message to try again.</p>
<h3>“Roblox is rate limiting RoFit”</h3>
<p>Too many requests in a short time, often while reading a very large profile. RoFit slows down by itself; wait the few seconds it mentions and try again.</p>
<h3>There’s no Outfits tab on a profile</h3>
<p>Look for the Saved Outfits row under Currently Wearing, or the hanger button by ⋯, and check <b>Settings → Profiles</b>. The popup’s search always works. If Roblox changed its page and RoFit can’t find its place, please <a href="https://github.com/zeniyaxe/rofit/issues">report it</a>.</p>
<h3>RoFit stopped responding</h3>
<p>Reload the Roblox tab. If that doesn’t help, press the reload button on RoFit’s card in <code>chrome://extensions</code>.</p>
<h3>rofit.site says RoFit isn’t installed</h3>
<p>Only RoFit 2.0 and later announce themselves to this site, and only in the browser profile where RoFit is installed. Check the version in <b>Settings → About</b>. You can always import a link by hand: <b>Library → ⋯ → Import</b>, then paste it.</p>
<h3>My library is empty after updating</h3>
<p>The update was probably loaded from a different folder. Load the old folder again (Load unpacked); its library is still there unless you removed that copy. Export a backup from it, then import that backup into the copy you want to keep.</p>

${h2('faq', 'FAQ')}
<h3>Is RoFit safe for my account?</h3>
<p>RoFit only reads from Roblox. It never buys, equips, messages or changes anything, and it never sees your password: requests use your existing roblox.com session from inside a Roblox tab, as the website itself does. The code is <a href="https://github.com/zeniyaxe/rofit">open source</a>.</p>
<h3>Can RoFit show outfits someone made private?</h3>
<p>No. RoFit shows what Roblox shows you, and labels it.</p>
<h3>Why isn’t it in the Chrome Web Store?</h3>
<p>Not yet. Installing from GitHub means updating by hand for now; the <a href="/download/#update">download page</a> explains how without losing your library.</p>
<h3>Firefox, Safari or phones?</h3>
<p>Not currently. RoFit is built for Chromium desktop browsers: Chrome, Edge, Brave and similar.</p>
<h3>Is RoFit made by Roblox?</h3>
<p>No. It’s an independent, free project and isn’t affiliated with Roblox Corporation.</p>
</article>
</div>
</div>`;
}

export function privacy() {
  return `<div class="narrow">
<header class="page-head"><h1>Privacy policy</h1><p class="lede">Short version: RoFit has no servers, no accounts and no analytics. What it knows stays in your browser.</p><p class="small muted">Last updated 4 November 2026. Covers the RoFit browser extension and rofit.site.</p></header>
<div class="prose">
<h2 id="extension">The extension</h2>
<h3>What it stores</h3>
<p>On your computer, inside your browser: your settings, your library (outfits you saved, with your collections, tags and notes), history snapshots of outfits you opened, and a cache of what Roblox returned (outfit lists, outfit details, item data and image addresses). You can export or clear each part in Settings → Library &amp; data. Removing the extension deletes all of it.</p>
<h3>Who it talks to</h3>
<p>Only Roblox, and only to read: outfit lists and details, renders, item data and prices, and, when you’re signed in, who you are and whether you own an item. These requests go from an open roblox.com tab so they carry your existing Roblox session, the same way the Roblox website’s own requests do. RoFit never sees your password and never reads or stores your cookies.</p>
<p>To label a list <b>Public</b>, RoFit asks Roblox for its first page once more without your session. You can turn that off in Settings → Privacy.</p>
<p>RoFit sends nothing to rofit.site, its author, or anyone else. There’s no analytics, telemetry, advertising or crash reporting.</p>
<h3>Diagnostics</h3>
<p>Settings → Diagnostics shows which Roblox services answered. “Copy diagnostics” copies a report to your clipboard for you to share if you choose; it never includes cookies, tokens or outfit contents.</p>

<h2 id="site">This website</h2>
<p>rofit.site is a set of static pages. It sets no cookies, uses no analytics or third-party scripts or fonts, and has no forms or accounts. Like any website, the company hosting it may keep standard request logs (such as IP address, browser and page requested) for security and operations.</p>
<h3>Share links</h3>
<p>A share link carries one outfit snapshot after the <code>#</code>, the part of a link that browsers don’t send to servers. The share page decodes it in your browser, so rofit.site never receives the outfit. To show pictures, your browser loads images from Roblox’s image server (tr.rbxcdn.com), which sees an ordinary image request; the page sends no referrer.</p>
<p>Anyone you give a link to can read what’s in it: the outfit’s name and ID, the owner’s username and ID, the items, body colors and scale, and when it was made. RoFit asks before making a link for an outfit it can’t confirm is public, and won’t make one for a private list.</p>
<h3>How the site and the extension talk</h3>
<p>RoFit 2.0 and later run a small script on rofit.site. Through it, the site can learn only that RoFit is installed and its version, and, after you click a button, ask RoFit to open its import screen for one share link. The site can’t read your library, settings or history, and nothing is saved until you confirm inside RoFit.</p>

<h2 id="children">Children</h2>
<p>RoFit doesn’t collect personal information from anyone, of any age.</p>
<h2 id="changes">Changes and contact</h2>
<p>Changes to this policy are published here and in the <a href="/changelog/">changelog</a>. Questions or concerns: <a href="https://github.com/zeniyaxe/rofit/issues">open an issue on GitHub</a>.</p>
</div>
</div>`;
}

export function changelog({ html }) {
  return `<div class="narrow">
<header class="page-head"><h1>What’s new</h1><p class="lede">Every release of RoFit, newest first.</p></header>
<div class="prose changelog">
${html}
</div>
</div>`;
}

export function viewer() {
  return `<div class="wrap viewer" id="viewer" aria-live="polite">
<noscript><div class="v-empty"><h1>Shared outfit</h1><p class="lede">This page needs JavaScript to read the outfit from the link. The outfit is inside the link itself; nothing about it is sent to a server.</p></div></noscript>
<p class="muted" data-loading>Opening the shared outfit…</p>
</div>`;
}

export function notFound() {
  return `<div class="narrow v-empty">
<div class="ic">${icon('Hanger')}</div>
<h1>Nothing hangs here</h1>
<p class="lede">That page doesn’t exist. If you followed a share link, check it was copied completely: share links look like <code>rofit.site/o/#1.…</code></p>
<div class="btns"><a class="btn primary" href="/">Go home</a><a class="btn" href="/docs/">Docs</a></div>
</div>`;
}
