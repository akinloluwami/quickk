import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Signup.scss";
function Signup() {
  return (
    <div className="login">
      <div className="logo">
        <Link to="/">
          {" "}
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="google logo"
          />
        </Link>
      </div>
      <form className="form">
        <h1>Create an account</h1>
        <div className="input-group">
          <small>Email</small>
          <input type="email" />
        </div>
        <div className="input-group">
          <small>Username</small>
          <input type="text" />
        </div>
        <div className="input-group">
          <small>Display name</small>
          <input type="text" />
        </div>
        <div className="input-group">
          <small>Password</small>
          <input type="password" />
        </div>
        <div className="input-group">
          <small>Shh...it's a secret</small>
          <input type="password" />
        </div>
        <div className="input-group">
          <button>Create Account</button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
