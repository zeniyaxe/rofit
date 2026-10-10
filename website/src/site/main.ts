/**
 * Progressive enhancement for the RoFit website. Every page is complete without this file; it adds the hero's
 * scroll story, reveals, the provenance switcher, browser detection for install, and loads the demo on demand.
 * Motion rules: no scroll hijacking (the page scrolls natively, we only read the position), transform/opacity
 * only, and nothing moves under prefers-reduced-motion.
 */
const root = document.documentElement;
root.classList.add('js');
root.classList.remove('html-nojs');

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const wide = matchMedia('(min-width: 901px) and (min-height: 620px)');
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => [...el.querySelectorAll<T>(s)];

// ---- header ------------------------------------------------------------------------------------------------
const hdr = $('.hdr');
const onScrollHdr = () => hdr?.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScrollHdr, { passive: true });
onScrollHdr();

// ---- hero: the outfit, taken apart ------------------------------------------------------------------------------
// Desktop: a sticky stage whose figure comes apart as you scroll past it (progress only; scrolling stays native).
// Small screens: no sticky stage; the figure takes itself apart once when it comes into view.
// Reduced motion / no JS: shown already taken apart.
const hero = $('.hero');
if (hero) {
  let raf = 0, playing = false;
  const set = (p: number) => hero.style.setProperty('--p', p.toFixed(4));
  const measure = () => {
    raf = 0;
    const r = hero.getBoundingClientRect();
    const stage = $('.hero-stage', hero)!;
    const travel = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    set(Math.min(1, Math.max(0, -r.top / travel / 0.82)));
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
  const playOnce = () => {
    if (playing) return;
    playing = true;
    const t0 = performance.now(), dur = 2200;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      set(k);
      if (k < 1 && hero.dataset.mode === 'static') requestAnimationFrame(step);
    };
    set(0);
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); setTimeout(playOnce, 350); } }, { threshold: 0.35 });
  const mode = () => {
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onScroll);
    io.disconnect();
    if (reduced.matches) { hero.dataset.mode = 'static'; set(1); return; }
    if (wide.matches) {
      hero.dataset.mode = 'scroll';
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onScroll, { passive: true });
      measure();
    } else {
      hero.dataset.mode = 'static';
      if (!playing) { set(0); io.observe($('.spec', hero)!); } else set(1);
    }
  };
  reduced.addEventListener('change', mode);
  wide.addEventListener('change', mode);
  mode();
}

// ---- reveals -----------------------------------------------------------------------------------------------------
const rio = new IntersectionObserver((es) => {
  for (const e of es) if (e.isIntersecting || e.boundingClientRect.bottom < 0) { e.target.classList.add('in'); rio.unobserve(e.target); }
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach((el) => rio.observe(el));

// ---- "what counts": Roblox's mixed list sorts itself into columns ---------------------------------------------------
const sort = $('.sort');
if (sort && !reduced.matches && matchMedia('(min-width: 861px)').matches) {
  const pile = $('[data-pile]', sort)!;
  const chips = $$('.chip[data-to]', sort);
  const order = chips.slice().sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
  const place = () => {
    sort.dataset.sorted = 'true';
    chips.forEach((c) => { c.style.removeProperty('--fx'); c.style.removeProperty('--fy'); });
    const p = pile.getBoundingClientRect();
    sort.dataset.sorted = 'false';
    order.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--fx', `${p.left - r.left}px`);
      c.style.setProperty('--fy', `${p.top + i * 30 - r.top}px`);
      c.style.setProperty('--d', String(i));
    });
  };
  place();
  const sio = new IntersectionObserver((es) => {
    if (!es.some((e) => e.isIntersecting)) return;
    sio.disconnect();
    setTimeout(() => { sort.dataset.sorted = 'true'; }, 500);
  }, { threshold: 0.5 });
  sio.observe(sort);
  const replay = $<HTMLButtonElement>('[data-replay]', sort.parentElement!);
  if (replay) {
    replay.hidden = false;
    replay.addEventListener('click', () => {
      chips.forEach((c) => (c.style.transition = 'none'));
      place();
      void sort.offsetWidth;
      chips.forEach((c) => c.style.removeProperty('transition'));
      requestAnimationFrame(() => setTimeout(() => { sort.dataset.sorted = 'true'; }, 250));
    });
  }
  addEventListener('resize', () => { if (sort.dataset.sorted === 'true') return; place(); }, { passive: true });
}

// ---- provenance switcher -------------------------------------------------------------------------------------------
const states = $('.states');
if (states) {
  const btns = $$<HTMLButtonElement>('.state-btn', states);
  const card = $('.item-card', states)!;
  const bump = (sel: string, text: string) => {
    const el = $(sel, card);
    if (!el || el.textContent === text) return;
    el.textContent = text;
    if (reduced.matches) return;
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  };
  const pick = (b: HTMLButtonElement) => {
    btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    const d = b.dataset;
    card.dataset.state = d.state;
    const tag = $('.item-row .tag', card)!;
    tag.className = 'tag ' + d.tagClass;
    tag.textContent = d.tag!;
    $('.item-row small', card)!.textContent = d.sub!;
    const price = $('.item-price', card)!;
    price.innerHTML = '';
    if (d.price) { const el = document.createElement(d.counted === 'true' ? 'span' : 's'); el.textContent = d.price; price.append(el); }
    else price.textContent = '—';
    $('.item-say', card)!.textContent = d.say!;
    bump('[data-k=total]', d.total!);
    bump('[data-k=count]', d.count!);
    bump('[data-k=unknown]', d.unknown!);
  };
  btns.forEach((b) => b.addEventListener('click', () => pick(b)));
}

