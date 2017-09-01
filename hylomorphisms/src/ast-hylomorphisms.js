
// @flow

import { hylo } from "static-land-recursion-schemes/lib/schemes";

import type { ExprF, Expr } from "./expression-ast";
import {
  Plus, Times, Paren, Num, exprFunctor, prj
} from "./expression-ast";

const evalAlg  = expression => {
  const ex = prj(expression);
  return (
    ex instanceof Plus  ? ex.left + ex.right 
  : ex instanceof Times ? ex.left * ex.right 
  : ex instanceof Paren ? ex.contents
  : /* ex is a Num     */ ex.value);
};

const factorialCoalg =
  x => x instanceof Num ? x
  :    x === 1          ? new Num(1)
  :    /* otherwise    */ new Times(new Num(x), x - 1);

function factorial(x: number) : number {
  return hylo(exprFunctor, evalAlg, factorialCoalg, x);
}

console.log(factorial(4));

const fibonacciCoalg = x =>
  x <= 2 ? new Num(1) : new Plus(x - 1, x - 2);

function fibonacci(x: number) : number {
  return hylo(exprFunctor, evalAlg, fibonacciCoalg, x);
}

console.log([5, 6, 7, 8].map(fibonacci));

function recursiveFibonacci(x: number) : number {
  return x <= 2 ?
    1 :
    recursiveFibonacci(x - 1) + recursiveFibonacci(x - 2);
}

console.log(recursiveFibonacci(4));
