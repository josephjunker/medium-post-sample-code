
// @flow

import { curry2, curry3 } from "./curry";

function purePromise<A>(a: A) : Promise<A> {
  return Promise.resolve(a);
}

function apPromise<A, B>(fnPromise: Promise<A => B>,
                         aPromise: Promise<A>) : Promise<B> {
  return fnPromise.then(fn => aPromise.then(a => fn(a)));
}

function mapPromise<A, B>(fn: A => B, a: Promise<A>) : Promise<B> {
  return apPromise(purePromise(fn), a);
}

function prismVolume(length: number, width: number, height: number) : number {
  return length * width * height;
}

function liftA2Promise<A, B, C>(
  fn: A => B => C,
  s1: Promise<A>,
  s2: Promise<B>) : Promise<C> {
    return apPromise(mapPromise(fn, s1), s2);
}

function liftA3Promise<A, B, C, D>(
  fn: A => B => C => D,
  s1: Promise<A>,
  s2: Promise<B>,
  s3: Promise<C>) : Promise<D> {
    return apPromise(liftA2Promise(fn, s1, s2), s3);
}

const length = Promise.resolve(2),
      width = Promise.resolve(3),
      height = Promise.resolve(4);

liftA3Promise(curry3(prismVolume), length, width, height)
  .then(volume => console.log(volume));

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

const lengthSet = new Set([2]),
      widthSet = new Set([3, 4]),
      heightSet = new Set([5, 6, 7]);

console.log(liftA3Set(
  curry3(prismVolume),
  lengthSet,
  widthSet,
  heightSet));

type SetPromise<A> = Promise<Set<A>>;

function pureSetPromise<A>(a: A) : SetPromise<A> {
  return purePromise(pureSet(a));
}

function apSetPromise<A, B>(fn: SetPromise<A => B>, a: SetPromise<A>) : SetPromise<B> {
  return liftA2Promise(curry2(apSet), fn, a)
}

function apSetPromiseLong<A, B>(fn: Promise<Set<A => B>>, a: Promise<Set<A>>) : Promise<Set<B>> {
  const curried : Set<A => B> => Set<A> => Set<B> = curry2(apSet);
  const mapped : Promise<Set<A> => Set<B>> = mapPromise(curried, fn);

  return apPromise(mapped, a);
}

function mapSetPromise<A, B>(fn: A => B, a: SetPromise<A>) : SetPromise<B> {
  return apSetPromise(pureSetPromise(fn), a);
}

function liftA2SetPromise<A, B, C>(
  fn: A => B => C,
  s1: SetPromise<A>,
  s2: SetPromise<B>) : SetPromise<C> {
    return apSetPromise(mapSetPromise(fn, s1), s2);
}

function liftA3SetPromise<A, B, C, D>(
  fn: A => B => C => D,
  s1: SetPromise<A>,
  s2: SetPromise<B>,
  s3: SetPromise<C>) : SetPromise<D> {
    return apSetPromise(liftA2SetPromise(fn, s1, s2), s3);
}

const lengthSetPromise = Promise.resolve(new Set([2])),
      widthSetPromise = Promise.resolve(new Set([3, 4])),
      heightSetPromise = Promise.resolve(new Set([5, 6, 7]));

liftA3SetPromise(curry3(prismVolume),
                 lengthSetPromise,
                 widthSetPromise,
                 heightSetPromise)
  .then(volume => console.log(volume));

