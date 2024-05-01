// Rahul Goswami
const express = require("express");
const router = express.Router();

const meetingController = require("../controller/meeting");

router.post("/create-meet", meetingController.createMeeting);
router.get("/list", meetingController.getMeeting);

module.exports = router;
