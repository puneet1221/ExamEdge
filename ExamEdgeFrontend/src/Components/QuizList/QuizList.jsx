import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './QuizList.css'

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    if (loading) {
        return <div>Loading quizzes...</div>;
    }
    return (
        <div className=" quiz p-4">
            <h1 className="text-3xl font-bold mb-6">Quiz List</h1>
            <div className="space-y-4">
                {quizzes.length === 0 ? (
                    <p>No quizzes available at the moment.</p>
                ) : (
                    quizzes.map((quiz) => (
                        <div key={quiz.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h2 className="text-xl font-semibold">{quiz.title}</h2>
                            <p className="text-gray-600 mt-2">{quiz.description}</p>
                            <Link
                                to={`/quiz/${quiz.id}`}
                                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
                            >
                                View Details
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QuizList;
