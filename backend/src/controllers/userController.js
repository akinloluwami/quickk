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
    user.followers.push(userToFollow);
    userToFollowObj.following.push(userFollowing);
    await user.save();
    await userToFollowObj.save();
  },
  unfollowUser: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userFollowing = decoded.uuid;
    const userToUnfollow = req.query.username;
    const user = await User.findOne({
      where: {
        uuid: userFollowing,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const userToUnfollowObj = await User.findOne({
      where: {
        username: userToUnfollow,
      },
    });
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
    user.followers = user.followers.filter(
      (follower) => follower !== userToUnfollow
    );
    userToUnfollowObj.following = userToUnfollowObj.following.filter(
      (following) => following !== userFollowing
    );
    await user.save();
    await userToUnfollowObj.save();
  },
};
//   /*****************************************************/
