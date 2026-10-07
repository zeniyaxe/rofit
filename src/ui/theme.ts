import type { Settings } from '../shared/settings.ts';

interface Tokens { bg: string; fg: string; accent: string; accentFg: string; tint: string }

// Roblox's neutrals are blue-tinted overlays (light: rgb(27,37,75), dark: rgb(208,217,251)), not plain grey; surfaces are mixed from that tint.
const LIGHT: Tokens = { bg: 'rgb(255, 255, 255)', fg: 'rgb(32, 34, 39)', accent: 'rgb(51, 95, 255)', accentFg: '#ffffff', tint: 'rgb(27, 37, 75)' };
const DARK: Tokens = { bg: 'rgb(18, 18, 21)', fg: 'rgb(247, 247, 248)', accent: 'rgb(51, 95, 255)', accentFg: '#ffffff', tint: 'rgb(208, 217, 251)' };
const OLED: Tokens = { bg: 'rgb(0, 0, 0)', fg: 'rgb(247, 247, 248)', accent: 'rgb(51, 95, 255)', accentFg: '#ffffff', tint: 'rgb(208, 217, 251)' };

function parse(c: string): [number, number, number, number] | null {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
  return [p[0], p[1], p[2], p[3] ?? 1];
}
const luminance = ([r, g, b]: number[]) => {
  const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

/** Reads what Roblox is actually painting. Falls back to fixed palettes when nothing usable is found. */
function samplePage(): Tokens {
  const walk = (el: Element | null) => {
    for (let n: Element | null = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c[3] > 0.9) return c;
    }
    return null;
  };
  const bg = walk(document.body) ?? walk(document.documentElement);
  if (!bg) return LIGHT;
  const dark = luminance(bg) < 0.4;
  const base = dark ? DARK : LIGHT;
  const fg = parse(getComputedStyle(document.body).color);
  let accent = base.accent;
  const btn = document.querySelector('.bg-action-emphasis, .btn-primary-md, .btn-growth-md');
  const ac = btn ? parse(getComputedStyle(btn).backgroundColor) : null;
  if (ac && ac[3] > 0.9) accent = `rgb(${ac[0]}, ${ac[1]}, ${ac[2]})`;
  // Roblox's own neutral control colour carries the tint; use it when the page has one on screen.
  const std = document.querySelector('.bg-action-standard');
  const sc = std ? parse(getComputedStyle(std).backgroundColor) : null;
  const tint = sc ? `rgb(${sc[0]}, ${sc[1]}, ${sc[2]})` : base.tint;
  return { bg: `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`, fg: fg ? `rgb(${fg[0]}, ${fg[1]}, ${fg[2]})` : base.fg, accent, accentFg: '#ffffff', tint };
}

export type Theme = Tokens & { dark: boolean };

export function resolveTheme(s: Settings, onRoblox: boolean): Theme {
  let t: Tokens;
  if (s.appearance === 'light') t = LIGHT;
  else if (s.appearance === 'dark') t = DARK;
  else if (s.appearance === 'oled') t = OLED;
  else if (onRoblox) t = samplePage();
  else t = window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  const rgb = parse(t.bg);
  return { ...t, dark: rgb ? luminance(rgb) < 0.4 : false };
}

export function themeVars(t: Theme): Record<string, string> {
  // Dark needs a stronger tint than light to read as the same step on Roblox's ramp (measured: surface is ~11% / ~3.5%).
  const [s1, s2, s3, ln] = t.dark ? ['11%', '17%', '23%', '19%'] : ['3.5%', '7.5%', '12%', '13%'];
  return { '--rf-bg': t.bg, '--rf-fg': t.fg, '--rf-accent': t.accent, '--rf-accent-fg': t.accentFg, '--rf-tint': t.tint, '--rf-s1': s1, '--rf-s2': s2, '--rf-s3': s3, '--rf-line-pct': ln, 'color-scheme': t.dark ? 'dark' : 'light' };
}
