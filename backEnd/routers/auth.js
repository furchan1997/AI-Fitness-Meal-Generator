const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken"); // יצירת טוקן JWT מהמשתמש
const { User } = require("../models/user");

/**
 * שלב 1 — משתמש פותח /google
 * פאספורט מפנה אותו לדף ההתחברות של גוגל
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * שלב 2 — גוגל מחזירה את המשתמש חזרה אל callback
 * כאן השרת מקבל מידע על המשתמש
 */

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/google/fail" }),
  async (req, res) => {
    let existUser = await User.findOne({ googleId: req.user.googleId });
    if (!existUser) {
      existUser = await User.create({
        googleId: req.user.googleId,
        fullName: req.user.fullName,
        email: req.user.email,
        avater: req.user.avatar,
      });
    }

    const payload = {
      id: existUser._id,
      email: existUser.email,
      name: existUser.fullName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log("TOKEN:", token);

    res.redirect(`http://localhost:5173/auth/google/success?token=${token}`);
  }
);

/**
 * במקרה של כישלון התחברות
 */
router.get("/google/fail", (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});

module.exports = router;
