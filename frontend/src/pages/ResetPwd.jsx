import React, { useState } from "react";
import Logo from "../assets/images/login-img.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userService } from "../services/urls";

const ResetPwd = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { forgotToken } = useParams();

  const handleForgot = async (e) => {
    try{
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      password: password,
    };

    const response = await axios.post(
      userService.resetpwd + forgotToken,
      payload
    );
    toast.success("Successfully reset the password.");
    }

    catch(error){
        // console.log(error);
        toast.error(error?.response?.data?.error);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src={Logo} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="flex justify-center items-center w-full md:w-1/2 xl:w-1/3">
        <div className="w-10/12 max-w-[700px] px-10 py-10 rounded-3xl bg-gray-200 border-2 border-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-semibold leading-tight mt-4">Reset Password</h1>
            <hr className="my-6 border-gray-300 w-full" />
          </div>

          <form onSubmit={handleForgot}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
          >
            Reset Password
          </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPwd;
