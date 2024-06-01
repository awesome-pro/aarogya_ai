from flask import Flask,request,jsonify
import joblib
import numpy as np
from data_pre_process import get_sample_data
from flask_cors import CORS
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

dib_model = joblib.load('diabetes_pred.pkl')

@app.route('/dibpredict',methods=['POST'])

def dibpredict():
    data = request.get_json(force=True)
    sample_data = list(data['data'])
    sample_data = np.array([sample_data])
    sample_pred = (dib_model.predict_proba(sample_data)*100)[0][0]
    result = float(sample_pred)
    return jsonify({'prediction':result})


if __name__ == '__main__':
    app.run(debug=True)