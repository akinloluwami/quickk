import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import {
  Box,
  Input,
  Button,
  Flex,
  Text,
  Textarea,
  Avatar,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { postData, fetchData, deleteData } from "../../utils/Request";

const EditProfile = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [domImage, setDomImage] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    const response = fetchData("/dashboard/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response.then((res) => {
      const user = res.data;
      const { bio, displayName, username, profilePicture } = user;
      setDisplayName(displayName);
      setUsername(username);
      setBio(bio);
      setProfilePicture(profilePicture);
    });
  }, []);

  const uploadProfilePicture = async () => {
    const formData = new FormData();
    formData.append("image", profilePicture);
    setUploading(true);
    const res = await postData("/dashboard/user/update/dp", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUploading(false);
    setProfilePicture(res.data.profilePicture);
    window.location.reload();
  };

  const handleImageInput = (e) => {
    setProfilePicture(e.target.files[0]);
    setFileSelected(true);
    setDomImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = () => {
    setUpdating(true);
    const data = {
      bio,
      displayName,
      username,
    };
    const response = postData("/dashboard/user/update", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response.then((res) => {
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        setUpdating(false);
      } else {
        toast.error(res.response.data.message);
        setUpdating(false);
      }
    });
  };
  const deleteProfilePicture = async () => {
    setDeleting(true);
    const response = deleteData("/dashboard/user/delete/dp", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response.then((res) => {
      if (res.status === 200) {
        toast.success("Profile picture deleted successfully");
        setProfilePicture("");
        setFileSelected(false);
        setDomImage(null);
        setDeleting(false);
        window.location.reload();
      } else {
        toast.error(res.response.data.message);
      }
    });
  };

  useEffect(() => {
    document.title = "Edit Profile | Quickk Dashboard";
  }, []);

  return (
    <>
      <DashboardLayout>
        <ToastContainer />

        <Box
          width={["100%", "80%", "60%", "50%"]}
          mx={"auto"}
          bg="white"
          px={"2em"}
          py={"2em"}
          borderRadius={"1em"}
        >
          <Text fontSize={"lg"} textAlign={"center"}>
            Profile Picture
          </Text>
          <Box my={"1em"}>
            <center>
              {/* {profilePicture ? (
                <Avatar my={"1em"} src={profilePicture} size={["lg", "xl"]} />
              ) : (
                <Avatar
                  src={`https://avatars.dicebear.com/api/initials/${displayName}.svg`}
                  size={["lg", "xl"]}
                  my={"1em"}
                />
              )} */}
              {domImage ? (
                <Avatar my={"1em"} src={domImage} size={["lg", "xl"]} />
              ) : (
                <Avatar
                  src={
                    profilePicture
                      ? profilePicture
                      : `https://avatars.dicebear.com/api/initials/${displayName}.svg`
                  }
                  size={["lg", "xl"]}
                  my={"1em"}
                />
              )}
            </center>

            <Flex>
              <Box display={"flex"} justifyContent={"center"} w={"100%"}>
                <Button size={"sm"} m="5px" onClick={handleClick} py={"1.5em"}>
                  {profilePicture !== ""
                    ? "Change Profile Picture"
                    : "Add Profile Picture"}
                </Button>
              </Box>

              <Input
                type={"file"}
                ref={inputRef}
                onChange={handleImageInput}
                display={"none"}
              />
              {profilePicture && (
                <Flex flexDir={"column"}>
                  <Button
                    size={"sm"}
                    m="5px"
                    onClick={deleteProfilePicture}
                    px={"2em"}
                    py={"1.5em"}
                  >
                    {deleting ? "Deleting..." : "Delete Profile Picture"}
                  </Button>
                </Flex>
              )}
            </Flex>

            <center>
              <Button
                my={"1em"}
                width="100px"
                onClick={uploadProfilePicture}
                display={fileSelected ? "block" : "none"}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </center>
          </Box>
          <Text fontSize="lg" my={"0.5em"}>
            Basic Info
          </Text>
          <Input
            placeholder="Username"
            marginBottom="10px"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Display name"
            marginBottom="10px"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            placeholder="Bio"
            marginBottom="10px"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <Button
            onClick={handleUpdate}
            disabled={updating}
            cursor="pointer"
            margin={"10px"}
            marginTop={"20px"}
            width="100%"
            bg={"blue.500"}
            color={"#fff"}
            py={"1.5em"}
            variant={"solid"}
            mb={["5em", "0"]}
            _hover={{
              background: "blue.600",
            }}
          >
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default EditProfile;
