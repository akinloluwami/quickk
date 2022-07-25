import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout";
import Hero from "../../components/minor/Hero";
import { Helmet } from "react-helmet";
function Home() {
  return (
    <>
      <Helmet>
        <title>Quickk - Setup your blog in 2 minutes</title>
      </Helmet>
      <Hero />
    </>
  );
}

export default Home;
