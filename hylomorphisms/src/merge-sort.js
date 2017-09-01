
// @flow

import { hylo } from "static-land-recursion-schemes/lib/schemes";
import { Node, Leaf, numberTreeFunctor, prj } from "./number-list-tree";
import { In, out } from "static-land-recursion-schemes/lib/Fix";

const merge = mergeArrays.bind(null, (x, y) => x < y);

const mergeSort = list => hylo(numberTreeFunctor, 
  tree => {
    const t = prj(tree);
    return t instanceof Leaf ? t.contents : merge(t.left, t.right);
  },
  list => list.length < 2 ? new Leaf(list) : new Node(list.slice(0, list.length / 2), list.slice(list.length / 2)),
  list);

function mergeArrays<A>(useLeft: (A, A) => boolean,
                        arr1: Array<A>,
                        arr2: Array<A>) : Array<A> {
  const recursive = (arr1, arr2, merged) =>
    arr1.length === 0 ? merged.concat(arr2)
  : arr2.length === 0 ? merged.concat(arr1)
  : useLeft(arr1[0], arr2[0]) ?
      recursive(arr1.slice(1), arr2, merged.concat([arr1[0]]))
  : /* otherwise */ 
      recursive(arr1, arr2.slice(1), merged.concat([arr2[0]]));

  return recursive(arr1, arr2, []);
}

console.log(mergeSort([231, 52, 132, 65, 561, 634, 12, 54, 2]));

