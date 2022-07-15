import {Box, Center} from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";

const Profile = () => {
    return (
        <>

           <DashboardLayout>

                    <ProfileLayout>
                        <Box>
                            lore
                        </Box>
                    </ProfileLayout>

           </DashboardLayout>
        
        </>
    )
}

export default Profile;