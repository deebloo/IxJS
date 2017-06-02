'use strict';

import * as test from 'tape';
import { join } from '../../dist/cjs/iterable/join';
import { _throw } from '../../dist/cjs/iterable/throw';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#join normal', t => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = join(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, y) => x + y);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 0 + 3);
  hasNext(t, it, 0 + 6);
  hasNext(t, it, 1 + 4);
  noNext(t, it);
  t.end();
});

test('Iterable#join reversed', t => {
  const xs = [3, 6, 4];
  const ys = [0, 1, 2];
  const res = join(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, y) => x + y);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 3 + 0);
  hasNext(t, it, 6 + 0);
  hasNext(t, it, 4 + 1);
  noNext(t, it);
  t.end();
});

test('Iterable#join only one group matches', t => {
  const xs = [0, 1, 2];
  const ys = [3, 6];
  const res = join(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, y) => x + y);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 0 + 3);
  hasNext(t, it, 0 + 6);
  noNext(t, it);
  t.end();
});

test('Iterable#join only one group matches reversed', t => {
  const xs = [3, 6];
  const ys = [0, 1, 2];
  const res = join(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, y) => x + y);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 3 + 0);
  hasNext(t, it, 6 + 0);
  noNext(t, it);
  t.end();
});

test('Iterable#join left throws', t => {
  const xs = _throw<number>(new Error());
  const ys = [3, 6, 4];
  const res = join(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, y) => x + y);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#join right throws', t => {
  const xs = [0, 1, 2]
  const ys = _throw<number>(new Error());
  const res = join(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, y) => x + y);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#join left selector throws', t => {
  const xs = [0, 1, 2]
  const ys = [3, 6, 4];
  const res = join(
    xs,
    ys,
    x => { throw new Error(); },
    y => y % 3,
    (x, y) => x + y);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#join right selector throws', t => {
  const xs = [0, 1, 2]
  const ys = [3, 6, 4];
  const res = join(
    xs,
    ys,
    x => x % 3,
    y => { throw new Error(); },
    (x, y) => x + y);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#join result selector throws', t => {
  const xs = [0, 1, 2]
  const ys = [3, 6, 4];
  const res = join(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, y) => { throw new Error(); });

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});