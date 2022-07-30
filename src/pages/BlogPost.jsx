import React, { useState, useEffect, Fragment, useRef } from "react";
import { fetchData, postData } from "../utils/Request";
import {
  Text,
  Flex,
  Box,
  Button,
  Link,
  Textarea,
  Avatar,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
} from "@chakra-ui/react";
import { RiHeart3Fill } from "react-icons/ri";
import ContainerLayout from "../Layouts/ContainerLayout.jsx/ContainerLayout";
import ContentLoader from "../components/minor/ContentLoader";
import DashboardTop from "../Layouts/Dashboard/DashboardTop";
import { AiFillEye, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { FiEdit, FiLogOut } from "react-icons/fi";
import moment from "moment";
import { BiChevronDown, BiTimeFive, BiUserCircle } from "react-icons/bi";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import Share from "../components/minor/Share";
// import { Helmet } from "react-helmet";

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
  const [coverImage, setCoverImage] = useState("");
  const [ownerProfileImage, setOwnerProfileImage] = useState("");
  const [ownerDisplayName, setOwnerDisplayName] = useState("");
  const [viewerProfilePicture, setViewerProfilePicture] = useState("");
  const [viewerDisplayName, setViewerDisplayName] = useState("");
  const [viewerUserName, setViewerUserName] = useState("");

  const viewPost = () => {
    postData(`/post/view?slug=${slug}&id=${postId}}`);
  };

  useEffect(() => {
    const response = fetchData(`/user/profile/${username}`);
    response.then((data) => {
      if (data.status === 200) {
        setLoading(false);
        const user = data.data.user;
        setOwnerDisplayName(user.displayName);
        setOwnerProfileImage(user.profilePicture);
      } else {
        setError(true);
        setErrorMessage("User not found");
        setLoading(false);
      }
    });
  }, []);

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
        setCoverImage(data.data.post.coverImageUrl);
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
          console.log(data.data);
          setViewerUserName(data.data.username);
          setViewerProfilePicture(data.data.profilePicture);
          setViewerDisplayName(data.data.displayName);
          if (data.data.username === username) {
            setIsOwner(true);
          }
          const liked = postLikes.find(
            (like) => like?.userUuid === data?.data?.uuid
          );
          if (liked) {
            setHasLiked(true);
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
      if (data.status === 200) {
        setNewComment("");
        commentTextareaRef.current.value = "";
      }
    });
  };

  const displayComments = () => {
    return postComments.map((comment) => {
      const uuid = comment.userUuid;
      fetchData(`/user/username/${uuid}`);
      return (
        <Box
          key={postComments.indexOf(comment)}
          my={2}
          py={"2em"}
          borderBottom="1px solid #e6e6e6"
        >
          <Flex alignItems={"center"} gap={"0.5em"} my={"1em"}>
            <BiTimeFive />
            <Text>{moment(comment.date).fromNow()}</Text>
          </Flex>
          <Text>{comment.comment}</Text>
        </Box>
      );
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    document.title = `${postTitle} | ${ownerDisplayName}`;
  }, [postTitle, ownerDisplayName]);

  return (
    <>
      <ContainerLayout>
        <Fragment>
          {/* <Helmet>
            <title>
              {postTitle} | {ownerDisplayName}
            </title>
          </Helmet> */}
          <Box
            px={["0", "4em"]}
            position={"fixed"}
            left={0}
            right={0}
            top={0}
            zIndex={999}
          >
            <ContainerLayout>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                backgroundColor={"#fff"}
                py={"1em"}
              >
                <Link
                  href={`/${username}`}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Avatar src={ownerProfileImage} size={["sm", "md"]} />
                  <Text
                    ml={"0.5em"}
                    fontSize={["", "1.4em"]}
                    fontWeight={"bold"}
                  >
                    {ownerDisplayName}
                  </Text>
                </Link>
                {localStorage.getItem("token") && !isOwner ? (
                  <Menu>
                    <MenuButton>
                      <Flex alignItems={"center"} gap={"1em"}>
                        {viewerProfilePicture ? (
                          <Avatar
                            my={"1em"}
                            src={viewerProfilePicture}
                            size={"md"}
                          />
                        ) : (
                          <Avatar
                            src={`https://avatars.dicebear.com/api/initials/${viewerDisplayName}.svg`}
                            size={"md"}
                            my={"1em"}
                          />
                        )}

                        <Text fontWeight={"bold"} display={["none", "block"]}>
                          {viewerDisplayName}
                        </Text>
                        <Text>
                          <BiChevronDown />
                        </Text>
                      </Flex>
                    </MenuButton>

                    <MenuList>
                      <Link href={`/${viewerUserName}`}>
                        <MenuItem>
                          <Text mr="1em">
                            <BiUserCircle />
                          </Text>{" "}
                          Profile.
                        </MenuItem>
                      </Link>
                      <Link href="/edit-profile">
                        <MenuItem>
                          <Text mr="1em">
                            <FaUserEdit />
                          </Text>{" "}
                          Edit Profile
                        </MenuItem>
                      </Link>

                      <MenuItem
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        <Text mr="1em">
                          <FiLogOut />
                        </Text>
                        logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : isOwner ? (
                  <Link href={`/dashboard/post/${slug}/edit`}>
                    <Button
                      gap={"0.5em"}
                      color={"#fff"}
                      bg={"#0031af"}
                      _hover={{ bg: "#0031af" }}
                    >
                      <FaEdit />
                      Edit
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
                )}
              </Flex>
            </ContainerLayout>
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
                  <Text
                    fontSize={["2em", "5xl"]}
                    fontWeight={"bold"}
                    my={"1em"}
                    textAlign={"center"}
                  >
                    {postTitle}
                  </Text>

                  <Flex gap={"2em"} my={"1em"} justifyContent="center">
                    <Flex alignItems={"center"}>
                      <Text mr={"0.5em"}>
                        <AiFillEye />{" "}
                      </Text>
                    
                     <Box display={'inline-flex'} gap={'0.5em'}>
                       <Text  >
                        {postViews}
                        </Text>
                        <Text display={['none' , 'block']}>  {postViews === 1 ? " view" : " views"} </Text>
                    
                     </Box>

                      {/* display this on mobile */}
                     
                    </Flex>

                    <Flex gap={"0.5em"} alignItems={"center"}>
                      <AiFillHeart />
                      <Text>
                        {postLikesCount}{" "}
                      </Text>
                      <Text display={['none' , 'block']} >
                         {postLikesCount === 1 ? "like" : "likes"}
                       </Text>
                     
                    </Flex>

                    <Flex alignItems={"center"} gap={"0.5em"}
                      display={['none' , 'block']}
                    >
                      
                      {postComments.length > 0 ? (
                        <>
                          <Flex>
                            <AiOutlineComment />
                            <Text>{postComments.length} comment</Text>
                          </Flex>
                        </>
                      ) : (
                        <Flex alignItems={'center'} gap={'0.5em'}>
                            <AiOutlineComment />
                            <Text>No comments</Text>
                        </Flex>
                      )}
                    </Flex>

                    {/* display this on mobile phone  */}

                    <Flex alignItems={"center"} gap={"0.5em"}
                      display={['block' , 'none']}
                      
                    >
                     
                      {postComments.length > 0 ? (
                        <>
                          <Box display={'flex'} alignItems={'center'} gap={'0.5em'}>
                            <AiOutlineComment />
                            <Text>{postComments.length} </Text>
                            {/* <Text>comment</Text> */}
                          </Box>
                        </>
                      ) : (
                        <Box display={'flex'} alignItems={'center'} 
                          alignContent={'center'} gap={'0.5em'}>
                        
                           <AiOutlineComment />
                            <Text>0</Text>
                        </Box>
                      )}
                    </Flex>

                    {/* this it on mobile end  */}


                    <Share link={window.location.href} title={postTitle} />
                  </Flex>

                  {coverImage && (
                    <Box
                      width={"100%"}
                      height={"400px"}
                      backgroundImage={`url(${coverImage})`}
                      backgroundSize={"cover"}
                      backgroundPosition={"center"}
                      borderRadius={"0.2em"}
                      my={"1em"}
                    />
                  )}
                  {postContent}

                  {/* Make views and others flex  */}
                  <Box my={"1em"}>
                    {/* section to display comments  */}

                    <Box my={"1em"}>
                      {postComments.length > 0 ? (
                        <>
                          <Text mt={"3em"} fontWeight={"bold"}>
                            Comments
                          </Text>
                          <Box>{displayComments()}</Box>
                        </>
                      ) : (
                        <></>
                      )}
                    </Box>

                    {/* Display comment end here */}
                  </Box>

                  {isOwner ? (
                    <Link href={`/dashboard/post/${slug}/edit`}>
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
                        <RiHeart3Fill
                          color="red"
                          onClick={unlikePost}
                          style={{
                            fontSize: "25px",
                          }}
                        />
                      ) : (
                        <RiHeart3Fill
                          onClick={likePost}
                          style={{
                            fontSize: "20px",
                            color: "rgba(0,0,0,0.3)",
                          }}
                        />
                      )}
                      <Box>
                        <Text my={"0.5em"}>Add a comment</Text>
                        <Textarea
                          onChange={(e) => setNewComment(e.target.value)}
                          ref={commentTextareaRef}
                        />
                        <Button
                          my={"1em"}
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
      </ContainerLayout>
    </>
  );
}

export default BlogPost;
