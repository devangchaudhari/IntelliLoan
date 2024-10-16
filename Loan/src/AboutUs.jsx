import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS

const AboutPage = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending feedback via email (Using a service like EmailJS or a backend)
    try {
      const response = await fetch('https://intelli-loan-backend.vercel.app/send-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        alert('Feedback sent successfully!');
        setFeedback({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send feedback. Please try again.');
      }
    } catch (err) {
      console.error('Error sending feedback:', err);
      alert('Error sending feedback. Please try again.');
    }
  };

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-10 sm:pt-20">
      <Navbar />
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-16">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center" data-aos="fade-up">About Us</h1>
        
        <div className="space-y-6 mb-4" data-aos="fade-up">
  <p className="text-xl font-semibold text-gray-800 mb-4">
    <strong className="text-blue-600">Intelliloan</strong> is a modern platform providing users with financial solutions, specifically focused on simplifying the loan approval process.
  </p>

  <p className="text-lg text-gray-700 leading-relaxed" data-aos="fade-up">
    Our team consists of <span className="font-bold text-gray-900">financial experts</span> and <span className="font-bold text-gray-900">data scientists</span> who leverage machine learning to help predict loan approvals quickly and accurately.
  </p>

  <p className="text-lg text-gray-700 leading-relaxed" data-aos="fade-up">
    Our mission is to offer a <span className="text-green-600">seamless</span>, <span className="text-green-600">trustworthy</span>, and <span className="text-green-600">reliable</span> loan prediction experience for individuals seeking financial assistance.
  </p>

  <p className="text-lg text-gray-700 leading-relaxed" data-aos="fade-up">
    We believe in <span className="text-purple-600 font-semibold">transparency</span> and strive to educate our users about their options, empowering them to make informed financial decisions.
  </p>
</div>


        <h2 className="text-2xl font-bold text-indigo-600 mb-4" data-aos="fade-up">Creators</h2>
        <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
          <li data-aos="fade-up">Devang Chaudhari </li>
          <li data-aos="fade-up">Shruti Mamidwar </li>
          <li data-aos="fade-up">Sanika Mali </li>
        </ul>

        <h2 className="text-2xl font-bold text-indigo-600 mb-4" data-aos="fade-up">Feedback</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4" data-aos="fade-up">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4" data-aos="fade-up">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4" data-aos="fade-up">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={feedback.message}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Enter your feedback"
              required
            />
          </div>

          <div className="mt-4 text-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
              data-aos="fade-up"
            >
              Send Feedback
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
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

export default AboutPage;

