import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";
const Write = () => {
  const inputRef = useRef();
  const [displayImage, setDisplayImage] = useState("");
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    console.log("fileObj is", fileObj);
    event.target.value = null;
    console.log(event.target.files);
    console.log(fileObj);
    console.log(fileObj.name);
  };
  return (
    <>
      <DashboardLayout>
        <Flex justifyContent={"center"} flexDirection={"column"}>
          <Flex margin={"10px"} justifyContent={"space-between"}>
            <Input
              ref={inputRef}
              type={"file"}
              display={"none"}
              onChange={handleFileChange}
            />
            <Button variantcolor={"teal"} onClick={handleClick}>
              Add Cover Image
            </Button>
            <Button
              backgroundColor={"#0031af"}
              color={"#fff"}
              _hover={{ backgroundColor: "#0031af" }}
            >
              Publish
            </Button>
          </Flex>
          <Input
            placeholder={"Article Title..."}
            fontSize={"2em"}
            height={"1em"}
            fontWeight={"500"}
            py={"1em"}
          />
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default Write;
