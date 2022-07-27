const payments = require("../controllers/paymentsController");
const router = require("express").Router();

router.post("/donate", payments.donate);
router.post("/update", payments.updateWalletAddressAndMinimumDonationAmount);
router.get("/get", payments.getWalletAddressAndMinimumDonationAmount);

module.exports = router;
