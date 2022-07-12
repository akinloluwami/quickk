import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Inputs from "../../components/major/Inputs";
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";

function Login() {
  return (
    <>
      <AuthLayout>
        <Flex justifyContent={"center"} alignItems="center" py="2em" h="80%">
          <Box my="1em" bg={"#fff"} width={["90%", "60%"]} py="2em" px={"1em"}>
            <form>
              <Box my="1em">
                <Text
                  fontSize={"xl"}
                  fontWeight={"bold"}
                  fontFamily={"var(--primary-font)"}
                >
                  {" "}
                  Welcome back 👋{" "}
                </Text>
                <Text my="1em">Login to your Quickk account</Text>
              </Box>

              <Inputs
                placeholder={"Email"}
                label="Email"
                type={"email"}
                icon={<MdOutlineMail />}
              />
              <Inputs
                placeholder={"Password"}
                label="Password"
                type={"password"}
                icon={<MdOutlinePassword />}
              />

              <Text textAlign={"center"} my="1em">
                {" "}
                New to Quickk?{" "}
                <Link to="/signup">
                  {" "}
                  <b>Create an account</b>
                </Link>{" "}
              </Text>
              <Text textAlign={"center"} my="1em">
                <Link to="/forgot-password">
                  <p>Forgot password?</p>
                </Link>{" "}
              </Text>

              <Center>
                <Buttons
                  value={"Login"}
                  bg={"blue.500"}
                  color={"#fff"}
                  width={"100%"}
                />
              </Center>
            </form>
          </Box>
        </Flex>
      </AuthLayout>
    </>
  );
}

export default Login;
