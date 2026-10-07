import { createContext, type ComponentChildren, type JSX } from 'preact';
import { useContext, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'preact/hooks';
import { Ico, type IconName } from './icons.tsx';
import { useThumb } from './data.ts';
import { useIndicator, usePresence } from './motion.tsx';

// ---- toast -----------------------------------------------------------------------------------
type ToastFn = (msg: string, opts?: { tone?: 'ok' | 'warn' }) => void;
export const ToastCtx = createContext<ToastFn>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastHost({ children }: { children: ComponentChildren }) {
  const [t, set] = useState<{ msg: string; tone: string; n: number } | null>(null);
  const [shown, setShown] = useState(false);
  const timer = useRef(0);
  const push = useCallback<ToastFn>((msg, o) => {
    clearTimeout(timer.current);
    set((p) => ({ msg, tone: o?.tone ?? 'ok', n: (p?.n ?? 0) + 1 }));
    setShown(true);
    // Leave animation: flag it closed first, remove after it has played.
    timer.current = window.setTimeout(() => { setShown(false); timer.current = window.setTimeout(() => set(null), 200); }, 2600);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div class="rf-toast-wrap" role="status" aria-live="polite">
        {t && <div class={'rf-toast ' + t.tone} key={t.n} data-state={shown ? 'open' : 'closed'}><Ico n={t.tone === 'warn' ? 'warn' : 'check'} size={16} />{t.msg}</div>}
      </div>
    </ToastCtx.Provider>
  );
}

// ---- menu ------------------------------------------------------------------------------------
export interface MenuItem {
  label?: string; icon?: IconName; onClick?: () => void; danger?: boolean; disabled?: boolean; sep?: boolean; hint?: string; checked?: boolean;
}

export function Menu({ items, label, icon = 'more', children, align = 'right', class: cls }: {
  items: MenuItem[]; label: string; icon?: IconName; children?: ComponentChildren; align?: 'left' | 'right'; class?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, mstate] = usePresence(open, 130);
  const [pos, setPos] = useState<{ top: number; left?: number; right?: number; maxH: number } | null>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open || !btn.current) return;
    const r = btn.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const below = vh - r.bottom - 12;
    const flip = below < 220 && r.top > below;
    const top = flip ? Math.max(8, r.top - 8 - Math.min(360, r.top - 16)) : r.bottom + 6;
    // position:fixed is relative to the nearest transformed ancestor, not the viewport. A hidden probe tells us where that origin is.
    const probe = document.createElement('div');
    probe.style.cssText = 'position:fixed;inset:0;visibility:hidden;pointer-events:none';
    btn.current.parentElement!.appendChild(probe);
    const cb = probe.getBoundingClientRect();
    probe.remove();
    setPos({
      top: top - cb.top, maxH: Math.max(160, flip ? r.top - 16 : below),
      ...(align === 'right' ? { right: cb.right - r.right } : { left: r.left - cb.left }),
    });
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    // Listeners on window see a shadow-DOM target retargeted to the host, so test the composed path instead of e.target.
    const close = (e: Event) => { const path = e.composedPath(); if (!path.includes(pop.current as EventTarget) && !path.includes(btn.current as EventTarget)) setOpen(false); };
    const key = (e: KeyboardEvent) => {
      const els = [...(pop.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])];
      const i = els.indexOf(document.activeElement as HTMLButtonElement) >= 0 ? els.indexOf(document.activeElement as HTMLButtonElement) : els.findIndex((el) => el === (pop.current?.getRootNode() as ShadowRoot | Document).activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); els[(i + 1) % els.length]?.focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); els[(i - 1 + els.length) % els.length]?.focus(); }
    };
    // Esc belongs to the topmost layer: catch it before the shell can treat it as "close the sheet".
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); setOpen(false); btn.current?.focus(); } };
    window.addEventListener('keydown', esc, true);
    window.addEventListener('pointerdown', close, true);
    pop.current?.addEventListener('keydown', key);
    const raf = requestAnimationFrame(() => pop.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus());
    const rs = () => setOpen(false);
    window.addEventListener('resize', rs);
    return () => { window.removeEventListener('keydown', esc, true); window.removeEventListener('pointerdown', close, true); window.removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, [open]);

  return (
    <>
      <button ref={btn} class={cls ?? (children ? 'rf-btn' : 'rf-ib')} aria-label={label} title={children ? undefined : label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {children ?? <Ico n={icon} />}
      </button>
      {mounted && pos && (
        <div class="rf-menu" data-state={mstate} role="menu" ref={pop} style={{ top: pos.top + 'px', left: pos.left !== undefined ? pos.left + 'px' : undefined, right: pos.right !== undefined ? pos.right + 'px' : undefined, maxHeight: pos.maxH + 'px' }}>
          {items.map((it, i) => it.sep ? <div key={i} class="rf-sep" role="separator" /> : (
            <button key={i} role="menuitem" class={'rf-mi' + (it.danger ? ' danger' : '')} disabled={it.disabled}
              onClick={() => { setOpen(false); it.onClick?.(); }}>
              {it.icon ? <Ico n={it.icon} size={16} /> : <span class="rf-mi-gap" />}
              <span class="rf-mi-l">{it.label}</span>
              {it.checked && <Ico n="check" size={16} class="rf-mi-chk" />}
              {it.hint && <span class="rf-mi-hint">{it.hint}</span>}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ---- confirm dialog --------------------------------------------------------------------------
export function Confirm({ title, body, confirm, onConfirm, onCancel: cancel }: { title: string; body: string; confirm: string; onConfirm: () => void; onCancel: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);
  const leave = (fn: () => void) => { setClosing(true); setTimeout(fn, 140); };
  const onCancel = () => leave(cancel);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div class="rf-scrim" data-state={closing ? 'closed' : 'open'} onClick={onCancel} onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); onCancel(); } }}>
      <div class="rf-dialog" role="alertdialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{body}</p>
        <div class="rf-dialog-actions">
          <button class="rf-btn" onClick={onCancel}>Cancel</button>
          <button class="rf-btn primary" ref={ref} onClick={() => leave(onConfirm)}>{confirm}</button>
        </div>
      </div>
    </div>
  );
}

// ---- controls --------------------------------------------------------------------------------
export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button class={'rf-switch' + (on ? ' on' : '')} role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}>
      <span class="rf-knob" />
    </button>
  );
}

