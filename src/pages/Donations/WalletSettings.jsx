import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
// import { Helmet } from "react-helmet";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import DonationsLayout from "../../Layouts/DonationsLayout";
import DonationSettings from "../Dashboard/Donations";

const WalletSettings = () => {
  useEffect(() => {
    document.title = "Wallet Settings | Quickk Dashboard";
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Donation Settings | Quickk Dashboard</title>
      </Helmet> */}
      <DashboardLayout>
        <DonationsLayout>
          <Box bg={"#fff"} width={["100%", "50%"]} mx={"auto"}>
            <DonationSettings />
          </Box>
        </DonationsLayout>
      </DashboardLayout>
    </>
  );
};

export default WalletSettings;
