const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/follow", userController.followUser);
router.post("/unfollow", userController.unfollowUser);

module.exports = router;
