import PostBox from "../../components/Post/PostBox";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import UserPost from './UserPost';
import { Box } from '@chakra-ui/react';
import PostHeader from "./Components/PostHeader";

const PostIndex = () => {

    return (
        <>

            <Box position={'relative'} display={'flex'} flexDir={'column'} width={"100%"} justifyContent={'center'}  mx={'auto'} bg={''}>
              <Box  position={'fixed'} top={'0'} right={'0'} left={'0'} zIndex={'2'} >
                <PostHeader/>
              </Box>
                <ContainerLayout>
                    
                   <Box my={'8em'}>
                    <UserPost/>
                   </Box>
                </ContainerLayout>
            </Box>
        
        </>
    )


}


export default PostIndex;