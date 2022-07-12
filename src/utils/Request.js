import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//add the default url
let defaultUrl = import.meta.env.VITE_APP_BACKEND_URL;


export const postData = async (url, payload) => {
  const response = await axios.post(`${defaultUrl}${url}`, payload);
  return response.data;
}

