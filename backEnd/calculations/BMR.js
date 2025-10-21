// פונקציה לחישוב ה-BMR עבור הבנה האם המשקל תקין ובאיזה מצב האדם
const BMRCalculation = ({ gender, weight, height, age }) => {
  if (gender === "זכר") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }

  if (gender === "נקבה") {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return null;
};

module.exports = { BMRCalculation };
