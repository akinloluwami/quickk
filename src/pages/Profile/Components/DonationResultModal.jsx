import React, { Fragment, useState } from "react";
import { Text, Box, Center, Flex, Button } from "@chakra-ui/react";

function DonationResultModal({ message, emoji }) {
  const [num, setNum] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Fragment>
      <Box
        bg={"#fff"}
        width={["100%", "50%"]}
        mx={"auto"}
        borderRadius={"10px"}
        padding={"10px"}
        boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
        position={"absolute"}
        height={"400px"}
        zIndex={1}
        display={isOpen ? "block" : "none"}
      >
        <Button
          onClick={() => setIsOpen(false)}
          position={"absolute"}
          right={"10px"}
        >
          <Text color={"teal"}>Close</Text>
        </Button>
        <Center>
          <Text fontSize={"200px"}>{emoji}</Text>
        </Center>
        <Text
          fontSize="xl"
          fontWeight="bold"
          fontFamily="var(--primary-font)"
          textAlign={"center"}
        >
          {message}
        </Text>
      </Box>
    </Fragment>
  );
}

export default DonationResultModal;
