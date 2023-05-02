import xgboost as xgb
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load the saved XGBoost model
with open('xgboost_model.pkl', 'rb') as f:
    xgb_model = pickle.load(f, encoding='latin1')

# Load the data into a pandas DataFrame
df = pd.read_csv('Crop_recommendation.csv')

# Define your input data (in this example, it's a single row of data)
input_data = np.array([0.5, 0.4, 0.6, 25, 1013.25, 80, 50]) # Example input data

# Use the XGBoost model to make predictions on the input data
predictions = xgb_model.predict(input_data.reshape(1, -1))

# Load the label encoder and use it to convert the predicted numerical values to string values
le = LabelEncoder()
le.fit(df['label'])
predicted_labels = le.inverse_transform(predictions)

# Print the predicted labels
print(predicted_labels)
