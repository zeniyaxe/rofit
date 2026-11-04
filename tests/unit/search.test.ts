import test from 'node:test';
import assert from 'node:assert/strict';
import { matchFields, norm, parseQuery, rank, scoreTerm } from '../../src/shared/search.ts';

test('norm strips accents, case and punctuation', () => {
  assert.equal(norm('Café-Noir_2 '), 'cafe noir 2');
  assert.equal(norm('  ÜBER   cool!! '), 'uber cool');
});

test('parseQuery splits terms, phrases, ids and exclusions', () => {
  const q = parseQuery('red "night sky" -hat #123 2011');
  assert.deepEqual(q.terms, ['red', '2011']);
  assert.deepEqual(q.phrases, ['night sky']);
  assert.deepEqual(q.not, ['hat']);
  assert.deepEqual(q.ids, [123, 2011]);
});

test('scoreTerm ranks exact > prefix > word prefix > substring > in-order > typo', () => {
  const exact = scoreTerm('hoodie', 'hoodie');
  const prefix = scoreTerm('hood', 'hoodie black');
  const word = scoreTerm('black', 'hoodie black');
  const sub = scoreTerm('ack', 'hoodie black');
  const seq = scoreTerm('hdie', 'hoodie');
  const typo = scoreTerm('hoodei', 'black hoodie');
  assert.ok(exact > prefix && prefix > word && word > sub && sub > seq && seq > typo && typo > 0, JSON.stringify({ exact, prefix, word, sub, seq, typo }));
  assert.equal(scoreTerm('xyz', 'hoodie'), 0);
  assert.equal(scoreTerm('ab', 'a b'), 0, 'two-letter needles never fuzzy-match');
});

test('matchFields: every term must match some field; ids match exactly; exclusions win', () => {
  const fields = [{ text: 'Early 2011', weight: 1.2, kind: 'name' }, { text: 'Red Baseball Cap', kind: 'item', id: 1029025 }, { text: 'Blue Jeans', kind: 'item', id: 77 }];
  assert.ok(matchFields(parseQuery('2011'), fields));
  assert.ok(matchFields(parseQuery('red jeans'), fields), 'terms may match different fields');
  assert.equal(matchFields(parseQuery('red green'), fields), null);
  const byId = matchFields(parseQuery('1029025'), fields)!;
  assert.equal(byId.field?.kind, 'item');
  assert.equal(matchFields(parseQuery('#999'), fields), null, '#id must hit an id');
  assert.equal(matchFields(parseQuery('cap -jeans'), fields), null);
  assert.ok(matchFields(parseQuery('"baseball cap"'), fields));
  assert.equal(matchFields(parseQuery('"cap baseball"'), fields), null);
});

test('rank orders by score and keeps input order on ties', () => {
  const items = ['Night Sky', 'Sky Blue', 'Skyline', 'Ocean'];
  const r = rank(items, 'sky', (s) => [{ text: s }]).map((x) => x.item);
  assert.deepEqual(r.slice(0, 2), ['Sky Blue', 'Skyline']);
  assert.ok(r.includes('Night Sky') && !r.includes('Ocean'));
  assert.deepEqual(rank(items, '  ', (s) => [{ text: s }]).map((x) => x.item), items, 'empty query keeps everything in order');
});
