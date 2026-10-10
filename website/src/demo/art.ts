/**
 * Original flat "paper doll" renderer for the sample world. Not Roblox's renderer and not trying to be: it exists so
 * the demo has honest, regenerable images that follow the data (change an outfit → its render changes).
 * Returns SVG markup; `split` wraps every item in <g data-part> groups so the home page can take the figure apart.
 */
export type Art =
  | { k: 'body' } | { k: 'head' } | { k: 'none' }
  | { k: 'face'; v: 'calm' | 'grin' | 'sleepy' }
  | { k: 'hat'; v: 'bucket' | 'cap' | 'beanie' | 'crown' | 'visor'; c: string }
  | { k: 'hair'; v: 'messy' | 'long' | 'bob'; c: string }
  | { k: 'glasses'; v: 'round' | 'star'; c: string }
  | { k: 'scarf'; c: string; c2: string }
  | { k: 'back'; v: 'pack' | 'wings' | 'cape'; c: string }
  | { k: 'bird'; c: string }
  | { k: 'beltbag'; c: string }
  | { k: 'jacket'; c: string; v: 'open' | 'closed' }
  | { k: 'top'; c: string; v: 'knit' | 'hood' }
  | { k: 'pants'; c: string; v?: 'cargo' }
  | { k: 'shorts'; c: string }
  | { k: 'dress'; c: string }
  | { k: 'shoe'; c: string; v?: 'boot'; side: 'L' | 'R' }
  | { k: 'cshirt'; c: string; c2: string; v: 'stripes' | 'check' | 'suit' }
  | { k: 'cpants'; c: string }
  | { k: 'tee'; c: string };

export interface Figure {
  skin: string; // hex without #
  avatarType: string;
  scale?: { height?: number; width?: number; head?: number };
  items: { id: number; art: Art }[];
}

interface Geo {
  cx: number; ground: number; legTop: number; legW: number; torsoTop: number; torsoL: number; torsoR: number;
  armW: number; armH: number; head: { x: number; y: number; w: number; h: number; rx: number }; limbRx: number; r6: boolean;
}

function geo(f: Pick<Figure, 'avatarType' | 'scale'>): Geo {
  const H = f.scale?.height ?? 1, W = f.scale?.width ?? 1, Hd = f.scale?.head ?? 1;
  const r6 = f.avatarType === 'R6';
  const cx = 100, ground = 184;
  const legTop = ground - 52 * H;
  const torsoTop = legTop - 50 * H;
  const tw = 27 * W;
  const hw = (r6 ? 36 : 40) * Hd, hh = (r6 ? 34 : 38) * Hd;
  return {
    cx, ground, legTop, legW: 21 * W, torsoTop, torsoL: cx - tw, torsoR: cx + tw, armW: 15 * W, armH: 48 * H,
    head: { x: cx - hw / 2, y: torsoTop - hh - 1, w: hw, h: hh, rx: r6 ? 7 : 12 }, limbRx: r6 ? 2.5 : 6, r6,
  };
}

const n = (v: number) => Math.round(v * 10) / 10;
const OUT = 'stroke="#000" stroke-opacity=".16" stroke-width="1"';
const shade = (p: string) => `fill="url(#${p}s)"`;
function box(x: number, y: number, w: number, h: number, rx: number, fill: string, p: string) {
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(rx)}" fill="#${fill}" ${OUT}/>` +
    `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(rx)}" ${shade(p)}/>`;
}
const darken = (hex: string, amt = 0.18) => {
  const v = parseInt(hex, 16);
  const c = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map((x) => Math.min(255, Math.max(0, Math.round(x * (1 - amt)))));
  return c.map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
};

type Layer = { z: number; svg: string };

