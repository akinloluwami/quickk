require("dotenv").config();
const Users = require("../schema/User");
const Donation = require("../schema/Donation");
const jwt = require("jsonwebtoken");
const { donationEmail } = require("../utils/email");

module.exports = {
  updateWalletAddressAndMinimumDonationAmount: async (req, res) => {
    const { walletAddress, minimumDonationAmount } = req.body;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }
    const tkn = token.split(" ")[1];
    const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: {
        uuid: decoded.uuid,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (!walletAddress) {
      return res.status(400).json({
        message: "Wallet address is required",
      });
    }
    if (!minimumDonationAmount) {
      return res.status(400).json({
        message: "Minimum donation is required",
      });
    }
    if (minimumDonationAmount < 1) {
      return res.status(400).json({
        message: "Minimum donation must be greater than 0",
      });
    }
    user.update({
      walletAddress,
      minimumDonationAmount,
    });
    return res.status(200).json({
      message: "Wallet address and minimum donation updated",
    });
  },
  getWalletAddressAndMinimumDonationAmount: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }
    const tkn = token.split(" ")[1];
    const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: {
        uuid: decoded.uuid,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      walletAddress: user.walletAddress,
      minimumDonationAmount: user.minimumDonationAmount,
    });
  },

  donate: async (req, res) => {
    const { amount, donationMessage, username } = req.body;
    const user = await Users.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const minimumDonationAmount = user.minimumDonationAmount;
    const userUuid = user.uuid;
    const accountBalance = user.accountBalance;
    if (amount < minimumDonationAmount) {
      return res.status(400).json({
        message: `Amount must be at least $${minimumDonationAmount}`,
      });
    }
    user.update({
      accountBalance: parseInt(accountBalance) + parseInt(amount),
    });
    const donation = await Donation.create({
      amount,
      userUuid,
      donationMessage,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    donationEmail(
      user.email,
      `You have received a donation of $${amount}`,
      `Quickk <${process.env.SMTP_EMAIL}>`,
      `Hi, ${user.displayName} $${amount} has been donated to you.
      Thank you for using Quickk.
      `
    );
    return res.status(200).json({
      message: "Donation created",
      donation,
    });
  },
  getDonations: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }
    const tkn = token.split(" ")[1];
    const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: {
        uuid: decoded.uuid,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const donations = await Donation.findAll({
      where: {
        userUuid: user.uuid,
      },
    });
    return res.status(200).json({
      donations,
    });
  },

  getAccountBalance: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }
    const tkn = token.split(" ")[1];
    const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: {
        uuid: decoded.uuid,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      accountBalance: user.accountBalance,
    });
  },
};
