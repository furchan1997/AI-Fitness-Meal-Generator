// נוסחאות הקשורות לתזונה

const calorieBalance = {
  health: 0,
  cut: -500,
  mass: 500,
};

const getProteinAmount = (weight) => ({
  health: weight * 1.6,
  cut: weight * 2.2,
  mass: weight * 2,
});

const factors = {
  קל: 1.2,
  בינוני: 1.55,
  קשה: 1.725,
};

module.exports = {
  calorieBalance,
  getProteinAmount,
  factors,
};
