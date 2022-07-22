import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { AiOutlineComment, AiOutlineMore, AiFillHeart } from "react-icons/ai";
import { BiDonateBlood } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";

const BlogBox = ({ blogTitle, blogBrief }) => {
  return (
    <>
      <Box
        bg={"#fff"}
        width={["100%", "100%"]}
        my={"1em"}
        p={["1em", "2em"]}
        borderRadius={"1em"}
      >
        <Box>
          <Flex flexDir={["column", "row"]} alignItems={"center"}>
            <Box my={"1em"}>
              <Text fontWeight={"bold"} fontSize={["1.2em", "1.5em"]}>
                This is the title for your post goes here{" "}
              </Text>
              <Text my={"1em"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                doloribus nam sapiente debitis laborum omnis,{" "}
              </Text>

              <Box display={"flex"} gap={"1em"}>
                <BsCalendarDate /> <Text> 20th July, 2022</Text>
              </Box>
            </Box>
          </Flex>
          <Box></Box>
        </Box>
      </Box>
    </>
  );
};

export default BlogBox;
