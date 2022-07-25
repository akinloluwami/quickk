import { Box, Text } from "@chakra-ui/react";
import React from "react";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";

function Donate() {
  return (
    <>
      <ContainerLayout>
      <ProfileLayout>
        <Box>
          <Text>Donate</Text>
        </Box>
      </ProfileLayout>
      </ContainerLayout>
    </>
  );
}

export default Donate;
