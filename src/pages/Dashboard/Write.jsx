import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Box, Input, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";
import { postData } from "../../utils/Request";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Write = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [domImage, setDomImage] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const handleClick = () => {
    inputRef.current.click();
  };
  const uploadCoverImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    setUploading(true);
    const res = await postData("/post/upload-image", formData);
    setUploading(false);
    setCoverImageUrl(res.data.image);
    console.log(res);
  };

  const handleImageInput = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setDomImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handlePublish = async () => {
    setPublishing(true);
    if (image) {
      await uploadCoverImage();
    }
    const data = {
      title: postTitle,
      content: postContent,
      coverImageUrl: coverImageUrl,
    };
    const res = await postData("/post/create", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setPublishing(false);
    toast.success("Post created successfully");
    setTimeout(() => {
      navigate("/dashboard/posts");
    }, 2000);
  };

  return (
    <>
      <DashboardLayout>
        <ToastContainer />
        <Flex justifyContent={"center"} flexDirection={"column"}>
          <Flex margin={"10px"} justifyContent={"space-between"}>
            <Input
              ref={inputRef}
              type={"file"}
              onChange={handleImageInput}
              display={"none"}
            />
            {!image ? (
              <Button
                variantcolor={"teal"}
                onClick={() => {
                  handleClick();
                  handleImageInput();
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
              onClick={handlePublish}
              _hover={{ backgroundColor: "#0031af" }}
              disabled={
                !postTitle ||
                uploading ||
                postTitle.length < 10 ||
                !postContent ||
                postContent.length < 50 ||
                publishing
              }
            >
              {publishing ? "Publishing..." : "Publish"}
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
                onClick={() => {
                  handleRemoveImage();
                }}
                position={"absolute"}
                top={"15px"}
                left={"15px"}
                backgroundColor={"#fff"}
                color={"#0031af"}
                title={"Remove Cover Image"}
              >
                <FaTimes fontSize={"1.5em"} color={"red"} />
              </Button>
              <img src={domImage} alt="" />
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
          <Textarea
            placeholder={"Write your article..."}
            fontSize={"1.5em"}
            height={"100%"}
            fontWeight={"500"}
            py={"1em"}
            px={"1em"}
            borderRadius={"10px"}
            border={"1px solid #0031af"}
            marginTop={"10px"}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
          />
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default Write;
