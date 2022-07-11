import { Box , Center, Flex } from "@chakra-ui/react";
import Logo from "../components/minor/Logo";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {


    return (
        <>

            <Flex bg={'var(--bg)'} >
                <Box bg={'#000'}  width={['50%']} height = {'100vh'} display={['none' , 'none']}>
 
                    <Box p='2em'>
                        <Logo/>
                    </Box> 

                </Box>

                <Box bg={'var(--bg)'} width={['100%','50%']} h='100vh' margin={'auto'}>
                        
                   
                    {children}
                  
                    
                </Box>
            </Flex>
        
        
        </>
    )

}


export default AuthLayout;