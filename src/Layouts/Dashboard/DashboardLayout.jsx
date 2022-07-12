import { Box, Text , Flex} from "@chakra-ui/react";
import DashboardTop from './DashboardTop';
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {


    return (
        <>
        
          <Box bg={'#FAFAFA'} h={'100vh'}>

            <DashboardTop/>
        

            <Flex>

                {/* sidebar  */}
                <Box>

                    <Sidebar/>

                </Box>

                {/* Main display sections  */}
                <Box p='1em'>


                    {children}


                </Box>

            </Flex>


          </Box>
        
        </>
    )


}


export default DashboardLayout;