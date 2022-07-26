import { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";
import { Text, Box } from "@chakra-ui/react";

const Links = () => {
  return (
    <>
      <Helmet>
        <title>Links | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
          <Text>Add Links</Text>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Links;
