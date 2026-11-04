// A deliberately small Markdown subset for CHANGELOG.md: headings, paragraphs, bullet lists, **bold**, `code`
// and [links](https://…). Everything is escaped first; links must be https:, a site path or an in-page anchor.
import { esc } from './layout.mjs';

export const slug = (s) => s.toLowerCase().replace(/<[^>]*>/g, '').replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

// A site path is "/" plus anything but a second slash or a backslash (browsers read "//host" and "/\host" as another site).
const SAFE_HREF = /^(https:\/\/[^\s"'<>\\]+|\/(?![\/\\])[^\s"'<>\\]*|#[\w-]+)$/;

const UNENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
const unesc = (s) => s.replace(/&(?:amp|lt|gt|quot|#39);/g, (e) => UNENT[e]);

export function inline(src) {
  // Code spans first, so nothing inside them is treated as markup.
  return src.split(/(`[^`]+`)/g).map((part) => {
    if (/^`[^`]+`$/.test(part)) return `<code>${esc(part.slice(1, -1))}</code>`;
    let s = esc(part);
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, href) => {
      const raw = unesc(href); // judge the link as written, not its escaped form
      return SAFE_HREF.test(raw) ? `<a href="${esc(raw)}">${text}</a>` : text;
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return s;
  }).join('');
}

/** Markdown → HTML. `skipTitle` drops the first `# ` heading (the page supplies its own h1). */
export function markdown(md, { skipTitle = true } = {}) {
  const out = [];
  let para = [];
  let list = null;
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join('')}</ul>`); list = null; } };
  let titled = !skipTitle;
  for (const line of md.replace(/\r\n?/g, '\n').split('\n')) {
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      flushPara(); flushList();
      const level = h[1].length;
      if (level === 1 && !titled) { titled = true; continue; }
      const html = inline(h[2].trim());
      const tag = `h${Math.min(level, 4)}`;
      out.push(`<${tag} id="${slug(html)}">${html}</${tag}>`);
      continue;
    }
    const li = /^\s*[-*]\s+(.*)$/.exec(line);
    if (li) { flushPara(); (list ??= []).push(li[1]); continue; }
    if (!line.trim()) { flushPara(); flushList(); continue; }
    if (list && /^\s{2,}\S/.test(line)) { list[list.length - 1] += ' ' + line.trim(); continue; }
    flushList();
    para.push(line.trim());
  }
  flushPara(); flushList();
  return out.join('\n');
}
