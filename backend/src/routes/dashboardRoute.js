const dashboardController = require("../controllers/dashboardController");
const router = require("express").Router();

router.get("/user/profile", dashboardController.getUserProfile);

module.exports = router;
