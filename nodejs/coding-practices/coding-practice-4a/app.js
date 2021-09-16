const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "cricketTeam.db");
const app = express();
app.use(express.json());
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
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const convertDBObjToResponseObj = (DBObject) => ({
  playerId: DBObject.player_id,
  playerName: DBObject.player_name,
  jerseyNumber: DBObject.jersey_number,
  role: DBObject.role,
});

//Get Players API
app.get("/players/", async (request, response) => {
  const query1 = `
    SELECT * FROM cricket_team
    `;
  const playersArray = await db.all(query1);
  response.send(
    playersArray.map((eachPlayer) => convertDBObjToResponseObj(eachPlayer))
  );
});

//Add player API
app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const query2 = `
        INSERT INTO 
            cricket_team (player_name,jersey_number, role)
        VALUES
            ("${playerName}", "${jerseyNumber}", "${role}");
    `;
  await db.run(query2);
  response.send("Player Added to Team");
});

//Get Player API
app.get("/players/:playerId", async (request, response) => {
  const { playerId } = request.params;
  const query3 = `
    SELECT * FROM cricket_team 
    WHERE player_id = ${playerId}
    `;
  const playerData = await db.get(query3);
  response.send(convertDBObjToResponseObj(playerData));
});

//Update Player Details API
app.put("/players/:playerId", async (request, response) => {
  const { playerId } = request.params;
  const { playerName, jerseyNumber, role } = request.body;
  const query4 = `
  UPDATE 
    cricket_team
  SET
    player_name='${playerName}',
    jersey_number='${jerseyNumber}',
    role='${role}'
  WHERE 
    player_id = ${playerId}
  `;
  await db.run(query4);
  response.send("Player Details Updated");
});

//Delete Player Details API
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const query = `
    DELETE FROM cricket_team
    WHERE player_id = ${playerId};
    `;
  await db.run(query);
  response.send("Player Removed");
});

module.exports = app;
