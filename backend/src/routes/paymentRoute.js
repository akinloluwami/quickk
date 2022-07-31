const payments = require("../controllers/paymentsController");
const router = require("express").Router();

router.post("/donate", payments.donate);
router.post("/update", payments.updateWalletAddressAndMinimumDonationAmount);
router.get("/get", payments.getWalletAddressAndMinimumDonationAmount);
router.get("/get-donations", payments.getDonations);
router.get("/get-balance", payments.getAccountBalance);
router.post("/payout", payments.requestPayout);

module.exports = router;
