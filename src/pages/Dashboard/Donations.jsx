import { Center, Box, Flex, Button, Input, Text } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
// import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { fetchData, postData } from "../../utils/Request";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

const DonationSettings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const response = fetchData("/payment/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      response.then((data) => {
        const { walletAddress, minimumDonationAmount } = data.data;
        setWalletAddress(walletAddress);
        setAmount(minimumDonationAmount);
      });
    }
  }, []);

  const data = {
    walletAddress,
    minimumDonationAmount: amount,
  };
  const handleUpdate = () => {
    setUpdating(true);
    const response = postData("/payment/update", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response
      .then((data) => {
        if (data.status === 200) {
          toast.success("Update successful");
        }
        setUpdating(false);
        console.log(data);
      })
      .catch((err) => {
        setUpdating(false);
        setError(true);
        console.log(err);
      });
  };

  return (
    <>
      <Box my={"2em"}>
        <Box>
          <Box>
            <Box w={["100%", "80%"]} margin={"0 auto"} p={"1.5em"}>
              <Text
                fontSize="3xl"
                my={"1em"}
                textAlign="center"
                fontWeight={500}
              >
                Payout wallet
                <Text
                  fontSize="sm"
                  color={"grey"}
                  fontWeight={"bold"}
                  my={"0.5em"}
                >
                  You can only paste your wallet address here, you are not
                  allowed to type.
                </Text>
              </Text>
              <Input
                placeholder="USDT Wallet Address"
                marginBottom="2px"
                value={walletAddress}
                variant={"filled"}
                p={"1.3em"}
                onKeyPress={(e) => {
                  e.preventDefault();
                }}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <Text
                fontSize="sm"
                color="#000"
                fontWeight="400"
                backgroundColor="#fef0ef"
                width={"fit-content"}
                px={"1em"}
                borderRadius={"0.5em"}
                my={"0.5em"}
                py={"1em"}
                textAlign="center"
              >
                Please make sure you submit a valid USDT wallet address to
                prevent cases of lost funds as we will not be able to verify
                your identity.
              </Text>

              <Text
                fontSize="xl"
                my={"1em"}
                textAlign="center"
                fontWeight={500}
              >
                Minimum Donation Amount
              </Text>
              <Input
                placeholder="
                  Default: $1
                  "
                type={"number"}
                margin="2px"
                value={amount}
                variant={"filled"}
                p={"1.3em"}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button
                width={"100%"}
                color={"white"}
                borderRadius={"5"}
                bg={"#0031af"}
                py={"1.5em"}
                _hover={{ bg: "#19315f" }}
                mt={"1em"}
                mb={"3em"}
                onClick={() => {
                  handleUpdate();
                }}
                disabled={amount < 1 || walletAddress === ""}
              >
                {updating ? "Updating..." : "Update"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DonationSettings;
