
// @flow

import { ana, cata } from "static-land-recursion-schemes/lib/schemes";
import { In, out } from "static-land-recursion-schemes/lib/Fix";

import type { ExprF, Expr } from "./expression-ast";
import {
  Plus, Times, Paren, Num, exprFunctor, inj, prj, plus, times, num, paren
} from "./expression-ast";

import type { NumberTreeF, NumberTree } from "./number-tree";
import { Node, Leaf, numberTreeFunctor } from "./number-tree";
import * as numberTree from "./number-tree";

import { prettyPrintExpr } from "./pretty-print";

type IntermediateFactorial = {
  type: 'recursive',
  value: number
} | {
  type: 'terminal',
  value: number
};

function factorial(base: number) : Expr {
  return ana(exprFunctor, function(a: IntermediateFactorial) : ExprF<IntermediateFactorial> {
    return a.type === 'terminal' ? new Num(a.value)
    :      a.value === 1         ? new Num(1)
    :      /* recursive case    */ new Times({
                                           type: 'terminal',
                                           value: a.value
                                         }, {
                                           type: 'recursive',
                                           value: a.value - 1
                                         });
  }, { type: 'recursive', value: base });
}

console.log("factorial(5)");
console.log(prettyPrintExpr(factorial(5)));
console.log();

function cleanFactorial(base: number) : Expr {
  return ana(exprFunctor,
    a => a instanceof Num ? a
    :    a === 1          ? new Num(1)
    :    /* otherwise    */ new Times(new Num(a), a - 1),
   base);
}

console.log("cleanFactorial(5)");
console.log(prettyPrintExpr(cleanFactorial(5)));
console.log();

function reverse(expr: Expr) : Expr {
  return ana(exprFunctor, function(a: Expr) : ExprF<Expr> {

    const expr = prj(out(a));

    return inj(
      expr instanceof Num   ? expr
    : expr instanceof Plus  ? new Plus(expr.right, expr.left)
    : expr instanceof Times ? new Times(expr.right, expr.left)
    : /* expr is a Paren   */ expr);
  }, expr);
}

console.log("reverse(factorial(5))");
console.log(prettyPrintExpr(reverse(factorial(5))));
console.log();

function cataReverse(expr: Expr) : Expr {
  return cata(exprFunctor, function(a: ExprF<Expr>) : Expr {
    const expr = prj(a);

    return (
      expr instanceof Num   ? num(expr.value)
    : expr instanceof Plus  ? plus(expr.right, expr.left)
    : expr instanceof Times ? times(expr.right, expr.left)
    : /* expr is a Paren   */ paren(expr.contents));
  }, expr);
}


console.log("cataReverse(factorial(5))");
console.log(prettyPrintExpr(cataReverse(factorial(5))));
console.log();

function treeifyArray(arr: Array<number>) : NumberTree {
  if (arr.length === 0) throw new Error("argument error");

  return ana(numberTreeFunctor, arr => {

    if (arr.length === 1) return new Leaf(arr[0]);

    const splitIndex = Math.floor(arr.length / 2),
          firstHalf = arr.slice(0, splitIndex),
          secondHalf = arr.slice(splitIndex);

    return new Node(firstHalf, secondHalf);
  }, arr);
}

function prettyPrintTree(tree: NumberTree) : string {
  return cata(numberTreeFunctor, tree => {
    const t = numberTree.prj(tree);
    return t instanceof Leaf ?
      String(t.contents) :
      `(${t.left} ${t.right})`;
    }, tree);
}

console.log("treeifyArray([1, 2, 3, 4, 5])");
console.log(prettyPrintTree(treeifyArray([1, 2, 3, 4, 5])));
console.log();

