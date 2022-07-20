import { Box, Text } from "@chakra-ui/react";

function Card({ title, number, color }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      borderStyle="solid"
      overflow="hidden"
    >
      <Box bg={color} p="4" color="white" fontWeight="bold">
        <Text fontSize="xl">{title}</Text>
        <Text fontSize="2xl">{number}</Text>
      </Box>
    </Box>
  );
}

export default Card;
