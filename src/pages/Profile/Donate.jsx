import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";
// import { Helmet } from "react-helmet";
import { fetchData, postData } from "../../utils/Request";
import DonationBox from "./Components/DonationBox";
import { useLazerpay } from "lazerpay-react";
import DonationForm from "./Components/DonationForm";

function Donate() {
  const username = window.location.pathname.split("/")[1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");

  useEffect(() => {
    const response = fetchData(`/user/profile/${username}`);
    response.then((data) => {
      if (data.status === 200) {
        setDisplayName(data.data.user.displayName);
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

  useEffect(() => {
    document.title = `${displayName} | Donate`;
  }, [displayName]);

  return (
    <>
      {/* <Helmet>
        <title>{displayName} | Donate</title>
      </Helmet> */}
      <ContainerLayout>
        <ProfileLayout>
          <Box display={"flex"} justifyContent={"center"} bg={"#fff"}>
            <DonationForm />
          </Box>
        </ProfileLayout>
      </ContainerLayout>
    </>
  );
}

export default Donate;
