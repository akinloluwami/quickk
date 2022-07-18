const payments = require("../controllers/paymentsController");
const router = require("express").Router();

router.post("/donate", payments.donateToUser);
