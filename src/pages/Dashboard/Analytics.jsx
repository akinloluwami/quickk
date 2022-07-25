import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";

const Analytics = () => {
  return (
    <>
      <Helmet>
        <title>Analytics | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
          <center>Working on Analytics</center>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Analytics;
