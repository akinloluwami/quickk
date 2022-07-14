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
import Logo from "../../components/minor/Logo";
const DashboardTop = ({ displayName }) => {
  return (
    <>
      <Box
        bg={"#fff"}
        color="#000"
        py={"1em"}
        px={"5em"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box>
          <Logo />
        </Box>

        <Box>
          <Menu>
            <MenuButton>
              <Flex alignItems={"center"} gap={"1em"}>
                <Avatar size={"sm"} />
                <Text fontWeight={"bold"}>{displayName}</Text>
              </Flex>
            </MenuButton>

            <MenuList>
              <MenuItem>Profile.</MenuItem>

              <MenuItem>logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default DashboardTop;
