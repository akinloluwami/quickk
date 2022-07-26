import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const DonationsLayout = ({ children }) => {

    const tabs = [

        {

            name : 'Donations ', 
            path : ''


        } ,
        {

            name : 'Settings ', 
            path : ''


        }

    ]

    return (
        
        <>

            <Box>
               
                {
                    tabs.map( items => {
                        return (
                            <>
                                hi
                            </>
                        )
                    })
                }
                
            </Box>
        
            { children }  
            
        </>
    )
}


export default DonationsLayout;