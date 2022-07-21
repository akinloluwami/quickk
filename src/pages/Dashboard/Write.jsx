import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
const Write = () => {
  return (
    <>
      <DashboardLayout>
        <Flex justifyContent={"center"} flexDirection={"column"}>
          <Flex margin={"10px"} justifyContent={"space-between"}>
            <Button variantColor={"teal"}>Add Cover Image</Button>
            <Button backgroundColor={"red"}>Publish</Button>
          </Flex>
          <Input placeholder={"Title"} />
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default Write;
