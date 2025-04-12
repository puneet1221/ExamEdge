
//payment success page
import React from "react";

function PaypalSuccess() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-2xl font-bold mt-8">Paypal Success</h1>
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


export default PaypalSuccess;