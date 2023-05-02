import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import pickle

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

# Save the model using the pickle module
with open('xgboost_model.pkl', 'wb') as f:
    pickle.dump(model, f)