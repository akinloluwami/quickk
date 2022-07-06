import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ResetPassword.scss";
function ResetPassword() {
  return (
    <div className="reset-password">
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
        <h1>Reset Your Password</h1>
        <div className="input-group">
          <small>New password</small>
          <input type="text" />
        </div>
        <div className="input-group">
          <small>Confirm password</small>
          <input type="password" />
        </div>
        <div className="input-group">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
