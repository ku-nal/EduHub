// Rahul Goswami
import React, { useEffect } from "react";
import { Card, Input, Space, Tag, Typography } from "antd";
import { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import ReactLogo from "../../Assests/React-icon.svg.png";
import BannerImage from "../../Assests/react-logo.svg";
import Navbar from "../../Components/NavBar";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Button as AntdButton } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserData } from "../../Components/slices/userSlice";
import { useDispatch } from "react-redux";

const { CheckableTag } = Tag;
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const Dashboard: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [originalCourses, setOriginalCourses] = useState([]);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchTrendingCourses();
  }, []);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (value.trim() === "") {
      // If search value is empty, reset to original courses
      setTrendingCourses(originalCourses);
      return;
    }
    const filteredCourses = trendingCourses.filter((course) =>
      course.title.toLowerCase().includes(value.toLowerCase())
    );
    setTrendingCourses(filteredCourses);
  };

  const fetchTrendingCourses = async () => {
    try {
      // Fetch data from the /trending-courses API endpoint
      const response = await axios.get(
        "https://eduhub-node-backend.onrender.com/dashboard/trending-courses",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Update the state with the fetched data
      setTrendingCourses(response.data);
      setOriginalCourses(response.data);
    } catch (error) {
      console.error("Error fetching trending courses:", error);
    }
  };
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
    const filteredCourses = originalCourses.filter((course) => {
      if (nextSelectedTags.length === 0) return true; // If no tags selected, show all courses
      return nextSelectedTags.some((selectedTag) =>
        course.category.includes(selectedTag)
      );
    });

    setTrendingCourses(filteredCourses);
  };

  const transformTextToHashtags = (text: string) => {
    return text
      .split(",")
      .map((part) => `#${part.trim()}`)
      .join(" ");
  };

  const handleNextBatch = () => {
    setCurrentBatchIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousBatch = () => {
    setCurrentBatchIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const batchSize = 4;
  const currentBatch = trendingCourses.slice(
    currentBatchIndex * batchSize,
    (currentBatchIndex + 1) * batchSize
  );

  const enrollCourse = async (courseID) => {
    try {
      // Make an API call to store the course ID in the database
      const response = await axios.post(
        "https://eduhub-node-backend.onrender.com/dashboard/trending-courses/enroll",
        { courseID }
      );

      console.log("setting the data", courseID);
      dispatch(setUserData({ enrolledCourses: courseID }));
      toast.success("Course enrolled successfully");
      console.log("Course enrolled successfully:", response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to enroll");
      console.error("Error enrolling course:", error);
    }
  };
  const tagsData = ["Photography", "Devops", "Programming", "Sports"];
  return (
    <>
      <Navbar
        pages={["Contact", "My Courses", "Session", "Community Forum" ,"FAQs", "Logout"]}
      ></Navbar>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <span style={{ marginRight: 8, fontSize: 18 }}>Categories:</span> */}
        <Space size={[0, 8]} wrap>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked: boolean) => handleChange(tag, checked)}
              style={{ fontSize: 18, fontStyle: "oblique" }}
            >
              {tag}
            </CheckableTag>
          ))}
        </Space>
        <div style={{ marginRight: "5px" }}>
          <Space direction="vertical">
            <Search
              placeholder="Search courses"
              onSearch={onSearch}
              enterButton
              style={{ width: 500 }}
            />
          </Space>
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        <Typography.Title level={4} style={{ marginTop: "1px" }}>
          Discover Courses
        </Typography.Title>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f0f2f5",
            borderRadius: "16px",
          }}
        >
          <Space size={16} wrap>
            {currentBatch.map((course: any) => (
              <Card
                key={course._id}
                style={{ width: 300 }}
                cover={
                  <img
                    style={{ height: 150, objectFit: "cover" }}
                    alt={course.name}
                    src={BannerImage}
                  />
                }
              >
                <Card.Meta
                  title={course.title}
                  description={
                    <Space direction="vertical">
                      <Paragraph ellipsis={{ rows: 2 }}>
                        {course.description}
                      </Paragraph>
                      <AntdButton
                        type="primary"
                        onClick={() => enrollCourse(course._id)}
                      >
                        Enroll Now
                      </AntdButton>
                    </Space>
                  }
                />
              </Card>
            ))}
          </Space>
          <div
            style={{ marginTop: 10, justifyContent: "center", display: "flex" }}
          >
            <Button onClick={handlePreviousBatch}>Previous</Button>
            <Button onClick={handleNextBatch}>Next</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
