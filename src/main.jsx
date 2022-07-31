import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
   
  // </React.StrictMode>
  <ChakraProvider>
    <App />
 </ChakraProvider>
)
