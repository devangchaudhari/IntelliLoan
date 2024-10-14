import React from 'react';
import { motion } from 'framer-motion'; // Importing Framer Motion
import Navbar from './Navbar';

const LoanPage = () => {
  const loanTypes = [
    {
      title: 'Gold Loan',
      description: 'Get instant funds against your gold.',
      image: 'goldloan.png',
      link: '/approve'
    },
    {
      title: 'Car Loan',
      description: 'Finance your dream car with attractive rates.',
      image: 'carloan.jpeg',
      link: '/approve'
    },
    {
      title: 'Home Loan',
      description: 'Make your dream home a reality with our home loans.',
      image: 'homeloan.jpg',
      link: '/approve'
    },
    {
      title: 'Personal Loan',
      description: 'Get quick personal loans for any need.',
      image: 'personal.jpg',
      link: '/approve'
    },
    {
      title: 'Education Loan',
      description: 'Finance your education with our special rates.',
      image: 'educloan.jpeg',
      link: '/approve'
    },
    {
      title: 'Business Loan',
      description: 'Grow your business with flexible financing.',
      image: 'business.png',
      link: '/approve'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <Navbar />
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Loan Process</h1>
      
      {/* Steps Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Steps for Loan Prediction</h2>
        <ol className="list-decimal list-inside mt-4 space-y-2 text-gray-700">
          {['Fill out the loan application form.', 
            'Submit required documents for verification.', 
            'Get a loan eligibility assessment.', 
            'Receive your loan offer and accept it.', 
            'Funds are disbursed to your account.'].map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }} // Initial state for animation
              whileInView={{ opacity: 1, y: 0 }} // Animate when in view
              viewport={{ once: false }} // Reset animation on scroll back
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
            >
              {step}
            </motion.li>
          ))}
        </ol>
      </div>
      
      {/* Loan Type Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {loanTypes.map((loan, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105" 
            initial={{ opacity: 0, y: 50 }} // Initial state for animation
            whileInView={{ opacity: 1, y: 0 }} // Animate when in view
            viewport={{ once: false }} // Reset animation on scroll back
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
          >
            <img 
              src={loan.image} 
              alt={loan.title} 
              className="w-full h-32 object-cover rounded-t-lg" 
            />
            <h3 className="text-xl font-semibold mt-4">{loan.title}</h3>
            <p className="text-gray-600 mt-2 text-center">{loan.description}</p>
            <a 
              href={loan.link} 
              className="mt-auto w-full text-center bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition duration-300"
            >
              Explore
            </a>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full bg-indigo-600 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center px-4">
          <p className="text-lg">&copy; 2024 Intelliloan. All rights reserved.</p>
          <p className="mt-2">Created with ❤️ by Devang Chaudhari and the team.</p>
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

export default LoanPage;
