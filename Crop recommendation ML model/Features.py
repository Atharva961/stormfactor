from pydantic import BaseModel

class Feature(BaseModel):
    nitrogen: float
    phosphorous: float
    potassium: float
    avg_temperature: float
    avg_humidity: float
    ph: float
    rainfall: float