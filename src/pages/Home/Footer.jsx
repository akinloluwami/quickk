import { Box, List, UnorderedList } from "@chakra-ui/react";
import {AiFillGithub} from 'react-icons/ai'
import {FaDiscord} from 'react-icons/fa'
const Footer = () => {

    return (

        <>

            <Box my={'2em'} >
                <center>
                    <UnorderedList display={'flex'} justifyContent={'center'}  gap={'2em'}>
                        <List> <AiFillGithub size={'1.7em'}/> </List>
                        <List>  <FaDiscord size={'1.7em'}/> </List>
                    </UnorderedList>
                </center>
            </Box>
        
        </>

    )

}


export default Footer ;