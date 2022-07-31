import { Box , Image , Text , Flex } from "@chakra-ui/react";

const Divider = () => {
    return (
        <>
        

            <Box my={'2em'}>
                <Image 
                width={['70%','50%']}
                mx={'auto'}
                src={'https://res.cloudinary.com/dhkccnvyn/image/upload/v1659280835/quick/Rectangle_770_h8zxfo.svg'} />
            </Box>


            <Box my={'1em'}>


                <Text fontWeight={'bold'} 
                    fontSize={['1.2em', '2em']}
                    width={['60%' , '40%']}
                    mx={'auto'}
                    textAlign={'center'}
                    fontFamily={'var(--primary-font)'}
                >
                       Designed for
                    creators,
                    not for businesses.
                </Text>

            </Box>


        </>
    )
}

export default Divider ;