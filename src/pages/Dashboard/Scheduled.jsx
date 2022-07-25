import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";

const Scheduled = () => {
  return (
    <>
      <Helmet>
        <title>Scheduled | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
          <center>No Scheduled yet !</center>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Scheduled;
