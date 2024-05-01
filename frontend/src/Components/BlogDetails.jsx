import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./NavBar";
import CircularProgress from "@mui/material/CircularProgress";

function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const firstName = useSelector((state) => state.userSlice.firstName);
  const role = useSelector((state) => state.userSlice.role);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [love, setLove] = useState(0);
  const BACKEND_URL = "https://eduhub-node-backend.onrender.com";

  useEffect(() => {
    setLoading(true);
    fetch(BACKEND_URL + `/api/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setLove(data.love);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    fetch(BACKEND_URL + `/api/blog/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setLikes(data.likes);
      })
      .catch((error) => {
        console.error("Error liking blog:", error);
      });
  };

  const handleDislike = () => {
    fetch(BACKEND_URL + `/api/blog/${id}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setDislikes(data.dislikes);
      })
      .catch((error) => {
        console.error("Error disliking blog:", error);
      });
  };

  const handleLove = () => {
    fetch(BACKEND_URL + `/api/blog/${id}/love`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setLove(data.love);
      })
      .catch((error) => {
        console.error("Error loving blog:", error);
      });
  };

  return (
    <>
      {role === "teacher" && (
        <Navbar
          pages={["Courses Dashboard", "Community Forum", "Blogs", "Pricing"]}
        ></Navbar>
      )}
      {role === "student" && (
        <Navbar
          pages={["Dashboard", "My Courses", "Community Forum", "Blogs"]}
        ></Navbar>
      )}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="md">
          <Box mt={4}>
            <Card
              sx={{
                position: "relative",
                border: "1px solid white",
                boxShadow: "none",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              <CardContent>
                <IconButton
                  aria-label="go-back"
                  onClick={() => window.history.back()}
                  sx={{
                    position: "absolute",
                    left: "8px",
                    top: "8px",
                    color: "primary.main",
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </IconButton>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  paragraph
                  sx={{ textAlign: "center" }}
                >
                  by {firstName}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                sx={{
                  height: 400,
                  objectFit: "cover",
                  maxWidth: "100%",
                }}
              />
              <CardContent>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  paragraph
                  sx={{
                    fontSize: "1.2rem",
                    marginBottom: "70px",
                    marginTop: "20px",
                  }}
                >
                  {blog.description}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  marginLeft: "8px",
                  marginBottom: "8px",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <IconButton aria-label="thumbs-up" onClick={handleLike}>
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {likes}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="thumbs-down"
                      onClick={handleDislike}
                    >
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {dislikes}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="heart" onClick={handleLove}>
                      <FontAwesomeIcon icon={faHeart} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {love}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
        </Container>
      )}
    </>
  );
}

export default BlogDetailsPage;
