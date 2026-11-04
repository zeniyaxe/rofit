/**
 * Search for outfits, items, library entries and palette commands.
 * Pure and allocation-light: a 150-outfit profile with every outfit indexed is ~2,500 strings, scored per keystroke.
 *
 * Query language (all optional, AND between terms):
 *   words          fuzzy: exact > prefix > word-prefix > substring > in-order letters (> one typo, long words only)
 *   "a phrase"     must appear as typed (case-insensitive)
 *   123456         also matches an outfit or item ID exactly (numbers still match names, e.g. "2011")
 *   -word          excludes anything matching the word
 */

export interface Query {
  raw: string;
  terms: string[];
  phrases: string[];
  ids: number[];
  not: string[];
}

const DIACRITICS = /[\u0300-\u036f]/g;
/** Lowercase, strip accents, turn punctuation into spaces. "Café-Noir_2" → "cafe noir 2". */
export function norm(s: string): string {
  return s.normalize('NFKD').replace(DIACRITICS, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

export function parseQuery(raw: string): Query {
  const q: Query = { raw, terms: [], phrases: [], ids: [], not: [] };
  const re = /(-?)"([^"]*)"|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    if (m[2] !== undefined) {
      const p = norm(m[2]);
      if (!p) continue;
      (m[1] ? q.not : q.phrases).push(p);
      continue;
    }
    let t = m[3];
    const neg = t.startsWith('-') && t.length > 1;
    if (neg) t = t.slice(1);
    const hashId = /^#(\d{1,20})$/.exec(t);
    if (hashId && !neg) { q.ids.push(Number(hashId[1])); continue; }
    const n = norm(t);
    if (!n) continue;
    if (neg) { q.not.push(n); continue; }
    for (const part of n.split(' ')) {
      q.terms.push(part);
      if (/^\d{3,20}$/.test(part)) q.ids.push(Number(part));
    }
  }
  return q;
}

export const isEmpty = (q: Query) => !q.terms.length && !q.phrases.length && !q.ids.length && !q.not.length;

/** Edit distance ≤ 1 (insert, delete, substitute or swap two neighbours). */
function withinOne(a: string, b: string): boolean {
  if (a === b) return true;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  let i = 0;
  while (i < la && i < lb && a[i] === b[i]) i++;
  if (la === lb) {
    if (a.slice(i + 1) === b.slice(i + 1)) return true;
    return a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2);
  }
  return la > lb ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

/**
 * How well `needle` (already normalized, one word) matches `hay` (already normalized). 0 = no match.
 * Scores are comparable across fields so results can be ranked by best field.
 */
export function scoreTerm(needle: string, hay: string): number {
  if (!needle || !hay) return 0;
  if (hay === needle) return 100;
  const wordEnd = (i: number) => i + needle.length === hay.length || hay[i + needle.length] === ' ';
  // Whole words beat word fragments: "sky" ranks "Sky Blue" above "Skyline".
  if (hay.startsWith(needle)) return (wordEnd(0) ? 92 : 84) - Math.min(6, (hay.length - needle.length) / 6);
  let at = hay.indexOf(' ' + needle);
  if (at >= 0) { at++; return (wordEnd(at) ? 78 : 70) - Math.min(6, at / 8); }
  at = hay.indexOf(needle);
  if (at > 0) return 52 - Math.min(6, at / 8);
  if (needle.length >= 3) {
    // In-order letters within a tight window: "drkhood" → "dark hoodie".
    let i = 0, start = -1, end = -1;
    for (let j = 0; j < hay.length && i < needle.length; j++) {
      if (hay[j] === needle[i]) { if (start < 0) start = j; i++; end = j; }
    }
    if (i === needle.length) {
      const span = end - start + 1;
      if (span <= needle.length * 2 + 2) return 34 - Math.min(14, span - needle.length);
    }
  }
  if (needle.length >= 5) {
    for (const w of hay.split(' ')) if (w.length >= 4 && withinOne(needle, w)) return 24;
  }
  return 0;
}

export interface Field { text: string; weight?: number; kind?: string; label?: string; id?: number }
export interface Match { score: number; field?: Field }

/**
 * Scores a record made of several fields (name, item names, tags…). Every term and phrase must match some field;
 * an ID term may instead equal a field's id. Returns null when the record doesn't match.
 */
export function matchFields(q: Query, fields: Field[], prepared?: string[]): Match | null {
  const texts = prepared ?? fields.map((f) => norm(f.text));
  for (const n of q.not) if (texts.some((t) => t.includes(n))) return null;
  let total = 0;
  let best: { s: number; f?: Field } = { s: 0 };
  const idHit = (id: number) => fields.findIndex((f) => f.id === id);
  for (const p of q.phrases) {
    const i = texts.findIndex((t) => t.includes(p));
    if (i < 0) return null;
    const s = 90 * (fields[i].weight ?? 1);
    total += s;
    if (s > best.s) best = { s, f: fields[i] };
  }
  for (const term of q.terms) {
    let s = 0, f: Field | undefined;
    for (let i = 0; i < fields.length; i++) {
      const v = scoreTerm(term, texts[i]) * (fields[i].weight ?? 1);
      if (v > s) { s = v; f = fields[i]; }
    }
    if (/^\d{3,20}$/.test(term)) {
      const k = idHit(Number(term));
      if (k >= 0 && 120 > s) { s = 120; f = fields[k]; }
    }
    if (!s) return null;
    total += s;
    if (s > best.s) best = { s, f };
  }
  // "#123" (no free-text twin) must hit an id.
  for (const id of q.ids) {
    if (q.terms.includes(String(id))) continue;
    const k = idHit(id);
    if (k < 0) return null;
    total += 120;
    if (120 > best.s) best = { s: 120, f: fields[k] };
  }
  return { score: total, field: best.f };
}

/** Convenience for flat lists (palette commands, users): returns items sorted by score. */
export function rank<T>(items: T[], q: string | Query, fields: (t: T) => Field[]): { item: T; match: Match }[] {
  const query = typeof q === 'string' ? parseQuery(q) : q;
  if (isEmpty(query)) return items.map((item) => ({ item, match: { score: 0 } }));
  const out: { item: T; match: Match; i: number }[] = [];
  items.forEach((item, i) => { const m = matchFields(query, fields(item)); if (m) out.push({ item, match: m, i }); });
  out.sort((a, b) => b.match.score - a.match.score || a.i - b.i);
  return out;
}
