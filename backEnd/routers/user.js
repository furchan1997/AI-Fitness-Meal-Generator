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
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// קבלת משתמש יחיד לפי מזהה
router.get("/Me", authMW, async (req, res, next) => {
  console.log(req.user);
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

// עדכון משתמש למשתמש מנהל
router.patch("/Is-admin", authMW, async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: "arielhodaya@gmail.com" },
      { role: "admin" },
      { returnDocument: "after" }
    );

    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }

    res.json({
      message: `The user with email: ${user.email} become to admin.`,
      user,
    });
  } catch (err) {
    next(err);
  }
});

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
