import { useEffect, useState } from 'preact/hooks';
import type { AssetView, RpcError } from '../shared/types.ts';
import { rpc } from '../shared/rpc.ts';
import { Ico } from './icons.tsx';
import { Spinner } from './primitives.tsx';
import { errorText, itemUrl, robux } from './format.ts';

interface Worn { thumb: string | null; avatarType: string; items: { id: number; name: string; type: string; view?: AssetView }[] }

/**
 * What a player is wearing right now. Roblox shows this on every profile, whatever their outfit or inventory privacy, so it is a
 * different thing from a saved outfit and is labelled that way everywhere. Nothing here is hidden data.
 */
export function WornNow({ userId, userName, auto }: { userId: number; userName: string; auto?: boolean }) {
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [worn, setWorn] = useState<Worn>();
  const [err, setErr] = useState<RpcError>();

  const load = async () => {
    setState('loading');
    try {
      const w = await rpc('user.worn', { userId });
      const refs = w.assets;
      const views = refs.length ? await rpc('assets.resolve', { ids: refs.map((a) => a.id), refs, allowStale: true }) : {};
      setWorn({ thumb: w.thumb?.url ?? null, avatarType: w.avatarType, items: refs.map((a) => ({ id: a.id, name: a.name, type: a.assetTypeName.replace(/Accessory$/, ''), view: views[a.id] })) });
      setState('ready');
    } catch (e) { setErr(e as RpcError); setState('error'); }
  };
  useEffect(() => { setState('idle'); setWorn(undefined); if (auto) load(); }, [userId]);

  if (state === 'idle') {
    return (
      <div class="rf-worn-cta">
        <button class="rf-btn" onClick={load}><Ico n="user" size={16} />See what {userName} is wearing now</button>
        <small>Not a saved outfit. Roblox shows this on every profile.</small>
      </div>
    );
  }
  if (state === 'loading') return <div class="rf-worn-cta"><Spinner size={16} /><small>Loading what {userName} is wearing…</small></div>;
  if (state === 'error') {
    const t = errorText(err);
    return <div class="rf-worn-cta"><small><b>{t.title}</b> {t.body}</small><button class="rf-btn" onClick={load}>Try again</button></div>;
  }
  const w = worn!;
  const total = w.items.reduce((n, i) => { const r = i.view?.rec; return n + (r && i.view?.provenance !== 'last-known' && !r.isOffSale && r.price ? r.price : 0); }, 0);
  return (
    <section class="rf-worn" aria-label={`What ${userName} is wearing now`}>
      <div class="rf-worn-img">{w.thumb ? <img src={w.thumb} alt={`${userName}’s avatar right now`} /> : <Ico n="user" size={34} />}</div>
      <div class="rf-worn-body">
        <h4>Wearing now <span class="rf-chip-note">not a saved outfit</span></h4>
        <p class="rf-muted rf-small">{w.avatarType} · {w.items.length} items · what {userName}’s profile shows today</p>
        <ul>
          {w.items.map((i) => {
            const r = i.view?.rec;
            return (
              <li key={i.id}>
                <a href={itemUrl(i.id)} target="_blank" rel="noopener noreferrer"><b>{r?.name ?? i.name}</b><small>{i.type}{r?.creator ? ` · ${r.creator.name}` : ''}</small></a>
                <em>{!r ? 'No data' : r.isOffSale ? 'Off sale' : r.isFree ? 'Free' : r.price != null ? robux(r.price) : '—'}</em>
              </li>
            );
          })}
        </ul>
        <p class="rf-worn-total">{total > 0 ? `${robux(total)} to buy the items that are on sale` : 'No items on sale right now'}</p>
      </div>
    </section>
  );
}