/** Each art kind contributes one or more layers at fixed depths (lower z = further back). */
function layers(a: Art, g: Geo, p: string): Layer[] {
  const { cx, legTop, legW, torsoTop, torsoL, torsoR, armW, armH, head: h, limbRx: r, ground } = g;
  const tH = legTop - torsoTop + 2;
  const legL = cx - legW - 1, legR = cx + 1, legH = ground - legTop;
  const armL = torsoL - armW - 1, armR = torsoR + 1;
  switch (a.k) {
    case 'body': case 'head': case 'none': case 'face': return []; // drawn by the base body
    case 'back': {
      if (a.v === 'wings') {
        const w = (s: number) => `<path d="M${cx + s * 10} ${n(torsoTop + 10)} C ${cx + s * 70} ${n(torsoTop - 40)}, ${cx + s * 92} ${n(torsoTop + 10)}, ${cx + s * 78} ${n(torsoTop + 40)} C ${cx + s * 66} ${n(torsoTop + 64)}, ${cx + s * 34} ${n(torsoTop + 48)}, ${cx + s * 12} ${n(torsoTop + 26)} Z" fill="#${a.c}" ${OUT}/>` +
          `<path d="M${cx + s * 22} ${n(torsoTop + 18)} C ${cx + s * 52} ${n(torsoTop)}, ${cx + s * 70} ${n(torsoTop + 12)}, ${cx + s * 68} ${n(torsoTop + 30)}" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="1.4"/>`;
        return [{ z: 0, svg: w(-1) + w(1) }];
      }
      if (a.v === 'cape') return [{ z: 0, svg: `<path d="M${n(torsoL - 4)} ${n(torsoTop + 2)} L${n(torsoR + 4)} ${n(torsoTop + 2)} L${n(torsoR + 16)} ${n(legTop + legH * 0.78)} Q ${cx} ${n(legTop + legH * 0.9)} ${n(torsoL - 16)} ${n(legTop + legH * 0.78)} Z" fill="#${a.c}" ${OUT}/>` }];
      // backpack: the bag peeks out on both sides, straps cross the front
      return [
        { z: 0, svg: box(torsoL - 7, torsoTop + 6, torsoR - torsoL + 14, tH - 10, 8, a.c, p) },
        { z: 70, svg: `<rect x="${n(torsoL + 7)}" y="${n(torsoTop)}" width="6" height="${n(tH - 6)}" rx="2" fill="#${darken(a.c)}"/><rect x="${n(torsoR - 13)}" y="${n(torsoTop)}" width="6" height="${n(tH - 6)}" rx="2" fill="#${darken(a.c)}"/>` },
      ];
    }
    case 'cpants': return [{ z: 20, svg: box(legL, legTop - 6, legW, legH + 6, r, a.c, p) + box(legR, legTop - 6, legW, legH + 6, r, a.c, p) }];
    case 'cshirt': {
      const c2 = a.c2;
      const pat = a.v === 'stripes'
        ? Array.from({ length: 7 }, (_, i) => `<rect x="${n(armL)}" y="${n(torsoTop + 5 + i * 7)}" width="${n(armR + armW - armL)}" height="3" fill="#${c2}" opacity=".9"/>`).join('')
        : a.v === 'check'
          ? Array.from({ length: 6 }, (_, i) => `<rect x="${n(armL + i * 16)}" y="${n(torsoTop)}" width="5" height="${n(armH + 2)}" fill="#${c2}" opacity=".35"/><rect x="${n(armL)}" y="${n(torsoTop + 3 + i * 9)}" width="${n(armR + armW - armL)}" height="3" fill="#${c2}" opacity=".35"/>`).join('')
          : `<path d="M${cx - 9} ${n(torsoTop)} L${cx} ${n(torsoTop + 24)} L${cx + 9} ${n(torsoTop)} Z" fill="#${c2}"/><path d="M${cx - 2.5} ${n(torsoTop + 4)} L${cx + 2.5} ${n(torsoTop + 4)} L${cx + 3.5} ${n(torsoTop + 20)} L${cx} ${n(torsoTop + 24)} L${cx - 3.5} ${n(torsoTop + 20)} Z" fill="#8C2F39"/>`;
      const clip = `${p}c${a.c}${a.v}`;
      return [{ z: 22, svg: `<clipPath id="${clip}"><rect x="${n(torsoL)}" y="${n(torsoTop)}" width="${n(torsoR - torsoL)}" height="${n(tH - 2)}" rx="${r}"/><rect x="${n(armL)}" y="${n(torsoTop + 1)}" width="${n(armW)}" height="${n(armH * 0.62)}" rx="${r}"/><rect x="${n(armR)}" y="${n(torsoTop + 1)}" width="${n(armW)}" height="${n(armH * 0.62)}" rx="${r}"/></clipPath>` +
        `<g clip-path="url(#${clip})"><rect x="${n(armL - 2)}" y="${n(torsoTop - 2)}" width="${n(armR + armW - armL + 4)}" height="${n(tH + 4)}" fill="#${a.c}"/>${pat}</g>` +
        `<rect x="${n(torsoL)}" y="${n(torsoTop)}" width="${n(torsoR - torsoL)}" height="${n(tH - 2)}" rx="${r}" ${shade(p)}/>` }];
    }
    case 'tee': return [{ z: 24, svg: `<rect x="${cx - 13}" y="${n(torsoTop + 10)}" width="26" height="26" rx="3" fill="#F7F5F0" ${OUT}/><circle cx="${cx}" cy="${n(torsoTop + 23)}" r="7.5" fill="#${a.c}"/><path d="M${cx - 4} ${n(torsoTop + 23)} h8" stroke="#F7F5F0" stroke-width="2.4" stroke-linecap="round"/>` }];
    case 'pants': {
      const pockets = a.v === 'cargo'
        ? `<rect x="${n(legL + 2)}" y="${n(legTop + legH * 0.38)}" width="${n(legW - 4)}" height="12" rx="2" fill="#${darken(a.c, 0.12)}" ${OUT}/><rect x="${n(legR + 2)}" y="${n(legTop + legH * 0.38)}" width="${n(legW - 4)}" height="12" rx="2" fill="#${darken(a.c, 0.12)}" ${OUT}/>`
        : `<path d="M${cx} ${n(legTop - 2)} v${n(legH * 0.3)}" stroke="#000" stroke-opacity=".18"/>`;
      return [{ z: 30, svg: box(legL - 1.5, legTop - 8, legW + 3, legH + 6, r + 1, a.c, p) + box(legR - 1.5, legTop - 8, legW + 3, legH + 6, r + 1, a.c, p) + `<rect x="${n(legL - 1.5)}" y="${n(legTop - 8)}" width="${n(legR + legW - legL + 3)}" height="7" rx="2" fill="#${darken(a.c, 0.1)}"/>` + pockets }];
    }
    case 'shorts': return [{ z: 30, svg: box(legL - 1.5, legTop - 8, legW + 3, legH * 0.46 + 8, r + 1, a.c, p) + box(legR - 1.5, legTop - 8, legW + 3, legH * 0.46 + 8, r + 1, a.c, p) + `<path d="M${n(legL + 3)} ${n(legTop + 4)} h${n(legW - 6)} M${n(legR + 3)} ${n(legTop + 10)} h${n(legW - 6)}" stroke="#F7F5F0" stroke-width="2" stroke-opacity=".6"/>` }];
    case 'shoe': {
      const x = a.side === 'L' ? legL : legR;
      if (a.v === 'boot') return [{ z: 34, svg: box(x - 2, ground - legH * 0.36, legW + 4, legH * 0.36 + 3, r, a.c, p) + `<rect x="${n(x - 2)}" y="${n(ground - 2)}" width="${n(legW + 4)}" height="5" rx="2" fill="#${darken(a.c, 0.35)}"/>` }];
      return [{ z: 34, svg: box(x - 2, ground - 12, legW + 4, 14, 5, a.c, p) + `<rect x="${n(x - 2)}" y="${n(ground - 1)}" width="${n(legW + 4)}" height="4" rx="2" fill="#D8D6CF"/><path d="M${n(x + 4)} ${ground - 8} h${n(legW - 8)}" stroke="#000" stroke-opacity=".28" stroke-width="1.4"/>` }];
    }
    case 'top': {
      const hood = a.v === 'hood' ? [{ z: 4, svg: `<path d="M${cx - 22} ${n(torsoTop + 4)} Q ${cx} ${n(torsoTop - 16)} ${cx + 22} ${n(torsoTop + 4)} Z" fill="#${darken(a.c, 0.12)}" ${OUT}/>` }] : [];
      const trim = a.v === 'knit'
        ? `<path d="M${n(torsoL + 3)} ${n(legTop - 6)} H${n(torsoR - 3)} M${n(torsoL + 3)} ${n(legTop - 2)} H${n(torsoR - 3)}" stroke="#000" stroke-opacity=".12" stroke-width="1.4"/>`
        : `<rect x="${cx - 10}" y="${n(legTop - 18)}" width="20" height="10" rx="3" fill="#000" fill-opacity=".1"/><path d="M${cx - 4} ${n(torsoTop + 2)} v10 M${cx + 4} ${n(torsoTop + 2)} v10" stroke="#F7F5F0" stroke-width="1.6"/>`;
      return [...hood, { z: 40, svg: box(torsoL - 2, torsoTop - 1, torsoR - torsoL + 4, tH + 2, r + 1, a.c, p) + box(armL - 1.5, torsoTop, armW + 3, armH * 0.86, r + 1, a.c, p) + box(armR - 1.5, torsoTop, armW + 3, armH * 0.86, r + 1, a.c, p) + trim }];
    }
    case 'dress': return [{ z: 44, svg: box(torsoL - 1.5, torsoTop - 1, torsoR - torsoL + 3, tH * 0.75, r, a.c, p) + `<path d="M${n(torsoL - 1)} ${n(legTop - 14)} L${n(torsoR + 1)} ${n(legTop - 14)} L${n(torsoR + 12)} ${n(legTop + legH * 0.55)} Q ${cx} ${n(legTop + legH * 0.62)} ${n(torsoL - 12)} ${n(legTop + legH * 0.55)} Z" fill="#${a.c}" ${OUT}/><path d="M${n(torsoL - 1)} ${n(legTop - 14)} H${n(torsoR + 1)}" stroke="#000" stroke-opacity=".2" stroke-width="2"/>` }];
    case 'jacket': {
      const body = box(torsoL - 3.5, torsoTop - 2, torsoR - torsoL + 7, tH + 6, r + 2, a.c, p) + box(armL - 3, torsoTop - 1, armW + 6, armH + 1, r + 2, a.c, p) + box(armR - 3, torsoTop - 1, armW + 6, armH + 1, r + 2, a.c, p);
      const front = a.v === 'open'
        ? `<path d="M${cx - 10} ${n(torsoTop - 2)} L${cx - 3} ${n(torsoTop + 20)} L${cx - 9} ${n(legTop + 4)} M${cx + 10} ${n(torsoTop - 2)} L${cx + 3} ${n(torsoTop + 20)} L${cx + 9} ${n(legTop + 4)}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1.6"/>`
        : `<path d="M${cx} ${n(torsoTop + 2)} V${n(legTop + 4)}" stroke="#000" stroke-opacity=".3" stroke-width="1.6"/><circle cx="${cx + 7}" cy="${n(torsoTop + 16)}" r="1.6" fill="#000" fill-opacity=".35"/><circle cx="${cx + 7}" cy="${n(torsoTop + 30)}" r="1.6" fill="#000" fill-opacity=".35"/>`;
      const collar = `<path d="M${cx - 16} ${n(torsoTop - 2)} L${cx} ${n(torsoTop + 9)} L${cx + 16} ${n(torsoTop - 2)} L${cx + 11} ${n(torsoTop - 5)} L${cx} ${n(torsoTop + 2)} L${cx - 11} ${n(torsoTop - 5)} Z" fill="#${darken(a.c, 0.14)}" ${OUT}/>`;
      return [{ z: 50, svg: body + front + collar }];
    }
    case 'scarf': {
      const stripes = Array.from({ length: 6 }, (_, i) => `<rect x="${n(torsoL + 2 + i * 9)}" y="${n(torsoTop - 4)}" width="4" height="11" fill="#${a.c2}" opacity=".8"/>`).join('');
      return [{ z: 74, svg: `<rect x="${n(torsoL - 1)}" y="${n(torsoTop - 4)}" width="${n(torsoR - torsoL + 2)}" height="11" rx="5" fill="#${a.c}" ${OUT}/>${stripes}<rect x="${cx + 6}" y="${n(torsoTop + 3)}" width="10" height="30" rx="3" fill="#${a.c}" ${OUT}/><rect x="${cx + 6}" y="${n(torsoTop + 26)}" width="10" height="3" fill="#${a.c2}"/>` }];
    }
    case 'beltbag': return [{ z: 76, svg: `<path d="M${n(torsoL)} ${n(legTop - 12)} L${n(torsoR)} ${n(legTop - 22)}" stroke="#${darken(a.c, 0.3)}" stroke-width="3"/>${box(torsoL + 2, legTop - 14, 24, 13, 5, a.c, p)}<path d="M${n(torsoL + 6)} ${n(legTop - 9)} h16" stroke="#F7F5F0" stroke-opacity=".5" stroke-width="1.2"/>` }];
    case 'hair': {
      const top = n(h.y), L = n(h.x), R = n(h.x + h.w), hh = h.h;
      if (a.v === 'long') return [
        { z: 78, svg: `<path d="M${L - 4} ${top + 10} Q ${cx} ${top - 12} ${R + 4} ${top + 10} L${R + 6} ${n(torsoTop + 26)} Q ${cx} ${n(torsoTop + 32)} ${L - 6} ${n(torsoTop + 26)} Z" fill="#${a.c}" ${OUT}/>` },
        { z: 86, svg: `<path d="M${L - 3} ${n(top + hh * 0.62)} Q ${L - 3} ${top - 6} ${cx} ${top - 6} Q ${R + 3} ${top - 6} ${R + 3} ${n(top + hh * 0.62)} L${R - 3} ${n(top + hh * 0.62)} L${R - 3} ${top + 12} Q ${cx} ${top + 5} ${L + 3} ${top + 12} L${L + 3} ${n(top + hh * 0.62)} Z" fill="#${a.c}" ${OUT}/>` },
      ];
      if (a.v === 'bob') return [{ z: 86, svg: `<path d="M${L - 4} ${n(top + hh * 0.92)} Q ${L - 6} ${top - 8} ${cx} ${top - 6} Q ${R + 6} ${top - 8} ${R + 4} ${n(top + hh * 0.92)} L${R - 4} ${n(top + hh * 0.92)} L${R - 4} ${n(top + hh * 0.34)} Q ${cx} ${n(top + hh * 0.26)} ${L + 4} ${n(top + hh * 0.34)} L${L + 4} ${n(top + hh * 0.92)} Z" fill="#${a.c}" ${OUT}/>` }];
      const spikes = `M${L - 3} ${n(top + hh * 0.5)} L${L - 1} ${top + 4} L${L + 6} ${top - 6} L${L + 12} ${top - 1} L${cx - 4} ${top - 10} L${cx + 2} ${top - 2} L${cx + 10} ${top - 9} L${R - 6} ${top - 2} L${R + 3} ${top - 4} L${R + 3} ${n(top + hh * 0.5)} L${R - 3} ${n(top + hh * 0.3)} L${cx + 8} ${top + 9} L${cx - 2} ${top + 6} L${L + 8} ${top + 11} L${L + 3} ${n(top + hh * 0.32)} Z`;
      return [{ z: 86, svg: `<path d="${spikes}" fill="#${a.c}" ${OUT}/>` }];
    }
    case 'glasses': {
      const ey = h.y + h.h * 0.47, dx = h.w * 0.22;
      if (a.v === 'star') {
        const star = (x: number) => {
          const pts = Array.from({ length: 10 }, (_, i) => { const ang = -Math.PI / 2 + (i * Math.PI) / 5; const rr = i % 2 ? 3.6 : 8; return `${n(x + Math.cos(ang) * rr)},${n(ey + Math.sin(ang) * rr)}`; }).join(' ');
          return `<polygon points="${pts}" fill="#${a.c}" ${OUT}/>`;
        };
        return [{ z: 90, svg: star(cx - dx) + star(cx + dx) + `<path d="M${n(cx - dx + 7)} ${n(ey)} H${n(cx + dx - 7)}" stroke="#${a.c}" stroke-width="2"/>` }];
      }
      return [{ z: 90, svg: `<circle cx="${n(cx - dx)}" cy="${n(ey)}" r="6.5" fill="#fff" fill-opacity=".25" stroke="#${a.c}" stroke-width="2"/><circle cx="${n(cx + dx)}" cy="${n(ey)}" r="6.5" fill="#fff" fill-opacity=".25" stroke="#${a.c}" stroke-width="2"/><path d="M${n(cx - dx + 6.5)} ${n(ey)} H${n(cx + dx - 6.5)}" stroke="#${a.c}" stroke-width="2"/>` }];
    }
    case 'hat': {
      const top = n(h.y), L = n(h.x), R = n(h.x + h.w), w = h.w;
      switch (a.v) {
        case 'bucket': return [{ z: 92, svg: `<path d="M${L + 2} ${top + 10} Q ${L + 4} ${top - 14} ${cx} ${top - 15} Q ${R - 4} ${top - 14} ${R - 2} ${top + 10} Z" fill="#${a.c}" ${OUT}/><path d="M${L - 10} ${top + 15} Q ${cx} ${top + 2} ${R + 10} ${top + 15} L${R - 1} ${top + 7} Q ${cx} ${top} ${L + 1} ${top + 7} Z" fill="#${darken(a.c, 0.08)}" ${OUT}/>` }];
        case 'cap': return [{ z: 92, svg: `<path d="M${L - 1} ${top + 9} Q ${L} ${top - 12} ${cx} ${top - 12} Q ${R} ${top - 12} ${R + 1} ${top + 9} Z" fill="#${a.c}" ${OUT}/><path d="M${L - 16} ${top + 11} Q ${L - 4} ${top + 4} ${cx} ${top + 7} L${cx} ${top + 11} Z" fill="#${darken(a.c, 0.2)}" ${OUT}/><circle cx="${cx}" cy="${top - 11}" r="2.2" fill="#${darken(a.c, 0.25)}"/>` }];
        case 'beanie': return [{ z: 92, svg: `<path d="M${L - 1} ${top + 12} Q ${L} ${top - 14} ${cx} ${top - 14} Q ${R} ${top - 14} ${R + 1} ${top + 12} Z" fill="#${a.c}" ${OUT}/><rect x="${L - 3}" y="${top + 4}" width="${n(w + 6)}" height="10" rx="4" fill="#${darken(a.c, 0.12)}" ${OUT}/><circle cx="${cx}" cy="${top - 15}" r="5.5" fill="#F1E6D2" ${OUT}/>` }];
        case 'crown': return [{ z: 92, svg: `<path d="M${L + 2} ${top + 4} L${L} ${top - 16} L${n(L + w * 0.25)} ${top - 5} L${cx} ${top - 20} L${n(R - w * 0.25)} ${top - 5} L${R} ${top - 16} L${R - 2} ${top + 4} Z" fill="#${a.c}" ${OUT}/><circle cx="${cx}" cy="${top - 3}" r="2.6" fill="#C2414B"/><circle cx="${L + 9}" cy="${top - 1}" r="2" fill="#3A7BD5"/><circle cx="${R - 9}" cy="${top - 1}" r="2" fill="#3A7BD5"/>` }];
        case 'visor': return [{ z: 92, svg: `<rect x="${L - 1}" y="${top + 3}" width="${n(w + 2)}" height="7" rx="3" fill="#${a.c}" ${OUT}/><path d="M${L - 6} ${top + 10} Q ${cx} ${top + 22} ${R + 6} ${top + 10} Z" fill="#${darken(a.c, 0.15)}" ${OUT}/>` }];
      }
      return [];
    }
    case 'bird': {
      const x = n(torsoR + 2), y = n(torsoTop - 9);
      return [{ z: 94, svg: `<ellipse cx="${x}" cy="${y}" rx="9" ry="7" fill="#${a.c}" ${OUT}/><circle cx="${n(x + 6)}" cy="${n(y - 6)}" r="5" fill="#${a.c}" ${OUT}/><circle cx="${n(x + 7.5)}" cy="${n(y - 7)}" r="1.1" fill="#111"/><path d="M${n(x + 10.5)} ${n(y - 6.5)} l4 1.5 l-4 1.2 Z" fill="#E8A33B"/><path d="M${n(x - 9)} ${y} l-6 3 l6 1 Z" fill="#${darken(a.c, 0.2)}"/>` }];
    }
  }
}

