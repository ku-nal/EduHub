import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import CourseCard from "./CourseCard";
import SearchBar from "./SearchBar";
import StarIcon from "@mui/icons-material/Star";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material"; 
import { useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar.jsx";
import { useSelector } from "react-redux";

import axios from "axios";
import "./MyCoursePage.css";

function MyCoursesPage() {
  // const { userId } = useParams();
  const userId = useSelector((state) => state.userSlice.userId);

  console.log("userId====", userId);

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [instructorFilter, setInstructorFilter] = useState(""); 
  const [uniqueRatings, setUniqueRatings] = useState([]);
  const [uniqueInstructors, setUniqueInstructors] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(""); 

  useEffect(() => {
   
    const fetchCourses = async (userId) => {
      try {
        const response = await axios.get(
          `https://webbackend-3087.onrender.com/api/courses/all/${userId}`
        );
        // setCourses(response.data);
        const updatedCourses = response.data.map(course => ({ ...course, rating: 3 }));
        setCourses(updatedCourses);
        // console.log("courses======", response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses(userId);
  }, [userId]);

  useEffect(() => {
    const instructors = [
      ...new Set(courses.map((course) => course.instructor)),
    ];
    setUniqueInstructors(instructors);
  }, [courses]);

  useEffect(() => {
    setRatingFilter(5);
  }, []);

  const ratingOptions = [];
  for (let i = 1; i <= 5; i++) {
    ratingOptions.push(
      <option key={i} value={i}>
        {i} Star
      </option>
    );
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleRatingFilterChange = (event) => {
    setRatingFilter(Number(event.target.value));
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleInstructorFilterChange = (event) => {
    setInstructorFilter(event.target.value);
  };

  const clearFilters = () => {
    setFilterType("");
    setRatingFilter(0);
    setPriceFilter("");
    setInstructorFilter("");
  };

  const filteredCourses = courses.filter((course) => {
    const titleMatches =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase());

    const instructorMatches =
      instructorFilter === "" ||
      course.instructor.toLowerCase() === instructorFilter.toLowerCase();

      const ratingMatches =
       course.rating >= ratingFilter; 
  
    return titleMatches && instructorMatches && ratingMatches;
    
    // return titleMatches && instructorMatches;
  });

  const handleSearchh = (term) => {
    console.log("Search term:", term);
    setSearchTerm(term);
  };

  useEffect(() => {
    if (selectedCourseId) {
      sessionStorage.setItem("selectedCourseId", selectedCourseId);
    }
  }, [selectedCourseId]);

  // Reset selectedCourseId whenever courses change
  useEffect(() => {
    setSelectedCourseId("");
  }, [courses]);
  // console.log("Filtered courses:", filteredCourses);

  return (
    <div>
      {/* <NavBar /> */}
      <NavBar pages={["My Courses", "Community Forum", "Blogs"]} />

      <div className="my-courses-page">
        <div className="my-courses-filter-and-search">
          <SearchBar onSearch={handleSearchh} />
        </div>
        <div className="my-course-container">
          <div className="filter-container">
            <h2>
              <IconButton>
                <FilterAltIcon />
              </IconButton>
              <button className="clear-button" onClick={clearFilters}>
                Clear Filters
              </button>
            </h2>

            <div className="filter-group">
              <label className="filter-label" htmlFor="rating-filter">
                Rating
              </label>
              <select
                id="rating-filter"
                value={ratingFilter}
                onChange={handleRatingFilterChange}
              >
                {ratingOptions}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Instructor</label>
              <select
                className="instructor-select"
                value={instructorFilter}
                onChange={handleInstructorFilterChange}
              >
                <option value="">Select an instructor</option>
                {uniqueInstructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="course-container-2">
            <div className="course-list">
              {console.log("Courses:", courses)}
              {console.log("Filtered Courses=========", filteredCourses)}
              {filteredCourses.length > 0
                ? filteredCourses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/chapter-details/${course.id}`}
                      onClick={() => setSelectedCourseId(course.id)}
                    >
                      <CourseCard course={course} />
                    </Link>
                  ))
                : // Render all courses if there are no filtered courses
                  filteredCourses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/chapter-details/${course.id}`}
                      onClick={() => setSelectedCourseId(course.id)}
                    >
                      <CourseCard course={course} />
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCoursesPage;
