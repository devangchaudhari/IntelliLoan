from flask import Flask, request, jsonify
from flask_cors import CORS
import utils  # Import the utils module
import pandas as pd
from sklearn.metrics import precision_score, recall_score, accuracy_score

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://intelli-loan.vercel.app"}})

@app.route('/')
def home():
    return "API for Loan Approval Prediction"

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        data = request.json  # Expecting JSON data from the frontend
        print("Data", data)
        
        # Extract data from the request
        Gender = data.get('Gender')
        Married = data.get('Married')
        Dependents = data.get('Dependents')
        Education = data.get('Education')
        Self_Employed = data.get('Self_Employed')
        ApplicantIncome = data.get('ApplicantIncome')
        CoapplicantIncome = data.get('CoapplicantIncome')
        LoanAmount = data.get('LoanAmount')
        Loan_Amount_Term = data.get('Loan_Amount_Term')
        Credit_History = data.get('Credit_History')
        Property_Area = data.get('Property_Area')

        # Create a DataFrame for processing
        user_data = {
            'Gender': Gender,
            'Married': Married,
            'Dependents': Dependents,
            'Education': Education,
            'Self_Employed': Self_Employed,
            'ApplicantIncome': ApplicantIncome,
            'CoapplicantIncome': CoapplicantIncome,
            'LoanAmount': LoanAmount,
            'Loan_Amount_Term': Loan_Amount_Term,
            'Credit_History': Credit_History,
            'Property_Area': Property_Area
        }

        # Call the preprocess function to make the prediction
        processed_data = utils.preprocess_features(pd.DataFrame(user_data, index=[0]))
        prediction = utils.model.predict(processed_data)  # Make the prediction

        # Assuming you have true values to compare the prediction for performance metrics
        # Let's say y_true is an example list of actual labels (to be replaced with real data)
        y_true = [1]  # Replace with actual labels

        # Calculate precision, recall, and accuracy
        precision = precision_score(y_true, prediction, average='binary') * 100
        recall = recall_score(y_true, prediction, average='binary') * 100
        accuracy = accuracy_score(y_true, prediction) * 100

        # Return the prediction and metrics in percentage (with rounding)
        return jsonify({
            'prediction': int(prediction[0]),  # Convert prediction to int
            'precision': round(precision, 2),
            'recall': round(recall, 2),
            'accuracy': round(accuracy, 2)
        })

if __name__ == '__main__':
    app.run(debug=True)

    