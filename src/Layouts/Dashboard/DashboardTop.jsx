import {
  Avatar,
  Text,
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Logo from "./dashboard.svg";
import { FiLogOut, FiBell } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Buttons from "../../components/major/Buttons";
import { FaUserEdit } from "react-icons/fa";

const DashboardTop = ({ displayName, profilePic, username }) => {
  //initilize state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <Box
        bg={"#fff"}
        color="#000"
        py={"1em"}
        px={["1.5em", "5em"]}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box>
          <img src={Logo} alt="" />
        </Box>

        <Flex>
          {/* only display menue when user is logged in */}
          {/* check for authentication state */}
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Buttons value={"Log in"} />
              </Link>
            </>
          ) : (
            <>
              <Flex alignItems={"center"} mx={"1em"}>
                <FiBell color={"#000"} cursor={"pointer"} size={"1.5em"} />
              </Flex>

              {/* Menu for user */}
              <Menu>
                <MenuButton>
                  <Flex alignItems={"center"} gap={"1em"}>
                    <Avatar name={displayName} size={"md"} src={profilePic} />
                    <Text fontWeight={"bold"} display={["none", "block"]}>
                      {displayName}
                    </Text>
                    <Text>
                      <BiChevronDown />
                    </Text>
                  </Flex>
                </MenuButton>

                <MenuList>
                  <Link to={`/${username}`}>
                    <MenuItem>
                      <Text mr="1em">
                        <BiUserCircle />
                      </Text>{" "}
                      Profile.
                    </MenuItem>
                  </Link>
                  <Link to="/edit-profile">
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
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default DashboardTop;
