
// @flow

function power(exponent: number, base: number) : number {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result = result * base;
  }
  return result;
}

const four = power(2, 2),
      twentySeven = power(3, 3),
      cubes = [1, 2, 3, 4, 5].map(x => power(3, x)),
      toTheSixth = x => power(2, power(3, x));

console.log(four);
console.log(twentySeven);
console.log(cubes);
console.log(toTheSixth(2));

