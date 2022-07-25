import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";

const Donations = () => {
  return (
    <>
      <Helmet>
        <title>Donations | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
          <center>No donations yet !</center>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Donations;
