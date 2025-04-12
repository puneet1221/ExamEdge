import React, { useEffect, useState } from "react";

function HomePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 500); // Animation starts after 500ms
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span
              className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } transform ease-out`}
            >
              Exams Made Simple,
            </span>
            <span
              className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } transform ease-out`}
            >
              Success Made Certain.
            </span>
          </h1>
          <p className="text-lg md:text-2xl mt-6 px-4 max-w-2xl mx-auto text-gray-200">
            Get ready to conquer your exams with the best resources, mock tests, and personalized guidance tailored to your success.
          </p>
          <button className="mt-8 bg-yellow-400 text-indigo-800 px-8 py-4 rounded-full shadow-lg hover:bg-yellow-500 hover:text-indigo-900 transition-all transform duration-200 ease-in-out">
            <a href="/login">Get Started now</a>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white" id="about_us">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 mt-4">
            We provide you with the right tools, mock exams, and expert guidance to help you succeed.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-indigo-600">Mock Tests</h3>
              <p className="text-gray-600 mt-4">Realistic practice exams to ensure you're ready for anything.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-indigo-600">Expert Guidance</h3>
              <p className="text-gray-600 mt-4">Get tips and tricks from experienced mentors to tackle even the toughest questions.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-indigo-600">Progress Tracking</h3>
              <p className="text-gray-600 mt-4">Track your growth and refine your skills with real-time performance insights.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Call-to-Action Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Ace Your Exams?</h2>
          <p className="text-lg mt-6 mb-8 text-gray-200">
            Join thousands of successful candidates today and start preparing for your future!
          </p>
          <a href='/signUp' className="bg-yellow-400 text-indigo-800 px-8 py-4 rounded-full shadow-lg hover:bg-yellow-500 hover:text-indigo-900 transition-all transform duration-200 ease-in-out">
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
