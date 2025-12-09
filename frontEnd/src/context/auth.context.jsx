import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUsers } from "../services/user";

export const AuthContext = createContext();
AuthContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [tokenAuth, setTokenAuth] = useState(() =>
    localStorage.getItem("tokenAuth")
  );

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("tokenAuth");
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState([]);

  const login = (TOKEN) => {
    localStorage.setItem("tokenAuth", TOKEN);
    setTokenAuth(TOKEN);

    try {
      const payload = jwtDecode(TOKEN);
      setUser(payload);
    } catch {
      setUser(null);
    }
  };

  const logOut = () => {
    localStorage.removeItem("tokenAuth");
    setTokenAuth(null);
    setUser(null);
  };

  const getUsersDetalis = async (token) => {
    try {
      const response = await getUsers(token);
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        tokenAuth,
        login,
        logOut,
        getUsersDetalis,
        user,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
