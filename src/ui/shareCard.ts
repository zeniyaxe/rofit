/**
 * Draws a shareable outfit card (PNG) entirely locally: the render, the item list and what it costs today.
 * Roblox's image CDN sends CORS headers, so the canvas stays exportable; nothing is uploaded anywhere.
 */
export interface CardItem { name: string; sub: string; price?: string; thumb?: string | null; flag?: string }
export interface CardData {
  title: string; owner: string; meta: string;
  avatarUrl?: string | null;
  items: CardItem[];
  total: string; totalNote: string;
}

const W = 1200, H = 675;

function resolve(el: Element, name: string, fallback: string): string {
  const p = document.createElement('div');
  p.style.cssText = `position:absolute;visibility:hidden;background:var(${name})`;
  el.appendChild(p);
  const c = getComputedStyle(p).backgroundColor;
  p.remove();
  return c && c !== 'rgba(0, 0, 0, 0)' ? c : fallback;
}

function load(url?: string | null): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    if (!url) return res(null);
    const i = new Image();
    i.crossOrigin = 'anonymous';
    i.onload = () => res(i);
    i.onerror = () => res(null);
    i.src = url;
  });
}

function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath(); c.roundRect(x, y, w, h, r);
}

function fit(c: CanvasRenderingContext2D, text: string, max: number): string {
  if (c.measureText(text).width <= max) return text;
  let t = text;
  while (t.length > 1 && c.measureText(t + '…').width > max) t = t.slice(0, -1);
  return t + '…';
}

export async function renderCard(root: Element, d: CardData): Promise<Blob> {
  const bg = resolve(root, '--rf-bg', '#fff'), fg = resolve(root, '--rf-fg', '#202227'), accent = resolve(root, '--rf-accent', '#335fff');
  const surface = resolve(root, '--rf-surface', '#f7f7f8'), surface2 = resolve(root, '--rf-surface-2', '#ececf0'), muted = resolve(root, '--rf-muted', '#6b6f7b'), line = resolve(root, '--rf-line', '#e3e4e8');
  const font = getComputedStyle(root).fontFamily || 'Arial, sans-serif';
  const shown = d.items.slice(0, 7);
  const [avatar, ...thumbs] = await Promise.all([load(d.avatarUrl), ...shown.map((i) => load(i.thumb))]);

  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const c = cv.getContext('2d')!;
  c.fillStyle = bg; c.fillRect(0, 0, W, H);

  // left: render
  const pad = 40, ax = pad, ay = pad, aw = 440, ah = H - pad * 2;
  c.fillStyle = surface; rr(c, ax, ay, aw, ah, 20); c.fill();
  if (avatar) {
    const s = Math.min(aw - 40, ah - 150);
    c.drawImage(avatar, ax + (aw - s) / 2, ay + 30, s, s);
  }
  c.fillStyle = fg; c.font = `800 34px ${font}`; c.textBaseline = 'alphabetic';
  c.fillText(fit(c, d.title, aw - 48), ax + 24, ay + ah - 70);
  c.fillStyle = muted; c.font = `500 20px ${font}`;
  c.fillText(fit(c, `${d.owner} · ${d.meta}`, aw - 48), ax + 24, ay + ah - 36);

  // right: items
  const rx = ax + aw + 40, rw = W - rx - pad;
  c.fillStyle = muted; c.font = `700 16px ${font}`;
  c.fillText(`${d.items.length} ITEM${d.items.length === 1 ? '' : 'S'}`, rx, pad + 14);
  const rowH = 62, top = pad + 32;
  shown.forEach((it, i) => {
    const y = top + i * rowH;
    c.fillStyle = surface2; rr(c, rx, y, 50, 50, 10); c.fill();
    const t = thumbs[i];
    if (t) { c.save(); rr(c, rx, y, 50, 50, 10); c.clip(); c.drawImage(t, rx, y, 50, 50); c.restore(); }
    c.fillStyle = fg; c.font = `700 21px ${font}`;
    const priceW = it.price ? c.measureText(it.price).width + 10 : 0;
    c.fillText(fit(c, it.name, rw - 66 - priceW), rx + 66, y + 23);
    c.fillStyle = muted; c.font = `500 16px ${font}`;
    c.fillText(fit(c, it.flag ? `${it.sub} · ${it.flag}` : it.sub, rw - 66 - priceW), rx + 66, y + 45);
    if (it.price) { c.fillStyle = fg; c.font = `800 21px ${font}`; c.textAlign = 'right'; c.fillText(it.price, rx + rw, y + 30); c.textAlign = 'left'; }
  });
  if (d.items.length > shown.length) { c.fillStyle = muted; c.font = `600 17px ${font}`; c.fillText(`+ ${d.items.length - shown.length} more`, rx + 66, top + shown.length * rowH + 14); }

  // footer: total + credit
  const fy = H - pad - 74;
  c.strokeStyle = line; c.lineWidth = 2; c.beginPath(); c.moveTo(rx, fy - 14); c.lineTo(rx + rw, fy - 14); c.stroke();
  c.fillStyle = fg; c.font = `800 40px ${font}`; c.fillText(d.total, rx, fy + 30);
  c.fillStyle = muted; c.font = `500 17px ${font}`; c.fillText(fit(c, d.totalNote, rw), rx, fy + 56);
  c.fillStyle = accent; c.font = `800 18px ${font}`; c.textAlign = 'right'; c.fillText('RoFit', rx + rw, fy + 30); c.textAlign = 'left';

  return new Promise((res, rej) => cv.toBlob((b) => (b ? res(b) : rej(new Error('Canvas export failed'))), 'image/png'));
}
