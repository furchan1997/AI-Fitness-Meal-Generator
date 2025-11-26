const mongoose = require("mongoose");
const joi = require("joi");
// יצירת סכמה תואמת עבור פרופיל המשתמש
const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  gender: {
    type: String,
    enum: ["זכר", "נקבה"],
    required: true,
  },
  age: {
    type: Number,
    min: 16,
    max: 70,
    required: true,
  },
  height: {
    type: Number,
    min: 150,
    max: 200,
    required: true,
  },
  weight: {
    type: Number,
    min: 40,
    max: 120,
    required: true,
  },
  target: {
    type: String,
    enum: ["מסה", "חיטוב", "בריאות כללית"],
    required: true,
  },
  activity: {
    type: String,
    enum: ["קל", "בינוני", "קשה"],
    required: true,
  },
  kosher: {
    type: Boolean,
    default: true,
  },
  vegetarian: {
    type: Boolean,
    default: false,
  },

  bodyFat: {
    type: Number,
    required: true,
    min: 3,
    max: 60,
  },

  RecommendationByBodyFat: {
    type: String,
    default: "",
  },

  dangerZone: {
    type: Boolean,
    default: false,
  },

  favoFoods: {
    type: String,
    minlength: 0,
    maxlength: 256,
    default: "",
  },

  bmr: {
    type: Number,
    default: 0,
  },
  tdee: { type: Number, default: 0 },
  proteinIntake: {
    type: Number,
    default: 0,
  },
  caloriIntake: { type: Number, default: 0 },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
// יצירת מודל חדש ויצמד למבנה הנתונים שצפויים להתקבל
const userProfile = mongoose.model("Profile", profileSchema, "profiles");
// ולידציית ג'וי עבור סכמה שתטפל בשגיאות 400 בצורה יסודית, ברורה ומובנת
function userProfileValidate(profile) {
  const schema = joi.object({
    fullName: joi.string().min(2).max(16).required(),
    gender: joi.string().valid("זכר", "נקבה").required(),
    age: joi.number().min(16).max(70).required(),
    height: joi.number().min(150).max(200).required(),
    weight: joi.number().min(40).max(120).required(),
    target: joi.string().valid("מסה", "חיטוב", "בריאות כללית").required(),
    activity: joi.string().valid("קל", "בינוני", "קשה").required(),
    kosher: joi.boolean().default(true),
    vegetarian: joi.boolean().default(false),
    bodyFat: joi.number().min(3).max(60).required(),
    favoFoods: joi.string().min(0).max(256).default("").optional(),
  });

  return schema.validate(profile);
}

module.exports = { userProfile, userProfileValidate };
