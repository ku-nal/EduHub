import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

import './CourseCard.css'; 

function CourseCard({ course }) {
  course.rating = 3;
  return (
    <Card className="my-course-card">
      <CardMedia
        component="img"
        height="10"
        image={`data:image/jpeg;base64,${course.image}`} // Use the provided Base64 image data directly
        alt={course.title}
      />
      <CardContent>
        <div className="my-course-info-title" >
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        </div>
        <Typography className="my-course-info-instructor" variant="body2" color="text.secondary">
          Instructor: {course.instructor}
        </Typography>
        <div className="rating" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          {Array.from({ length: course.rating }).map((_, index) => (
            <StarIcon key={index} style={{ color: "#FFD700" }} />
          ))}
        </div>
        {/* <Button component={Link} to={`/course-details/${course.id}`} className="btn" variant="contained">
          View Details
        </Button> */}
      </CardContent>
    </Card>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired 
  }).isRequired
};

export default CourseCard;
