import React, { Fragment } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";

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
            <Text fontSize={"sm"} mx="5px">
              Posted {moment(date).fromNow()}
            </Text>
            <Text fontSize={"sm"} mx="5px">
              {views} views
            </Text>
            <Text fontSize={"sm"} mx="5px">
              {likes} likes
            </Text>
            <Text fontSize={"sm"} mx="5px">
              {comments} comments
            </Text>
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
