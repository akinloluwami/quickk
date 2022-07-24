import { Box , Text , Flex } from '@chakra-ui/react';
import {TbUserOff} from 'react-icons/tb';
import Buttons from '../major/Buttons';
import { Image } from '@chakra-ui/react';


const NoUser = ({ message }) => {
    const goBack = () => {
        window.history.back();
    }
    return (
        <>
            <Flex h={'80vh'} alignItems={'center'} justifyContent={'center'}>
                <Box>
                    

                    
                    
                    <Image width={'20em'} src='https://res.cloudinary.com/dhkccnvyn/image/upload/v1658637263/People_search-cuate_vwqqbv.svg' />
                    <center>
                        <Text my={'1em'}>{message}</Text>
                        <Buttons value={'Return Back'}  onClick={goBack}/>
                    </center>
                </Box>
            </Flex>
        </>
    );
}

export default NoUser;