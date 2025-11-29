import { httpserviseObj } from "../services/httpServise";

// API עבור יצירת פרופיל משתמש חדש
export async function createUserProfile(profile, token) {
  const response = await httpserviseObj.post(
    "/api/profile/Create-profile/",
    profile,
    {
      headers: { "x-auth-token": token },
    }
  );
  return response;
}
