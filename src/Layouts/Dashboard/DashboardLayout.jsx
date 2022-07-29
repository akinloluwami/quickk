import { useState, useEffect, useContext } from "react";
import { Box, Text, Flex, Spacer, HStack } from "@chakra-ui/react";
import { MobileNav } from "./Dashboard Components/MobileNav";
import DashboardTop from "./DashboardTop";
import Sidebar from "./Sidebar";
import { fetchData } from "../../utils/Request";
import DashboardIndex from "../../pages/Dashboard/Dashboard";

// import Posts from "../../pages/Dashboard/Posts";

const DashboardLayout = ({ children }) => {
  //check if its authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

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
      setUsername(res.data.username);
      if (res.data.profilePicture !== "") {
        setProfilePic(res.data.profilePicture);
      } else {
        setProfilePic(
          `https://avatars.dicebear.com/api/initials/${displayName}.svg`
        );
      }
      localStorage.setItem("userName", res.data.username);
    });
  }, [displayName]);

  return (
    <>
      <Box bg={"#FAFAFA"} h={"100vh"}>
        <DashboardTop
          displayName={displayName}
          profilePic={profilePic}
          username={username}
        />
        {/* <Posts username={username} /> */}
        {/* <DashboardIndex following={following} followers={followers} /> */}

        <Flex position={"relative"} justifyContent={"center"}>
          {/* check if its authenticate  */}

          {isAuthenticated ? (
            <>
              <Box
                bg={"#fff"}
                position={"fixed"}
                top={0}
                bottom={0}
                zIndex={"1"}
                overflow={"hidden"}
                left="0"
                display={["none", "block"]}
              >
                <Sidebar />
              </Box>
            </>
          ) : (
            <>
              <Box bg={"#fff"} display={["none"]}>
                <Sidebar />
              </Box>
            </>
          )}

          <Spacer />

          {/* Main display sections  */}
          {isAuthenticated ? (
            <>
              <Box
                p={["1.5em", "2em"]}
                w={["100%", "82%"]}
                mx={"auto"}
                position={"relative"}
              >
                <Box>{children}</Box>
              </Box>
            </>
          ) : (
            <>
              <center>
                <Box p={["1.5em", "2em"]} justifyContent={"center"} w={"100%"}>
                  <Box>{children}</Box>
                </Box>
              </center>
            </>
          )}
        </Flex>

        {/* Display mobile tab on small device  */}

        {isAuthenticated ? (
          <>
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
          </>
        ) : (
          <>
            <Box
              display={["none"]}
              position={"fixed"}
              right={"0"}
              left={"0"}
              bottom={"0"}
              px={"0em"}
            >
              <MobileNav />
            </Box>
          </>
        )}

        {/* mobile view tab end  */}
      </Box>
    </>
  );
};

export default DashboardLayout;
