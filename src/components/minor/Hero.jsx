import ContainerLayout from '../../Layouts/ContainerLayout.jsx/ContainerLayout';
import {Avatar, Box, Flex, Text, Menu , MenuItem , MenuList, MenuButton} from '@chakra-ui/react';
import Buttons from '../major/Buttons';
import Logo from './Logo';
import {FaBars} from 'react-icons/fa';
import Memojie from '../Avater.svg';

const Hero = () => {

    return (
        <>

            <Box py='1em' bg={'#000'} h='100vh' color={'#fff'}>
                    <ContainerLayout>
                         <Flex justifyContent={'space-between'} alignItems={'center'}>
                             <Logo/>


                              <Menu>
                                <MenuButton><Avatar size={['sm', 'md']} src={Memojie}/></MenuButton>
                                <MenuList color={'#000'}>
                                    <MenuItem>Sign up </MenuItem>
                                    <MenuItem>Sign in </MenuItem>
                                </MenuList>
                              </Menu>
                            
                         </Flex>
                         <Flex h='80vh' my='' flexDir={'column'} justifyContent={'center'} alignContent={'center'} alignItems={'center'} >
                            <Box>
                                <Text textAlign={'center'} fontWeight={'bold'} fontFamily = {'var(--primary-font)'} fontSize={['2em' , '5em']} width = {['' , '70%']} mx={'auto'}> Let your imagination run wild </Text>
                              
                                <Text my={'2em'} textAlign={'center'}> Build a blog in 2 seconds  </Text>
                            </Box>
                            <Buttons value={'Get Started'} bg={'blue.500'} />
                         </Flex>
                    </ContainerLayout>
                    
            </Box>

        </>
    )
}

export default Hero ;