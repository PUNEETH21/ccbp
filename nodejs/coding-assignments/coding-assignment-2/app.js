const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

let db = "";
const dbPath = path.join(__dirname, "twitterClone.db");

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
  }
};

initializeDBAndServer();

const sendErrorResponse = (response, statusCode, statusText) => {
  response.status(statusCode);
  response.send(statusText);
};

//create user api
app.post("/register/", async (request, response) => {
  const { username, password, name, gender } = request.body;
  const isExistedUserQuery = `SELECT * FROM user WHERE username = "${username}"`;
  const dbUser = await db.get(isExistedUserQuery);
  if (dbUser !== undefined) {
    sendErrorResponse(response, 400, "User already exists");
  } else if (password.length < 6) {
    sendErrorResponse(response, 400, "Password is too short");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserQuery = `
      INSERT INTO user( username, password, name, gender)
      VALUES ( "${username}", "${hashedPassword}", "${name}", "${gender}")
      `;
    await db.run(createUserQuery);
    response.send("User created successfully");
  }
});

//user login api
app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const isExistedUserQuery = `SELECT * FROM user WHERE username = "${username}"`;
  const dbUser = await db.get(isExistedUserQuery);
  if (dbUser === undefined) {
    sendErrorResponse(response, 400, "Invalid user");
  } else {
    const isCorrectPassword = await bcrypt.compare(password, dbUser.password);
    if (isCorrectPassword === true) {
      const payload = { username: username };
      const jwtToken = jwt.sign(payload, "SECRET_TOKEN");
      response.send({ jwtToken });
    } else {
      sendErrorResponse(response, 400, "Invalid password");
    }
  }
});

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  let jwtToken;
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    sendErrorResponse(response, 401, "Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "SECRET_TOKEN", async (error, payload) => {
      if (error) {
        sendErrorResponse(response, 401, "Invalid JWT Token");
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};

const convertTweetObjToResponse = (tweetObj) => ({
  username: tweetObj.username,
  tweet: tweetObj.tweet,
  dateTime: tweetObj.date_time,
});

const convertTweetDetailsObjToResponse = (tweetObj) => ({
  tweet: tweetObj.tweet,
  likes: tweetObj.likes,
  replies: tweetObj.replies,
  dateTime: tweetObj.date_time,
});

// get user tweets
app.get("/user/tweets/feed/", authenticateToken, async (request, response) => {
  const { username } = request;
  const getUserTweetsQuery = `
  SELECT tweeted_users.username, tweet.tweet, tweet.date_time 
  FROM user
  LEFT JOIN follower ON user.user_id = follower.follower_user_id
  LEFT JOIN tweet ON follower.following_user_id = tweet.user_id
  LEFT JOIN user AS tweeted_users ON tweeted_users.user_id = tweet.user_id
  WHERE user.username = "${username}"
  ORDER BY tweet.date_time DESC
  LIMIT 4
  `;
  const userTweetsArray = await db.all(getUserTweetsQuery);
  response.send(
    userTweetsArray.map((tweetObj) => convertTweetObjToResponse(tweetObj))
  );
});

//get following user names api
app.get("/user/following/", authenticateToken, async (request, response) => {
  const { username } = request;
  const getFollowingUsersQuery = `
    SELECT following_user.name FROM user
    LEFT JOIN follower ON user.user_id = follower.follower_user_id
    LEFT JOIN user AS following_user 
    ON follower.following_user_id = following_user.user_id
    WHERE user.username = "${username}"
    `;
  const usernamesArray = await db.all(getFollowingUsersQuery);
  response.send(usernamesArray);
});

//get the user followers
app.get("/user/followers/", authenticateToken, async (request, response) => {
  const { username } = request;
  const userFollowersQuery = `
    SELECT follower_details.name FROM user
    LEFT JOIN follower ON user.user_id = follower.following_user_id
    LEFT JOIN user AS follower_details ON follower.follower_user_id = follower_details.user_id
    WHERE user.username = "${username}"
    `;
  const followersNames = await db.all(userFollowersQuery);
  response.send(followersNames);
});

//
app.get("/tweets/:tweetId/", authenticateToken, async (request, response) => {
  const { username } = request;
  const { tweetId } = request.params;
  const getTweetQuery = `
    SELECT 
        tweet.tweet_id,
        tweet.tweet,
        COUNT(like.like_id) AS likes,
        COUNT(reply.reply_id) AS replies,
        tweet.date_time
    FROM user
    LEFT JOIN follower ON user.user_id = follower.following_user_id
    LEFT JOIN tweet ON  follower.follower_user_id = tweet.user_id
    LEFT JOIN like ON tweet.tweet_id = like.tweet_id
    LEFT JOIN reply ON tweet.tweet_id = reply.tweet_id
    WHERE tweet.tweet_id = "${tweetId}" AND user.username = "${username}"
    `;
  const tweetObj = await db.get(getTweetQuery);
  if (tweetObj.tweet_id === null) {
    sendErrorResponse(response, 401, "Invalid Request");
  } else {
    response.send(convertTweetDetailsObjToResponse(tweetObj));
  }
});

app.get(
  "/tweets/:tweetId/likes/",
  authenticateToken,
  async (request, response) => {
    const { username } = request;
    const { tweetId } = request.params;
    const getTweetLikedUsersQuery = `
    SELECT 
         liked_user.name
    FROM user
    LEFT JOIN follower ON user.user_id = follower.following_user_id
    LEFT JOIN tweet ON follower.follower_user_id = tweet.user_id
    LEFT JOIN like ON tweet.tweet_id = like.tweet_id
    LEFT JOIN user AS liked_user ON like.user_id = liked_user.user_id
    WHERE tweet.tweet_id = "${tweetId}" AND user.username = "${username}"
    `;
    const tweetLikedUsersArray = await db.all(getTweetLikedUsersQuery);
    if (tweetLikedUsersArray.length < 1) {
      sendErrorResponse(response, 401, "Invalid Request");
    } else {
      response.send({
        likes: tweetLikedUsersArray.map((tweetObj) => tweetObj.name),
      });
    }
  }
);

app.get(
  "/tweets/:tweetId/replies/",
  authenticateToken,
  async (request, response) => {
    const { username } = request;
    const { tweetId } = request.params;
    const getTweetReplyQuery = `
    SELECT 
        replied_user.name,
        reply.reply
    FROM user
    LEFT JOIN follower ON user.user_id = follower.following_user_id
    LEFT JOIN tweet ON follower.follower_user_id = tweet.user_id
    LEFT JOIN reply ON tweet.tweet_id = reply.tweet_id
    LEFT JOIN user AS replied_user ON tweet.user_id = replied_user.user_id
    WHERE tweet.tweet_id = "${tweetId}" AND user.username = "${username}"
    `;
    const tweetReplyArray = await db.all(getTweetReplyQuery);
    if (tweetReplyArray.length < 1) {
      sendErrorResponse(response, 401, "Invalid Request");
    } else {
      response.send({ replies: tweetReplyArray });
    }
  }
);

//get user tweets api
app.get("/user/tweets/", authenticateToken, async (request, response) => {
  const { username } = request;
  const getUserTweetsQuery = `
      SELECT tweet.tweet,
          COUNT(like.like_id) AS likes,
          COUNT(reply.reply_id) AS replies,
          tweet.date_time
      FROM user
      LEFT JOIN tweet ON user.user_id = tweet.user_id
      LEFT JOIN reply ON tweet.tweet_id = reply.tweet_id
      LEFT JOIN like ON tweet.tweet_id = like.tweet_id
      WHERE user.username = "$username"
      GROUP BY tweet.tweet_id
      `;

  const userTweetsArray = await db.all(getUserTweetsQuery);
  response.send(
    userTweetsArray.map((tweetObj) =>
      convertTweetDetailsObjToResponse(tweetObj)
    )
  );
});

//create tweet
app.post("/user/tweets/", authenticateToken, async (request, response) => {
  const { username } = request;
  const { tweet } = request.body;
  const getUserQuery = `SELECT user_id FROM user 
  WHERE username = "${username}" `;
  const userId = await db.get(getUserQuery);
  const createTweetQuery = `
  INSERT INTO tweet(tweet, user_id, date_time)
  VALUES ("${tweet}", "${userId}", "${new Date()}")
  `;
  await db.run(createTweetQuery);
  response.send("Created a Tweet");
});

// delete tweet
app.delete(
  "/tweets/:tweetId/",
  authenticateToken,
  async (request, response) => {
    const { username } = request;
    const { tweetId } = request.params;
    const getUserTweetQuery = `
    SELECT user.user_id FROM user
    LEFT JOIN tweet ON user.user_id = tweet.user_id
    WHERE user.username = "${username}" AND tweet.tweet_id = "${tweetId}"
    `;
    const userDB = await db.get(getUserTweetQuery);
    if (userDB === undefined) {
      sendErrorResponse(response, 401, "Invalid Request");
    } else {
      const removeTweetQuery = `
        DELETE FROM
        tweet
        WHERE tweet_id = "${tweetId}"
        `;
      await db.run(removeTweetQuery);
      response.send("Tweet Removed");
    }
  }
);

module.exports = app;
