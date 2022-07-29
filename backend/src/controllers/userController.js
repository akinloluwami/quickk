const User = require("../schema/User");
const jwt = require("jsonwebtoken");
const Posts = require("../schema/Post");
const Link = require("../schema/Link");

module.exports = {
  followUser: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userFollowing = decoded.uuid;
    const userToFollow = req.params.username;
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
    const userToUnfollow = req.params.username;
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
    const { userName } = req.params;
    const user = await User.findOne({
      where: {
        username: userName,
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
      profilePicture,
      minimumDonationAmount,
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
        profilePicture,
        minimumDonationAmount,
      },
    });
  },
  /************************************************/
  getUserFollowers: async (req, res) => {
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
    const followers = await User.findAll({
      where: {
        uuid: user.followers,
      },
    });
    if (followers.length === 0) {
      return res.status(400).json({
        message: "This user has no followers",
      });
    }
    return res.status(200).json({
      message: "Followers retrieved successfully",
      followers: followers.map((follower) => {
        const { username, displayName, isVerified } = follower;
        return {
          username,
          displayName,
          isVerified,
        };
      }),
    });
  },
  /************************************************/
  getUserFollowing: async (req, res) => {
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
    const following = await User.findAll({
      where: {
        uuid: user.following,
      },
    });
    if (following.length === 0) {
      return res.status(400).json({
        message: "This user has no following",
      });
    }
    return res.status(200).json({
      message: "Following retrieved successfully",
      following: following.map((follow) => {
        const { username, displayName, isVerified } = follow;
        return {
          username,
          displayName,
          isVerified,
        };
      }),
    });
  },
  /************************************************/
  addWalletInfo: async (req, res) => {
    const { wallet_address, wallet_name } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userUuid = decoded.uuid;
    const user = await User.findOne({
      where: {
        uuid: userUuid,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    user.update({
      walletInfo: {
        wallet_address,
        wallet_name,
      },
    });
    await user.save();
    return res.status(200).json({
      message: "Wallet info added successfully",
    });
  },
  /************************************************/
  getWalletInfo: async (req, res) => {
    const jwt = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(jwt, process.env.JWT_SECRET);
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
    const { walletInfo } = user;
    if (!walletInfo) {
      return res.status(400).json({
        message: "You have not added any wallet info",
      });
    }
    return res.status(200).json({
      message: "Wallet info retrieved successfully",
      walletInfo: {
        wallet_name: walletInfo.wallet_name,
        wallet_address: walletInfo.wallet_address.slice(-6),
      },
    });
  },
  /************************************************/
  getUsernameFromUuid: async (req, res) => {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const { username, displayName } = user;
    return res.status(200).json({
      message: "Username retrieved successfully",
      username,
      displayName,
    });
  },
  getUuidFromJwt: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "No token provided",
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
    const { uuid, username } = user;
    return res.status(200).json({
      message: "Username retrieved successfully",
      uuid,
      username,
    });
  },
  getUserLinksFromUsername: async (req, res) => {
    const { username } = req.params;
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
    const uuid = user.uuid;
    const links = await Link.findAll({
      where: {
        userUuid: uuid,
      },
    });
    return res.status(200).json({
      message: "Links retrieved successfully",
      links,
    });
  },
};
