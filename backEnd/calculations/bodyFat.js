let baseUserGuidance = {
  isRecommended: true,
  level: "OK",
  message: null,
};
// בדיקת טווח אחוזי שומן תקינים עבור זכר ונקבה
const LIMITS = {
  נקבה: {
    cutLow: 14,
    bulkHige: 35,
  },

  זכר: {
    cutLow: 7,
    bulkHige: 22,
  },
};

const getRecommendationByBodyFat = ({ target, bodyFat, gender }) => {
  //   יצירת אובייקט דיפולטיבי עבור אחוזי שומן תקינים
  let userGuidance = {
    ...baseUserGuidance,
  };

  // זכר – אחוזי שומן נמוכים בחיטוב
  if (bodyFat < LIMITS.זכר.cutLow && target === "חיטוב" && gender === "זכר") {
    return {
      ...userGuidance,
      isRecommended: false,
      level: "NOT OK",
      message:
        "אחוזי השומן נמוכים מהרצוי לביצוע חיטוב. מומלץ להימנע מכניסה לחיטוב בשלב זה.",
      dangerZone: true,
    };
  }

  // זכר – אחוזי שומן גבוהים במסה
  if (bodyFat > LIMITS.זכר.bulkHige && target === "מסה" && gender === "זכר") {
    return {
      ...userGuidance,

      isRecommended: false,
      level: "NOT OK",
      message:
        "אחוזי השומן גבוהים לביצוע מסה בצורה יעילה. מומלץ לשקול ייצוב או חיטוב קל לפני מעבר למסה.",
      dangerZone: true,
    };
  }

  // נקבה – אחוזי שומן נמוכים בחיטוב
  if (bodyFat < LIMITS.נקבה.cutLow && target === "חיטוב" && gender === "נקבה") {
    return {
      ...userGuidance,

      isRecommended: false,
      level: "NOT OK",
      message:
        "אחוזי השומן נמוכים מהרצוי לחיטוב. מומלץ להימנע משלב חיטוב עד לעלייה לאזור בטוח יותר.",
      dangerZone: true,
    };
  }

  // נקבה – אחוזי שומן גבוהים במסה
  if (bodyFat > LIMITS.נקבה.bulkHige && target === "מסה" && gender === "נקבה") {
    return {
      ...userGuidance,

      isRecommended: false,
      level: "NOT OK",
      message:
        "אחוזי השומן גבוהים לביצוע מסה בצורה אופטימלית. ייתכן שכדאי להתמקד בחיטוב מתון לפני מסה.",
      dangerZone: true,
    };
  }
  //   מצב בו המטרה הינה בריאות כללית
  //  זכר  - אחוזי שומן גבוהים
  if (
    target === "בריאות כללית" &&
    bodyFat > LIMITS.זכר.bulkHige &&
    gender === "זכר"
  ) {
    return {
      ...userGuidance,

      isRecommended: false,
      level: "NOT OK",
      message: `אחוזי השומן גבוהים. ייתכן שכדאי להתמקד בחיטוב וגירעון קלורי`,
      dangerZone: true,
      isHealthTargetAndLowCalo: false,
    };
  }
  //  זכר - אחוזי שומן נמוכים
  if (
    target === "בריאות כללית" &&
    bodyFat < LIMITS.זכר.cutLow &&
    gender === "זכר"
  ) {
    console.log("FROM BODT FAT:", userGuidance?.message);
    return {
      ...userGuidance,
      isRecommended: false,
      level: "NOT OK",
      message: `אחוזי השומן נמוכים מדיי. ייתכן שכדאי להתמקד בפלוס קלורי`,
      dangerZone: true,
      isHealthTargetAndLowCalo: true,
    };
  }

  //  נקבה  - אחוזי שומן גבוהים
  if (
    target === "בריאות כללית" &&
    bodyFat > LIMITS.נקבה.bulkHige &&
    gender === "נקבה"
  ) {
    return {
      ...userGuidance,

      isRecommended: false,
      level: "NOT OK",
      message: `אחוזי השומן גבוהים. ייתכן שכדאי להתמקד בחיטוב וגירעון קלורי`,
      dangerZone: true,
      isHealthTargetAndLowCalo: false,
    };
  }
  //  נקבה - אחוזי שומן נמוכים
  if (
    target === "בריאות כללית" &&
    bodyFat < LIMITS.נקבה.cutLow &&
    gender === "נקבה"
  ) {
    return {
      ...userGuidance,

      isRecommended: false,
      level: "NOT OK",
      message: `אחוזי השומן גבוהים. ייתכן שכדאי להתמקד בחיטוב וגירעון קלורי`,
      dangerZone: true,
      isHealthTargetAndLowCalo: true,
    };
  }

  return userGuidance;
};

module.exports = { getRecommendationByBodyFat, baseUserGuidance };
