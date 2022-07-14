import { Box, Text, Flex } from "@chakra-ui/react";
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
      </Box>
    </>
  );
};

export default DashboardLayout;
