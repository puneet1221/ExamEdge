import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext/AppContext";

function Navbar() {
  const { loginState, logout, setMenuActive, userDetails } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open,setOpen]=useState(false)

  const fetchNotifications = async (event) => {
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/user/getNotifications", {
        params: {
          page: page,
          size: 5,
        },
      });
      setNotifications(response.data.content.map(notification => notification.text));
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Error fetching notifications. Please try again later.");
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(prev => !prev);
  setOpen(true)
  }

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

 window.onclick=()=>{
  setShowNotifications(false)
 }
  const toggleMenu = () => setMenuActive(prev => !prev);

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 py-3 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold mx-5">
          <Link to="/" className="hover:text-yellow-300 transition duration-200 italic">ExamEdge</Link>
        </div>

        {/* Hamburger Icon visible on all screen sizes */}
        {loginState && (
          <FaBars
            className="mx-10 text-white text-3xl cursor-pointer hover:text-yellow-300 transition duration-200"
            onClick={toggleMenu}
          />
        )}

        <div className="flex-1 flex justify-center">
          <ul className="flex items-center space-x-6 text-white font-medium">
            {loginState ? (
              <>
                {/* Additional Links for Logged-In Users */}
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-yellow-300 transition duration-200">Home</Link>
                <a href="#about_us" className="hover:text-yellow-300 transition duration-200">About Us</a>
                <a href="#contact" className="hover:text-yellow-300 transition duration-200">Contact Us</a>
              </>
            )}
          </ul>
        </div>

        <div className="relative flex items-center space-x-4">
          {loginState && (
            <>
              <button
                title="Notifications"
                onClick={toggleNotifications}
                className="text-white text-xl hover:text-yellow-300 transition duration-200 relative"
              >
                <FaBell />
                {!open && notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-gray-800 font-semibold text-lg">Notifications</h4>
                    <button
                      onClick={fetchNotifications}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Refresh
                    </button>
                  </div>

                  {/* Error and Loading States */}
                  {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                  ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                  ) : (
                    <ul className="text-gray-600 space-y-2 max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((note, index) => (
                          <li
                            key={index}
                            className="p-2 border-b last:border-b-0 hover:bg-gray-100 rounded-md"
                          >
                            {note}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400">No notifications</li>
                      )}
                    </ul>
                  )}

                  {/* Pagination Controls */}
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={handlePreviousPage}
                      disabled={page === 0}
                      className="text-sm text-blue-500 hover:underline disabled:text-gray-400"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={page === totalPages - 1}
                      className="text-sm text-blue-500 hover:underline disabled:text-gray-400"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {loginState ? (
            <>
              <Link
                to='/'
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg transition duration-200"
              >
                Logout
              </Link>
              <Link to='/profile'><img
                className="rounded-full border-2 border-white w-10 h-10 object-cover"
                src={`http://localhost:8080${userDetails.profile}`}
                alt="Profile"
              /></Link>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-800 px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
