
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Forgot_password from "./pages/Forgot_password.jsx";
import useGetCurrentUser from "./hooks/useGetCurrentUser.jsx";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItems from "./pages/AddItems.jsx";
import EditItems from "./pages/EditItems.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";

export const serverUrl = "http://localhost:3000";

const App = () => {
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  useGetShopByCity();

  const { userData, loading } = useSelector((state) => state.user);

  // Prevent premature redirect while fetching user info
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-[#fff9f6]">
        <div className="text-xl font-bold text-[#ff4d2d] animate-pulse">
          Loading FoodVingo...
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <Forgot_password /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />
      <Route path="*" element={<Navigate to={userData ? "/" : "/signin"} />} />

      <Route path="/create-edit-shop" element={userData ? <CreateEditShop /> : <Navigate to={userData ? "/" : "/signin"} />} />

      <Route path="/add-items" element={userData ? <AddItems /> : <Navigate to={userData ? "/" : "/signin"} />} />

      <Route path="/edit-items/:itemId" element={userData ? <EditItems /> : <Navigate to={userData ? "/" : "/signin"} />} />
    </Routes>
  );
};

export default App;