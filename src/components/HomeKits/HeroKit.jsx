import { Box , Flex, Text} from "@chakra-ui/react";
import ContainerLayout from '../../Layouts/ContainerLayout.jsx/ContainerLayout';

const HeroKit = () => {
    return (
        <>
        
          <Box bg={'var(--bg)'} height={'100vh'} >
              <ContainerLayout>
                <Flex justifyContent={'center'} alignItems={'center'} h={'80vh'}>
                    <Box>
                     <Text fontSize={['3xl' , '4em']}
                      textAlign={'center'}
                        fontWeight={'bold'}
                        width={['100%','80%']}

                      >
                         Let your imagination run wild
                      </Text>
                    </Box>
                </Flex>
              </ContainerLayout>
          </Box>       
        
        </>
    )
}

export default HeroKit;