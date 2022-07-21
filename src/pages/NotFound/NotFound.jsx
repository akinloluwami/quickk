import Buttons from '../../components/major/Buttons';

import { Box, Text, Flex } from '@chakra-ui/react';
import ContainerLayout from '../../Layouts/ContainerLayout.jsx/ContainerLayout';
import { Link
 } from 'react-router-dom';
const NotFound = () => {

    return (
        <>

             <ContainerLayout>
                <Flex justifyContent={'center'} 
                textAlign={'center'}
                 alignContent={'center'}
                 h={'90vh'}
                 alignItems={'center'}
                 >
                    <Box>
                    <Box my={'2em'}>
                        
                     
                    <Text fontWeight={'medium'} my={'2em'} color={'grey'} >
                        The Page you are looking for is not found.
                    </Text>

                    <Box>
                      <iframe src="https://embed.lottiefiles.com/animation/95560"></iframe>
                    </Box>
                   
                    </Box>
                    <Box>
                        <Link to={'/'}>
                          <Buttons value={'Back to Home page '}/>
                        </Link>
                    </Box>
                    </Box>
                </Flex>
             </ContainerLayout>
        
        </>
    )
}

export default NotFound ;