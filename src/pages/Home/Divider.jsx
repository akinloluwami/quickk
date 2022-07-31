import { Box , Image , Text , Button,  Flex } from "@chakra-ui/react";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import { Link } from 'react-router-dom';

const Divider = () => {
    return (
        <>
        

            <ContainerLayout>
            <Box my={'2em'}>
                <Image 
                width={['70%','30%']}
                mx={'auto'}
                boxShadow={''}
                borderRadius={'2em'}
                src={'https://res.cloudinary.com/dhkccnvyn/image/upload/v1659284262/quick/Group_45_jmbzcc.svg'} />
            </Box>


            <Box my={['1em' , '5em']}>


                <Text fontWeight={'bold'} 
                    fontSize={['1.2em', '2em']}
                    width={['60%' , '40%']}
                    mx={'auto'}
                    textAlign={'center'}
                    fontFamily={'var(--primary-font)'}
                >
                       Designed for Writers and Creatives 
                    
                </Text>

               <center>
               <Box my={'3em'} >

                    <Link to='/login'>
                    <Button bg={'black'} color={"#fff"} py={'1.5em'}
                        _hover = {{
                            backdround: ' black'
                        }}
                     >
                        Get Started Today
                    </Button>
                    </Link>

               </Box>
               </center>

               

            </Box>
            </ContainerLayout>


        </>
    )
}

export default Divider ;