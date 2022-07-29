import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Box, Center, Image, Flex, Text } from "@chakra-ui/react";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Inputs from "../../components/major/Inputs";
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { postData } from "../../utils/Request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
// import { Helmet } from "react-helmet";

function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { displayName, username, email, password, confirmPassword };
    const response = await postData(`/auth/signup`, data);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      toast.success("Sign up sucessful");
      setLoading(false);
      setTimeout(() => {
        navigate("/verify-email");
      }, 1500);
    } else {
      toast.error(response.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = "Sign up | Quickk";
  }, []);
  return (
    <>
      {/* <Helmet>
        <title>Signup | Quickk</title>
      </Helmet> */}
      <ToastContainer autoClose={2000} />
      <AuthLayout>
        <Flex justifyContent={"center"} alignItems="center" py="2em" h="80%">
          <Box my="1em" bg={"#fff"} width={["90%", "60%"]} py="2em" px={"1em"}>
            <center>
              <Link to={"/"}>
                <Box my={"3em"} display={["block", "none"]}>
                  <Image
                    src={
                      "https://res.cloudinary.com/dhkccnvyn/image/upload/v1658534732/quick/dashboard_zosbzh.svg"
                    }
                  />
                </Box>
              </Link>
            </center>

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
                  disabled={loading}
                  value={
                    loading ? (
                      <ReactLoading
                        type={"bubbles"}
                        color={"#fff"}
                        height={70}
                        width={70}
                      />
                    ) : (
                      "Sign up"
                    )
                  }
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
