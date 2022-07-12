import axios from "axios";
import {useToast} from '@chakra-ui/react';    
import {ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
//add the default url
let defaultUrl = ''


//initilize toast


export const postData = async (url, payload, methods ) => {
    

    try {

        const response = await axios.post(`${url}`, payload, {methods});
        
       
            //check if response is success
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
    
                });
                

               


            return { response: response.data, error: false};

    } catch (error) {

        const errMsg = error.response.data.message;
        toast.error(errMsg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'

            });
    }

}

//function to get from the Api
//get with axios
export const fetchData = async (url , payloads ) => {
    
        try {
    
            const response = await axios.get(`${url}`, {payloads});    
            return response.data;
    
        } catch (error) {
            console.log(error);
        }
    
    }
    //function to put to the Api
    //put with axios
export const putData = async (url, data) => {
        
            try {
        
                const response = await axios.put(`${url}`, data);
                return response.data;
        
            } catch (error) {
                console.log(error);
            }
        
        }
