
// @flow

function mapSet<A, B>(fn: A => B, s: Set<A>) : Set<B> {
  const result = new Set();
  for (let item of s) {
    result.add(fn(item))
  }
  return result;
}

console.log(mapSet(x => x * x, new Set([1, 2, 3, 4, 5])));



function mapPromise<A, B>(fn: A => B, p: Promise<A>) : Promise<B> {
  return p.then(fn);
}

mapPromise(x => x * 2, Promise.resolve(5)).then(x => console.log(`Promise result: ${x}`));



type Maybe<A> = null | Just<A>;

class Just<A> {
  value: A;
  constructor(value) {
    this.value = value;
  }
}

function mapMaybe<A, B>(fn: A => B, m: Maybe<A>) : Maybe<B> {
  return m === null ? null : new Just(fn(m.value));
}

function foo (x: number) : ?number {
  if (x === null) throw new Error("bad input");
  if (x === 99) return null;
  return x;
}

// Would throw (if flow didn't complain about it)
// foo(null);

console.log(mapMaybe(foo, null));
console.log(mapMaybe(foo, new Just(1)));
console.log(mapMaybe(foo, new Just(99)));


