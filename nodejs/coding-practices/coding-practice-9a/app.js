const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "userData.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB Error : ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// app.post("/register", async (request, response) => {
//   const { username, name, password, gender, location } = request.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const selectUserQuery = `SELECT * FROM user WHERE username = '${username}';`;
//   const databaseUser = await db.get(selectUserQuery);

//   if (databaseUser === undefined) {
//     const createUserQuery = `
//      INSERT INTO
//       user (username, name, password, gender, location)
//      VALUES
//       (
//        '${username}',
//        '${name}',
//        '${hashedPassword}',
//        '${gender}',
//        '${location}'
//       );`;
//     if (password.length > 5) {
//       await db.run(createUserQuery);
//       response.send("User created successfully");
//     } else {
//       response.status(400);
//       response.send("Password is too short");
//     }
//   } else {
//     response.status(400);
//     response.send("User already exists");
//   }
// });

//create user api
app.post("/register", async (request, response) => {
  const { username, name, password, gender, location } = request.body;
  const userExistQuery = `
  SELECT * FROM user
  WHERE username = "${username}"
  `;
  const userDB = await db.get(userExistQuery);
  if (userDB === undefined) {
    const isShortPassword = password.length <= 5;
    if (isShortPassword === true) {
      response.status(400);
      response.send("Password is too short");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUserQuery = `
        INSERT INTO
            user (username, name, password, gender, location )
        VALUES
            ("${username}", "${name}", "${hashedPassword}", "${gender}","${location}" )
        `;
      await db.run(createUserQuery);
      response.send("User created successfully");
    }
  } else {
    response.status(400);
    response.send("User already exists");
  }
});

//user login api
app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const userExistQuery = `
  SELECT * FROM user
  WHERE username = "${username}"
  `;
  const userDB = await db.get(userExistQuery);
  if (userDB === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isCorrectPassword = await bcrypt.compare(password, userDB.password);
    if (isCorrectPassword === true) {
      response.send("Login success!");
    } else {
      response.status(400);
      response.send("Invalid password");
    }
  }
});

//change user password api
app.put("/change-password/", async (request, response) => {
  const { username, oldPassword, newPassword } = request.body;
  const userExistQuery = `
  SELECT * FROM user
  WHERE username = "${username}"
  `;
  const userDB = await db.get(userExistQuery);
  const isCorrectPassword = await bcrypt.compare(oldPassword, userDB.password);
  if (isCorrectPassword === true) {
    const isShortPassword = newPassword.length < 5;
    if (isShortPassword === true) {
      response.status(400);
      response.send("Password is too short");
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updateUserPasswordQuery = `
        UPDATE user 
        SET password = "${hashedPassword}"
        WHERE username = "${username}"
        `;
      await db.run(updateUserPasswordQuery);
      response.send("Password updated");
    }
  } else {
    response.status(400);
    response.send("Invalid current password");
  }
});

module.exports = app;
