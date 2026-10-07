import { useMemo, useState } from 'preact/hooks';
import type { AssetView, BodyColors, LibraryEntry, OutfitDetails } from '../shared/types.ts';
import { diffOutfits, summarizePrices } from '../shared/analysis.ts';
import { typeName } from '../shared/assetTypes.ts';
import { rpc } from '../shared/rpc.ts';
import { Ico } from './icons.tsx';
import { Chip, Empty, Seg, Spinner, Swatch, Thumb, useToast } from './primitives.tsx';
import { BodyFigure } from './Inspector.tsx';
import { copy, errorText, plural, robux } from './format.ts';
import { useAsync, useOutfitBundle } from './data.ts';

export type Subject =
  | { kind: 'outfit'; userId: number; userName: string; id: number; name: string; lib?: LibraryEntry }
  | { kind: 'me' };

interface Loaded { label: string; sub: string; details: OutfitDetails; views: Record<number, AssetView>; thumbId?: number; thumbUrl?: string }

function useSubject(s: Subject): { data?: Loaded; error?: any; loading: boolean } {
  const isOutfit = s.kind === 'outfit';
  const bundle = useOutfitBundle(isOutfit ? s.userId : 0, isOutfit ? s.id : 0,
    isOutfit && s.lib ? { details: s.lib.details, views: Object.fromEntries(s.lib.details.assets.map((a) => [a.id, { id: a.id, provenance: 'last-known', rec: s.lib!.assets[a.id], ref: a } as AssetView])) } : undefined,
    isOutfit);
  const me = useAsync(async () => {
    if (isOutfit) return null;
    const r = await rpc('me.avatar', {});
    if (!r.me || !r.avatar) throw { kind: 'unauthenticated', message: 'Sign in to Roblox in this browser to compare with your own avatar.' };
    const views = await rpc('assets.resolve', { ids: r.avatar.assets.map((a) => a.id), refs: r.avatar.assets });
    return { me: r.me, avatar: r.avatar, views };
  }, [isOutfit]);
  if (isOutfit) {
    if (!bundle.bundle) return { error: bundle.error, loading: !bundle.error };
    return { loading: bundle.phase === 'assets', data: { label: s.name, sub: s.userName, details: bundle.bundle.details, views: bundle.bundle.views, thumbId: s.id, thumbUrl: s.lib?.thumb } };
  }
  if (!me.data) return { error: me.error, loading: me.loading };
  return { loading: false, data: { label: 'What I’m wearing', sub: me.data.me.name, details: me.data.avatar, views: me.data.views } };
}

const PART: Record<keyof BodyColors, string> = { head: 'Head', torso: 'Torso', rightArm: 'Right arm', leftArm: 'Left arm', rightLeg: 'Right leg', leftLeg: 'Left leg' };
const SCALE: Record<string, string> = { height: 'Height', width: 'Width', head: 'Head', depth: 'Depth', proportion: 'Proportions', bodyType: 'Body type' };

