// פונקציה לחישוב ה-TDEE למען הבנה מה רמת הפעילות הספורטיבית של האדם וכמה משקל הוא שורף ביום

const TDEECalculation = ({ bmr, activity }) => {
  const factors = {
    קל: 1.2,
    בינוני: 1.55,
    קשה: 1.725,
  };

  return factors[activity] ? bmr * factors[activity] : null;
};

module.exports = { TDEECalculation };
