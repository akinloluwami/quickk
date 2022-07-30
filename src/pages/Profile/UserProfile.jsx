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
import Links from "./Components/Links";
// import { Helmet } from "react-helmet";

function Donate() {
  const username = window.location.pathname.split("/")[1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const response = fetchData(`/user/profile/${username}`);
    response.then((data) => {
      if (data.status === 200) {
        setLoading(false);
        setDisplayName(data.data.user.displayName);
        console.log(data);
      } else {
        setError(true);
        setErrorMessage("User not found");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    document.title = `${displayName} | Profile`;
  }, [displayName]);
  return (
    <>
      {/* <Helmet>
        <title>{displayName} | Profile</title>
      </Helmet> */}
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
            <Flex justifyContent={"center"}>
              <Box>
                <ProfileBlock />
                <Box my={"1.5em"} display={['none' , 'block']}>
                 <Links />
                </Box>
              </Box>
            </Flex>

            <Box display={['block' , 'none']}>
              <Links />
            </Box>
          </ProfileLayout>
        )}
      </ContainerLayout>
    </>
  );
}

export default Donate;
