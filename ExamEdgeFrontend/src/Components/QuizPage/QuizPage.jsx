import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext/AppContext';
import QuestionComponent from './QuestionComponent';

const CommentSection = React.memo(({ question, handleCommentSubmit }) => {
  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-md">
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Write your comments here"
        rows="3"
        id={`comment-${question.id}`}
      ></textarea>
      <button
        onClick={() => {
          const commentText = document.getElementById(`comment-${question.id}`).value;
          if (commentText.trim()) {
            handleCommentSubmit(question.id, commentText);
            document.getElementById(`comment-${question.id}`).value = ''; // Clear the textarea
          }
        }}
        className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Post Comment
      </button>

      {/* Comments List */}
      <div
        className="mt-4 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2"
        style={{ maxHeight: '150px' }}
      >
        {question.commentsOnQuestion?.length ? (
          question.commentsOnQuestion.slice(0).reverse().map((comment) => (
            <div
              key={comment.id}
              className="py-4 px-6 border-t border-b border-gray-200 flex items-start space-x-4 hover:bg-gray-50 transition-all duration-300"
            >
              {/* Profile Image */}
              <img
                className="h-12 w-12 rounded-full object-cover border-2 border-indigo-600"
                src={`http://localhost:8080${comment.user?.profile}`}
                alt={`${comment.user?.fname}'s profile`}
              />

              <div className="flex-1">
                {/* Name and Comment */}
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-blue-500">
                    {comment.user?.fname} {comment.user?.lname}
                  </p>
                  <p className="text-sm text-gray-400">· {new Date(comment.createdAt).toISOString().split('T')[0]}</p>
                </div>
                <p className="mt-2 text-gray-700">{comment.commentText}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </div>
    </div>
  );
});

const QuizPage = () => {
  const { quizId } = useParams();
  const { userDetails } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const quizDetails = location.state?.quiz || {};
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showComments, setShowComments] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch questions from the server
  useEffect(() => {
    axios
      .get(`http://localhost:8080/question/${quizId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userDetails.token}`,
        },
      })
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        alert('An error occurred while fetching questions.');
        console.error(error);
      });

    let timer;
    if (!submitted) {
      timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [quizId, userDetails.token, submitted]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option.questionId]: option,
    }));
  };

  console.log(userDetails.id);
  const handleSubmit = () => {

    // Check if all questions are answered
    if (questions.every((question) => selectedOptions[question.id])) {

      //store the results in the db using post
      axios.post("http://localhost:8080/quiz/score", {
        userQuiz: {
          user_id: userDetails.id,
          quiz_id: quizId
        },
        marks: correctAnswersCount,
        time: timeElapsed
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userDetails.token}`
        }
      })
        .then((response) => {
          alert("successfully updated the leaderboard")
        })
        .catch((error) => {
          alert(error);
        })
      //add the user-->list of quizz attended wo quiz disable kardo
      setSubmitted(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Please answer all questions before submitting.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  // Fetch comments for a specific question
  const fetchComments = useCallback((questionId) => {
    axios
      .get(`http://localhost:8080/question/comments/${questionId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userDetails.token}`,
        },
      })
      .then((response) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === questionId
              ? { ...question, commentsOnQuestion: response.data }
              : question
          )
        );
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [userDetails.token]);

  const handleCommentSubmit = (questionId, commentText) => {
    axios
      .post(
        `http://localhost:8080/question/${questionId}/comments`,
        {
          userId: userDetails.id,
          commentText: commentText,
          questionId: questionId,
          createdAt: new Date().toISOString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userDetails.token}`,
          },
        }
      )
      .then(() => {
        fetchComments(questionId);
      })
      .catch((error) => {
        console.error('Error posting comment:', error);
      });
  };

  const toggleCommentsVisibility = (questionId) => {
    setShowComments((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Calculate the number of correct answers
  const correctAnswersCount = questions.reduce((count, question) => {
    const selectedOption = selectedOptions[question.id];
    if (selectedOption && selectedOption.isCorrect) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full space-y-8">

        <button
          onClick={() => navigate(-1)}
          className="px-8 ml-auto py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          <FaArrowLeft />
        </button>

        {/* Quiz Details */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-900">{quizDetails.title}</h1>
          <p className="text-lg text-gray-600">{quizDetails.description}</p>
          <p className="text-lg text-gray-600 mt-2">
            <span className="font-semibold">Marks:</span> {quizDetails.marks} |
            <span className="font-semibold"> Duration:</span> {quizDetails.duration} minutes
          </p>
          <p className="text-lg text-gray-600 mt-2">
            <span className="font-semibold">Time Elapsed:</span> {formatTime(timeElapsed)}
          </p>
        </div>

        {/* Questions and Comment Section */}
        <div>
          {questions.map((question) => (
            <div key={question.id} className="space-y-6 border-b border-gray-300 py-6 px-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between space-x-auto">
                <p className="text-lg font-semibold text-gray-800">{question.content}</p>

                <button
                  onClick={() => alert("Reported successfully")}
                  className="flex items-center text-yellow-500 hover:text-yellow-600 font-small space-x-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 p-2 rounded-lg hover:bg-yellow-100 transition duration-200"
                >
                  <FaTriangleExclamation className="text-sm" />
                  <span>Report</span>
                </button>
              </div>

              <QuestionComponent
                questionData={question}
                selectedOption={selectedOptions[question.id]}
                handleOptionSelect={handleOptionSelect}
                submitted={submitted}
              />

              {submitted && (
                <>
                  {/* Toggle Button for Comments */}
                  <button
                    onClick={() => toggleCommentsVisibility(question.id)}
                    className="px-4 py-2 text-blue-800 font-semibold hover:bg-blue-100 rounded-lg mt-4 transition duration-200"
                  >
                    {showComments[question.id] ? 'Close Discussion' : 'Discuss...'}
                  </button>

                  {/* Comments Section */}
                  {showComments[question.id] && (
                    <CommentSection
                      question={question}
                      handleCommentSubmit={handleCommentSubmit}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-center mt-4 text-sm font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        {!submitted && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
            >
              Submit Quiz
            </button>
          </div>
        )}



      </div>
    </div>
  );
};

export default QuizPage;
