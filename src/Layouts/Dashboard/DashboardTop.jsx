import { Avatar, Text, Flex, Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import {BiChevronDown} from 'react-icons/bi';
import {FiLogOut} from 'react-icons/fi';
import {BiUserCircle} from 'react-icons/bi';
import Logo from './dashboard.svg'
const DashboardTop = () => {

    return (
        <>
        
            <Box bg={'#fff'} color='#000' py={'1em'} px={['1em','5em']} display={'flex'} justifyContent={'space-between'}>
                   <Box >
                        <img src={Logo} alt="" />
                   </Box>

                   <Box>
                        <Menu>

                            <MenuButton>
                               <Box display={['none' , 'block']}>
                                 <Flex alignItems={'center'} gap={'1em'}>
                                    <Avatar size={'sm'}/>
                                     <Text>Obiabo</Text>
                                     <BiChevronDown/>
                                   </Flex>
                               </Box>

                               <Box display={['block' , 'none']}>
                                 <Flex alignItems={'center'} gap={'1em'}>
                                    <Avatar size={'sm'}/>
                                    <BiChevronDown/>
                                   
                                   </Flex>
                               </Box>
                            </MenuButton>

                            <MenuList>
                               
                                <MenuItem>
                                   <Text mr='2'><BiUserCircle/></Text> Profile.
                                </MenuItem>

                                <MenuItem>
                                  <Text mr='0.5em'><FiLogOut/></Text>  logout
                                </MenuItem>

                            </MenuList>
                        </Menu>
                   </Box>
            </Box>
          
        </>
    )
}

export default DashboardTop