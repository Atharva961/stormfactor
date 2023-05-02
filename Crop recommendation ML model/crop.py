import streamlit as st
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb

# Load the dataset
df = pd.read_csv('Crop_recommendation.csv')

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df.drop('label', axis=1), df['label'], test_size=0.3)

# Convert the target variable into numerical values
le = LabelEncoder()
y_train = le.fit_transform(y_train)

# Create an instance of the XGBoost classifier and fit it to the training data
model = xgb.XGBClassifier()
model.fit(X_train, y_train)

# Define the function to make predictions using the XGBoost model
def predict_crop(model, features):
    # Reshape the features to match the shape of the training data
    features = np.array(features).reshape(1, -1)

    # Make a prediction using the XGBoost model
    predicted_crop = model.predict(features)

    # Map the predicted crop label to its corresponding crop name
    predicted_crop_name = le.inverse_transform(predicted_crop)

    return predicted_crop_name[0]

# Create the Streamlit app
st.title('Crop Recommendation')

# Add a header
st.header('Enter the features of the crop to predict')

# Add input fields for the features
feature1 = st.number_input('Nitrogen: ')
feature2 = st.number_input('Phosphorous: ')
feature3 = st.number_input('Potassium: ')
feature4 = st.number_input('Temperature: ')
feature5 = st.number_input('Humidity: ')
feature6 = st.number_input('pH: ')
feature7 = st.number_input('Rainfall: ')

# Add a button to make the prediction
if st.button('Predict'):
    # Define the new features
    new_features = [feature1, feature2, feature3, feature4, feature5, feature6, feature7]

    # Make a prediction using the XGBoost model
    predicted_crop_name = predict_crop(model, new_features)

    # Display the predicted crop
    st.write('The predicted crop is:', predicted_crop_name)
