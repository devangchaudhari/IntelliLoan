import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const PredictPage = () => {
  const location = useLocation();
  const { prediction } = location.state || {}; // Retrieve the prediction from state

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 animate-slide-in">
            Loan Prediction Result
          </h1>
          {prediction !== undefined ? (
            <h2
              className={`text-2xl font-semibold text-center p-4 rounded-lg animate-bounce-in ${
                prediction === 1
                  ? 'text-green-600 bg-green-100 border border-green-300'
                  : 'text-red-600 bg-red-100 border border-red-300'
              }`}
            >
              {prediction === 1
                ? '🎉 Congratulations! Your loan is likely to be approved.'
                : '😞 Sorry, your loan is likely to be rejected.'}
            </h2>
          ) : (
            <h2 className="text-2xl font-semibold text-center text-gray-700 animate-slide-in">
              No prediction available.
            </h2>
          )}
        </div>
      </div>
      <footer className="w-full bg-indigo-600 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center px-4">
          <p className="text-lg">&copy; 2024 Intelliloan. All rights reserved.</p>
          <p className="mt-2">Created by Devang Chaudhari, Shruti Mamidwar and Sanika Mali.</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="/home" className="text-white hover:underline">Home</a>
            <a href="/news" className="text-white hover:underline">News</a>
            <a href="/chart" className="text-white hover:underline">Chart</a>
            <a href="/profile" className="text-white hover:underline">Profile</a>
            <a href="/about" className="text-white hover:underline">About Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PredictPage;
