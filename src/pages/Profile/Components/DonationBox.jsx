import { Box, Flex, Text } from "@chakra-ui/react";
import { BiTime } from "react-icons/bi";
import moment from "moment";
const DonationBox = ({ amount, date, message }) => {
  const formatWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <Box
        bg={"#fff"}
        p={["1em", "2em"]}
        borderRadius={"0.5em"}
        cursor={"pointer"}
        margin={"1em"}
        width="fit-content"
        boxshadow={"md"}
        position={"relative"}
        minWidth={"20em"}
      >
        <Box my={"1em"}>
          <Text fontSize="4xl" fontWeight={500} color={"blue.500"}>
            ${formatWithCommas(amount)}
          </Text>
        </Box>

        <Flex color={"grey"} justifyContent={"space-between"}>
          <Box
            display={"flex"}
            gap={"0.5em"}
            alignItems={"center"}
            color={"gray"}
            position="absolute"
            top={"0"}
            right={"0"}
            bg="#f3feff"
            borderRadius={"0 0.5em 0 0.5em"}
            px={"0.5em"}
          >
            <BiTime />
            <Text fontSize="sm" color={"blue"} my="10px">
              {moment(date).fromNow()}
            </Text>
          </Box>
        </Flex>
        {message && (
          <Text fontWeight={500} fontSize="md" color={"grey"}>
            {message}
          </Text>
        )}
      </Box>
    </>
  );
};

export default DonationBox;
