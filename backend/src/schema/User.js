const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  birthDay: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  otp: {
    type: DataTypes.STRING,
  },
  otpExpiry: {
    type: DataTypes.DATE,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  requestToken: {
    type: DataTypes.STRING,
  },
  requestTokenExpiry: {
    type: DataTypes.DATE,
  },
  accountBalance: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  walletInfo: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  isNewNotification: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notifications: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  followers: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  following: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  pageViews: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  transactions: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  bio: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  twitter: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  facebook: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  instagram: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  youtube: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  tiktok: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  website: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  walletAddress: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  minimumDonationAmount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  links: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});

module.exports = User;
