import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./NavBar";

function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const BACKEND_URL = "https://eduhub-node-backend.onrender.com";

  useEffect(() => {
    fetch(BACKEND_URL + `/api/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching blog post:", error);
      });
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(BACKEND_URL + `/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error("Failed to update blog post:", response.status);
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Navbar pages={["Login", "Logout", "My Courses"]} />
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
          Edit Blog
        </Typography>
        <Box mt={4}>
          <TextField
            label="Title"
            name="title"
            required
            fullWidth
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
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ width: "100%" }}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Box mr={2} mt={4} sx={{ textAlign: "left" }}>
            {formData.image && (
              <>
                <Typography variant="h6" gutterBottom>
                  Image
                </Typography>
                <img
                  src={formData.image}
                  alt="Blog Image"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                  }}
                />
              </>
            )}
          </Box>
          <Box mt={4}>
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<FontAwesomeIcon icon={faUpload} />}
                size="small"
              >
                Upload New Image
              </Button>
            </label>
          </Box>
        </Box>

        <Box mt={4} sx={{ textAlign: "center" }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Blog
          </Button>
        </Box>
        <Snackbar
          open={showSuccess}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="Success! Blog Updated."
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#38a13c",
            },
          }}
        />
      </Box>
    </>
  );
}

export default EditBlog;
