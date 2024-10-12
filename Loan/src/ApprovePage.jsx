import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ApprovePage = () => {
  const [formData, setFormData] = useState({
    Gender: 1, // 1 for Male, 0 for Female
    Married: 1, // 1 for Yes, 0 for No
    Dependents: 0,
    Education: 1, // 1 for Graduate, 0 for Not Graduate
    Self_Employed: 0, // 1 for Yes, 0 for No
    ApplicantIncome: '',
    CoapplicantIncome: '',
    LoanAmount: '',
    Loan_Amount_Term: '',
    Credit_History: 1, // 1 for Yes, 0 for No
    Property_Area: 1 // 0 for Rural, 1 for Semiurban, 2 for Urban
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setResult(response.data.Loan_Status === 1 ? 'Approved' : 'Not Approved');
      setError(null);
    } catch (error) {
      setError('Error while predicting loan approval: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Loan Approval Prediction</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-gray-700">Gender:</label>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Male</option>
              <option value={0}>Female</option>
            </select>
          </div>

          {/* Married */}
          <div className="mb-4">
            <label className="block text-gray-700">Married:</label>
            <select
              name="Married"
              value={formData.Married}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          {/* Dependents */}
          <div className="mb-4">
            <label className="block text-gray-700">Dependents:</label>
            <input
              type="number"
              name="Dependents"
              value={formData.Dependents}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Education */}
          <div className="mb-4">
            <label className="block text-gray-700">Education:</label>
            <select
              name="Education"
              value={formData.Education}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Graduate</option>
              <option value={0}>Not Graduate</option>
            </select>
          </div>

          {/* Self Employed */}
          <div className="mb-4">
            <label className="block text-gray-700">Self Employed:</label>
            <select
              name="Self_Employed"
              value={formData.Self_Employed}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          {/* Applicant Income */}
          <div className="mb-4">
            <label className="block text-gray-700">Applicant Income:</label>
            <input
              type="number"
              name="ApplicantIncome"
              value={formData.ApplicantIncome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Coapplicant Income */}
          <div className="mb-4">
            <label className="block text-gray-700">Coapplicant Income:</label>
            <input
              type="number"
              name="CoapplicantIncome"
              value={formData.CoapplicantIncome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Loan Amount */}
          <div className="mb-4">
            <label className="block text-gray-700">Loan Amount:</label>
            <input
              type="number"
              name="LoanAmount"
              value={formData.LoanAmount}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Loan Amount Term */}
          <div className="mb-4">
            <label className="block text-gray-700">Loan Amount Term:</label>
            <input
              type="number"
              name="Loan_Amount_Term"
              value={formData.Loan_Amount_Term}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Credit History */}
          <div className="mb-4">
            <label className="block text-gray-700">Credit History:</label>
            <select
              name="Credit_History"
              value={formData.Credit_History}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          {/* Property Area */}
          <div className="mb-4">
            <label className="block text-gray-700">Property Area:</label>
            <select
              name="Property_Area"
              value={formData.Property_Area}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Rural</option>
              <option value={1}>Semiurban</option>
              <option value={2}>Urban</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </form>

        {/* Display the result or error */}
        {result && <h3 className="mt-6 text-center text-xl font-semibold text-green-500">Loan Status: {result}</h3>}
        {error && <p className="mt-6 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ApprovePage;
