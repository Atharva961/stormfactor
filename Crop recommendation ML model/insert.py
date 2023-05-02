import csv
from pymongo import MongoClient

# connect to MongoDB database
client = MongoClient()
db = client['stormfactor']
collection = db['schemes']

# open CSV file and read the data
with open('schemes.csv', 'r') as csvfile:
    csvreader = csv.DictReader(csvfile)

    # iterate over the rows and insert each one into MongoDB
    for row in csvreader:
        document = {
            'name': row['name'],
            'information': row['information']
        }
        collection.insert_one(document)
