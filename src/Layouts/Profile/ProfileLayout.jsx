import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import ProfileBlock from "../../pages/Profile/ProfileBlock";
import ProfileItems from "./ProfileItems";
import { Link } from 'react-router-dom';

const  ProfileLayout = ({children}) => {


    return (
        <>
        
          <Box bg={'#fff'} p={'2em'} w={'100%'}>

             <ProfileBlock/>


             <Box my={['1em' , '3em']}>

                <UnorderedList listStyleType={'none'} mx={'0'} display={'flex'} gap={'3em'}>
                    {
                        ProfileItems.map((item, index) => {

                            return (
                               <>
                                 <Link to={item.path}>
                                    <ListItem> {item.name}</ListItem>
                                 </Link>
                               </>
                            )

                        })
                    }
                </UnorderedList>

                
                <Box my={'1em'}>

                     {children}
                    
                </Box>

             </Box>

          </Box>
        </>
    )

}


export  default ProfileLayout;