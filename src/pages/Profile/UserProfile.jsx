import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";
import BlogBox from "./Components/BlogBox";
import { fetchData, postData } from "../../utils/Request";
import { useState, useEffect } from "react";
import LoadingProfile from "../../components/minor/LoadingProfile";
import NoUser from "../../components/minor/NoUser";
import ProfileBlock from "./ProfileBlock";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
function Donate() {
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

      <ContainerLayout>
      {loading ? (
        <Center>
          <Box>
            <LoadingProfile />
          </Box>
        </Center>
      ) : error ? (
        <Center>
          <Box>
            <NoUser message={errorMessage} />
          </Box>
        </Center>
      ) : (
        <ProfileLayout>
          <Box>
            <ProfileBlock />
          </Box>
        </ProfileLayout>
      )}
      </ContainerLayout>

    </>
  );
}

export default Donate;
