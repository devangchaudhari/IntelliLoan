import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Importing Framer Motion for animations

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !password) {
      alert('Username and password are required.');
      return;
    }

    const authData = { username, password };
    if (!isLogin && !email) {
      alert('Email is required for registration.');
      return;
    } else if (!isLogin) {
      authData.email = email;
    }

    const url = `http://localhost:5000/routes/auth/${isLogin ? 'login' : 'register'}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          navigate('/home');
        } else {
          alert('User registered successfully. Please log in.');
          setIsLogin(true);
        }
      } else {
        alert(data.msg || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during authentication. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> {/* Background color changed */}
      {/* Company logo */}
      <motion.div
          className="flex items-center mb-2"
          animate={{ scale: [1, 1.1, 1] }} // Scale animation effect
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} // Animation properties
        >
          <img src="loan_logo.png" alt="IntelliLoan Logo" className="w-20 sm:w-28 md:w-32" /> {/* Increased size */}
        </motion.div>{/* Adjusted logo size */}

      {/* Company name at the top */}
      <div className="absolute top-4 left-4 flex items-center space-x-2"> {/* Flexbox layout for side by side */}
  
 {/* Adjusted name size */}
</div>


      {/* Back button */}
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-400 transition duration-200"
        whileHover={{ scale: 1.05 }} // Animation effect on hover
      >
        Back
      </motion.button>

      <motion.div 
        className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-lg shadow-xl max-w-xs sm:max-w-sm md:max-w-md w-full transition-transform transform hover:scale-105 duration-300"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} // Added entrance animation
      >
        {/* Animated User Icon */}
        <motion.div 
          className="flex items-center justify-center mb-4"
          animate={{ rotate: [0, 20, -20, 0] }} // Animation for the user icon
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaUserCircle className="text-black-500 text-6xl" />
        </motion.div>

        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          {isLogin ? 'Sign In to Your Account' : 'Create Your Account'}
        </h1>

        {/* Login/Signup Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col mb-4 space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500 text-sm sm:text-base"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500 text-sm sm:text-base"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500 text-sm sm:text-base"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-400 transition text-sm sm:text-base"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <button
          className="mt-4 text-blue-500 hover:text-blue-700 underline text-sm sm:text-base"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </motion.div>
    </div>
  );
};

export default AuthPage;
