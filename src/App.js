import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ForgetPwdPage from "./pages/ForgetPwdPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <div className="container mx-auto">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/ForgetPassword" element={<ForgetPwdPage />} />
        <Route path="/UserProfile" element={<UserProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
