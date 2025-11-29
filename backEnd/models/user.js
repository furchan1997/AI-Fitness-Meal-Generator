const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  fullName: {
    type: String,
  },
  avater: { type: String },
  createAt: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema, "users");

module.exports = { User };
