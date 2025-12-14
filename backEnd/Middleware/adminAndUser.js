const { userProfile } = require("../models/profile");

module.exports = async (req, res, next) => {
  const userIdFromDB = await userProfile.findOne({ userId: req.user.id }); // בדיקה האם המזהה של הפרופיל הוא של בעל החשבון

  if (req.user.role !== "admin" && !userIdFromDB) {
    res.status(403).json({
      massege: "No auth.",
    });
    return;
  }
  next();
};
