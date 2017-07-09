
// @flow

function partial1_2<A, B, R>(
  fn: (A, B) => R,
  a : A) : B => R {
  return function (b : B) : R {
    return fn(a, b);
  };
}
function partial2_2<A, B, R>(
  fn: (A, B) => R,
  a : A,
  b : B) : () => R {
  return function () : R {
    return fn(a, b);
  };
}

function sumTwo(x: number, y: number) : number {
  return x + y;
}

const increment = partial1_2(sumTwo, 1),
      alwaysThree = partial2_2(sumTwo, 1, 2);

console.log(increment(5));
console.log(alwaysThree());