function face(kind: string | undefined, g: Geo): string {
  const { cx, head: h } = g;
  const ey = h.y + h.h * 0.47, dx = h.w * 0.22, my = h.y + h.h * 0.7;
  if (kind === 'grin') return `<circle cx="${n(cx - dx)}" cy="${n(ey)}" r="2.3" fill="#1d1d1f"/><circle cx="${n(cx + dx)}" cy="${n(ey)}" r="2.3" fill="#1d1d1f"/><path d="M${cx - 9} ${n(my - 2)} Q ${cx} ${n(my + 9)} ${cx + 9} ${n(my - 2)} Z" fill="#fff" stroke="#1d1d1f" stroke-width="1.6" stroke-linejoin="round"/>`;
  if (kind === 'sleepy') return `<path d="M${n(cx - dx - 3.5)} ${n(ey)} q3.5 2.6 7 0 M${n(cx + dx - 3.5)} ${n(ey)} q3.5 2.6 7 0" fill="none" stroke="#1d1d1f" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="${cx}" cy="${n(my + 1)}" rx="2.4" ry="2" fill="#1d1d1f"/>`;
  return `<circle cx="${n(cx - dx)}" cy="${n(ey)}" r="2.3" fill="#1d1d1f"/><circle cx="${n(cx + dx)}" cy="${n(ey)}" r="2.3" fill="#1d1d1f"/><path d="M${cx - 6} ${n(my)} Q ${cx} ${n(my + 5)} ${cx + 6} ${n(my)}" fill="none" stroke="#1d1d1f" stroke-width="1.8" stroke-linecap="round"/>`;
}

