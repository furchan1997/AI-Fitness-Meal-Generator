// פונקציה אשר מחזירה רכיב של תקציר והסבר על מהות האפליקציה

import Signin from "../signin";

function Header() {
  return (
    <header className="d-flex flex-column justify-content-center align-items-center text-center bg-light p-4 ">
      <h1>
        AI Fitness Meal Generator | 🧠 אפליקציית תזונה מותאמת אישית בשילוב בינה
        מלאכותית
      </h1>

      <p>
        האפליקציה נועדה לקידום בריאות ותזונה נכונה, ומתאימה במיוחד למפתחי גוף
        ולמתאמנים המעוניינים להעלות מסת שריר או להפחית אחוזי שומן. המשתמש יוצר
        פרופיל אישי הכולל נתונים פיזיולוגיים והעדפות תזונה, הנתונים עוברים תהליך
        עיבוד והעברה למנוע בינה מלאכותית, אשר מחזיר תפריט תזונתי מותאם אישית
        בהתאם לנתוני המשתמש.
      </p>
      <Signin />
    </header>
  );
}

export default Header;
