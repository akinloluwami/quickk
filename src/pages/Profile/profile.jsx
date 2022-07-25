import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";
import BlogBox from "./Components/BlogBox";
import { fetchData } from "../../utils/Request";
import { useState, useEffect } from "react";
import LoadingProfile from "../../components/minor/LoadingProfile";
import NoUser from "../../components/minor/NoUser";
import { Helmet } from "react-helmet";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";

const Profile = () => {
  const username = window.location.pathname.split("/")[1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const response = fetchData(`/user/profile/${username}`);
    response.then((data) => {
      if (data.status === 200) {
        setDisplayName(data.data.user.displayName);
        setLoading(false);
      } else {
        setError(true);
        setErrorMessage("User not found");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const response = fetchData(`/dashboard/user/posts/${username}`, {
      method: "GET",
      username: username,
    });
    response.then((res) => {
      console.log(res.data.posts);
      setPosts(res.data.posts.reverse());
    });
  }, []);

  return (
    <>
      <ContainerLayout>
      {loading ? (
        <Center>
          <Box>
            <LoadingProfile />
          </Box>
        </Center>
      ) : error ? (
        <Center>
          <Box>
            <NoUser message={errorMessage} />
          </Box>
        </Center>
      ) : (
        <ProfileLayout>
          <Box>
            {posts.length < 1 ? (
              <Box>
                <Text>No posts from this user yet.</Text>
              </Box>
            ) : (
              <Flex flexWrap={"wrap"} justifyContent={"center"}>
                {posts.map((post) => (
                  <Link
                    href={`/${username}/${post.slug}`}
                    key={post.id}
                    width="fit-content"
                  >
                    <BlogBox
                      title={post.title}
                      slug={post.slug}
                      content={post.content}
                      date={post.createdAt}
                      likes={post.likes.length}
                      coverImage={post.coverImageUrl}
                      views={post.views.length}
                    />
                  </Link>
                ))}
              </Flex>
            )}
          </Box>
        </ProfileLayout>
      )}
      </ContainerLayout>
    </>
  );
};

export default Profile;
