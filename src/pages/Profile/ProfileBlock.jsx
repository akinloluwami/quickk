import { Avatar, Box , Flex, Text } from "@chakra-ui/react";

const ProfileBlock = () => {

    return (
        <>
        
            <Box p='1em'>
                <Flex gap={'2em'}>
                    <Box>
                        <Avatar size={'lg'}/>
                    </Box>
                    {/* user profile views */}
                    <Box>
                        <Text fontWeight={'bold'} > Xing JustXing </Text>
                        <Text color={'gray'} my={'0.5em'}> @XingCodes </Text>
                    </Box>

                    <Box>
                        
                    </Box>
                </Flex>
            </Box>
        
        </>
    )
}

export default ProfileBlock;