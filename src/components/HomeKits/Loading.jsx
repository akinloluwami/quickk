import { Box } from "@chakra-ui/react";

const Loading = () => {
  return (
    <>
      <Box
        w={"100vw"}
        h={"100vh"}
        bg={"#000000eb"}
        position={"fixed"}
        zIndex={"999"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box>
          <span class="loader"></span>
        </Box>
      </Box>
    </>
  );
};

export default Loading;
