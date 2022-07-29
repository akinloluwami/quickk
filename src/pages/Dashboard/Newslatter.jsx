import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
// import { Helmet } from "react-helmet";
import CommingSoon from "../../components/major/CommingSoon";
import { useEffect } from "react";

const Newslatter = () => {
  useEffect(() => {
    document.title = "Newsletter | Quickk Dashboard";
  }, []);
  return (
    <>
      {/* <Helmet>
        <title>Newsletter | Quickk Dashboard</title>
      </Helmet> */}
      <DashboardLayout>
        <Box>
          <CommingSoon />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Newslatter;
