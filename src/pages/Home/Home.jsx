import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home">
      <div className="navbar">
        <div className="logo">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="google logo"
          />
        </div>
        <div className="ctas">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-btn">
            Signup
          </Link>
        </div>
      </div>
      <div className="hero">
        <div className="hero-text">
          <h1>Let your imagination run wild </h1>
          <p>
            Setup your microblog in less than 2 minutes, start wrting and
            accepting donations in no time.
          </p>
          <Link to="/signup">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
