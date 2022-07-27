const { getUserLinksFromUsername } = require("../controllers/userController");
const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/follow/:username", userController.followUser);
router.post("/unfollow/:username", userController.unfollowUser);
router.get("/posts", userController.getUserPosts);
router.get("/profile/:userName", userController.getUserProfile);
router.get("/followers", userController.getUserFollowers);
router.get("/following", userController.getUserFollowing);
router.post("/add-wallet-info", userController.addWalletInfo);
router.get("/get-wallet-info", userController.getWalletInfo);
router.get("/username/:uuid", userController.getUsernameFromUuid);
router.get("/uuid", userController.getUuidFromJwt);
router.get("/get-links/:username", getUserLinksFromUsername);

module.exports = router;
