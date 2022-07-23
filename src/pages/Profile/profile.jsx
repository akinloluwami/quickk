import { Box, Center } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";
import BlogBox from "./Components/BlogBox";
import { fetchData } from "../../utils/Request";
import { useState, useEffect } from "react";

const Profile = () => {
  const username = window.location.pathname.split("/")[1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const response = fetchData(`/user/profile/${username}`);
    response.then((data) => {
      if (data.status === 200) {
        setLoading(false);
      } else {
        setError(true);
        setErrorMessage("User not found");
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      {loading ? (
        <Center>
          <Box>
            <Box>Loading...</Box>
          </Box>
        </Center>
      ) : error ? (
        <Center>
          <Box>
            <Box>{errorMessage}</Box>
          </Box>
        </Center>
      ) : (
        <ProfileLayout>
          <Box>
            <BlogBox />
            <BlogBox />
          </Box>
        </ProfileLayout>
      )}
    </>
  );
};

export default Profile;
