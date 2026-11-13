import { useEffect, useRef, useState } from 'preact/hooks';
import { Ico, type IconName } from './icons.tsx';
import { saveSettings } from '../shared/settings.ts';
import { ACCOUNT_URL, REPO_URL, SITE_URL } from '../shared/links.ts';
import { HIGHLIGHTS } from '../shared/changelog.ts';
import { useMotion, useSettings } from './data.ts';

/**
 * The welcome story: one persistent miniature of the product whose parts move between six moments, instead of six
 * separate slides. Every element stays mounted and is positioned by the stage's data-step, so the outfit you open in
 * step 2 is the same element that becomes the inspector preview, the left half of the mirror, and the saved tile.
 */
const SCENES: { id: string; icon: IconName; title: string; body: string; ms: number }[] = [
  { id: 'discover', icon: 'search', title: 'Find their saved outfits', body: 'Every Roblox profile gets a Saved Outfits entry with the looks that person actually saved.', ms: 2600 },
  { id: 'open', icon: 'outfit', title: 'Open one', body: 'Pick any outfit. It lifts straight out of the grid.', ms: 2000 },
  { id: 'inspect', icon: 'eye', title: 'See the whole avatar', body: 'A big preview, the body setup, and what it costs today, with nothing guessed.', ms: 2800 },
  { id: 'explore', icon: 'layers', title: 'Go item by item', body: 'Every accessory, clothing piece and body part, with what’s off sale or unavailable.', ms: 2800 },
  { id: 'compare', icon: 'compare', title: 'Hold two looks up to the mirror', body: 'Side by side or wiped across one another, with shared and unique items.', ms: 3200 },
  { id: 'save', icon: 'saved', title: 'Keep it', body: 'Save to your library. It stays in this browser even if the owner deletes it.', ms: 2600 },
];
const TILE_HUES = [210, 28, 150, 330, 265, 48];

