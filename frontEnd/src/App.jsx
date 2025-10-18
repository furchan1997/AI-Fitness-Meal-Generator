import "./App.css";
import Header from "./components/pages/header";
import ProfileForm from "./components/pages/profileForm";

function App() {
  return (
    <div className="app min-vh-100 d-flex flex-column rtl">
      <Header /> {/* רכיב תקציר */}
      <ProfileForm /> {/* טופס יעודי עבור יצירת פרופיל משתמש*/}
    </div>
  );
}

export default App;
