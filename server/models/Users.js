const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

UsersSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UsersSchema.methods.isCorrentPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("Users", UsersSchema);

module.exports = User;
