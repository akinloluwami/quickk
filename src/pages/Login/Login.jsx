import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.scss";
function Login() {
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
        <h1>Login to your account</h1>
        <div className="input-group">
          <small>Username or email</small>
          <input type="text" />
        </div>
        <div className="input-group">
          <small>Password</small>
          <input type="password" />
        </div>
        <div className="input-group">
          <button>Login</button>
        </div>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </form>
    </div>
  );
}

export default Login;
