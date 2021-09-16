const addDays = require("date-fns/addDays");

const addNoOfDays = (days) => {
  let dateTime = addDays(new Date(2020, 7, 22), days);
  return `${dateTime.getDate()}-${
    dateTime.getMonth() + 1
  }-${dateTime.getFullYear()}`;
};

const result = addNoOfDays(4);
console.log(result);

module.exports = addNoOfDays;
