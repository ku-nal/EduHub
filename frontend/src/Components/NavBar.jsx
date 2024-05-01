import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import EduHubLogo from "../assets/images/EduHubLogo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const pages = ["Contact Us", "FAQs", "Register", "Login"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const courseId = sessionStorage.getItem("courseId");
console.log("Course ID from session storage:", courseId);

function Navbar({
  pages = ["Login", "Logout", "My Courses", "Community Forum", "Blogs"],
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    const { target } = event;
    const setting = target.textContent;

    // If the user clicks on "Logout", redirect to "/logout"
    if (setting === "Logout") {
      navigate("/logout");
    }

    if (setting == "Profile") {
      navigate("/profile");
    }

    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const selectedRole = useSelector((state) => state.userSlice.role);

  const handleDashboardClick = () => {
    console.log("select role: ", selectedRole);
    if (selectedRole.toLowerCase() === "teacher") {
      console.log("I am here buddyyy");
      navigate("/professor/courses");
    } else {
      navigate("/dashboard");
    }
  };

  const routeMap = {
    "Community Forum": "questions",
    "Question Bank": "questionbank",
    Tests: "createtest",
    "Live Tests": "test-list",
    Results: "result-list",
    Content: `edit-course/${courseId}`,
    Chapters: `chapter-details/${courseId}`,
    "Courses Dashboard": `professor/courses`,
    Pricing: `pricing`,
  };

  const getRouteLink = ({ page = "" }) =>
    routeMap[page] || (page || "").toLowerCase();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={EduHubLogo}
              alt="EduHub Logo"
              style={{ height: "50px", opacity: 1 }}
              onClick={handleDashboardClick}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} href={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={EduHubLogo}
              alt="EduHub Logo"
              style={{ height: "30px", opacity: 0.7 }}
              onClick={handleDashboardClick}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                // to={page === "Blogs" ? "/blogs" : `/${getRouteLink({ page })}`}
                to={
                  page === "Blogs"
                    ? "/blogs"
                    : page === "My Courses"
                    ? "/my-courses"
                    : `/${getRouteLink({ page })}`
                }
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
