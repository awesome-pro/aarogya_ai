from tabula import read_pdf
import joblib

def getprob() -> float:
    file = 'output.pdf'

    df = read_pdf(file,stream=True,pages=1)

    df = df[0]
    # Load the Model 
    model = joblib.load('diabetes_pred.pkl')

    prob_outcome = (model.predict_proba(df)*100)[0][1]

    return (prob_outcome)

print(getprob())


