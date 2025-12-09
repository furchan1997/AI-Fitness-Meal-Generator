const router = require("express").Router();
const { userProfile, userProfileValidate } = require("../models/profile");
const { BMRCalculation } = require("../calculations/BMR");
const { TDEECalculation } = require("../calculations/TDEE");
const { buildReport } = require("../services/aiReport");
const { proteinIntakeCulc } = require("../calculations/proteinIntake");
const { getRecommendationByBodyFat } = require("../calculations/bodyFat");
const { dailyCalotieIntake } = require("../calculations/dailyCalotieIntake");
const { buildPreReport } = require("../services/preReport");
const authMW = require("../Middleware/auth");
const adminMW = require("../Middleware/admin");

// יצירת פרופיל משתמש חדש
router.post("/Create-profile/", authMW, async (req, res, next) => {
  try {
    // בדיקת שגיאות של שדות(סטטוס 400)
    const { error } = userProfileValidate(req.body);
    if (error) {
      const joiError = error.details[0].message;
      res.status(400).json({
        message: "Thare is a validate error",
        error: joiError,
      });
      return;
    }
    // שימוש בערכים בכדי לבצע את החישוב של ה-BMR וה-TDEE, שמירתם בבסיס הנתונים
    const { gender, weight, height, age, activity, target, bodyFat } = req.body;

    const bmr = BMRCalculation({ gender, weight, height, age });
    const tdee = TDEECalculation({ bmr, activity });
    const proteinIntake = proteinIntakeCulc({ target, weight }); // שליחת מידע למשתמש עבור צריכת כמות חלבון לפי המטרה שלו
    const suitability = getRecommendationByBodyFat({ target, bodyFat, gender }); // בדיקת טווח אחוזי שומן תקינים
    const caloriIntake = dailyCalotieIntake({ target, tdee }); // שליחת כמות הקלורית היומית עבור משתמש
    // שליחת דו''ח מוקדם ללא AI:
    const preReport = buildPreReport({
      target,
      dangerZone: suitability?.dangerZone,
      proteinIntake,
      caloriIntake,
      dangerZoneMsg: suitability?.message,
      isHealthTargetAndLowCalo: suitability?.isHealthTargetAndLowCalo,
    });

    const userId = req.user.id;

    // יצירת מסמך חדש ושמירתו בבסיס הנתונים
    const profile = await userProfile.create({
      ...req.body,
      userId,
      target: target,
      bmr,
      tdee,
      proteinIntake,
      RecommendationByBodyFat: suitability?.message,
      dangerZone: suitability?.dangerZone,
      caloriIntake,
      preReport,
    });
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
      preReport,
      msg: profile.RecommendationByBodyFat,
    };

    const aiReport = await buildReport(profileForAI);
    res.status(201).json({
      message: "Profile created.",
      userId,
      profile,
      preReport,
      AI_Report: aiReport,
    });
  } catch (err) {
    next(err);
  }
});

// מחיקת כל הפרופילים
router.delete("/Delete-profiles/", authMW, adminMW, async (req, res, next) => {
  try {
    const profiles = await userProfile.deleteMany({}, {});
    if (profiles.deletedCount === 0) {
      res.status(404).json({
        message: "No profiles found.",
      });
      return;
    }

    res.json({
      message: "Profiles deleted.",
      profiles: profiles.deletedCount,
    });
  } catch (err) {
    next(err);
  }
});

// קבלת כל הפרופילים
router.get("/All-profiles/", authMW, adminMW, async (req, res, next) => {
  try {
    const profiles = await userProfile.find({}, {});
    if (profiles.length === 0) {
      res.status(404).json({
        message: "No profiles found.",
      });
      return;
    }

    res.status(200).json({
      message: "All profiles.",
      profiles,
    });
  } catch (err) {
    next(err);
  }
});

// קבלת כל הפרופילים של משתמש יחיד לפי מזהה
router.get("/My-profiles/", authMW, async (req, res, next) => {
  try {
    const user = await userProfile.find({ userId: req.user.id });

    if (user.length === 0) {
      res.json({
        message: "No profilie yet.",
      });
      return;
    }
    console.log(user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// קבלת פרופיל יחיד של משתמש לפי מזהה
router.get("/My-profile/:id", authMW, async (req, res, next) => {
  const profile = await userProfile.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!profile) {
    res.status(404).json({ message: "Profile not found" });
    return;
  }
  res.json(profile);
});

module.exports = router;
