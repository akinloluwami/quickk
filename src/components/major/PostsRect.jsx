import React, { Fragment, useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { RiHeart3Fill, RiTimeFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { deleteData } from "../../utils/Request";

function PostsRect({
  title,
  views,
  likes,
  comments,
  date,
  slug,
  username,
  id,
  coverImage,
}) {
  const [deleting, setDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const deletePost = () => {
    setDeleting(true);
    deleteData(`/post/delete/${slug}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setDeleting(false);
      setIsDeleted(true);
      console.log(res);
    });
  };

  return (
    <Fragment>
      <Flex
        boxShadow={"sm"}
        height={"100px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"10px"}
        borderRadius={"10px"}
        margin={"20px"}
        _hover={{
          boxShadow: "md",
          cursor: "pointer",
        }}
        display={isDeleted ? "none" : "block"}
      >
        <Flex flexDirection={"column"}>
          <Text fontSize={"2xl"} fontWeight={"400"} marginBottom={"10px"}>
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
          <Box>
            <Link to={`/${username}/${slug}`} target="_blank">
              <Button variantColor="teal" size="sm" mx={"10px"}>
                <Text fontSize={"1xl"} display={"flex"} alignItems={"center"}>
                  <AiFillEye
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  View
                </Text>
              </Button>
            </Link>

            <Button variantColor="teal" size="sm" mx={"10px"}>
              <Text fontSize={"1xl"} display={"flex"} alignItems={"center"}>
                <FiEdit
                  style={{
                    marginRight: "5px",
                  }}
                />
                Edit
              </Text>
            </Button>

            <Button
              variantColor="red"
              size="sm"
              backgroundColor={"rgba(255,0,0,0.7)"}
              color={"#fff"}
              _hover={{
                backgroundColor: "red",
              }}
              onClick={deletePost}
              disabled={deleting}
            >
              <Text fontSize={"1xl"} display={"flex"} alignItems={"center"}>
                <MdDelete
                  style={{
                    marginRight: "5px",
                  }}
                />
                {deleting ? "Deleting..." : "Delete"}
              </Text>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Fragment>
  );
}

export default PostsRect;
