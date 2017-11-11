
function autoPartial(fn) {
  const collect = (boundArgs, ...args) => {
  const collectedArgs = boundArgs.concat(args);
    return collectedArgs.length >= fn.length ?
      fn.apply(null, collectedArgs) :
      collect.bind(null, collectedArgs);
    };
  return collect.bind(null, []);
}

const deliveryNotification = autoPartial(
  (name, job, quantity, item) =>
     `Hi, I’m ${name} the ${job}. ` +
     `I’ve brought you ${quantity} ${item}`);
const mail = deliveryNotification("Frank", 
                                  "postal worker",
                                  5,
                                  "letters");
console.log(mail);

const susansDelivery = deliveryNotification("Susan", 
                                            "postal worker");

const moreMail = susansDelivery(2, "packages");
console.log(moreMail);

const threeThingsFromSusan = susansDelivery(3);

const bills = threeThingsFromSusan("bills");
console.log(bills);


function partialFactory() {
  const hole = {};

  function mergeArgs(unmerged, merged, args) {
    return (
      !unmerged.length && !args.length ? merged
    : !args.length                     ? mergeArgs(unmerged.slice(1), merged.concat([unmerged[0]]), args)
    : !unmerged.length                 ? mergeArgs(unmerged, merged.concat([args[0]]), args.slice(1))
    : unmerged[0] === hole             ? mergeArgs(unmerged.slice(1), merged.concat([args[0]]), args.slice(1))
    : /* unmerged is not a hole       */ mergeArgs(unmerged.slice(1), merged.concat([unmerged[0]]), args));
  }

  return {
    _: hole,
    holePartial: (fn, ...args) => {
      const initialArgs = args;

      return (...args) => {
        const mergedArgs = mergeArgs(initialArgs, [], args);
        return fn.apply(null, mergedArgs);
      };
    }
  };
}

const {_, holePartial} = partialFactory();
const mailDelivery = holePartial(deliveryNotification, 
                                 _,
                                 "postal worker",
                                 _,
                                 "letters");
const mondaysMail = mailDelivery("Frank", 3),
      tuesdaysMail = mailDelivery("Susan", 7);

console.log(mondaysMail);
console.log(tuesdaysMail);


function power(exponent: number, base: number) : number {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result = result * base;
  }
  return result;
}

const square = holePartial(power, _, 2),
      cube = holePartial(power, _, 3);

console.log([1, 2, 3].map(square));
console.log([1, 2, 3].map(cube));

