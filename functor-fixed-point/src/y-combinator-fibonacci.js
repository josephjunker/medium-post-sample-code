
// @flow

function fibonacciFactory(fib : number => number) : number => number {
  return (n : number) => {
    if (n < 3) return 1;
    return fib(n - 1) + fib(n - 2);
  }
}

function y<A, B>(fn: (A => B) => (A => B)) : A => B {
  function result (arg : A) : B {
    const completeFunction : A => B = fn(result);
    return completeFunction(arg);
  };
  return result;
}

const fibonacci = y(fibonacciFactory);

function testFib(fib : number => number) {
  console.log([1, 2, 3, 4, 5, 6, 7].map(fib));
}

testFib(fibonacci);

const fibonacci2 = fibonacciFactory(fibonacci);
testFib(fibonacci2);

const fibonacci3 = fibonacciFactory(fibonacciFactory(fibonacci));
testFib(fibonacci3);

