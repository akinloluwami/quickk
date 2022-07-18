const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/follow", userController.followUser);
router.post("/unfollow", userController.unfollowUser);
router.get("/posts", userController.getUserPosts);
router.get("/profile", userController.getUserProfile);
router.get("/followers", userController.getUserFollowers);
router.get("/following", userController.getUserFollowing);

module.exports = router;
