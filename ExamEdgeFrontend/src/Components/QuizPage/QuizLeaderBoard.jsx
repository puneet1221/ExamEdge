import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router';

const getRankIcon = (rank) => {
    switch (rank) {
        case 1:
            return '🥇'; // Gold Medal
        case 2:
            return '🥈'; // Silver Medal
        case 3:
            return '🥉'; // Bronze Medal
        default:
            return rank;  // Show rank number for others
    }
};

// Static Data
const examName = "Math Final Exam";
const currentUser = { id: 3 }; // Example current user ID


const Leaderboard = () => {
    
    const [data,setData]=useState([]);
    const navigate=useNavigate();
       
    
    const { state,token } = useLocation();
    const prevData=useLocation();
    const {quizId}=useParams();
    console.log(prevData);
    useEffect(()=>{
        axios.get(`http://localhost:8080/quiz/result/${quizId}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${state.token}`
            }
        })
        .then(response=>{
            console.log(response.data);
            setData(response.data);
        })
        .catch(error=>{
            alert("failed try again later");
        })
    },[quizId])

    return (
        <div className="max-w-5xl mx-auto mt-12 p-8  text-gray-800 rounded-xl shadow-lg">
            {/* Header Section */}
            <button
            onClick={() => navigate('/')}
            className="px-8 ml-auto py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            <FaArrowLeft/>
          </button>
            <h2 className="text-4xl font-bold text-center mb-6 text-blue-500">{state.quiz.title}</h2>
            <p className="text-lg text-center mb-4">{state.quiz.description}</p>
            <div className="text-center mb-6 text-green-400">
                <span className="font-semibold">Marks: </span>{state.quiz.marks} &nbsp;|&nbsp;
                <span className="font-semibold">Duration: </span>{state.quiz.duration} min
            </div>

            {/* Table Section */}
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
               <p className='text-red-600'>*only first attempt is considered in leaderboard caculation</p>
                <table className="w-full text-left border-collapse">
                    <thead className=" bg-gradient-to-r from-indigo-800 to-blue-600 text-white">
                        <tr>
                            <th className="p-5 text-lg font-semibold">Rank</th>
                            <th className="p-5 text-lg font-semibold">Name</th>
                            <th className="p-5 text-lg font-semibold">Score</th>
                            <th className="p-5 text-lg font-semibold">Time taken (in mins)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => {
                            const rank = index + 1;
                            const isCurrentUser = user.id === currentUser.id;

                            return (
                                <tr
                                    key={rank}
                                    className={`${
                                        isCurrentUser ? 'bg-teal-100' : 'bg-white'
                                    } border-b hover:bg-gray-50 transition-all`}
                                >
                                    <td className="p-5 text-xl font-bold text-gray-800">
                                        {getRankIcon(rank)}
                                    </td>
                                    <td className="p-5 text-lg text-gray-700 font-medium">{user[0]?user[0]:""} {" "+user[1]?user[1]:"unknown"}</td>
                                    <td className="p-5 text-lg text-gray-700">{user[3]}</td>
                                    <td className="p-5 text-lg text-gray-700">{(user[4]/60).toFixed(4)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
