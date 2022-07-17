const User = require("../schema/User");
const jwt = require("jsonwebtoken");
const Posts = require("../schema/Posts");

module.exports = {
  followUser: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userFollowing = decoded.uuid;
    const userToFollow = req.query.username;
    console.log(userFollowing, userToFollow);

    if (!userFollowing || !userToFollow) {
      return res.status(400).json({
        message: "Username is required",
      });
    }
    const user = await User.findOne({
      where: {
        uuid: userFollowing,
      },
    });
    const userToFollowObj = await User.findOne({
      where: {
        username: userToFollow,
      },
    });
    if (!userToFollowObj) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (userToFollowObj.followers.includes(userFollowing)) {
      return res.status(400).json({
        message: "User already followed",
      });
    }
    if (userFollowing === userToFollow) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }
    user.update({
      following: [...user.following, userToFollowObj.uuid],
    });
    userToFollowObj.update({
      followers: [...userToFollowObj.followers, user.uuid],
      notifications: [
        ...userToFollowObj.notifications,
        {
          message: `${user.username} started following you`,
          time: new Date(),
        },
      ],
      isNewNotification: true,
    });
    await user.save();
    await userToFollowObj.save();
    return res.status(200).json({
      message: `You are now following ${userToFollow}`,
    });
  },

  unfollowUser: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userFollowing = decoded.uuid;
    const userToUnfollow = req.query.username;
    console.log(userFollowing, userToUnfollow);

    if (!userFollowing || !userToUnfollow) {
      return res.status(400).json({
        message: "Username is required",
      });
    }
    const user = await User.findOne({
      where: {
        uuid: userFollowing,
      },
    });
    const userToUnfollowObj = await User.findOne({
      where: {
        username: userToUnfollow,
      },
    });
    if (!userToUnfollowObj) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (!userToUnfollowObj.followers.includes(userFollowing)) {
      return res.status(400).json({
        message: "User not followed",
      });
    }
    if (userFollowing === userToUnfollow) {
      return res.status(400).json({
        message: "You cannot unfollow yourself",
      });
    }
    user.update({
      following: user.following.filter(
        (following) => following !== userToUnfollowObj.uuid
      ),
    });
    userToUnfollowObj.update({
      followers: userToUnfollowObj.followers.filter(
        (follower) => follower !== userFollowing
      ),
    });
    await user.save();
    await userToUnfollowObj.save();
    return res.status(200).json({
      message: `You are no longer following ${userToUnfollow}`,
    });
  },
  /************************************************/
  getUserPosts: async (req, res) => {
    const { username } = req.query;
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const posts = await Posts.findAll({
      where: {
        userUuId: user.uuid,
      },
    });
    if (posts.length === 0) {
      return res.status(400).json({
        message: "This user has no posts",
      });
    }

    return res.status(200).json({
      message: "Posts retrieved successfully",
      posts: posts.map((post) => {
        const {
          title,
          content,
          createdAt,
          updatedAt,
          views,
          likes,
          comments,
          slug,
        } = post;
        return {
          title,
          content,
          createdAt,
          updatedAt,
          views,
          likes,
          comments,
          slug,
        };
      }),
    });
  },
  /************************************************/
  getUserProfile: async (req, res) => {
    const { user_name } = req.query;
    const user = await User.findOne({
      where: {
        username: user_name,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const {
      username,
      followers,
      following,
      displayName,
      isVerified,
      emailVerified,
      bio,
      twitter,
      facebook,
      instagram,
      youtube,
      tiktok,
      website,
    } = user;
    return res.status(200).json({
      message: "User profile retrieved successfully",
      user: {
        username,
        followers,
        following,
        displayName,
        isVerified,
        emailVerified,
        bio,
        twitter,
        facebook,
        instagram,
        youtube,
        tiktok,
        website,
      },
    });
  },
};
