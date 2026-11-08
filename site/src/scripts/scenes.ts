/**
 * Scroll scenes. A tall section holds a sticky stage; as the visitor scrolls through it, JS publishes progress as CSS variables:
 *   --p        overall 0..1
 *   --p1..--pN eased 0..1 per phase (phases come from data-phases="0 .2 .45 .8 1")
 *   data-step  the current phase number (1..N), for captions
 * CSS does the drawing, so scenes stay declarative and reverse for free when scrolling back.
 * Motion "reduced"/"off", missing JS and tiny screens fall back to a static composition (class .static) that shows the finished state.
 * Never scroll-jacks: this only reads scrollY.
 */
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

interface Scene { el: HTMLElement; cuts: number[]; active: boolean }

export function initScenes() {
  const scenes: Scene[] = [...document.querySelectorAll<HTMLElement>('[data-scene]')].map((el) => ({
    el, active: false,
    cuts: (el.dataset.phases ?? '0 .25 .5 .75 1').trim().split(/\s+/).map(Number),
  }));
  if (!scenes.length) return;

  const root = document.documentElement;
  const isStatic = () => root.dataset.motion !== 'full';

  const paint = (s: Scene) => {
    const { el, cuts } = s;
    if (isStatic()) {
      el.classList.add('static');
      el.style.setProperty('--p', '1');
      cuts.slice(1).forEach((_, i) => el.style.setProperty(`--p${i + 1}`, '1'));
      el.dataset.step = String(cuts.length - 1);
      return;
    }
    el.classList.remove('static');
    const r = el.getBoundingClientRect();
    const span = r.height - innerHeight;
    const p = span > 0 ? clamp(-r.top / span) : 1;
    el.style.setProperty('--p', p.toFixed(4));
    let step = 1;
    for (let i = 1; i < cuts.length; i++) {
      const t = clamp((p - cuts[i - 1]) / (cuts[i] - cuts[i - 1]));
      el.style.setProperty(`--p${i}`, smooth(t).toFixed(4));
      if (p >= cuts[i - 1]) step = i;
    }
    if (el.dataset.step !== String(step)) el.dataset.step = String(step);
  };

  let queued = false;
  const frame = () => { queued = false; scenes.forEach((s) => s.active && paint(s)); };
  const request = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };

  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { const s = scenes.find((x) => x.el === e.target)!; s.active = e.isIntersecting; if (e.isIntersecting) paint(s); });
  }, { rootMargin: '25% 0px 25% 0px' });
  scenes.forEach((s) => { io.observe(s.el); paint(s); });

  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  document.addEventListener('rofit:display', () => scenes.forEach(paint));
}
