
// @flow

import { curry3 } from "./currying-typed-utilities";

function excitedHello(name: string, 
                      isCustomer: boolean,
                      exclamationPoints: number) : string {
return `Hello, ${name}! ` +
       (isCustomer ?
         "Thank you for being our valued customer! " :
         "") +
         `Welcome to our store${"!".repeat(exclamationPoints)}`;
}

const excitedHelloCurried = curry3(excitedHello),
      greeting = excitedHelloCurried("Jill")(false)(3);

console.log(greeting);

