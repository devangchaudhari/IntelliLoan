import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ApprovePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: '',
    maritalStatus: '',
    dependents: '',
    education: '',
    selfEmployed: '',
    income: '',
    coapplicantIncome: '',
    loanAmount: '',
    loanAmountTerm: '',
    creditHistory: '',
    propertyArea: ''
  });

  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => 
    
    {

      // Check if all required fields are filled
    const areAllFieldsFilled = Object.values(formData).every(field => field !== '');

    if (!areAllFieldsFilled) {
      alert('Please fill out all fields before submitting!');
      return;
    }



    if (formData.income < 0 || formData.loanAmount < 0 || formData.loanAmountTerm < 0) {
      alert('Income, loan amount, and loan term must be non-negative!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Gender: formData.gender,
          Married: formData.maritalStatus,
          Dependents: formData.dependents,
          Education: formData.education,
          Self_Employed: formData.selfEmployed,
          ApplicantIncome: formData.income,
          CoapplicantIncome: formData.coapplicantIncome,
          LoanAmount: formData.loanAmount,
          Loan_Amount_Term: formData.loanAmountTerm,
          Credit_History: formData.creditHistory,
          Property_Area: formData.propertyArea,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setPredictionResult(data.prediction);
        navigate('/predict', { state: { prediction: data.prediction } });
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 py-8 px-4 md:px-0">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-6 md:mt-12 animate-slide-up">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6 animate-fade-in">Loan Approval Prediction</h1>

          {predictionResult && (
            <div className="text-center text-lg text-green-600 bg-green-100 p-4 rounded-lg shadow-sm animate-bounce-in mb-4">
              <h2>Prediction Result: {predictionResult}</h2>
            </div>
          )}

          <form className="space-y-4">
            {/* Gender */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Marital Status */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Marital Status</option>
                <option value="Yes">Married</option>
                <option value="No">Single</option>
              </select>
            </div>

            {/* Dependents */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Number of Dependents</label>
              <select
                name="dependents"
                value={formData.dependents}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Number of Dependents</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3 or more</option>
              </select>
            </div>

            {/* Education */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Education</option>
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
            </div>

            {/* Self Employed */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Self Employed</label>
              <select
                name="selfEmployed"
                value={formData.selfEmployed}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Self Employed</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Applicant Income */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Applicant Income (INR)</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
                placeholder="Enter Annual Income"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Co-applicant Income */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Co-applicant Income (INR)</label>
              <input
                type="number"
                name="coapplicantIncome"
                value={formData.coapplicantIncome}
                onChange={handleChange}
                placeholder="Enter Co-applicant Income"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Loan Amount */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Loan Amount (In Thousands i.e 1 = 1000)</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="Enter Loan Amount"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Loan Amount Term */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Loan Amount Term (in months)</label>
              <input
                type="number"
                name="loanAmountTerm"
                value={formData.loanAmountTerm}
                onChange={handleChange}
                placeholder="Enter Loan Amount Term"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Credit History */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Credit History</label>
              <select
                name="creditHistory"
                value={formData.creditHistory}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Credit History</option>
                <option value="1">1 (Good)</option>
                <option value="0">0 (Bad)</option>
              </select>
            </div>

            {/* Property Area */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Property Area</label>
              <select
                name="propertyArea"
                value={formData.propertyArea}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Property Area</option>
                <option value="Urban">Urban</option>
                <option value="Semiurban">Semi-urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full md:w-auto"
              >
                Predict
              </button>
            </div>
          </form>
        </div>
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

export default ApprovePage;
