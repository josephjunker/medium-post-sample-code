
// @flow

function fibonacci(n : number) : number {
  if (n < 3) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log([1, 2, 3, 4, 5].map(fibonacci));

