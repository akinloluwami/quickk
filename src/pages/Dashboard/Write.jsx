import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import {
  Box,
  Input,
  Button,
  Flex,
  Text,
  Textarea,
  Container,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";
import { postData } from "../../utils/Request";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
// import { Helmet } from "react-helmet";
import Editor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Write = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [domImage, setDomImage] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };
  const uploadCoverImage = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    setUploading(true);
    const res = await postData("/post/upload-image", formData);
    setUploading(false);
    console.log(res);
    if (res.code === "ERR_BAD_REQUEST") {
      setError(true);
      setErrorMessage(res.response.data.message);
    } else {
      setCoverImageUrl(res.data.image);
    }
  };

  const handleImageInput = (e) => {
    setImage(e.target.files[0]);
    setDomImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (image) {
      uploadCoverImage();
    }
  }, [image]);

  const handleRemoveImage = () => {
    setImage(null);
    setDomImage(null);
    setCoverImageUrl("");
  };

  const handlePublish = async () => {
    setPublishing(true);
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
    toast.success("Post created successfully");
    setTimeout(() => {
      navigate("/dashboard/posts");
    }, 2000);
  };
  /*Select text to change formatting, add headers, or create links.*/

  useEffect(() => {
    document.title = postTitle ? `Editing "${postTitle}"` : "Create New Post";
  }, [postTitle]);

  return (
    <>
      {/* <Helmet>
        <title>
          {postTitle ? `Editing "${postTitle}"` : "Create New Post"}
        </title>
      </Helmet> */}
      <DashboardLayout>
        <ToastContainer />
        <Container maxW={["100%", "80%"]}>
          <Flex justifyContent={"center"} flexDirection={"column"}>
            <Flex
              margin={"10px"}
              justifyContent={"space-between"}
              position={"relative"}
            >
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
                  Select Cover Image
                </Button>
              ) : (
                <Box>
                  {uploading ? (
                    <Text>Uploading...</Text>
                  ) : (
                    <>
                      {errorMessage ? (
                        <Text color={"red"} fontSize={"sm"} fontWeight={"bold"}>
                          {errorMessage}
                          <Button
                            color={"#fff"}
                            backgroundColor="rgba(0,0,255,0.3)"
                            mx={2}
                            onClick={() => {
                              handleClick();
                              handleImageInput();
                            }}
                          >
                            Choose another image
                          </Button>
                        </Text>
                      ) : (
                        <Button>
                          <Text color={"teal"}>
                            Image uploaded successfully
                          </Text>
                        </Button>
                      )}
                    </>
                  )}
                </Box>
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
            {image && !error && (
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
            <Box>
              {postTitle && postTitle.length < 10 && (
                <Text>
                  Title must be at least 10 characters long and cannot be empty.
                </Text>
              )}
              {postTitle && postTitle.length < 10 && (
                <Box
                  m={2}
                  borderRadius={"20px"}
                  width={`${postTitle.length * 10}%`}
                  height={"5px"}
                  backgroundColor={
                    postTitle.length < 5
                      ? "red"
                      : postTitle.length < 10
                      ? "#fddc01"
                      : "green"
                  }
                ></Box>
              )}
            </Box>
            <Input
              placeholder={"Article Title..."}
              fontSize={"1.5em"}
              height={"1em"}
              fontWeight={"500"}
              py={"1em"}
              mb={"1em"}
              onChange={(e) => {
                setPostTitle(e.target.value.trim());
              }}
            />
            <Box>
              {postContent && postContent.length < 50 && (
                <Text>
                  Content must be at least 50 characters long and cannot be
                  empty.
                </Text>
              )}
              {postContent && postContent.length < 50 && (
                <Box
                  width={`${postContent.length * 2}%`}
                  height={"5px"}
                  borderRadius={"20px"}
                  backgroundColor={
                    postContent.length < 25
                      ? "red"
                      : postContent.length < 50
                      ? "#fddc01"
                      : "green"
                  }
                ></Box>
              )}
            </Box>
            <Textarea
              placeholder={"Write your article..."}
              fontSize={"1.5em"}
              height={"300px"}
              fontWeight={"500"}
              py={"1em"}
              px={"1em"}
              borderRadius={"10px"}
              border={"1px solid #0031af"}
              marginTop={"10px"}
              onChange={(e) => {
                setPostContent(e.target.value.trim());
              }}
            />
            {/* <Editor
              options={{
                toolbar: {
                  buttons: [
                    "bold",
                    "italic",
                    "underline",
                    "anchor",
                    "h2",
                    "h3",
                    "quote",
                  ],
                },
                placeholder: {
                  text: "Write your article...",
                  hideOnClick: true,
                },
              }}
              placeholder={"Write your article..."}
              onChange={(value) => {
                setPostContent(value);
                console.log(value);
              }}
              style={{
                borderRadius: "10px",
                border: "1px solid #0031af",
                marginTop: "30px",
                padding: "20px",
                height: "350px",
                fontSize: "1.5em",
                fontWeight: "400",
                overflowY: "scroll",
              }}
            /> */}
            {/* <CKEditor
            editor={ClassicEditor}
            data={postContent}
            onChange={(value, editor, event) => {
              setPostContent(value);
              const data = editor.getData();
              console.log({ data, event, editor });
            }}
            placeholder={"Write your article..."}
            toolbar={{
              options: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "undo",
                "redo",
              ],
            }}
            style={{
              borderRadius: "10px",
              border: "1px solid #0031af",
              marginTop: "10px",
              padding: "10px",
              height: "fit-content",
              fontSize: "1.5em",
              fontWeight: "500",
            }}
          /> */}
          </Flex>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default Write;
