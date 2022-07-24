import Skeleton from 'react-loading-skeleton';

import { Box } from '@chakra-ui/react';
const ContentLoader = () => {
    return (
        <>
        
           <Box w={['100%' , '70%']} mx={'auto'}>
                <Skeleton height={'23px'}/>

                <Box my={'2em'}>
                    <Skeleton width="100%"  count={5}/>
                </Box>

                <Box my={'1em'}>
                  <Skeleton width={'30%'}/>
                </Box>
           </Box>

        </>
    )
}

export default ContentLoader;