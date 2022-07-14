import { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { MobileNav } from "./Dashboard Components/MobileNav";
import DashboardTop from "./DashboardTop";
import Sidebar from "./Sidebar";
import { fetchData } from "../../utils/Request";
const DashboardLayout = ({ children }) => {
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState("");

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
    });
    setProfilePic(
      `https://avatars.dicebear.com/api/initials/${displayName}.svg`
    );
  }, [displayName]);

  return (
    <>
      <Box bg={"#FAFAFA"} h={"100vh"}>
        <DashboardTop displayName={displayName} profilePic={profilePic} />

        <Flex position={"relative"}>
          <Box bg={"#fff"} display={["none", "block"]}>
            <Sidebar />
          </Box>

          {/* Main display sections  */}
          <Box p="2em">
            <Box>{children}</Box>
          </Box>
        </Flex>

        {/* Display mobile tab on small device  */}

        <Box
          display={["block", "none"]}
          position={"fixed"}
          right={"0"}
          left={"0"}
          bottom={"0"}
        >
          <MobileNav />
        </Box>

        {/* mobile view tab end  */}
      </Box>
    </>
  );
};

export default DashboardLayout;
