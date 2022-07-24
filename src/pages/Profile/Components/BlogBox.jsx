import { Box, Flex, Img, Text, Link } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { AiOutlineComment, AiOutlineMore, AiFillHeart } from "react-icons/ai";
import { BiDonateBlood } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import moment from "moment";
const BlogBox = ({ title, likes, views, content, date, coverImage }) => {
  return (
    <>
      <Box
        boxShadow="lg"
        bg={"#fff"}
        my={"1em"}
        p="1em"
        borderRadius={"1em"}
        width="300px"
        mx={"3em"}
      >
        {coverImage && (
          <Img
            src={coverImage}
            alt=""
            width={["100%", "400px"]}
            height="200px"
            objectFit={"cover"}
            borderRadius={"10px"}
          />
        )}
        <Box>
          <Flex flexDir={["column"]} alignItems={"center"}>
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
