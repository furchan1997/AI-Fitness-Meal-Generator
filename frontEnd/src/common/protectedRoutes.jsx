import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export const ProtectedRoutes = ({ children }) => {
  const { user, logOut } = useAuth();
  if (user === null) {
    logOut();
    return <Navigate to={"/"} />;
  }

  return children;
};

export const ProtectedRouteAdmin = ({ children }) => {
  const { user, logOut } = useAuth();
  const { role } = user;

  if (role !== "admin") {
    logOut();
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoutes;
