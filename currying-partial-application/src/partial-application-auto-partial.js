
const deliveryNotification = autoPartial(
  (name, job, quantity, item) =>
     `Hi, I’m ${name} the ${job}. ` +
     `I’ve brought you ${quantity} ${item}`);

const mail = deliveryNotification("Frank", 
                                  "postal worker",
                                  5,
                                  "letters");

const instructor = deliveryNotification("Janet", "professor"),
      homework = instructor(1, "homework assignment"),
      test = instructor(1, "test"),
      moreHomework = instructor(3, "homework assignments");

const beethoven = deliveryNotification("beethoven"),
      music = beethoven("composer", 5, "great classical works");

const bigDog = beethoven("dog", 5),
      tennisBalls = bigDog("tennisBalls"),
      sticks = bigDog("sticks");


function autoPartial(fn) {
  const collect = (boundArgs, ...args) => {
    const collectedArgs = boundArgs.concat(args);
    return collectedArgs.length >= fn.length ?
      fn.apply(null, collectedArgs) :
      collect.bind(null, collectedArgs);
    };
  return collect.bind(null, []);
}


console.log(mail);
console.log(homework);
console.log(test);
console.log(moreHomework);
console.log(music);
console.log(tennisBalls);
console.log(sticks);

