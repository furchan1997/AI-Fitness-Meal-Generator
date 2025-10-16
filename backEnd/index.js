const express = require("express");
const app = express();
// קובץ ניווט עבור יצירת פרופיל משתמש
const profile = require("./routers/profile.js");

const PORT = 3001;

// יצירת מילדוואר אשר מאשר לשרת לקבל ולקרוא בקשות בפורמט ג'ייסון
app.use(express.json());
// מידלוואר עבור יצירת פרופיל למשתמש
app.use("/api/profile", profile);
// הפעלת השרת והאזנתו לפורט
app.listen(PORT, () => {
  console.log("Server listen to PORT:", PORT);
});
