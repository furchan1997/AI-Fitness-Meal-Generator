import { createContext, useContext, useEffect, useState } from "react";
import { createUserProfile, getProfiles } from "../services/userProfile";

export const ProfilehContext = createContext();
ProfilehContext.displayName = "Profile";

export function ProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState({}); // שמירת פרופיל משתמש סטייט מותאם
  const [preReport, setPreReport] = useState({});
  const [profileAIReport, setProfileAIReport] = useState({}); // שמירת דו''ח בינה מלאכותית שהתקבלה מהשרת בעזרת סטייט מותאם
  const [errorFromServer, setErrorFromServer] = useState(null); // שמירת השגיאות שהתקבלו מהשרת, שמירתן בסטייט למען מחווה למשתמש
  const [userProfiles, setUserProfiles] = useState([]); // שמירת מערך הפרופילים של משתמש

  const createNewProfile = async (profile, token) => {
    try {
      const response = await createUserProfile(profile, token);
      setProfileAIReport(response?.data?.AI_Report); // שמירת הדו''ח
      setUserProfile(response?.data?.profile); // שמירת פרופיל משתמש
      setPreReport(response?.data?.preReport); // שמירת דו''ח פרופיל ללא AI
      console.log(response?.data);
    } catch (err) {
      // טיפול במצבי שגיאה מהשרת
      if (err) {
        setErrorFromServer(err?.message);
        console.log(err);
      }

      if (err?.status === 401) {
        const errAuth =
          "עלייך להתחבר בכדי לקבל דו''ח מותאם אישית" || err?.message;
        setErrorFromServer(errAuth);
      }
    }
  };

  const getMyProfiles = async (token) => {
    try {
      const response = await getProfiles(token);
      setUserProfiles(response.data);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfilehContext.Provider
      value={{
        createNewProfile,
        getMyProfiles,
        userProfiles,
        userProfile,
        preReport,
        profileAIReport,
        errorFromServer,
      }}
    >
      {children}
    </ProfilehContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfilehContext);
}
