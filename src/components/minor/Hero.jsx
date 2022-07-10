import ContainerLayout from '../../Layouts/ContainerLayout.jsx/ContainerLayout';
import {Box, Flex, Text} from '@chakra-ui/react';
import Buttons from '../major/Buttons';

const Hero = () => {

    return (
        <>

            <Box py='1em' bg={'#000'} h='100vh' color={'#fff'}>
                    <ContainerLayout>
                         <Flex h='80vh' flexDir={'column'} justifyContent={'center'} alignContent={'center'} alignItems={'center'} >
                            <Box>
                                <Text textAlign={'center'}>Create A Blog in less than 2 min</Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit aspernatur qui labore libero fuga quaerat explicabo similique consectetur, quas facere placeat possimus nemo itaque sed eum at iure reprehenderit harum!
                            </Box>
                            <Buttons value={'Get Started'} bg={'blue.500'} />
                         </Flex>
                    </ContainerLayout>
            </Box>

        </>
    )
}

export default Hero ;