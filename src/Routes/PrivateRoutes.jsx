import Home from "../pages/Home/Home";
import Protected from "./ProtectedRoute";
import { Route , Routes , BrowserRouter as Router } from "react-router-dom";
import DashboardIndex from "../pages/Dashboard/Dashboard";
import Donations from "../pages/Dashboard/Donations";
import Draft from "../pages/Dashboard/Draaft";
import Write from "../pages/Dashboard/Write";

import Scheduled from "../pages/Dashboard/Scheduled";
import Newslatter from "../pages/Dashboard/Newslatter";
import Analytics from "../pages/Dashboard/Analytics";
import Profile from "../pages/Profile/profile";
import NotFound from '../pages/NotFound/NotFound';


const Private = () => {
    return (
        <>




                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="*" element={<NotFound/>} />
                    <Route path="/dashboard" element={<DashboardIndex />} />
                    <Route path="/dashboard/draft" element={<Draft />} />
                    <Route path="/dashboard/donations" element={<Donations />} />
                    <Route path="/dashboard/explore" element={<Donations />} />
                  
                  
                    <Route path="/dashboard/scheduled" element={<Scheduled />} />
                    <Route path="/dashboard/newsletter" element={<Newslatter />} />
                    <Route path="/dashboard/analytics" element={<Analytics />} />
                    <Route path="/profile" element={<Profile />} /> 

                </Routes>
            
            
          
           
        </>
    )
}

export default Private;