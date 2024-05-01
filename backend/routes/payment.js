const express = require('express')
const router = express.Router()
const paymentController = require('../controller/payment')

router.post('/create-checkout-session', paymentController.createPayment);

exports.routes = router;
