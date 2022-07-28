import { Box, Flex, Text, Image, useDisclosure } from "@chakra-ui/react";
import { BiTime } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import ModalLayout from "../../../Layouts/ModalLayout";
import moment from "moment";
const DonationBox = ({ amount, date, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = () => onOpen();
  return (
    <>
      <Box
        bg={"#fff"}
        p={["1em", "2em"]}
        borderRadius={"0.5em"}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Box my={"1em"}>
          <Text>${amount}</Text>
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

      <ModalLayout isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default DonationBox;
