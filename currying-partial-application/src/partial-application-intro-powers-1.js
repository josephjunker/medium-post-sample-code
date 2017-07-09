
// @flow

function square(x: number) : number {
 return x * x;
}
function cube(x: number) : number {
 return x * x * x;
}

const four = square(2),
      twentySeven = cube(3),
      cubes = [1, 2, 3, 4, 5].map(cube),
      toTheSixth = x => square(cube(x));

console.log(four);
console.log(twentySeven);
console.log(cubes);
console.log(toTheSixth(2));

