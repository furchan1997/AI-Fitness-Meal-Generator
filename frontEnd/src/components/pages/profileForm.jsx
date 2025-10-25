// שימוש בספריית פורמיק עבור יצירה וניהול טופס יצירת פרופיל עבור משתמש
import { useFormik } from "formik";
import Input from "../input";
import { createUserProfile } from "../../services/userProfile";
import joi from "joi";
import { useState } from "react";
import AIProfileReport from "../aiProfileReport";
import { activity, targets } from "../../guidelines/sportActivity";

// רכיב טופס למטרת בניית פרופיל משתמש אשר ינחה את הבינה המלאכותית לתת דו''ח מותאם אישית כמה שאפשר ולבסוף הנפקת והצגת הדו''ח
function ProfileForm() {
  const [profileAIReport, setProfileAIReport] = useState({}); // שמירת דו''ח בינה מלאכותית שהתקבלה מהשרת בעזרת סטייט מותאם
  const [errorFromServer, setErrorFromServer] = useState(null); // שמירת השגיאות שהתקבלו מהשרת, שמירתן בסטייט למען מחווה למשתמש
  const [loading, setLoading] = useState(false); // סטייט אשר יראה מצב של המתנה בזמן בו ממתינים לתגובה מהשרת

  const form = useFormik({
    validateOnMount: false, // למען ביצוע ולידציה רק בעת ניסיון השליחה
    validateOnChange: true, // בכל פעם שהמשתמש משנה את הערך באחד מהשדות אז פורמיק יריץ את פונקציית הוולידציה
    validateOnBlur: true, // פורמיק יבצע ולידציה כאשר השדה מקבל פוקוס-כלומר המשתמש עובר לשדה אחר או יוצא מהשדה עם העכבר

    // ערכים התחלתיים
    initialValues: {
      fullName: "",
      gender: "",
      age: 30,
      height: 178,
      weight: 75,
      target: "",
      activity: "",
      kosher: true,
      vegetarian: false,
      favoFoods: "",
    },

    // סכמת ולידציה של ג'וי
    validate(value) {
      const schema = joi.object({
        fullName: joi.string().min(2).max(16).required(),
        gender: joi.string().valid("זכר", "נקבה").required(),
        age: joi.number().min(16).max(70).required(),
        height: joi.number().min(150).required(),
        weight: joi.number().min(30).required(),
        target: joi.string().valid("מסה", "חיטוב", "בריאות כללית").required(),
        activity: joi.string().valid("קל", "בינוני", "כבד").required(),
        kosher: joi.boolean().default(true),
        vegetarian: joi.boolean().default(false),
        favoFoods: joi.string().min(0).max(256).default("").optional(),
      });

      const { error } = schema.validate(value, { abortEarly: false });
      // אובייקט השגיאות ולידציה שיתפסו מג'וי
      const errors = {};
      if (!error) return {};

      // תפיסת שגיאות ושמירתן באובייקט השגיאות שנוצר למעלה
      for (const detali of error.details) {
        // לולאה שתרוץ ותתפוס את השגיאה הראשונה תשמור אותו כמפתח ואת ההודעה כערך
        const path = detali.path[0];
        errors[path] = detali.message;
      }
      return errors;
    },

    //  פונקציה אשר תשלח את ערכי הטופס לשרת
    async onSubmit(profile) {
      setErrorFromServer(null); //איפוס מצב השגיאות מהשרת
      setLoading(true); // איפוס מצב ההמתמנות

      try {
        const response = await createUserProfile(profile);
        setProfileAIReport(response?.data?.AI_Report); // שמירת הדו''ח
        return response?.data;
      } catch (err) {
        // טיפול במצבי שגיאה מהשרת
        if (err) {
          setLoading(false);
          setErrorFromServer(err?.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <h1>מלא/י את השדות</h1>
      <form
        className="w-50"
        onSubmit={form.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Input
          isInput
          label={"שם מלא"}
          inputType={"text"}
          id={"fullName"}
          name={"fullName"}
          required
          {...form.getFieldProps("fullName")} // מתודה של פורמיק שמחברת בין שדה קלט לטופס. היא מחזירה את כל הפרופס הדרושים לניהול הערך.
          error={form?.touched?.fullName && form?.errors?.["fullName"]}
        />
        <Input
          isSelect
          label={"מגדר"}
          options={["זכר", "נקבה"]}
          inputType={"text"}
          id={"gender"}
          name={"gender"}
          required
          {...form.getFieldProps("gender")}
          error={form?.touched?.gender && form?.errors?.["gender"]}
        />
        <Input
          isInput
          label={"גיל"}
          inputType={"number"}
          id={"age"}
          name={"age"}
          required
          {...form.getFieldProps("age")}
          error={form?.touched?.age && form?.errors?.["age"]}
        />
        <Input
          isInput
          label={"גובה"}
          inputType={"number"}
          id={"height"}
          name={"height"}
          required
          {...form.getFieldProps("height")}
          error={form?.touched?.height && form?.errors?.["height"]}
        />
        <Input
          isInput
          label={"משקל"}
          inputType={"number"}
          id={"weight"}
          name={"weight"}
          required
          {...form.getFieldProps("weight")}
          error={form?.touched?.weight && form?.errors?.["weight"]}
        />
        <Input
          isSelect
          guidanceRequired
          label={"מטרה ספורטיבית"}
          options={targets}
          inputType={"text"}
          id={"target"}
          name={"target"}
          required
          {...form.getFieldProps("target")}
          error={form?.touched?.target && form?.errors?.["target"]}
        />
        <Input
          isSelect
          guidanceRequired
          label={"פעילות ספורטיבית"}
          options={activity}
          inputType={"text"}
          id={"activity"}
          name={"activity"}
          required
          {...form.getFieldProps("activity")}
          error={form?.touched?.activity && form?.errors?.["activity"]}
        />
        <Input
          chackBox
          label={"אוכל/ת כשר?"}
          id={"kosher"}
          name={"kosher"}
          {...form.getFieldProps("kosher")}
          checked={form.values.kosher}
          onChange={(e) => form.setFieldValue("kosher", e.target.checked)}
        />
        <Input
          chackBox
          label={"טבעוני/ת"}
          id={"vegetarian"}
          name={"vegetarian"}
          {...form.getFieldProps("vegetarian")}
          checked={form.values.vegetarian}
          onChange={(e) => form.setFieldValue("vegetarian", e.target.checked)}
        />
        <Input
          isTextArea
          label={"מאכלים מועדפים"}
          id={"favoFoods"}
          name={"favoFoods"}
          {...form.getFieldProps("favoFoods")}
        />
        <button className="btn btn-primary fw-bold" type="submit">
          שלח/י
        </button>
      </form>

      {/* שימוש ברכיב דו''ח בינה מלאכותית */}
      <>
        <AIProfileReport
          aiReport={profileAIReport}
          loading={loading}
          error={errorFromServer}
        />
      </>
    </div>
  );
}

export default ProfileForm;
