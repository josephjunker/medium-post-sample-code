
// @flow

import { cata } from "static-land-recursion-schemes/lib/schemes";
import { In, out } from "static-land-recursion-schemes/lib/Fix";

import type { ExprF, Expr } from "./functorized-expression-ast";
import {
  Plus, Times, Paren, Num,
  exprFunctor, prj, times,
  paren, num, plus
} from "./functorized-expression-ast";

import type { BoolExprF, BoolExpr } from "./boolean-expression-ast";
import {
  Or, And, Bool,
  boolExprFunctor, or, and, bool
} from "./boolean-expression-ast";

import * as boolExpr from "./boolean-expression-ast";

import type { Functor } from "flow-static-land/lib/Functor";
import type { HKT } from "flow-static-land/lib/HKT";
import type { Fix } from "static-land-recursion-schemes/lib/Fix";

function _evalExpr (expression: ExprF<number>) : number {
  const ex = prj(expression);
  return (
    ex instanceof Plus  ? ex.left + ex.right 
  : ex instanceof Times ? ex.left * ex.right 
  : ex instanceof Paren ? ex.contents
  : /* ex is a Num     */ ex.value);
}

const evalExpr : Expr => number = ex => cata(exprFunctor, _evalExpr, ex);

const flatten = ex => cata(exprFunctor,
  function (expression: ExprF<Expr>) : Expr {
    const ex = prj(expression);
    return ex instanceof Paren ? ex.contents : new In(expression);
  }, ex);

function prettyPrint(ex: Expr) : string {
  return cata(exprFunctor,
    function (expression: ExprF<string>) : string {
      const ex = prj(expression);
      return (
        ex instanceof Plus  ? `${ex.left} + ${ex.right}`
      : ex instanceof Times ? `${ex.left} * ${ex.right}`
      : ex instanceof Paren ? `(${ex.contents})`
      : /* ex is a Num     */ String(ex.value));
    }, ex);
}

const addNecessaryParens = ex => cata(exprFunctor,
  function (expression: ExprF<Expr>) : Expr {
    const ex = prj(expression);
    if (!(ex instanceof Times)) return new In(expression);

    const left = prj(out(ex.left)),
          right = prj(out(ex.right));

    return new In(new Times(
      left instanceof Plus ? paren(ex.left) : ex.left,
      right instanceof Plus ? paren(ex.right) : ex.right
    ));
  }, ex);

const expr = times(num(2),
                   paren(times(plus(num(1), plus(num(1), num(1))),
                         times(num(4), num(3)))))

console.log("original");
console.log(prettyPrint(expr));

console.log("flattened");
console.log(prettyPrint(flatten(expr)));

console.log("new");
console.log(prettyPrint(addNecessaryParens(flatten(expr))));

function exprToBoolean(expr: Expr) : BoolExpr {
  return cata(exprFunctor,
    function(expression: ExprF<BoolExpr>) : BoolExpr {
      const ex = prj(expression);

      return (
        ex instanceof Plus  ? or(ex.left, ex.right)
      : ex instanceof Times ? and(ex.left, ex.right)
      : ex instanceof Paren ? boolExpr.paren(ex.contents)
      : /* ex is a Num     */ bool(ex.value !== 0));
    }, expr);
}

const boolPrettyPrint = ex => cata(boolExprFunctor,
  function (expression: BoolExprF<string>) : string {
    const ex = boolExpr.prj(expression);
    return (
      ex instanceof Or    ? `${ex.left} OR ${ex.right}`
    : ex instanceof And   ? `${ex.left} AND ${ex.right}`
    : ex instanceof Paren ? `(${ex.contents})`
    : /* ex is a Bool    */ String(ex.value));
  }, ex);


const toBooleanExpr = plus(num(0),
                           paren(times(num(1),
                                       paren(plus(num(0),
                                                  num(1))))));
console.log("to convert to boolean:");
console.log(prettyPrint(toBooleanExpr));

console.log("converted:");
console.log(boolPrettyPrint(exprToBoolean(toBooleanExpr)));


