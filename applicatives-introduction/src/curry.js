
// @flow

export function curry2<A, B, R>(fn: (A, B) => R) : A => B => R {
  return a => b => fn(a, b);
}

export function curry3<A, B, C, R>(fn: (A, B, C) => R) : A => B => C => R {
  return a => b => c => fn(a, b, c);
}

