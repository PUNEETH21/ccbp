const namesList = require("../country/state/city/index");
const getFirstNames = require("../utilities/utils/index");

const getPeopleInCity = (namesList) => getFirstNames(namesList);
console.log(getPeopleInCity(namesList));

module.exports = getPeopleInCity;
