const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/follow", userController.followUser);
router.post("/unfollow", userController.unfollowUser);
router.post("/posts", userController.getUserPosts);
router.post("/profile", userController.getUserProfile);

module.exports = router;
