/**
 * RoFit's motion toolkit. One place for the techniques so surfaces stay consistent:
 *  - usePresence: keep something mounted long enough to play its exit
 *  - useFlip:     collections glide to their new positions instead of snapping (sort/filter/search/layout)
 *  - useIndicator: one sliding thumb/underline shared by a group of buttons
 *  - Collapse:    height-animated disclosure (CSS grid rows, no JS measuring)
 * Everything animates transform/opacity only. Three levels (shared/motion.ts): Full; Balanced = shorter, no overshoot,
 * no shared-element flights or stagger; Calm = no travel at all, fades only (see .mb / .rm in styles.css).
 */
import type { ComponentChildren } from 'preact';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { DURATION, type MotionLevel } from '../shared/motion.ts';

export const EASE = 'cubic-bezier(.22, 1, .36, 1)';
/**
 * Near-critically-damped spring (stiffness ~260, damping ~26) sampled into linear(): ~2% overshoot, settles fast.
 * Used for layout travel in Full motion; Balanced uses EASE (no overshoot); Calm doesn't travel.
 */
export const SPRING = 'linear(0, .0175, .0659 2.3%, .1381 3.6%, .4245 8%, .5574 10.3%, .6763, .7759 15.1%, .8541 17.7%, .9147 20.5%, .9568 23.4%, .9837 26.4%, 1.0007 29.6%, 1.0153 34.4%, 1.0198 40%, 1.0168 46.6%, 1.0056 59.3%, .9994 74.2%, 1)';
const travelEase = (l: MotionLevel) => (l === 'full' ? SPRING : EASE);

/** Current visual translate of an element (mid-animation included), read before its animation is cancelled. */
function liveOffset(el: Element): [number, number] {
  const tf = getComputedStyle(el).transform;
  if (!tf || tf === 'none') return [0, 0];
  const m = new DOMMatrixReadOnly(tf);
  return [m.m41, m.m42];
}
export type { MotionLevel };

export function usePresence(show: boolean, ms: number): [boolean, 'open' | 'closed'] {
  const [mounted, setMounted] = useState(show);
  useEffect(() => {
    if (show) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(false), ms);
    return () => clearTimeout(t);
  }, [show, ms]);
  return [show || mounted, show ? 'open' : 'closed'];
}

/** Sets --x/--w on `ref` from the active button so a pseudo-element can slide between buttons. */
export function useIndicator(ref: { current: HTMLElement | null }, dep: unknown, inset = 0) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const place = () => {
      const a = el.querySelector<HTMLElement>('[aria-checked=true],[aria-selected=true]');
      if (!a) { el.style.setProperty('--w', '0px'); return; }
      el.style.setProperty('--x', a.offsetLeft + inset + 'px');
      el.style.setProperty('--w', Math.max(0, a.offsetWidth - inset * 2) + 'px');
    };
    const snap = () => { el.classList.add('still'); place(); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('still'))); };
    if (!el.dataset.ready) { el.dataset.ready = '1'; snap(); } else place();
    // Fonts/counters can resize buttons after mount: re-place without animating.
    const ro = new ResizeObserver(snap);
    ro.observe(el);
    return () => ro.disconnect();
  }, [dep]);
}
/**
 * FLIP for a grid/list whose children carry data-k. Positions are read as offsetLeft/Top (scroll-independent) and
 * refreshed on resize, so a sort after a window resize still starts from where things really were.
 * Interruptible: if a card is still travelling when the list changes again (typing fast, sort then filter), it is
 * retargeted from where it is *on screen right now*, never snapped back to its old slot. The latest change always wins.
 * Only items that are (or were) on screen animate, capped, so 500-item collections stay cheap. Newly revealed items
 * cascade in when the set is small (Full only); big reveals land together so nothing waits on decoration.
 */
