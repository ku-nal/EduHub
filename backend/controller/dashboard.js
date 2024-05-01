// Rahul Goswami
const mongoose = require("mongoose");
const { Course } = require("../models/course");
const User  = require("../models/user");

exports.getTrendingCourses = async (_, res) => {
  try {
    // Fetch all courses
    const allTrendingCourses = await Course.find().sort({ created_at: 1 });
    res.send(allTrendingCourses || []);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

exports.enrollNow = async (req, res) => {
  try {
    const { courseID } = req.body;

    // Find the course by ID
    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const userId = course.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.enrolledCoursesId) {
      user.enrolledCoursesId = [];
    }

    user.enrolledCoursesId.push(courseID);

    await user.save();

    return res
      .status(200)
      .json({ message: "Course ID stored successfully for the user" });
  } catch (error) {
    console.error("Error storing course ID for the user:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
