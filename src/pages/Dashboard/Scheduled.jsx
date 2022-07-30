import { Center, Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
// import { Helmet } from "react-helmet";
import CommingSoon from "../../components/major/CommingSoon";
import { useEffect } from "react";

const Scheduled = () => {
  useEffect(() => {
    document.title = "Scheduled | Quickk Dashboard";
  }, []);
  return (
    <>
     
      <DashboardLayout>
        <Box>
          <CommingSoon />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Scheduled;
