import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Box, Input, Button, Flex, Text } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";
const Write = () => {
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [postTitle, setPostTitle] = useState("");

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
              disabled={
                !postTitle || !image || uploading || postTitle.length < 10
              }
            >
              Publish
            </Button>
          </Flex>
          {image && (
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
                top={"15px"}
                left={"15px"}
                backgroundColor={"#fff"}
                color={"#0031af"}
                title={"Remove Cover Image"}
              >
                <FaTimes fontSize={"1.5em"} color={"red"} />
              </Button>
              <img src={image} alt="" />
            </Box>
          )}
          <Input
            placeholder={"Article Title..."}
            fontSize={"2em"}
            height={"1em"}
            fontWeight={"500"}
            py={"1em"}
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          />
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default Write;
