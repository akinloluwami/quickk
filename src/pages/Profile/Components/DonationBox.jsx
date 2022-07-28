import { Box, Flex, Text } from "@chakra-ui/react";
import { BiTime } from "react-icons/bi";
import moment from "moment";
const DonationBox = ({ amount, date, message }) => {
  return (
    <>
      <Box
        bg={"#fff"}
        p={["1em", "2em"]}
        borderRadius={"0.5em"}
        cursor={"pointer"}
        margin={"1em"}
        width="fit-content"
        boxShadow={"md"}
      >
        <Box my={"1em"}>
          <Text fontSize="40px" fontWeight={500} color={"green.500"}>
            ${amount}
          </Text>
        </Box>

        <Flex color={"grey"} justifyContent={"space-between"}>
          <Box
            display={"flex"}
            gap={"0.5em"}
            alignItems={"center"}
            color={"gray"}
          >
            <BiTime />
            <Text>{moment(date).fromNow()}</Text>
          </Box>
        </Flex>
        {message && <Text>{message}</Text>}
      </Box>
    </>
  );
};

export default DonationBox;
