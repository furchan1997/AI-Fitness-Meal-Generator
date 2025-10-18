const router = require("express").Router();
const { userProfile, userProfileValidate } = require("../models/profile");

// יצירת פרופיל משתמש חדש
router.post("/Create-profile/", async (req, res, next) => {
  try {
    // בדיקת שגיאות של שדות(סטטוס 400)
    const { error } = userProfileValidate(req.body);
    if (error) {
      const joiError = error.details[0].message;
      res.status(400).json({
        massage: "Thare is a validate error",
        error: joiError,
      });
      return;
    }

    // יצירת מסמך חדש ושמירתו בבסיס הנתונים
    const profile = await userProfile.create({ ...req.body });
    await profile.save();

    res.status(201).json({
      massage: "Profile created.",
      profile,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
