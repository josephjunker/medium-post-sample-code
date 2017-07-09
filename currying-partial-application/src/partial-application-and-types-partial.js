
function partial(fn, ...args) {
 return fn.bind(null, ...args);
}

const sumTwo = (x, y) => x + y,
      sumThree = (x, y, z) => x + y + z,
      sumMany = (...nums) => nums.reduce(sumTwo, 0);

const increment = partial(sumTwo, 1),
      five = increment(4);

const doubleIncrement = partial(sumThree, 1, 1),
      nine = doubleIncrement(7);

const returnTen = partial(sumTwo, 6, 4),
      ten = returnTen();

const plusTen = partial(sumMany, 1, 2, 3, 4),
      alsoTen = plusTen(),
      eleven = plusTen(1);

console.log(five);
console.log(nine);
console.log(ten);
console.log(alsoTen);
console.log(eleven);