export function Seg<T extends string>({ value, options, onChange, label }: {
  value: T; options: { v: T; label?: string; icon?: IconName; title?: string }[]; onChange: (v: T) => void; label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useIndicator(ref, value);
  return (
    <div class="rf-seg" ref={ref} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.v} role="radio" aria-checked={value === o.v} class={value === o.v ? 'on' : ''} title={o.title ?? o.label} aria-label={o.title ?? o.label} onClick={() => onChange(o.v)}>
          {o.icon && <Ico n={o.icon} size={16} />}{o.label}
        </button>
      ))}
    </div>
  );
}

export function Spinner({ size = 16 }: { size?: number }) {
  return <span class="rf-spin" style={{ width: size + 'px', height: size + 'px' }} role="progressbar" aria-label="Loading" />;
}

export function Chip({ children, tone, icon, title }: { children: ComponentChildren; tone?: 'warn' | 'ok' | 'muted' | 'accent'; icon?: IconName; title?: string }) {
  return <span class={'rf-chip ' + (tone ?? '')} title={title}>{icon && <Ico n={icon} size={12} />}{children}</span>;
}

export function Empty({ icon, title, body, children }: { icon: IconName; title: string; body?: string; children?: ComponentChildren }) {
  return (
    <div class="rf-empty">
      <Ico n={icon} size={28} />
      <h3>{title}</h3>
      {body && <p>{body}</p>}
      {children && <div class="rf-empty-actions">{children}</div>}
    </div>
  );
}

// ---- outfit thumbnail --------------------------------------------------------------------------
export function Thumb({ id, size = '150x150', src, enabled = true, alt = '', class: cls }: {
  id: number; size?: '150x150' | '420x420'; src?: string | null; enabled?: boolean; alt?: string; class?: string;
}) {
  const t = useThumb(id, size, enabled && !src);
  const [failed, setFailed] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const url = src && !failed ? src : t?.url;
  // Compare against the URL rather than resetting in an effect: a cached image can fire onLoad before any effect runs.
  const loaded = !!url && loadedUrl === url;
  const state = t?.state;
  return (
    <div class={'rf-thumb ' + (cls ?? '') + (loaded ? ' loaded' : '')}>
      {url && !(failed && !t?.url) && (
        <img src={url} alt={alt} decoding="async" draggable={false} onLoad={() => setLoadedUrl(url!)} onError={() => setFailed(true)} />
      )}
      {!url && !t && <div class="rf-skel" />}
      {!url && t && (
        <div class="rf-thumb-note">
          {state === 'Pending' ? <><Spinner size={14} /><span>Rendering…</span></> :
            state === 'InReview' || state === 'Blocked' ? <><Ico n="lock" size={16} /><span>Preview unavailable</span></> :
              state === 'RateLimited' ? <><Ico n="clock" size={16} /><span>Slow down</span></> :
                <><Ico n="outfit" size={18} /><span>No preview</span></>}
        </div>
      )}
    </div>
  );
}

export function Swatch({ hex, label }: { hex: string; label?: string }) {
  return <span class="rf-swatch" style={{ background: '#' + hex }} title={label ? `${label} #${hex}` : '#' + hex} />;
}

export function useKey(handler: (e: KeyboardEvent) => void, deps: unknown[] = []) {
  useEffect(() => { window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, deps);
}

export type { JSX };
