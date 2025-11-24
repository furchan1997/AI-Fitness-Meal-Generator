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

  // בדיקה עבור משתמש עם אחוזי שומן נמוכים מדיי ומטרתו היא חיטוב
  if (bodyFat < LIMITS.זכר.cutLow && target === "חיטוב" && gender === "זכר") {
    return {
      isRecommended: false,
      level: "NOT OK",
      message: "Body fat is low for cut for man",
    };
  }

  // בדיקה עבור משתמש עם אחוזי שומן גבוהים מדיי ומטרתו היא מסה
  if (bodyFat > LIMITS.זכר.bulkHige && target === "מסה" && gender === "זכר") {
    return {
      isRecommended: false,
      level: "NOT OK",
      message: "Body fat is hige for massa for man",
    };
  }

  //   לנשים
  // בדיקה עבור משתמש עם אחוזי שומן נמוכים מדיי ומטרתו היא חיטוב
  if (bodyFat < LIMITS.נקבה.cutLow && target === "חיטוב" && gender === "נקבה") {
    return {
      isRecommended: false,
      level: "NOT OK",
      message: "Body fat is low for cut for woman",
    };
  }

  // בדיקה עבור משתמש עם אחוזי שומן גבוהים מדיי ומטרתו היא מסה
  if (bodyFat > LIMITS.נקבה.bulkHige && target === "מסה" && gender === "נקבה") {
    return {
      isRecommended: false,
      level: "NOT OK",
      message: "Body fat is hige for massa for woman",
    };
  }

  return userGuidance;
};

module.exports = { getRecommendationByBodyFat };
