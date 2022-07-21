import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Signup from "./pages/Signup/Signup";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import DashboardIndex from "./pages/Dashboard/Dashboard";
import Draft from "./pages/Dashboard/Draaft";
import Donations from "./pages/Dashboard/Donations";
import Write from "./pages/Dashboard/Write";
import Posts from './pages/Dashboard/Posts';
import Scheduled from './pages/Dashboard/Scheduled';
import Newslatter from './pages/Dashboard/Newslatter';
import Analytics from './pages/Dashboard/Analytics';
import Profile from './pages/Profile/profile';
import PostIndex from "./pages/Post/PostIndex";
import ProfileDonations from "./pages/Profile/profileDonations";
import NotFound from "./pages/NotFound/NotFound";


function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/dashboard/draft" element={<Draft />} />
          <Route path="/dashboard/donations" element={<Donations />} />
          <Route path="/dashboard/explore" element={<Donations />} />
          <Route path="/dashboard/write" element={<Write />} />
          <Route path="/dashboard/posts" element={<Posts />} />
          <Route path="/dashboard/scheduled" element={<Scheduled />} />
          <Route path="/dashboard/newsletter" element={<Newslatter />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />


          {/* Dynamic routes  */}
          <Route path='/post/:id' element={<PostIndex/>} />
          <Route path='/profile-donations' element={<ProfileDonations/>} />


          {/* Not found  */}
          <Route path="*" element={<NotFound/>} />
         

        </Routes>
      </Router>
    </>
  );
}

export default App;
