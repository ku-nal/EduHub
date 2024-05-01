// Rahul Goswami
const express = require("express");
const router = express.Router();

const contactController = require("../controller/contact");

router.post("/contact-us", contactController.submit);

module.exports = router;
