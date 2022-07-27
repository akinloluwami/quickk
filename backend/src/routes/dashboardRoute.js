const dashboardController = require("../controllers/dashboardController");
const router = require("express").Router();

router.get("/user/profile", dashboardController.getUserProfile);
router.get("/user/posts/:username", dashboardController.getAllPostsFromUser);
router.get("/overview", dashboardController.getOverviewInfo);
router.get("/page-views", dashboardController.getPageViews);
router.post("/user/update", dashboardController.updateProfile);
router.post("/user/update/dp", dashboardController.updateProfilePicture);
router.delete("/user/delete/dp", dashboardController.deleteProfilePicture);
router.get("/links/get", dashboardController.getLinks);
router.post("/links/add", dashboardController.addLink);
router.delete("/links/delete/:id", dashboardController.deleteLink);
router.post("/links/update/:id", dashboardController.updateLink);

module.exports = router;

// git add .
// git commit -am "make it better"
// git push heroku master
