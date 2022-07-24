import { Box,  Flex,  Skeleton, SkeletonCircle, SkeletonText, } from '@chakra-ui/react';

const LoadingProfile = () => {

    return (
        <>

            <Flex h={'30vh'} alignItems={'center'}>
                <Box >

                <center>
                    <SkeletonCircle size={'3em'} my={'1em'}/>
                </center>
                <SkeletonText h={'2em'} width={["20em","30em"]}
                 noOfLines={5} spacing = {4}
                />

            </Box>
            </Flex>
        
        </>
    )
}


export default LoadingProfile;