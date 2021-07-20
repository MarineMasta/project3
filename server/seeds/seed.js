const db = require("../config/connection");
const { ScoredGames, TimedGames, Users } = require("../models");

const users = require("./users.json");
const timedGames = require("./timedGames.json");
const scoredGames = require("./scoredGames.json");

db.once("open", async () => {
  try {
    await timedGames.deleteMany({});
    await scoredGames.deleteMany({});
    await Users.deleteMany({});

    await Users.create(users);

    for (let i = 0; i < scoredGames.length; i++) {
      const { _id, scoredGames } = await scoredGames.create(scoredGames[i]);
      const user = await User.findOneAndUpdate(
        { username: scoredGames },
        {
          $addToSet: {
            scoredGames: _id,
            timedGames: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
