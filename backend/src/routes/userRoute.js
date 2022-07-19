const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/follow", userController.followUser);
router.post("/unfollow", userController.unfollowUser);
router.get("/posts", userController.getUserPosts);
router.get("/profile", userController.getUserProfile);
router.get("/followers", userController.getUserFollowers);
router.get("/following", userController.getUserFollowing);
router.post("/add-wallet-info", userController.addWalletInfo);
router.get("/get-wallet-info", userController.getWalletInfo);

module.exports = router;
