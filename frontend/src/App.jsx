import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Forgot_password from "./pages/Forgot_password.jsx";
import useGetCurrentUser from "./hooks/useGetCurrentUser.jsx";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import useGetCity from "./hooks/useGetCity.jsx";


export const serverUrl = "http://localhost:3000";
const App = () => {

  useGetCurrentUser();
  useGetCity();
  const {userData} = useSelector((state) => state.user);


  return (
    <Routes>
      {/* Redirect the default URL to signup */}
      

      <Route path="/signup" element={!userData ? <SignUp />: <Navigate to="/" /> } />
      <Route path="/signin" element={!userData ? <SignIn />: <Navigate to="/" />} />
      <Route path="/forgot-password" element={!userData ? <Forgot_password />: <Navigate to="/" />} />
      <Route path="/" element={userData ? <Home />:<Navigate to="/signin" />} />
    </Routes>
  );
};

export default App;