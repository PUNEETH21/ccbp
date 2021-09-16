const addDays = require("date-fns/addDays");
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  let dateTime = addDays(new Date(), 100);
  response.send(
    `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`
  );
});

// app.listen(3001);

module.exports = app;
