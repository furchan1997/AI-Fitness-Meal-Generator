// שימוש בספריית פורמיק עבור יצירה וניהול טופס יצירת פרופיל עבור משתמש
import { useFormik } from "formik";
import Input from "../input";

function ProfileForm() {
  const form = useFormik({
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
    },
  });

  return (
    <div>
      <h1>מלא את השדות</h1>
      <form className="w-25">
        <Input
          isInput
          label={"שם מלא"}
          inputType={"text"}
          id={""}
          name={""}
          required
        />
        <Input isSelect options={["זכר", "נקבה"]} id={""} name={""} required />
        <Input
          isInput
          label={"גיל"}
          inputType={"number"}
          id={""}
          name={""}
          required
        />
        <Input
          isInput
          label={"גובה"}
          inputType={"number"}
          id={""}
          name={""}
          required
        />
        <Input
          isInput
          label={"משקל"}
          inputType={"number"}
          id={""}
          name={""}
          required
        />
        <Input
          isSelect
          label={"מטרה ספורטיבית"}
          options={["בריאות כללית", "חיטוב", "מסה"]}
          inputType={"text"}
          id={""}
          name={""}
          required
        />
        <Input
          isSelect
          label={"פעילות ספורטיבית"}
          options={["נמוכה", "בינונית", "גבוהה"]}
          inputType={"text"}
          id={""}
          name={""}
          required
        />
        <Input chackBox label={"אוכל/ת כשר?"} id={""} name={""} />
        <Input chackBox label={"טבעוני/ת"} id={""} name={""} />
        <Input isTextArea label={"מאכלים מועדפים"} />
      </form>
    </div>
  );
}

export default ProfileForm;
