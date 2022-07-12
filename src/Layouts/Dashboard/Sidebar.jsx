import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BarItems from "../../utils/BarContent";
import {TbLayoutDashboard} from 'react-icons/tb';

const Sidebar = () => {
    return (
        <>

            <Box bg={'#fff'} px={'4em'} py='6em'    position={'fixed'} bottom={'0'} top={'0'}>
                
                    {/* Loop through items of bar contents  */}
                   <UnorderedList listStyleType={'none'} display={'flex'} flexDir={'column'} gap={'3em'}>
                    {
                            BarItems.map ( ( items , index ) => {
                                const {name , link , icon} = items;
                                return (
                                    <>

                                       <Link to={link}>
                                          <ListItem>
                                            
                                            {name}
                                          
                                            
                                            </ListItem>
                                       </Link>

                                    </>
                                )
                                })
                        }
                   </UnorderedList>

            </Box>
        
        </>
    )
}

export default Sidebar;