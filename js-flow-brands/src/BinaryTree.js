
// @flow

import {HKT} from "flow-static-land/lib/HKT";
import type {Functor} from "flow-static-land/lib/Functor";

class IsBinaryTree {}
export type BinaryTree<A> = HKT<IsBinaryTree, A>;

export class BinaryTreeNode<A> {
  left: BinaryTreeI<A>;
  right: BinaryTreeI<A>;
  constructor(left: BinaryTreeI<A>, right: BinaryTreeI<A>) {
    this.left = left;
    this.right = right;
  }
}
export class BinaryTreeLeaf<A> {
  value: A;
  constructor(value: A) {
    this.value = value;
  }
}
type BinaryTreeI<A> = BinaryTreeNode<A> | BinaryTreeLeaf<A>;

function mapBinaryTree<A, B>(fn: (a: A) => B, tree: BinaryTreeI<A>) : BinaryTreeI<B> {
  if (tree instanceof BinaryTreeNode) {
    return new BinaryTreeNode(
      mapBinaryTree(fn, tree.left),
      mapBinaryTree(fn, tree.right));
  }
return new BinaryTreeLeaf(fn(tree.value));
}

export function inj<A>(a: BinaryTreeI<A>): BinaryTree<A> {
  return ((a: any): BinaryTree<A>)
}
export function prj<A>(fa: BinaryTree<A>): BinaryTreeI<A> {
  return ((fa: any): BinaryTreeI<A>)
}

export function map<A, B>(f: (a: A) => B, fa: BinaryTree<A>): BinaryTree<B> {
  return inj(mapBinaryTree(f, prj(fa)));
}

if (false) {
  ({map} : Functor<IsBinaryTree>)
}

export default {
  map
};

