import axios from 'axios';
import React, { useState } from 'react';
import { useAppContext } from './AppContext/AppContext';

const ReviewPage = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const { userDetails } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0 && review.trim() !== '') {
            axios.post(`http://localhost:8080/user/review?username=${userDetails.email}`, {
                review: review,
                rating: rating
            })
                .then(response => {
                    console.log(response.data)
                    setSubmitted(true)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h1>

            {submitted ? (
                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-green-800">Thank you for your feedback!</h2>
                    <p className="text-gray-700">Your review has been submitted successfully.</p>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                    <div className="flex flex-col">
                        <label htmlFor="rating" className="text-gray-700 font-semibold mb-2">
                            Rating (1 to 5):
                        </label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="0">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((rate) => (
                                <option key={rate} value={rate}>
                                    {rate}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="review" className="text-gray-700 font-semibold mb-2">
                            Your Review:
                        </label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="border border-gray-300 rounded p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your thoughts here..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit Review
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewPage;
