
// @flow

function betterPower(base: number, exponent: number) : number {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
   result = result * base;
  }
  return result;
}

function flip<A, B, R>(fn: (A, B) => R) : (B, A) => R {
  return (b, a) => fn(a, b);
}

const toTheFourth = flip(betterPower).bind(null, 4);


console.log(toTheFourth(2));
console.log(toTheFourth(3));

