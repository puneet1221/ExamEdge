import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { useAppContext } from '../../AppContext/AppContext';

const UpdateProfile = () => {
    const { userDetails, setUserDetails } = useAppContext();
    const [formData, setFormData] = useState({
        username: userDetails?.username || '',
        fname: '',
        lname: '',
        phone: '',
        profile: null,
        isProfileUpdated: false,
    });
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('');

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile: e.target.files[0], // Store the selected file
        });
    };

    // Submit the form
    const updateProfile = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('username', formData.username);
        data.append('fname', formData.fname);
        data.append('lname', formData.lname);
        data.append('phone', formData.phone);
        data.append('isProfileUpdated', true);

        if (formData.profile) {
            data.append('profile', formData.profile);
        }

        axios
            .post('http://localhost:8080/user/updateProfile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': `${userDetails.token}`
                },
            })
            .then((response) => {
                toast.success("Profile updated successfully!");
                setUserDetails(response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMsg('Error updating profile. Please try again.');
                toast.error('Something went wrong. Please try again.');
            });
    };

    return (
        <>
            {!userDetails.isProfileUpdated && (
                <div className="text-center mb-8">
                    <h1 className=" relative  top-10  text-4xl font-bold text-purple-500 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-transparent bg-clip-text">
                        One Last Step!!!
                    </h1>
                </div>
            )}

            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-100 via-indigo-100 to-purple-200 p-6">
                <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">Update Your Profile</h2>

                    <form onSubmit={updateProfile} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                            <input
                                type="text"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Enter your first name"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                            <input
                                type="text"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Enter your last name"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Profile Picture */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Profile Picture</label>
                            <input
                                required
                                type="file"
                                name="profile"
                                onChange={handleFileChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        {/* Error Message */}
                        {errorMsg && (
                            <p className="text-red-500 text-center">{errorMsg}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default UpdateProfile;
