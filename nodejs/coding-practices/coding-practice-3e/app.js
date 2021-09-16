const express = require("express");
const app = express();

app.get("/", (request, response) => {
  const dateTime = new Date();
  response.send(
    `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
  );
});

// app.listen(3001);

module.exports = app;

// const format = require("date-fns/format");
// const express = require("express");
// const app = express();

// app.get("/", (request, response) => {
//   let date = new Date();
//   response.send(format(date, "dd-MM-yyyy"));
// });

// // app.listen(3000);

// module.exports = app;
