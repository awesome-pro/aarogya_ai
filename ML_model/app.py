
from flask import Flask,request,jsonify
import joblib
import numpy as np
from flask_cors import CORS
from data_pre_process import get_sample_data
app = Flask(__name__)
CORS(app)

# Load the Model 

model = joblib.load('disease_model.pkl')

@app.route('/predict',methods=['POST'])
def predict():
    data = request.get_json(force=True)
    symp_data = list(data['symptoms'])
    sample_data = get_sample_data(symp_data)
    # now the sample data will of the form of 2 dim array 
    prediction = model.predict(sample_data)
    return jsonify({'prediction':prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
