/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import { Email } from "./input";
import BackLogo from "../assets/images/back-logo-1.webp";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {userService} from "../services/urls";


export const ForgotForm = () => {
  const [selectedRole, setSelectedRole] = useState("Teacher");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");


  const handleRoleToggle = (role) => {
    setSelectedRole(role);
  };

  useEffect(()=>{
    setError("");
  }, [selectedRole, email]);

  const handleForgot = async (e) =>{
    try{
      console.log("Inside handle forgot");
      e.preventDefault();
      const payload = {
        email: email,
        role: selectedRole.toLowerCase()
      };

      const response = await axios.post(
        userService.forgotpwd,
        payload
      );
      
      console.log("response", response);
      toast.success("Sent Reset password link! Check your mail :-)");
    }
    catch(error){
      console.log(error);
      const errMessage = error?.response?.data?.error;
      setError(errMessage);
      console.log("In error");
    }
  }

  return (
    <div className=" w-10/12 max-w-[700px] px-10 py-10 rounded-3xl bg-gray-200 border-2 border-gray-100">
      <div className="w-full h-100">
        <h1 className="text-10xl md:text-3xl font-semibold leading-tight mt-4">
          Forgot
        </h1>
        <h1 className="text-5xl md:text-2xl font-semibold leading-tight mt-2">
          your password?
        </h1>
        <hr className="my-6 border-gray-300 w-full" />

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

        <form className="mt-10" onSubmit = {handleForgot}>
          <Email value = {email} fn = {setEmail} />

          {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
              </div>
            )}

          <button
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-semibold flex items-center justify-center"
          >
            <img src={BackLogo} alt="Back" className="h-5 w-5 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
