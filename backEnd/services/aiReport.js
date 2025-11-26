const { GoogleGenerativeAI } = require("@google/generative-ai");
const { prompt } = require("../data/AIPrompt");

// פונקציה יצירת דו''ח בינה מלאכותית של ג'מיני
async function buildReport(userProfile) {
  // הכנת טקסט חוקים להצגה בדו''ח כולל FALLBACK במיקרה ובו אין התאמות
  const profileText =
    !userProfile || Object.keys(userProfile).length === 0
      ? "אין נתוני פרופיל — יש להזין נתונים בסיסיים כמו גיל, מין, משקל ופעילות."
      : userProfile;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // יצירת מופע חדש של המחלקה GoogleGenerativeAI תוך שימוש במפתח ה-API שנשמר במשתנה הסביבה

    // בחירת מודל לשליחת הפרופיל והפרומפט
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    console.log(prompt);
    // הנחיית המכונה
    const promptForAI = prompt(profileText);

    const result = await model.generateContent(promptForAI); // שליחת הפרומפט למודל הבינה המלאכותית והמתנה לתשובת התוכן שנוצר
    return result.response.text(); // // החזרת הטקסט שנוצר מתוך אובייקט התגובה של המודל
  } catch (err) {
    console.error("Error generaiting AI report:", err.message);
    return `
     לא ניתן היה ליצור דו"ח אוטומטי כרגע.
      נתוני העסק התקבלו בהצלחה, והחוקים שזוהו הם:
      ${profileText}
    `;
  }
}

module.exports = { buildReport };
