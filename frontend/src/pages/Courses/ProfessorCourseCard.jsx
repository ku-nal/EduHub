import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardMedia, IconButton } from '@mui/material';
import ManageIcon from '@mui/icons-material/Settings'; 

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import './ProfessorCourseCard.css'; 

function ProfessorCourseCard({ course,  onEdit, onDelete}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    onEdit(course.id);
   
  };

  const handleDelete = () => {
    onDelete(course.id);
  };

  const handleManage = () => {
    
    console.log(`Manage course: ${course.title}`);
  
     
     console.log(`Navigating to: /edit-course/${course.id}`);
     navigate(`/edit-course/${course.id}`);
  };

  return (
    <Card className="course-card">
      <CardMedia
        component="img"
        max-height="23"
        image={`data:image/jpeg;base64,${course.image}`} // Use the provided Base64 image data directly
        alt={course.title}
      />
      <CardContent>
        <div className="course-info-title">
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography className="course-info-instructor" variant="body2" color="text.secondary">
          Instructor: {course.instructor}
        </Typography>
       
          <div className="course-info-actions">
            <IconButton aria-label="edit" onClick={handleEdit}>
              <EditIcon style={{ color: 'blue' }}  />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon style={{ color: 'red' }} />
            </IconButton>
            <IconButton aria-label="manage" onClick={handleManage}> {/* Add the manage icon button */}
              <ManageIcon />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

ProfessorCourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired, 
  onDelete: PropTypes.func.isRequired 
};

export default ProfessorCourseCard;
