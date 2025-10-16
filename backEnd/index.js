const express = require("express");
const app = express();

const PORT = 3001;

// יצירת מילדוואר אשר מאשר לשרת לקבל ולקרוא בקשות בפורמט ג'ייסון
app.use(express.json());
// הפעלת השרת והאזנתו לפורט
app.listen(PORT, () => {
  console.log("Server listen to PORT:", PORT);
});
