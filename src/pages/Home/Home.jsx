import React, { useEffect } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Hero from "../../components/minor/Hero";
import Section from './Section';
import LightBox from "./LightBox";
import Footer from './Footer';
import Divider from "./Divider";

function Home() {
  useEffect(() => {
    document.title = "Quickk - Setup your blog in 2 minutes";
  }, []);
  return (
    <>
      {/* <Helmet>
        <title>Quickk - Setup your blog in 2 minutes</title>
      </Helmet> */}
      <Hero />
      <Section/>
      <LightBox/>
      <Divider/>

      <Footer />
      
    </>
  );
}

export default Home;
