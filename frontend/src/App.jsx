import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Landing_page from "./pages/Landing_page.jsx";


export const serverUrl = "http://localhost:3000";
const App = () => {
  return (
    <Routes>
      {/* Redirect the default URL to signup */}
      <Route path="/" element={<Navigate to="/signup" replace />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/landing_page" element={<Landing_page />} />

      </Routes>
  );
};

export default App;