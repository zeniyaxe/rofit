import { createContext, type ComponentChildren, type JSX } from 'preact';
import { useContext, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'preact/hooks';
import { Ico, type IconName } from './icons.tsx';
import { thumbStore, useThumb } from './data.ts';
import { useIndicator, usePresence } from './motion.tsx';

/**
 * Runs `fn` after the next frame, or after 50 ms if no frame comes (browsers hold animation frames back in
 * background, occluded or headless tabs). Used to move focus once a layer has rendered; returns a cancel function.
 */
export function afterFrame(fn: () => void): () => void {
  let done = false;
  const run = () => { if (done) return; done = true; cancelAnimationFrame(raf); clearTimeout(t); fn(); };
  const raf = requestAnimationFrame(run);
  const t = setTimeout(run, 50);
  return () => { done = true; cancelAnimationFrame(raf); clearTimeout(t); };
}

/**
 * Puts focus back where it was when a layer (dialog, palette) opened, but only if the layer still holds focus as it
 * closes, or focus was lost. A layer that hands over to another one (palette → shortcuts) doesn't steal it back.
 */
export function useReturnFocus(ref: { current: HTMLElement | null }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = el.getRootNode() as ShadowRoot | Document;
    const prev = root.activeElement as HTMLElement | null;
    return () => {
      const now = root.activeElement as HTMLElement | null;
      if (now && now !== document.body && !el.contains(now)) return;
      const back = prev?.isConnected && !el.contains(prev) ? prev : root.querySelector<HTMLElement>('.rf-shell');
      back?.focus({ preventScroll: true });
    };
  }, []);
}

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

/**
 * Where a popup anchored to `btn` goes: below it (or above when there's no room), aligned to one edge.
 * position:fixed is relative to the nearest transformed ancestor, not the viewport; a hidden probe finds that origin.
 */
export function anchorPos(btn: HTMLElement, align: 'left' | 'right', want = 220): { top: number; left?: number; right?: number; maxH: number } {
  const r = btn.getBoundingClientRect();
  const vh = window.innerHeight;
  const below = vh - r.bottom - 12;
  const flip = below < want && r.top > below;
  const top = flip ? Math.max(8, r.top - 8 - Math.min(360, r.top - 16)) : r.bottom + 6;
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;inset:0;visibility:hidden;pointer-events:none';
  btn.parentElement!.appendChild(probe);
  const cb = probe.getBoundingClientRect();
  probe.remove();
  return {
    top: top - cb.top, maxH: Math.max(160, flip ? r.top - 16 : below),
    ...(align === 'right' ? { right: cb.right - r.right } : { left: r.left - cb.left }),
  };
}

/**
 * Opening a menu can move its button: clicking it blurs the search field, which then eases back to its resting width
 * and slides the toolbar. Re-anchor while the button settles (about one transition), then stop.
 */
function followAnchor(btn: HTMLElement, place: () => void, ms = 480): () => void {
  let last = btn.getBoundingClientRect();
  const t0 = Date.now();
  const id = window.setInterval(() => {
    const r = btn.getBoundingClientRect();
    if (Math.abs(r.left - last.left) > 0.5 || Math.abs(r.top - last.top) > 0.5) { last = r; place(); }
    if (Date.now() - t0 > ms) clearInterval(id);
  }, 16);
  return () => clearInterval(id);
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
    setPos(anchorPos(btn.current, align));
    return followAnchor(btn.current, () => setPos(anchorPos(btn.current!, align)));
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
    const cancel = afterFrame(() => pop.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus({ preventScroll: true }));
    const rs = () => setOpen(false);
    window.addEventListener('resize', rs);
    return () => { window.removeEventListener('keydown', esc, true); window.removeEventListener('pointerdown', close, true); window.removeEventListener('resize', rs); cancel(); };
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

// ---- popover: an anchored panel that stays open while you work in it (filters, explanations) ----------
export function Popover({ label, children, content, align = 'right', class: cls, width = 320, title }: {
  label: string; children: ComponentChildren; content: ComponentChildren | ((close: () => void) => ComponentChildren);
  align?: 'left' | 'right'; class?: string; width?: number; title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, mstate] = usePresence(open, 130);
  const [pos, setPos] = useState<{ top: number; left?: number; right?: number; maxH: number } | null>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!open || !btn.current) return;
    setPos(anchorPos(btn.current, align, width));
    return followAnchor(btn.current, () => setPos(anchorPos(btn.current!, align, width)));
  }, [open, align, width]);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => { const path = e.composedPath(); if (!path.includes(pop.current as EventTarget) && !path.includes(btn.current as EventTarget)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); setOpen(false); btn.current?.focus(); } };
    window.addEventListener('keydown', esc, true);
    window.addEventListener('pointerdown', close, true);
    const cancel = afterFrame(() => pop.current?.querySelector<HTMLElement>('[data-autofocus], button:not(:disabled), input')?.focus({ preventScroll: true }));
    const rs = () => setOpen(false);
    window.addEventListener('resize', rs);
    return () => { window.removeEventListener('keydown', esc, true); window.removeEventListener('pointerdown', close, true); window.removeEventListener('resize', rs); cancel(); };
  }, [open]);
  const shut = () => { setOpen(false); btn.current?.focus(); };
  return (
    <>
      <button ref={btn} class={cls ?? 'rf-btn'} aria-label={label} title={title} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{children}</button>
      {mounted && pos && (
        <div class="rf-menu rf-pop" data-state={mstate} role="dialog" aria-label={label} ref={pop}
          style={{ top: pos.top + 'px', left: pos.left !== undefined ? pos.left + 'px' : undefined, right: pos.right !== undefined ? pos.right + 'px' : undefined, maxHeight: pos.maxH + 'px', width: `min(${width}px, calc(100vw - 24px))` }}>
          {typeof content === 'function' ? content(shut) : content}
        </div>
      )}
    </>
  );
}

