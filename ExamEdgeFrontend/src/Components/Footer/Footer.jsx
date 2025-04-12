import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-r from-blue-700  to-purple-700 text-white py-16 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-4xl font-semibold tracking-wide mb-6">
            <Link to="/" className="text-white hover:text-yellow-500 transition-colors duration-300">
              <span className="text-2xl font-bold text-yellow-400">Exam  Edge</span>
            </Link>
          </div>
          <p className="text-center md:text-left text-sm text-gray-300 mb-6">
            Your go-to platform for all your exam-related needs. Stay updated with the latest exams, results, and more.
          </p>
        </div>

        {/* Column 2: Contact Information */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Contact Information</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center">
              <span className="mr-2">📞</span> +1 (234) 567-890
            </li>
            <li className="flex items-center">
              <span className="mr-2">📧</span> support@ExamEdge.com
            </li>
            <li>
              <Link to="#contact" className="hover:text-yellow-500 transition-colors duration-300">
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Follow Us</h3>
          <div className="flex space-x-6 text-3xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-yellow-500 transition-colors duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-yellow-500 transition-colors duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-yellow-500 transition-colors duration-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="hover:text-yellow-500 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-12 border-t border-gray-600 pt-6 text-center text-sm text-gray-300">
        <p>&copy; {new Date().getFullYear()} Exam Edge. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
