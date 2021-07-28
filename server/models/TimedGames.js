const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const TimedGameSchema = new Schema({
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
  userid: {
    type: Number,
    required: true,
    maxlength: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const TimedGames = model("TimedGames", TimedGameSchema);

module.exports = TimedGames;
