import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Email, Pwd, CreateAccount } from "./input";
import axios from "axios";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "./slices/userSlice";
import { userService } from "../services/urls";

const SignForm = () => {
  const [selectedRole, setSelectedRole] = useState("Teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const handleRoleToggle = (role) => {
    setSelectedRole(role);
  };

  useEffect(() => {
    setError("");
  }, [email, password, selectedRole]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        email: email,
        password: password,
        role: selectedRole.toLowerCase(),
      };
      console.log("Here in the function");
      const response = await axios.post(userService.login, payload, {
        withCredentials: true,
      });

      const userData = response?.data?.data;

      const userPayload = {
        userId: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
      };

      dispatch(setUserData(userPayload));

      cookies.set("accesstoken", response.headers.accesstoken);

      if (response.error) {
        navigate("/blogs");
      }

      if (selectedRole == "Teacher") {
        navigate("/professor/courses");
      } else if (selectedRole == "Student") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      const errMessage = error?.response?.data?.error;
      setError(errMessage);
    }
  };

  return (
    <div className=" w-10/12 max-w-[700px] px-10 py-10 rounded-3xl bg-gray-200 border-2 border-gray-100">
      <div className="w-full h-100">
        <h1 className="text-5xl md:text-2xl font-semibold leading-tight mt-4">
          Log in to your account
        </h1>
        <div className="flex mb-8 mt-4">
          <div className="border-2 border-blue-500 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => handleRoleToggle("Teacher")}
              className={`${
                selectedRole === "Teacher"
                  ? "bg-indigo-500 text-white"
                  : "text-blue-500"
              } font-semibold px-4 py-2 rounded-l-md`}
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => handleRoleToggle("Student")}
              className={`${
                selectedRole === "Student"
                  ? "bg-indigo-500 text-white"
                  : "text-blue-500"
              } font-semibold px-4 py-2 rounded-r-md`}
            >
              Student
            </button>
          </div>
        </div>
        <hr className="my-6 border-gray-300 w-full" />

        <form className="mt-10" onSubmit={handleLogin}>
          <Email value={email} fn={setEmail} />

          <Pwd value={password} fn={setPassword} />

          <div className="mt-2">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
              </div>
            )}
          </div>
          <div className="text-right mt-2">
            <Link
              to="/forgotpwd"
              className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>

          <input
            type="submit"
            value="Log In"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          />
        </form>

        {/* <hr className="my-6 border-gray-300 w-full" /> */}

        {/* <GoogleSignIn /> */}

        <CreateAccount />
      </div>
    </div>
  );
};

export default SignForm;
