require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// קובץ ניווט עבור יצירת פרופיל משתמש
const profile = require("./routers/profile.js");

const PORT = 3001;
const CONNECTION_STRING_ATLAS = process.env.CONNECTION_STRING_ATLAS;
// יצירת מילדוואר אשר מאשר לשרת לקבל ולקרוא בקשות בפורמט ג'ייסון
app.use(express.json());
// מידלוואר עבור יצירת פרופיל למשתמש
app.use("/api/profile", profile);
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
