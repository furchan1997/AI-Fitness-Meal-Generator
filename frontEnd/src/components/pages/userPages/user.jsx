import { useEffect } from "react";
import { useProfile } from "../../../context/profile.context";
import { useAuth } from "../../../context/auth.context";
import Profile from "../../baseProfile";

function User() {
  const { getMyProfiles, userProfiles } = useProfile();
  const { tokenAuth, user } = useAuth();
  let displayProfiles;

  useEffect(() => {
    getMyProfiles(tokenAuth);
    console.log(user);
    console.log(tokenAuth);
  }, []);

  console.log(userProfiles);

  if (userProfiles?.length === 0) {
    displayProfiles = "אין לך פרופילים לתצוגה...";
  } else {
    displayProfiles = userProfiles?.map((profile) => {
      return (
        <Profile
          profile={profile}
          effectiveTarget={profile?.preReport?.effectiveTarget}
        />
      );
    });
  }

  return <div>{displayProfiles}</div>;
}

export default User;
