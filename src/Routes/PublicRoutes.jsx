import { Route, Routes, Router } from "react-router-dom";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import User from "../pages/User";
import NotFound from "../pages/NotFound/NotFound";
import BlogPost from "../pages/BlogPost";
import Donate from "../pages/Profile/Donate";
import UserProfile from "../pages/Profile/UserProfile";
import Homepage from '../pages/Home/Homepage';

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<User />} />
        <Route path="/homepage" element = {<Homepage/>} />
        <Route path="/:username" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/:username/:slug" element={<BlogPost />} />
        <Route path="/:username/donate" element={<Donate />} />
        <Route path="/:username/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
