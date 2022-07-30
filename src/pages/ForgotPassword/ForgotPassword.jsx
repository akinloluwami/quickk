import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Image, Center, Flex, Text } from "@chakra-ui/react";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Inputs from "../../components/major/Inputs";
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
import { MdOutlineMail } from "react-icons/md";
import { postData } from "../../utils/Request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
// import { Helmet } from "react-helmet";
import Logo from '../../components/minor/Logo';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email };
    const response = await postData(`/auth/send-reset-link`, data);
    if (response.status === 200) {
      setLoading(false);
      setSent(true);
    } else {
      toast.error(response.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Forgot Password | Quickk";
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Forgot Password | Quickk</title>
      </Helmet> */}
      <AuthLayout>
        <ToastContainer autoClose={3500} />
        <Flex justifyContent={"center"} alignItems="center" py="2em" h="80%">
          {sent ? (
            <Box
              my="3em"
              bg={"#fff"}
              width={["90%", "60%"]}
              py="2em"
              px={"1em"}
            >

              <center>
              <Box >
                <iframe src="https://embed.lottiefiles.com/animation/94029"></iframe>
              </Box>
              </center>

              <Text
                fontSize={"xl"}
                fontWeight={"medium"}
                fontFamily={"var(--primary-font)"}
                textAlign={"center"}
                my={'1em'}
              >
                 Hello,  {email},
              </Text>
              <Text
                fontSize={"xl"}
                fontWeight={"medium"}
                fontFamily={"var(--primary-font)"}
                textAlign={"center"}
              >
                {" "}
                We have sent you an email with a link to reset your password.
                Please check your email.

                
              </Text>

              <Box>

              <Box display={'flex'}  my={'5em'} justifyContent={'center'}
                onClick = { e => window.history.back() }
              >
                <Image
                      src={
                        "https://res.cloudinary.com/dhkccnvyn/image/upload/v1658534732/quick/dashboard_zosbzh.svg"
                      }
                    />
                </Box>
              </Box>

              

             
            </Box>
          ) : (
            <Box
              my="1em"
              bg={"#fff"}
              width={["90%", "60%"]}
              py="2em"
              px={"1em"}
            >
              <form>
                <Box my="1em">
                  <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    fontFamily={"var(--primary-font)"}
                  >
                    {" "}
                    Forgotten password ? 🔒{" "}
                  </Text>
                </Box>

                <Inputs
                  placeholder={"Email"}
                  label="Email "
                  type={"email"}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  icon={
                    <Text fontSize={"1.1em"}>
                      {" "}
                      <MdOutlineMail />{" "}
                    </Text>
                  }
                />

                <Text textAlign={"center"} my="1em">
                  {" "}
                  Remembered password ?{" "}
                  <Link to={"/login"}>
                    <b>signin</b>
                  </Link>{" "}
                </Text>

                <Center>
                  <Buttons
                    onClick={handleSubmit}
                    disabled={loading || email === ""}
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
          )}
          
        </Flex>
      </AuthLayout>
    </>
  );
}

export default ForgotPassword;
