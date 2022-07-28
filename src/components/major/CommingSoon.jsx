import {Box , Text , Image} from '@chakra-ui/react';


const CommingSoon = () => {

    return (
        <>
        
        
            <Box display={'flex'} my={'5em'} justifyContent={'center'}>
            <Box>
                 <iframe src="https://embed.lottiefiles.com/animation/90718"></iframe>
           
                <Text my={'2em'} textAlign={'center'}
                 fontWeight={"medium"}
                    color={"gray.700"}
                 >This Feature is Comming Soon</Text>
           
            </Box>
            </Box>
        
        </>
    )

}

export default CommingSoon;