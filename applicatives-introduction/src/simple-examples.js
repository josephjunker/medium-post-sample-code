
// @flow

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

const fns = new Set([
  x => x * 2,
  x => x + 1,
  x => x * x]);

const numbers = new Set([1, 2, 3, 4]);

console.log(apSet(fns, numbers));
// Set { 2, 4, 6, 8, 3, 5, 1, 9, 16 }

function purePromise<A>(a: A) : Promise<A> {
  return Promise.resolve(a);
}

function apPromise<A, B>(fnPromise: Promise<A => B>,
                         aPromise: Promise<A>) : Promise<B> {
  return fnPromise.then(fn => aPromise.then(a => fn(a)));
}

const squarePromise = purePromise(x => x * x),
      threePromise = purePromise(3);

apPromise(squarePromise, threePromise)
  .then(x => console.log(x)); // 9

type Maybe<A> = null | Just<A>;

class Just<A> {
  value: A;
  constructor(value) {
    this.value = value;
  }
}

function pureMaybe<A>(a: A) : Maybe<A> {
  return new Just(a);
}

function apMaybe<A, B>(fn: Maybe<A => B>, a: Maybe<A>) : Maybe<B> {
  return fn === null || a === null ?
    null :
    new Just(fn.value(a.value));
}

console.log(apMaybe(
  pureMaybe(x => x + 1),
  pureMaybe(3))); // Just { value: 4 }

console.log(apMaybe(null, pureMaybe(3))); // null
console.log(apMaybe(pureMaybe(x => x + 1), null)); // null
console.log(apMaybe(null, null)); // null

