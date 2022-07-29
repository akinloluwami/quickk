const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Links = sequelize.define("Links", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
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
  userUuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Links;
