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
import Draft from './pages/Dashboard/Draaft';
import Donations from './pages/Dashboard/Donations';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
