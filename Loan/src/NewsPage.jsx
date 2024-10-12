import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/routes/news/loan');
        const data = await response.json();
        if (response.ok) {
          setNews(data);  // Set the news articles in state
        } else {
          setError('Failed to fetch loan news');
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError('Error fetching loan news');
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-start p-4">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">Loan News</h1>

        {error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : (
          <div className="w-full max-w-4xl mt-8">
            {news.map((article, index) => (
              <div
                key={index}
                className="mb-6 p-6 bg-white shadow-lg rounded-lg border border-gray-300"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-semibold text-indigo-600">{article.title}</h2>
                <p className="mt-2 text-gray-700">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-indigo-600 hover:underline"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
          
        )}
      </div>
       {/* Footer */}
       <footer className="w-full bg-indigo-600 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center px-4">
          <p className="text-lg">&copy; 2024 Intelliloan. All rights reserved.</p>
          <p className="mt-2">Created with ❤️ by Devang Chaudhari and the team.</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="/home" className="text-white hover:underline">Home</a>
            <a href="/news" className="text-white hover:underline">News</a>
            <a href="/profile" className="text-white hover:underline">Profile</a>
            <a href="/about" className="text-white hover:underline">AboutUs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsPage;
