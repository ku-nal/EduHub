import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const StyledSnackbar = styled(Snackbar)({
  "& .MuiSnackbarContent-root": {
    backgroundColor: "#38a13c",
  },
});

function SimpleForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const BACKEND_URL = "https://eduhub-node-backend.onrender.com";

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
    fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (!formData.description) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    try {
      let formDataToSend = {
        title: formData.title,
        description: formData.description,
      };

      if (formData.image) {
        formDataToSend.image = await convertToBase64(formData.image);
      }

      const response = await fetch(BACKEND_URL + "/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error("Failed to create blog post:", response.status);
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Navbar pages={["Login", "Logout", "My Courses"]}></Navbar>
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
          paddingX: { xs: 0, md: "20px" },
          paddingY: "20px",
        }}
      >
        <IconButton
          aria-label="go-back"
          onClick={() => navigate(-1)}
          sx={{
            position: "relative",
            left: "8px",
            top: "8px",
            color: "primary.main",
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>

        <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
          Start a new blog
        </Typography>
        <Box mt={4}>
          <TextField
            label="Title"
            name="title"
            required
            fullWidth
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ width: "100%" }}
          />
        </Box>
        <Box mt={4}>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={8}
            required
            fullWidth
            error={descriptionError}
            helperText={descriptionError ? "Description is required" : ""}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ width: "100%" }}
          />
        </Box>
        <Box mt={4}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current.click()}
          >
            Attach Image
          </Button>
          {formData.image && (
            <Box ml={2} display="flex" alignItems="center">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Attached"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              <IconButton onClick={handleRemoveImage}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box mt={4} sx={{ textAlign: "center" }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create Blog
          </Button>
        </Box>
        <StyledSnackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Success! Blog Created."
        />
      </Box>
    </>
  );
}

export default SimpleForm;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
