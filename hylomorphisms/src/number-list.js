
// @flow

import type { Functor } from "flow-static-land/lib/Functor";
import type { HKT } from "flow-static-land/lib/HKT";
import type { Fix } from "static-land-recursion-schemes/lib/Fix";
import { In } from "static-land-recursion-schemes/lib/Fix";

export type NumberListI<A>
  = Cons<A>
  | End;

export class Cons<A> {
  contents: number;
  next: A;
  constructor(contents: number, next: A) {
    this.contents = contents;
    this.next = next;
  }
}

export class End {
  contents: number;
  constructor(contents: number) {
    this.contents = contents;
  }
}

export class IsNumberList {};
export type NumberListF<A> = HKT<IsNumberList, A>;

export function inj<A>(a: NumberListI<A>) : NumberListF<A> {
  return ((a: any): NumberListF<A>);
};

export function prj<A>(a: NumberListF<A>) : NumberListI<A> {
  return ((a: any): NumberListI<A>);
};

export function map<A, B>(fn: (A) => B, a: NumberListF<A>) : NumberListF<B> {
  const node = prj(a);

  return inj(node instanceof Cons ?
    new Cons(node.contents, fn(node.next)) :
    node);
};

if (false) {
  ({map} : Functor<IsNumberList>)
}

export type NumberTree = Fix<IsNumberList>;

export const numberListFunctor = { map };

