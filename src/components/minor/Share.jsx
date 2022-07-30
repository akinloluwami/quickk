import React, { Fragment, useState } from "react";
import {
  Button,
  Flex,
  Text,
  Textarea,
  Input,
  Box,
  Link,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaTimes,
  FaShareAlt,
} from "react-icons/fa";
function Share({ link, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttons = [
    {
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?text=${title}&url=${link}`,
      name: "Twitter",
      color: "#1DA1F2",
    },
    {
      icon: <FaFacebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      name: "Facebook",
      color: "#3b5998",
    },
    {
      icon: <FaLinkedin />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}`,
      name: "Linkedin",
      color: "#0077B5",
    },
    {
      icon: <FaWhatsapp />,
      url: `https://api.whatsapp.com/send?text=${title} ${link}`,
      name: "Whatsapp",
      color: "#25D366",
    },
  ];
  return (
    <Box position={"relative"}>
      <Button size="sm" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaShareAlt />}
      </Button>
      {isOpen && (
        <Flex
          position={"absolute"}
          //position to the center of the button
          top={"400%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          flexDirection={"column"}
        >
          {buttons.map((button) => (
            <Link key={button.name} href={button.url} target="_blank">
              <Button
                size="sm"
                variant="ghost"
                variantColor="blue"
                leftIcon={button.icon}
                backgroundColor={button.color}
                color="white"
                my={2}
              >
                {button.name}
              </Button>
            </Link>
          ))}
        </Flex>
      )}
    </Box>
  );
}

export default Share;
