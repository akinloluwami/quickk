<<<<<<< HEAD
import { Avatar, Text, Flex, Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import Logo from './dashboard.svg'
const DashboardTop = () => {

    return (
        <>
        
            <Box bg={'#fff'} color='#000' py={'1em'} px={['1em','5em']} display={'flex'} justifyContent={'space-between'}>
                   <Box >
                        <img src={Logo} alt="" />
                   </Box>
=======
import {
  Avatar,
  Text,
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Logo from "../../components/minor/Logo";
const DashboardTop = ({ displayName }) => {
  return (
    <>
      <Box
        bg={"#fff"}
        color="#000"
        py={"1em"}
        px={"5em"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box>
          <Logo />
        </Box>

        <Box>
          <Menu>
            <MenuButton>
              <Flex alignItems={"center"} gap={"1em"}>
                <Avatar size={"sm"} />
                <Text fontWeight={"bold"}>{displayName}</Text>
              </Flex>
            </MenuButton>
>>>>>>> 97c9ed7 (...)

            <MenuList>
              <MenuItem>Profile.</MenuItem>

<<<<<<< HEAD
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
=======
              <MenuItem>logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};
>>>>>>> 97c9ed7 (...)

export default DashboardTop;
