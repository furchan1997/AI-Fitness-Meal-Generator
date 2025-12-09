import User from "../src/components/pages/userPages/user";
import "./App.css";
import { ProtectedRoutes, ProtectedRouteAdmin } from "./common/protectedRoutes";
import GoogleSucccess from "./components/googleSuccess";
import AdminDeshbored from "./components/pages/admin/adminDeshbored";
import Header from "./components/pages/header";
import ProfileForm from "./components/pages/profileForm";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app min-vh-100 d-flex flex-column rtl">
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
      <Routes>
        <Route path="/auth/google/success" element={<GoogleSucccess />} />
      </Routes>
      <Routes>
        <Route
          path="/user-profiles"
          element={
            <ProtectedRoutes>
              <User />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/profile-form"
          element={
            <ProtectedRoutes>
              <ProfileForm />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/admin-deshbored"
          element={
            <ProtectedRouteAdmin>
              <AdminDeshbored />
            </ProtectedRouteAdmin>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
