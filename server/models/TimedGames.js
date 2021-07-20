const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const timedGameSchema = new Schema({
  timedname: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const TimedGames = model("timedGames", timedGameSchema);

module.exports = TimedGames;
