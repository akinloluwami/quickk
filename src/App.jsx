import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from "react";
import ProtectedRoutes from "./Routes/ProtectedRoute";
import Loading from "./components/HomeKits/Loading";

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
