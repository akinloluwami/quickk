import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import "./VerifyEmail.scss";
import AuthLayout from "../../Layouts/AuthLayout";
import Buttons from "../../components/major/Buttons";
import { postData } from "../../utils/Request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
// import { Helmet } from "react-helmet";

function VerifyEmail() {
  const [second, setSecond] = useState(0);
  const [count, setCount] = useState(30);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(second + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [second]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { otp };
    const response = await postData(`/auth/verify-email`, data);
    if (response.status === 200) {
      toast.success("Verify email sucessful");
      setLoading(false);
      setTimeout(() => {
        navigate("/dashboard/overview");
      }, 1500);
    } else {
      toast.error(response.response.data.message);
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    const response = await postData(
      `/auth/resend-otp`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log(response);
      toast.success("Resend OTP sucessful");
    } else {
      toast.error(response.response.data.message);
    }
  };

  useEffect(() => {
    document.title = "Verify Email | Quickk";
  }, []);

  return (
    <AuthLayout>
      {/* <Helmet>
        <title>Verify Email | Quickk</title>
      </Helmet> */}
      <ToastContainer autoClose={2000} />
      <div className="ve">
        <div className="logo">
          <Link to="/"> </Link>
        </div>
        <form className="form">
          <h1>Enter OTP</h1>
          <p>An OTP has been sent to your email</p>
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
          <Buttons
            onClick={(e) => {
              handleSubmit(e);
            }}
            disabled={loading}
            value={
              loading ? (
                <ReactLoading
                  type={"bubbles"}
                  color={"#fff"}
                  height={70}
                  width={70}
                />
              ) : (
                "Complete signup"
              )
            }
          />
          <p>
            Didn't receive OTP?{" "}
            <span
              className={second >= count ? "active" : ""}
              onClick={() => {
                if (second >= count) {
                  setSecond(0);
                  setCount(count + count);
                  resendOtp();
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
