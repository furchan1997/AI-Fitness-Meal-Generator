// המטרה : גישה לפרופיל משתמש על ידיי מנהל או משתמש שהוא בעל הפרופיל
module.exports = (req, id) => {
  if (req.user.role === "admin") {
    return { _id: id };
  }
  return { _id: id, userId: req.user._id };
};
