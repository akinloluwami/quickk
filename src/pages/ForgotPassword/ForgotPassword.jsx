import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ForgotPassword.scss";
function ForgotPassword() {
  return (
    <div className="forgot-password">
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
        <h1>Forgot password?</h1>
        <div className="input-group">
          <small>Username or email</small>
          <input type="text" />
        </div>
        <div className="input-group">
          <button>Submit</button>
        </div>
        <p>
          Reemember password? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
