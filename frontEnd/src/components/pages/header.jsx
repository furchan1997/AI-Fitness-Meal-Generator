// פונקציה אשר מחזירה רכיב של תקציר והסבר על מהות האפליקציה
import { NavLink } from "react-router-dom";
import Signin from "../signin";
import { useAuth } from "../../context/auth.context";

function Header() {
  let display;
  const { tokenAuth, user } = useAuth();

  if (user) {
    display = (
      <>
        {user?.role === "admin" && (
          <NavLink to={"/admin-deshbored"}>אזור ניהול</NavLink>
        )}
        <NavLink to={"/user-profiles"}>הפרופיל שלי</NavLink>
        <NavLink to={"/profile-form"}>צור דו''ח</NavLink>
      </>
    );
  }

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
      {display}
    </header>
  );
}

export default Header;
