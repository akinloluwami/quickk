
import {Box, Flex, Text} from "@chakra-ui/react";
import {BiBox} from "react-icons/bi";
const NoUserPost = () => {
    return (
        <>

            <Flex justifyContent={'center'} textAlign={'center'}>
                <Box>
                   <center>
                     <BiBox size={'3.5em'} fill={'gray'}/>
                   </center>

                    <Text my={'0.5em'} color={'gray'}>No post from this user yet </Text>
            </Box>
            </Flex>
        </>
    )
}


export default NoUserPost;