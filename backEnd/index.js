require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("./config/passport"); // טוען את הגדרות גוגל
const session = require("express-session"); // נדרש לפאספורט בשלב הזה
const cookieParser = require("cookie-parser"); // שומר מידע זמני על המשתמש
// קובץ ניווט עבור יצירת פרופיל משתמש
const profile = require("./routers/profile.js");
// קובץ ניווט עבור מערכת התחברות
const auth = require("./routers/auth.js");
// מתשמשים
const user = require("./routers/user.js");

const PORT = 3001;
const CONNECTION_STRING_ATLAS = process.env.CONNECTION_STRING_ATLAS;
app.use(cors());
// יצירת מילדוואר אשר מאפשר לשרת לקבל ולקרוא בקשות בפורמט ג'ייסון
app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: "SomeSwssionSecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// מידלוואר עבור פרופיל למשתמש
app.use("/api/profile", profile);
// מידלוואר עבור מערכת התחברות
app.use("/api/auth", auth);
//מידלוואר עבור משתמשים במערכת
app.use("/api/users", user);

// הפעלת השרת והאזנתו לפורט
async function connect() {
  try {
    app.listen(PORT, () => {
      console.log("Server listen to PORT:", PORT);
    });
    await mongoose.connect(CONNECTION_STRING_ATLAS);
  } catch (err) {
    console.log(err);
  }
}
connect();
