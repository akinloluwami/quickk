import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
// import { Helmet } from "react-helmet";
import CommingSoon from "../../components/major/CommingSoon";
import { useEffect } from "react";

const Analytics = () => {
  useEffect(() => {
    document.title = "Analytics | Quickk Dashboard";
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Analytics | Quickk Dashboard</title>
      </Helmet> */}
      <DashboardLayout>
        <Box>
          <CommingSoon />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Analytics;
