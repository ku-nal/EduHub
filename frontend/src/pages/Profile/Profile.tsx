// Rahul Goswami
import React from "react";
import { Form, Select } from "antd";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import Header from "../../Components/Header/Header";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event: { target: { value: any; }; }) => {
    const email = event.target.value;
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    setEmailError(!isValidEmail);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Minimum and maximum password length validation
    if (newPassword.length < 8 || newPassword.length > 15) {
      setPasswordError('Password must be between 8 and 15 characters long');
    } else {
      setPasswordError('');
    }
  };
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Header />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          "& > :not(style)": { m: 1, width: "45ch" },
          marginTop: "-100px", // Adjust marginTop as needed
        }}
        noValidate
        autoComplete="off"
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            sx={{ marginRight: "8px" }}
          />
          <TextField id="outlined-basic" label="Last Name" variant="outlined" />
        </div>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
          error={emailError}
          helperText="Example: abc@abc.com"
          onChange={handleEmailChange}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          error={!!passwordError}
          helperText={passwordError}
          onChange={handlePasswordChange}
        />
        <Button variant="contained">Save</Button>
      </Box>
    </>
  );
};

export default Profile;
