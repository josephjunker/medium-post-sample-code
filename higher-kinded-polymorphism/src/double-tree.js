function doubleTree<A>(tree: BinaryTree<A>) : BinaryTree<[A, A]> {
  return tree instanceof BinaryTreeLeaf ?
    new BinaryTreeLeaf([tree.value, tree.value]) :
    new BinaryTreeNode(doubleTree(tree.left),
                       doubleTree(tree.right));
}
