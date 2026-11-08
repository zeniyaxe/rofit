/**
 * The Compare toy. Slider: drag (or arrow keys) to wipe between two looks. Difference: rows regroup into
 * "only in A / in both / only in B" with a FLIP move, and changed rows hold an amber outline until looked at.
 */
const EASE = 'cubic-bezier(.22, 1, .36, 1)';

export function initCompare() {
  const root = document.getElementById('compare');
  const glass = document.getElementById('cmp-glass');
  const range = document.getElementById('cmp-range') as HTMLInputElement | null;
  const rows = document.getElementById('cmp-rows');
  if (!root || !glass || !range || !rows) return;
  const full = () => document.documentElement.dataset.motion === 'full';

  // ---- slider ----
  const set = (pct: number) => {
    const v = Math.max(0, Math.min(100, pct));
    glass.style.setProperty('--split', v + '%');
    range.value = String(v);
  };
  range.addEventListener('input', () => set(Number(range.value)));
  glass.addEventListener('pointerdown', (e) => { glass.setPointerCapture(e.pointerId); move(e); });
  glass.addEventListener('pointermove', (e) => { if (glass.hasPointerCapture(e.pointerId)) move(e); });
  function move(e: PointerEvent) { const r = glass!.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); stopDemo(); }

  // An unprompted wipe once the toy scrolls into view, so it explains itself. Any input cancels it.
  let demo = 0, demoOn = false;
  function stopDemo() { demoOn = false; cancelAnimationFrame(demo); }
  function runDemo() {
    if (!full()) return;
    demoOn = true;
    const t0 = performance.now();
    const tick = (t: number) => {
      if (!demoOn) return;
      const k = (t - t0) / 3200;
      if (k >= 1) { set(50); demoOn = false; return; }
      set(50 + Math.sin(k * Math.PI * 2) * 30 * (1 - k * 0.4));
      demo = requestAnimationFrame(tick);
    };
    demo = requestAnimationFrame(tick);
  }
  new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { setTimeout(runDemo, 500); io.disconnect(); } }, { threshold: 0.6 }).observe(glass);

  // ---- mode toggle with FLIP on the rows ----
  const items = [...rows.querySelectorAll<HTMLElement>('.row')];
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-mode]')];
  const setMode = (mode: string) => {
    const diff = mode === 'diff';
    if (root.classList.contains('diff') === diff) return;
    stopDemo();
    const before = new Map(items.map((r) => [r, r.getBoundingClientRect().top]));
    root.classList.toggle('diff', diff);
    buttons.forEach((b) => { const on = b.dataset.mode === mode; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
    if (!full()) return;
    items.forEach((r, i) => {
      const dy = (before.get(r) ?? 0) - r.getBoundingClientRect().top;
      if (dy) r.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 650 + i * 35, easing: EASE });
    });
  };
  buttons.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode!)));

  // changed rows count as "seen" once hovered or focused
  items.forEach((r) => {
    const seen = () => r.classList.add('seen');
    r.addEventListener('pointerenter', seen);
    r.addEventListener('click', seen);
  });
}
