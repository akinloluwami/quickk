require("dotenv").config();
const Post = require("../schema/Post");
const User = require("../schema/User");
const jwt = require("jsonwebtoken");
module.exports = {
  /******************************************************/
  createPost: async (req, res) => {
    const { title, content } = req.body;
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
    const slug = title
      .replace(/\s/g, "-")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }
    if (title.length > 100) {
      return res.status(400).json({
        message: "Title must be less than 100 characters",
      });
    }
    if (content.length < 100) {
      return res.status(400).json({
        message: "Content must be at least 100 characters",
      });
    }
    const slugExists = await Post.findOne({
      where: {
        slug,
      },
    });
    if (slugExists) {
      return res.status(400).json({
        message: "Post with this title already exists",
      });
    }
    const post = await Post.create({
      title,
      content,
      userUuid: user.uuid,
      slug,
    });
    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  },
  /******************************************************/
  editPost: async (req, res) => {
    const { title, content, userUuid, slug } = req.body;
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
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }
    if (title.length > 100) {
      return res.status(400).json({
        message: "Title must be less than 100 characters",
      });
    }
    if (content.length < 100) {
      return res.status(400).json({
        message: "Content must be at least 100 characters",
      });
    }
    const post = await Post.findOne({
      where: {
        userUuid,
        slug,
      },
    });
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    post.title = title;
    post.content = content;
    post.updatedAt = new Date();
    await post.save();
    res.status(200).json({
      message: "Post updated successfully",
    });
  },
  /******************************************************/
  getSinglePostFromUser: async (req, res) => {
    const { username, slug } = req.body;
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

    const post = await Post.findOne({
      where: {
        userUuid: user.uuid,
        slug,
      },
    });
    res.status(200).json({
      message: "Post retrieved successfully",
      post,
    });
  },
};
