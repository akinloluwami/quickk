import { Box, Flex, Text } from "@chakra-ui/react";
import ContainerLayout from "../../../Layouts/ContainerLayout.jsx/ContainerLayout";

const PostHeader = () => {
    return (
        <>

            <Box bg={'black'} p={'2em'}>
                <ContainerLayout>
                    <Flex color={'white'} fontWeight={'bold'} fontSize={['1.2em' , '1.7em']}>
                        <Text> Post name </Text>


                    </Flex>
                </ContainerLayout>
            </Box>

        </>
    )
}

export default PostHeader;