const express = require("express");
const { open } = require("sqlite");
const sqlite = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "moviesData.db");

let db = null;
const initiateDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initiateDBAndServer();

const convertDBObjToResponseObj = (movie_name) => ({ movieName: movie_name });

const convertMovieDBObjToResponseObj = (movieDBObj) => ({
  movieId: movieDBObj.movie_id,
  directorId: movieDBObj.director_id,
  movieName: movieDBObj.movie_name,
  leadActor: movieDBObj.lead_actor,
});

const convertDirectorsDBResponseToResponseObj = (directorDBObj) => ({
  directorId: directorDBObj.director_id,
  directorName: directorDBObj.director_name,
});

// Get All movie names API
app.get("/movies/", async (request, response) => {
  const allMoviesNamesQuery = `
    SELECT movie_name FROM movie
    `;
  const allMoviesNames = await db.all(allMoviesNamesQuery);
  response.send(
    allMoviesNames.map((eachMovie) =>
      convertDBObjToResponseObj(eachMovie.movie_name)
    )
  );
});

//create new movie API
app.post("/movies/", async (request, response) => {
  const { directorId, movieName, leadActor } = request.body;
  const createMovieQuery = `
    INSERT INTO 
        movie (director_id, movie_name, lead_actor)
    VALUES 
        ('${directorId}', '${movieName}', '${leadActor}')
    `;
  await db.run(createMovieQuery);
  response.send("Movie Successfully Added");
});

//get movie API
app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const getMovieQuery = `
    SELECT * FROM movie
    WHERE movie_id = '${movieId}'
    `;
  const movieDBResponse = await db.get(getMovieQuery);
  response.send(convertMovieDBObjToResponseObj(movieDBResponse));
});

//update movie API
app.put("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const { directorId, movieName, leadActor } = request.body;
  const movieUpdatedQuery = `
    UPDATE 
        movie
    SET director_id = '${directorId}',
    movie_name = '${movieName}',
    lead_actor = '${leadActor}'
    WHERE movie_id = '${movieId}'
    `;
  await db.run(movieUpdatedQuery);
  response.send("Movie Details Updated");
});

//delete movie API
app.delete("/movies/:movieId", async (request, response) => {
  const { movieId } = request.params;
  const deleteMovieQuery = `
    DELETE FROM movie
    WHERE movie_id = ${movieId}
    `;
  await db.run(deleteMovieQuery);
  response.send("Movie Removed");
});

//get all directors API
app.get("/directors/", async (request, response) => {
  const getDirectorsQuery = `
    SELECT * FROM director
    `;
  const directorsDBResponse = await db.all(getDirectorsQuery);
  response.send(
    directorsDBResponse.map((eachDirectorObj) =>
      convertDirectorsDBResponseToResponseObj(eachDirectorObj)
    )
  );
});

//get director movies API
app.get("/directors/:directorId/movies/", async (request, response) => {
  const { directorId } = request.params;
  const directorMoviesQuery = `
    SELECT 
        DISTINCT movie_name 
    FROM 
        movie
    WHERE 
        director_id = '${directorId}'
    `;
  const directorMoviesDBResponse = await db.all(directorMoviesQuery);
  response.send(
    directorMoviesDBResponse.map((eachMovie) => ({
      movieName: eachMovie.movie_name,
    }))
  );
});

module.exports = app;
