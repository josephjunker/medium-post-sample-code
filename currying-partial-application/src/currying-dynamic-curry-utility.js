
function curry(fn) {
  const collect = (argsSoFar, arg) => {
    const collectedArgs = argsSoFar.concat([arg]);
    
    return collectedArgs.length >= fn.length ?
      fn.apply(null, collectedArgs) :
      collect.bind(null, collectedArgs);
  };
  return collect.bind(null, []);
}



function excitedHello(name: string, 
                      isCustomer: boolean,
                      exclamationPoints: number) : string {
return `Hello, ${name}! ` +
       (isCustomer ?
         "Thank you for being our valued customer! " :
         "") +
         `Welcome to our store${"!".repeat(exclamationPoints)}`;
}

const excitedHelloCurried = curry(excitedHello),
      greeting = excitedHelloCurried("Jill")(false)(3);

console.log(greeting);


