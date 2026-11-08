import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

test('privacy claims match the extension manifest and source', () => {
  const out = execFileSync('node', ['scripts/check-claims.mjs'], { encoding: 'utf8' });
  assert.match(out, /claim check ok/);
});

test('no third-party hosts in the built site', { skip: !existsSync('dist/index.html') }, () => {
  for (const f of ['index.html', 'privacy.html', 'install.html']) {
    const html = readFileSync('dist/' + f, 'utf8');
    for (const m of html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)) {
      assert.match(m[1], /^https:\/\/(rofit\.site|github\.com\/zeniyaxe\/rofit|www\.roblox\.com\/games\/6513295364\/)/, `unexpected external reference ${m[1]} in ${f}`);
    }
  }
});