export function useFlip(ref: { current: HTMLElement | null }, signature: string, level: MotionLevel) {
  const reduced = level === 'calm';
  const t = DURATION[level];
  const prev = useRef<Map<string, [number, number]>>(new Map());
  const live = useRef<WeakMap<Element, Animation>>(new WeakMap());
  const read = () => {
    const m = new Map<string, [number, number]>();
    ref.current?.querySelectorAll<HTMLElement>(':scope > [data-k]').forEach((c) => m.set(c.dataset.k!, [c.offsetLeft, c.offsetTop]));
    return m;
  };

  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const next = read();
    const old = prev.current;
    if (!reduced && old.size && next.size) {
      const sc = grid.closest<HTMLElement>('.rf-scroll');
      const top = (sc?.scrollTop ?? 0) - 160 - grid.offsetTop;
      const bottom = top + (sc?.clientHeight ?? 800) + 320;
      const entering: HTMLElement[] = [];
      let n = 0;
      grid.querySelectorAll<HTMLElement>(':scope > [data-k]').forEach((c) => {
        if (n >= 90) return;
        const k = c.dataset.k!;
        const to = next.get(k)!;
        const from = old.get(k);
        const visible = (y: number) => y + c.offsetHeight >= top && y <= bottom;
        // Retarget: fold any in-flight travel into the start point, then drop the old animation.
        const running = live.current.get(c);
        let ox = 0, oy = 0;
        if (running && running.playState === 'running') { [ox, oy] = liveOffset(c); running.cancel(); }
        if (from) {
          const dx = from[0] - to[0] + ox, dy = from[1] - to[1] + oy;
          if ((Math.abs(dx) > .5 || Math.abs(dy) > .5) && (visible(to[1]) || visible(from[1]))) {
            n++;
            // Longer trips get a touch more time, so a card crossing the grid doesn't outrun a neighbour shuffle.
            const ms = Math.round(t.flip * Math.min(1.25, .8 + Math.hypot(dx, dy) / 1200));
            live.current.set(c, c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: ms, easing: travelEase(level) }));
          }
        } else if (visible(to[1])) {
          n++;
          entering.push(c);
        }
      });
      const stagger = level === 'full' && entering.length <= 24 ? 22 : 0;
      entering.forEach((c, i) => {
        // Balanced: fade in place; Full: rise and grow from slightly below, small sets cascade.
        const kf = level === 'full'
          ? [{ opacity: 0, transform: 'translateY(8px) scale(.94)' }, { opacity: 1, transform: 'none' }]
          : [{ opacity: 0 }, { opacity: 1 }];
        live.current.set(c, c.animate(kf, { duration: t.enter, delay: i * stagger, easing: travelEase(level), fill: 'backwards' }));
      });
    }
    prev.current = next;
  }, [signature]);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    let raf = 0;
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { prev.current = read(); }); });
    ro.observe(grid);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
}

/** True for a short window after `key` changes: drives the one-time staggered entrance of a freshly loaded collection. */
export function useIntro(key: unknown, ms = 900): boolean {
  const [on, setOn] = useState(true);
  useEffect(() => { setOn(true); const t = setTimeout(() => setOn(false), ms); return () => clearTimeout(t); }, [key]);
  return on;
}

export function Collapse({ open, children, id }: { open: boolean; children: ComponentChildren; id?: string }) {
  const [seen, setSeen] = useState(open);
  useEffect(() => { if (open) setSeen(true); }, [open]);
  return (
    <div class="rf-collapse" data-open={open} id={id} aria-hidden={!open}>
      <div class="rf-collapse-in">{seen && children}</div>
    </div>
  );
}

/** Largest centered square inside r: where a contained square avatar render actually sits. */
export function fitSquare(r: DOMRect): DOMRect {
  const s = Math.min(r.width, r.height);
  return new DOMRect(r.left + (r.width - s) / 2, r.top + (r.height - s) / 2, s, s);
}

/**
 * Shared-element flight: a ghost copy of the real image travels from one square to another above everything,
 * so it can cross panel boundaries and scroll clipping that the real elements can't.
 * `landed` resolves when the flight ends; the ghost stays until remove() so the caller can hand over without a flash.
 * Only one flight exists at a time: starting a new one (switching outfits mid-flight, closing during the entrance)
 * takes over from wherever the previous ghost is on screen, so rapid clicks never stack ghosts or jump.
 */
let activeFlight: { g: HTMLElement; a: Animation } | null = null;
export function flyGhost(host: Node, src: string, from: DOMRect, to: DOMRect, ms = 420): { landed: Promise<void>; remove: () => void } {
  if (activeFlight) {
    const r = activeFlight.g.getBoundingClientRect();
    if (activeFlight.a.playState === 'running' && r.width > 0) from = new DOMRect(r.left, r.top, r.width, r.height);
    activeFlight.a.cancel();
    activeFlight.g.remove();
    activeFlight = null;
  }
  const root = host.getRootNode();
  const parent: Node = root instanceof ShadowRoot ? root : document.body;
  const g = document.createElement('div');
  g.className = 'rf-ghost';
  Object.assign(g.style, { left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px' });
  const img = new Image();
  img.src = src; img.alt = ''; img.draggable = false;
  g.appendChild(img);
  parent.appendChild(g);
  const dx = to.left - from.left, dy = to.top - from.top, k = to.width / from.width;
  // A slight lift at mid-flight (shadow) reads as the card being picked up, not slid.
  const a = g.animate(
    [
      { transform: 'none', boxShadow: '0 0 0 rgb(0 0 0 / 0)' },
      { transform: `translate(${dx * .55}px, ${dy * .55}px) scale(${1 + (k - 1) * .6})`, boxShadow: '0 18px 40px rgb(0 0 0 / .22)', offset: .5 },
      { transform: `translate(${dx}px, ${dy}px) scale(${k})`, boxShadow: '0 0 0 rgb(0 0 0 / 0)' },
    ],
    { duration: ms, easing: EASE, fill: 'forwards' },
  );
  const me = { g, a };
  activeFlight = me;
  return {
    landed: a.finished.then(() => {}, () => {}),
    remove: () => { g.remove(); if (activeFlight === me) activeFlight = null; },
  };
}

/** Resolves when `el` contains a loaded thumbnail, or after `max` ms. */
export function whenLoaded(el: Element, max: number): Promise<void> {
  return new Promise((res) => {
    const t0 = performance.now();
    const tick = () => (el.querySelector('.rf-thumb.loaded') || performance.now() - t0 > max ? res() : requestAnimationFrame(tick));
    tick();
  });
}

