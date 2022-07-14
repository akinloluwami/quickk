import { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import DashboardTop from "./DashboardTop";
import Sidebar from "./Sidebar";
import { fetchData } from "../../utils/Request";
const DashboardLayout = ({ children }) => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const response = fetchData("/dashboard/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response.then((res) => {
      setDisplayName(res.data.displayName);
      // console.log(res);
    });
  }, []);

  return (
    <>
      <Box bg={"#FAFAFA"} h={"100vh"}>
        <DashboardTop displayName={displayName} />

        <Flex position={"relative"}>
          <Box bg={"#fff"} display={["none", "block"]}>
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
