import React, { useEffect , useState } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Hero from "../../components/minor/Hero";
import Section from './Section';
import LightBox from "./LightBox";
import Footer from './Footer';
import Divider from "./Divider";
import Loading from "../../components/HomeKits/Loading";
import { Box } from '@chakra-ui/react';

function Home() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    document.title = "Quickk - Setup your blog in 2 minutes";
    setTimeout (() => setLoading('none') , 1000)
  }, []);

  return (
    <>
      <Box display={isLoading}>
        <Loading/>
      </Box>
      <Hero />
      <Section/>
      <LightBox/>
      <Divider/>

      <Footer />
      
    </>
  );
}

export default Home;
