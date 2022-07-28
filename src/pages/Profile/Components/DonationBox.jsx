import { Box, Flex, Text, Image, useDisclosure } from "@chakra-ui/react";
import { BiTime } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import ModalLayout from "../../../Layouts/ModalLayout";

const DonationBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //open Modal
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
        <Box>
          <Image
            src={
              "data:image/png;base64,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"
            }
            width={"50px"}
            borderRadius={"50%"}
          />
        </Box>
        <Box my={"1em"}>
          <Text> Received 0.0005 USDT Received </Text>
        </Box>

        <Flex color={"grey"} justifyContent={"space-between"}>
          <Box
            display={"flex"}
            gap={"0.5em"}
            alignItems={"center"}
            color={"gray"}
          >
            <BiTime />
            <Text> 20th July, 2022</Text>
          </Box>

          <Box>
            <FaEye />
          </Box>
        </Flex>
      </Box>

      <ModalLayout isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default DonationBox;
