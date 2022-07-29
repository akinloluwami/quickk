import { Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import DonationsLayout from "../../Layouts/DonationsLayout";
import Donations from "../Dashboard/Donations";
import Donate from "./Donate";

const DonateRoute = () => {
  return (
    <>
      <DashboardLayout>
        <DonationsLayout>
          <Donate />
        </DonationsLayout>
      </DashboardLayout>
    </>
  );
};

export default DonateRoute;
