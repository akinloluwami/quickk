const User = require("../schema/User");
const jwt = require("jsonwebtoken");

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
};
//   /*****************************************************/
