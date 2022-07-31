import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Image,
  UnorderedList,

  Button
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
      <Box py="1em" position={'relative'} bg={"#000"} h="100vh" color={"#fff"}>
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
                  <Button
                  bg={'#191919'}
                  color={'#fff'}
                  _hover = {{ 
                    backdround: ' #191919'
                  }}

                   > Login </Button>
                  </Link>
                </UnorderedList>
              </Box>

              <Box display={["block", "none"]}>
                 <Link to={'/login'}>
                  <Button
                  bg={'#191919'}
                  color={'#fff'}

                   > Login </Button>
                 </Link>
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
                  
                <Button
                  bg={'#191919'}
                  color={'#fff'}
                  px={'4em'}
                  py={'1.6em'}
                  _hover = {{ 
                    backdround: ' #191919'
                  }}

                   > Get Started </Button>
              
            </Link>
          </Flex>
        </ContainerLayout>

        <Box position={'absolute'} bottom={0} width={['','40%']}>
         <Image src={'https://res.cloudinary.com/dhkccnvyn/image/upload/v1659283237/quick/Group_44_gor4ho.svg'} />
        </Box>
    
      </Box>
    </>
  );
};

export default Hero;
