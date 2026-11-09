/** Animate the profile preview from opening Outfits to highlighting a saved look. */
const STEPS = [[4, 450], [5, 1200], [6, 2250], [7, 3550]] as const;

export function runHero() {
  const root = document.getElementById('top');
  if (!root) return;
  const glass = root.querySelector<HTMLElement>('.glass')!;
  const cursor = document.getElementById('cursor') as unknown as SVGElement;
  const ripple = document.getElementById('ripple')!;
  const tab = document.getElementById('t-out')!;
  const pick = root.querySelector<HTMLElement>('.tile.pick')!;
  const replay = document.querySelector<HTMLButtonElement>('#hero-replay');
  const timers: number[] = [];
  const reduced = () => document.documentElement.dataset.motion !== 'full';

  const centre = (el: Element) => {
    const g = glass.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { x: r.left - g.left + r.width / 2, y: r.top - g.top + r.height / 2 };
  };
  const aim = (el: Element, dx = 0, dy = 0) => {
    const c = centre(el);
    cursor.style.setProperty('--tx', `${c.x + dx}px`);
    cursor.style.setProperty('--ty', `${c.y + dy}px`);
    return c;
  };
  const stage = (n: number) => {
    for (let i = 1; i <= n; i++) root.classList.add('s' + i);
    if (n === 4) aim(tab, 4, 6);
    if (n === 5) { const c = centre(tab); ripple.style.setProperty('--rx', `${c.x}px`); ripple.style.setProperty('--ry', `${c.y}px`); }
    if (n === 6) aim(pick, 10, 30);
  };
  const clear = () => { timers.forEach(clearTimeout); timers.length = 0; };

  const play = () => {
    clear();
    if (reduced()) { stage(7); return; }
    root.classList.remove('s4', 's5', 's6', 's7');
    cursor.style.removeProperty('--tx');
    cursor.style.removeProperty('--ty');
    STEPS.forEach(([step, delay]) => timers.push(window.setTimeout(() => stage(step), delay)));
  };
  if (replay) {
    replay.hidden = reduced();
    replay.addEventListener('click', play);
  }
  play();
  // If the user flips Motion to Calm/Off mid-way, jump to the finished scene.
  document.addEventListener('rofit:display', () => { if (replay) replay.hidden = reduced(); if (reduced()) { clear(); stage(7); } });
}
