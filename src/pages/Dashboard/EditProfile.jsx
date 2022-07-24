import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Box, Input, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditProfile = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  return (
    <>
      <DashboardLayout>
        <Box>
          <Text fontSize="lg">Basic Info</Text>
          <Input placeholder="Username" marginBottom="10px" />
          <Input placeholder="Display name" marginBottom="10px" />
          <Input placeholder="Bio" marginBottom="10px" />
          <Text fontSize="lg">Social links</Text>
          <Input placeholder="Twitter" marginBottom="10px" />
          <Input placeholder="Instagram" marginBottom="10px" />
          <Input placeholder="YouTube" marginBottom="10px" />
          <Input placeholder="TikTok" marginBottom="10px" />
          <Input placeholder="Website" marginBottom="10px" />
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
            onKeyPress={(e) => {
              e.preventDefault();
            }}
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
          <Button>
            <Text fontSize="lg">Save</Text>
          </Button>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default EditProfile;
