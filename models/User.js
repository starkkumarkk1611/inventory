const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  // Create all the properties you want this model to have
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  lab: {
    type: String,
    required: true,
    enum: ["robotic-technology",
      "electronics-and-iot",
      "data-and-software-technology",
      "animation-and-game-design",
      "electric-mobility",
      "finance-technology",
      "smart-manufacturing",
      "aeronautics-and-space-technology"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  memberSince: {
    type: String,
    default: new Date().toDateString()
  }
});

module.exports = mongoose.model("users", UserSchema);
