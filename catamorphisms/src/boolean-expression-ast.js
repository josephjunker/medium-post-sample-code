
// @flow

import type { Functor } from "flow-static-land/lib/Functor";
import type { HKT } from "flow-static-land/lib/HKT";
import type { Fix } from "static-land-recursion-schemes/lib/Fix";
import { In } from "static-land-recursion-schemes/lib/Fix";

import { Paren } from "./functorized-expression-ast";

export type BoolExprI<A>
  = Or<A>
  | And<A>
  | Paren<A>
  | Bool;

export class Or<A> {
  left: A;
  right: A;
  constructor(left: A, right: A) {
    this.left = left;
    this.right = right;
  }
};

export class And<A> {
  left: A;
  right: A;
  constructor(left: A, right: A) {
    this.left = left;
    this.right = right;
  }
};

export class Bool {
  value: boolean;
  constructor(value: boolean) {
    this.value = value;
  }
};

export class IsBoolExpr {};
export type BoolExprF<A> = HKT<IsBoolExpr, A>;

export function inj<A>(a: BoolExprI<A>) : BoolExprF<A> {
  return ((a: any): BoolExprF<A>);
};

export function prj<A>(a: BoolExprF<A>) : BoolExprI<A> {
  return ((a: any): BoolExprI<A>);
};

export function map<A, B>(fn: (A) => B, a: BoolExprF<A>) : BoolExprF<B> {
  
  const node = prj(a);

  const mapped = (
    node instanceof Or    ? new Or(fn(node.left), fn(node.right))
  : node instanceof And   ? new And(fn(node.left), fn(node.right))
  : node instanceof Paren ? new Paren(fn(node.contents)) 
  : /*      Bool         */ node);
  
  return inj(mapped);
};

if (false) {
  ({map} : Functor<IsBoolExpr>)
}

export type BoolExpr = Fix<IsBoolExpr>;

export const boolExprFunctor = { map };

export function or(left: BoolExpr, right: BoolExpr) : BoolExpr {
  return new In(new Or(left, right));
}

export function and(left: BoolExpr, right: BoolExpr) : BoolExpr {
  return new In(new And(left, right));
}

export function paren(contents: BoolExpr) : BoolExpr {
  return new In(new Paren(contents));
}

export function bool(value: boolean) : BoolExpr {
  return new In(new Bool(value));
}

