function doubleArray<A>(array: Array<A>) : Array<[A, A]> {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push([array[i], array[i]]);
  }
  return newArray;
};
