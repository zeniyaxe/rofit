import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { ComponentChildren, RefObject } from 'preact';
import type { AssetView, BodyColors, LibraryEntry, OutfitDetails } from '../shared/types.ts';
import { diffOutfits, summarizePrices } from '../shared/analysis.ts';
import { typeName } from '../shared/assetTypes.ts';
import { rpc } from '../shared/rpc.ts';
import { Ico } from './icons.tsx';
import { Chip, Empty, Seg, Spinner, Swatch, Thumb, useToast } from './primitives.tsx';
import { BodyFigure } from './Inspector.tsx';
import { copy, errorText, plural, robux } from './format.ts';
import { useAsync, useOutfitBundle } from './data.ts';
import { EASE, SPRING } from './motion.tsx';

export type Subject =
  | { kind: 'outfit'; userId: number; userName: string; id: number; name: string; lib?: LibraryEntry }
  | { kind: 'me' };

interface Loaded { label: string; sub: string; details: OutfitDetails; views: Record<number, AssetView>; thumbId?: number; thumbUrl?: string }
type Lens = 'all' | 'a' | 'both' | 'b';

const CATALOG = 'https://www.roblox.com/catalog/';
const subjKey = (s: Subject) => (s.kind === 'me' ? 'me' : `o${s.userId}:${s.id}`);

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
    // The avatar render of what you're wearing right now, so "saved vs worn" can use the wipe too. Optional: if
    // Roblox has no render yet the mirror falls back to body figures.
    const worn: any = await (rpc as any)('user.worn', { userId: r.me.id }).catch(() => null);
    return { me: r.me, avatar: r.avatar, views, thumbUrl: (worn?.thumb?.url as string | undefined) ?? undefined };
  }, [isOutfit]);
  if (isOutfit) {
    if (!bundle.bundle) return { error: bundle.error, loading: !bundle.error };
    return { loading: bundle.phase === 'assets', data: { label: s.name, sub: s.userName, details: bundle.bundle.details, views: bundle.bundle.views, thumbId: s.id, thumbUrl: s.lib?.thumb } };
  }
  if (!me.data) return { error: me.error, loading: me.loading };
  return { loading: false, data: { label: 'What I’m wearing', sub: me.data.me.name, details: me.data.avatar, views: me.data.views, thumbUrl: me.data.thumbUrl } };
}

const PART: Record<keyof BodyColors, string> = { head: 'Head', torso: 'Torso', rightArm: 'Right arm', leftArm: 'Left arm', rightLeg: 'Right leg', leftLeg: 'Left leg' };
const SCALE: Record<string, string> = { height: 'Height', width: 'Width', head: 'Head', depth: 'Depth', proportion: 'Proportions', bodyType: 'Body type' };

/** The avatar render for a subject: outfit thumbnail, a direct render URL, or the body-colour figure as a last resort. */
function Preview({ s, size = '420x420' }: { s?: Loaded; size?: string }) {
  if (!s) return <div class="rf-skel" />;
  if (s.thumbId) return <Thumb id={s.thumbId} size={size as any} src={s.thumbUrl} alt={s.label} />;
  if (s.thumbUrl) return <span class="rf-thumb"><img src={s.thumbUrl} alt={s.label} /></span>;
  return <BodyFigure c={s.details.bodyColors} />;
}

/**
 * Shared-element morph for [data-morph] nodes inside root. Each node is keyed by the subject it shows, so when the
 * subjects swap sides (or the mirror changes mode) the same subject's preview flies from where it was to where it is.
 * Interruptible: an in-flight morph is measured where it visually is, cancelled, and retargeted from there.
 */
