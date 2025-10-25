// מכפיל את ה־BMR בפקטור שמייצג את רמת הפעילות של המשתמש
// מקבל את ההוצאה הקלורית הכוללת ליום בהתאם לסגנון החיים של המשתמש
const TDEECalculation = ({ bmr, activity }) => {
  const factors = {
    קל: 1.2,
    בינוני: 1.55,
    קשה: 1.725,
  };

  return factors[activity] ? bmr * factors[activity] : null;
};

module.exports = { TDEECalculation };
