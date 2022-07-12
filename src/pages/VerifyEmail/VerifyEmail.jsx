import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import "./VerifyEmail.scss";
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
function VerifyEmail() {
  const [second, setSecond] = useState(0);
  const [count, setCount] = useState(30);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(second + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [second]);
  return (
    <AuthLayout>
      <div className="ve">
        <div className="logo">
          <Link to="/"> </Link>
        </div>
        <form className="form">
          <h1>Enter OTP</h1>

          <OtpInput
            value={otp}
            type="number"
            onChange={(e) => {
              setOtp(e);
            }}
            numInputs={6}
            shouldAutoFocus={true}
            inputStyle={{
              width: "50px",
              height: "50px",
              borderRadius: "5px",
              color: "grey",
              fontWeight: "500",
              fontSize: "18px",
              outline: "none",
              border: "none",
              backgroundColor: "rgba(29, 99, 196, 0.1)",
              margin: "0 5px",
            }}
          />
          <Buttons value={"Continue"} />
          <p>
            Didn't receive OTP?{" "}
            <span
              className={second >= count ? "active" : ""}
              onClick={() => {
                if (second >= count) {
                  setSecond(0);
                  setCount(count + count);

                  //OTP resend function goes here
                  console.log("resend", otp);
                }
              }}
            >
              {second < count
                ? `Resend in ${count - second} seconds`
                : "Resend"}
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default VerifyEmail;
