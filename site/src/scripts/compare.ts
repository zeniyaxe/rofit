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
  glass.addEventListener('pointerdown', (event) => {
    if (range.disabled || event.button !== 0) return;
    event.preventDefault();
    range.focus({ preventScroll: true });
    glass.setPointerCapture(event.pointerId);
    move(event);
  });
  glass.addEventListener('pointermove', (event) => {
    if (glass.hasPointerCapture(event.pointerId)) move(event);
  });
  function move(event: PointerEvent) {
    const rect = glass!.getBoundingClientRect();
    set((event.clientX - rect.left) / rect.width * 100);
  }

  // ---- mode toggle with FLIP on the rows ----
  const items = [...rows.querySelectorAll<HTMLElement>('.row')];
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-mode]')];
  const setMode = (mode: string) => {
    const diff = mode === 'diff';
    if (root.classList.contains('diff') === diff) return;
    range.disabled = diff;
    if (!diff) set(50);
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
