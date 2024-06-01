import requests
import json

url = 'http://127.0.0.1:5000/predict'

sample_data = {
    'data': [98.0,58.0,190.0,34.0,0.43,43.0]
}

our_reponse = requests.post(url,headers={'Content-Type': 'application/json'}, data=json.dumps(sample_data))

print(our_reponse.json()['prediction'])