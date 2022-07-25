import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Helmet } from "react-helmet";

const Newslatter = () => {
  return (
    <>
      <Helmet>
        <title>Newsletter | Quickk Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box>
          <center>Newsletter is comming soon !</center>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Newslatter;
