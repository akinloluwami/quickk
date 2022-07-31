import { Avatar, Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import { fetchData, postData } from "../../utils/Request";
import { useState, useEffect } from "react";
const ProfileBlock = () => {
  const username = window.location.pathname.split("/")[1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [followersCount, setFollowersCount] = useState(0);
  useEffect(() => {
    const response = fetchData(`/user/profile/${username}`);
    response.then((data) => {
      if (data.error) {
        setError(true);
        setErrorMessage(data.error);
      } else {
        console.log(data);
        const user = data.data.user;
        setDisplayName(user.displayName);
        setBio(user.bio);
        setIsVerified(user.isVerified);
        setFollowers(user.followers);
        setFollowing(user.following);
        setFollowersCount(user.followers.length);
        setProfilePicture(user.profilePicture);
      }
    });
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  if (localStorage.getItem("token")) {
    useEffect(() => {
      const response = fetchData(`/user/uuid`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      response.then((data) => {
        const uuid = data.data.uuid;
        const un = data.data.username;
        if (username === un) {
          setIsOwner(true);
        }
        const isFollowing = followers.includes(uuid);
        setIsFollowing(isFollowing);
      });
    }, [followers]);
  }

  const followUser = () => {
    setFollowersCount(followersCount + 1);
    setIsFollowing(true);
    const response = postData(
      `/user/follow/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    response.then((data) => {});
  };

  const unfollowUser = () => {
    setFollowersCount(followersCount - 1);
    setIsFollowing(false);
    const response = postData(
      `/user/unfollow/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    response.then((data) => {
      console.log(data);
    });
  };
  return (
    <Box position={"relative"}>
      <Flex
        position={"absolute"}
        top={"0"}
        left={"0"}
        width={"100%"}
        padding={"1em"}
        height="fit-content"
        backgroundColor={"#fff"}
        justifyContent={"center"}
        alignItems={"center"}
        zIndex={"1"}
        boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
        flexDirection={"column"}
        transition={"all 0.3s ease-in-out"}
        transform={popupActive ? "translateY(0)" : "translateY(-200%)"}
      >
        <Button
          position={"absolute"}
          top={"0"}
          left={"0"}
          onClick={() => {
            setPopupActive(false);
          }}
        >
          <Text fontSize={"1.5em"}>x</Text>
        </Button>
        <Avatar />
        <Text fontSize={"1.5em"} fontWeight={"bold"}>
          Follow {displayName} to see what they share on Quickk.
        </Text>
        <Flex my={"20px"}>
          <Link href="/login" mx={"1em"}>
            <Button>
              <Text>Login</Text>
            </Button>
          </Link>
          <Link href="/signup" mx={"1em"}>
            <Button>
              <Text>Signup</Text>
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Box p="1em">
        <Flex gap={"2em"} alignItems={"center"} flexDir={["column", "row"]}>
          <Box justifyContent={["left"]}>
            {profilePicture.length > 0 ? (
              <Avatar size={["xl"]} src={profilePicture} />
            ) : (
              <Avatar
                size={["xl"]}
                src={`https://avatars.dicebear.com/api/initials/${displayName}.svg`}
              />
            )}
          </Box>
          <Box textAlign={["center", "left"]}>
            <Text fontWeight={"bold"}>{displayName}</Text>
            <Text color={"gray"} my={"0.5em"}>
              {" "}
              @{username}
            </Text>
            <Text color={"gray"}>
              {followersCount} {followersCount === 1 ? "Follower" : "Followers"}{" "}
              | {following.length} Following{" "}
            </Text>
          </Box>
          <Box>
            {!isLoggedIn ? (
              <Button
                onClick={() => {
                  setPopupActive(true);
                }}
              >
                Follow
              </Button>
            ) : isFollowing ? (
              <Button onClick={unfollowUser}>Unfollow</Button>
            ) : isOwner ? (
              <Link href="/edit-profile">
                <Button>Edit Profile</Button>
              </Link>
            ) : (
              <Button onClick={followUser}>Follow</Button>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfileBlock;
