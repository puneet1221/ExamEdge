import React from 'react';
import { useAppContext } from '../../Components/AppContext/AppContext';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  const { logout } = useAppContext();

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-indigo-600  to-purple-600 p-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          Exam Edge
        </Link>
        <ul className="flex space-x-8 ml-10">
          <li>
            <Link
              to="/"
              className="text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 hover:shadow-lg"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard"
              className="text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 hover:shadow-lg"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 hover:shadow-lg"
            >
              Profile
            </Link>
          </li>
        </ul>
        <Link
          to="/"
          onClick={logout}
          className="ml-auto text-white font-bold px-4 py-2 rounded-md bg-red-600 "
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavBar;
