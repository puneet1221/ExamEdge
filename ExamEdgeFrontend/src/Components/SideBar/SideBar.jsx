import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext/AppContext";
import './SideBar.css';
import { FaDonate, FaPen, FaUser } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

const Sidebar = () => {
    const { userDetails, logout, setMenuActive } = useAppContext();
    const role = userDetails.role?.role_name || "";

    return (
        <div className="sidebar fixed top-0 left-0 h-full w-[20%] bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col p-6 overflow-y-auto shadow-2xl z-40">
            {/* Close Sidebar Button */}
            <div className="text-right mt-12">
                <button
                    onClick={() => setMenuActive((active) => !active)}
                    className="text-white text-3xl font-bold hover:text-red-400 transition duration-300"
                    aria-label="Close Sidebar"
                >
                    ×
                </button>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center py-6 border-b border-blue-700 mb-6">
                <img
                    src={userDetails.profile ? `http://localhost:8080${userDetails.profile}` : ""}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-xl"
                />
                <h1 className="text-2xl font-semibold mt-4">{userDetails?.fname || "User"} {userDetails?.lname || ""}</h1>
                <p className="text-sm mt-2 text-yellow-400">{role}</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4">
                <Link
                    to='/updateProfile'
                    className="w-full text-left text-lg font-semibold bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                    Update Profile
                    <span><FaUser className="inline mx-4"></FaUser></span>
                </Link>

                <Link to='/exam_edge/review' className="w-full text-left text-lg font-semibold bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                     Review us <span><FaPen className="inline mx-5 ml-10"></FaPen></span>
                </Link>

                <Link to='/paypal/payment' className="w-full text-left text-lg bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    Donate Us! <span><FaDonate className="inline relative ml-10 mx-5"></FaDonate></span>
                </Link>

                <button
                    onClick={logout}
                    className="w-full text-left text-lg font-semibold bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
