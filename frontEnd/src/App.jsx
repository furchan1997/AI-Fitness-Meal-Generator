import "./App.css";
import GoogleSucccess from "./components/googleSuccess";
import Header from "./components/pages/header";
import ProfileForm from "./components/pages/profileForm";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app min-vh-100 d-flex flex-column rtl">
      <Header /> {/* רכיב תקציר */}
      <Routes>
        <Route path="/auth/google/success" element={<GoogleSucccess />} />
      </Routes>
      <ProfileForm /> {/* טופס יעודי עבור יצירת פרופיל משתמש*/}
    </div>
  );
}

export default App;
