
// @flow

import type { Functor } from "flow-static-land/lib/Functor";
import type { HKT } from "flow-static-land/lib/HKT";
import type { Fix } from "static-land-recursion-schemes/lib/Fix";
import { In } from "static-land-recursion-schemes/lib/Fix";

export type NumberListTreeI<A>
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
  contents: Array<number>;
  constructor(contents: Array<number>) {
    this.contents = contents;
  }
}

export class IsNumberListTree {};
export type NumberListTreeF<A> = HKT<IsNumberListTree, A>;

export function inj<A>(a: NumberListTreeI<A>) : NumberListTreeF<A> {
  return ((a: any): NumberListTreeF<A>);
};

export function prj<A>(a: NumberListTreeF<A>) : NumberListTreeI<A> {
  return ((a: any): NumberListTreeI<A>);
};

export function map<A, B>(fn: (A) => B, a: NumberListTreeF<A>) : NumberListTreeF<B> {
  const node = prj(a);

  return inj(node instanceof Node ?
    new Node(fn(node.left), fn(node.right)) :
    node);
};

if (false) {
  ({map} : Functor<IsNumberListTree>)
}

export type NumberTree = Fix<IsNumberListTree>;

export const numberTreeFunctor = { map };

