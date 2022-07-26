import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const DonationsLayout = ({ children }) => {

    const tabs = [

        {

            name : 'Donations ', 
            path : '/dashboard/donations'


        } , 
        {

            name : 'Settings ', 
            path : '/dashboard/donations/settings'


        }

    ]

    return (

        <>

            <Box display={'flex'} gap={'2em'} justifyContent={'center'}>
               
                {
                    tabs.map( items => {
                        return (
                            <>
                                <NavLink to={items.path}>{items.name}</NavLink>
                            </>
                        )
                    })
                }
                
            </Box>
        
            <Box>
                { children }  
            </Box>
            
        </>
    )
}


export default DonationsLayout;