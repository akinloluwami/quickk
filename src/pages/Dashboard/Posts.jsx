import { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import {
  Box,
  Input,
  Button,
  Flex,
  Text,
  Textarea,
  Link,
} from "@chakra-ui/react";
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
        {posts.length > 0 ? (
          <Box>
            <Text>
              <Text fontSize={"2xl"}>
                {" "}
                {posts.length}
                {posts.length > 1 ? " Posts" : " Post"}
              </Text>
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
                  slug={post.slug}
                  username={username}
                  id={post.id}
                />
              ))}
            </>
          </Box>
        ) : 
        (
          <Flex
            width={"100%"}
            height={"50vh"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text>
              <Text fontSize={"2xl"}> No Posts</Text>
              <Link href={`/dashboard/write`}>
                <Button>Create Post</Button>
              </Link>
            </Text>
          </Flex>
        )}
        
      </DashboardLayout>
    </>
  );
};

export default Posts;
