import { Ico } from './icons.tsx';
import { saveSettings } from '../shared/settings.ts';

export function Welcome({ onDone }: { onDone: (route?: string) => void }) {
  const done = async (route?: string) => { await saveSettings({ onboarded: true }); onDone(route); };
  return (
    <div class="rf-welcome">
      <div class="rf-wl">
        <div class="rf-logo" aria-hidden="true"><Ico n="outfit" size={26} /></div>
        <h1>Okay, you’re in.</h1>
        <p class="rf-lead">RoFit adds an <b>Outfits</b> tab to every Roblox profile, with the outfits that person actually saved.</p>
        <ol class="rf-steps">
          <li><span>1</span><div><b>Open any profile</b><p>Look for the <b>Outfits</b> tab, the <b>Saved Outfits</b> row under Currently Wearing, or the hanger button by the ⋯ menu.</p></div></li>
          <li><span>2</span><div><b>Browse, then go deeper</b><p>Click an outfit to see every item, what it costs today, what’s off sale or gone, and how the body is set up. Compare two, or save one to your library.</p></div></li>
          <li><span>3</span><div><b>It stays on your computer</b><p>RoFit only talks to Roblox, with read-only requests. Your library, notes and history never leave this browser.</p></div></li>
        </ol>
        <div class="rf-wa">
          <a class="rf-btn primary lg" href="https://www.roblox.com/users/156/profile" target="_blank" rel="noopener" onClick={() => saveSettings({ onboarded: true })}>Try it on a profile</a>
          <button class="rf-btn lg" onClick={() => done('settings')}>Settings</button>
          <button class="rf-linkbtn" onClick={() => done()}>Skip</button>
        </div>
      </div>
      <div class="rf-wr" aria-hidden="true">
        <div class="rf-faux">
          <div class="rf-faux-tabs"><span>About</span><span>Creations</span><span class="on">Outfits</span></div>
          <div class="rf-faux-grid">{Array.from({ length: 6 }, (_, i) => <div key={i}><i /><b /></div>)}</div>
        </div>
      </div>
    </div>
  );
}
