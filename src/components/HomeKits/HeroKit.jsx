import { Box , Flex, Text} from "@chakra-ui/react";
import ContainerLayout from '../../Layouts/ContainerLayout.jsx/ContainerLayout';

const HeroKit = () => {
    return (
        <>
        
          <Box bg={'var(--bg)'} height={'100vh'}>
              <ContainerLayout>
                <Flex justifyContent={'center'}>
                    <Box>
                     <Text fontSize={['3xl' , '5xl']}
                      textAlign={'center'}
                        fontWeight={'bold'}
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