import React, { useState, useEffect, Fragment, useRef } from "react";
import { fetchData, postData } from "../utils/Request";
import { Text, Flex, Box, Button, Link, Textarea } from "@chakra-ui/react";
import { RiHeart3Fill } from "react-icons/ri";
import ContainerLayout from "../Layouts/ContainerLayout.jsx/ContainerLayout";
import ContentLoader from "../components/minor/ContentLoader";
import DashboardTop from "../Layouts/Dashboard/DashboardTop";
import { AiFillEye, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import moment from "moment";

function BlogPost() {
  const username = window.location.pathname.split("/")[1];
  const slug = window.location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postViews, setPostViews] = useState(0);
  const [postLikes, setPostLikes] = useState([]);
  const [postComments, setPostComments] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [postId, setPostId] = useState("");
  const [postLikesCount, setPostLikesCount] = useState(0);
  const [commenting, setCommenting] = useState(false);
  const commentTextareaRef = useRef();

  const viewPost = () => {
    postData(`/post/view?slug=${slug}&id=${postId}}`);
  };

  useEffect(() => {
    const response = fetchData(`/post/${username}/${slug}`);

    response.then((data) => {
      if (data.status === 200) {
        setPostId(data.data.post.id);
        setPostTitle(data.data.post.title);
        setPostContent(data.data.post.content);
        setPostViews(data.data.post.views.length);
        setPostLikes(data.data.post.likes);
        setPostComments(data.data.post.comments);
        setLoading(false);
        setPostLikesCount(data.data.post.likes.length);
        viewPost();
      } else {
        setError(true);
        setErrorMessage(data.response.data.error);
        setLoading(false);
      }
    });
  }, [postId]);
  if (localStorage.getItem("token")) {
    useEffect(() => {
      const response = fetchData("/post/username", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      response.then((data) => {
        if (data.status === 200) {
          if (data.data.username === username) {
            setIsOwner(true);
          }
          const liked = postLikes.find(
            (like) => like?.userUuid === data?.data?.uuid
          );
          if (liked) {
            setHasLiked(true);
            console.log("liked");
          }
        }
      });
    }, [postLikes]);
  }
  const likePost = () => {
    setHasLiked(true);
    setPostLikesCount(postLikesCount + 1);
    postData(
      "/post/like",
      {
        slug: slug,
        id: postId,
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const unlikePost = () => {
    setHasLiked(false);
    setPostLikesCount(postLikesCount - 1);
    postData(
      "/post/unlike",
      {
        slug: slug,
        id: postId,
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const commentOnPost = () => {
    setCommenting(true);
    postData(
      "/post/comment",
      {
        slug: slug,
        id: postId,
        comment: newComment,
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((data) => {
      setCommenting(false);
      console.log(data);
      if (data.status === 200) {
        setNewComment("");
        commentTextareaRef.current.value = "";
      }
    });
  };

  const displayComments = () => {
    return postComments.map((comment) => {
      const uuid = comment.userUuid;
      fetchData(`/user/username/${uuid}`).then((data) => {
        if (data.status === 200) {
          console.log(data.data.username);
          console.log(data.data.displayName);
        }
      });
      return (
        <Box
          key={postComments.indexOf(comment)}
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          my={2}
        >
          <Flex>
            <Text>{moment(comment.date).fromNow()}</Text>
          </Flex>
          <Text>{comment.comment}</Text>
        </Box>
      );
    });
  };

  return (
    <Fragment>
      <Box
        px={["0", "4em"]}
        position={"fixed"}
        left={0}
        right={0}
        top={0}
        zIndex={999}
      >
        <DashboardTop />
      </Box>
      <ContainerLayout>
        <Box my={"8em"}>
          {loading ? (
            <>
              <ContentLoader />
            </>
          ) : error ? (
            <Text>{errorMessage}</Text>
          ) : (
            <Box px={["", "5em"]}>
              <Text fontSize={"2xl"} fontWeight={"bold"} my={"1em"}>
                {postTitle}
              </Text>
              <Text>{postContent}</Text>

              {/* Make views and others flex  */}
              <Box my={"1em"}>
                <Flex gap={"2em"}>
                  <Flex alignItems={"center"}>
                    <Text mr={"0.5em"}>
                      <AiFillEye />{" "}
                    </Text>
                    <Text>{postViews} views</Text>
                  </Flex>

                  <Flex gap={"0.5em"} alignItems={"center"}>
                    <AiFillHeart />
                    <Text>
                      {postLikesCount} {postLikesCount === 1 ? "like" : "likes"}
                    </Text>
                  </Flex>

                  <Flex alignItems={"center"} gap={"0.5em"}>
                    <AiOutlineComment />
                    {postComments.length > 0 ? (
                      displayComments()
                    ) : (
                      <Text>No comments</Text>
                    )}
                  </Flex>
                </Flex>
              </Box>

              {isOwner ? (
                <Link href={`/dashboard/post/${username}/${slug}/edit`}>
                  <Button>Edit</Button>
                </Link>
              ) : !localStorage.getItem("token") ? (
                <>
                  <Text>
                    <Link href="/login">
                      <Button>Login</Button>
                    </Link>{" "}
                    to like and comment
                  </Text>
                </>
              ) : (
                <Box>
                  {hasLiked ? (
                    <RiHeart3Fill color="red" onClick={unlikePost} />
                  ) : (
                    <RiHeart3Fill onClick={likePost} />
                  )}
                  <Box>
                    <Text>Add a comment</Text>
                    <Textarea
                      onChange={(e) => setNewComment(e.target.value)}
                      ref={commentTextareaRef}
                    />
                    <Button
                      disabled={commenting || newComment.length === 0}
                      onClick={commentOnPost}
                    >
                      {commenting ? "Commenting..." : "Comment"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </ContainerLayout>
    </Fragment>
  );
}

export default BlogPost;
