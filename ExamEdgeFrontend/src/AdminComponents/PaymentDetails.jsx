import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../Components/AppContext/AppContext";

function PaymentDetails() {
  // State to store payment details
  const { userDetails } = useAppContext();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(""); // For error handling

  // Fetch payment details when the component mounts
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/users-payment-details", {
          headers: {
            "Authorization": `Bearer ${userDetails.token}`,
            "Content-Type": "application/json",
          },
        });
        setPayments(response.data);  // Set fetched data in state
        setLoading(false);  // Hide the loading indicator
      } catch (err) {
        setError("Error fetching payment details");
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);  // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div className="text-center text-lg text-blue-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 ">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6">Payment Details</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-indigo-600 text-white">
            <tr className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
              <th className="px-6 py-3 text-left">Transaction ID</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Currency</th>
              <th className="px-6 py-3 text-left">Method</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">First Name</th>
              <th className="px-6 py-3 text-left">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.transactionId} className="border-b hover:bg-indigo-50">
                <td className="px-6 py-4">{payment.transactionId}</td>
                <td className="px-6 py-4">{payment.status}</td>
                <td className="px-6 py-4">${payment.amount}</td>
                <td className="px-6 py-4">{payment.currency}</td>
                <td className="px-6 py-4">{payment.method}</td>
                <td className="px-6 py-4">{payment.email}</td>
                <td className="px-6 py-4">{payment.fname}</td>
                <td className="px-6 py-4">{payment.lname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentDetails;
