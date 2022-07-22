import { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Box, Input, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { fetchData } from "../../utils/Request";
import PostsRect from "../../components/major/PostsRect";
const Posts = () => {
  const username = localStorage.getItem("userName");
  const [posts, setPosts] = useState([]);
  console.log(username);
  useEffect(() => {
    const response = fetchData(`/dashboard/user/posts/${username}`, {
      method: "GET",
      username: username,
    });
    response.then((res) => {
      console.log(res.data.posts);
      setPosts(res.data.posts.reverse());
    });
  }, [username]);

  return (
    <>
      <DashboardLayout>
        <Box>
          <Text>
            <Text fontSize={"2xl"}> {posts.length} Posts</Text>
          </Text>
          <>
            {posts.map((post) => (
              <PostsRect
                key={post.id}
                title={post.title}
                views={post.views.length}
                comments={post.comments.length}
                date={post.createdAt}
                likes={post.likes.length}
              />
            ))}
          </>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Posts;
