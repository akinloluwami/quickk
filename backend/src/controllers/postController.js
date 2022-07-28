require("dotenv").config();
const Post = require("../schema/Post");
const User = require("../schema/User");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
module.exports = {
  /***************************************************************************/
  uploadImage: async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    const file = await req.files.image;

    if (!file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }
    //if file is not image
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({
        message: "Only image files are allowed",
      });
    }
    //if file is too big
    if (file.size > 2000000) {
      return res.status(400).json({
        message: "Please upload an image less than 2mb",
      });
    }
    cloudinary.uploader
      .upload(file.tempFilePath, {
        folder: "quickk",
        public_id: "quickk" + "_" + Date.now(),
        resource_type: "auto",
      })
      .then((result) => {
        res.status(200).json({
          message: "Image uploaded successfully",
          image: result.secure_url,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error uploading image",
          error: err,
        });
      });
  },
  /******************************************************/
  createPost: async (req, res) => {
    const { title, content, coverImageUrl } = req.body;
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
        message: "Cannot find user1",
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
    if (content.length < 50) {
      return res.status(400).json({
        message: "Content must be at least 50 characters",
      });
    }
    const slugExists = await Post.findOne({
      where: {
        slug,
        userUuid: user.uuid,
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
      coverImageUrl,
    });
    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  },

  editPost: async (req, res) => {
    const { title, content, coverImageUrl } = req.body;
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
        message: "Cannot find user",
      });
    }
    const newSlug = title
      .replace(/\s/g, "-")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");
    const post = await Post.findOne({
      where: {
        slug: req.query.slug,
        userUuid: user.uuid,
      },
    });
    if (!post) {
      return res.status(400).json({
        message: "Cannot find post",
      });
    }
    await Post.update(
      {
        title,
        content,
        coverImageUrl,
        slug: newSlug,
        updatedAt: new Date(),
      },
      {
        where: {
          slug: req.query.slug,
          userUuid: user.uuid,
        },
      }
    );
    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
    console.log("Updated!!!");
  },
  getSinglePostFromUser: async (req, res) => {
    const { username, slug } = req.params;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(400).json({
        error: "Cannot find...",
      });
    }
    const post = await Post.findOne({
      where: {
        userUuid: user.uuid,
        slug,
      },
    });
    if (!post) {
      return res.status(400).json({
        error: "Post not found",
      });
    }
    try {
      res.status(200).json({
        message: "Post retrieved successfully",
        post,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving post",
        error: err,
      });
    }
  },
  /******************************************************/
  likePost: async (req, res) => {
    const { slug, id } = req.body;
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
        message: "Cannot find user4",
      });
    }
    const post = await Post.findOne({
      where: {
        slug,
        id,
      },
    });
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    const likerData = {
      userUuid: user.uuid,
      date: new Date(),
    };
    post.update({
      likes: [...post.likes, likerData],
    });
    await post.save();
    const postAuthor = await User.findOne({
      where: {
        uuid: post.userUuid,
      },
    });
    if (postAuthor.uuid !== user.uuid) {
      const notificationData = {
        userUuid: postAuthor.uuid,
        date: new Date(),
        message: `${user.username} liked your post`,
        link: `/post/${post.slug}`,
      };
      await postAuthor.update({
        notifications: [...user.notifications, notificationData],
        isNewNotification: true,
      });

      await user.save();
    }
    res.status(200).json({
      message: "Post liked successfully",
      likerData,
    });
  },
  /******************************************************/
  unlikePost: async (req, res) => {
    const { slug, id } = req.body;
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
        message: "Cannot find user5",
      });
    }
    const post = await Post.findOne({
      where: {
        slug,
        id,
      },
    });
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    const likerData = {
      userUuid: user.uuid,
      date: new Date(),
    };
    const likes = post.likes
      .filter((like) => {
        return like.userUuid !== user.uuid;
      })
      .map((like) => {
        return like;
      })
      .sort((a, b) => {
        return a.date - b.date;
      })
      .reverse();
    post.update({
      likes,
    });
    await post.save();
    res.status(200).json({
      message: "Post unliked successfully",
      likerData,
    });
  },
  /******************************************************/
  commentOnPost: async (req, res) => {
    const { slug, id, comment } = req.body;
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
        message: "Cannot find user6",
      });
    }
    const post = await Post.findOne({
      where: {
        slug,
        id,
      },
    });
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    const commentData = {
      userUuid: user.uuid,
      date: new Date(),
      comment,
    };
    post.update({
      comments: [...post.comments, commentData],
    });
    await post.save();
    res.status(200).json({
      message: "Comment added successfully",
      commentData,
    });
  },
  getUsernameFromJwt: async (req, res) => {
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
        message: "Cannot find user7",
      });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      username: user.username,
      uuid: user.uuid,
      displayName: user.displayName,
      profilePicture: user.profilePicture,
    });
  },
  viewPost: async (req, res) => {
    const { slug, id } = req.query;
    const post = await Post.findOne({
      where: {
        slug,
        id,
      },
    });
    if (!post) {
      return res.status(400).json({
        message: "Post does not exist",
      });
    }
    const viewData = {
      date: new Date(),
    };
    post.update({
      views: [...post.views, viewData],
    });
    await post.save();
    res.status(200).json({
      message: "Post viewed successfully",
      viewData,
    });
  },
  deletePost: async (req, res) => {
    const { slug, id } = req.params;
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
        message: "Cannot find user8",
      });
    }
    const post = await Post.findOne({
      where: {
        slug,
        id,
      },
    });
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    if (post.userUuid !== user.uuid) {
      return res.status(400).json({
        message: "You are not authorized to delete this post",
      });
    }
    await post.destroy();
    res.status(200).json({
      message: "Post deleted successfully",
    });
  },
};
