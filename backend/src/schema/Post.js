const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  views: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  likes: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  comments: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
});

module.exports = Post;
