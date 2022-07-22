import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Box, Input, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { fetchData } from "../../utils/Request";
import { UserNameContext } from '../../context/userName';

const Posts = () => {
 
  return (
    <>
      <DashboardLayout>
        <Box>
          <Text>Posts</Text>
        </Box>
      </DashboardLayout>
      
    </>
  );
};

export default Posts;
