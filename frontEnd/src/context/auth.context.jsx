import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
AuthContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [tokenAuth, setTokenAuth] = useState(() =>
    localStorage.getItem("tokenAuth")
  );

  const login = (TOKEN) => {
    localStorage.setItem("tokenAuth", TOKEN);
    setTokenAuth(TOKEN);
  };

  const logOut = () => {
    localStorage.removeItem("tokenAuth");
    setTokenAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        tokenAuth,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
