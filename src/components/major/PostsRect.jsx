import React, { Fragment } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { RiHeart3Fill, RiTimeFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { MdComment } from "react-icons/md";
function PostsRect({ title, views, likes, comments, date, slug, username }) {
  return (
    <Fragment>
      <Flex
        boxShadow={"sm"}
        height={"100px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"10px"}
        borderRadius={"10px"}
        margin={"10px"}
      >
        <Flex flexDirection={"column"}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {title}
          </Text>
          <Flex>
            <Box
              fontSize={"sm"}
              mx="5px"
              display={"flex"}
              alignItems={"center"}
            >
              <RiTimeFill />
              <Text fontWeight={"bold"} marginLeft={"5px"}>
                {moment(date).fromNow()}
              </Text>
            </Box>
            <Box
              fontSize={"sm"}
              mx="5px"
              display={"flex"}
              alignItems={"center"}
            >
              <AiFillEye />
              <Text fontWeight={"bold"} marginLeft={"5px"}>
                {views}
              </Text>
            </Box>
            <Box
              fontSize={"sm"}
              mx="5px"
              display={"flex"}
              alignItems={"center"}
            >
              <RiHeart3Fill />
              <Text fontWeight={"bold"} marginLeft={"5px"}>
                {likes}
              </Text>
            </Box>
            <Box
              fontSize={"sm"}
              mx="5px"
              display={"flex"}
              alignItems={"center"}
            >
              <MdComment />
              <Text fontWeight={"bold"} marginLeft={"5px"}>
                {comments}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex>
          <Link to={`/${username}/${slug}`} target="_blank">
            <Button variantColor="teal" size="sm" mx={"10px"}>
              <Text fontSize={"1xl"}>View</Text>
            </Button>
          </Link>
          <Button variantColor="teal" size="sm" mx={"10px"}>
            <Text fontSize={"1xl"}>Edit</Text>
          </Button>
          <Button variantColor="red" size="sm">
            <Text fontSize={"1xl"}>Delete</Text>
          </Button>
        </Flex>
      </Flex>
    </Fragment>
  );
}

export default PostsRect;
