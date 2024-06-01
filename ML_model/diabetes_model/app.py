from flask import Flask, request, jsonify 
import joblib 
import numpy as np 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load('diabetes_pred.pkl')

@app.route('/predict',methods=['POST'])
def predict():
    data = request.get_json(force=True)
    sample_data = list(data['data'])
    sample_data = np.array([sample_data])
    sample_pred = (model.predict_proba(sample_data)*100)[0][0]
    result = float(sample_pred)
    return jsonify({'prediction':result})

if __name__ == '__main__':
    app.run(debug=True)