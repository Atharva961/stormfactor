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

    input_data = np.array([nitrogen, phosphorous, potassium, avg_temperature, avg_humidity, ph, rainfall])
    predictions = model.predict(input_data.reshape(1, -1))
    le = LabelEncoder()
    le.fit(df['label'])
    predicted_labels = le.inverse_transform(predictions)
    return {"crop": predicted_labels[0]}

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
