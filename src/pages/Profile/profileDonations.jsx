import {Box, Center} from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";
import BlogBox from './Components/BlogBox';
import DonationBox from "./Components/DonationBox";

const ProfileDanotaions = () => {
    return (
        <>

           <DashboardLayout>

                    <ProfileLayout>
                        <Box>
                            <DonationBox/>
                        </Box>
                    </ProfileLayout>

           </DashboardLayout>
        
        </>
    )
}

export default ProfileDanotaions;