
// @flow

function tripleSum(a : number, b : number, c : number) : number {
  return a + b + c;
}

function tripleSumCurried(a : number) : number => number => number {
  return function (b : number) : number => number {
    return function (c : number) : number {
      return a + b + c;
    }
  }
}

console.log(tripleSum(1, 2, 3));
console.log(tripleSumCurried(1)(2)(3));

function curry2<A, B, R>(fn : (A, B) => R) : A => B => R {
  return function (a : A) : B => R {
    return function (b : B) : R {
      return fn(a, b);
    };
  };
}

function curry3<A, B, C, R>(fn : (A, B, C) => R) : A => B => C => R {
  return function (a : A) : B => C => R {
    return function (b : B) : C => R {
      return function (c : C) : R {
        return fn(a, b, c);
      };
    };
  };
}

const tripleSumCurried2 = curry3(tripleSum);
console.log(tripleSumCurried(1)(2)(3));

function curry(fn) {
  const collect = (argsSoFar, arg) => {
    const collectedArgs = argsSoFar.concat([arg]);
    
    return collectedArgs.length >= fn.length ?
      fn.apply(null, collectedArgs) :
      collect.bind(null, collectedArgs);
  };
  return collect.bind(null, []);
}

function uncurry2<A, B, R>(fn: A => B => R) :
  (A, B) => R {
    return function(a: A, b: B) : R {
      return fn(a)(b);
    }
  }

function uncurry3<A, B, C, R>(fn: A => B => C=> R) :
  (A, B, C) => R {
    return function(a: A, b: B, c: C) : R {
      return fn(a)(b)(c);
    }
  }

console.log(uncurry3(tripleSumCurried)(1, 2, 3));

function power(exponent: number, base: number) : number {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result = result * base;
  }
  return result;
}

console.log([1, 2, 3].map(x => power(2, x)));

const powerCurried = curry2(power);
console.log([1, 2, 3].map(powerCurried(2)));


function applyArray<A, B>(arr: Array<A>, fns: Array<A => B>) : Array<B> {
  const result = [];

  for (let i = 0; i < fns.length && i < arr.length; i++) {
    result.push(fns[i](arr[i]));
  }

  return result;
}

const numbers1 = [1, 2, 3],
      numbers2 = [4, 5, 6],
      numbers3 = [7, 8, 9];

const result = applyArray(numbers1,
                 applyArray(numbers2,
                            numbers3.map(curry(tripleSum))));

console.log(result);


