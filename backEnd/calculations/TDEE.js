const { factors } = require("../services/formulas/nutritionFormulas");

// מכפיל את ה־BMR בפקטור שמייצג את רמת הפעילות של המשתמש
// מקבל את ההוצאה הקלורית הכוללת ליום בהתאם לסגנון החיים של המשתמש
const TDEECalculation = ({ bmr, activity }) => {
  return factors[activity] ? bmr * factors[activity] : null;
};

module.exports = { TDEECalculation };
