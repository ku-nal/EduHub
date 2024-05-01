// Rahul Goswami
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavBar";
import React from "react";

const courses = [
  {
    id: 1,
    title: "Course 1",
    imageUrl: "\\src\\Assests\\React-icon.svg.png",
    description: "First Course",
    price: "$99.99",
  },
  {
    id: 2,
    title: "Course 2",
    imageUrl:
      "F:CANADADalhousieSEM 2WebAssignment1assignment-1React-icon.svg.png",
    description: "Second Course",
    price: "$129.99",
  },
];
const MyCourse: React.FC = () => {
  return (
    <>
      <Navbar/>
      <Typography variant="h5" gutterBottom>
        My Courses
      </Typography>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <Card>
              <CardActionArea
                component={Link}
                to={`/my-course/${course.id}`} /* Link to detailed view */
              >
                {/* Course image */}
                <Box position="relative">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
                <CardContent>
                  {/* Course title */}
                  <Typography variant="h6" component="h2">
                    {course.title}
                  </Typography>
                  {/* Course description */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {course.description}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    Price: {course.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyCourse;
