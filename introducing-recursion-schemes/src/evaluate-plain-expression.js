
// @flow

import type { Expr } from "./plain-expression-ast";
import { Plus, Times, Paren, Num, plus, times, paren, num } from "./plain-expression-ast";

export default function evalExpr (ex: Expr) : number {
  return (
    ex instanceof Plus  ? evalExpr(ex.left) + evalExpr(ex.right) 
  : ex instanceof Times ? evalExpr(ex.left) * evalExpr(ex.right) 
  : ex instanceof Paren ? evalExpr(ex.contents)
  : /* ex is a Num     */ ex.value);
}

const expr = times(num(2), paren(times(plus(num(1), num(1)), times(num(4), num(3)))))
console.log(evalExpr(expr));

