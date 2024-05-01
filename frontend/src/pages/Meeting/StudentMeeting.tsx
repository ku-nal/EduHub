// Rahul Goswami
import { Button, List, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/NavBar";

const StudentMeeting: React.FC = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://eduhub-node-backend.onrender.com/meeting/list")
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Make sure to set loading to false in case of error
      });
  }, []);

  const handleButtonClick = (item) => {
    navigate(`/room/${item.meeting_url}`);
  };
  return (
    <>
      <Navbar
        pages={["Contact Us", "My Courses","Session", "FAQs", "Logout"]}
      ></Navbar>
      <Typography.Title level={3}>Meeting List</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="button" onClick={() => handleButtonClick(item)}>
                Join Meeting
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};
export default StudentMeeting;
