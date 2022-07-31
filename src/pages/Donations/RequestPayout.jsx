import React, { useState, useEffect, useRef } from "react";
import { Center, Button, Input, Text, Box, Flex } from "@chakra-ui/react";
import { postData, fetchData } from "../../utils/Request";

function RequestPayout({ isOpen }) {
  const [amount, setAmount] = useState(0);
  const boxRef = useRef();
  const [accountBalance, setAccountBalance] = useState(0);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accountBalance]);

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
        Your account balance is ${accountBalance}
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
      <Input
        type="number"
        placeholder="Amount, minimum $10"
        onChange={(e) => setAmount(parseInt(e.target.value))}
        my={"1em"}
        fontWeight={"bold"}
      />
      <Button
        disabled={amount < 10 || amount > accountBalance}
        width={"100%"}
        borderRadius={"20px"}
        onClick={() => {
          console.log(amount);
        }}
      >
        Payout
      </Button>
    </Box>
  );
}

export default RequestPayout;
