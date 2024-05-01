import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Components/NavBar";
import { Button, Form, Input, List, Modal, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Meeting: React.FC = () => {
  const userId = useSelector((state) => state.userSlice.userId);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        "https://eduhub-node-backend.onrender.com/meeting/create-meet",
        {
          ...values,
          userId: userId,
        }
      );
      console.log("Response:", response.data);
      setVisible(false); // Close the modal after form submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [data, setData] = useState([]);

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
        pages={["My Courses", "Meeting", "Chapters", "Live Tests", "Results"]}
      ></Navbar>
      <Button
        type="primary"
        style={{ position: "fixed", top: 75, right: 10, zIndex: 1000 }}
        onClick={showModal}
      >
        Create Meeting
      </Button>
      <Modal
        title="Meeting Creation"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Enter the meeting title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Enter the meeting description" },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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
export default Meeting;
