import React, { useState, useEffect, useRef } from "react";
import { Center, Button, Input, Text, Box, Flex, Link } from "@chakra-ui/react";
import { postData, fetchData } from "../../utils/Request";

function RequestPayout({ isOpen }) {
  const [amount, setAmount] = useState(0);
  const boxRef = useRef();
  const [accountBalance, setAccountBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef();
  const formatWithComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const response = fetchData("/payment/get-balance", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response
      .then((data) => {
        setAccountBalance(parseInt(data.data.accountBalance));
        setWalletAddress(data.data.walletAddress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accountBalance]);

  const requestPayout = () => {
    setProcessing(true);
    setError(false);
    setSuccess(false);
    const data = {
      amount: amount,
    };
    const response = postData("/payment/payout", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    response
      .then((data) => {
        console.log(data);
        setProcessing(false);
        setSuccess(true);
        setAccountBalance(
          parseInt(data.data.accountBalance) - parseInt(amount)
        );
        inputRef.current.value = "";
        setAmount(0);
      })
      .catch((err) => {
        setProcessing(false);
        setError(true);
        console.log(err);
      });
  };

  return (
    <Box
      position={"absolute"}
      top={"80px"}
      left={"50%"}
      transform={"translate(-50%, -50%)"}
      zIndex={"1"}
      backgroundColor={"white"}
      padding={"2em"}
      boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
      height={"fit-content"}
      width={"fit-content"}
      borderRadius={"5px"}
      display={isOpen ? "block" : "none"}
      ref={boxRef}
    >
      <Button right={"0"} position={"absolute"} top={"0"} onClick={() => {}}>
        <Text fontSize={"1.5em"}>x</Text>
      </Button>

      <Text fontWeight="bold" textAlign={"center"} fontSize={"1.5em"}>
        Request Payout
      </Text>
      <Text fontSize={"1em"} textAlign={"center"} fontWeight={"bold"} my={2}>
        Your account balance is ${formatWithComma(accountBalance)}
      </Text>
      {amount > accountBalance && (
        <Text
          fontSize={"12px"}
          textAlign={"center"}
          fontWeight={"bold"}
          my={2}
          color={"red"}
        >
          You cannot request more than your account balance
        </Text>
      )}
      {!walletAddress && (
        <Text
          fontSize={"12px"}
          textAlign={"center"}
          fontWeight={"bold"}
          my={2}
          color={"red"}
        >
          You must{" "}
          <Link
            href="/dashboard/donations/settings"
            color={"blue.500"}
            textDecoration={"underline"}
          >
            submit your wallet address
          </Link>{" "}
          before requesting a payout
        </Text>
      )}
      {success && !amount && (
        <Text
          fontSize={"15px"}
          textAlign={"center"}
          fontWeight={"bold"}
          my={2}
          color={"green"}
          width={"300px"}
          margin={"auto"}
          backgroundColor={"green.100"}
          padding={"1em"}
          borderRadius={"5px"}
        >
          Your request has been sent, your wallet will be credited shortly.
        </Text>
      )}
      {error && !amount && (
        <Text
          fontSize={"12px"}
          textAlign={"center"}
          fontWeight={"bold"}
          my={2}
          color={"red"}
        >
          There was an error processing your request. Please try again.
        </Text>
      )}
      <Input
        type="number"
        placeholder="Amount, minimum $10"
        onChange={(e) => setAmount(parseInt(e.target.value))}
        my={"1em"}
        fontWeight={"bold"}
        ref={inputRef}
      />
      <Button
        disabled={
          amount < 10 || amount > accountBalance || !walletAddress || processing
        }
        width={"100%"}
        borderRadius={"20px"}
        bg={"blue.500"}
        _hover={{ bg: "blue.600" }}
        color={"white"}
        onClick={() => {
          console.log(amount);
          requestPayout();
        }}
      >
        {processing ? "Processing..." : "Request Payout"}
      </Button>
    </Box>
  );
}

export default RequestPayout;
