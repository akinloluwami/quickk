import { Box, Center } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";
import BlogBox from "./Components/BlogBox";

const Profile = () => {
  return (
    <>
      <DashboardLayout>
        <ProfileLayout>
          <Box>
            <BlogBox />
            <BlogBox />
          </Box>
        </ProfileLayout>
      </DashboardLayout>
    </>
  );
};

export default Profile;
