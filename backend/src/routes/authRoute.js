const authController = require("../controllers/authController");
const router = require("express").Router();

router.post("/signup", authController.signup);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-otp", authController.resendOTP);
router.post("/send-reset-link", authController.sendResetLink);

module.exports = router;
