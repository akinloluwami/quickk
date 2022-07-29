import Home from "../pages/Home/Home";
import Protected from "./ProtectedRoute";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import DashboardIndex from "../pages/Dashboard/Dashboard";
import Donations from "../pages/Dashboard/Donations";
import Draft from "../pages/Dashboard/Draaft";
import Write from "../pages/Dashboard/Write";
import EditPost from "../pages/Dashboard/Edit";
import Scheduled from "../pages/Dashboard/Scheduled";
import Newslatter from "../pages/Dashboard/Newslatter";
import Analytics from "../pages/Dashboard/Analytics";
import Posts from "../pages/Dashboard/Posts";
import Profile from "../pages/Profile/profile";
// import NotFound from "../pages/NotFound/NotFound";
import User from "../pages/User";
import BlogPost from "../pages/BlogPost";
import EditProfile from "../pages/Dashboard/EditProfile";
import Donate from "../pages/Profile/Donate";
import UserProfile from "../pages/Profile/UserProfile";
import Links from "../pages/Dashboard/Links";
import Settings from "../pages/Dashboard/Settings";
import DonateRoute from "../pages/Donations/Donation";
import WalletSettings from "../pages/Donations/WalletSettings";

const Private = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardIndex />} />
        <Route path="/:username" element={<User />} />
        <Route path="/dashboard/overview" element={<DashboardIndex />} />
        <Route path="/dashboard/draft" element={<Draft />} />
        <Route path="/dashboard/write" element={<Write />} />
        {/* <Route path="/dashboard/donations" element={<Donations />} /> */}

        <Route path="/dashboard/explore" element={<Donations />} />
        <Route path="/dashboard/posts" element={<Posts />} />
        <Route path="/dashboard/scheduled" element={<Scheduled />} />
        <Route path="/dashboard/newsletter" element={<Newslatter />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/links" element={<Links />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:username/:slug" element={<BlogPost />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/:username/donate" element={<Donate />} />
        <Route path="/:username/profile" element={<UserProfile />} />
        {/* this is the default present route that shows on donation page  */}
        <Route path="/dashboard/donations" element={<DonateRoute />} />
        {/* display when donation route is clicked  */}
        <Route path="/dashboard/donation" element={<DonateRoute />} />
        <Route
          path="/dashboard/donations/settings"
          element={<WalletSettings />}
        />
        <Route path="/dashboard/post/:slug/edit" element={<EditPost />} />
      </Routes>
    </>
  );
};

export default Private;
