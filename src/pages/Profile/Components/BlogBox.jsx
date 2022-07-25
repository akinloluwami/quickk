import { Box, Flex, Img, Text, Link } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import {
  AiOutlineComment,
  AiOutlineMore,
  AiFillHeart,
  AiFillEye,
} from "react-icons/ai";
import { BiDonateBlood } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import moment from "moment";
const BlogBox = ({ title, likes, views, content, date, coverImage }) => {
  const removeTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent;
  };

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
                {removeTags(content).length > 100
                  ? content.substring(0, 100) + "..."
                  : removeTags(content)}
              </Text>

              <Box display={"flex"} gap={"1em"} alignItems="center">
                <BsCalendarDate />{" "}
                <Text fontWeight={"bold"}>{moment(date).fromNow()}</Text>
              </Box>
              <Box display={"flex"} gap={"1em"} alignItems="center">
                <AiFillHeart /> <Text fontWeight={"bold"}>{likes}</Text>
              </Box>
              <Box display={"flex"} gap={"1em"} alignItems="center">
                <AiFillEye /> <Text fontWeight={"bold"}>{views}</Text>
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
