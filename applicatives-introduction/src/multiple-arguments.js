
// @flow

import { curry2, curry3 } from "./curry";

function pureSet<A>(a: A) : Set<A> {
  return new Set().add(a);
}

function apSet<A, B>(fnSet: Set<A => B>, aSet: Set<A>) : Set<B> {
  const result = new Set();
  for (const fn of fnSet) {
    for (const a of aSet) {
      result.add(fn(a));
    }
  }
  return result;
}

function mapSet<A, B>(fn: A => B, a: Set<A>) : Set<B> {
  return apSet(pureSet(fn), a);
}

function subtract(x: number, y: number) : number {
  return x - y;
}

const curriedSubtract = curry2(subtract);

const nums = new Set([5, 6, 7]);
const fns = mapSet(curriedSubtract, nums);

console.log(apSet(fns, new Set([1, 2, 3])));

console.log(
  apSet(mapSet(curriedSubtract, new Set([5, 6, 7])),
        new Set([1, 2, 3])));



function isBetween(x: number, y: number, z: number) : boolean {
  return x < y && y < z;
}

console.log(
  apSet(
    apSet(
      mapSet(curry3(isBetween), new Set([1, 2])),
      new Set([3, 4, 99])),
    new Set([5, 6])));




function liftA2Set<A, B, C>(
  fn: A => B => C,
  s1: Set<A>,
  s2: Set<B>) : Set<C> {
    return apSet(mapSet(fn, s1), s2);
}

function liftA3Set<A, B, C, D>(
  fn: A => B => C => D,
  s1: Set<A>,
  s2: Set<B>,
  s3: Set<C>) : Set<D> {
    return apSet(liftA2Set(fn, s1, s2), s3);
}

function liftA4Set<A, B, C, D, E>(
  fn: A => B => C => D => E,
  s1: Set<A>,
  s2: Set<B>,
  s3: Set<C>,
  s4: Set<D>) : Set<E> {
    return apSet(liftA3Set(fn, s1, s2, s3), s4);
}



console.log(liftA2Set(curry2(subtract), new Set([5, 6, 7]), new Set([1, 2, 3])));

console.log(liftA3Set(curry3(isBetween),
                      new Set([1, 2]),
                      new Set([3, 4]),
                      new Set([5, 6])));

