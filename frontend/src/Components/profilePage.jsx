import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [firstName, setFirstName] = useState(useSelector(state => state.userSlice.firstName));
  const [lastName, setLastName] = useState(useSelector(state => state.userSlice.lastName));
  const [email, setEmail] = useState(useSelector(state => state.userSlice.email));
  const [phone, setPhone] = useState(useSelector(state => state.userSlice.phone));
  const userId = useSelector(state => state.userSlice.userId)


  const handleSave = async () => {
    try{
    const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        _id : userId
    };

    const response = await axios.post("https://eduhub-node-backend.onrender.com/user/update", payload);

    toast.success("Data saved successfully!");

    }
    catch(error){
        console.log(error);
        toast.error("error occured");

    }
  };

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center">
      <div className="main-body w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-6 bg-white rounded-lg shadow">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="flex flex-col items-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-full w-48 h-48"
                  />
                  <div className="mt-3">
                    <h4 className="text-gray-800">{firstName +" " + lastName}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <label htmlFor="firstName" className="text-gray-800 mb-1 block font-bold">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="form-input mb-3 border border-gray-400 rounded p-2 w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName" className="text-gray-800 mb-1 block font-bold">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="form-input mb-3 border border-gray-400 rounded p-2 w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email" className="text-gray-800 mb-1 block font-bold">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-input mb-3 border border-gray-400 rounded p-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="phone" className="text-gray-800 mb-1 block font-bold">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input mb-3 border border-gray-400 rounded p-2 w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <div className="flex justify-center">
                  <button
                    className="btn btn-info bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
