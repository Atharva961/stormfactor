import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Features import Feature
import numpy as np
import pickle
import pandas as pd
from sklearn.preprocessing import LabelEncoder

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

pickle_in = open('xgboost_model.pkl', "rb")
model = pickle.load(pickle_in)

df = pd.read_csv('Crop_recommendation.csv')

@app.get('/')
def index():
    return {"message": "Hey there! This is Atharva"}

@app.post('/predict')
def predict_crop(data:Feature):
    data = data.dict()
    nitrogen = data['nitrogen']
    phosphorous = data['phosphorous']
    potassium = data['potassium']
    avg_temperature = data['avg_temperature']
    avg_humidity = data['avg_humidity']
    ph = data['ph']
    rainfall = data['rainfall']

    if nitrogen < 0 or nitrogen > 140:
        return {"crop": "none"}
    if phosphorous < 5 or phosphorous > 145:
        return {"crop": "none"}
    if potassium < 5 or potassium > 205:
        return {"crop": "none"}
    if avg_temperature < 8.83 or avg_temperature > 43.7:
        return {"crop": "none"}
    if avg_humidity < 14.3 or avg_humidity > 100:
        return {"crop": "none"}
    if ph < 3.5 or ph > 9.94:
        return {"crop": "none"}
    if rainfall < 20.2 or rainfall > 299:
        return {"crop": "none"}

    input_data = np.array([nitrogen, phosphorous, potassium, avg_temperature, avg_humidity, ph, rainfall])
    predictions = model.predict(input_data.reshape(1, -1))
    le = LabelEncoder()
    le.fit(df['label'])
    predicted_labels = le.inverse_transform(predictions)
    return {"crop": predicted_labels[0]}

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
