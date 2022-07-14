import { Box, Text, Flex } from "@chakra-ui/react";
import MobileNav from "./Dashboard Components/MobileNav";
import DashboardTop from "./DashboardTop";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const name = "Akinwale";

  return (
    <>
      <Box bg={"#FAFAFA"} h={"100vh"}>
        <DashboardTop displayName={name} />

        <Flex position={"relative"}>
          <Box bg={"#fff"} display = {['none','block']}>
            <Sidebar />
          </Box>

          {/* Main display sections  */}
          <Box p="2em">
            <Box>{children}</Box>
            
          </Box>

        </Flex>
        


        {/* Display mobile tab on small device  */}

         <Box display={['block' , 'none']}
          position={'fixed'}
          right={'0'}
          left={'0'}
          bottom={'0'}
          >
          
            <MobileNav/>
         </Box>

        {/* mobile view tab end  */}
      </Box>

      
    </>
  );
};

export default DashboardLayout;
