import Home from "../pages/Home/Home";
import Protected from "./ProtectedRoute";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import DashboardIndex from "../pages/Dashboard/Dashboard";
import Donations from "../pages/Dashboard/Donations";
import Draft from "../pages/Dashboard/Draaft";
import Write from "../pages/Dashboard/Write";
import Scheduled from "../pages/Dashboard/Scheduled";
import Newslatter from "../pages/Dashboard/Newslatter";
import Analytics from "../pages/Dashboard/Analytics";
import Posts from "../pages/Dashboard/Posts";
import Profile from "../pages/Profile/profile";
// import NotFound from "../pages/NotFound/NotFound";
import User from "../pages/User";
const Private = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashboardIndex/>} />
        <Route path=":/username" element={<User />} />
        <Route path="/dashboard" element={<DashboardIndex />} />
        <Route path="/dashboard/draft" element={<Draft />} />
        <Route path="/dashboard/write" element={<Write />} />
        <Route path="/dashboard/donations" element={<Donations />} />
        <Route path="/dashboard/explore" element={<Donations />} />
        <Route path="/dashboard/posts" element={<Posts />} />
        <Route path="/dashboard/scheduled" element={<Scheduled />} />
        <Route path="/dashboard/newsletter" element={<Newslatter />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Private;
