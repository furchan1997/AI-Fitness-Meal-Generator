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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = { User };
