import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Fallback avatar icon

const Navbar = () => {
  const [username, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setIsLoading(true);
          const response = await fetch('https://intelli-loan-backend.vercel.app/routes/auth/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.ok) {
            setUserName(data.username || 'Guest');
            setProfileImage(data.profileImage || ''); // Fallback if no profile image
          } else {
            setError('Failed to fetch user profile');
          }
        } catch (error) {
          setError('Error fetching user profile');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('No token found, please login.');
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile Menu Links
  const navLinks = (
    <>
      <Link to="/home" className="hover:underline">Home</Link>
      <Link to="/news" className="hover:underline">News</Link>
      <Link to="/loan" className="hover:underline">Loans</Link>
      <Link to="/profile" className="hover:underline">Profile</Link>
      <Link to="/about" className="hover:underline">AboutUs</Link>
      <Link to="/chart" className="hover:underline">Chart</Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-indigo-600 text-white shadow-lg z-50">
      {/* Logo/Brand name */}
      <div className="text-2xl font-bold">
        <Link to="/home" className="text-white">IntelliLoan</Link>
      </div>

      {/* Desktop Navbar Links */}
      <div className="hidden md:flex space-x-4">
        {navLinks}
      </div>

      {/* Profile with username and image or fallback avatar */}
      <div className="flex items-center space-x-2">
        {isLoading ? (
          <span>Loading...</span>
        ) : error ? (
          <span className="text-red-400">{error}</span>
        ) : (
          <>
            {profileImage ? (
              <img 
                src={profileImage} 
                alt={username || "Profile"} 
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <FaUserCircle className="w-8 h-8 text-white" />
            )}
            <span className="text-white font-semibold">{username}</span>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle (Hamburger Icon) */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-white">
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full bg-indigo-600 text-white shadow-lg">
          <div className="flex flex-col items-center space-y-4 p-4">
            {navLinks}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
