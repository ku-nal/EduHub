import React, { useState , useEffect} from "react";
import { FirstName, LastName, SignUp, SignInInstead } from "./signup-input";
import { Email, Pwd } from "./input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { select } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "./slices/userSlice";
import Cookies from "universal-cookie";
import {userService} from "../services/urls";


const SignUpForm = () => {
  const [selectedRole, setSelectedRole] = useState("Teacher");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();


  const handleRoleToggle = (role) => {
    setSelectedRole(role);
  };

  useEffect(()=>{
    setError("");
  }, [email, selectedRole]);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        role: selectedRole.toLowerCase()
      };

      const response = await axios.post(
        userService.signup,
        payload
      );

      cookies.set("accesstoken", response.headers.accesstoken);

      const userData = response?.data?.data;
      const userPayload = {
        userId: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
      };

      console.log("User Payload :", userPayload);
      dispatch(setUserData(userPayload));


      console.log(response);

      if(selectedRole == "Teacher"){
        navigate("/professor/courses");
      }
      else if(selectedRole == "Student"){
      navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error);
      navigate("/register");
    }
  };

  return (
    <div className="w-10/12 max-w-[700px] px-10 py-10 rounded-3xl bg-gray-200 border-2 border-gray-100">
      <div className="w-full h-100">
        <h1 className="text-5xl md:text-2xl font-semibold leading-tight mt-4">
          Create an account
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

        <form className="mt-3" onSubmit={handleSignUp}>
          <div className="grid grid-cols-2 gap-4">
            <FirstName value={firstName} fn={setFirstName} />
            <LastName value={lastName} fn={setLastName} />
          </div>
          <div className="mt-4">
            <Email value={email} fn={setEmail} />
          </div>

          <Pwd value={password} fn={setPassword} />

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          <SignUp />

          <SignInInstead />
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
