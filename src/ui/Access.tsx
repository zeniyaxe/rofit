import { ACCESS, type AccessInfo } from '../shared/access.ts';
import { Ico } from './icons.tsx';
import { Popover } from './primitives.tsx';
import { timeAgo } from './format.ts';

const ANON: Record<NonNullable<AccessInfo['anon']>, string> = {
  visible: 'Roblox listed them without a session',
  hidden: 'Roblox hid them without a session',
  error: 'Couldn’t run it',
  skipped: 'Off (Settings → Privacy)',
};

/** "Public / Visible to you / Private…" with the evidence behind it, one click away. */
export function AccessBadge({ info, onRecheck, align = 'left' }: { info?: AccessInfo; onRecheck?: () => void; align?: 'left' | 'right' }) {
  if (!info) return null;
  const c = ACCESS[info.state];
  return (
    <Popover label={`Who can see these: ${c.label}`} title="Who can see these outfits" class={'rf-chip btn rf-access ' + c.tone} align={align} width={310} content={(close) => (
      <div class="rf-access-pop">
        <div class="rf-access-h"><span class={'rf-access-i ' + c.tone}><Ico n={c.icon} size={16} /></span><b>{c.label}</b></div>
        <p>{c.body}</p>
        <dl class="rf-techdl">
          <dt>Checked</dt><dd>{timeAgo(info.at)}</dd>
          {info.meId !== undefined && <><dt>You</dt><dd>{info.meId ? 'Signed in to Roblox' : 'Signed out'}</dd></>}
          {info.anon && <><dt>Signed-out check</dt><dd>{ANON[info.anon]}</dd></>}
        </dl>
        <p class="rf-muted rf-small">RoFit only reports what Roblox returned. It never works around privacy settings.</p>
        {onRecheck && <button class="rf-btn sm" onClick={() => { close(); onRecheck(); }}><Ico n="refresh" size={14} />Check again</button>}
      </div>
    )}>
      <Ico n={c.icon} size={12} />{c.label}
    </Popover>
  );
}
