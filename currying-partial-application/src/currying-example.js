
// @flow

function excitedHello(name: string, 
                      isCustomer: boolean,
                      exclamationPoints: number) : string {
return `Hello, ${name}! ` +
       (isCustomer ?
         "Thank you for being our valued customer! " :
         "") +
         `Welcome to our store${"!".repeat(exclamationPoints)}`;
}

function excitedHelloCurried(name: string)
  : boolean => (number => string) {
  return function (isCustomer: boolean) : number => string {
    return function (exclamationPoints: number) : string {
      return `Hello, ${name}! ` +
             (isCustomer ?
               "Thank you for being our valued customer! " :
               "") +
              `Welcome to our store${"!".repeat(exclamationPoints)}`;
      }
    }
  }

const excitedHelloCurried2 = (name: string) => 
  (isCustomer: boolean) =>
    (exclamationPoints: number) => {
      return `Hello, ${name}! ` +
      (isCustomer ?
        "Thank you for being our valued customer! " :
        "") +
        `Welcome to our store${"!".repeat(exclamationPoints)}`;
    }


const greeting = excitedHello("Jack", true, 3);
const greeting2 = excitedHelloCurried("Jack")(true)(3);

const greeting3 = excitedHelloCurried2("Jack")(true)(3);

console.log(greeting);
console.log(greeting2);
console.log(greeting3);

