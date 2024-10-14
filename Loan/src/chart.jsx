// StaticPieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import Navbar from "./Navbar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StaticPieChart = () => {
  // Data for the pie chart
  const data = {
    labels: ["Approved", "Rejected"],
    datasets: [
      {
        label: "Loan Approval Status",
        data: [70, 30], // Replace with your actual data
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        hoverOffset: 10,  // Increase hover effect
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    animation: {
      duration: 1500, // Animate chart on load
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 16, // Increase font size for better readability
          },
        },
      },
      title: {
        display: true,
        text: "Loan Approval Status",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div >
        <div className="pt-24 max-w-4xl mx-auto p-4 animate-fade-in">
      {/* Ensure there's enough padding to prevent overlap with the navbar */}
      <Navbar />

      <h2 className="text-3xl font-bold text-center my-6 text-indigo-600">
        Loan Approval Status
      </h2>

      <div className="flex justify-center mb-8">
        <div className="w-full max-w-sm">
          <Pie data={data} options={options} />
        </div>
      </div>
      </div>

      <footer className="w-full bg-indigo-600 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center px-4">
          <p className="text-lg">&copy; 2024 Intelliloan. All rights reserved.</p>
          <p className="mt-2">Created with ❤️ by Devang Chaudhari and the team.</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="/home" className="text-white hover:underline transition duration-300">Home</a>
            <a href="/news" className="text-white hover:underline transition duration-300">News</a>
            <a href="/chart" className="text-white hover:underline transition duration-300">Chart</a>
            <a href="/profile" className="text-white hover:underline transition duration-300">Profile</a>
            <a href="/about" className="text-white hover:underline transition duration-300">About Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StaticPieChart;

