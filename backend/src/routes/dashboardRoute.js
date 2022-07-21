const dashboardController = require("../controllers/dashboardController");
const router = require("express").Router();

router.get("/user/profile", dashboardController.getUserProfile);
router.get("/user/posts", dashboardController.getAllPostsFromUser);

module.exports = router;
