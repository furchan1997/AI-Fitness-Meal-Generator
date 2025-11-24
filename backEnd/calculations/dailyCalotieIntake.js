const { targetService } = require("../services/targetService");
const { calorieBalance } = require("../services/formulas/nutritionFormulas");

const dailyCalotieIntake = ({ target, tdee }) => {
  const targetKey = targetService(target);
  const offSet = calorieBalance[targetKey];
  return offSet + tdee;
};

module.exports = { dailyCalotieIntake };
