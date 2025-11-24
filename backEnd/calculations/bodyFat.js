const getRecommendationByBodyFat = ({ target, bodyFat, gender }) => {
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

  //   יצירת אובייקט דיפולטיבי עבור אחוזי שומן תקינים
  let userGuidance = {
    isRecommended: true,
    level: "OK",
    message: null,
  };

  // זכר – אחוזי שומן נמוכים בחיטוב
  if (bodyFat < LIMITS.זכר.cutLow && target === "חיטוב" && gender === "זכר") {
    return {
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
      isRecommended: false,
      level: "NOT OK",
      message:
        "אחוזי השומן גבוהים לביצוע מסה בצורה יעילה. מומלץ לשקול ייצוב או חיטוב קל לפני מעבר למסע.",
      dangerZone: true,
    };
  }

  // נקבה – אחוזי שומן נמוכים בחיטוב
  if (bodyFat < LIMITS.נקבה.cutLow && target === "חיטוב" && gender === "נקבה") {
    return {
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
      isRecommended: false,
      level: "NOT OK",
      message:
        "אחוזי השומן גבוהים לביצוע מסה בצורה אופטימלית. ייתכן שכדאי להתמקד בחיטוב מתון לפני מסה.",
      dangerZone: true,
    };
  }

  return userGuidance;
};

module.exports = { getRecommendationByBodyFat };
