const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const scoredGamesSchema = new Schema({
  scoredname: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const ScoredGames = model("scoredGame", scoredGamesSchema);

module.exports = { scoredGames };
