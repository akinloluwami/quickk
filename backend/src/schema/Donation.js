const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Donation = sequelize.define("Donation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userUuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  donatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  donationMessage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Donation;
