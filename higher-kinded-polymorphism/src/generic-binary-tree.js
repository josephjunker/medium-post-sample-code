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
