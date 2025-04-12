import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This goes back to the previous page
  };

  return (
    <button
      onClick={handleGoBack}
      className=" text-white bg-gray-800 p hover:bg-gray-700 px-4 py-2 rounded-lg"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
  );
};

export default BackButton;
