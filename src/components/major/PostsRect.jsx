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
      <Box
        boxShadow={"sm"}
        bg={"#fff"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={"2em"}
        py={["1em", "4em"]}
        borderRadius={"10px"}
        my={"1em"}
        _hover={{
          boxShadow: "md",
          cursor: "pointer",
          backgroundColor: "sand",
        }}
        display={isDeleted ? "none" : "block"}
      >
        <Box>
          {coverImage && (
            <img
              src={coverImage}
              alt=""
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          )}
          <Text
            fontSize={["xl", "2xl"]}
            fontWeight={"400"}
            marginBottom={"10px"}
          >
            {title}
          </Text>
        </Box>

        {/* handle engagement in post  */}

        <Flex
          alignItems={["left", "center"]}
          justifyContent={"space-between"}
          flexDir={["column", "row"]}
        >
          <Box display={"flex"} my={["1.5em", "2em"]}>
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
              <Text marginLeft={"5px"}>{likes}</Text>
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
          </Box>

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

            <Link to={`/dashboard/post/${slug}/edit`}>
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
            </Link>

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
      </Box>
    </Fragment>
  );
}

export default PostsRect;
