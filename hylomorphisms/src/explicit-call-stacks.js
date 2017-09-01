
// @flow

import { hylo } from "static-land-recursion-schemes/lib/schemes";

import { Node, Leaf, numberTreeFunctor, prj as numberTreePrj } from "./number-tree";

import { Cons, End, numberListFunctor, prj as numberListPrj } from "./number-list";

function fibonacci(n: number) : number {
  return hylo(
    numberTreeFunctor,
    tree => {
      const t = numberTreePrj(tree);
      return t instanceof Node ? t.left + t.right : t.contents;
    },
    n => n <= 2 ? new Leaf(1) : new Node(n - 1, n - 2),
    n);
}

console.log([1,2,3,4,5,6,7,8].map(fibonacci));

function recursiveFactorial(n: number) : number {
  return n === 1 ? n : n * recursiveFactorial(n - 1);
}

console.log([1,2,3,4,5].map(recursiveFactorial));

function factorial(n: number) : number {
  return hylo(
    numberListFunctor,
    tree => {
      const t = numberListPrj(tree);
      return t instanceof Cons ? t.contents * t.next : t.contents;
    },
    n => n === 1 ? new End(1) : new Cons(n, n - 1),
    n);
}

console.log([1,2,3,4,5].map(factorial));
