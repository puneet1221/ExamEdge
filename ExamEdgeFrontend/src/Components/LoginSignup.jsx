import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const LoginSignup = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [signUpState, setSignUpState] = useState(1);


  // Validate email
  const validateEmail = async () => {
    //use an helper function to check the format of email
    //...

    try {
      const response = await axios.get('http://localhost:8080/user/findUser', {
        params: { email: email }, // Send email as a query parameter
      });

      if (response.data) {
        setErrorMsg('Email already exists!');
      } else {
        setErrorMsg(''); // Clear any previous error message
        toast.success("otp send successfully")
        setSignUpState(prev=>prev+1)
        sendOTP();

       
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setErrorMsg('Something went wrong! Please try again.');
    }
  };


  const sendOTP = () => {
  
    axios.post(`http://localhost:8080/forgot-password/send-mail/${email}`)
      .then((response) => {
       // Move to the next step 
      })
      .catch((error) => {
        setErrorMsg(error+"");
        console.error('Error sending OTP:', error);
        setErrorMsg('Something went wrong while sending the OTP. Please try again.');
      });
  };
  

 // Handle OTP verification
 const handleOTPverification = () => {
  axios
    .post(`http://localhost:8080/forgot-password/verify-otp/${otp}/${email}`)
    .then((verifyResponse) => {
      // Check if the server responded with a successful status
      if (verifyResponse.status === 200) {
        if (verifyResponse.data.status === 'success') {
          setSignUpState(prev => prev + 1); // Proceed to the next step
          setErrorMsg(''); // Clear any previous error messages
        } else {
          // If the server response indicates an error (e.g., invalid OTP)
          console.error('Server Error Message:', verifyResponse.data.message); // Log the server error message for debugging
          setErrorMsg(verifyResponse.data.message || 'Invalid OTP');
        }
      } else {
        // If the server status is not OK (200), log the response for debugging
        console.error('Error: Unexpected server status', verifyResponse.status);
        setErrorMsg('Something went wrong! Please try again.');
      }
    })
    .catch((error) => {
      // This block catches network issues or errors not caught by the .then() block
      console.error('Error during OTP verification:', error.response || error); // Log the complete error for debugging
      if (error.response) {
        // If the error is a response from the server, extract and display the message
        setErrorMsg(error.response.data.message || 'Something went wrong! Please try again.');
      } else {
        // If the error is due to a network issue, provide a generic error message
        setErrorMsg('Network error. Please check your internet connection and try again.');
      }
    });
};





  // Handle password creation
  const handlePassword = () => {
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    axios.post("http://localhost:8080/user/",{
    "username":email,
    "password":password
    })
    .then((response)=>{
     toast.success('sign-up successful')
     setEmail('')
      setSignUpState(1);
    })
    .catch((error)=>{
      console.error("meerro",error);
    })

  };

  // Go back to previous step
  const goBack = () => {
    if (signUpState > 1) {
      setSignUpState((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96 relative">
        {signUpState > 1 && (
          <button
            onClick={goBack}
            className="absolute top-4 left-4 text-blue-500 hover:text-blue-700 text-sm font-semibold flex items-center"
          >
            Back
          </button>
        )}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Sign Up!</h1>

        {/* Step 1: Validate Email */}
        {signUpState === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              Enter your Email
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
              required
            />
            <button
              onClick={validateEmail}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
            {errorMsg && <p className="text-red-500 text-sm mt-4 text-center">{errorMsg}</p>}
          </>
        )}

        {/* Step 2: Enter OTP */}
        {signUpState === 2 && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              Enter OTP
            </h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
              required
            />
            <button
              onClick={handleOTPverification}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Verify
            </button>
            {errorMsg && <p className="text-red-500 text-sm mt-4 text-center">{errorMsg}</p>}
          </>
        )}

        {/* Step 3: Create Password */}
        {signUpState === 3 && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              Create a Password
            </h2>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
              required
  
            />
            <button
              onClick={handlePassword}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Sign In
            </button>
            {errorMsg && <p className="text-red-500 text-sm mt-4 text-center">{errorMsg}</p>
            }
            
          </>
        )}
        
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default LoginSignup;
