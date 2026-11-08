import { useEffect, useState } from 'preact/hooks';
import { Ico } from './icons.tsx';
import { saveSettings } from '../shared/settings.ts';
import { ACCOUNT_URL, REPO_URL, SITE_URL } from '../shared/links.ts';
import { HIGHLIGHTS } from '../shared/changelog.ts';
import { useMotion, useSettings } from './data.ts';

const STEPS = [
  ['Open any profile', 'Look for Outfits next to About and Creations, or the hanger button by the ⋯ menu.'],
  ['Browse, then go deeper', 'Every item, what it costs today, what’s off sale or gone, and how the body is set up. Compare two, save one, or share it as an image.'],
  ['It stays on your computer', 'RoFit only talks to Roblox, read-only. Your library, notes and history never leave this browser.'],
];

/** A looping, self-playing miniature of the product: the tab appears, gets clicked, outfits load, one opens. */
function Demo({ still }: { still: boolean }) {
  const [n, setN] = useState(still ? 5 : 0);
  useEffect(() => {
    if (still) return;
    const T = [1000, 900, 900, 1700, 2800, 700];
    let i = 0, t = 0;
    const tick = () => { setN(i); t = window.setTimeout(() => { i = (i + 1) % T.length; tick(); }, T[i]); };
    tick();
    return () => clearTimeout(t);
  }, [still]);
  const cls = ['a1', 'a2', 'a3', 'a4'].filter((_, i) => n >= i + 1 && n < 5).join(' ') + (n === 5 && !still ? ' reset' : '') + (still ? ' a1 a2 a3 a4' : '');
  return (
    <div class={'demo ' + cls} aria-hidden="true">
      <div class="d-bar"><i /><i /><i /></div>
      <div class="d-head"><span class="d-av" /><div><b>builderman</b><small>@builderman</small></div></div>
      <div class="d-tabs">
        <span class="on-about">About</span><span>Creations</span><span class="d-outfits-tab">Outfits</span>
        <em class="d-underline" />
        <i class="d-ripple" />
      </div>
      <div class="d-body">
        <div class="d-grid">{Array.from({ length: 6 }, (_, i) => (
          <div class={'tile t' + i} key={i} style={{ '--i': i } as any}><span><Ico n="outfit" size={20} /></span><b /></div>
        ))}</div>
        <div class="d-insp">
          <div class="d-hero"><Ico n="outfit" size={30} /></div>
          <b class="d-title" /><div class="d-rows"><i /><i /><i /><i /></div>
        </div>
      </div>
      <svg class="d-cursor" width="22" height="22" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" /></svg>
    </div>
  );
}

export function Welcome({ mode, onDone }: { mode: 'welcome' | 'whatsnew'; onDone: (route?: string) => void }) {
  const s = useSettings();
  const rm = useMotion(s.motion) === 'calm';
  const ver = chrome.runtime.getManifest().version;
  const done = async (route?: string) => { await saveSettings({ onboarded: true }); onDone(route); };
  const words = (mode === 'welcome' ? 'Welcome to RoFit.' : 'RoFit just got better.').split(' ');
  const open = (url: string) => { saveSettings({ onboarded: true }); window.open(url, '_blank', 'noopener'); };

  return (
    <div class="wl">
      <div class="wl-glow" aria-hidden="true" />
      <section class="wl-left">
        <div class="wl-logo" aria-hidden="true"><Ico n="outfit" size={34} class="pp-swing" /></div>
        <p class="wl-eyebrow">{mode === 'welcome' ? `Installed · v${ver}` : `Updated to v${ver}`}</p>
        <h1 class="wl-title">{words.map((w, i) => <span key={i} style={{ '--i': i } as any}>{w}</span>)}</h1>
        <p class="wl-lead">
          {mode === 'welcome'
            ? <>RoFit adds an <b>Outfits</b> tab to every Roblox profile, with the outfits that person actually saved.</>
            : <>Here’s what’s new. Everything still runs locally in your browser.</>}
        </p>

        {mode === 'welcome' ? (
          <ol class="wl-steps">
            {STEPS.map(([t, b], i) => (
              <li key={i} style={{ '--i': i } as any}><span>{i + 1}</span><div><b>{t}</b><p>{b}</p></div></li>
            ))}
          </ol>
        ) : (
          <ul class="wl-news">
            {HIGHLIGHTS.map((h, i) => (
              <li key={h.title} style={{ '--i': i } as any}><span><Ico n={h.icon} size={18} /></span><div><b>{h.title}</b><p>{h.body}</p></div></li>
            ))}
          </ul>
        )}

        <div class="wl-actions">
          <button class="rf-btn primary lg" onClick={() => open('https://www.roblox.com/users/156/profile')}>Try it on a profile</button>
          <button class="rf-btn lg" onClick={() => open(ACCOUNT_URL)}><Ico n="settings" size={18} />Settings</button>
          <button class="rf-linkbtn" onClick={() => done()}>{mode === 'welcome' ? 'Skip' : 'Close'}</button>
        </div>
        <div class="wl-links">
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer"><Ico n="globe" size={15} />rofit.site</a>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer"><Ico n="link" size={15} />GitHub</a>
        </div>
      </section>
      <section class="wl-right"><Demo still={rm} /></section>
    </div>
  );
}
