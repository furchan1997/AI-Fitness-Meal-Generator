const { calorieBalance } = require("../services/formulas/nutritionFormulas");

// פונקציות עזר לטקסטים חוזרים
const buildProteinText = (proteinIntake) =>
  `לפי הנתונים שלך מומלץ לצרוך כמות חלבון יומית של: ${proteinIntake} גרם`;

const buildCaloriesText = (caloriIntake) =>
  `לפי הנתונים שלך מומלץ לצרוך כמות קלוריות של: ${caloriIntake} קק"ל`;

const buildCutCaloriesText = (baseCalo, cut) => {
  const deficit = Math.abs(cut); // הופך -500 ל-500
  const targetCalo = baseCalo + cut; // cut שלילי => base - 500
  return `מומלץ להיות בגרעון קלורי של ${deficit} קק"ל ולצרוך ביום כמות קלוריות של: ${targetCalo} קק"ל`;
};

const buildMassCaloriesText = (baseCalo, mass) => {
  const surplus = Math.abs(mass);
  const targetCalo = baseCalo + mass; // mass חיובי => base + 500
  return `מומלץ להיות בפלוס קלורי של ${surplus} קק"ל ולצרוך ביום כמות קלוריות של: ${targetCalo} קק"ל`;
};

const buildPreReport = ({
  target,
  dangerZone,
  isHealthTargetAndLowCalo,
  proteinIntake,
  caloriIntake, // זה ה"קלוריות למטרה" שכבר חישבת (TDEE  + offset)
}) => {
  // אובייקט דיפולטיבי
  let report = {
    proteinIntake: null, // טקסט למשתמש
    caloriIntake: null, // טקסט למשתמש
    intention: null, // טקסט יותר "אסטרטגי"
    effectiveTarget: target,
  };

  const baseProteinText =
    typeof proteinIntake === "number" ? buildProteinText(proteinIntake) : null;

  // מסה / חיטוב ללא סכנה
  if ((target === "מסה" || target === "חיטוב") && !dangerZone) {
    return {
      ...report,
      proteinIntake: baseProteinText,
      caloriIntake: buildCaloriesText(caloriIntake),
    };
  }

  // בריאות כללית + סכנה – שתי אופציות שונות
  if (target === "בריאות כללית" && dangerZone && !isHealthTargetAndLowCalo) {
    // caloriIntake נניח זה ה-TDEE, ואנחנו רוצים להוריד עוד קצת
    return {
      ...report,
      proteinIntake: baseProteinText,
      caloriIntake: buildCutCaloriesText(caloriIntake, calorieBalance.cut), // יחזיר TDEE-500
    };
  }

  if (target === "בריאות כללית" && dangerZone && isHealthTargetAndLowCalo) {
    // פה הלוגיקה שלך אומרת: "כבר נמוך מדי" => נותנים טיפה יותר
    return {
      ...report,
      proteinIntake: baseProteinText,
      caloriIntake: buildMassCaloriesText(caloriIntake, calorieBalance.mass),
    };
  }

  // חיטוב + סכנה – לדוגמה: קלוריות נמוכות מדי
  if (target === "חיטוב" && dangerZone) {
    const saferCalo = caloriIntake + calorieBalance.mass; // מעלים טיפה (למשל מ-1200 ל-1700)
    return {
      ...report,
      effectiveTarget: "עליית במסת שריר/ייצוב קל",
      proteinIntake: baseProteinText,
      caloriIntake: buildCaloriesText(saferCalo),
      intention: `במצב הזה בו יש סיכון בחיטוב (כנראה קלוריות נמוכות מדי), מומלץ לשקול תקופה של אכילה מעט גבוהה יותר כדי לא לפגוע בבריאות ובשמירה על מסת השריר. לדוגמה, לנסות להתקרב לכמות של כ-${saferCalo} קק"ל ליום.`,
      effectiveTarget: "עלייה במסת שריר/ייצוב",
    };
  }

  // מסה + סכנה – אחוז שומן גבוה, לא רוצים פלוס מלא
  if (target === "מסה" && dangerZone) {
    const saferCalo = caloriIntake + calorieBalance.cut; // caloriIntake (TDEE+500) + (-500) => חוזר ל-TDEE
    return {
      ...report,
      effectiveTarget: "חיטוב/ייצוב קל",
      proteinIntake: baseProteinText,
      caloriIntake: buildCaloriesText(saferCalo),
      intention: `במצב הזה בו יש סיכון בעלייה במסה (אחוזי שומן גבוהים), מומלץ בשלב ראשון להתקרב יותר ל-TDEE ולא להיות בעודף קלורי מלא. לדוגמה, לנסות להגיע לכמות קלוריות של כ-${saferCalo} קק"ל ליום, להתייצב, ואז לשקול מסה מחדש.`,
    };
  }

  // אם לא נכנס לאף אחד מהמצבים
  return {
    ...report,
    proteinIntake: baseProteinText,
    caloriIntake: caloriIntake ? buildCaloriesText(caloriIntake) : null,
  };
};

module.exports = { buildPreReport };
