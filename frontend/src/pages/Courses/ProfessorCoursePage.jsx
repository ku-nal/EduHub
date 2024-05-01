import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ProfessorCourseCard from "./ProfessorCourseCard";
import SearchBar from "./SearchBar";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import "./ProfessorCoursePage.css";
import NavBar from "../../Components/NavBar.jsx";

function ProfessorCoursePage() {
  // const { userId } = useParams();
  const userId = useSelector((state) => state.userSlice.userId);

  console.log("userId====", userId);

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [newCourseData, setNewCourseData] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    image: null,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    const storedCourseId = sessionStorage.getItem("courseId");
    if (storedCourseId) {
      setCourseId(storedCourseId);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("courseId", courseId);
  }, [courseId]);

  useEffect(() => {
    const fetchCourses = async (userId) => {
      try {
        const response = await axios.get(
          `https://webbackend-3087.onrender.com/api/courses/all/${userId}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses(userId);
  }, [userId]);

  useEffect(() => {
    if (!showModal) {
      setNewCourseData({
        title: "",
        description: "",
        instructor: "",
        category: "",
        image: null,
      });
      setIsEdit(false);
      setEditCourseId(null);
    }
  }, [showModal]);

  const handleNewCourseSubmit = () => {
    const formData = new FormData();
    //formData.append('file', newCourseData.image); // Append the image file
    formData.append("title", newCourseData.title);
    formData.append("instructor", newCourseData.instructor);
    formData.append("description", newCourseData.description);
    formData.append("category", newCourseData.category);

    if (newCourseData.image !== " ") {
      formData.append("file", newCourseData.image);
    }

    if (
      !newCourseData.title ||
      !newCourseData.description ||
      !newCourseData.instructor ||
      !newCourseData.category
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (isEdit) {
      axios
        .put(
          `https://webbackend-3087.onrender.com/api/courses/edit/${userId}/${editCourseId}`,
          formData
        )
        .then((response) => {
          const updatedCourse = response.data;
          const updatedCourses = courses.map((course) => {
            if (course.id === editCourseId) {
              if (formData.get("file") != null || formData.get("file") != " ") {
                return {
                  ...updatedCourse,
                  image: formData.get("file") || course.image,
                };
              } else {
                // If no new image is provided, keep the existing image
                return { ...updatedCourse, image: course.image };
              }
            }
            return course;
          });
          setCourses(updatedCourses);
          setSuccessMessage("Course updated successfully.");
          setNewCourseData({
            title: "",
            description: "",
            instructor: "",
            category: "",
            image: null,
          });
          setIsEdit(false);
          setEditCourseId(null);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error updating course:", error);
          setError("Error updating course. Please try again.");
        });
    } else {
      if (!newCourseData.image) {
        setError("Please fill in all required fields");
        return;
      }
      axios
        .post(
          `https://webbackend-3087.onrender.com/api/courses/${userId}/create`,
          formData
        )
        .then((response) => {
          setCourses([...courses, response.data]);
          setSuccessMessage("Course added successfully.");
          setNewCourseData({
            title: "",
            description: "",
            instructor: "",
            category: "",
            image: null,
          });
          setIsEdit(false);
          setEditCourseId(null);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error adding new course:", error);
          setError("Error adding new course. Please try again.");
        });
    }

    setNewCourseData({
      title: "",
      description: "",
      instructor: "",
      category: "",
      image: null,
    });
    setIsEdit(false);
    setEditCourseId(null);
    setShowModal(false);
  };

  const handleEdit = (courseId) => {

    const courseToEdit = courses.find((course) => course.id === courseId);
    if (courseToEdit) {
      setNewCourseData({ ...courseToEdit });
      setIsEdit(true);
      setEditCourseId(courseId);
      setShowModal(true);
    } else {
      console.error(`Course with ID ${courseId} not found.`);
    }
  };
  const handleDelete = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);

    axios
      .delete(
        `https://webbackend-3087.onrender.com/api/courses/delete/${courseId}`
      )
      .then((response) => {
        setSuccessMessage("Course deleted successfully.");
        if (response.status === 404) {
          const updatedCourses = courses.filter(
            (course) => course.id !== courseId
          );
          setCourses(updatedCourses);
          setSuccessMessage("Course deleted successfully.");
        }


        if (response.status === 204) {
          const updatedCourses = courses.filter(
            (course) => course.id !== courseId
          );
          setCourses(updatedCourses);
          setSuccessMessage("Course deleted successfully.");
        } else {
          console.error("Unexpected status code:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourseData({ ...newCourseData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewCourseData({ ...newCourseData, image: file });
  };

  const handleCloseErrorDialog = useCallback(() => {
    setError(null);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const handleSearchh = (term) => {
    console.log("Search term:", term);
    setSearchTerm(term);
  };

  return (
    <div>
      <NavBar
        pages={["Courses Dashboard", "Meeting" ,"Community Forum", "Blogs", "Pricing"]}
      />
      <div className="professor-courses-page">
        <div className="filter-and-search">
          <div className="search-container">
            {/* <SearchBar onSearch={handleSearch} /> */}
            <SearchBar onSearch={handleSearchh} />
          </div>
          <Button
            onClick={() => {
              setIsEdit(false);
              setShowModal(true);
            }}
            variant="contained"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.87)" }}
            className="create-course-button"
          >
            New Course
          </Button>
        </div>
        <div className="course-list">
          {filteredCourses.map((course) => (
            <ProfessorCourseCard
              key={course.id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        {/* New/Edit Course Modal */}
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box className="modal">
            <Typography variant="h5" gutterBottom>
              {isEdit ? "Edit Course" : "Add New Course"}
            </Typography>
            <TextField
              label="Title"
              name="title"
              value={newCourseData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { height: "3rem" } }}
            />
            <TextField
              label="Description"
              name="description"
              value={newCourseData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { height: "3rem" } }}
            />
            <TextField
              label="Instructor"
              name="instructor"
              value={newCourseData.instructor}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { height: "3rem" } }}
            />
            <TextField
              label="Category"
              name="category"
              value={newCourseData.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { height: "3rem" } }}
            />
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <Button
              onClick={handleNewCourseSubmit}
              variant="contained"
              style={{
                backgroundColor: "rgba(0,0,0, 0.87)",
                margin: "15px 20px",
              }}
            >
              {isEdit ? "Save Changes" : "Add Course"}
              {/* Display appropriate button text */}
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              variant="contained"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.87)",
                margin: "15px 20px",
              }}
            >
              Close
            </Button>
          </Box>
        </Modal>
        <Dialog open={!!error} onClose={handleCloseErrorDialog}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <DialogContentText>{error}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseErrorDialog} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={!!successMessage} onClose={handleCloseDialog}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <DialogContentText>{successMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ProfessorCoursePage;
