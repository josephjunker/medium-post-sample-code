
// @flow

import { cata } from "static-land-recursion-schemes/lib/schemes";
import { In, out } from "static-land-recursion-schemes/lib/Fix";

import type { ExprF, Expr } from "./expression-ast";
import {
  Plus, Times, Paren, Num,
  exprFunctor, times, prj,
  paren, num, plus
} from "./expression-ast";

export function prettyPrintExpr(ex: Expr) : string {
  return cata(exprFunctor,
    function (expression: ExprF<string>) : string {
      const ex = prj(expression);
      return (
        ex instanceof Plus  ? `${ex.left} + ${ex.right}`
      : ex instanceof Times ? `${ex.left} * ${ex.right}`
      : ex instanceof Paren ? `(${ex.contents})`
      : /* ex is a Num     */ String(ex.value));
    }, ex);
};

