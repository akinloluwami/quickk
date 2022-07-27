require("dotenv").config();
const jwt = require("jsonwebtoken");
const Post = require("../schema/Post");
const User = require("../schema/User");
const cloudinary = require("cloudinary");
const Link = require("../schema/Link");

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
      profilePicture: user.profilePicture,
      twitter: user.twitter,
      instagram: user.instagram,
      titkok: user.titkok,
      website: user.website,
      youtube: user.youtube,
      walletAddress: user.walletAddress,
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
      accountBalance: user.accountBalance,
    });
  },
  getPageViews: async (req, res) => {
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
    const posts = await Post.findAll({
      where: {
        userUuid: user.uuid,
      },
    });
    let pageViews = 0;
    posts.forEach((post) => {
      pageViews += post.views.length;
    }),
      (err) => {
        if (err) {
          return res.status(400).json({
            message: "Error retrieving page views",
          });
        }
      };
    return res.status(200).json({
      message: "Page views retrieved successfully",
      pageViews,
    });
  },
  updateProfile: async (req, res) => {
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
    const {
      bio,
      displayName,
      username,
      twitter,
      instagram,
      youtube,
      tiktok,
      website,
      walletAddress,
    } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username cannot be empty",
      });
    }
    if (!displayName) {
      return res.status(400).json({
        message: "Display name cannot be empty",
      });
    }
    if (!username.match(/^[a-zA-Z0-9_-]{3,}$/)) {
      return res.status(400).json({
        message:
          "Username must be at least 3 characters long and can only contain letters, numbers, underscores and dashes",
      });
    }
    if (username.length > 20) {
      return res.status(400).json({
        message: "Username cannot be more than 20 characters long",
      });
    }
    const userExists = await User.findOne({
      where: {
        username,
      },
    });
    if (userExists && userExists.uuid !== user.uuid) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    await User.update(
      {
        bio,
        displayName,
        username,
        twitter,
        instagram,
        youtube,
        tiktok,
        website,
        walletAddress,
      },
      {
        where: {
          uuid: decoded.uuid,
        },
      }
    );
    return res.status(200).json({
      message: "Profile updated successfully",
    });
  },
  updateProfilePicture: async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
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
    const file = await req.files.image;
    if (!file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
    if (file.size > 5000000) {
      return res.status(400).json({
        message: "Image must be less than 5MB",
      });
    }
    const result = await cloudinary.uploader
      .upload(file.tempFilePath, {
        folder: "profile-pictures",
        public_id: `quickk_${user.uuid}${Date.now()}`,
        resource_type: "image",
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Error uploading image",
        });
      });
    await User.update(
      {
        profilePicture: result.secure_url,
      },
      {
        where: {
          uuid: decoded.uuid,
        },
      }
    );
    return res.status(200).json({
      message: "Profile picture updated successfully",
    });
  },
  deleteProfilePicture: async (req, res) => {
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
    await User.update(
      {
        profilePicture: "",
      },
      {
        where: {
          uuid: decoded.uuid,
        },
      }
    );
    return res.status(200).json({
      message: "Profile picture deleted successfully",
    });
  },

  getLinks: async (req, res) => {
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
    const links = await Link.findAll({
      where: {
        userUuid: user.uuid,
      },
    });
    return res.status(200).json({
      message: "Links retrieved successfully",
      links,
    });
  },
  addLink: async (req, res) => {
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
    const { title, url } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }
    if (!url.startsWith("http")) {
      return res.status(400).json({
        message: "URL must start with http",
      });
    }
    const linkExists = await Link.findOne({
      where: {
        url,
        userUuid: user.uuid,
      },
    });
    if (linkExists) {
      return res.status(400).json({
        message: "Link already exists",
      });
    }
    const link = await Link.create({
      title,
      url,
      userUuid: user.uuid,
    });
    return res.status(200).json({
      message: "Link added successfully",
      link,
    });
  },
  deleteLink: async (req, res) => {
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
    const { id } = req.params;
    const link = await Link.findOne({
      where: {
        id,
        userUuid: user.uuid,
      },
    });
    if (!link) {
      return res.status(400).json({
        message: "Link not found",
      });
    }
    await Link.destroy({
      where: {
        id,
        userUuid: user.uuid,
      },
    });
    return res.status(200).json({
      message: "Link deleted successfully",
    });
  },
  updateLink: async (req, res) => {
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
    const { id } = req.params;
    const { title, url } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }
    if (!url.startsWith("http")) {
      return res.status(400).json({
        message: "URL must start with http",
      });
    }
    const link = await Link.findOne({
      where: {
        id,
        userUuid: user.uuid,
      },
    });
    if (!link) {
      return res.status(400).json({
        message: "Link not found",
      });
    }
    await Link.update(
      {
        title,
        url,
      },
      {
        where: {
          id,
          userUuid: user.uuid,
        },
      }
    );
    return res.status(200).json({
      message: "Link updated successfully",
    });
  },
};
