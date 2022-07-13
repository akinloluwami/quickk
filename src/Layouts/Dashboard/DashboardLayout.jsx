import { Box, Text , Flex} from "@chakra-ui/react";
import DashboardTop from './DashboardTop';
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {


    return (
        <>
        
          <Box bg={'#FAFAFA'} h={'100vh'}>

            <DashboardTop/>
        

            <Flex position={'relative'}>

                {/* sidebar  */}
                <Box bg={'#fff'}>

                    <Sidebar/>

                </Box>

                {/* Main display sections  */}
                <Box p='2em'>


                    <Box>
                     {children}
                    </Box>


                </Box>

            </Flex>


          </Box>
        
        </>
    )


}


export default DashboardLayout;