function base(g: Geo, skin: string, p: string, faceKind?: string): { body: string; head: string } {
  const { cx, legTop, legW, torsoTop, torsoL, torsoR, armW, armH, head: h, limbRx: r, ground } = g;
  const legH = ground - legTop;
  const body = box(cx - legW - 1, legTop, legW, legH, r, skin, p) + box(cx + 1, legTop, legW, legH, r, skin, p) +
    box(torsoL - armW - 1, torsoTop + 1, armW, armH, r, skin, p) + box(torsoR + 1, torsoTop + 1, armW, armH, r, skin, p) +
    box(torsoL, torsoTop, torsoR - torsoL, legTop - torsoTop + 2, r, skin, p);
  const head = box(h.x, h.y, h.w, h.h, h.rx, skin, p) + face(faceKind, g);
  return { body, head };
}

const defs = (p: string) => `<defs><linearGradient id="${p}s" x1="0" x2="1" y1="0" y2="0"><stop offset=".66" stop-color="#000" stop-opacity="0"/><stop offset=".66" stop-color="#000" stop-opacity=".13"/><stop offset="1" stop-color="#000" stop-opacity=".13"/></linearGradient></defs>`;

let uid = 0;

/** Full figure. With `split`, every item is wrapped in <g class="part" data-part="id"> (an item can have a back and a front group). */
export function renderFigure(f: Figure, opts: { split?: boolean; prefix?: string; shadow?: boolean; label?: string } = {}): string {
  const p = opts.prefix ?? `a${(uid++).toString(36)}`;
  const g = geo(f);
  const faceItem = f.items.find((i) => i.art.k === 'face');
  const all: (Layer & { id: number | 'body' | 'head' })[] = [];
  const b = base(g, f.skin, p, faceItem && faceItem.art.k === 'face' ? faceItem.art.v : undefined);
  all.push({ z: 10, svg: b.body, id: 'body' }, { z: 80, svg: b.head, id: 'head' });
  for (const it of f.items) for (const l of layers(it.art, g, p)) all.push({ ...l, id: it.id });
  all.sort((a, c) => a.z - c.z);
  const shadowSvg = opts.shadow === false ? '' : `<ellipse class="shadow" cx="100" cy="${g.ground + 3}" rx="44" ry="5" fill="#000" fill-opacity=".1"/>`;
  const inner = all.map((l) => (opts.split ? `<g class="part" data-part="${l.id}">${l.svg}</g>` : l.svg)).join('');
  const a11y = opts.label ? `role="img" aria-label="${esc(opts.label)}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" ${a11y}>${defs(p)}${shadowSvg}${inner}</svg>`;
}

