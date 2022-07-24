const dashboardController = require("../controllers/dashboardController");
const router = require("express").Router();

router.get("/user/profile", dashboardController.getUserProfile);
router.get("/user/posts/:username", dashboardController.getAllPostsFromUser);
router.get("/overview", dashboardController.getOverviewInfo);
router.get("/page-views", dashboardController.getPageViews);
router.post("/user/update", dashboardController.updateProfile);

module.exports = router;

// git add .
// git commit -am "make it better"
// git push heroku master
