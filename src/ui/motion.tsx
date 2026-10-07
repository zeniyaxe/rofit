/**
 * RoFit's motion toolkit. One place for the techniques so surfaces stay consistent:
 *  - usePresence: keep something mounted long enough to play its exit
 *  - useFlip:     collections glide to their new positions instead of snapping (sort/filter/search/layout)
 *  - useIndicator: one sliding thumb/underline shared by a group of buttons
 *  - Collapse:    height-animated disclosure (CSS grid rows, no JS measuring)
 * Everything animates transform/opacity only. Reduced motion removes travel and keeps fades (see .rm in styles.css).
 */
import type { ComponentChildren } from 'preact';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';

export const EASE = 'cubic-bezier(.22, 1, .36, 1)';

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
 * Only items that are (or were) on screen animate, capped, so 500-item collections stay cheap.
 */
export function useFlip(ref: { current: HTMLElement | null }, signature: string, reduced: boolean) {
  const prev = useRef<Map<string, [number, number]>>(new Map());
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
      let n = 0;
      grid.querySelectorAll<HTMLElement>(':scope > [data-k]').forEach((c) => {
        if (n >= 90) return;
        const k = c.dataset.k!;
        const to = next.get(k)!;
        const from = old.get(k);
        const visible = (y: number) => y + c.offsetHeight >= top && y <= bottom;
        if (from) {
          const dx = from[0] - to[0], dy = from[1] - to[1];
          if ((dx || dy) && (visible(to[1]) || visible(from[1]))) {
            n++;
            c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 420, easing: EASE });
          }
        } else if (visible(to[1])) {
          n++;
          c.animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE });
        }
      });
    } else if (!reduced && !old.size) {
      /* first paint of a collection: the CSS .intro stagger handles it */
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
 */
export function flyGhost(host: Node, src: string, from: DOMRect, to: DOMRect, ms = 420): { landed: Promise<void>; remove: () => void } {
  const root = host.getRootNode();
  const parent: Node = root instanceof ShadowRoot ? root : document.body;
  const g = document.createElement('div');
  g.className = 'rf-ghost';
  Object.assign(g.style, { left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px' });
  const img = new Image();
  img.src = src; img.alt = ''; img.draggable = false;
  g.appendChild(img);
  parent.appendChild(g);
  const a = g.animate(
    [{ transform: 'none' }, { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})` }],
    { duration: ms, easing: EASE, fill: 'forwards' },
  );
  return { landed: a.finished.then(() => {}, () => {}), remove: () => g.remove() };
}

/** Resolves when `el` contains a loaded thumbnail, or after `max` ms. */
export function whenLoaded(el: Element, max: number): Promise<void> {
  return new Promise((res) => {
    const t0 = performance.now();
    const tick = () => (el.querySelector('.rf-thumb.loaded') || performance.now() - t0 > max ? res() : requestAnimationFrame(tick));
    tick();
  });
}
