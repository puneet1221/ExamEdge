import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './../AppContext/AppContext';
import './../QuizCard/QuizCard.css'

const QuizCard = () => {
  const { selectedCategory, userDetails } = useAppContext();
  const navigate = useNavigate();

  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  // Fetch quizzes from the backend
  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/quiz/getByCategory/${selectedCategory}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userDetails.token}`,
          },
        }
      );
      setQuizList(response.data); // Set the quiz list received from the backend
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching quizzes.');
      setLoading(false);
    }
  };

  // Fetch quizzes when the component mounts or selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      fetchQuiz();
    }
  }, [selectedCategory]);

  // Hero Section if no category is selected
  if (!selectedCategory) {
    return (
      <div className="hero-section text-blue-600 p-15 text-center shadow-2xl h-screen flex flex-col justify-center items-center">

        {/* Welcome Text with Animation */}
        <h1 className="text-5xl font-extrabold tracking-wide text-blue-600 mb-6 drop-shadow-lg animate-welcome">
          Welcome {userDetails.fname.charAt(0).toUpperCase() + userDetails.fname.slice(1).toLowerCase()}
        </h1>

        <h1 className="text-2xl font-bold mb-6 tracking-wide text-green-500 drop-shadow-lg">
          Start Your Journey Today!
        </h1>

        <label className="text-yellow-400 font-semibold text-xl leading-relaxed">
          So why wait? Pick one of your favorite subjects from above <br />
          and let's get started!
        </label>
      </div>
    );

  }

  return (
    <div className="quiz-container p-6">
      {loading ? (
        <div className="text-center text-gray-500">Loading quizzes...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : quizList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizList.map((quiz) => (
            <div
              key={quiz.id}
              className="relative quiz-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Chart Icon positioned in the top-right corner */}
              <FaChartBar
                onClick={() => {
                  navigate(`quiz/${quiz.id}/leaderboard`, {
                    state: {
                      quiz: quiz,
                      token: userDetails.token,
                    },
                  });
                }}
                className="absolute top-4 right-4 text-red-500 w-6 h-6 hover:text-blue-500 cursor-pointer"
              />

              <h3 className="quiz-title text-2xl font-semibold text-gray-800 mb-2">
                {quiz.title}
              </h3>
              <p className="quiz-duration text-sm text-gray-500 mb-2">
                Duration: {quiz.duration} minutes
              </p>
              <p className="quiz-description text-gray-600 mb-4">{quiz.description}</p>
              <div className="quiz-details flex justify-between text-sm text-gray-500 mb-4">
                <span>Questions: {quiz.noOfQuestions}</span>
                <span>Marks: {quiz.marks}</span>
              </div>

              {quiz.isActive ? (
                <button
                  onClick={() => {
                    navigate(`/quizPage/${quiz.id}`, { state: { quiz } });
                  }}
                  className="start-button bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-200"
                >
                  Start Quiz
                </button>
              ) : (
                <button className="disabled-button bg-red-500 text-white font-semibold py-2 px-4 rounded-full cursor-not-allowed opacity-50">
                  Quiz Inactive
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No quizzes available for this category.</div>
      )}
    </div>
  );
};

export default QuizCard;
