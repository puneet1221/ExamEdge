import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useAppContext } from './../Components/AppContext/AppContext.jsx';
const QuizForm = () => {
  const { userDetails } = useAppContext();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    marks: '',
    noOfQuestions: '',
    isActive: true,
    duration: 0,
    categoryId: '',
    questions: [],
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch categories from backend
  useEffect(() => {
    axios
      .get('http://localhost:8080/category/getChildren') // Update with the correct API endpoint
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Handle input changes for quiz info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle question input changes
  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Handle choices input changes
  const handleChoiceChange = (questionIndex, choiceIndex, e) => {
    const { name, value, checked } = e.target;

    // Clone the questions array to update state immutably
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[choiceIndex] = {
      ...updatedQuestions[questionIndex].options[choiceIndex],
      [name]: name === 'isCorrect' ? checked : value,
    };

    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  // Add a new question
  const addQuestion = () => {
    const newQuestion = {
      content: '',
      options: [{ text: '', isCorrect: false }],
    };
    setQuizData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, newQuestion],
    }));
  };

  // Add a new choice for a specific question
  const addChoice = (questionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options.push({ text: '', isCorrect: false });
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Delete a question by index
  const deleteQuestion = (index) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Delete an option from a specific question by index
  const deleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Handle quiz submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quizData);

    axios
      .post(`http://localhost:8080/quiz/createQuiz?id=${quizData.categoryId}`, quizData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((response) => {
        setMessage('Quiz created successfully!');
      })
      .catch((error) => {
        setMessage('Error creating quiz.');
        console.error(error);
      });
    setQuizData({
      title: '',
      description: '',
      marks: '',
      noOfQuestions: '',
      isActive: true,
      duration: 0,
      categoryId: '',
      questions: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Create a New Quiz</h1>

        {message && (
          <p
            className={`mb-4 p-2 text-white ${message === 'Quiz created successfully!'
                ? 'bg-green-600'
                : 'bg-red-600'
              } rounded`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Quiz Title</label>
              <input
                type="text"
                name="title"
                value={quizData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter quiz title"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={quizData.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter a brief description"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">Marks</label>
                <input
                  type="text"
                  name="marks"
                  value={quizData.marks}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Marks per question"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Duration (Minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={quizData.duration}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Total quiz duration"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Number of Questions</label>
              <input
                type="number"
                name="noOfQuestions"
                value={quizData.noOfQuestions}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Total number of questions"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Category</label>
              <select
                name="categoryId"
                value={quizData.categoryId}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Questions</h2>

            {quizData.questions.map((question, qIndex) => (
              <div key={qIndex} className="p-6 border-2 border-gray-300 rounded-lg shadow-sm space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700">Question Content</label>
                  <textarea
                    name="content"
                    value={question.content}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter question content"
                    required
                  />
                </div>

                {/* Choices Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-gray-700">Choices</h3>
                  {question.options.map((choice, cIndex) => (
                    <div key={cIndex} className="flex items-center space-x-4">
                      <input
                        type="text"
                        name="text"
                        value={choice.text}
                        onChange={(e) => handleChoiceChange(qIndex, cIndex, e)}
                        className="w-3/4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Choice ${cIndex + 1} text`}
                        required
                      />
                      <input
                        type="checkbox"
                        name="isCorrect"
                        checked={choice.isCorrect}
                        onChange={(e) => handleChoiceChange(qIndex, cIndex, e)}
                        className="h-6 w-6 focus:ring-2 focus:ring-indigo-500"
                      />
                      <FaTrash
                        type="button"
                        onClick={() => deleteOption(qIndex, cIndex)}
                        className="ml-2 text-xl  text-red-600   rounded hover:text-red-800"
                      >
                        Delete
                      </FaTrash>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addChoice(qIndex)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Choice
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => deleteQuestion(qIndex)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Question
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
