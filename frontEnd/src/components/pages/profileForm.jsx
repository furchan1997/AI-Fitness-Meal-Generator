// שימוש בספריית פורמיק עבור יצירה וניהול טופס יצירת פרופיל עבור משתמש
import { useFormik } from "formik";
import Input from "../input";
import { createUserProfile } from "../../services/userProfile";

function ProfileForm() {
  const form = useFormik({
    validateOnMount: false, // למען ביצוע ולידציה רק בעת ניסיון השליחה
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
    //  פונקציה אשר תשלח את ערכי הטופס לשרת
    async onSubmit(profile) {
      console.log(profile);
      try {
        const response = await createUserProfile(profile);
        console.log(response);
        return response?.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      <h1>מלא את השדות</h1>
      <form
        className="w-25"
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
          {...form.getFieldProps("fullName")}
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
        />
        <Input
          isInput
          label={"גיל"}
          inputType={"number"}
          id={"age"}
          name={"age"}
          required
          {...form.getFieldProps("age")}
        />
        <Input
          isInput
          label={"גובה"}
          inputType={"number"}
          id={"height"}
          name={"height"}
          required
          {...form.getFieldProps("height")}
        />
        <Input
          isInput
          label={"משקל"}
          inputType={"number"}
          id={"weight"}
          name={"weight"}
          required
          {...form.getFieldProps("weight")}
        />
        <Input
          isSelect
          label={"מטרה ספורטיבית"}
          options={["בריאות כללית", "חיטוב", "מסה"]}
          inputType={"text"}
          id={"target"}
          name={"target"}
          required
          {...form.getFieldProps("target")}
        />
        <Input
          isSelect
          label={"פעילות ספורטיבית"}
          options={["קל", "בינוני", "כבד"]}
          inputType={"text"}
          id={"activity"}
          name={"activity"}
          required
          {...form.getFieldProps("activity")}
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
    </div>
  );
}

export default ProfileForm;