function Story({ still }: { still: boolean }) {
  const [step, setStep] = useState(still ? 2 : 0);
  const [playing, setPlaying] = useState(!still);
  const hover = useRef(false);
  useEffect(() => {
    if (!playing || still) return;
    const t = window.setTimeout(() => { if (!hover.current) setStep((s) => (s + 1) % SCENES.length); else setStep((s) => s); }, SCENES[step].ms);
    return () => clearTimeout(t);
  }, [step, playing, still]);
  const go = (i: number) => { setStep((i + SCENES.length) % SCENES.length); };
  const sc = SCENES[step];
  return (
    <div class="wl-story" data-step={sc.id} data-n={String(step)} onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); setPlaying(false); go(step + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); setPlaying(false); go(step - 1); } }}>
      <div class="ws-stage" aria-hidden="true">
        <div class="ws-win">
          <div class="ws-bar"><i /><i /><i /><span>roblox.com/users/…/profile</span></div>
          <div class="ws-head"><span class="ws-av" /><div><b>builderman</b><small>@builderman</small></div>
            <div class="ws-tabs"><span>About</span><span>Creations</span><span class="ws-tab-o">Outfits<em>6</em></span><i class="ws-ul" /></div>
          </div>
          <div class="ws-body">
            <div class="ws-grid">
              {TILE_HUES.map((h, i) => (
                <div key={i} class={'ws-tile t' + i} style={{ '--h': String(h), '--i': String(i) } as any}><span class="ws-fig"><i /><i /><i /></span><b /></div>
              ))}
            </div>
            {/* The hero outfit: one element that plays tile → inspector preview → mirror half → saved tile. */}
            <div class="ws-hero" style={{ '--h': String(TILE_HUES[1]) } as any}><span class="ws-fig big"><i /><i /><i /></span></div>
            <div class="ws-twin" style={{ '--h': String(TILE_HUES[4]) } as any}><span class="ws-fig big"><i /><i /><i /></span></div>
            <div class="ws-wipe"><i /></div>
            <div class="ws-sim"><b>62%</b><small>shared</small></div>
            <aside class="ws-panel">
              <b class="ws-title">Street Knight</b>
              <div class="ws-cost"><Ico n="coins" size={13} /><span>R$ 1,240</span><em>today</em></div>
              <div class="ws-chips"><i /><i /><i /></div>
              <ul class="ws-items">{[0, 1, 2, 3, 4].map((i) => <li key={i} style={{ '--i': String(i) } as any}><span /><b /><em /></li>)}</ul>
              <div class="ws-save"><Ico n="save" size={13} /><span>Save</span><Ico n="check" size={13} /></div>
            </aside>
            <div class="ws-lib"><Ico n="library" size={13} /><span>Library</span><em>+1</em></div>
          </div>
        </div>
        <svg class="ws-cursor" width="22" height="22" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" /></svg>
      </div>

      <div class="ws-caption" aria-live="polite">
        <span class="ws-cap-ic" key={sc.id}><Ico n={sc.icon} size={16} /></span>
        <div key={sc.id + 't'}><b>{sc.title}</b><p>{sc.body}</p></div>
      </div>
      <div class="ws-ctrl">
        <div class="ws-dots" role="tablist" aria-label="Welcome tour">
          {SCENES.map((x, i) => (
            <button key={x.id} role="tab" aria-selected={i === step} aria-label={`${i + 1}. ${x.title}`} title={x.title} class={i === step ? 'on' : i < step ? 'past' : ''}
              style={{ '--ms': x.ms + 'ms' } as any} onClick={() => { setPlaying(false); go(i); }}><i class={playing && i === step ? 'run' : ''} /></button>
          ))}
        </div>
        {!still && (
          <button class="rf-ib ws-play" aria-label={playing ? 'Pause tour' : 'Play tour'} title={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((p) => !p)}>
            <Ico n={playing ? 'minus' : 'arrow'} size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export function Welcome({ mode, onDone }: { mode: 'welcome' | 'whatsnew'; onDone: (route?: string) => void }) {
  const s = useSettings();
  const rm = useMotion(s.motion) === 'calm';
  const ver = chrome.runtime.getManifest().version;
  const done = async (route?: string) => { await saveSettings({ onboarded: true }); onDone(route); };
  const words = (mode === 'welcome' ? 'Every outfit, opened up.' : 'RoFit just got better.').split(' ');
  const open = (url: string) => { saveSettings({ onboarded: true }); window.open(url, '_blank', 'noopener'); };

  return (
    <div class="wl wl2">
      <section class="wl-left">
        <div class="wl-logo" aria-hidden="true"><Ico n="outfit" size={34} class="pp-swing" /></div>
        <p class="wl-eyebrow">{mode === 'welcome' ? `Installed · v${ver}` : `Updated to v${ver}`}</p>
        <h1 class="wl-title">{words.map((w, i) => <span key={i} style={{ '--i': String(i) } as any}>{w}</span>)}</h1>
        <p class="wl-lead">
          {mode === 'welcome'
            ? <>RoFit adds <b>Saved Outfits</b> to every Roblox profile: the outfits that person actually saved, each piece called out with what Roblox knows about it. Read-only, and everything stays in this browser.</>
            : <>Here’s what’s new. Everything still runs locally in your browser.</>}
        </p>

        {mode === 'whatsnew' && (
          <ul class="wl-news">
            {HIGHLIGHTS.map((h, i) => (
              <li key={h.title} style={{ '--i': String(i) } as any}><span><Ico n={h.icon} size={18} /></span><div><b>{h.title}</b><p>{h.body}</p></div></li>
            ))}
          </ul>
        )}

        <div class="wl-actions">
          <button class="rf-btn primary lg" onClick={() => open('https://www.roblox.com/users/156/profile')}>Try it on a profile<Ico n="arrow" size={18} /></button>
          <button class="rf-btn lg" onClick={() => done('library')}><Ico n="library" size={18} />Library</button>
          <button class="rf-btn lg" onClick={() => open(ACCOUNT_URL)}><Ico n="settings" size={18} />Settings</button>
          <button class="rf-linkbtn" onClick={() => done()}>{mode === 'welcome' ? 'Skip' : 'Close'}</button>
        </div>
        <div class="wl-links">
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer"><Ico n="globe" size={15} />rofit.site</a>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer"><Ico n="link" size={15} />GitHub</a>
          <span class="wl-keys"><kbd class="rf-kbd">←</kbd><kbd class="rf-kbd">→</kbd> step through the tour</span>
        </div>
      </section>
      <section class="wl-right" tabIndex={-1}><Story still={rm} /></section>
    </div>
  );
}
