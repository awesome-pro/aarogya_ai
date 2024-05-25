from http.client import responses
from urllib import response
import requests
import json

# URL for flask end point 
URL = 'http://127.0.0.1:5000/predict'

sample_data = {
    'symptoms':['itching','anxiety','diarrhoea','cramps','red spots over body','blister','loss of balance']
}

our_response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(sample_data))

print(our_response.json())