const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

let db = null;
const dbPath = path.join(__dirname, "goodreads.db");
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Db error: ${e.message}`);
    process.exit(1);
  }
};

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT * FROM book
    ORDER BY book_id
    `;
  const bookArray = await db.all(getBooksQuery);
  response.send(bookArray);
});

initializeDbAndServer();
