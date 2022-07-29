import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";
import CommingSoon from '../../components/major/CommingSoon';

const Scheduled = () => {
  return (
    <>
      <Helmet>
        <title>Scheduled | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
          <CommingSoon/>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Scheduled;
