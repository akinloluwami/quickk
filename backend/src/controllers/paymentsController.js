const Users = require("../schema/User");
const jwt = require("jsonwebtoken");

module.exports = {
  donateToUser: async (req, res) => {
    const { amount, username } = req.body;
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
    const userReceiveingDonation = await Users.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }
    if (amount < 1) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }
    if (!userReceiveingDonation) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    userReceiveingDonation.update({
      balance: userReceiveingDonation.balance + amount,
      isNewNotification: true,
      notifications: [
        ...userReceiveingDonation.notifications,
        {
          userUuid: user.uuid,
          date: new Date(),
          message: `${user.username} donated ${amount} to you`,
          link: `/${user.username}`,
        },
      ],
    });
    await userReceiveingDonation.save();
    user.update({
      isNewNotification: true,
      notifications: [
        ...user.notifications,
        {
          userUuid: user.uuid,
          date: new Date(),
          message: `You donated ${amount} to ${userReceiveingDonation.username}`,
          link: `/${userReceiveingDonation.username}`,
        },
      ],
    });
    return res.status(200).json({
      message: "Donation successful",
    });
  },
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
};
