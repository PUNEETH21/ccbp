const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite = require("sqlite3");

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "cricketMatchDetails.db");

let db;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const convertPlayerObjToResponse = (playerObj) => ({
  playerId: playerObj.player_id,
  playerName: playerObj.player_name,
});

const convertMatchObjToResponse = (matchObj) => ({
  matchId: matchObj.match_id,
  match: matchObj.match,
  year: matchObj.year,
});

// get all players api
app.get("/players/", async (request, response) => {
  const allPlayersQuery = `
    SELECT * FROM player_details
    `;
  const allPlayersArray = await db.all(allPlayersQuery);
  response.send(
    allPlayersArray.map((playerObj) => convertPlayerObjToResponse(playerObj))
  );
});

// get player details api
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT * FROM player_details
    WHERE player_id = '${playerId}'
    `;
  const playerObj = await db.get(getPlayerQuery);
  response.send(convertPlayerObjToResponse(playerObj));
});

// update player details api
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName } = request.body;
  const updatePlayerQuery = `
      UPDATE player_details
      SET player_name = "${playerName}"
      WHERE player_id = "${playerId}"
      `;
  await db.run(updatePlayerQuery);
  response.send("Player Details Updated");
});

//get match details api
app.get("/matches/:matchId", async (request, response) => {
  const { matchId } = request.params;
  const getMatchQuery = `
    SELECT * FROM match_details
    WHERE match_id = "${matchId}"
    `;
  const matchObj = await db.get(getMatchQuery);
  response.send(convertMatchObjToResponse(matchObj));
});

// player matches api
app.get("/players/:playerId/matches/", async (request, response) => {
  const { playerId } = request.params;
  const playerMatchesQuery = `
    SELECT match_details.match_id,
        match_details.match,
        match_details.year
    FROM player_match_score
    LEFT JOIN match_details ON match_details.match_id = player_match_score.match_id
    WHERE player_id = "${playerId}"
    `;
  const playerMatchesArray = await db.all(playerMatchesQuery);
  response.send(
    playerMatchesArray.map((playerObj) => convertMatchObjToResponse(playerObj))
  );
});

//match players api
app.get("/matches/:matchId/players", async (request, response) => {
  const { matchId } = request.params;
  const matchPlayersQuery = `
    SELECT player_details.player_id, player_details.player_name
    FROM player_match_score
    LEFT JOIN player_details ON player_details.player_id = player_match_score.player_id
    WHERE match_id = "${matchId}"
    `;
  const matchPlayersArray = await db.all(matchPlayersQuery);
  response.send(
    matchPlayersArray.map((matchPlayer) =>
      convertPlayerObjToResponse(matchPlayer)
    )
  );
});

const convertPlayerStatisticsDBObjToResponse = (playerStatisticsDBObj) => ({
  playerId: playerStatisticsDBObj.player_id,
  playerName: playerStatisticsDBObj.player_name,
  totalScore: playerStatisticsDBObj.total_score,
  totalFours: playerStatisticsDBObj.total_fours,
  totalSixes: playerStatisticsDBObj.total_sixes,
});

//player statistics api
app.get("/players/:playerId/playerScores", async (request, response) => {
  const { playerId } = request.params;
  const playerStatisticsQuery = `
    SELECT player_details.player_id,
        player_details.player_name,
        SUM(score) AS total_score,
        SUM(fours) AS total_fours,
        SUM(sixes) AS total_sixes
    FROM player_details
    LEFT JOIN player_match_score ON player_match_score.player_id = player_details.player_id
    WHERE player_details.player_id = "${playerId}"
    `;
  const playerStatisticsDBObj = await db.get(playerStatisticsQuery);
  response.send(convertPlayerStatisticsDBObjToResponse(playerStatisticsDBObj));
});

module.exports = app;
