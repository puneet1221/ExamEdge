import React, { useState } from "react";
import { useAppContext } from "./../AppContext/AppContext.jsx";

function PaypalIntegration() {
  const [formData, setFormData] = useState({
    method: "Paypal",
    amount: 10.0,
    currency: "USD",
    description: "",
  });
  const { userDetails } = useAppContext();
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      method: formData.method,
      amount: formData.amount,
      currency: formData.currency,
      description: formData.description,
    };

    try {
      const response = await fetch("http://localhost:8080/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userDetails.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Payment creation failed");
      }

      const result = await response.json();
      if (result && result.approvalUrl) {
        setPaymentUrl(result);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 via-indigo-500 to-pink-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Support Us
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="method" className="text-lg text-gray-700 font-semibold mb-2 block">
              Payment Method
            </label>
            <input
              id="method"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              name="method"
              value={formData.method}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="amount" className="text-lg text-gray-700 font-semibold mb-2 block">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="currency" className="text-lg text-gray-700 font-semibold mb-2 block">
              Currency
            </label>
            <select
              id="currency"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
             
            </select>
          </div>
          <div>
            <label htmlFor="description" className="text-lg text-gray-700 font-semibold mb-2 block">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-6 text-white font-semibold bg-indigo-600 rounded-lg transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed"}
            </button>
          </div>
        </form>

        {paymentUrl && (
          <div className="mt-6 text-center">
            <a
              href={paymentUrl.approvalUrl}
              className="inline-block px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
            >
              Complete Payment
            </a>
          </div>
        )}

        {error && (
          <div className="mt-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaypalIntegration;
