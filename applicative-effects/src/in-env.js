
// @flow

export class Env<X, Y> {
  contents: Map<X, Y>;
  constructor(contents: Map<X, Y>) {
    this.contents = contents;
  }
}

export type InEnv<X, Y, A> = Env<X, Y> => A;

export function map<X, Y, A, B>(fn: A => B, a: InEnv<X, Y, A>) : InEnv<X, Y, B> {
  return env => fn(a(env));
}

export function pure<X, Y, A>(a: A) : InEnv<X, Y, A> {
  return env => a;
}

export function ap<X, Y, A, B>(fn: InEnv<X, Y, A => B>, a: InEnv<X, Y, A>) : InEnv<X, Y, B> {
  return env => fn(env)(a(env)); 
}

export function liftA2<X, Y, A, B, R>(fn: A => B => R) : (InEnv<X, Y, A>, InEnv<X, Y, B>) => InEnv<X, Y, R> {
  return (a, b) => ap(map(fn, a), b);
}

export function fetch<X, Y>(name: X) : InEnv<X, Y, Y> {
  return env => {
    if (!env.contents.has(name))
      throw new Error("Tried to retrieve a value that wasn't in the environment!");

    // The `any` cast is necessary because `has` doesn't work as
    // a type refinement, and Flow thinks `get` might return 
    // `undefined` here.
    return (env.contents.get(name) : any);
  };
}

export function alias<X, Y, A>(name: X, value: Y, contents: InEnv<X, Y, A>) : InEnv<X, Y, A> {
  return env => {
    const newEnvContents = new Map(env.contents);
    newEnvContents.set(name, value);
    return contents(new Env(newEnvContents));
  };
}

/*
 * While consumers of `InEnv` could just treat it as a function, passing an env
 * to it to execute it, we can achieve better decoupling by providing them with
 * a function to do this. This way consuming code doesn't need to know anything
 * about the internal structure of the InEnv applicative. We could even make
 * InEnv an opaque type to prevent people from writing their own functions which
 * operate on InEnv's structure. This would result in InEnv being completely locked
 * down, and would let us know outright that the only effects which are possible
 * in the InEnv applicative are those which we provide in this file.
 */
export function run<X, Y, A>(f: InEnv<X, Y, A>, env: Env<X, Y>) : A {
  return f(env);
}

