// Rahul Goswami
const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meeting_url: {
    type: String,
    required: true,
  },
});

exports.Meeting = mongoose.model("Meeting", meetingSchema);
