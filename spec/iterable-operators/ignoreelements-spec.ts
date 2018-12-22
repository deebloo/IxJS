import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.ignoreElements]);
const { range } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;

test('Iterable#ignoreElements has side effects', ([ignoreElements]) => {
  let n = 0;
  take(ignoreElements(tap(range(0, 10), { next: () => n++ })), 5).forEach(() => {
    /* tslint:disable-next-line:no-empty */
  });

  expect(10).toBe(n);
});
