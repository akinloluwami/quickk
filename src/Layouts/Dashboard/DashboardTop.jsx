import { Avatar, Text, Flex, Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

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
                                     <Text fontWeight={'bold'}>Obiabo</Text>
                                   </Flex>
                               </Box>

                               <Box display={['block' , 'none']}>
                                 <Flex alignItems={'center'} gap={'1em'}>
                                    <Avatar size={'sm'}/>
                                   
                                   </Flex>
                               </Box>
                            </MenuButton>

                            <MenuList>
                               
                                <MenuItem>
                                    Profile.
                                </MenuItem>

                                <MenuItem>
                                    logout
                                </MenuItem>

                            </MenuList>
                        </Menu>
                   </Box>
            </Box>
        
        </>
    )
}

export default DashboardTop