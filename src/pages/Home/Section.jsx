import ContainerLayout from '../../Layouts/ContainerLayout.jsx/ContainerLayout';
import { Box  , Text , Flex , Image  } from '@chakra-ui/react';

const Section = () => {

    return (
        <>

           <Box h={'100vh'} py={'5em'} my={'1em'}>
           <ContainerLayout>
                <Box my={'2em'}>

                    <Text textAlign={'center'} 
                        fontWeight={'black'}
                        fontSize={['xl','3xl']}
                        fontFamily={'var(--primary-font)'}
                    > Set Up a Blog</Text>

                </Box>


                <Box>
                
                    <Flex flexDir={['column' , 'row']} gap={['2em' , '2em']}>

                        <Box>
                            <Text textAlign={['center' , 'left']}
                                my={'1em'}
                                fontWeight={'bold'}
                                fontSize={['xl' , '2xl']}
                            >Updates on Feeds</Text>
                            <Text width={['100%' , '70%']}
                                fontSize={['md','xl']}
                                textAlign = {['center' , 'left']}
                            >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, optio. Sed, expedita! Repudiandae quisquam accusamus cumque ad, eos perspiciatis error est, qui aliquid recusandae iure quibusdam non ratione nemo quia.
                            </Text>

                            <Text fontWeight={'bold'} my={'1em'}
                                color={'blue.500'}
                                textAlign={['center' , 'left']}
                            >
                                View Feeds 
                            </Text>
                        </Box>

                        <Box className='dangle'>

                            <Image src={'https://res.cloudinary.com/dhkccnvyn/image/upload/v1659285481/quick/Group_51_m2yiqe.svg'}

                            />
                        </Box>

                    </Flex>

                </Box>
            </ContainerLayout>
           </Box>
        
        </>
    )
}


export default Section; // export default Home;