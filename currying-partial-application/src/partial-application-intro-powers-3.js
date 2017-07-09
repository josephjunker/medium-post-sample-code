
function power(exponent, base) {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result = result * base;
  }
  return result;
}

const square = partial(power, 2);
const cube = partial(power, 3);

function partial(fn, ...args) {
 return fn.bind(null, ...args);
}

const four = square(2),
      twentySeven = cube(3),
      cubes = [1, 2, 3, 4, 5].map(cube),
      toTheSixth = x => square(cube(x));

console.log(four);
console.log(twentySeven);
console.log(cubes);
console.log(toTheSixth(2));

