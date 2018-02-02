
// @flow

export type Maybe<A> = null | Just<A>;

export class Just<A> {
  value: A;
  constructor(value: A) {
    this.value = value;
  }
}

export function map<A, B>(fn: A => B, a: Maybe<A>) : Maybe<B> {
  return a === null ? null : new Just(fn(a.value));
}

export function pure<A>(a: A) : Maybe<A> {
  return new Just(a);
}

export function ap<A, B>(fn: Maybe<A => B>, a: Maybe<A>) : Maybe<B> {
  return fn === null || a === null ?
    null :
    new Just(fn.value(a.value));
}

