import { Box, Flex } from "@chakra-ui/react";
import Logo from "../components/minor/Logo";
import Pattern from "./pattern.svg";
import { Text } from "@chakra-ui/react";
import ContainerLayout from "./ContainerLayout.jsx/ContainerLayout";
import { Link } from "react-router-dom";
import Phrase from "../components/phrase";
const AuthLayout = ({ children }) => {
  return (
    <>
      <Flex>
        <Box
          bg={"var(--primary-color)"}
          overflowX="hidden"
          width={["50%"]}
          height={"100vh"}
          display={["none", "block"]}
        >
          <Box p="2em">
            <Link to="/">
              <Logo />
            </Link>
          </Box>

          <ContainerLayout>
            <Box
              display={"flex"}
              h={"50vh"}
              alignContent={"center"}
              alignItems="center"
            >
              <Box px="1em">
                <Text
                  fontWeight={"black"}
                  fontFamily={"var(--primary-font)"}
                  fontSize="5xl"
                  color={"#fff"}
                >
                  {Phrase()}
                </Text>
                <Text pr="2em" my={"1em"} color={"#fff"}>
                  Setup your blog in less than 2 minutes, start writing and
                  accepting donations in no time.
                </Text>
              </Box>
            </Box>
          </ContainerLayout>

          <Box position={"absolute"} bottom="0">
            <img src={Pattern} alt="pattern" />
          </Box>
        </Box>

        <Box bg={""} width={["100%", "50%"]} h="100vh">
          <Box>{children}</Box>
        </Box>
      </Flex>
    </>
  );
};

export default AuthLayout;
