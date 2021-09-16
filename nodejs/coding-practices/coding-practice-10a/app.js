const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const { open } = require("sqlite");
const sqlite = require("sqlite3");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "covid19IndiaPortal.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
  }
};

initializeDBAndServer();

//user login api
app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const userExistQuery = `
    SELECT * FROM user 
    WHERE username = '${username}'
    `;
  const dbUser = await db.get(userExistQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isCorrectPassword = await bcrypt.compare(password, dbUser.password);
    if (isCorrectPassword === true) {
      const payload = { username: username };
      const jwtToken = jwt.sign(payload, "SECRET_TOKEN");
      response.send({ jwtToken });
    } else {
      response.status(400);
      response.send("Invalid password");
    }
  }
});

const convertDBStateObjToResponse = (stateObj) => ({
  stateId: stateObj.state_id,
  stateName: stateObj.state_name,
  population: stateObj.population,
});

const authenticateToken = async (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (authHeader === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};

const convertStateDBResponseToHTTPResponse = (stateDBObj) => ({
  stateId: stateDBObj.state_id,
  stateName: stateDBObj.state_name,
  population: stateDBObj.population,
});

const convertDistrictDBObjToHTTPResponse = (districtDBObj) => ({
  districtId: districtDBObj.district_id,
  districtName: districtDBObj.district_name,
  stateId: districtDBObj.state_id,
  cases: districtDBObj.cases,
  cured: districtDBObj.cured,
  active: districtDBObj.active,
  deaths: districtDBObj.deaths,
});

const convertStateStatisticsDBObjToHTTPResponse = (stateStatisticsDBObj) => ({
  totalCases: stateStatisticsDBObj.total_cases,
  totalCured: stateStatisticsDBObj.total_cured,
  totalActive: stateStatisticsDBObj.total_active,
  totalDeaths: stateStatisticsDBObj.total_deaths,
});

//get all states api
app.get("/states/", authenticateToken, async (request, response) => {
  const getStatesQuery = `
    SELECT * FROM state
    `;
  const allStatesArray = await db.all(getStatesQuery);
  response.send(
    allStatesArray.map((stateObj) => convertDBStateObjToResponse(stateObj))
  );
});

//get state api
app.get("/states/:stateId", authenticateToken, async (request, response) => {
  const { stateId } = request.params;
  const getStateQuery = `
    SELECT * FROM state
    WHERE state_id = "${stateId}"
    `;
  const stateDBResponse = await db.get(getStateQuery);
  response.send(convertStateDBResponseToHTTPResponse(stateDBResponse));
});

//create district api
app.post("/districts/", authenticateToken, async (request, response) => {
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const createDistrictQuery = `
  INSERT INTO
    district (district_name, state_id, cases, cured, active, deaths)
  VALUES 
    ("${districtName}", "${stateId}", "${cases}", "${cured}", "${active}", "${deaths}")
  `;
  await db.run(createDistrictQuery);
  response.send("District Successfully Added");
});

//get district api
app.get(
  "/districts/:districtId/",
  authenticateToken,
  async (request, response) => {
    const { districtId } = request.params;
    const getDistrictQuery = `
    SELECT * FROM district
    WHERE district_id = '${districtId}'
    `;
    const districtDBObj = await db.get(getDistrictQuery);
    response.send(convertDistrictDBObjToHTTPResponse(districtDBObj));
  }
);

//delete district api
app.delete(
  "/districts/:districtId/",
  authenticateToken,
  async (request, response) => {
    const { districtId } = request.params;
    const deleteDistrictQuery = `
    DELETE FROM 
    district
    WHERE district_id = '${districtId}'
    `;
    await db.run(deleteDistrictQuery);
    response.send("District Removed");
  }
);

//update district api
app.put(
  "/districts/:districtId/",
  authenticateToken,
  async (request, response) => {
    const { districtId } = request.params;
    const {
      districtName,
      stateId,
      cases,
      cured,
      active,
      deaths,
    } = request.body;
    const updateDistrictQuery = `
    UPDATE 
        district
    SET district_name = '${districtName}',
        state_id = '${stateId}',
        cases = '${cases}',
        cured = '${cured}',
        active = '${active}',
        deaths = '${deaths}'
    WHERE district_id = "${districtId}"
    `;
    await db.run(updateDistrictQuery);
    response.send("District Details Updated");
  }
);

//get state statistics
app.get(
  "/states/:stateId/stats/",
  authenticateToken,
  async (request, response) => {
    const { stateId } = request.params;
    const stateStatisticsQuery = `
    SELECT 
        SUM(cases) AS total_cases,
        SUM(cured) AS total_cured,
        SUM(active) AS total_active,
        SUM(deaths) AS total_deaths
    FROM district
    WHERE state_id = "${stateId}"
    `;
    const stateStatisticsDBObj = await db.get(stateStatisticsQuery);
    response.send(
      convertStateStatisticsDBObjToHTTPResponse(stateStatisticsDBObj)
    );
  }
);

//get district's state name
app.get(
  "/districts/:districtId/details/",
  authenticateToken,
  async (request, response) => {
    const { districtId } = request.params;
    const getDistrictsStateQuery = `
    SELECT state_name FROM district 
    LEFT JOIN state 
    ON district.state_id = state.state_id
    WHERE district_id = "${districtId}"
    `;
    const stateObj = await db.get(getDistrictsStateQuery);
    response.send({ stateName: stateObj.state_name });
  }
);

module.exports = app;
