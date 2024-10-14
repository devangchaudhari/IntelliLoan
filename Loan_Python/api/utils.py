import numpy as np
import pandas as pd
import pickle
import os

# Get the absolute path to the model file
model_path = os.path.join(os.path.dirname(__file__), 'model', 'loan_status_model (2).pkl')

# Load the model
# model = pickle.load(open('loan_status_model (2).pkl', 'rb'))

# Load the model
model = pickle.load(open(model_path, 'rb'))


from sklearn.impute import SimpleImputer 

def preprocess_features(features):
    # Infer object types to avoid FutureWarnings
    features = features.infer_objects(copy=False)
    
    # Fill missing values for specific columns
    features['Gender'].fillna(features['Gender'].mode()[0], inplace=True)
    features['Married'].fillna(features['Married'].mode()[0], inplace=True)
    features['Dependents'].fillna(features['Dependents'].mode()[0], inplace=True)
    features['Self_Employed'].fillna(features['Self_Employed'].mode()[0], inplace=True)
    
    # Replace categorical values with numerical labels
    features.replace({'Married': {'No': 0, 'Yes': 1},
                      'Gender': {'Male': 1, 'Female': 0},
                      'Self_Employed': {'No': 0, 'Yes': 1},
                      'Property_Area': {'Rural': 0, 'Semiurban': 1, 'Urban': 2},
                      'Education': {'Graduate': 1, 'Not Graduate': 0}}, inplace=True)
    
    # Replace '3+' with 4 in the Dependents column
    features['Dependents'] = features['Dependents'].replace(to_replace='3+', value=4)

    # Use SimpleImputer to fill any remaining NaN values
    imputer = SimpleImputer(strategy='mean')
    features[['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']] = imputer.fit_transform(
        features[['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']]
    )

    return features


# def preprocess_features(features):
#     # Convert applicable columns to numeric to allow interpolation
#     numeric_columns = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']
    
#     # Convert to numeric type for interpolation
#     for column in numeric_columns:
#         if column in features.columns:
#             features[column] = pd.to_numeric(features[column], errors='coerce')  # Convert non-numeric to NaN

#     # Fill missing values using interpolation for numeric columns
#     features.interpolate(method='linear', inplace=True)

#     # Handle categorical columns (check if mode exists before filling)
#     if not features['Gender'].isnull().all():
#         features['Gender'].fillna(features['Gender'].mode()[0], inplace=True)
#     if not features['Married'].isnull().all():
#         features['Married'].fillna(features['Married'].mode()[0], inplace=True)
#     if not features['Dependents'].isnull().all():
#         features['Dependents'].fillna(features['Dependents'].mode()[0], inplace=True)
#     if not features['Self_Employed'].isnull().all():
#         features['Self_Employed'].fillna(features['Self_Employed'].mode()[0], inplace=True)

#     # Replace categorical values with numerical labels
#     features.replace({'Married': {'No': 0, 'Yes': 1},
#                       'Gender': {'Male': 1, 'Female': 0},
#                       'Self_Employed': {'No': 0, 'Yes': 1},
#                       'Property_Area': {'Rural': 0, 'Semiurban': 1, 'Urban': 2},
#                       'Education': {'Graduate': 1, 'Not Graduate': 0}}, inplace=True)

#     # Replace '3+' with 4 in the Dependents column
#     if 'Dependents' in features.columns:
#         features['Dependents'] = features['Dependents'].replace(to_replace='3+', value=4)

#     return features


def main():
    print("Welcome to the Loan Status Prediction App!")

    # User input
    gender = input("Enter Gender (Male/Female): ")
    married = input("Enter Marital Status (Yes/No): ")
    dependents = input("Enter Number of Dependents (0-3+): ")
    education = input("Enter Education (Graduate/Not Graduate): ")
    self_employed = input("Self Employed (Yes/No): ")
    applicant_income = float(input("Enter Applicant Income (INR): "))
    coapplicant_income = float(input("Enter Co-applicant Income (INR): "))
    loan_amount = float(input("Enter Loan Amount (in thousands): "))
    loan_amount_term = float(input("Enter Loan Amount Term (in months): "))
    credit_history = int(input("Enter Credit History (0 or 1): "))
    property_area = input("Enter Property Area (Rural/Semiurban/Urban): ")

    # Create a DataFrame for processing
    user_data = {
        'Gender': gender,
        'Married': married,
        'Dependents': dependents,
        'Education': education,
        'Self_Employed': self_employed,
        'ApplicantIncome': applicant_income,
        'CoapplicantIncome': coapplicant_income,
        'LoanAmount': loan_amount,
        'Loan_Amount_Term': loan_amount_term,
        'Credit_History': credit_history,
        'Property_Area': property_area
    }

    # Preprocess the user input features
    processed_data = preprocess_features(pd.DataFrame(user_data, index=[0]))

    # Make predictions
    prediction = model.predict(processed_data)
    

    # Display the prediction result
    if prediction[0] == 1:
        print("Congratulations! Your loan is likely to be approved.")
    else:
        print("Sorry, your loan is likely to be rejected.")

if __name__ == '__main__':
    main()