export function Compare({ a, b, onClose, onSwap }: { a: Subject; b: Subject; onClose: () => void; onSwap: () => void }) {
  const A = useSubject(a), B = useSubject(b);
  const [mode, setMode] = useState<'sides' | 'blend'>('sides');
  const [pos, setPos] = useState(50);
  const canBlend = !!A.data?.thumbId && !!B.data?.thumbId;
  const toast = useToast();
  const both = A.data && B.data;
  const diff = useMemo(() => both ? diffOutfits(A.data!.details, B.data!.details) : null, [A.data?.details, B.data?.details]);
  const err = A.error ?? B.error;

  const nameOf = (id: number) => A.data?.views[id]?.rec?.name ?? A.data?.details.assets.find((x) => x.id === id)?.name ?? B.data?.views[id]?.rec?.name ?? B.data?.details.assets.find((x) => x.id === id)?.name ?? String(id);
  const typeOf = (id: number) => { const r = A.data?.details.assets.find((x) => x.id === id) ?? B.data?.details.assets.find((x) => x.id === id); return r ? typeName(r.assetTypeId, r.assetTypeName) : ''; };
  const viewOf = (id: number) => A.data?.views[id] ?? B.data?.views[id];

  const sumOf = (l?: Loaded, ids?: number[]) => l ? summarizePrices((ids ?? l.details.assets.map((x) => x.id)).map((id) => l.views[id]).filter(Boolean)) : null;
  const sa = sumOf(A.data), sb = sumOf(B.data);

  const text = () => !diff ? '' : [
    `${A.data!.label} vs ${B.data!.label} — ${Math.round(diff.similarity * 100)}% similar`,
    `Shared (${diff.shared.length}): ${diff.shared.map(nameOf).join(', ')}`,
    `Only in ${A.data!.label} (${diff.onlyA.length}): ${diff.onlyA.map(nameOf).join(', ')}`,
    `Only in ${B.data!.label} (${diff.onlyB.length}): ${diff.onlyB.map(nameOf).join(', ')}`,
  ].join('\n');

  return (
    <div class="rf-compare">
      <header class="rf-cbar">
        <button class="rf-btn" onClick={onClose}><Ico n="back" size={16} />Back</button>
        <h2>Compare</h2>
        <div class="rf-grow" />
        {canBlend && <Seg label="Compare view" value={mode} onChange={setMode} options={[{ v: 'sides', label: 'Side by side' }, { v: 'blend', label: 'Slider' }]} />}
        <button class="rf-btn" onClick={onSwap}><Ico n="repeat" size={16} />Swap sides</button>
        <button class="rf-btn" disabled={!diff} onClick={async () => toast((await copy(text())) ? 'Copied differences' : 'Couldn’t copy')}><Ico n="copy" size={16} />Copy differences</button>
      </header>
      <div class="rf-cscroll">
        {err ? <Empty icon="warn" title={errorText(err).title} body={errorText(err).body} /> : (
          <>
            {mode === 'blend' && canBlend && (
              <div class="rf-cblend">
                <div class="rf-stage rf-overlay" style={{ height: 'clamp(260px, 44vh, 440px)' }}>
                  <Thumb id={A.data!.thumbId!} size="420x420" src={A.data!.thumbUrl} />
                  <div class="rf-thumb top" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}><Thumb id={B.data!.thumbId!} size="420x420" src={B.data!.thumbUrl} /></div>
                  <input type="range" min={0} max={100} step={0.5} value={pos} aria-label="Reveal slider between the two outfits" onInput={(e) => setPos(Number((e.target as HTMLInputElement).value))} />
                  <div class="rf-overlay-line" style={{ left: pos + '%' }} />
                  <span class="rf-overlay-tag" style={{ left: '8px' }}>{A.data!.label}</span>
                  <span class="rf-overlay-tag" style={{ right: '8px' }}>{B.data!.label}</span>
                </div>
                {diff && <p class="rf-muted rf-small rf-center">{Math.round(diff.similarity * 100)}% of items shared. Drag, or use the arrow keys, to wipe between them.</p>}
              </div>
            )}
            <div class={'rf-cheads' + (mode === 'blend' && canBlend ? ' compact' : '')}>
              {[A, null, B].map((S, i) => S === null ? (
                <div class="rf-sim" key="sim">
                  {diff ? <>
                    <div class="rf-sim-n">{Math.round(diff.similarity * 100)}<small>%</small></div>
                    <div class="rf-muted rf-small">of items shared</div>
                    <div class="rf-simbar"><i style={{ width: `${diff.similarity * 100}%` }} /></div>
                  </> : <Spinner />}
                </div>
              ) : (
                <div class="rf-chead" key={i}>
                  <div class="rf-stage sm" hidden={mode === 'blend' && canBlend}>{S.data?.thumbId ? <Thumb id={S.data.thumbId} size="420x420" src={S.data.thumbUrl} /> : S.data ? <BodyFigure c={S.data.details.bodyColors} /> : <div class="rf-skel" />}</div>
                  <b>{S.data?.label ?? '…'}</b>
                  <span class="rf-muted rf-small">{S.data ? `${S.data.sub} · ${S.data.details.avatarType} · ${plural(S.data.details.assets.length, 'item')}` : 'Loading'}</span>
                </div>
              ))}
            </div>

            {diff && (
              <>
                <div class="rf-cols3">
                  <ItemCol title={`Only in ${A.data!.label}`} ids={diff.onlyA} nameOf={nameOf} typeOf={typeOf} viewOf={viewOf} tone="a" />
                  <ItemCol title="In both" ids={diff.shared} nameOf={nameOf} typeOf={typeOf} viewOf={viewOf} tone="both" />
                  <ItemCol title={`Only in ${B.data!.label}`} ids={diff.onlyB} nameOf={nameOf} typeOf={typeOf} viewOf={viewOf} tone="b" />
                </div>

                <div class="rf-cdetails">
                  <section>
                    <h3>Body colors</h3>
                    <div class="rf-bodypair"><BodyFigure c={A.data!.details.bodyColors} /><BodyFigure c={B.data!.details.bodyColors} /></div>
                    {diff.colors.length === 0 ? <p class="rf-muted rf-small">Identical.</p> : diff.colors.map((c) => (
                      <div class="rf-cdiff" key={c.part}><span>{PART[c.part]}</span><Swatch hex={c.a} /><Ico n="right" size={14} /><Swatch hex={c.b} /><code>#{c.a} → #{c.b}</code></div>
                    ))}
                    {diff.avatarTypeDiffers && <p class="rf-small"><Chip tone="warn">{A.data!.details.avatarType} vs {B.data!.details.avatarType}</Chip></p>}
                  </section>
                  <section>
                    <h3>Scale</h3>
                    {diff.scales.length === 0 ? <p class="rf-muted rf-small">Identical.</p> : diff.scales.map((s) => (
                      <div class="rf-cdiff" key={s.key}><span>{SCALE[s.key]}</span><code>{s.a.toFixed(2)} → {s.b.toFixed(2)}</code></div>
                    ))}
                  </section>
                  {sa && sb && (
                    <section>
                      <h3>Cost today</h3>
                      <div class="rf-cdiff"><span>{A.data!.label}</span><b>{robux(sa.buyNow)}</b></div>
                      <div class="rf-cdiff"><span>{B.data!.label}</span><b>{robux(sb.buyNow)}</b></div>
                      <p class="rf-muted rf-small">Difference {robux(Math.abs(sa.buyNow - sb.buyNow))}. New-price items only; limiteds and unknown prices aren’t counted.</p>
                    </section>
                  )}
                </div>
              </>
            )}
            {(A.loading || B.loading) && !err && <p class="rf-muted rf-small rf-center"><Spinner size={14} /> Filling in item details…</p>}
          </>
        )}
      </div>
    </div>
  );
}

function ItemCol({ title, ids, nameOf, typeOf, viewOf, tone }: { title: string; ids: number[]; nameOf: (id: number) => string; typeOf: (id: number) => string; viewOf: (id: number) => AssetView | undefined; tone: string }) {
  return (
    <section class={'rf-ccol ' + tone}>
      <h3>{title}<span>{ids.length}</span></h3>
      {ids.length === 0 && <p class="rf-muted rf-small">Nothing.</p>}
      {ids.map((id) => {
        const v = viewOf(id);
        return (
          <a class="rf-crow" key={id} href={`https://www.roblox.com/catalog/${id}`} target="_blank" rel="noopener noreferrer" title="Open item">
            <span class="rf-ithumb">{v?.rec?.thumb ? <img src={v.rec.thumb} alt="" loading="lazy" /> : <Ico n="boxes" size={16} />}</span>
            <span class="rf-item-t"><span class="rf-item-name">{nameOf(id)}</span><span class="rf-item-sub">{typeOf(id)}</span></span>
          </a>
        );
      })}
    </section>
  );
}
