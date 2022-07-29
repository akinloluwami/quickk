import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";
import CommingSoon from '../../components/major/CommingSoon';

const Newslatter = () => {
  return (
    <>
      <Helmet>
        <title>Newsletter | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
          <CommingSoon/>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Newslatter;
