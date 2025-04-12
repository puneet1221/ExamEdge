import React from "react";

function PaymentError() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-2xl font-bold text-red-500 mt-8">
        Payment Error
      </h1>
      <p className="text-center text-gray-700 mt-3">
        An error occurred during the payment. Please try again.
      </p>
      <div className="flex justify-center mt-8">
        <a
          href="/"
          className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default PaymentError;

