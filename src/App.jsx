import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ProtectedRoutes from "./Routes/ProtectedRoute";
import { UserNameProvider} from './context/userName';

function App() {
  return (
    <>
      <UserNameProvider>
      <ToastContainer />

        <Router>




  
        {/* <Route path='/post/:id' element={<PostIndex/>} />
        <Route path='/profile-donations' element={<ProfileDonations/>} /> */}



        <ProtectedRoutes/>


          </Router>
      </UserNameProvider>
    </>
  );
}

export default App;
