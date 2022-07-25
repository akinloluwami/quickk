import { Flex, Box, Text, Avatar, Button, Link } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { fetchData, postData } from "../../utils/Request";

import { NavLink } from "react-router-dom";

const ProfileLayout = ({ children }) => {
  const username = window.location.pathname.split("/")[1];
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  useEffect(() => {
    const response = fetchData(`/user/profile/${username}`);
    response.then((data) => {
      if (data.error) {
        setLoading(true);
      } else {
        const user = data.data.user;
        setDisplayName(user.displayName);
        setProfilePicture(user.profilePicture);
        setFollowers(user.followers);
      }
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
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
    }
  }, [followers]);

  const followUser = () => {
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
    response.then((data) => {
      console.log(data);
    });
  };

  const unfollowUser = () => {
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

  const activeStyle = {
    backgroundColor: "red",
  }

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
          top={"20px"}
          right={"20px"}
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
      <Flex
        padding={"1em"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex alignItems={"center"}>
          {profilePicture.length > 0 ? (
            <Avatar size="md" src={profilePicture} />
          ) : (
            <Avatar
              size="md"
              src={`https://avatars.dicebear.com/api/initials/${displayName}.svg`}
            />
          )}
          <Link to={`/${username}`}>
            <Text fontSize="2xl" fontWeight="bold" marginLeft={"0.5em"}>
              {displayName}
            </Text>
          </Link>
        </Flex>
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
      </Flex>
      <Flex
        // bg={"#e2e8f0"}
        
        w={"100%"}
        px={"2em"}
        py={"1.5em"}
        justifyContent={["space-between" , " left "]}
        gap={['' , '5em']}
      >
        {/* <ProfileBlock /> */}
        <NavLink to={`/${username}`} boxShadow={"sm"} 
        style={ ({isActive }) => isActive ? activeStyle : {}}
        >
          <Text fontSize={"1.2em"} fontWeight={"500"} 
            
          >
            Posts
          </Text>
        </NavLink>
        <NavLink to={`/${username}/donate`}
          style={ ({isActive }) => isActive ? activeStyle : {}}
        >
          <Text fontSize={"1.2em"} fontWeight={"500"}>
            Donate
          </Text>
        </NavLink>
        <NavLink to={`/${username}/profile`}>
          
            <Text fontSize={"1.2em"} fontWeight={"500"}>
              Profile
            </Text>
         
        </NavLink>
      </Flex>
      <Box my={"1em"}>{children}</Box>
    </Box>
  );
};

export default ProfileLayout;
