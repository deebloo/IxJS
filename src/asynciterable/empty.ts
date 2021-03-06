import { AsyncIterableX } from './asynciterablex';

class EmptyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  async *[Symbol.asyncIterator](): AsyncIterator<TSource> {
    // eslint-disable-next-line no-empty
  }
}

export function empty<TSource>(): AsyncIterableX<TSource> {
  return new EmptyAsyncIterable<TSource>();
}
