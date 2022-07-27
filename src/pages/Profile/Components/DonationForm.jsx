import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLazerpay } from "lazerpay-react";
import { fetchData, postData } from "../../../utils/Request";

function DonationForm() {
  const username = window.location.pathname.split("/")[1];
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [minimumDonationAmount, setMinimumDonationAmount] = useState(0);
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
  const config = {
    publicKey: import.meta.env.VITE_APP_LAZER_PAY_PUBLIC_KEY,
    currency: "USD",
    amount: amount,
    reference:
      username + "-" + Date.now() + "-" + displayName + uniqueIdentifier,
    acceptPartialPayment: false,
    onSuccess: (response) => {
      console.log(response);
      setSuccess(true);
    },
    onClose: () => {
      console.log("closed");
    },
    onError: (response) => {
      console.log(response);
    },
  };

  const initializePayment = useLazerpay(config);
  return (
    <>
      <Box width={"400px"}>
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
          onChange={(e) => setAmount(e.target.value)}
        />
        <Textarea
          placeholder={`Enter a message for ${displayName} (optional)`}
          marginBottom={"1rem"}
        />
        <Button
          width={"100%"}
          color={"white"}
          borderRadius={"20px"}
          bg={"#0031af"}
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
