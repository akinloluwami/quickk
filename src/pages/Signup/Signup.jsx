import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Inputs from "../../components/major/Inputs";
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { postRequest } from "../../utils/Request";

function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { displayName, username, email, password, confirmPassword };
    const response = await postRequest(`${backendURL}/auth/signup`, data);
    if (response.status === 200) {
      setLoading(false);
      navigate("/verify-email");
    } else {
      setLoading(false);
      // setError(response.data.message);
      console.log(response.data);
    }
  };

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
                  Create A Quickk Account 👋{" "}
                </Text>
              </Box>

              <Inputs
                placeholder={"Display name"}
                label="Display name"
                type={"text"}
                icon={<AiOutlineUser />}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <Inputs
                placeholder={"Username"}
                label="Username"
                type={"text"}
                icon={<AiOutlineUser />}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Inputs
                placeholder={"Email"}
                label="Email"
                type={"Email"}
                icon={<MdOutlineMail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Inputs
                placeholder={"Password"}
                label="Password"
                type={"Password"}
                icon={<MdOutlinePassword />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Inputs
                placeholder={"Confirm password"}
                label="Confirm Password"
                type={"password"}
                icon={<MdOutlinePassword />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Center>
                <Buttons
                  value={"Sign up"}
                  bg={"blue.500"}
                  color={"#fff"}
                  width={"100%"}
                  onClick={(e) => {
                    handleSubmit(e);
                    console.log("clicked");
                  }}
                />
              </Center>
              <Text textAlign={"center"} my="1em">
                {" "}
                Already have an account ?{" "}
                <Link to="/login">
                  <b>Login</b>
                </Link>{" "}
              </Text>
            </form>
          </Box>
        </Flex>
      </AuthLayout>
    </>
  );
}

export default Signup;
