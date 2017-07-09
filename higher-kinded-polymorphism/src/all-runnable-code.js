
// @flow

class BinaryTreeNode<A> {
  left: BinaryTree<A>;
  right: BinaryTree<A>;
  constructor(left: BinaryTree<A>, right: BinaryTree<A>) {
    this.left = left;
    this.right = right;
  }
}

class BinaryTreeLeaf<A> {
  value: A;
  constructor(value: A) {
    this.value = value;
  }
}

type BinaryTree<A> = BinaryTreeNode<A> | BinaryTreeLeaf<A>;

function doubleTree<A>(tree: BinaryTree<A>) : BinaryTree<[A, A]> {
  return tree instanceof BinaryTreeLeaf ?
    new BinaryTreeLeaf([tree.value, tree.value]) :
    new BinaryTreeNode(doubleTree(tree.left), doubleTree(tree.right));
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

console.log("number tree:");
console.dir(numberTree, { depth: null });
console.log("doubled number tree:");
console.dir(doubleTree(numberTree), { depth: null });
console.log("string tree:");
console.dir(doubleTree(new BinaryTreeLeaf("foo")), { depth: null });

function doubleArray<A>(array: Array<A>) : Array<[A, A]> {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push([array[i], array[i]]);
  }
  return newArray;
};

console.log(doubleArray([1,2,3,4]));

