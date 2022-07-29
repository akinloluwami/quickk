import React, { useEffect, useState } from "react";
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
// import { Helmet } from "react-helmet";

function ResetPassword() {
  const token = window.location.search.split("=")[1];
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { password, confirmPassword, requestToken: token };
    const response = await postData(`/auth/reset-password`, data);
    console.log(response);
    if (response.status === 200) {
      toast.success("Password has been reset");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      toast.error(response.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = "Reset Password | Quickk";
  }, []);
  return (
    <>
      {/* <Helmet>
        <title>Reset Password | Quickk</title>
      </Helmet> */}
      <ToastContainer />
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
                  Reset Password{" "}
                </Text>
                <Text my="1em"> Hey, looks like you forgot your password </Text>
              </Box>

              <Inputs
                placeholder={"New password"}
                label="new-password"
                type={"password"}
                icon={<MdOutlinePassword />}
                onChange={(e) => setPassword(e.target.value.trim())}
                onKeyPress={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                // autoComplete={"new-password"}
              />
              <Inputs
                placeholder={"Repeat password"}
                label="repeat-password"
                type={"password"}
                icon={<MdOutlinePassword />}
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                onKeyPress={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                // autoComplete={"repeat-password"}
              />
              <Center>
                <Buttons
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
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
                      "Reset Password"
                    )
                  }
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

export default ResetPassword;
