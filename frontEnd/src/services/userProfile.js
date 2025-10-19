import { httpserviseObj } from "../services/httpServise";

// API עבור יצירת פרופיל משתמש חדש
export async function createUserProfile(profile) {
  const response = await httpserviseObj.post(
    "/api/profile/Create-profile/",
    profile
  );
  return response;
}
