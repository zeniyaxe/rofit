/** Reads the extension's CHANGELOG.md at build time so the site never keeps a second copy of the history. */
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

export interface Release { version: string; title: string; html: string }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s: string) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');

export function releases(): Release[] {
  const md = readFileSync(join(resolve(process.cwd(), '..'), 'CHANGELOG.md'), 'utf8');
  return md.split(/^## /m).slice(1).map((block) => {
    const [head, ...rest] = block.split('\n');
    const [version, ...t] = head.split(/\s+[—-]\s+/);
    let html = ''; let inList = false;
    for (const raw of rest) {
      const line = raw.trimEnd();
      if (line.startsWith('- ')) { if (!inList) { html += '<ul>'; inList = true; } html += `<li>${inline(line.slice(2))}</li>`; continue; }
      if (inList) { html += '</ul>'; inList = false; }
      if (!line.trim()) continue;
      html += /^\*\*.*\*\*$/.test(line) ? `<h4>${inline(line.replace(/^\*\*|\*\*$/g, ''))}</h4>` : `<p>${inline(line)}</p>`;
    }
    if (inList) html += '</ul>';
    return { version: version.trim(), title: t.join(' — '), html };
  });
}
