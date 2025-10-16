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
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  target: {
    type: String,
    enum: ["מסה", "חיטוב", "בריאות כללית"],
    required: true,
  },
  activity: {
    type: String,
    enum: ["קל", "בינוני", "כבד"],
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
  elergani: {
    type: [String],
    enum: [
      "בוטנים",
      "אגוזים",
      "חלב",
      "ביצים",
      "דגים",
      "פירות ים",
      "סויה",
      "חיטה",
      "שומשום",
    ],
    default: [],
  },
  favoFoods: {
    type: String,
    minlength: 0,
    maxlength: 256,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const userProfile = mongoose.model("Profile", profileSchema, "profiles");

function userProfileValidate(profile) {
  const schema = joi.object({
    fullName: joi.string().min(2).max(16).required(),
    gender: joi.string().valid("זכר", "נקבה").required(),
    age: joi.number().min(16).max(70).required(),
    height: joi.number().min(150).required(),
    weight: joi.number().required(),
    target: joi.string().valid("מסה", "חיטוב", "בריאות כללית").required(),
    activity: joi.string().valid("קל", "בינוני", "כבד").required(),
    kosher: joi.boolean().default(true),
    vegetarian: joi.boolean().default(false),
    elergani: joi
      .array()
      .items(
        joi
          .string()
          .valid(
            "בוטנים",
            "אגוזים",
            "חלב",
            "ביצים",
            "דגים",
            "פירות ים",
            "סויה",
            "חיטה",
            "שומשום"
          )
      )
      .default([]),
    favoFoods: joi.string().max(256),
  });

  return schema.validate(profile);
}

module.exports = { userProfile, userProfileValidate };
