import { Box } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import DonationsLayout from "../../Layouts/DonationsLayout";
import DonationSettings from "../Dashboard/Donations";

const WalletSettings = () => {
    return (
        <>
        
            <DashboardLayout>
                <DonationsLayout>
                    <Box bg={'#fff'} 
                    width={['100%','50%']} 
                    mx={'auto'}>
                     <DonationSettings/>
                    </Box>
                </DonationsLayout>
            </DashboardLayout>

        </>
    )
}

export default WalletSettings;