function useMorph(root: RefObject<HTMLElement | null>, sig: string) {
  const last = useRef(new Map<string, { x: number; y: number; w: number; h: number }>());
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const base = el.getBoundingClientRect();
    const calm = !!el.closest('.rm');
    const balanced = !!el.closest('.mb');
    const next = new Map<string, { x: number; y: number; w: number; h: number }>();
    const rel = (r: DOMRect) => ({ x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height });
    for (const n of el.querySelectorAll<HTMLElement>('[data-morph]')) {
      const k = n.dataset.morph!;
      const running = n.getAnimations();
      const visual = running.length ? rel(n.getBoundingClientRect()) : null;
      running.forEach((a) => a.cancel());
      const now = rel(n.getBoundingClientRect());
      next.set(k, now);
      const from = visual ?? last.current.get(k);
      if (!from || calm || !now.w || !now.h) continue;
      const dx = from.x - now.x, dy = from.y - now.y, sx = from.w / now.w, sy = from.h / now.h;
      if (Math.abs(dx) + Math.abs(dy) < 1 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) continue;
      n.animate(
        [{ transformOrigin: '0 0', transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }, { transformOrigin: '0 0', transform: 'none' }],
        { duration: balanced ? 300 : 560, easing: balanced ? EASE : SPRING },
      );
    }
    last.current = next;
  }, [sig]);
}

/** Before/after wipe. Drag anywhere (mouse, pen, touch), or focus the handle and use the arrow keys. */
function Wipe({ left, right, la, lb, morphA, morphB }: { left: ComponentChildren; right: ComponentChildren; la: string; lb: string; morphA: string; morphB: string }) {
  const [pos, setPos] = useState(50);
  const [grab, setGrab] = useState(false);
  const [glide, setGlide] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const glideT = useRef(0);
  const at = (x: number) => { const r = ref.current!.getBoundingClientRect(); return Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)); };
  const glideTo = (p: number) => { setGlide(true); clearTimeout(glideT.current); glideT.current = window.setTimeout(() => setGlide(false), 360); setPos(Math.max(0, Math.min(100, p))); };
  useEffect(() => () => clearTimeout(glideT.current), []);
  return (
    <div ref={ref} class={'rf-stage rf-wipe' + (grab ? ' grab' : '') + (glide ? ' glide' : '')} style={{ '--pos': pos + '%' } as any}
      onPointerDown={(e) => { if (e.button !== 0) return; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setGrab(true); setGlide(false); setPos(at(e.clientX)); }}
      onPointerMove={(e) => { if (grab) setPos(at(e.clientX)); }}
      onPointerUp={() => setGrab(false)} onPointerCancel={() => setGrab(false)}
      onDblClick={() => glideTo(50)}>
      <div class="rf-wipe-l" data-morph={morphA}>{left}</div>
      <div class="rf-wipe-r" data-morph={morphB}>{right}</div>
      <span class="rf-overlay-tag l" style={{ opacity: pos < 14 ? '0' : '1' }}>{la}</span>
      <span class="rf-overlay-tag r" style={{ opacity: pos > 86 ? '0' : '1' }}>{lb}</span>
      <div class="rf-wipe-h" role="slider" tabIndex={0} aria-label="Wipe between the two outfits" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} aria-valuetext={`${Math.round(100 - pos)}% ${la}, ${Math.round(pos)}% ${lb}`}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 10 : 2;
          const map: Record<string, number> = { ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, PageDown: pos - 25, PageUp: pos + 25, Home: 0, End: 100 };
          if (e.key in map) { e.preventDefault(); e.stopPropagation(); glideTo(map[e.key]); }
        }}>
        <span class="rf-wipe-k"><Ico n="sliders" size={16} /></span>
      </div>
    </div>
  );
}

function SimRing({ value }: { value: number }) {
  const C = 2 * Math.PI * 34;
  return (
    <div class="rf-simring" role="img" aria-label={`${Math.round(value * 100)}% of items shared`}>
      <svg viewBox="0 0 80 80" aria-hidden="true"><circle class="bg" cx="40" cy="40" r="34" /><circle class="fg" cx="40" cy="40" r="34" style={{ strokeDasharray: String(C), strokeDashoffset: String(C * (1 - value)) }} /></svg>
      <b>{Math.round(value * 100)}<small>%</small></b>
      <span>shared</span>
    </div>
  );
}

