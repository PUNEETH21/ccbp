const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite = require("sqlite3");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "todoApplication.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite.Database,
    });
    app.listen(3000, () => {
      console.log("Server is Running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// const createToDoTable = async () => {
//   console.log("sdf");
//   const createToDoQuery = `
//     CREATE TABLE todo (
//         id INTEGER PRIMARY KEY,
//         todo TEXT,
//         priority TEXT,
//         status TEXT
//     )
//     `;
//   await db.run(createToDoQuery);
// };

// createToDoTable();

// get status based api
app.get("/todos/", async (request, response) => {
  const { status, priority, search_q = "" } = request.query;
  let getTodoQuery = null;
  switch (true) {
    case status !== undefined && priority !== undefined:
      getTodoQuery = `
            SELECT * FROM todo
            WHERE status = '${status}' 
            AND priority = '${priority}'
          `;
      break;
    case status !== undefined:
      getTodoQuery = `
            SELECT * FROM todo
            WHERE status = '${status}' 
          `;
      break;
    case priority !== undefined:
      getTodoQuery = `
            SELECT * FROM todo
            WHERE priority = '${priority}'
          `;
      break;
    default:
      getTodoQuery = `
            SELECT * FROM todo
            WHERE todo LIKE '%${search_q}%'
          `;
  }

  const statusArray = await db.all(getTodoQuery);
  response.send(statusArray);
});

//get todo based api
app.get("/todos/:todoId", async (request, response) => {
  const { todoId } = request.params;
  const getTodoQuery = `
    SELECT * FROM todo
    WHERE id = '${todoId}'
    `;
  const todoObj = await db.get(getTodoQuery);
  response.send(todoObj);
});

//create todo api
app.post("/todos/", async (request, response) => {
  const { id, todo, priority, status } = request.body;
  const createTodoQuery = `
    INSERT INTO 
        todo (id, todo, priority, status)
    VALUES 
        ('${id}', "${todo}", "${priority}", "${status}")
    `;
  await db.run(createTodoQuery);
  response.send("Todo Successfully Added");
});

//update todo
app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const { todo, priority, status } = request.body;
  let updateQuery = null;
  let responseObj = "";
  switch (true) {
    case todo !== undefined:
      updateQuery = `
            UPDATE todo
            SET todo = "${todo}"
            WHERE id = "${todoId}"
            `;
      responseObj = "Todo Updated";
      break;
    case priority !== undefined:
      updateQuery = `
            UPDATE todo
            SET priority = "${priority}"
            WHERE id = "${todoId}"
            `;
      responseObj = "Priority Updated";
      break;
    case status !== undefined:
      updateQuery = `
            UPDATE todo
            SET status = "${status}"
            WHERE id = "${todoId}"
            `;
      responseObj = "Status Updated";
      break;
  }
  await db.run(updateQuery);
  response.send(responseObj);
});

// delete todo api
app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const deleteTodoQuery = `
    DELETE FROM todo
    WHERE id = "${todoId}"
    `;
  await db.run(deleteTodoQuery);
  response.send("Todo Deleted");
});

module.exports = app;
