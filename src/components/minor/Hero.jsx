import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Buttons from "../major/Buttons";
import Logo from "./Logo";
import { FaBars } from "react-icons/fa";
import Memojie from "../Avater.svg";
import { Link } from "react-router-dom";
import Phrase from "../phrase";

const Hero = () => {
  return (
    <>
      <Box py="1em" bg={"#000"} h="100vh" color={"#fff"}>
        <ContainerLayout>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Logo />

            <Box>
              <Box display={["none", "block"]}>
                <UnorderedList
                  listStyleType="none"
                  display={"inline-flex"}
                  gap={"2em"}
                >
                  <Link to="/login">
                    <ListItem> Sign in </ListItem>
                  </Link>
                </UnorderedList>
              </Box>

              <Box display={["block", "none"]}>
                <FaBars />
              </Box>
            </Box>
          </Flex>
          <Flex
            h="80vh"
            my=""
            flexDir={"column"}
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Box>
              <Text
                textAlign={"center"}
                fontWeight={"bold"}
                fontFamily={"var(--primary-font)"}
                fontSize={["2em", "5em"]}
                width={["", "70%"]}
                mx={"auto"}
              >
                {Phrase()}
              </Text>

              <Text my={"2em"} textAlign={"center"}>
                {" "}
                Create a blog in less than 2 minutes. Start writing and
                accepting donations.{" "}
              </Text>
            </Box>
            <Link to="/signup">
              <Buttons value={"Get Started"} bg={"blue.500"} />
            </Link>
          </Flex>
        </ContainerLayout>
      </Box>
    </>
  );
};

export default Hero;
