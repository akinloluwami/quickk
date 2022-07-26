const payments = require("../controllers/paymentsController");
const router = require("express").Router();

router.post("/donate", payments.donateToUser);
router.post("/update", payments.updateWalletAddressAndMinimumDonationAmount);
router.get("/get", payments.getWalletAddressAndMinimumDonationAmount);

module.exports = router;
