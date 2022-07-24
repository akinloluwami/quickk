import { Box, Flex, Img, Text, Link } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { AiOutlineComment, AiOutlineMore, AiFillHeart } from "react-icons/ai";
import { BiDonateBlood } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import moment from "moment";
const BlogBox = ({ title, likes, views, content, date }) => {
  return (
    <>
      <Box
        boxShadow="lg"
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
                {title}
              </Text>
              <Text my={"1em"}>
                {content.length > 100
                  ? content.substring(0, 100) + "..."
                  : content}
              </Text>

              <Box display={"flex"} gap={"1em"}>
                <BsCalendarDate /> <Text>{moment(date).fromNow()}</Text>
              </Box>
              <Box display={"flex"} gap={"1em"}>
                <AiFillHeart /> <Text>{likes}</Text>
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
