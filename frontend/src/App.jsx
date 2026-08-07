import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Forgot_password from "./pages/Forgot_password.jsx";


export const serverUrl = "http://localhost:3000";
const App = () => {
  return (
    <Routes>
      {/* Redirect the default URL to signup */}
      <Route path="/" element={<Navigate to="/signup" replace />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<Forgot_password />} />

      </Routes>
  );
};

export default App;