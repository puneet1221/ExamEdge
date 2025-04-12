import { useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Spinner for loading
import axios from "axios"; // Axios for HTTP requests
import { useAppContext } from "../AppContext/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const SendNotification = () => {
  const { userDetails } = useAppContext();
  const [message, setMessage] = useState({
    text: "",
    adminUserName: userDetails.username || "admin",
    timestamp: Date.now(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const handleSendNotification = async () => {
    if (!message.text.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    if (!userDetails || !userDetails.token) {
      toast.error("Authentication failed. Please log in again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/sendNotifications",
        {
          text: message.text,
          adminUserName: message.adminUserName,
          timestamp: Date.now(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userDetails.token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Notification sent successfully!");
        setMessage({ ...message, text: "" });
        setMessageLength(0);
      } else {
        toast.error("Failed to send notification. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Send Notification</h2>
        <textarea
          value={message.text}
          onChange={(e) => {
            setMessage({ ...message, text: e.target.value });
            setMessageLength(e.target.value.length);
          }}
          className="w-full h-32 p-4 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type your notification..."
          maxLength={500}
        />
        <p className="text-sm text-gray-600 text-right">
          {500 - messageLength} characters remaining
        </p>
        <button
          onClick={handleSendNotification}
          disabled={isLoading}
          className={`w-full py-3 mt-4 rounded-lg text-white font-semibold flex items-center justify-center ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading && <FaSpinner className="animate-spin mr-2" />}
          {isLoading ? "Sending..." : "Send Notification"}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SendNotification;
