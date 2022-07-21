import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Box, Input, Button, Flex, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
const Write = () => {
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const displayImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);

      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        console.log(e.target.result);
        setUploading(false);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <DashboardLayout>
        <Flex justifyContent={"center"} flexDirection={"column"}>
          <Flex margin={"10px"} justifyContent={"space-between"}>
            <Input
              ref={inputRef}
              type={"file"}
              onChange={displayImage}
              display={"none"}
            />
            {!image ? (
              <Button
                variantcolor={"teal"}
                onClick={() => {
                  handleClick();
                  displayImage();
                }}
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            ) : (
              <Text>Cover Image Uploaded</Text>
            )}
            <Button
              backgroundColor={"#0031af"}
              color={"#fff"}
              _hover={{ backgroundColor: "#0031af" }}
            >
              Publish
            </Button>
          </Flex>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            margin={"10px"}
            borderRadius={"10px"}
            backgroundColor={"#fff"}
            padding={"10px"}
            width={"100%"}
            height={"400px"}
            overflow={"hidden"}
            position={"relative"}
          >
            <Button
              onClick={() => {}}
              position={"absolute"}
              top={"0"}
              left={"0"}
            >
              x
            </Button>
            <img src={image} alt="" />
          </Box>
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
