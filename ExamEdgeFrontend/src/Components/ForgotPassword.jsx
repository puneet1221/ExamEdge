import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [resetPasswordState, setResetPasswordState] = useState(1);
    const navigate = useNavigate();

    const validateEmail = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/findUser', {
                params: { email: email },
            });

            if (!response.data) {
                setErrorMsg('Email doesn\'t exist!');
            } else {
                setErrorMsg('');
                toast.success('OTP sent successfully!');
                sendOTP();
                setResetPasswordState((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Error checking email:', error);
            setErrorMsg('Something went wrong! Please try again.');
        }
    };

    const sendOTP = () => {
        axios.post(`http://localhost:8080/forgot-password/send-mail/${email}`)
            .then((response) => {
                // Optionally handle OTP sent successfully
            })
            .catch((error) => {
                setErrorMsg('Something went wrong while sending the OTP. Please try again.');
                console.error('Error sending OTP:', error);
            });
    };

    const handleOTPverification = () => {
        axios.post(`http://localhost:8080/forgot-password/verify-otp/${otp}/${email}`)
            .then((verifyResponse) => {
                if (verifyResponse.status === 200 && verifyResponse.data.status === 'success') {
                    setResetPasswordState(prev => prev + 1);
                    setErrorMsg('');
                } else {
                    setErrorMsg(verifyResponse.data.message || 'Invalid OTP');
                }
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMsg(error.response.data.message || 'Something went wrong! Please try again.');
                } else {
                    setErrorMsg('Network error. Please check your internet connection.');
                }
            });
    };

    const handlePassword = () => {
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        axios.put("http://localhost:8080/user/updatePassword", {
            "username": email,
            "password": password
        })
        .then((response) => {
            toast.success("password updated successfully")
           
            setTimeout(()=>{
                navigate('/login')
            },3000)
        })
        .catch((error) => {
            console.error('Error updating password:', error);
        });
    };

    const goBack = () => {
        if (resetPasswordState > 1) {
            setResetPasswordState((prev) => prev - 1);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300">
            <div className="bg-white p-10 rounded-xl shadow-lg w-96 relative">
                {resetPasswordState > 1 && (
                    <button
                        onClick={goBack}
                        className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center"
                    >
                        Back
                    </button>
                )}
                <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Reset Password</h1>

                {/* Step 1: Validate Email */}
                {resetPasswordState === 1 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Enter your Email</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            onClick={validateEmail}
                            className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                        >
                            Send OTP
                        </button>
                        {errorMsg && <p className="text-red-600 text-sm mt-4 text-center">{errorMsg}</p>}
                    </>
                )}

                {/* Step 2: Enter OTP */}
                {resetPasswordState === 2 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Enter OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            onClick={handleOTPverification}
                            className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                        >
                            Verify
                        </button>
                        {errorMsg && <p className="text-red-600 text-sm mt-4 text-center">{errorMsg}</p>}
                    </>
                )}

                {/* Step 3: Create Password */}
                {resetPasswordState === 3 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create a Password</h2>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            onClick={handlePassword}
                            className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                        >
                            Reset Password
                        </button>
                        {errorMsg && <p className="text-red-600 text-sm mt-4 text-center">{errorMsg}</p>}
                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
