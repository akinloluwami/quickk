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
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [website, setWebsite] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
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
      const {
        bio,
        displayName,
        username,
        profilePicture,
        twitter,
        instagram,
        youtube,
        tiktok,
        website,
        walletAddress,
      } = user;
      setDisplayName(displayName);
      setUsername(username);
      setBio(bio);
      setProfilePicture(profilePicture);
      setTwitter(twitter);
      setInstagram(instagram);
      setYoutube(youtube);
      setTiktok(tiktok);
      setWebsite(website);
      setWalletAddress(walletAddress);
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
    const reader = new FileReader();
    reader.onload = (e) => {
      setDomImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = () => {
    setUpdating(true);
    const data = {
      bio,
      displayName,
      username,
      twitter,
      instagram,
      youtube,
      tiktok,
      website,
      walletAddress,
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

  return (
    <>
      <DashboardLayout>
        <ToastContainer />
        <Box>
          <Text fontSize={"lg"}>Profile Picture</Text>
          <Box>
            {profilePicture ? (
              <Avatar src={profilePicture} size={"xl"} />
            ) : (
              <Avatar
                src={`https://avatars.dicebear.com/api/initials/${displayName}.svg`}
                size={"xl"}
              />
            )}
            <Flex>
              <Button size={"sm"} m="5px" onClick={handleClick}>
                {profilePicture !== ""
                  ? "Change Profile Picture"
                  : "Add Profile Picture"}
              </Button>

              <Input
                type={"file"}
                ref={inputRef}
                onChange={handleImageInput}
                display={"none"}
              />
              {profilePicture && (
                <Button size={"sm"} m="5px" onClick={deleteProfilePicture}>
                  {deleting ? "Deleting..." : "Delete Profile Picture"}
                </Button>
              )}
            </Flex>
            <Button
              width="100px"
              onClick={uploadProfilePicture}
              display={fileSelected ? "block" : "none"}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
          <Text fontSize="lg">Basic Info</Text>
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
          <Text fontSize="lg">Social links</Text>
          <Input
            placeholder="Twitter"
            marginBottom="10px"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <Input
            placeholder="Instagram"
            marginBottom="10px"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <Input
            placeholder="YouTube"
            marginBottom="10px"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
          />
          <Input
            placeholder="TikTok"
            marginBottom="10px"
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
          />
          <Input
            placeholder="Website"
            marginBottom="10px"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <Text fontSize="lg">
            Payment Info
            <Text fontSize="sm">
              You can only paste your wallet address here, you are not allowed
              to type.
            </Text>
          </Text>
          <Input
            placeholder="USDT Wallet Address"
            marginBottom="2px"
            value={walletAddress}
            onKeyPress={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <Text
            fontSize="sm"
            color="#ff0000"
            fontWeight="bold"
            backgroundColor="rgba(255, 0, 0, 0.2)"
            width={"fit-content"}
            px={"1em"}
            borderRadius={"0.5em"}
          >
            Please make sure you submit a valid USDT wallet address to prevent
            cases of lost funds as we will not be able to verify your identity.
          </Text>
          <Button
            onClick={handleUpdate}
            disabled={updating}
            cursor="pointer"
            margin={"10px"}
            marginTop={"20px"}
            width="100%"
          >
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default EditProfile;
