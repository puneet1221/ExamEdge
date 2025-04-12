import React, { useEffect } from "react";
import { useAppContext } from "./AppContext/AppContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for the back button

const ProfileComponent = () => {
  const { userDetails } = useAppContext();
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Any side effects if needed
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3  absolute left-20 top-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md text-xl font-semibold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 mb-8"
      >
        <FaArrowLeft />
      </button>

      {/* Profile Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center rounded-b-3xl shadow-xl">
        <div className="relative">
          <img
            className="w-36 h-36 mx-auto rounded-full border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300"
            src={userDetails.profile && `http://localhost:8080${userDetails.profile}`}
            alt="Profile pic"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mt-6">{userDetails.fname + " " + userDetails.lname}</h1>
        <p className="text-lg text-blue-200 mt-2">{userDetails.role?.role_name}</p>
      </div>

      {/* Personal Info Section */}
      <div className="bg-white w-full max-w-4xl mt-8 p-8 shadow-lg rounded-lg border-t-8 border-indigo-600">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Personal Info</h2>
        <ul className="text-gray-700 text-lg space-y-4">
          <li>
            <span className="font-medium text-gray-800">Email:</span> {userDetails.username}
          </li>
          <li>
            <span className="font-medium text-gray-800">Phone:</span> {userDetails.phone}
          </li>
          <li>
            <span className="font-medium text-gray-800">Role:</span> {userDetails.role?.role_name}
          </li>
        </ul>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white w-full max-w-4xl mt-8 p-8 shadow-lg rounded-lg border-t-8 border-indigo-600">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Additional Information</h2>
        <ul className="text-gray-700 text-lg space-y-4">
          <li>
            <span className="font-medium text-gray-800">Bio:</span> {userDetails.bio || "No bio available"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileComponent;
