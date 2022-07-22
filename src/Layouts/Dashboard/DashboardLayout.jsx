import { useState, useEffect, useContext } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { MobileNav } from "./Dashboard Components/MobileNav";
import DashboardTop from "./DashboardTop";
import Sidebar from "./Sidebar";
import { fetchData } from "../../utils/Request";
import DashboardIndex from "../../pages/Dashboard/Dashboard";

// import Posts from "../../pages/Dashboard/Posts";

const DashboardLayout = ({ children }) => {

  //check if its authenticated 
  const [isAuthenticated, setIsAuthenticated] = useState( localStorage.getItem("token") ? true : false );

  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [username, setUsername] = useState("");

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
      setFollowing(res.data.following);
      setFollowers(res.data.followers);
      localStorage.setItem("userName", res.data.username);
    });
    setProfilePic(
      `https://avatars.dicebear.com/api/initials/${displayName}.svg`
    );
  }, [displayName]);

  return (
    <>
      <Box bg={"#FAFAFA"} h={"100vh"}>
        <DashboardTop displayName={displayName} profilePic={profilePic} />
        {/* <Posts username={username} /> */}
        {/* <DashboardIndex following={following} followers={followers} /> */}

        <Flex position={"relative"}>
          <Box bg={"#fff"} display={["none", "block"]}>
            <Sidebar />
          </Box>

          {/* Main display sections  */}
          <Box p={["1.5em", "2em"]} w={"100%"}>
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
          px={"0em"}
        >
          <MobileNav />
        </Box>

        {/* mobile view tab end  */}
      </Box>
    </>
  );
};

export default DashboardLayout;
