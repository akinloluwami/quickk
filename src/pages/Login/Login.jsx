import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Inputs from "../../components/major/Inputs";
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { postData } from "../../utils/Request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email, password };
    const response = await postData(`/auth/login`, data , {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "mode": "cors",

    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      toast.success("Login sucessful");
      setLoading(false);
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 1500);
    } else {
      toast.error(response.response.data.message || "Something went wrong");
      setLoading(false);
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
                  Welcome back 👋{" "}
                </Text>
                <Text my="1em">Login to your Quickk account</Text>
              </Box>

              <Inputs
                placeholder={"Username or Email"}
                label="Email"
                type={"email"}
                icon={<MdOutlineMail />}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Inputs
                placeholder={"Password"}
                label="Password"
                type={"password"}
                icon={<MdOutlinePassword />}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Center> 
                <Buttons
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  disabled={loading || !email || !password}
                  value={
                    loading ? (
                      <ReactLoading
                        type={"bubbles"}
                        color={"#fff"}
                        height={70}
                        width={70}
                      />
                    ) : (
                      "Login"
                    )
                  }
                  bg={"blue.500"}
                  color={"#fff"}
                  width={"100%"}
                />
              </Center>
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
            </form>
          </Box>
        </Flex>
      </AuthLayout>
    </>
  );
}

export default Login;
