/** Theme and motion preferences. Stored on this device only; "system" follows the OS. */
type Pref = string;
const root = document.documentElement;

export function apply(theme: Pref, motion: Pref) {
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.dataset.themePref = theme;
  root.dataset.motionPref = motion;
  root.dataset.theme = theme === 'system' ? (dark ? 'dark' : 'light') : theme;
  root.dataset.motion = motion === 'system' ? (reduce ? 'reduced' : 'full') : motion;
  document.dispatchEvent(new CustomEvent('rofit:display'));
}

export function initDisplay() {
  const btn = document.getElementById('display-btn') as HTMLButtonElement | null;
  const pop = document.getElementById('display-pop') as HTMLElement | null;
  if (!btn || !pop) return;
  const get = (k: string) => { try { return localStorage.getItem(k) || 'system'; } catch { return 'system'; } };
  const set = (k: string, v: string) => { try { v === 'system' ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { /* private mode */ } };
  const sync = () => {
    for (const [name, key] of [['theme', 'rofit-theme'], ['motion', 'rofit-motion']] as const) {
      const v = get(key);
      pop.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((i) => { i.checked = i.value === v; });
    }
  };
  sync();
  pop.addEventListener('change', (e) => {
    const i = e.target as HTMLInputElement;
    set(i.name === 'theme' ? 'rofit-theme' : 'rofit-motion', i.value);
    apply(get('rofit-theme'), get('rofit-motion'));
  });
  const close = () => { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => { const open = pop.hidden; pop.hidden = !open; btn.setAttribute('aria-expanded', String(open)); if (open) pop.querySelector<HTMLInputElement>('input:checked')?.focus(); });
  document.addEventListener('pointerdown', (e) => { if (!pop.hidden && !(e.target as HTMLElement).closest('.display')) close(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pop.hidden) { close(); btn.focus(); } });
  // The OS changing while "System" is selected should be followed live.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => apply(get('rofit-theme'), get('rofit-motion')));
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => apply(get('rofit-theme'), get('rofit-motion')));
}
