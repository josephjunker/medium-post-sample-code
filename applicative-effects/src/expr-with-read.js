
// @flow

import type { InEnv } from "./in-env";
import { Env, pure, liftA2, fetch, run } from "./in-env";

type Expr
  = Var
  | Num
  | Plus
  | Times
  ;

class Var {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Num {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

class Plus {
  left: Expr;
  right: Expr;
  constructor(left: Expr, right: Expr) {
    this.left = left;
    this.right = right;
  }
}

class Times {
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
  new Times(
    new Num(4),
    new Var("bar")));

console.log(run(evaluate(expr), env));

