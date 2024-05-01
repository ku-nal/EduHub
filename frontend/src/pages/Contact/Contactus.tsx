// Rahul Goswami
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ContactImage from "../../Assests/contactpage.png";
import Navbar from "../../Components/NavBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contactus: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    description: "",
  });
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const allFieldsFilled = Object.values(formData).every(
      (val) => val.trim() !== ""
    );
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    );
    setIsSaveButtonDisabled(!allFieldsFilled);
    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://eduhub-node-backend.onrender.com/contact/contact-us",
        {
          fullName: formData.fullName,
          email: formData.email,
          description: formData.description,
        }
      );

      // Handle successful response
      console.log("Data successfully submitted:", response.data);
      toast.success("Form saved successfully");
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
    }
  };
  return (
    <>
      <Navbar pages={["Contact", "My Courses","Session", "FAQs", "Logout"]}></Navbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url(${ContactImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          paddingTop: "100px", // Adjust as needed to leave space for the header
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f0f0f0", // Background color of the box
            padding: "20px", // Padding around the box
            borderRadius: "8px", // Border radius
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)", // Box shadow
            maxWidth: "500px", // Max width of the box
            margin: "0 auto", // Center the box horizontally
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "75vh",
              "& > :not(style)": { m: 1, width: "45ch" },
              marginTop: "-100px", // Adjust marginTop as needed
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="standard"
              name="fullName"
              // sx={{ bgcolor: "#eaeaea" }}
              required
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              variant="standard"
              required
              value={formData.email}
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              id="standard"
              label="Description"
              name="description"
              variant="standard"
              required
              value={formData.description}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "#4a5cfb" }}
              onClick={handleSubmit}
              disabled={isSaveButtonDisabled}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Contactus;
