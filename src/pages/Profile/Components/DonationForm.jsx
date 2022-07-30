import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLazerpay } from "lazerpay-react";
import { fetchData, postData } from "../../../utils/Request";
import DonationResultModal from "./DonationResultModal";

function DonationForm() {
  const username = window.location.pathname.split("/")[1];
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [minimumDonationAmount, setMinimumDonationAmount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    const response = fetchData(`/user/profile/${username}`);
    response.then((data) => {
      if (data.status === 200) {
        setDisplayName(data.data.user.displayName);
        setMinimumDonationAmount(data.data.user.minimumDonationAmount);

        setLoading(false);
      } else {
        setError(true);
        setErrorMessage("User not found");
        setLoading(false);
      }
    });
  }, []);

  const uniqueIdentifierGenerator = () => {
    const randomString = Math.random().toString(36).substring(2, 12);
    setUniqueIdentifier(randomString);
  };

  useEffect(() => {
    uniqueIdentifierGenerator();
  }, []);

  const donateToUser = () => {
    const data = {
      amount: amount,
      donationMessage: message,
      username: username,
    };
    const response = postData("/payment/donate", data);
    response.then((data) => {
      if (data.status === 200) {
        setSuccess(true);
      } else {
        setError(true);
        setErrorMessage(data.message);
      }
    });
  };
  const config = {
    publicKey: import.meta.env.VITE_APP_LAZER_PAY_PUBLIC_KEY,
    currency: "USD",
    amount: amount,
    reference:
      username + "-" + Date.now() + "-" + displayName + uniqueIdentifier,
    acceptPartialPayment: false,
    onSuccess: (response) => {
      donateToUser();
    },
    onClose: () => {
      setClosed(true);
    },
    onError: (response) => {
      setError(true);
    },
  };

  const initializePayment = useLazerpay(config);
  return (
    <>
      {success && (
        <DonationResultModal
          message={"Your donation was successful "}
          emoji={"🎉"}
        />
      )}

      {error && (
        <DonationResultModal message={"Donation failed"} emoji={"😢"} />
      )}

      {closed && (
        <DonationResultModal message={"Payment closed"} emoji={"😢"} />
      )}

      <Box width={["100%", "400px"]}>
        <Text
          fontSize="22px"
          fontWeight="bold"
          color="black"
          textAlign="center"
          marginBottom="1rem"
        >
          How much do you want to donate?
        </Text>
        <Input
          type="number"
          placeholder={`Enter amount in USD: Minimum ${minimumDonationAmount} USD`}
          marginBottom={"1rem"}
          py={"1.5em"}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Textarea
          placeholder={`Enter a message for ${displayName} (optional)`}
          marginBottom={"1rem"}
        />
        <Button
          width={"100%"}
          color={"white"}
          borderRadius={"0.5em"}
          py={"1.5em"}
          bg={"blue.500"}
          _hover={{ bg: "#19315f" }}
          marginBottom={"1rem"}
          onClick={() => {
            initializePayment();
          }}
          disabled={amount === 0 || amount < minimumDonationAmount}
        >
          Donate
        </Button>
      </Box>
    </>
  );
}

export default DonationForm;
