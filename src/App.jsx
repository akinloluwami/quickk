import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ProtectedRoutes from "./Routes/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        {/* <Route path='/post/:id' element={<PostIndex/>} />
        <Route path='/profile-donations' element={<ProfileDonations/>} /> */}

        <ProtectedRoutes />
      </Router>
    </>
  );
}

export default App;
