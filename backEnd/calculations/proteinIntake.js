const { targetService } = require("../services/targetService");
const { getProteinAmount } = require("../services/formulas/nutritionFormulas");

// חישוב כמות החלבון שעל המשתמש לצרוך ביום
const proteinIntakeCulc = ({ target, weight }) => {
  const proteinAmount = getProteinAmount(weight);
  const targetKey = targetService(target);
  const offSet = proteinAmount[targetKey] ?? 0;
  return offSet;
};

module.exports = { proteinIntakeCulc };
