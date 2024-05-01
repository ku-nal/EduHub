// Rahul Goswami
const mongoose = require("mongoose");
const { Contact } = require("../models/contact");

exports.submit = async (req, res) => {
  const { fullName, email, description } = req.body;
     console.log(req);
  try {
    // Create a new instance of your model with the form data
    const formData = new Contact({
     fullname: fullName,
      email,
      description,
    });

    // Save the form data to the database
    const savedFormData = await formData.save();

    res
      .status(201)
      .json({ message: "Form data saved successfully", data: savedFormData });
  } catch (error) {
    console.error("Error saving form data:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
