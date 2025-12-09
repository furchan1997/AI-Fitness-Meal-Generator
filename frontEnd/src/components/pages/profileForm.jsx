// שימוש בספריית פורמיק עבור יצירה וניהול טופס יצירת פרופיל עבור משתמש
import { useFormik } from "formik";
import Input from "../input";
import { useEffect } from "react";
import AIProfileReport from "../aiProfileReport";
import { activity, targets } from "../../guidelines/sportActivity";
import { useAuth } from "../../context/auth.context";
import { useProfile } from "../../context/profile.context";
import { profileValidate } from "../../validtion/profile";

// רכיב טופס למטרת בניית פרופיל משתמש אשר ינחה את הבינה המלאכותית לתת דו''ח מותאם אישית כמה שאפשר ולבסוף הנפקת והצגת הדו''ח
function ProfileForm() {
  // const [isPending, startTransition] = useTransition(); // הוק שעוטף את הפונקציה שצריכה לרוץ ברקע
  const {
    createNewProfile,
    getMyProfiles,
    userProfiles,
    userProfile,
    preReport,
    profileAIReport,
    errorFromServer,
  } = useProfile();
  const { tokenAuth, user } = useAuth();

  console.log(userProfile);
  const form = useFormik({
    validateOnMount: false, // למען ביצוע ולידציה רק בעת ניסיון השליחה
    validateOnChange: true, // בכל פעם שהמשתמש משנה את הערך באחד מהשדות אז פורמיק יריץ את פונקציית הוולידציה
    validateOnBlur: true, // פורמיק יבצע ולידציה כאשר השדה מקבל פוקוס-כלומר המשתמש עובר לשדה אחר או יוצא מהשדה עם העכבר

    // ערכים התחלתיים
    initialValues: {
      fullName: "ari",
      gender: "זכר",
      age: 30,
      height: 178,
      weight: 75,
      target: "",
      activity: "קל",
      bodyFat: 39,
      kosher: true,
      vegetarian: false,
      favoFoods: "",
    },

    validate(value) {
      // סכמת ולידציה של ג'וי
      const { error } = profileValidate(value, { abortEarly: false });

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
    async onSubmit(profile, { resetForm }) {
      await createNewProfile(profile, tokenAuth);
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
          isInput
          label={"אחוזי שומן"}
          inputType={"number"}
          id={"bodyFat"}
          name={"bodyFat"}
          required
          {...form.getFieldProps("bodyFat")}
          error={form?.touched?.bodyFat && form?.errors?.["bodyFat"]}
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
          {/*ניצול מצב בו ה-isPending מופעל ובעזרתו לנהל מצב ההתנה של התגובה מהשרת*/}
          שלח
        </button>
      </form>

      {/* שימוש ברכיב דו''ח בינה מלאכותית */}
      <>
        <AIProfileReport
          aiReport={profileAIReport}
          error={errorFromServer}
          profile={userProfile}
          effectiveTarget={preReport?.effectiveTarget}
        />
      </>
    </div>
  );
}

export default ProfileForm;
