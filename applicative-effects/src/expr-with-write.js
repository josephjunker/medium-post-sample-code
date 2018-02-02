
// @flow

import type { InEnv } from "./in-env";
import { Env, pure, liftA2, fetch, alias, run } from "./in-env";

export type Expr
  = Var
  | Let
  | Num
  | Plus
  | Times
  ;

export class Var {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class Let {
  name: string;
  value: number;
  scope: Expr;
  constructor(name: string, value: number, scope: Expr) {
    this.name = name;
    this.value = value;
    this.scope = scope;
  }
}

export class Num {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export class Plus {
  left: Expr;
  right: Expr;
  constructor(left: Expr, right: Expr) {
    this.left = left;
    this.right = right;
  }
}

export class Times {
  left: Expr;
  right: Expr;
  constructor(left: Expr, right: Expr) {
    this.left = left;
    this.right = right;
  }
}

const plus = liftA2(a => b => a + b),
      times = liftA2(a => b => a * b);

function evaluate(expr: Expr) : InEnv<string, number, number> {
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
    new Plus(
      new Num(1),
      new Times(
        new Num(4),
        new Var("bar")))));

console.log(run(evaluate(expr), env));

