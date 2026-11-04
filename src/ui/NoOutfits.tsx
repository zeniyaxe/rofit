import { useState } from 'preact/hooks';
import type { RpcError } from '../shared/types.ts';
import type { AccessInfo } from '../shared/access.ts';
import { Ico } from './icons.tsx';
import { Spinner } from './primitives.tsx';
import { errorText, plural } from './format.ts';
import { Collapse } from './motion.tsx';

type Verdict = 'yes' | 'maybe' | 'no';
interface Reason { title: string; body: string; verdict: Verdict }

const LABEL: Record<Verdict, string> = { yes: 'Looks like this', maybe: 'Possible', no: 'Ruled out' };

/**
 * One place that explains why a profile shows no saved outfits. Roblox answers "private" and "none" differently in some
 * cases and identically in others, so every reason carries what RoFit actually observed and says how sure it is.
 */
export function NoOutfits(p: {
  userName: string; error?: RpcError; presets: number; viewer?: 'in' | 'out' | 'unknown'; via?: string;
  busy: boolean; onRetry: () => void; onShowPresets: () => void; access?: AccessInfo;
}) {
  const [tech, setTech] = useState(false);
  const e = p.error;
  const priv = e?.kind === 'forbidden' || e?.kind === 'unauthenticated';
  const gone = e?.kind === 'not-found';
  const failed = !!e && !priv && !gone;
  const signedOut = p.viewer === 'out' || e?.kind === 'unauthenticated';

  if (failed) {
    const t = errorText(e);
    return (
      <div class="rf-why">
        <div class="rf-why-art"><Ico n="warn" size={30} /></div>
        <h3>{t.title}</h3><p class="rf-why-lead">{t.body}</p>
        <div class="rf-empty-actions"><button class="rf-btn primary" onClick={p.onRetry} disabled={p.busy}>{p.busy ? <Spinner size={14} /> : <Ico n="refresh" size={16} />}Try again</button></div>
      </div>
    );
  }

  const reasons: Reason[] = [];
  reasons.push(priv
    ? { title: 'Roblox refused the request', body: e?.detail ? `Its answer: “${e.detail}”.` : 'It declined to list them for you.', verdict: 'yes' }
    : gone
      ? { title: 'This user can’t be found', body: 'The account may be deleted, banned or the ID is wrong.', verdict: 'yes' }
      : { title: 'Outfit privacy is hiding them', body: 'Roblox lets people limit who can see their outfits. An empty list can mean that — it returns the same empty answer either way.', verdict: 'maybe' });
  if (!gone) {
    reasons.push({
      title: p.viewer === 'in' ? 'You’re signed in, and it still came back empty' : signedOut ? 'You’re signed out' : 'Whether you’re signed in is unclear',
      body: signedOut
        ? 'If they only share outfits with friends, signing in as one of their friends may show them.'
        : p.viewer === 'in' ? 'So this isn’t a sign-in problem. They may not share outfits with you, or have none.' : 'Open Roblox in this browser and sign in, then check again.',
      verdict: signedOut ? 'maybe' : p.viewer === 'in' ? 'no' : 'maybe',
    });
    if (!priv) reasons.push({ title: `${p.userName} hasn’t saved any`, body: 'Plenty of accounts only wear whatever they last equipped. That isn’t a saved outfit.', verdict: 'maybe' });
    if (p.presets > 0) reasons.push({ title: `Only Roblox presets are listed (${p.presets})`, body: 'Those come with every account and aren’t saved by the user. RoFit hides them unless you ask.', verdict: 'yes' });
    reasons.push({ title: 'Roblox didn’t fail', body: priv ? 'The request reached Roblox and was refused on purpose.' : 'The request succeeded, so this isn’t a network or rate-limit problem.', verdict: 'no' });
  }

  return (
    <div class="rf-why">
      <div class={'rf-why-art' + (priv ? ' lock' : '')}>
        {priv ? (
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="4" y="11" width="16" height="10" rx="2.5" /><path class="shackle" d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        ) : <Ico n={gone ? 'warn' : 'outfit'} size={34} />}
      </div>
      <h3>{priv ? `${p.userName}’s outfits are private` : gone ? 'User not found' : `No saved outfits to show for ${p.userName}`}</h3>
      <p class="rf-why-lead">
        {priv ? 'Roblox only hands saved outfits to people the owner allows. RoFit shows what Roblox returns to you and never works around privacy, so copies it cached on earlier visits stay hidden too.'
          : gone ? 'Roblox has no such account.' : 'Here’s what RoFit could tell about why, from what Roblox actually returned.'}
      </p>

      {!gone && (
        <ul class="rf-reasons">
          {reasons.map((r, i) => (
            <li key={i} class={'v-' + r.verdict} style={{ '--i': i } as any}>
              <span class="rf-vdot" aria-hidden="true">{r.verdict === 'yes' ? <Ico n="check" size={12} /> : r.verdict === 'no' ? <Ico n="close" size={12} /> : <i />}</span>
              <span class="rf-rtext"><b>{r.title}</b><span>{r.body}</span></span>
              <em class="rf-rtag">{LABEL[r.verdict]}</em>
            </li>
          ))}
        </ul>
      )}

      <div class="rf-empty-actions">
        <button class="rf-btn primary" onClick={p.onRetry} disabled={p.busy}>{p.busy ? <Spinner size={14} /> : <Ico n="refresh" size={16} />}Check again</button>
        {signedOut && !gone && <a class="rf-btn" href="https://www.roblox.com/login" target="_blank" rel="noopener noreferrer"><Ico n="user" size={16} />Sign in to Roblox</a>}
        {p.presets > 0 && <button class="rf-btn" onClick={p.onShowPresets}>Show {plural(p.presets, 'preset')}</button>}
      </div>

      <button class="rf-linkbtn rf-why-tech" aria-expanded={tech} onClick={() => setTech(!tech)}>{tech ? 'Hide' : 'Show'} what Roblox said</button>
      <Collapse open={tech}>
        <dl class="rf-techdl">
          <dt>Result</dt><dd>{e ? `${e.status ?? '—'} ${e.kind}` : '200 OK, no saved outfits in the list'}</dd>
          {e?.detail && <><dt>Roblox message</dt><dd>{e.detail}</dd></>}
          <dt>Viewer</dt><dd>{p.viewer === 'in' ? 'signed in' : p.viewer === 'out' ? 'signed out' : 'unknown'}</dd>
          {p.via && <><dt>Endpoint</dt><dd>{p.via === 'v1' ? 'avatar v1 (fallback)' : 'avatar v2'}</dd></>}
          {(p.access ?? e?.access) && <><dt>Checked</dt><dd>{new Date((p.access ?? e?.access)!.at).toLocaleString()}</dd></>}
        </dl>
      </Collapse>
    </div>
  );
}
