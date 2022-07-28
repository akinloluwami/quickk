import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";
import CommingSoon from "../../components/major/CommingSoon";

const Analytics = () => {
  return (
    <>
      <Helmet>
        <title>Analytics | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
           <CommingSoon/>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Analytics;
