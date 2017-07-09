const numberTree =
  new BinaryTreeNode(
    new BinaryTreeNode(
      new BinaryTreeLeaf(1),
      new BinaryTreeLeaf(2)),
    new BinaryTreeNode(
      new BinaryTreeLeaf(3),
      new BinaryTreeLeaf(4)));

console.log("number tree:");
console.dir(numberTree, { depth: null });
console.log("doubled number tree:");
console.dir(doubleTree(numberTree), { depth: null });
console.log("string tree:");
console.dir(doubleTree(new BinaryTreeLeaf("foo")), { depth: null });
