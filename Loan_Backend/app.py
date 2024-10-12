from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = pickle.load(open('loan_status_model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract data from the POST request
        features = [
            data['Gender'],
            data['Married'],
            data['Dependents'],
            data['Education'],
            data['Self_Employed'],
            data['ApplicantIncome'],
            data['CoapplicantIncome'],
            data['LoanAmount'],
            data['Loan_Amount_Term'],
            data['Credit_History'],
            data['Property_Area']
        ]
        
        # Convert the features into the correct format for prediction
        features = np.array(features).reshape(1, -1)
        
        # Predict the loan status using the model
        prediction = model.predict(features)
        
        # Return the result as JSON
        return jsonify({
            'Loan_Status': int(prediction[0])
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
