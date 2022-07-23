import React, { useState, useEffect, Fragment } from "react";
import { fetchData, postData } from "../utils/Request";
import { Text, Flex, Box, Button, Link, Textarea } from "@chakra-ui/react";
import { RiHeart3Fill } from "react-icons/ri";
function BlogPost() {
  const username = window.location.pathname.split("/")[1];
  const slug = window.location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postViews, setPostViews] = useState(0);
  const [postLikes, setPostLikes] = useState(0);
  const [postComments, setPostComments] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [postId, setPostId] = useState("");

  const viewPost = () => {
    postData(`/post/view?slug=${slug}&id=${postId}}`);
  };

  useEffect(() => {
    const response = fetchData(`/post/${username}/${slug}`);

    response.then((data) => {
      console.log(data);
      if (data.status === 200) {
        setPostId(data.data.post.id);
        setPostTitle(data.data.post.title);
        setPostContent(data.data.post.content);
        setPostViews(data.data.post.views.length);
        setPostLikes(data.data.post.likes.length);
        setPostComments(data.data.post.comments);
        setLoading(false);
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
        }
      });
    }, []);
  }
  return (
    <Fragment>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{errorMessage}</Text>
      ) : (
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {postTitle}
          </Text>
          <Text>{postContent}</Text>
          <Text>{postViews} views</Text>
          <Text>{postLikes} likes</Text>
          {postComments.length > 0 ? (
            postComments.map((comment) => <Text>{comment.content}</Text>)
          ) : (
            <Text>No comments</Text>
          )}
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
              {hasLiked ? <RiHeart3Fill color="red" /> : <RiHeart3Fill />}
              <Box>
                <Text>Add a comment</Text>
                <Textarea onChange={(e) => setNewComment(e.target.value)} />
                <Button>Comment</Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Fragment>
  );
}

export default BlogPost;