// ---- confirm dialog --------------------------------------------------------------------------
export function Confirm({ title, body, confirm, onConfirm, onCancel: cancel, danger }: { title: string; body: ComponentChildren; confirm: string; onConfirm: () => void; onCancel: () => void; danger?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const leave = (fn: () => void) => { setClosing(true); setTimeout(fn, 140); };
  const onCancel = () => leave(cancel);
  useReturnFocus(box);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, []);
  return (
    <div class="rf-scrim" data-state={closing ? 'closed' : 'open'} onClick={onCancel} onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); onCancel(); } }}>
      <div ref={box} class="rf-dialog" role="alertdialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <div class="rf-dialog-p">{body}</div>
        <div class="rf-dialog-actions">
          <button class="rf-btn" onClick={onCancel}>Cancel</button>
          <button class={'rf-btn ' + (danger ? 'danger solid' : 'primary')} ref={ref} onClick={() => leave(onConfirm)}>{confirm}</button>
        </div>
      </div>
    </div>
  );
}

// ---- generic dialog (focus trapped, Esc closes, exit animation) ----------------------------------
export function Dialog({ title, onClose, children, actions, class: cls, label, initialFocus }: {
  title: ComponentChildren; onClose: () => void; children: ComponentChildren; actions?: ComponentChildren; class?: string; label?: string;
  /** CSS selector inside the dialog to focus first (default: first input, else first button). */
  initialFocus?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const close = useCallback(() => { setClosing(true); setTimeout(onClose, 140); }, [onClose]);
  useReturnFocus(box);
  useEffect(() => {
    const el = box.current;
    const pick = initialFocus ? el?.querySelector<HTMLElement>(initialFocus) : null;
    const first = (pick && !(pick as HTMLButtonElement).disabled ? pick : null) || el?.querySelector<HTMLElement>('input:not([type=checkbox]),textarea') || el?.querySelector<HTMLElement>('button:not(:disabled)');
    return afterFrame(() => first?.focus({ preventScroll: true }));
  }, []);
  useEffect(() => {
    // Esc still closes the topmost dialog when focus has wandered outside it (say, to Roblox's top bar).
    const onWin = (e: KeyboardEvent) => {
      const scrim = box.current?.parentElement;
      if (e.key !== 'Escape' || e.defaultPrevented || !scrim || e.composedPath().includes(scrim)) return;
      const layers = (scrim.getRootNode() as ShadowRoot | Document).querySelectorAll('.rf-scrim[data-state=open]');
      if (layers[layers.length - 1] !== scrim) return;
      e.preventDefault(); e.stopPropagation(); close();
    };
    window.addEventListener('keydown', onWin, true);
    return () => window.removeEventListener('keydown', onWin, true);
  }, [close]);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); close(); return; }
    if (e.key !== 'Tab' || !box.current) return;
    // Keep Tab inside the dialog.
    const f = [...box.current.querySelectorAll<HTMLElement>('button:not(:disabled), input, textarea, select, a[href], [tabindex="0"]')];
    if (!f.length) return;
    const root = box.current.getRootNode() as ShadowRoot | Document;
    const i = f.indexOf(root.activeElement as HTMLElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  };
  return (
    <div class="rf-scrim" data-state={closing ? 'closed' : 'open'} onClick={close} onKeyDown={onKey}>
      <div ref={box} class={'rf-dialog ' + (cls ?? '')} role="dialog" aria-modal="true" aria-label={label ?? (typeof title === 'string' ? title : undefined)} onClick={(e) => e.stopPropagation()}>
        <div class="rf-dialog-h"><h3>{title}</h3><button class="rf-ib sm" aria-label="Close" onClick={close}><Ico n="close" size={16} /></button></div>
        <div class="rf-dialog-b">{children}</div>
        {actions && <div class="rf-dialog-actions">{actions}</div>}
      </div>
    </div>
  );
}

