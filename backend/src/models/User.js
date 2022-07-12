const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
    defaultValue:
      "https://res.cloudinary.com/dzqbzqgqw/image/upload/v1599098981/default-profile-picture_qjqjqj.png",
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
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PlanetScale! 🚀");
  })
  .catch((err) => {
    console.error("Unable to connect to PlanetScale:" + err);
  });

User.sync({ force: false }).then(() => {
  console.log("User table created successfully");
});

module.exports = User;
