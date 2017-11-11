
// @flow

function power(exponent: number, base: number) : number {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result = result * base;
  }
  return result;
}

const square = x => power(2, x),
      cube = x => power(3, x);

console.log(square(2));
console.log(cube(3));

