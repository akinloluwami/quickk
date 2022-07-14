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
import { FiLogOut } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";

const DashboardTop = ({ displayName, profilePic }) => {
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

        <Box>
          <Menu>
            <MenuButton>
              <Flex alignItems={"center"} gap={"1em"}>
                <Avatar src={profilePic} />
                <Text fontWeight={"bold"} display={["none", "block"]}>
                  {displayName}
                </Text>
                <Text>
                  <BiChevronDown />
                </Text>
              </Flex>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Text mr="1em">
                  <BiUserCircle />
                </Text>{" "}
                Profile.
              </MenuItem>

              <MenuItem>
                <Text mr="1em">
                  <FiLogOut />
                </Text>
                logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default DashboardTop;
