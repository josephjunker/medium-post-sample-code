
// @flow

import * as maybe from "./maybe";
import { Just } from "./maybe";
import type { Maybe } from "./maybe";

import * as inEnv from "./in-env";
import { Env, alias } from "./in-env";
import type { InEnv } from "./in-env";

import { Var, Let, Num, Plus, Times } from "./expr-with-write";
import type { Expr } from "./expr-with-write";

import { curry2 } from "./utils";

type InMaybeEnv<X, Y, A> = InEnv<X, Y, Maybe<A>>;

function map<X, Y, A, B>(fn: A => B, a: InMaybeEnv<X, Y, A>) : InMaybeEnv<X, Y, B> {
  return inEnv.map(x => maybe.map(fn, x), a);
}

function pure<X, Y, A>(a: A) : InMaybeEnv<X, Y, A> {
  return inEnv.pure(maybe.pure(a));
}

function ap<X, Y, A, B>(fn: InMaybeEnv<X, Y, A => B>, a: InMaybeEnv<X, Y, A>) : InMaybeEnv<X, Y, B> {
  return inEnv.liftA2(curry2(maybe.ap))(fn, a)
}

function liftA2<X, Y, A, B, R>(fn: A => B => R) :
  (InMaybeEnv<X, Y, A>, InMaybeEnv<X, Y, B>) => InMaybeEnv<X, Y, R> {

  return (a, b) => ap(map(fn, a), b);
}

function fetch<X, Y>(name: X) : InMaybeEnv<X, Y, Y> {
  // The `any` cast is necessary because `has` doesn't work as
  // a type refinement, and Flow thinks `get` can return `undefined`
  return env => env.contents.has(name) ?
    new Just((env.contents.get(name) : any)) :
    null;
}

// Everything below this point is the same as in expr2, but here it's referring to
// the `liftA2`, `fetch` and `alias` implementations of InMaybeEnv
const plus = liftA2(a => b => a + b),
      times = liftA2(a => b => a * b);

function evaluate(expr: Expr) : InMaybeEnv<string, number, number> {
  return expr instanceof Var  ? fetch(expr.name)
  :      expr instanceof Let  ? alias(expr.name, expr.value, evaluate(expr.scope))
  :      expr instanceof Num  ? pure(expr.value)
  :      expr instanceof Plus ? plus(evaluate(expr.left), evaluate(expr.right))
  :      /* we have a Times  */ times(evaluate(expr.left), evaluate(expr.right));
}

const env = new Env(new Map([
  ["foo", 2],
  ["bar", 3]
]));

const expr = new Plus(
  new Var("foo"),
  new Let(
    "bar", 5,
    new Times(
      new Num(4),
      new Var("bar"))));

console.log(inEnv.run(evaluate(expr), env));


const env2 = new Env(new Map());

const expr2 = new Plus(
  new Num(1),
  new Times(
    new Var("foo"),
    new Num(2)))

console.log(inEnv.run(evaluate(expr2), env2));