export function Compare({ a, b, onClose, onSwap }: { a: Subject; b: Subject; onClose: () => void; onSwap: () => void }) {
  const A = useSubject(a), B = useSubject(b);
  const [mode, setMode] = useState<'sides' | 'blend'>('sides');
  const [lens, setLens] = useState<Lens>(() => (matchMedia('(max-width: 760px)').matches ? 'a' : 'all'));
  const [turn, setTurn] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const canBlend = !!(A.data && B.data && (A.data.thumbId || A.data.thumbUrl) && (B.data.thumbId || B.data.thumbUrl));
  const view = mode === 'blend' && canBlend ? 'blend' : 'sides';
  const both = A.data && B.data;
  const diff = useMemo(() => (both ? diffOutfits(A.data!.details, B.data!.details) : null), [A.data?.details, B.data?.details]);
  const err = A.error ?? B.error;
  const ka = subjKey(a), kb = subjKey(b);

  // Which of these items you already own (only when signed in; otherwise the ownership UI stays hidden).
  const allIds = useMemo(() => (diff ? [...diff.onlyA, ...diff.shared, ...diff.onlyB] : []), [diff]);
  const owned = useAsync<Record<number, boolean> | null>(async () => {
    if (!allIds.length) return null;
    const r: any = await (rpc as any)('assets.owned', { ids: allIds }).catch(() => null);
    return r?.me ? (r.owned as Record<number, boolean>) : null;
  }, [allIds.join(',')]);
  const own = owned.data;

  useMorph(root, `${view}|${ka}|${kb}|${!!A.data}|${!!B.data}`);

  const swap = () => { setTurn((t) => t + 1); onSwap(); };
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.metaKey || e.ctrlKey || e.altKey || (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === 's' || e.key === 'S') { e.preventDefault(); swap(); }
      else if ((e.key === 'm' || e.key === 'M') && canBlend) { e.preventDefault(); setMode((m) => (m === 'sides' ? 'blend' : 'sides')); }
    };
    addEventListener('keydown', on);
    return () => removeEventListener('keydown', on);
  }, [canBlend, onSwap]);

  const nameOf = (id: number) => A.data?.views[id]?.rec?.name ?? A.data?.details.assets.find((x) => x.id === id)?.name ?? B.data?.views[id]?.rec?.name ?? B.data?.details.assets.find((x) => x.id === id)?.name ?? String(id);
  const typeOf = (id: number) => { const r = A.data?.details.assets.find((x) => x.id === id) ?? B.data?.details.assets.find((x) => x.id === id); return r ? typeName(r.assetTypeId, r.assetTypeName) : ''; };
  const viewOf = (id: number) => A.data?.views[id] ?? B.data?.views[id];
  const sumOf = (l: Loaded | undefined, ids?: number[]) => (l ? summarizePrices((ids ?? l.details.assets.map((x) => x.id)).map((id) => l.views[id]).filter(Boolean)) : null);
  const sa = sumOf(A.data), sb = sumOf(B.data);
  // What switching costs: the items unique to the other side that you don't already own.
  const toB = diff && B.data ? sumOf(B.data, diff.onlyB.filter((id) => !own?.[id])) : null;
  const toA = diff && A.data ? sumOf(A.data, diff.onlyA.filter((id) => !own?.[id])) : null;
  const ownCount = (ids: number[]) => ids.filter((id) => own?.[id]).length;

  const text = () => !diff ? '' : [
    `${A.data!.label} vs ${B.data!.label} — ${Math.round(diff.similarity * 100)}% similar`,
    `Shared (${diff.shared.length}): ${diff.shared.map(nameOf).join(', ')}`,
    `Only in ${A.data!.label} (${diff.onlyA.length}): ${diff.onlyA.map(nameOf).join(', ')}`,
    `Only in ${B.data!.label} (${diff.onlyB.length}): ${diff.onlyB.map(nameOf).join(', ')}`,
  ].join('\n');

  const caption = (S: { data?: Loaded }, side: 'a' | 'b') => (
    <figcaption>
      <b>{S.data?.label ?? '…'}</b>
      <span class="rf-muted rf-small">{S.data ? `${S.data.sub} · ${S.data.details.avatarType} · ${plural(S.data.details.assets.length, 'item')}` : 'Loading'}</span>
      {own && diff && <Chip>{`You own ${ownCount(side === 'a' ? [...diff.onlyA, ...diff.shared] : [...diff.onlyB, ...diff.shared])} of ${(side === 'a' ? diff.onlyA.length : diff.onlyB.length) + diff.shared.length}`}</Chip>}
    </figcaption>
  );

  const lenses: { v: Lens; label: string; n: number }[] = diff ? [
    { v: 'all', label: 'Everything', n: diff.onlyA.length + diff.shared.length + diff.onlyB.length },
    { v: 'a', label: `Only ${A.data!.label}`, n: diff.onlyA.length },
    { v: 'both', label: 'In both', n: diff.shared.length },
    { v: 'b', label: `Only ${B.data!.label}`, n: diff.onlyB.length },
  ] : [];
  const maxCost = Math.max(1, sa?.buyNow ?? 0, sb?.buyNow ?? 0);

  return (
    <div class="rf-compare rf-mirror-tool">
      <header class="rf-cbar">
        <button class="rf-btn" onClick={onClose}><Ico n="back" size={16} />Back</button>
        <h2>The mirror</h2>
        <div class="rf-grow" />
        {canBlend && <Seg label="Mirror view" value={mode} onChange={setMode} options={[{ v: 'sides', label: 'Side by side' }, { v: 'blend', label: 'Wipe' }]} />}
        <button class="rf-btn rf-swapbtn" onClick={swap} title="Swap sides (S)"><span class="rf-swapico" style={{ '--turn': String(turn) } as any}><Ico n="repeat" size={16} /></span>Swap</button>
        <button class="rf-btn" disabled={!diff} onClick={async () => toast((await copy(text())) ? 'Copied differences' : 'Couldn’t copy')}><Ico n="copy" size={16} />Copy differences</button>
      </header>
      <div class="rf-cscroll" ref={root}>
        {err ? <Empty icon="warn" title={errorText(err).title} body={errorText(err).body} /> : (
          <>
            {view === 'blend' ? (
              <div class="rf-mirror blend">
                <Wipe left={<Preview s={A.data} />} right={<Preview s={B.data} />} la={A.data!.label} lb={B.data!.label} morphA={ka} morphB={kb} />
                <div class="rf-mirror-legend"><span class="a">{A.data!.label}</span>{diff && <b>{Math.round(diff.similarity * 100)}% shared</b>}<span class="b">{B.data!.label}</span></div>
                <p class="rf-muted rf-small rf-center">Drag anywhere, or focus the handle and use the arrow keys (Shift for bigger steps). Double-click to centre.</p>
              </div>
            ) : (
              <div class="rf-mirror sides">
                <figure class="rf-mside a"><div class="rf-stage rf-mstage" data-morph={ka}><Preview s={A.data} /></div>{caption(A, 'a')}</figure>
                <div class="rf-mid">
                  {diff ? <SimRing value={diff.similarity} /> : <Spinner />}
                  {diff && <div class="rf-mid-n"><span title="Only on the left"><i class="a" />{diff.onlyA.length}</span><span title="In both"><i class="both" />{diff.shared.length}</span><span title="Only on the right"><i class="b" />{diff.onlyB.length}</span></div>}
                </div>
                <figure class="rf-mside b"><div class="rf-stage rf-mstage" data-morph={kb}><Preview s={B.data} /></div>{caption(B, 'b')}</figure>
              </div>
            )}

            {diff && (
              <>
                <div class="rf-lens" role="radiogroup" aria-label="Show items">
                  {lenses.map((l) => (
                    <button key={l.v} role="radio" aria-checked={lens === l.v} class={'rf-chip lens-' + l.v + (lens === l.v ? ' on' : '')} onClick={() => setLens(l.v)}>
                      <span class="rf-lens-t">{l.label}</span><em>{l.n}</em>
                    </button>
                  ))}
                </div>
                <div class={'rf-cols3 lens-' + lens}>
                  {(lens === 'all' || lens === 'a') && <ItemCol title={`Only in ${A.data!.label}`} ids={diff.onlyA} nameOf={nameOf} typeOf={typeOf} viewOf={viewOf} own={own} tone="a" />}
                  {(lens === 'all' || lens === 'both') && <ItemCol title="In both" ids={diff.shared} nameOf={nameOf} typeOf={typeOf} viewOf={viewOf} own={own} tone="both" />}
                  {(lens === 'all' || lens === 'b') && <ItemCol title={`Only in ${B.data!.label}`} ids={diff.onlyB} nameOf={nameOf} typeOf={typeOf} viewOf={viewOf} own={own} tone="b" />}
                </div>

                <div class="rf-cdetails">
                  {sa && sb && (
                    <section class="rf-ccost">
                      <h3><Ico n="coins" size={15} />Cost today</h3>
                      <div class="rf-cbarrow a"><span>{A.data!.label}</span><i style={{ '--w': String(sa.buyNow / maxCost) } as any} /><b>{robux(sa.buyNow)}</b></div>
                      <div class="rf-cbarrow b"><span>{B.data!.label}</span><i style={{ '--w': String(sb.buyNow / maxCost) } as any} /><b>{robux(sb.buyNow)}</b></div>
                      {toB && toA && <p class="rf-small">Switching to {B.data!.label}: <b>{robux(toB.buyNow)}</b>{own ? ' (skipping what you own)' : ''}. The other way: <b>{robux(toA.buyNow)}</b>.</p>}
                      <p class="rf-muted rf-small">New-price items only; limiteds, off-sale and unknown prices aren’t counted.</p>
                    </section>
                  )}
                  <section>
                    <h3><Ico n="palette" size={15} />Body colors</h3>
                    <div class="rf-bodypair"><BodyFigure c={A.data!.details.bodyColors} /><BodyFigure c={B.data!.details.bodyColors} /></div>
                    {diff.colors.length === 0 ? <p class="rf-muted rf-small">Identical.</p> : diff.colors.map((c) => (
                      <div class="rf-cdiff" key={c.part}><span>{PART[c.part]}</span><Swatch hex={c.a} /><Ico n="right" size={14} /><Swatch hex={c.b} /><code>#{c.a} → #{c.b}</code></div>
                    ))}
                    {diff.avatarTypeDiffers && <p class="rf-small"><Chip tone="warn">{A.data!.details.avatarType} vs {B.data!.details.avatarType}</Chip></p>}
                  </section>
                  <section class="rf-scalediff">
                    <h3><Ico n="scale" size={15} />Scale</h3>
                    {diff.scales.length === 0 ? <p class="rf-muted rf-small">Identical.</p> : diff.scales.map((s) => {
                      const pct = s.a ? Math.round(((s.b - s.a) / s.a) * 100) : 0;
                      return <div class="rf-cdiff" key={s.key}><span>{SCALE[s.key]}</span><code>{s.a.toFixed(2)} → {s.b.toFixed(2)}</code>{pct !== 0 && <em class={pct > 0 ? 'up' : 'down'}>{pct > 0 ? '+' : ''}{pct}%</em>}</div>;
                    })}
                  </section>
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

function ItemCol({ title, ids, nameOf, typeOf, viewOf, own, tone }: { title: string; ids: number[]; nameOf: (id: number) => string; typeOf: (id: number) => string; viewOf: (id: number) => AssetView | undefined; own: Record<number, boolean> | null | undefined; tone: string }) {
  return (
    <section class={'rf-ccol ' + tone}>
      <h3>{title}<span>{ids.length}</span></h3>
      {ids.length === 0 && <p class="rf-muted rf-small">Nothing.</p>}
      {ids.map((id, i) => {
        const v = viewOf(id);
        return (
          <a class="rf-crow" key={id} href={CATALOG + id} target="_blank" rel="noopener noreferrer" title="Open item" style={{ '--i': String(Math.min(i, 12)) } as any}>
            <span class="rf-ithumb">{v?.rec?.thumb ? <img src={v.rec.thumb} alt="" loading="lazy" /> : <Ico n="boxes" size={16} />}</span>
            <span class="rf-item-t"><span class="rf-item-name">{nameOf(id)}</span><span class="rf-item-sub">{typeOf(id)}</span></span>
            {own?.[id] && <span class="rf-owned" title="You own this"><Ico n="ok" size={14} /></span>}
          </a>
        );
      })}
    </section>
  );
}
