const buildPreReport = ({
  target,
  dangerZone,
  proteinIntake,
  caloriIntake,
  dangerZoneMsg = false,
}) => {
  let report = {
    proteinIntake: null,
    caloriIntake: null,
  };

  if (target === "מסה" && !dangerZone) {
    return {
      proteinIntake: `לפי הנתונים שלך הינך צריך לצרוך כמות חלבון: ${proteinIntake}`,
      caloriIntake: `לפי הנתונים שלך אתה צריך לצרוך כמות קלוריות של: ${caloriIntake}`,
    };
  }

  if (target === "חיטוב" && !dangerZone) {
    return {
      proteinIntake: `לפי הנתונים שלך הינך צריך לצרוך כמות חלבון: ${proteinIntake}`,
      caloriIntake: `לפי הנתונים שלך אתה צריך לצרוך כמות קלוריות של: ${caloriIntake}`,
    };
  }

  if (dangerZone) {
    return {
      dangerZoneMsg,
    };
  }
  return report;
};

module.exports = { buildPreReport };
