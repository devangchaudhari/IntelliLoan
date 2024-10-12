import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import OpeningPage from './OpeningPage';
import AuthPage from './AuthPage';
import HomePage from './HomePage';
import NewsPage from './NewsPage';
import LoanPage from './LoanPage';
import ProfilePage from './ProfilePage';
import ApprovePage from './ApprovePage';
import AboutUs from './AboutUs';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Conditional rendering of Navbar (You can decide based on login state) */}
        
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/home" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/loan" element={<LoanPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/approve" element={<ApprovePage />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


