const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ScoredGamesSchema = new Schema({
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

const ScoredGames = model("ScoredGame", ScoredGamesSchema);

module.exports = ScoredGames;
