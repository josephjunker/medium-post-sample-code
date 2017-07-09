
import partialFactory from "./partial-application-hole-partial-factory";

function deliveryNotification(name, job, quantity, item) {
   return `Hi, I’m ${name} the ${job}. ` +
          `I’ve brought you ${quantity} ${item}`;
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

