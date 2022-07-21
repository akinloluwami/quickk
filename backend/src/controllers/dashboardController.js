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
    });
  },
};
