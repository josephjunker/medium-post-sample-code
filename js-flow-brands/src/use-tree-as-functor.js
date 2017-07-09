
// @flow

import type {HKT} from "flow-static-land/lib/HKT";
import type {Functor} from "flow-static-land/lib/Functor";

import binaryTree, {BinaryTreeNode, BinaryTreeLeaf} from "./BinaryTree";

function doubleContents<F, A>(fa: HKT<F, A>, functor: Functor<F>) : HKT<F, [A, A]> {
  return functor.map(x => [x, x], fa);
}

const numberTree =
  new BinaryTreeNode(
    new BinaryTreeNode(
      new BinaryTreeLeaf(1),
      new BinaryTreeLeaf(2)),
    new BinaryTreeNode(
      new BinaryTreeLeaf(3),
      new BinaryTreeLeaf(4)
    ));

console.dir(doubleContents(numberTree, binaryTree), { depth: null })

