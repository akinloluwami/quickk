const payments = require("../controllers/paymentsController");
const router = require("express").Router();

router.post("/donate", payments.donate);
router.post("/update", payments.updateWalletAddressAndMinimumDonationAmount);
router.get("/get", payments.getWalletAddressAndMinimumDonationAmount);
router.get("/get-donations", payments.getDonations);

module.exports = router;
