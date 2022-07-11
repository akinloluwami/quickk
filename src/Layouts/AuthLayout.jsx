import { Box , Flex } from "@chakra-ui/react";
import Logo from "../components/minor/Logo";


const AuthLayout = ({ children }) => {


    return (
        <>

            <Flex>
                <Box bg={'#000'} width={['50%']} height = {'100vh'} display={['none' , 'block']}>

                    <Box p='2em'>
                        <Logo/>
                    </Box> 

                </Box>

                <Box bg={'var(--bg)'} width={['100%','50%']} h='100vh'>
                    
                    {children}
                    
                </Box>
            </Flex>
        
        
        </>
    )

}


export default AuthLayout;