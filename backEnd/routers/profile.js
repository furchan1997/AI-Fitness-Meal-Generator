const router = require("express").Router();
const { userProfile, userProfileValidate } = require("../models/profile");
const { BMRCalculation } = require("../calculations/BMR");
const { TDEECalculation } = require("../calculations/TDEE");
const { buildReport } = require("../services/aiReport");

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
    // שימוש בערכים בכדי לבצע את החישוב של ה-BMR וה-TDEE, שמירתם בבסיס הנתונים
    const { gender, weight, height, age, activity } = req.body;

    const bmr = BMRCalculation({ gender, weight, height, age });
    const tdee = TDEECalculation({ bmr, activity });

    // יצירת מסמך חדש ושמירתו בבסיס הנתונים
    const profile = await userProfile.create({ ...req.body, bmr, tdee });
    await profile.save();

    const profileForAI = {
      fullName: profile.fullName,
      gender: profile.gender,
      age: profile.age,
      height: profile.height,
      weight: profile.weight,
      target: profile.target,
      activity: profile.activity,
      kosher: profile.kosher,
      vegetarian: profile.vegetarian,
      favoFoods: profile.favoFoods,
    };

    const aiReport = await buildReport(profileForAI);

    res.status(201).json({
      massage: "Profile created.",
      profile,
      AI_Report: aiReport,
    });
  } catch (err) {
    next(err);
  }
});

// מחיקת כל הפרופילים
router.delete("/Delete-profiles/", async (req, res, next) => {
  const profiles = await userProfile.deleteMany({}, {});
  if (profiles.deletedCount === 0) {
    res.status(404).json({
      massage: "No profiles found.",
    });
    return;
  }

  res.json({
    massage: "Profiles deleted.",
    profiles: profiles.deletedCount,
  });
});

// קבלת כל הפרופילים
router.get("/All-profiles/", async (req, res, next) => {
  const profiles = await userProfile.find({}, {});
  if (profiles.length === 0) {
    res.status(404).json({
      massage: "No profiles found.",
    });
    return;
  }

  res.status(200).json({
    massage: "All profiles.",
    profiles,
  });
});

module.exports = router;
