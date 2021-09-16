const express = require("express");
const { open } = require("sqlite");
const sqlite = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "covid19India.db");
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
app.get("/states/", async (request, response) => {
  const getAllStatesQuery = `
    SELECT * FROM state
    `;
  const allStatesDBResponse = await db.all(getAllStatesQuery);
  response.send(
    allStatesDBResponse.map((eachState) =>
      convertStateDBResponseToHTTPResponse(eachState)
    )
  );
});

//get state api
app.get("/states/:stateId", async (request, response) => {
  const { stateId } = request.params;
  const getStateQuery = `
    SELECT * FROM state
    WHERE state_id = "${stateId}"
    `;
  const stateDBResponse = await db.get(getStateQuery);
  response.send(convertStateDBResponseToHTTPResponse(stateDBResponse));
});

//create district api
app.post("/districts/", async (request, response) => {
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
app.get("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const getDistrictQuery = `
    SELECT * FROM district
    WHERE district_id = '${districtId}'
    `;
  const districtDBObj = await db.get(getDistrictQuery);
  response.send(convertDistrictDBObjToHTTPResponse(districtDBObj));
});

//delete district api
app.delete("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const deleteDistrictQuery = `
    DELETE FROM 
    district
    WHERE district_id = '${districtId}'
    `;
  await db.run(deleteDistrictQuery);
  response.send("District Removed");
});

//update district api
app.put("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
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
});

//get state statistics
app.get("/states/:stateId/stats/", async (request, response) => {
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
});

//get district's state name
app.get("/districts/:districtId/details/", async (request, response) => {
  const { districtId } = request.params;
  const getDistrictsStateQuery = `
    SELECT state_name FROM district 
    LEFT JOIN state 
    ON district.state_id = state.state_id
    WHERE district_id = "${districtId}"
    `;
  const stateObj = await db.get(getDistrictsStateQuery);
  response.send({ stateName: stateObj.state_name });
});
initializeDBAndServer();

module.exports = app;