// ---- install: what this browser can do ---------------------------------------------------------------------------------
const bs = $('.browser-state');
if (bs) {
  const ua = navigator.userAgent;
  const uad = (navigator as any).userAgentData as { brands?: { brand: string; version: string }[]; mobile?: boolean } | undefined;
  const mobile = uad?.mobile ?? /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  const chromeV = Number((ua.match(/Chrom(?:e|ium)\/(\d+)/) || [])[1] || 0);
  const brands = (uad?.brands || []).map((b) => b.brand);
  const isFirefox = /Firefox\//.test(ua);
  const isSafari = !chromeV && /Safari\//.test(ua) && /Version\//.test(ua);
  const name = brands.includes('Microsoft Edge') || /Edg\//.test(ua) ? 'Edge'
    : (navigator as any).brave ? 'Brave'
      : /OPR\//.test(ua) || brands.includes('Opera') ? 'Opera'
        : /Vivaldi/.test(ua) ? 'Vivaldi'
          : brands.includes('Google Chrome') || /Chrome\//.test(ua) ? 'Chrome' : '';
  const scheme = ({ Edge: 'edge', Brave: 'brave', Opera: 'opera', Vivaldi: 'vivaldi' } as Record<string, string>)[name] || 'chrome';
  const min = Number(bs.dataset.min || 113);
  let state: 'ok' | 'warn' | 'no', title: string, body: string;
  if (mobile) {
    state = 'no'; title = 'This looks like a phone or tablet';
    body = 'RoFit is a desktop browser extension. Open this page on a computer with Chrome, Edge or Brave to install it.';
  } else if (isFirefox) {
    state = 'no'; title = 'Firefox isn’t supported';
    body = 'RoFit is built and tested for Chromium browsers only. Use Chrome, Edge or Brave on this computer.';
  } else if (isSafari) {
    state = 'no'; title = 'Safari isn’t supported';
    body = 'RoFit is built and tested for Chromium browsers only. Use Chrome, Edge or Brave on this computer.';
  } else if (chromeV && chromeV < min) {
    state = 'warn'; title = `${name || 'Your browser'} ${chromeV} is too old`;
    body = `RoFit needs version ${min} or newer. Update your browser, then follow the steps below.`;
  } else if (chromeV) {
    state = 'ok'; title = `${name || 'This browser'} ${chromeV} can run RoFit`;
    body = name === 'Chrome' || name === 'Edge' || name === 'Brave'
      ? 'Follow the three steps below. It takes about a minute.'
      : `RoFit is tested in Chrome, Edge and Brave. ${name || 'Other Chromium browsers'} should work the same way, but it isn’t tested there.`;
  } else {
    state = 'warn'; title = 'We couldn’t tell which browser this is';
    body = `RoFit runs in Chromium browsers (Chrome, Edge, Brave) version ${min} or newer, on a computer.`;
  }
  bs.dataset.state = state;
  $('b', bs)!.textContent = title;
  $('p', bs)!.textContent = body;
  $$('[data-ext-url]').forEach((el) => {
    el.textContent = `${scheme}://extensions`;
    const c = el.parentElement?.querySelector<HTMLElement>('.copy');
    if (c) c.dataset.copy = `${scheme}://extensions`;
  });
}

// ---- copy buttons --------------------------------------------------------------------------------------------------------
$$<HTMLButtonElement>('.copy[data-copy]').forEach((b) => {
  b.hidden = false;
  b.addEventListener('click', async () => {
    const text = b.dataset.copy!;
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch { /* fall through */ }
    const label = b.textContent;
    b.textContent = ok ? 'Copied' : 'Select and copy';
    if (ok) b.dataset.done = '';
    setTimeout(() => { b.textContent = label; delete b.dataset.done; }, 1600);
  });
});

// ---- demo: loaded on approach, or straight away for a #rofit/<id> link ---------------------------------------------------------
const demoRoot = $('#demo-root');
if (demoRoot) {
  let started = false;
  const deep = () => { const m = location.hash.match(/^#rofit\/(\d+)$/); return m ? Number(m[1]) : undefined; };
  const start = async (outfit?: number) => {
    if (started) return;
    started = true;
    const fallback = demoRoot.innerHTML;
    const status = $('[data-demo-status]');
    demoRoot.setAttribute('aria-busy', 'true');
    demoRoot.innerHTML = '<div class="demo-load" role="status"><span class="spin" aria-hidden="true"></span>Loading the demo…</div>';
    try {
      const m = await import('../demo/index.tsx');
      m.mountDemo(demoRoot, outfit);
      if (status) status.textContent = 'Demo loaded.';
    } catch {
      started = false;
      demoRoot.innerHTML = fallback;
      const p = document.createElement('div');
      p.className = 'demo-error';
      p.setAttribute('role', 'alert');
      p.innerHTML = '<p><b>The demo didn’t load.</b> Your connection may have dropped. The outfits below are a static preview.</p><button class="btn sm ghost" type="button">Reload and try again</button>';
      // A failed dynamic import is remembered for the life of the document, so recovery means a reload.
      p.querySelector('button')!.addEventListener('click', () => { history.replaceState(null, '', outfit ? `#rofit/${outfit}` : '#demo'); location.reload(); });
      demoRoot.prepend(p);
    } finally {
      demoRoot.removeAttribute('aria-busy');
    }
  };
  const id = deep();
  if (id) { start(id); requestAnimationFrame(() => $('#demo')?.scrollIntoView()); }
  else {
    const dio = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { dio.disconnect(); start(); } }, { rootMargin: '900px 0px' });
    dio.observe(demoRoot);
  }
  $$('[data-open-demo]').forEach((a) => a.addEventListener('click', () => start()));
  addEventListener('hashchange', () => { const i = deep(); if (i && !started) start(i); });
}
