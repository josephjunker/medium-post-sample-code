
// @flow

import type { Functor } from "flow-static-land/lib/Functor";
import type { HKT } from "flow-static-land/lib/HKT";
import type { Fix } from "static-land-recursion-schemes/lib/Fix";
import { In } from "static-land-recursion-schemes/lib/Fix";

export type NumberTreeI<A>
  = Node<A>
  | Leaf;

export class Node<A> {
  left: A;
  right: A;
  constructor(left: A, right: A) {
    this.left = left;
    this.right = right;
  }
}

export class Leaf {
  contents: number;
  constructor(contents: number) {
    this.contents = contents;
  }
}

export class IsNumberTree {};
export type NumberTreeF<A> = HKT<IsNumberTree, A>;

export function inj<A>(a: NumberTreeI<A>) : NumberTreeF<A> {
  return ((a: any): NumberTreeF<A>);
};

export function prj<A>(a: NumberTreeF<A>) : NumberTreeI<A> {
  return ((a: any): NumberTreeI<A>);
};

export function map<A, B>(fn: (A) => B, a: NumberTreeF<A>) : NumberTreeF<B> {
  const node = prj(a);

  return inj(node instanceof Node ?
    new Node(fn(node.left), fn(node.right)) :
    node);
};

if (false) {
  ({map} : Functor<IsNumberTree>)
}

export type NumberTree = Fix<IsNumberTree>;

export const numberTreeFunctor = { map };

