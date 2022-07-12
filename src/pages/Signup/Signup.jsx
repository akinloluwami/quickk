import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import {Box ,Center,Flex, Text} from '@chakra-ui/react';
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Inputs from '../../components/major/Inputs';
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
import { MdOutlineMail , MdOutlinePassword } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'

function Signup() {
  return (
    <>

      <AuthLayout>



      <Flex justifyContent={'center'} alignItems='center' py='2em' h='80%'>
              <Box my='1em' bg={'#fff'} width={['90%','60%']}  py='2em' px={'1em'} > 
                  

                  <form>
                    
                      <Box my='1em'>
                         <Text fontSize={'xl'} fontWeight={'bold'} fontFamily={'var(--primary-font)'}>  Create A Quickk Account 👋 </Text>
                      </Box>

                     <Inputs placeholder={'display name'} label='Username' type={'text'} icon = {<AiOutlineUser/>} />
                     <Inputs placeholder={'user name'} label='Username' type={'text'} icon = {<AiOutlineUser/>}/>
                     <Inputs placeholder={'email'} label='Email' type={'email'} icon ={<MdOutlineMail/>}/>
                     <Inputs placeholder={'password'} label='Password' type={'password'} icon={ <MdOutlinePassword/> }/>
                      <Inputs placeholder={'confirm password'} label='Confirm Password' type={'password'} icon={ <MdOutlinePassword/> }/>


                      <Text textAlign={'center'} my='1em'> Already had an account ? <Link to='/login'><b>signin</b></Link> </Text>

                      <Center>
                      <Buttons  value={'Sign up'} bg={'blue.500'} color={'#fff'} width={'100%'}/>
                    </Center>
                     
                  </form>   

              </Box>
            </Flex>


      </AuthLayout>




    </>
  );
}

export default Signup;
