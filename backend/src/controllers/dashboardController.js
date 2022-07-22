require("dotenv").config();
const jwt = require("jsonwebtoken");
const Post = require("../schema/Post");
const User = require("../schema/User");

module.exports = {
  getUserProfile: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }
    const tkn = token.split(" ")[1];
    const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
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
    return res.status(200).json({
      message: "User profile retrieved successfully",
      displayName: user.displayName,
      username: user.username,
      followers: user.followers,
      following: user.following,
      isVerified: user.isVerified,
      bio: user.bio,
      isNewNotification: user.isNewNotification,
      notifications: user.notifications,
    });
  },
  getAllPostsFromUser: async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const posts = await Post.findAll({
      where: {
        userUuid: user.uuid,
      },
    });
    return res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  },
  getOverviewInfo: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }
    const tkn = token.split(" ")[1];
    const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
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
    return res.status(200).json({
      message: "Overview info retrieved successfully",
      followers: user.followers,
      following: user.following,
      notifications: user.notifications,
    });
  },
};