const REGION: Record<string, string> = {
  hat: '58 18 84 84', hair: '58 22 84 84', glasses: '66 32 68 68', face: '66 32 68 68', head: '62 30 76 76', scarf: '54 54 92 92',
  back: '8 22 184 184', bird: '104 46 64 64', beltbag: '56 90 80 80', jacket: '40 60 120 120', top: '40 60 120 120',
  cshirt: '40 60 120 120', tee: '58 66 84 84', dress: '40 76 120 120', pants: '54 112 92 92', cpants: '54 112 92 92',
  shorts: '54 112 70 70', shoe: '62 140 76 76', body: '14 14 172 172',
};

/** One item on a faint mannequin, cropped to where it's worn. */
export function renderItem(art: Art, avatarType = 'R15'): string {
  const p = `i${(uid++).toString(36)}`;
  const g = geo({ avatarType });
  if (art.k === 'none') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g fill="none" stroke="#7B8191" stroke-width="2.4" stroke-linecap="round"><circle cx="28" cy="10" r="4"/><path d="M27 15 l-3 12 l7 6 l-2 10 M24 27 l-8 9 M26 18 l-9 3 M27 18 l8 5"/><path d="M6 20 h6 M4 27 h7 M7 34 h6" stroke-opacity=".5"/></g></svg>`;
  }
  if (art.k === 'body' || art.k === 'head') {
    const bb = base(g, 'A9AFBB', p);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${REGION[art.k]}">${defs(p)}${art.k === 'head' ? bb.head : bb.body + bb.head}</svg>`;
  }
  if (art.k === 'face') return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${REGION.face}">${defs(p)}${base(g, 'E3D3C4', p, art.v).head}</svg>`;
  const m = base(g, 'B9BEC9', p);
  const ghost = `<g opacity=".22">${m.body}${m.head}</g>`;
  const ls = layers(art, g, p).sort((a, b) => a.z - b.z).map((l) => l.svg).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${REGION[art.k] ?? '0 0 200 200'}">${defs(p)}${ghost}${ls}</svg>`;
}

export const svgUrl = (svg: string) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
