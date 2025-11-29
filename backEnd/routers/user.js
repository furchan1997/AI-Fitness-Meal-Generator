const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/me", async (req, res, next) => {
  try {
    const user = await User.find({}, {});
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
