import { Avatar, Box , Flex, Text } from "@chakra-ui/react";

const ProfileBlock = () => {

    return (
        <>
        
            <Box p='1em'>
                <Flex gap={'2em'} alignItems={'center'} flexDir={['column' , 'row']}>
                    <Box justifyContent={['left']} >
                        <Avatar size={['lg','xl']}/>
                    </Box>
                    {/* user profile views */}
                    <Box textAlign={['center' , 'left']}>
                        <Text fontWeight={'bold'} > Xing JustXing </Text>
                        <Text color={'gray'} my={'0.5em'}> @XingCodes </Text>
                        <Text color={'gray'}> 300 Followers | 0 Following  </Text>
                    </Box>

                    <Box>

                    </Box>
                </Flex>
            </Box>
        
        </>
    )
}

export default ProfileBlock;