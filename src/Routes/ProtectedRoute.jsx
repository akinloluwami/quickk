import React, {useState} from "react";
import { Route , Routes } from "react-router-dom";
import Home from '../pages/Home/Home';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

//function for protected routes

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                setIsAuthenticated(true);
                setIsLoading(false);
            } else {
                setIsAuthenticated(false);
                setIsLoading(false);
            }
        };
        checkAuth();
    }
    , []);
    return { isAuthenticated, isLoading, user, setUser };
}

//function for protected routes
const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
   
    //check if item is authenticated
    if (isAuthenticated) {
        // All private routes goes hereh
       return (
          <>
             
           
            <PrivateRoutes/>
            
          
          </>
       )
    } else {
        
        return (
            // All public Routes goes here 
            <>

               <PublicRoutes/>

            </>
        )
    }
    
    
    

}


    

export  default ProtectedRoutes;