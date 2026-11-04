import { useEffect, useState } from 'preact/hooks';
import type { AssetView, OutfitDetails } from '../shared/types.ts';
import { ACCESS, sharePolicy, type AccessState } from '../shared/access.ts';
import { encodeShare, shareUrl, type SharedOutfit } from '../shared/share.ts';
import { Ico } from './icons.tsx';
import { Dialog, Spinner, Toggle, useToast } from './primitives.tsx';
import { copy, dateStr, plural } from './format.ts';

/**
 * Makes a share link for one outfit. The link is the whole snapshot (in the URL fragment, which browsers never send to
 * a server). Whether it can be made depends on what RoFit knows about who may see the outfit: see shared/access.ts.
 */
export function ShareDialog({ d, views, user, thumb, access, onClose }: {
  d: OutfitDetails; views: Record<number, AssetView>; user: { id: number; name: string }; thumb?: string; access: AccessState; onClose: () => void;
}) {
  const policy = sharePolicy(access);
  const [allowed, setAllowed] = useState(false);
  const ready = policy === 'allow' || (policy === 'confirm' && allowed);
  const [link, setLink] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const toast = useToast();
  const c = ACCESS[access];

  useEffect(() => {
    if (!ready) { setLink(null); return; }
    let dead = false;
    const snap: SharedOutfit = {
      user, outfit: { id: d.id, name: d.name }, avatarType: d.avatarType === 'R6' ? 'R6' : 'R15', bodyColors: d.bodyColors, scale: d.scale,
      items: d.assets.map((a) => ({ id: a.id, name: views[a.id]?.rec?.name ?? a.name, typeId: a.assetTypeId, thumb: views[a.id]?.rec?.thumb })),
      thumb, at: d.fetchedAt,
    };
    encodeShare(snap).then((p) => !dead && setLink(shareUrl(p)), (e) => !dead && setErr(e?.message || 'Couldn’t make a link for this outfit.'));
    return () => { dead = true; };
  }, [ready]);

  const doCopy = async () => { if (link) toast((await copy(link)) ? 'Copied share link' : 'Couldn’t copy'); };

  return (
    <Dialog title="Share this outfit" onClose={onClose} class="wide" initialFocus={policy === 'allow' ? '.rf-share-copy' : undefined}
      actions={policy === 'block' ? <button class="rf-btn primary" onClick={onClose}>OK</button> : <><button class="rf-btn" onClick={onClose}>Close</button><button class="rf-btn primary rf-share-copy" disabled={!link} onClick={doCopy}><Ico n="copy" size={16} />Copy link</button></>}>
      <div class={'rf-share-access ' + c.tone}><Ico n={c.icon} size={16} /><div><b>{c.label}</b><span>{c.body}</span></div></div>
      {policy === 'block' ? (
        <p class="rf-muted">There’s nothing RoFit can share here. Links only ever carry what Roblox shows you, and Roblox isn’t showing this.</p>
      ) : (
        <>
          {policy === 'confirm' && (
            <label class="rf-frow rf-consent"><span>I’m allowed to share this outfit<small>RoFit can’t confirm it’s public. Anyone with the link will see what you see now.</small></span>
              <Toggle label="I’m allowed to share this outfit" on={allowed} onChange={setAllowed} /></label>
          )}
          <label class="rf-field"><span>Link</span>
            <div class="rf-linkbox">
              <input readOnly value={link ?? ''} placeholder={ready ? 'Making the link…' : 'Confirm above to make a link'} onFocus={(e) => (e.target as HTMLInputElement).select()} aria-label="Share link" />
              {ready && !link && !err && <Spinner size={14} />}
            </div>
          </label>
          {err && <p class="rf-hintline warn" role="alert"><Ico n="warn" size={14} />{err}</p>}
          <div class="rf-share-what">
            <b>What the link contains</b>
            <ul>
              <li><Ico n="check" size={14} />“{d.name}” by {user.name}, {plural(d.assets.length, 'item')} with names and pictures</li>
              <li><Ico n="check" size={14} />Body colors, scale and avatar type, as of {dateStr(d.fetchedAt)}</li>
              <li><Ico n="close" size={14} />No prices, notes, tags, or anything about you</li>
            </ul>
            <p class="rf-muted rf-small">The snapshot travels inside the link itself; nothing is uploaded. It opens on rofit.site, or in RoFit via Library → Import.</p>
          </div>
        </>
      )}
    </Dialog>
  );
}
