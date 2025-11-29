const passport = require("passport");

// טוען את האסטרטגיה הספציפית של גוגל
const GoogleStrategy = require("passport-google-oauth20").Strategy;

/**
 * כאן אנחנו מגדירים ל-passport איך לעבוד עם גוגל:
 * - איזה Client ID / Secret להשתמש (מה-.env)
 * - לאיזה URL גוגל מחזירה אותנו אחרי התחברות (callbackURL)
 * - מה לעשות עם המידע שגוגל מחזירה (profile)
 */

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // מגיע מקובץ .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // כאן בעתיד נחפש/ניצור משתמש במסד הנתונים
        // כרגע רק בונים אובייקט "משתמש" בסיסי מהפרופיל של גוגל

        const user = {
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        };

        console.log("Google user profile:", user); // לבדיקת מה חוזר מגוגל

        // done אומר ל-passport שסיימנו, והנה המשתמש שאיתו נמשיך
        done(null, user);
      } catch (err) {
        // במקרה של שגיאה מעבירים אותה ל-passport
        done(err, null);
      }
    }
  )
);

/**
 * שתי הפונקציות האלה שומרות/טוענות את המשתמש מתוך ה-session.
 * כרגע אנחנו שומרים את כל האובייקט כמו שהוא.
 * בעתיד כשתעבוד עם JWT נטו, נצמצם את זה.
 */

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// מייצא את אובייקט passport שהגדרנו, כדי שחלקים אחרים בשרת יוכלו להשתמש בו
module.exports = passport;
