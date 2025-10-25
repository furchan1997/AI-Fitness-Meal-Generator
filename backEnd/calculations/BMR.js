//  קצב חילוף החומרים הבסיסי — כלומר כמה קלוריות הגוף שורף במנוחה מוחלטת
// מחושב לפי נוסחת: Mifflin–St Jeor
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
