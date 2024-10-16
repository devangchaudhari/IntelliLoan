import React, { useState } from 'react';
import Navbar from './Navbar';
import 'tailwindcss/tailwind.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const HomePage = () => {
  // Initialize AOS for scroll animations
  React.useEffect(() => {
    AOS.init({ duration: 1000 }); // Animation duration is set to 1000ms
  }, []);

  // Loan Calculator state
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interestRate) / 100 / 12;
    const calculatedPayments = parseFloat(term) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    setMonthlyPayment(monthly.toFixed(2));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-20 sm:mt-24" data-aos="fade-up">
  {/* Logo Image */}
  <img 
    src="loan_logo.png" // Replace with your logo path
    alt="Intelliloan Logo"
    className="w-36 sm:w-48 mb-4 transition-transform duration-300 transform hover:scale-110" // Responsive logo size
  />
  
  <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600">Welcome to Intelliloan</h1>
  <p className="text-lg sm:text-xl text-gray-600 mt-4">Your reliable partner for financial solutions</p>
  <div className="mt-6">
    <a href="/loan" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
      Get Started
    </a>
  </div>
</div>

      
      {/* Featured Loan Types Section */}
      <div className="mt-16 w-full max-w-6xl px-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Our Loan Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" data-aos="zoom-in">
            <img src="goldloan.png" alt="Gold Loan" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-indigo-600">Gold Loan</h3>
              <p className="text-gray-600 mt-2">Instant funds against your gold. Flexible repayment options.</p>
              <a href="/approve" className="text-indigo-600 hover:underline mt-4 block">Learn More</a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" data-aos="zoom-in">
            <img src="carloan.jpeg" alt="Car Loan" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-indigo-600">Car Loan</h3>
              <p className="text-gray-600 mt-2">Finance your dream car with affordable interest rates.</p>
              <a href="/approve" className="text-indigo-600 hover:underline mt-4 block">Learn More</a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" data-aos="zoom-in">
            <img src="homeloan.jpg" alt="Home Loan" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-indigo-600">Home Loan</h3>
              <p className="text-gray-600 mt-2">Make your dream home a reality with our home loan options.</p>
              <a href="/approve" className="text-indigo-600 hover:underline mt-4 block">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="mt-16 w-full max-w-6xl px-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Our Vision</h2>
        <p className="text-gray-600 text-center">
          At Intelliloan, our vision is to empower individuals with transparent, secure, and accessible financial solutions. 
          We strive to make financial services simpler and more efficient for everyone.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 w-full max-w-6xl px-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Why Choose Intelliloan?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center" data-aos="flip-left">
            <h3 className="text-2xl font-semibold text-indigo-600">Fast Approvals</h3>
            <p className="text-gray-600 mt-4">We ensure quick and hassle-free loan approvals to help you in your time of need.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center" data-aos="flip-left">
            <h3 className="text-2xl font-semibold text-indigo-600">Flexible Repayments</h3>
            <p className="text-gray-600 mt-4">Choose from a variety of repayment plans that fit your financial situation.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center" data-aos="flip-left">
            <h3 className="text-2xl font-semibold text-indigo-600">Secure & Transparent</h3>
            <p className="text-gray-600 mt-4">Your data is safe with us, and we provide full transparency in all our loan processes.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16 w-full max-w-6xl px-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs text-center" data-aos="zoom-in">
            <p className="text-lg text-gray-600">"Intelliloan made getting my home loan so simple and fast. Highly recommended!"</p>
            <h4 className="mt-4 text-indigo-600 font-semibold">Dhiraj Rathod</h4>
            <p className="text-gray-500">Home Loan Customer</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs text-center" data-aos="zoom-in">
            <p className="text-lg text-gray-600">"The car loan process was smooth, and I got the best interest rates!"</p>
            <h4 className="mt-4 text-indigo-600 font-semibold">Vedant Sonar</h4>
            <p className="text-gray-500">Car Loan Customer</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs text-center" data-aos="zoom-in">
            <p className="text-lg text-gray-600">"Great service for a quick gold loan. Excellent customer support!"</p>
            <h4 className="mt-4 text-indigo-600 font-semibold">Prathamesh Bhosle</h4>
            <p className="text-gray-500">Gold Loan Customer</p>
          </div>
        </div>
      </div>

        {/* Available Everywhere You Go Section */}
        <div className="mt-16 w-full max-w-6xl px-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Available Everywhere You Go</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center">
          {/* Laptop */}
          <div className="relative" data-aos="fade-up">
            <img 
              src="laptop.png" // Path to your laptop image
              alt="Laptop Interface"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <p className="text-center mt-2 text-indigo-600 font-semibold">Laptop</p>
          </div>
          {/* Tablet */}
          <div className="relative" data-aos="fade-up">
            <img 
              src="tv.png" // Path to your tablet image
              alt="Tablet Interface"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <p className="text-center mt-2 text-indigo-600 font-semibold">Television</p>
          </div>
          {/* iPad */}
          <div className="relative" data-aos="fade-up">
            <img 
              src="ipad.png" // Path to your iPad image
              alt="iPad Interface"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <p className="text-center mt-2 text-indigo-600 font-semibold">iPad</p>
          </div>
          {/* Mobile */}
          <div className="relative" data-aos="fade-up">
            <img 
              src="mobile.png" // Path to your mobile image
              alt="Mobile Interface"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <p className="text-center mt-2 text-indigo-600 font-semibold">Mobile</p>
          </div>
        </div>
      </div>

      {/* Loan Calculator Section */}
      <div className="mt-16 w-full max-w-xs sm:max-w-md px-4 sm:px-6 mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6" data-aos="fade-up">
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Loan Calculator</h2>
  <div className="flex flex-col space-y-3">
    <label className="text-gray-700" htmlFor="loanAmount">
      Loan Amount (₹)
    </label>
    <input
      type="number"
      id="loanAmount"
      placeholder="e.g., 50000"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
    />
    
    <label className="text-gray-700" htmlFor="loanTerm">
      Loan Term (Years)
    </label>
    <input
      type="number"
      id="loanTerm"
      placeholder="e.g., 15"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
    />
    
    <label className="text-gray-700" htmlFor="interestRate">
      Interest Rate (%)
    </label>
    <input
      type="number"
      id="interestRate"
      placeholder="e.g., 3.5"
      value={interestRate}
      onChange={(e) => setInterestRate(e.target.value)}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
    />
    
    <button
      onClick={calculateLoan}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
    >
      Calculate
    </button>
    
    {monthlyPayment && (
      <p className="mt-2 text-lg text-indigo-600 font-semibold">
        Your estimated monthly payment is: <span className="font-bold">₹{monthlyPayment}</span>
      </p>
    )}
  </div>
</div>


      {/* FAQs Section */}
      <div className="mt-16 w-full max-w-6xl px-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-indigo-600">1. What is the process for applying for a loan?</h3>
          <p className="text-gray-600 mt-2">You can apply online through our website or visit one of our branches to get started.</p>

          <h3 className="text-lg font-semibold text-indigo-600 mt-4">2. What documents are required for loan approval?</h3>
          <p className="text-gray-600 mt-2">You will need to provide identification, income proof, and any relevant asset documents.</p>

          <h3 className="text-lg font-semibold text-indigo-600 mt-4">3. How long does the approval process take?</h3>
          <p className="text-gray-600 mt-2">Typically, our approval process takes between 24 to 48 hours, depending on the type of loan.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center mb-8" data-aos="fade-up">
        <a href="/approve" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
          Predict your Loan Status Now!
        </a>
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

export default HomePage;

