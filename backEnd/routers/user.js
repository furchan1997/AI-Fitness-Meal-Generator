const express = require("express");
const { User } = require("../models/user");
const { userProfile } = require("../models/profile");
const router = express.Router();
const authMW = require("../Middleware/auth");
const adminMW = require("../Middleware/admin");

// קבלת כל המשתמשים
router.get("/", authMW, adminMW, async (req, res, next) => {
  try {
    const users = await User.find({}, {});
    if (users.length === 0) {
      res.status(404).json({
        message: "No users found.",
      });
      return;
    }
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// קבלת משתמש יחיד לפי מזהה
router.get("/Me", authMW, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({
        message: "No user found.",
      });
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// קבלת משתמש יחיד עבור מנהל בלבד
router.get("/Me/:id", authMW, adminMW, async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id }, {});
  console.log(user);

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  res.status(200).json(user);
});

// מחיקת כל המשתמשים על ידיי מנהל בלבד
router.delete("/", authMW, adminMW, async (req, res, next) => {
  try {
    const users = (await User.deleteMany({}, {})).deletedCount;
    res.json({
      message: "All users are deleted.",
      users,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
