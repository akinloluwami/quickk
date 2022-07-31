import { Box, Flex, Img, Image, Text, Link } from "@chakra-ui/react";
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
        boxShadow="md"
        bg={"#fff"}
        my={"1em"}
        p="1em"
        borderRadius={"1em"}
        px={["3em"]}
        py={["2em"]}
        display={["column", "flex"]}
        gap={"2em"}
      >
        {coverImage && (
          <Image
            src={coverImage}
            alt=""
            width={["100%", "25vw"]}
            height="30vh"
            objectFit={"cover"}
            borderRadius={"0.2em"}
          />
        )}
        <Box>
          <Flex flexDir={["column"]} alignItems={"center"}>
            <Box my={"1em"}>
              <Text fontWeight={"bold"} fontSize={["1.2em", "1.4em"]}>
                {title}
              </Text>
              <Text my={"1em"} color={"gray.700"}>
                {removeTags(content).length > 100
                  ? content.substring(0, 100) + "..."
                  : removeTags(content)}
              </Text>

              <Flex
                gap={"2em"}
                bg={"rgb(253 230 138 / 34%)"}
                width={"fit-content"}
                p={"1em"}
                borderRadius={"0.5em"}
              >
                <Box display={"flex"} gap={"0.5em"} alignItems={"center"}>
                  <BsCalendarDate />{" "}
                  <Text fontWeight={"medium"} className={'moment-time'} fontSize={['0.9em', '0.9em']}>{moment(date).fromNow()}</Text>
                </Box>
                <Box display={"flex"} gap={"1em"} alignItems="center">
                  <AiFillHeart fill="red" />{" "}
                  <Text fontWeight={"medium"}>{likes}</Text>
                </Box>
                <Flex display={"flex"} gap={"1em"} alignItems="center">
                  <AiFillEye /> <Text fontWeight={"medium"}>{views}</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          {/* <Box></Box> */}
        </Box>
      </Box>
    </>
  );
};

export default BlogBox;
