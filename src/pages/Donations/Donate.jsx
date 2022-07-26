
import { Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import DonationsLayout from "../../Layouts/DonationsLayout";
import Donations from "../Dashboard/Donations";

const DonateRoute = () => {
    
    return (
        <>

            <DashboardLayout>
                <DonationsLayout>
                    
                    <Donations />
    
                </DonationsLayout>
            </DashboardLayout>
          
        </>
    )


}

export default DonateRoute;