require("dotenv").config();
const User = require("../schema/User");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const express = require("express");
const { otpEmail, resetPasswordEmail } = require("../utils/email");
module.exports = {
  /***SIGN UP **************************************/
  signup: async (req, res) => {
    const { username, password, confirmPassword, email, displayName } =
      req.body;
    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpiry = new Date(Date.now() + 3600000);
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    const hashedConfirmPassword = await bycrypt.hash(confirmPassword, salt);
    const uuid = crypto.randomUUID();
    const token = jwt.sign({ uuid }, process.env.JWT_SECRET);
    const user = User.build({
      username: username.toLowerCase(),
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      email,
      displayName,
      otp,
      otpExpiry,
      uuid,
      createdAt: new Date(),
    });

    const usernameExists = await User.findOne({
      where: {
        username,
      },
    });
    const emailExists = await User.findOne({
      where: {
        email,
      },
    });
    const passwordMatch = await bycrypt.compare(
      password,
      hashedConfirmPassword
    );
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validUsername = /^[a-zA-Z0-9]{3,}$/.test(username);

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      email === "" ||
      displayName === ""
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: " Password must be at least 6 characters long",
      });
    }
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    if (!validEmail) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    if (!validUsername) {
      return res.status(400).json({
        message:
          "Username must be at least 3 characters long and can only contain letters, numbers, underscores and hypens",
      });
    }
    if (displayName.length < 2) {
      return res.status(200).json({
        message: "Display name must be at least 2 characters long",
      });
    }
    try {
      otpEmail(
        email,
        "Verify your email",
        otp,
        `Quickk <${process.env.SMTP_EMAIL}>`,
        "Thank you for signing up to Quickk."
      );
      await user.save();
      return res.status(201).json({
        message: "User created successfully",
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  /**END SIGNUP ****************************************/

  /**VERIFY EMAIL **************************************/
  verifyEmail: async (req, res) => {
    const { otp } = req.body;
    const now = new Date();
    const user = await User.findOne({
      where: {
        otp,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "OTP is invalid",
      });
    }
    if (now > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }
    user.emailVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      message: "Email verified successfully",
    });
  },
  /**END VERIFY EMAIL **************************************/

  /**RESEND OTP ********************************************/
  resendOTP: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        uuid: decoded.uuid,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpiry = new Date(Date.now() + 3600000);
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    otpEmail(
      user.email,
      "OTP resend",
      otp,
      `Quickk <${process.env.SMTP_EMAIL}>`,
      "You have requested to resend your OTP"
    );

    return res.status(200).json({
      message: "OTP resent successfully",
    });
  },
  /**END RESEND OTP ********************************************/

  /**SEND RESET PASSWORD MAIL***********************************/
  sendResetLink: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Could not find an account associated with this email",
      });
    }
    const requestToken = jwt.sign({ email }, process.env.JWT_SECRET);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?tkn=${requestToken}`;
    user.requestToken = requestToken;
    user.requestTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();
    resetPasswordEmail(
      email,
      "Reset your password",
      `Quickk <${process.env.SMTP_EMAIL}>`,
      resetLink
    );
    return res.status(200).json({
      message: "Reset password link sent successfully",
    });
  },
  /**END SEND RESET PASSWORD MAIL***********************************/

  /**RESET PASSWORD***********************************************/
  resetPassword: async (req, res) => {
    const { password, confirmPassword, requestToken } = req.body;
    const user = await User.findOne({
      where: {
        requestToken,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid request token",
      });
    }
    const now = new Date();
    if (now > user.requestTokenExpiry) {
      return res.status(400).json({
        message: "Request token has expired",
      });
    }
    if (password === "" || confirmPassword === "") {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: " Password must be at least 6 characters long",
      });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    user.password = hashedPassword;
    user.requestToken = "";
    user.requestTokenExpiry = null;
    await user.save();
    return res.status(200).json({
      message: "Password reset successfully",
    });
  },
  /**END RESET PASSWORD***********************************************/

  /**LOGIN *******************************************************/
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    if (!user.emailVerified) {
      return res.status(400).json({
        message: "Email is not verified",
      });
    }
    const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  },
};