/** Asks for one short value (a collection name, a tag), suggesting existing ones. */
export function Prompt({ title, label, initial = '', suggestions = [], confirm, onConfirm, onCancel, hint, allowEmpty }: {
  title: string; label: string; initial?: string; suggestions?: string[]; confirm: string; onConfirm: (v: string) => void; onCancel: () => void; hint?: string; allowEmpty?: boolean;
}) {
  const [v, setV] = useState(initial);
  const ok = allowEmpty || v.trim().length > 0;
  const go = () => { if (ok) onConfirm(v.trim()); };
  const matches = suggestions.filter((s) => s && s !== v && s.toLowerCase().includes(v.trim().toLowerCase())).slice(0, 8);
  return (
    <Dialog title={title} onClose={onCancel} actions={<><button class="rf-btn" onClick={onCancel}>Cancel</button><button class="rf-btn primary" disabled={!ok} onClick={go}>{confirm}</button></>}>
      <label class="rf-field"><span>{label}</span>
        <input value={v} maxLength={80} onInput={(e) => setV((e.target as HTMLInputElement).value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } }} />
      </label>
      {hint && <p class="rf-muted rf-small">{hint}</p>}
      {matches.length > 0 && <div class="rf-sugg">{matches.map((s) => <button key={s} class="rf-chip btn" onClick={() => setV(s)}>{s}</button>)}</div>}
    </Dialog>
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

export function Chip({ children, tone, icon, title }: { children: ComponentChildren; tone?: 'warn' | 'ok' | 'muted' | 'accent' | 'unknown'; icon?: IconName; title?: string }) {
  return <span class={'rf-chip ' + (tone ?? '')} title={title}>{icon && <Ico n={icon} size={12} />}{children}</span>;
}

/**
 * A cost as format.ts#costFigure states it. Exact totals print solid; a lower bound gets a dashed underline, and the
 * full sentence ("At least R$ 854. Not counted: …") is both the tooltip and what a screen reader hears.
 */
export function Figure({ f, class: cls }: { f: { text: string | null; exact: boolean; says: string }; class?: string }) {
  if (!f.text) return null;
  return (
    <span class={'rf-fig-n' + (f.exact ? '' : ' approx') + (cls ? ' ' + cls : '')} title={f.says}>
      <span aria-hidden="true">{f.text}</span><span class="rf-sr">{f.says}</span>
    </span>
  );
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
  const [failed, setFailed] = useState(false);
  // A stored URL (library, share link) that no longer loads falls back to asking Roblox for a current render.
  const t = useThumb(id, size, enabled && id > 0 && (!src || failed));
  // A big render Roblox hasn't finished yet can borrow the small one the grid already loaded (no extra request).
  const small = size === '420x420' && !t?.url ? thumbStore.get(id, '150x150') : undefined;
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const url = src && !failed ? src : t?.url ?? small?.url;
  // Compare against the URL rather than resetting in an effect: a cached image can fire onLoad before any effect runs.
  // Swapping the small stand-in for the full render keeps the image visible instead of fading out and back in.
  const lowSeen = useRef<string | null>(null);
  if (small?.url && url === small.url) lowSeen.current = small.url;
  const loaded = !!url && (loadedUrl === url || (!!loadedUrl && loadedUrl === lowSeen.current));
  const state = t?.state;
  const gone = !!src && failed && !t && !(enabled && id > 0);
  return (
    <div class={'rf-thumb ' + (cls ?? '') + (loaded ? ' loaded' : '') + (url && url === small?.url ? ' lowres' : '')} aria-busy={state === 'Pending' && !url ? true : undefined}>
      {url && !(failed && !t?.url) && (
        <img src={url} alt={alt} decoding="async" draggable={false} onLoad={() => setLoadedUrl(url!)} onError={() => setFailed(true)} />
      )}
      {!url && !t && !gone && <div class="rf-skel" />}
      {!url && (t || gone) && (
        <div class={'rf-thumb-note ' + (state ?? '').toLowerCase()} title={state === 'Pending' ? 'Roblox is still rendering this outfit' : state === 'Stalled' ? 'Roblox hasn’t finished rendering this outfit yet. RoFit asks again next time you open it.' : undefined}>
          {state === 'Pending' ? <><Spinner size={14} /><span>Rendering…</span></> :
            state === 'Stalled' ? <><Ico n="outfit" size={18} /><span>Render not ready</span></> :
              state === 'InReview' || state === 'Blocked' ? <><Ico n="lock" size={16} /><span>Preview unavailable</span></> :
                state === 'RateLimited' ? <><Ico n="clock" size={16} /><span>Roblox is busy</span></> :
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
