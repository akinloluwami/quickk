import { Box, Link, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { postData, fetchData } from "../../../utils/Request";

function Links() {
  const username = window.location.pathname.split("/")[1];
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    const response = fetchData(`/user/get-links/${username}`);
    response.then((data) => {
      console.log(data);
      setUserLinks(data.data.links);
    });
  }, []);

  return (
    <>
      <Box display={"flex"}  flexDirection="column">
        {userLinks.map((link) => (
          <Link key={link.id} href={link.url} target="_blank">
            <Button width={["100%","400px"]}  my={4} p={'1.8em'} bg={'black'} 
            color={"#fff"}
            boxShadow={'xl'}
            borderRadius="5px"
            _hover = {{

              boxShadow: 'xl',
              bg: '#525252',

            }}
            >
              {link.title}
            </Button>
          </Link>
        ))}
      </Box>
    </>
  );
}

export default Links;
