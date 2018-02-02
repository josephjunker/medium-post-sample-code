
// @flow

export function curry2<A, B, R>(fn: (A, B) => R) :
  A => B => R {
    return a => b => fn(a, b);
  }

export function curry3<A, B, C, R>(fn: (A, B, C) => R) :
  A => B => C => R {
    return a => b => c => fn(a, b, c);
  }

export function curry4<A, B, C, D, R>(fn: (A, B, C, D) => R) :
  A => B => C => D => R {
    return a => b => c => d => fn(a, b, c, d);
  }

export function curry5<A, B, C, D, E, R>(fn: (A, B, C, D, E) => R) :
  A => B => C => D => E => R {
    return a => b => c => d => e => fn(a, b, c, d, e);
  }
