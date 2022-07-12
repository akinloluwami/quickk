import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import {Box ,Center,Flex, Text} from '@chakra-ui/react';
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Inputs from '../../components/major/Inputs';
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
import { MdOutlineMail , MdOutlinePassword } from 'react-icons/md'


function ResetPassword() {
  return (
    <>

      <AuthLayout>



      <Flex justifyContent={'center'} alignItems='center' py='2em' h='80%'>
              <Box my='1em' bg={'#fff'} width={['90%','60%']}  py='2em' px={'1em'} > 
                  

                  <form>
                    
                      <Box my='1em'>
                         <Text fontSize={'xl'} fontWeight={'bold'} fontFamily={'var(--primary-font)'}> Reset Password </Text>
                         <Text my='1em'> Hey, looks like you forgot your password  </Text>
                      </Box>

                     
                     <Inputs placeholder={'email'} label='Email' type={'email'} icon = { <MdOutlineMail/>} />
                     <Inputs placeholder={'reset password'} label='Email' type={'email'} icon = { <MdOutlineMail/>} />
           

                     
                    <Center>
                      <Buttons  value={'Reset Password'} bg={'blue.500'} color={'#fff'} width={'100%'}/>
                    </Center>
                     
                     
                  </form>   

              </Box>
            </Flex>


      </AuthLayout>




    </>
  );
}

export default ResetPassword;
