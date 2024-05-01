// Rahul Goswami
const mongoose = require("mongoose");
const { Meeting } = require("../models/meeting");
const { v4: uuidv4 } = require("uuid");

exports.createMeeting = async (req, res) => {
  try {
    const url = uuidv4();
    const { title, description, userId } = req.body;
    const meeting = new Meeting({
      title: title,
      description: description,
      user_id: userId,
      meeting_url: url,
    });
    const saveMeet = await meeting.save();
    res.status(200).json(saveMeet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

exports.getMeeting = async (_, res) => {
  try {
    const allMeeting = await Meeting.find({});
    if (allMeeting) {
     res.send(allMeeting || []);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
