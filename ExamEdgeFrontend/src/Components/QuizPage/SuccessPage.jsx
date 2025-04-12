import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const { score, totalQuestions, timeTaken } = location.state || {};

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-pink-300 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-extrabold text-green-600 mb-6">
          Quiz Completed!
        </h1>
        <div className="text-lg text-gray-800 mb-4">
          <p className="font-semibold text-xl">Your Results</p>
          <p className="mt-2">You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong></p>
          <p className="mt-2">Time Taken: <strong>{timeTaken}</strong></p>
        </div>
        <Link to="/">
          <button className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg text-xl font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
