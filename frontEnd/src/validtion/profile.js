import joi from "joi";

export const profileValidate = (value) => {
  const schema = joi.object({
    fullName: joi.string().min(2).max(16).required(),
    gender: joi.string().valid("זכר", "נקבה").required(),
    age: joi.number().min(16).max(70).required(),
    height: joi.number().min(150).required(),
    weight: joi.number().min(30).required(),
    target: joi.string().valid("מסה", "חיטוב", "בריאות כללית").required(),
    activity: joi.string().valid("קל", "בינוני", "קשה").required(),
    kosher: joi.boolean().default(true),
    vegetarian: joi.boolean().default(false),
    bodyFat: joi.number().min(3).max(60).required(),
    favoFoods: joi.string().min(0).max(256).default("").optional(),
  });

  return schema.validate(value);
};
