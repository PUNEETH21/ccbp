const factorialOfNumber = require("../factorial/index");
const ratioOfTwoNumbers = require("../ratio/index");

const ratioAndFactorial = (num1, num2, num3) => ({
  ratio: ratioOfTwoNumbers(num1, num2),
  factorial: factorialOfNumber(num3),
});

console.log(ratioAndFactorial(2, 4, 44));

module.exports = ratioAndFactorial;
